'use client'

import React, { useMemo, useState } from 'react'
import { Briefcase, Search, Filter, Moon, SunMedium, Printer, Mail, Phone, MapPin, Link as LinkIcon, ShieldCheck, Rocket, Sparkles } from 'lucide-react'

const PROFILE = {
  name: 'Fayçal ZOUAOUI',
  role: 'Ingénieur Cloud / DevOps',
  email: 'zouaoui.faycal.p@gmail.com',
  phone: '06 51 16 02 07',
  location: 'Lille, France',
  website: null as string | null,
}

type Mission = {
  title: string
  dates: string
  company: string
  role: string
  contexte: string
  objectif: string
  realisations: string[]
  tags: string[]
}

const MISSIONS: Mission[] = [
  {
    title: 'Tech Lead DevOps',
    dates: 'Novembre 2023 – Présent',
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

const allTags = Array.from(new Set(MISSIONS.flatMap((m) => m.tags))).sort()

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [dark, setDark] = useState(true)



  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MISSIONS.filter((m) => {
      const matchesQuery = !q
        ? true
        : [m.title, m.company, m.role, m.contexte, m.objectif, ...m.realisations, ...m.tags]
            .join(' ')
            .toLowerCase()
            .includes(q)
      const matchesTag = tag ? m.tags.includes(tag) : true
      return matchesQuery && matchesTag
    })
  }, [query, tag])

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      address: PROFILE.location,
      email: `mailto:${PROFILE.email}`,
      worksFor: 'Indépendant / Missions',
      hasPart: {
        '@type': 'ItemList',
        itemListElement: MISSIONS.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: `${m.company} – ${m.title}`,
            description: `${m.dates} – ${m.objectif}`,
            about: m.tags.join(', '),
          },
        })),
      },
    }),
    []
  )

  return (
    <div className={classNames(dark ? 'dark' : '', 'min-h-screen')}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .card { break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
        <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 backdrop-blur bg-white/70 dark:bg-slate-900/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Briefcase className="w-6 h-6"/>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{PROFILE.name} — {PROFILE.role}</h1>
              <p className="text-sm opacity-80 flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4"/> {PROFILE.email}</span>
                <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4"/> {PROFILE.phone}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4"/> {PROFILE.location}</span>
                {PROFILE.website && <span className="inline-flex items-center gap-1"><LinkIcon className="w-4 h-4"/> {PROFILE.website}</span>}
              </p>
            </div>
            <div className="no-print flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Basculer le thème"
              >
                {dark ? <SunMedium className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Printer className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="col-span-2 flex items-center gap-2">
              <Search className="w-5 h-5 opacity-70"/>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (entreprise, techno, action, ... )"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 opacity-70"/>
              <select
                value={tag ?? ''}
                onChange={(e) => setTag(e.target.value || null)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2"
                aria-label="Filtrer par technologie"
              >
                <option value="">Toutes technologies</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={() => setTag(null)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          <section className="grid sm:grid-cols-3 gap-3 mb-8">
            <StatCard icon={<ShieldCheck className="w-5 h-5"/>} title="Missions" value={MISSIONS.length} />
            <StatCard icon={<Rocket className="w-5 h-5"/>} title="Compétences tech" value={allTags.length} />
            <StatCard icon={<Sparkles className="w-5 h-5"/>} title="Imprimable" value="Oui" />
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            {filtered.map((m, idx) => (
              <article key={idx} className="card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-5">
                  <h2 className="text-lg font-semibold leading-tight">{m.company} · {m.title}</h2>
                  <p className="text-sm opacity-80 mt-1">{m.role} — {m.dates}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span key={t} className="inline-block text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200 border border-sky-200 dark:border-sky-800">{t}</span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-3">
                    <Section title="Contexte" text={m.contexte} />
                    <Section title="Objectif" text={m.objectif} />
                    <div>
                      <h3 className="font-medium mb-2">Réalisations</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {m.realisations.map((r, i) => (
                          <li key={i} className="marker:text-sky-500">{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>



        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  )
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm opacity-90 leading-relaxed mt-1">{text}</p>
    </div>
  )
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 grid place-items-center">{icon}</div>
      <div>
        <div className="text-xs opacity-70">{title}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  )
}
