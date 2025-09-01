# Infra – S3 + CloudFront (Terraform)
Déploie le portfolio Next.js (build statique) sur un bucket S3 privé derrière CloudFront (avec OAC), optionnellement avec un domaine et un certificat ACM.

## Pré-requis
- Terraform >= 1.6, AWS provider >= 5.x
- Un compte AWS (droits: S3, CloudFront, ACM, Route53 si domaine)
- AWS CLI configurée (`aws configure`), région par défaut (ex: eu-west-3)

## Variables principales
- `project_name` : nom du projet (ex: "portfolio-faycal")
- `region` : région pour S3/CloudFront logs (ex: "eu-west-3")
- `site_bucket_name` : nom du bucket S3 (doit être unique globalement)
- `domain_name` (optionnel) : domaine complet (ex: `cv.faycal.dev`), nécessite une zone Route53
- `hosted_zone_id` (optionnel) : Zone ID Route53 de `domain_name`
- `price_class` : ex: `PriceClass_100` (Europe + US), `PriceClass_All` pour global

## Déploiement
```bash
cd infra
terraform init
terraform plan -out tf.plan \
  -var "project_name=portfolio-faycal" \
  -var "region=eu-west-3" \
  -var "site_bucket_name=portfolio-faycal-site-bucket-1234"
terraform apply tf.plan
```

Avec un domaine (certificat + DNS) :
```bash
terraform plan -out tf.plan \
  -var "project_name=portfolio-faycal" \
  -var "region=eu-west-3" \
  -var "site_bucket_name=portfolio-faycal-site-bucket-1234" \
  -var "domain_name=cv.faycal.dev" \
  -var "hosted_zone_id=Z123456ABCDEFG"
terraform apply tf.plan
```

## Publication du site
Depuis la racine du projet :
```bash
npm install
npm run build

# Sync du build vers S3
aws s3 sync ./out s3://$(terraform -chdir=infra output -raw site_bucket_name) --delete

# Invalidation CloudFront (rafraîchir le cache)
aws cloudfront create-invalidation --distribution-id $(terraform -chdir=infra output -raw cloudfront_distribution_id) --paths "/*"
```

> Note: Next.js export statique (`next export`) est activé via `next build` + `next start` pour SSR. Pour un site 100% statique, ajoutez `next export` et ajustez le dossier (./out).
