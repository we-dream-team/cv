variable "project_name" {
  type        = string
  description = "Project name for tagging and naming"
}

variable "region" {
  type        = string
  description = "Region for S3 and general resources (ex: eu-west-3)"
  default     = "eu-west-3"
}

variable "site_bucket_name" {
  type        = string
  description = "Name of the S3 bucket for the static site (must be globally unique)"
}

variable "domain_name" {
  type        = string
  description = "(Optional) FQDN for the site (e.g., cv.example.com)"
  default     = ""
}

variable "hosted_zone_id" {
  type        = string
  description = "(Optional) Route53 Hosted Zone ID for domain_name. If empty, looked up by zone_name (or domain_name)."
  default     = ""
}

variable "zone_name" {
  type        = string
  description = "(Optional) Route53 zone name to look up when hosted_zone_id is empty. Defaults to domain_name."
  default     = ""
}

variable "acm_certificate_arn" {
  type        = string
  description = "(Required when use_custom_domain) ARN of the ACM cert in us-east-1 used by CloudFront for HTTPS. Renseigné dynamiquement par bootstrap.sh depuis la distribution existante."
  default     = ""
}

variable "price_class" {
  type        = string
  description = "CloudFront price class (PriceClass_100, PriceClass_200, PriceClass_All)"
  default     = "PriceClass_100"
}

variable "default_tags" {
  type        = map(string)
  description = "Default tags to apply to all resources"
  default = {
    ManagedBy = "Terraform"
  }
}
