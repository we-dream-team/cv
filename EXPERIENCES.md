# Expériences — Fayçal ZOUAOUI

**Tech Lead DevOps · Cloud Engineer** — Lille, France
Industrialisation cloud, sécurité et fiabilité — pour des plateformes qui tiennent à l'échelle.

- Email : zouaoui.faycal.p@gmail.com
- Téléphone : 06 51 16 02 07
- LinkedIn : https://www.linkedin.com/in/faycal-zouaoui-65b0a5201
- Stack signature : AWS · Kubernetes · Terraform · GitOps

---

## Platform Engineer — Dailymotion

**Octobre 2025 – Présent**

**Contexte.** Au sein de l'équipe Platform Engineering, modernisation et industrialisation des plateformes Kubernetes multi-cloud (EKS / GKE / on-premise) qui hébergent les services de la plateforme vidéo.

**Objectif.** Réduire la dette technique Kubernetes, sécuriser les workloads sur tous les clusters et améliorer l'efficience cloud.

**Réalisations.**
- Migration de services on-premise vers EKS multi-régions (eu-west-1, us-east-2, us-west-2).
- Audit structuré de la dette Kubernetes (cluster add-ons, GitOps, Kyverno, versions, sécurité, observabilité) et plan de remédiation priorisé.
- Audit Topology Spread Constraints (TSC) sur clusters EKS, GKE et on-prem — plan d'amélioration de la résilience zonale.
- Déploiement et intégration CI/CD de Wiz CNAPP sur 15+ clusters AWS / GCP : scans IaC, scans containers, scans d'images via registre dédié.
- GitOps Flux : mise en place d'AGENTS.md & skills (conventions, checklists migration EKS/GKE), intégration MCP servers (GitHub, AWS, GKE, Atlassian, Wiz).
- Optimisation FinOps : audit ingress vs services internes, requests/limits CPU & RAM, raffinement de dashboards de coût.
- Documentation Confluence (30+ pages) : architecture, ChartMuseum, audits sécurité et coûts.

**Stack.** Kubernetes · EKS · GKE · AWS · GCP · GitOps · FluxCD · Helm · Wiz · Kyverno · Terraform · CI/CD · FinOps · Security · Observability

---

## Ingénieur Cloud / DevOps — Nexity (CCOE)

**Janvier 2025 – Octobre 2025**

**Contexte.** Au sein d'un Cloud Center of Excellence (CCOE), industrialisation d'une plateforme AWS multi-comptes / multi-régions et accompagnement des équipes applicatives sur leurs déploiements cloud-native en production.

**Objectif.** Standardiser les patterns Terraform, sécuriser les accès cloud et opérer des clusters EKS en GitOps.

**Réalisations.**
- Standardisation de modules et patterns Terraform / Terragrunt pour accélérer les déploiements multi-comptes.
- Exploitation de clusters EKS en GitOps (FluxCD + Helm), KEDA, IRSA, PodDisruptionBudget, topologySpreadConstraints.
- Authentification sécurisée GitHub Actions ↔ AWS ↔ Kubernetes via OIDC / IRSA (cross-account).
- Sécurité cloud : Wiz CNAPP, scans IaC & containers, admission controllers Kubernetes, policies.
- Observabilité : Dynatrace, Datadog, OpenTelemetry — dashboards CPU / mémoire / requests / limits / pods.
- Troubleshooting complexe : HelmRelease FluxCD, StatefulSets, scheduling, probes, taints, affinités, networking.
- Automatisation d'exploitation AWS : EventBridge, SSM, AWS CLI, scripts Bash / Python / Go.

**Stack.** AWS · EKS · Terraform · Terragrunt · FluxCD · Helm · KEDA · GitHub Actions · OIDC · IRSA · Wiz · Dynatrace · Datadog · OpenTelemetry · GitOps · Security

---

## Tech Lead DevOps — Waykonect (filiale TotalEnergies)

**Novembre 2023 – Décembre 2024**

**Contexte.** Intégré à une équipe DevOps de 15 personnes pour moderniser les pratiques CI/CD et renforcer la sécurité au sein de la filiale digitale de TotalEnergies.

**Objectif.** Standardiser les workflows, améliorer la qualité du code et garantir la fiabilité des architectures.

**Réalisations.**
- Mise en place d'un cadre commun CI/CD via GitHub Actions (templates standardisés/personnalisables).
- Relecture et validation de code IaC (Terraform, CloudFormation) et pipelines CI/CD.
- POC sécurité : Trivy (scan vulnérabilités), ACM-PCA (TLS end-to-end).
- Encadrement technique et coordination des sessions de debugging (référent équipe DevOps).

**Stack.** GitHub Actions · Terraform · CloudFormation · Trivy · ACM-PCA · TLS · IaC · Security

---

## Cloud Engineer AWS — SNCF Connect & Tech

**Juillet 2022 – Juillet 2023**

