#!/usr/bin/env bash
# Bootstrap idempotent du state Terraform en S3 + import des ressources
# existantes sur AWS qui ont été déployées avant la mise en place du backend.
#
# - Crée le bucket de state s'il n'existe pas
# - Supprime les OAC CloudFront orphelins (créés par d'anciens applies foireux)
# - Importe S3 / CloudFront / OAC / random_id dans le state si absents
#
# Hypothèse : exécuté depuis le dossier `infra/`, AWS creds présentes dans l'env.

set -euo pipefail

STATE_BUCKET="${STATE_BUCKET:-portfolio-faycal-tfstate}"
SITE_BUCKET="${SITE_BUCKET:-portfolio-faycal-site-bucket-cv}"
REGION="${REGION:-eu-west-3}"
DOMAIN_NAME="${DOMAIN_NAME:-cv.wedreamteam.com}"
ZONE_NAME="${ZONE_NAME:-wedreamteam.com}"

log() { printf '\n\033[1;34m▶ %s\033[0m\n' "$*"; }

# ─── 1. State bucket ──────────────────────────────────────────────────────────

log "Création du bucket de state $STATE_BUCKET (idempotent)"
if aws s3api head-bucket --bucket "$STATE_BUCKET" 2>/dev/null; then
  echo "  bucket déjà existant"
else
  aws s3api create-bucket \
    --bucket "$STATE_BUCKET" \
    --region "$REGION" \
    --create-bucket-configuration "LocationConstraint=$REGION"
  echo "  bucket créé"
fi

aws s3api put-bucket-versioning --bucket "$STATE_BUCKET" \
  --versioning-configuration Status=Enabled

aws s3api put-public-access-block --bucket "$STATE_BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

aws s3api put-bucket-encryption --bucket "$STATE_BUCKET" \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
  >/dev/null 2>&1 || true

# ─── 2. terraform init ────────────────────────────────────────────────────────

log "terraform init"
terraform init -reconfigure -input=false

# ─── 3. Découverte des ressources existantes ──────────────────────────────────

log "Découverte des ressources sur AWS"

DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Origins.Items[?contains(DomainName, '$SITE_BUCKET')]].Id | [0]" \
  --output text)
if [[ -z "$DIST_ID" || "$DIST_ID" == "None" ]]; then
  echo "❌ Aucune distribution CloudFront trouvée pour le bucket $SITE_BUCKET" >&2
  exit 1
fi
echo "  CloudFront Distribution: $DIST_ID"

# Cert ARN actuellement utilisé par la distribution (us-east-1, requis par CF)
CERT_ARN=$(aws cloudfront get-distribution --id "$DIST_ID" \
  --query "Distribution.DistributionConfig.ViewerCertificate.ACMCertificateArn" \
  --output text 2>/dev/null)
if [[ -n "$CERT_ARN" && "$CERT_ARN" != "None" ]]; then
  echo "  ACM cert ARN (depuis la distribution): $CERT_ARN"
  # Injecte dans tfvars pour que terraform plan voie le bon ARN
  if grep -q '^acm_certificate_arn' terraform.tfvars; then
    sed -i.bak "s|^acm_certificate_arn.*|acm_certificate_arn = \"$CERT_ARN\"|" terraform.tfvars
  else
    echo "acm_certificate_arn = \"$CERT_ARN\"" >> terraform.tfvars
  fi
  rm -f terraform.tfvars.bak
fi

OAC_ID=$(aws cloudfront get-distribution --id "$DIST_ID" \
  --query "Distribution.DistributionConfig.Origins.Items[0].OriginAccessControlId" \
  --output text)
echo "  OAC actif (attaché à la distribution): $OAC_ID"

OAC_NAME=$(aws cloudfront get-origin-access-control --id "$OAC_ID" \
  --query "OriginAccessControl.OriginAccessControlConfig.Name" \
  --output text)
echo "  OAC nom: $OAC_NAME"

# Extrait le suffixe hex (les chars hex à la fin du nom)
SUFFIX_HEX=$(echo "$OAC_NAME" | grep -oE '[0-9a-fA-F]+$' | tr 'A-F' 'a-f')
if [[ -z "$SUFFIX_HEX" ]]; then
  echo "❌ Impossible d'extraire le suffixe hex du nom OAC: $OAC_NAME" >&2
  exit 1
