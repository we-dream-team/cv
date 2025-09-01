locals {
  use_custom_domain = length(var.domain_name) > 0 && length(var.hosted_zone_id) > 0
  aliases           = local.use_custom_domain ? [var.domain_name] : []
  tags              = merge(var.default_tags, { Project = var.project_name })
}
