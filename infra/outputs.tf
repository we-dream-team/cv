output "site_bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.this.id
}
