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

# Configuration des variables d'environnement
locals {
  resend_api_key = try(coalesce(var.resend_api_key, ""), "")
  resend_account_email = try(coalesce(var.resend_account_email, ""), "")
}

# Configuration des providers
provider "aws" {
  region = var.region

  default_tags {
    tags = var.default_tags
  }
}

# CloudFront exige ACM en us-east-1
provider "aws" {
  alias  = "use1"
  region = "us-east-1"
}
