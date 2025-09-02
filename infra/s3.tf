resource "aws_s3_bucket" "site" {
  bucket = var.site_bucket_name
  tags   = local.tags
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule { object_ownership = "BucketOwnerEnforced" }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration { status = "Enabled" }
}

# Logs CloudFront supprimés pour éviter les problèmes d'ACL
# resource "aws_s3_bucket" "logs" {
#   bucket = "${var.project_name}-cf-logs-${random_id.suffix.hex}"
#   tags   = local.tags
# }

# resource "random_id" "suffix" {
#   byte_length = 3
# }

# resource "aws_s3_bucket_ownership_controls" "logs" {
#   bucket = aws_s3_bucket.logs.id
#   rule { object_ownership = "BucketOwnerPreferred" }
# }

# resource "aws_s3_bucket_public_access_block" "logs" {
#   bucket                  = aws_s3_bucket.logs.id
#   block_public_acls       = true
#   block_public_policy     = true
#   ignore_public_acls      = true
#   restrict_public_buckets = true
# }
