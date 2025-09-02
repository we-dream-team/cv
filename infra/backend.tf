# Configuration du backend Terraform
# Pour le moment, on utilise le backend local
# Vous pouvez configurer un backend S3 plus tard pour la collaboration

terraform {
  required_version = ">= 1.6.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  # Backend local par défaut
  # Pour passer à S3, décommentez et configurez :
  # backend "s3" {
  #   bucket = "votre-terraform-state-bucket"
  #   key    = "cv-clean/terraform.tfstate"
  #   region = "eu-west-3"
  # }
}
