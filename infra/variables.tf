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
  description = "(Optional) Route53 Hosted Zone ID for domain_name"
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

variable "resend_api_key" {
  type        = string
  description = "Resend API key for email notifications"
  default     = ""
}

variable "resend_account_email" {
  type        = string
  description = "Resend account email for notifications"
  default     = ""
}
