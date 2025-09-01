# OAC recommandé
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name} site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Certificat ACM en us-east-1 si domaine personnalisé
resource "aws_acm_certificate" "cert" {
  count                     = local.use_custom_domain ? 1 : 0
  provider                  = aws.use1
  domain_name               = var.domain_name
  validation_method         = "DNS"
  options { certificate_transparency_logging_preference = "ENABLED" }
  tags = local.tags
}

# Enregistrements DNS pour valider le certificat
resource "aws_route53_record" "cert_validation" {
  count   = local.use_custom_domain ? length(aws_acm_certificate.cert[0].domain_validation_options) : 0
  zone_id = var.hosted_zone_id
  name    = tolist(aws_acm_certificate.cert[0].domain_validation_options)[count.index].resource_record_name
  type    = tolist(aws_acm_certificate.cert[0].domain_validation_options)[count.index].resource_record_type
  records = [tolist(aws_acm_certificate.cert[0].domain_validation_options)[count.index].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  count                   = local.use_custom_domain ? 1 : 0
  provider                = aws.use1
  certificate_arn         = aws_acm_certificate.cert[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# Distribution CloudFront
resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = var.price_class
  aliases             = local.aliases

  origin {
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id   = "s3-site-origin"

    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = "s3-site-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    compress = true

    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    response_headers_policy_id = "67f7725c-6f97-4210-82d7-5512b31e9d03"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    acm_certificate_arn = local.use_custom_domain ? aws_acm_certificate_validation.cert[0].certificate_arn : null
    ssl_support_method  = local.use_custom_domain ? "sni-only" : null
    minimum_protocol_version = "TLSv1.2_2021"
    cloudfront_default_certificate = local.use_custom_domain ? false : true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cloudfront/"
  }

  tags = local.tags

  depends_on = [aws_acm_certificate_validation.cert]
}

# Politique S3 pour n'accepter que CloudFront (via OAC)
data "aws_caller_identity" "current" {}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid      = "AllowCloudFrontServicePrincipalReadOnly",
        Effect   = "Allow",
        Principal = { Service = "cloudfront.amazonaws.com" },
        Action   = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.site.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.this.arn
          }
        }
      }
    ]
  })
}
