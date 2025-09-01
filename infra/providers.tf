variable "region" {
  type        = string
  description = "Region for S3 and general resources (ex: eu-west-3)"
  default     = "eu-west-3"
}

# Provider par défaut (S3, CloudFront logs, etc.)
provider "aws" {
  region = var.region
}

# CloudFront exige ACM en us-east-1
provider "aws" {
  alias  = "use1"
  region = "us-east-1"
}
