# Résumé des contributions techniques — Platform Engineering

> **Fayçal Zouaoui** — Platform Engineer (Prestataire) | depuis oct. 2025

---

## Infrastructure Kubernetes & Cloud (EKS / GKE / On-prem)

- **Migration on-premise → EKS** : migration de plusieurs services métier vers les clusters EKS staging et production AWS (`eu-west-1`, `us-east-2`, `us-west-2`).
- **Réduction de la dette technique Kubernetes** : audit structuré (cluster add-ons, GitOps/Flux, Kyverno, versions, sécurité, observabilité) sur cluster de production et plan de remédiation priorisé.
- **Audit des Topology Spread Constraints (TSC)** : analyse de la distribution des pods par zone sur les clusters EKS, GKE et on-prem, avec plan d'action pour améliorer la résilience.
- **Optimisation des ressources** : audit des `requests` et `limits` CPU/mémoire d'un node pool stateful pour réduire le surprovisionnement.
- **Mise en place DNS pour les load balancers Dragonfly** : enregistrements DNS via `external-dns` pour tous les LB Dragonfly (région / environnement / service).

---

## Sécurité & Compliance (Wiz)

- **Déploiement de Wiz** sur l'ensemble des clusters GCP et EKS (dev, staging, prod, toutes régions).
- **Intégration de Wiz dans le pipeline CI/CD** : automatisation de l'agent Wiz dans les processus de déploiement.
- **Scan IaC Terraform** : configuration de Wiz pour scanner les dépôts Terraform.
- **Exposition des rapports Wiz** via un bucket S3 dédié, intégrés à un outil de gouvernance interne.
- **Scan d'images** : mise en place d'un compte registre dédié pour les scans Wiz.
- **Documentation Confluence (30+ pages)** : rédaction et publication des résultats de scans Wiz pour tous les périmètres et environnements.

---

## GitOps & Developer Experience

- **Déploiement d'`AGENTS.md` et de skills pour Flux** : documentation IA dans les dépôts Flux (staging et prod), couvrant les conventions de nommage, les checklists de migration EKS/GKE et les MCP disponibles (GitHub, AWS, GKE, Atlassian, Wiz).
- **Amélioration d'`AGENTS.md`** : découpage en skills dédiées pour une meilleure modularité.
- **Étude et intégration du Wiz MCP Server avec Cursor** : exploration et documentation de l'intégration IA / sécurité.
- **Documentation du workflow CD** : contribution à la documentation GitOps/Flux (getting started, ajout de cluster, structure de projet).

---

## Optimisation des coûts & Observabilité

- **Audit services internes vs ingress** : identification des opportunités de remplacer ingress/NLB par des services Kubernetes internes pour réduire les coûts réseau.
- **Raffinement d'un dashboard de coûts** : amélioration du monitoring des services via les labels Kubernetes (`app.kubernetes.io/name`, `app.kubernetes.io/instance`).
- **Labellisation d'un node pool stateful** : labels pour évaluer la migration vers du Redis managé / Dragonfly.

---

## Documentation Confluence

- Documentation **ChartMuseum** (référentiel de charts Helm interne).
- **Vue d'ensemble** de l'architecture plateforme.
- **Audit** sur l'utilisation des services internes vs ingress (TSC et coûts réseau).

---

## Résumé synthétique (format CV)

> Platform Engineer (Prestataire) — depuis oct. 2025
>
> Migration d'infrastructures on-premise vers Kubernetes (EKS/GKE), déploiement et intégration de la solution de sécurité cloud **Wiz** sur 15+ clusters (AWS, GCP), réduction de la dette technique Kubernetes, mise en place de pratiques **GitOps/Flux**, optimisation des coûts cloud, contribution à l'outillage IA pour les équipes (`AGENTS.md`, MCP servers, intégration Cursor). Rédaction de **30+ pages de documentation Confluence**.