**Contexte.** Programme stratégique de migration des applications métiers vers Kubernetes (EKS) pour la scalabilité et l'industrialisation des déploiements.

**Objectif.** Construire une infrastructure robuste en GitOps et sécuriser les déploiements automatisés.

**Réalisations.**
- Méthodologie GitOps (FluxCD + Helm Charts) pour des déploiements auditables.
- Gestion sécurisée des secrets (Vault + External Secrets).
- Auto-scaling dynamique avec KEDA (optimisation coût/perf).
- Infra AWS via Terraform 1.x (ElastiCache, RDS, OpenSearch, Route53).
- Pilotage des migrations EC2 → EKS et accompagnement des équipes.

**Stack.** AWS · EKS · FluxCD · Helm · Vault · ExternalSecrets · KEDA · Terraform · OpenSearch · Route53

---

## Cloud Engineer AWS — Société Générale

**Mars 2021 – Juin 2022**

**Contexte.** Au sein de la coretech cloud, renforcement de la résilience et standardisation des déploiements AWS.

**Objectif.** Créer des modules Terraform réutilisables et garantir la haute disponibilité.

**Réalisations.**
- Modules Terraform standardisés (stateful/stateless, mono/multi AZ & région).
- Déploiement automatisé d'un cluster Vault en blue/green (résilience).
- Jaeger sur EKS pour le tracing applicatif.
- Nouvelles connectivités (AWS ↔ réseau interne, AWS ↔ Azure).
- Réécriture clusters EKS + jobs Jenkins (industrialisation).

**Stack.** Terraform · Vault · Jaeger · EKS · Jenkins · Azure · HA · Resilience

---

## Cloud Engineer AWS — Finalcad

**Février 2020 – Février 2021**

**Contexte.** Audit et modernisation complète de l'infrastructure cloud pour réduire les coûts et améliorer la fiabilité.

**Objectif.** Définir une cible moderne (EKS + Fargate) et industrialiser les déploiements.

**Réalisations.**
- État des lieux technique/financier et plan d'action vers EKS + Fargate.
- Cluster EKS et outillage : ArgoCD, Prometheus, Grafana, Traefik, Fluentd, Cert-Manager.
- Migration Elastic Beanstalk → EKS (Dockerfiles, CircleCI, Terraform).
- Observabilité & sécurité : Vault, AWS Secrets Manager, certificats ACM.
- Optimisation des coûts par rationalisation des ressources.

**Stack.** EKS · Fargate · ArgoCD · Prometheus · Grafana · Traefik · Fluentd · Cert-Manager · CircleCI · Terraform

---

## DevOps — Société Générale

**Septembre 2018 – Février 2020**

**Contexte.** Transition vers un modèle DevOps et construction d'une software factory interne.

**Objectif.** Industrialiser les déploiements et automatiser la supervision.

**Réalisations.**
- Pipelines CI/CD (Jenkins, SonarQube).
- Monitoring : Grafana, ELK, dashboards automatisés.
- AWS via Terraform & Packer (ASG, RDS, DynamoDB, MongoDB).
- SSO Sign&Go dans AWS et OpenShift, autoscaling.
- Coaching des équipes sur les bonnes pratiques DevOps.

**Stack.** Jenkins · SonarQube · Grafana · ELK · Terraform · Packer · OpenShift · MongoDB · DynamoDB · SSO

---

## DevOps — PMU (Pari Mutuel Urbain)

**Mars 2018 – Septembre 2018**

**Contexte.** Accompagnement DevOps pour automatiser les environnements et sensibiliser aux bonnes pratiques.

**Objectif.** Industrialiser les déploiements et simplifier l'infrastructure.

**Réalisations.**
- Modules Puppet pour standardiser les configurations.
- Migration Oracle AIX → Red Hat 7.
- Provisioning automatisé (Foreman, Puppet, SUSE Manager).
- POC Infoblox pour simplifier réseau & DNS.
- Sensibilisation des développeurs à l'automatisation.

**Stack.** Puppet · Foreman · SUSE Manager · Oracle · Red Hat · Infoblox · Automation

---

## Ingénieur Linux & Production — SFIL

**Juin 2015 – Février 2018**

Société de Financement et d'Investissement Local.

**Contexte.** Exploitation d'un parc Linux critique et projets stratégiques (migrations, clustering, monitoring).

**Objectif.** Assurer stabilité, fiabilité et évolutions (migrations, clusters).

**Réalisations.**
- MCO Linux & bases Oracle (support N1–N3).
- Gestion stockage : LVM, logrotate, services, utilisateurs.
- Migrations : Control‑M v7→v9, Gateway ; déploiement Satellite 6.2.
- Clusters Red Hat 7.2 avec Pacemaker.
- Automatisation : scripts shell (sauvegardes, restorations, intégrations).

**Stack.** Linux · Oracle · LVM · Control-M · Satellite · Pacemaker · Shell
