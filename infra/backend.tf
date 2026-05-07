terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket  = "portfolio-faycal-tfstate"
    key     = "cv/terraform.tfstate"
    region  = "eu-west-3"
    encrypt = true
  }
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
