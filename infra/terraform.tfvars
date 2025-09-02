# Configuration Terraform - Copiez ce fichier vers terraform.tfvars
# et configurez avec vos vraies valeurs

# Nom du projet
project_name = "portfolio-faycal"

# Nom du bucket S3 (doit être unique globalement)
site_bucket_name = "portfolio-faycal-site-bucket-cv"

# Région AWS
region = "eu-west-3"

# Classe de prix CloudFront
price_class = "PriceClass_100"

# Configuration Resend (optionnel - peut être configuré via secrets)
resend_api_key = ""
resend_account_email = ""

# Domaine personnalisé (optionnel)
# domain_name = "cv.faycal.dev"
# hosted_zone_id = "Z1234567890ABCDEF"

# Tags par défaut
default_tags = {
  ManagedBy = "Terraform"
  Project   = "portfolio-faycal"
  Environment = "production"
}
