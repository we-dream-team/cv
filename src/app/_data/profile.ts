export const PROFILE = {
  name: 'Fayçal ZOUAOUI',
  role: 'Tech Lead DevOps · Cloud Engineer',
  tagline: 'Industrialisation cloud, sécurité et fiabilité — pour des plateformes qui tiennent à l’échelle.',
  email: 'zouaoui.faycal.p@gmail.com',
  phone: '06 51 16 02 07',
  location: 'Lille, France',
  linkedin: 'https://www.linkedin.com/in/faycal-zouaoui-65b0a5201',
  website: null as string | null,
  startYear: 2015,
  signatureStack: ['AWS', 'Kubernetes', 'Terraform', 'GitOps'],
}

export type Mission = {
  title: string
  dates: string
  company: string
  role: string
  contexte: string
  objectif: string
  realisations: string[]
  tags: string[]
}

export const MISSIONS: Mission[] = [
  {
    title: 'Platform Engineer',
    dates: 'Octobre 2025 – Présent',
    company: 'Dailymotion',
    role: 'Platform Engineer',
    contexte:
      'Au sein de l’équipe Platform Engineering, modernisation et industrialisation des plateformes Kubernetes multi-cloud (EKS / GKE / on-premise) qui hébergent les services de la plateforme vidéo.',
    objectif:
      'Réduire la dette technique Kubernetes, sécuriser les workloads sur tous les clusters et améliorer l’efficience cloud.',
    realisations: [
      'Migration de services on-premise vers EKS multi-régions (eu-west-1, us-east-2, us-west-2).',
      'Audit structuré de la dette Kubernetes (cluster add-ons, GitOps, Kyverno, versions, sécurité, observabilité) et plan de remédiation priorisé.',
      'Audit Topology Spread Constraints (TSC) sur clusters EKS, GKE et on-prem — plan d’amélioration de la résilience zonale.',
      'Déploiement et intégration CI/CD de Wiz CNAPP sur 15+ clusters AWS / GCP : scans IaC, scans containers, scans d’images via registre dédié.',
      'GitOps Flux : mise en place d’AGENTS.md & skills (conventions, checklists migration EKS/GKE), intégration MCP servers (GitHub, AWS, GKE, Atlassian, Wiz).',
      'Optimisation FinOps : audit ingress vs services internes, requests/limits CPU & RAM, raffinement de dashboards de coût.',
      'Documentation Confluence (30+ pages) : architecture, ChartMuseum, audits sécurité et coûts.',
    ],
    tags: ['Kubernetes', 'EKS', 'GKE', 'AWS', 'GCP', 'GitOps', 'FluxCD', 'Helm', 'Wiz', 'Kyverno', 'Terraform', 'CI/CD', 'FinOps', 'Security', 'Observability'],
  },
  {
    title: 'Ingénieur Cloud / DevOps — CCOE',
    dates: 'Janvier 2025 – Octobre 2025',
    company: 'Nexity',
    role: 'Cloud / DevOps Engineer',
    contexte:
      'Au sein d’un Cloud Center of Excellence (CCOE), industrialisation d’une plateforme AWS multi-comptes / multi-régions et accompagnement des équipes applicatives sur leurs déploiements cloud-native en production.',
    objectif:
      'Standardiser les patterns Terraform, sécuriser les accès cloud et opérer des clusters EKS en GitOps.',
    realisations: [
      'Standardisation de modules et patterns Terraform / Terragrunt pour accélérer les déploiements multi-comptes.',
      'Exploitation de clusters EKS en GitOps (FluxCD + Helm), KEDA, IRSA, PodDisruptionBudget, topologySpreadConstraints.',
      'Authentification sécurisée GitHub Actions ↔ AWS ↔ Kubernetes via OIDC / IRSA (cross-account).',
      'Sécurité cloud : Wiz CNAPP, scans IaC & containers, admission controllers Kubernetes, policies.',
      'Observabilité : Dynatrace, Datadog, OpenTelemetry — dashboards CPU / mémoire / requests / limits / pods.',
      'Troubleshooting complexe : HelmRelease FluxCD, StatefulSets, scheduling, probes, taints, affinités, networking.',
      'Automatisation d’exploitation AWS : EventBridge, SSM, AWS CLI, scripts Bash / Python / Go.',
    ],
    tags: ['AWS', 'EKS', 'Terraform', 'Terragrunt', 'FluxCD', 'Helm', 'KEDA', 'GitHub Actions', 'OIDC', 'IRSA', 'Wiz', 'Dynatrace', 'Datadog', 'OpenTelemetry', 'GitOps', 'Security'],
  },
  {
    title: 'Tech Lead DevOps',
    dates: 'Novembre 2023 – Décembre 2024',
    company: 'Waykonect (filiale TotalEnergies)',
    role: 'Tech Lead DevOps',
    contexte:
      'Intégré à une équipe DevOps de 15 personnes pour moderniser les pratiques CI/CD et renforcer la sécurité au sein de la filiale digitale de TotalEnergies.',
    objectif:
      'Standardiser les workflows, améliorer la qualité du code et garantir la fiabilité des architectures.',
    realisations: [
      'Mise en place d’un cadre commun CI/CD via GitHub Actions (templates standardisés/personnalisables).',
      'Relecture et validation de code IaC (Terraform, CloudFormation) et pipelines CI/CD.',
      'POC sécurité: Trivy (scan vulnérabilités), ACM-PCA (TLS end-to-end).',
      'Encadrement technique et coordination des sessions de debugging (référent équipe DevOps).',
    ],
    tags: ['GitHub Actions', 'Terraform', 'CloudFormation', 'Trivy', 'ACM-PCA', 'TLS', 'IaC', 'Security'],
  },
  {
    title: 'Cloud Engineer AWS',
    dates: 'Juillet 2022 – Juillet 2023',
    company: 'SNCF Connect & Tech',
    role: 'Cloud Engineer AWS',
    contexte:
      "Programme stratégique de migration des applications métiers vers Kubernetes (EKS) pour la scalabilité et l'industrialisation des déploiements.",
    objectif:
      'Construire une infrastructure robuste en GitOps et sécuriser les déploiements automatisés.',
    realisations: [
      'Méthodologie GitOps (FluxCD + Helm Charts) pour des déploiements auditables.',
      'Gestion sécurisée des secrets (Vault + External Secrets).',
      'Auto-scaling dynamique avec KEDA (optimisation coût/perf).',
      'Infra AWS via Terraform 1.x (ElastiCache, RDS, OpenSearch, Route53).',
      'Pilotage des migrations EC2 → EKS et accompagnement des équipes.',
    ],
    tags: ['AWS', 'EKS', 'FluxCD', 'Helm', 'Vault', 'ExternalSecrets', 'KEDA', 'Terraform', 'OpenSearch', 'Route53'],
  },
  {
    title: 'Cloud Engineer AWS',
    dates: 'Mars 2021 – Juin 2022',
    company: 'Société Générale',
    role: 'Cloud Engineer AWS',
    contexte:
      'Au sein de la coretech cloud, renforcement de la résilience et standardisation des déploiements AWS.',
    objectif:
      'Créer des modules Terraform réutilisables et garantir la haute disponibilité.',
    realisations: [
      'Modules Terraform standardisés (stateful/stateless, mono/multi AZ & région).',
      'Déploiement automatisé d’un cluster Vault en blue/green (résilience).',
      'Jaeger sur EKS pour le tracing applicatif.',
      'Nouvelles connectivités (AWS ↔ réseau interne, AWS ↔ Azure).',
      'Réécriture clusters EKS + jobs Jenkins (industrialisation).',
    ],
    tags: ['Terraform', 'Vault', 'Jaeger', 'EKS', 'Jenkins', 'Azure', 'HA', 'Resilience'],
  },
  {
    title: 'Cloud Engineer AWS',
    dates: 'Février 2020 – Février 2021',
    company: 'Finalcad',
    role: 'Cloud Engineer AWS',
    contexte:
      'Audit et modernisation complète de l’infrastructure cloud pour réduire les coûts et améliorer la fiabilité.',
    objectif:
      'Définir une cible moderne (EKS + Fargate) et industrialiser les déploiements.',
    realisations: [
      'État des lieux technique/financier et plan d’action vers EKS + Fargate.',
      'Cluster EKS et outillage: ArgoCD, Prometheus, Grafana, Traefik, Fluentd, Cert-Manager.',
      'Migration Elastic Beanstalk → EKS (Dockerfiles, CircleCI, Terraform).',
      'Observabilité & sécurité: Vault, AWS Secrets Manager, certificats ACM.',
      'Optimisation des coûts par rationalisation des ressources.',
    ],
    tags: ['EKS', 'Fargate', 'ArgoCD', 'Prometheus', 'Grafana', 'Traefik', 'Fluentd', 'Cert-Manager', 'CircleCI', 'Terraform'],
  },
  {
    title: 'DevOps',
    dates: 'Septembre 2018 – Février 2020',
    company: 'Société Générale',
    role: 'DevOps',
    contexte:
      'Transition vers un modèle DevOps et construction d’une software factory interne.',
    objectif:
      'Industrialiser les déploiements et automatiser la supervision.',
    realisations: [
      'Pipelines CI/CD (Jenkins, SonarQube).',
      'Monitoring: Grafana, ELK, dashboards automatisés.',
      'AWS via Terraform & Packer (ASG, RDS, DynamoDB, MongoDB).',
      'SSO Sign&Go dans AWS et OpenShift, autoscaling.',
      'Coaching des équipes sur les bonnes pratiques DevOps.',
    ],
    tags: ['Jenkins', 'SonarQube', 'Grafana', 'ELK', 'Terraform', 'Packer', 'OpenShift', 'MongoDB', 'DynamoDB', 'SSO'],
  },
  {
    title: 'DevOps',
    dates: 'Mars 2018 – Septembre 2018',
    company: 'PMU – Pari Mutuel Urbain',
    role: 'DevOps',
    contexte:
      'Accompagnement DevOps pour automatiser les environnements et sensibiliser aux bonnes pratiques.',
    objectif:
      'Industrialiser les déploiements et simplifier l’infrastructure.',
    realisations: [
      'Modules Puppet pour standardiser les configurations.',
      'Migration Oracle AIX → Red Hat 7.',
      'Provisioning automatisé (Foreman, Puppet, SUSE Manager).',
      'POC Infoblox pour simplifier réseau & DNS.',
      'Sensibilisation des développeurs à l’automatisation.',
    ],
    tags: ['Puppet', 'Foreman', 'SUSE Manager', 'Oracle', 'Red Hat', 'Infoblox', 'Automation'],
  },
  {
    title: 'Ingénieur Linux & Production',
    dates: 'Juin 2015 – Février 2018',
    company: "SFIL – Société de Financement et d'Investissement Local",
    role: 'Ingénieur Linux & Production',
    contexte:
      'Exploitation d’un parc Linux critique et projets stratégiques (migrations, clustering, monitoring).',
    objectif:
      'Assurer stabilité, fiabilité et évolutions (migrations, clusters).',
    realisations: [
      'MCO Linux & bases Oracle (support N1–N3).',
      'Gestion stockage: LVM, logrotate, services, utilisateurs.',
      'Migrations: Control‑M v7→v9, Gateway; déploiement Satellite 6.2.',
      'Clusters Red Hat 7.2 avec Pacemaker.',
      'Automatisation: scripts shell (sauvegardes, restorations, intégrations).',
    ],
    tags: ['Linux', 'Oracle', 'LVM', 'Control-M', 'Satellite', 'Pacemaker', 'Shell'],
  },
]