fi
echo "  random_id.suffix.hex (déduit): $SUFFIX_HEX"

# Conversion hex → base64url (format requis par terraform import random_id)
SUFFIX_B64=$(printf '%s' "$SUFFIX_HEX" | xxd -r -p | base64 | tr '+/' '-_' | tr -d '=')
echo "  random_id.suffix.id (base64url): $SUFFIX_B64"

# ─── 4. Suppression des OAC orphelins ─────────────────────────────────────────

log "Suppression des OAC orphelins (créés par d'anciens applies foireux)"
aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?starts_with(Name, 'portfolio-faycal-oac-')].[Id,Name]" \
  --output text | while IFS=$'\t' read -r oac_id oac_name; do
  [[ -z "$oac_id" ]] && continue
  if [[ "$oac_id" == "$OAC_ID" ]]; then
    continue
  fi
  echo "  suppression OAC orphelin: $oac_name ($oac_id)"
  ETAG=$(aws cloudfront get-origin-access-control --id "$oac_id" --query 'ETag' --output text 2>/dev/null || true)
  if [[ -n "$ETAG" ]]; then
    aws cloudfront delete-origin-access-control --id "$oac_id" --if-match "$ETAG" \
      || echo "    (delete failed, may be still attached — skip)"
  fi
done

# ─── 5. Import idempotent ─────────────────────────────────────────────────────

log "Import des ressources existantes dans le state"

import_if_missing() {
  local addr="$1"
  local id="$2"
  if terraform state show "$addr" >/dev/null 2>&1; then
    echo "  ✓ $addr déjà dans le state"
  else
    echo "  ⇣ import $addr ← $id"
    terraform import -input=false "$addr" "$id"
  fi
}

import_if_missing "random_id.suffix" "$SUFFIX_B64"
import_if_missing "aws_s3_bucket.site" "$SITE_BUCKET"
import_if_missing "aws_s3_bucket_ownership_controls.site" "$SITE_BUCKET"
import_if_missing "aws_s3_bucket_public_access_block.site" "$SITE_BUCKET"
import_if_missing "aws_s3_bucket_versioning.site" "$SITE_BUCKET"
import_if_missing "aws_s3_bucket_policy.site" "$SITE_BUCKET"
import_if_missing "aws_cloudfront_origin_access_control.oac" "$OAC_ID"
import_if_missing "aws_cloudfront_distribution.this" "$DIST_ID"

# La rewrite function a peut-être été créée par un précédent apply foireux —
# on tente l'import, échec silencieux si elle n'existe pas encore.
if aws cloudfront describe-function --name portfolio-faycal-rewrite-index --stage LIVE >/dev/null 2>&1 \
   || aws cloudfront describe-function --name portfolio-faycal-rewrite-index --stage DEVELOPMENT >/dev/null 2>&1; then
  import_if_missing "aws_cloudfront_function.rewrite_index" "portfolio-faycal-rewrite-index"
fi

# ─── 6. Import DNS + ACM (domaine personnalisé) ───────────────────────────────

log "Découverte de la zone Route53 ${ZONE_NAME}"
ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "${ZONE_NAME}" \
  --query "HostedZones[?Name=='${ZONE_NAME}.'].Id | [0]" \
  --output text 2>/dev/null | sed 's|/hostedzone/||')

if [[ -z "$ZONE_ID" || "$ZONE_ID" == "None" ]]; then
  echo "  (Aucune zone Route53 ${ZONE_NAME} — skip DNS/ACM imports)"
else
  echo "  zone_id: $ZONE_ID"

  # Alias A record cv.wedreamteam.com → CloudFront
  ALIAS_FQDN="${DOMAIN_NAME}."
  if aws route53 list-resource-record-sets --hosted-zone-id "$ZONE_ID" \
       --query "ResourceRecordSets[?Name=='${ALIAS_FQDN}' && Type=='A'].Name | [0]" \
       --output text 2>/dev/null | grep -q "${ALIAS_FQDN}"; then
    import_if_missing "aws_route53_record.alias[0]" "${ZONE_ID}_${DOMAIN_NAME}_A"
  fi
fi

log "Bootstrap terminé"
