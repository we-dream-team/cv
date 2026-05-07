locals {
  use_custom_domain = length(var.domain_name) > 0
  aliases           = local.use_custom_domain ? [var.domain_name] : []
  tags              = merge(var.default_tags, { Project = var.project_name })

  # hosted_zone_id : si la var est fournie, on l'utilise tel quel ;
  # sinon on retombe sur le lookup auto via data.aws_route53_zone.
  hosted_zone_id = local.use_custom_domain ? (
    length(var.hosted_zone_id) > 0 ? var.hosted_zone_id : data.aws_route53_zone.parent[0].zone_id
  ) : ""
}

# Lookup automatique de la zone Route53 par nom.
# Si var.zone_name est vide, on prend var.domain_name comme zone (cas où le
# domaine est lui-même une zone déléguée — c'est le cas pour cv.wedreamteam.com).
data "aws_route53_zone" "parent" {
  count        = local.use_custom_domain && length(var.hosted_zone_id) == 0 ? 1 : 0
  name         = length(var.zone_name) > 0 ? var.zone_name : var.domain_name
  private_zone = false
}
