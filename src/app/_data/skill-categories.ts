import { MISSIONS } from './profile'

export type SkillCategory = {
  id: string
  label: string
  tags: string[]
}

const RAW_CATEGORIES: SkillCategory[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    tags: ['AWS', 'GCP', 'EKS', 'GKE', 'Kubernetes', 'Fargate', 'Azure', 'OpenShift', 'Route53', 'OpenSearch', 'ElastiCache', 'RDS', 'DynamoDB', 'MongoDB'],
  },
  {
    id: 'iac',
    label: 'Infrastructure as Code',
    tags: ['Terraform', 'Terragrunt', 'CloudFormation', 'Packer', 'Puppet', 'Foreman', 'SUSE Manager'],
  },
  {
    id: 'gitops',
    label: 'GitOps & Déploiement',
    tags: ['FluxCD', 'ArgoCD', 'Helm', 'KEDA', 'GitOps', 'GitHub Actions', 'CI/CD', 'Jenkins', 'CircleCI', 'SonarQube'],
  },
  {
    id: 'observability',
    label: 'Observabilité',
    tags: ['Prometheus', 'Grafana', 'Datadog', 'Dynatrace', 'OpenTelemetry', 'Observability', 'ELK', 'Fluentd', 'Jaeger'],
  },
  {
    id: 'security',
    label: 'Sécurité & Réseau',
    tags: ['Vault', 'ExternalSecrets', 'Wiz', 'Kyverno', 'Trivy', 'OIDC', 'IRSA', 'ACM-PCA', 'Cert-Manager', 'TLS', 'Security', 'SSO', 'Traefik', 'Infoblox', 'IaC'],
  },
  {
    id: 'finops',
    label: 'FinOps',
    tags: ['FinOps'],
  },
  {
    id: 'platform',
    label: 'Plateforme & Production',
    tags: ['Linux', 'Red Hat', 'Oracle', 'LVM', 'Control-M', 'Satellite', 'Pacemaker', 'Shell', 'HA', 'Resilience', 'Automation'],
  },
]

export function getCategorizedSkills() {
  const occurrences = new Map<string, number>()
  for (const m of MISSIONS) {
    for (const t of m.tags) {
      occurrences.set(t, (occurrences.get(t) ?? 0) + 1)
    }
  }

  const seen = new Set<string>()
  const categories = RAW_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.tags
      .filter((t) => {
        if (seen.has(t)) return false
        if (!occurrences.has(t)) return false
        seen.add(t)
        return true
      })
      .map((t) => ({ tag: t, count: occurrences.get(t) ?? 0 }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag)),
  })).filter((c) => c.items.length > 0)

  const otherTags = Array.from(occurrences.entries())
    .filter(([t]) => !seen.has(t))
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))

  if (otherTags.length > 0) {
    categories.push({ id: 'other', label: 'Autres', tags: [], items: otherTags })
  }

  return categories
}
