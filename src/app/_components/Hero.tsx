'use client'

import {
  ArrowRight,
  Briefcase,
  Building2,
  Code2,
  Download,
  FileText,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { PROFILE } from '../_data/profile'
import { getProfileStats } from '../_data/stats'

const STATS_META: Record<
  keyof ReturnType<typeof getProfileStats>,
  { label: string; icon: typeof Sparkles }
> = {
  yearsOfXp: { label: "Années d'expérience", icon: Sparkles },
  missions: { label: 'Missions', icon: Briefcase },
  technologies: { label: 'Technologies', icon: Code2 },
  companies: { label: 'Entreprises', icon: Building2 },
}

export function Hero() {
  const stats = getProfileStats()

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_30%,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--color-border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-border)/0.6)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-2xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Disponible · Lille / Remote
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tightest text-balance sm:text-6xl lg:text-7xl">
          {PROFILE.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl text-pretty">
          <span className="text-foreground">{PROFILE.role}.</span> {PROFILE.tagline}
        </p>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground text-pretty">
          Tech Lead DevOps et Cloud Engineer basé à Lille. Fayçal ZOUAOUI, j’accompagne
          depuis 2015 des grands comptes (Dailymotion, TotalEnergies, SNCF Connect &amp; Tech,
          Société Générale, Nexity) dans l’industrialisation de leurs plateformes cloud.
          Ma pratique combine architectures AWS et GCP multi-comptes, exploitation de clusters
          Kubernetes (EKS, GKE) en GitOps (FluxCD, Helm, ArgoCD), Infrastructure as Code
          (Terraform, Terragrunt) et sécurité cloud (Wiz CNAPP, Kyverno, OIDC, IRSA, Vault).
          J’interviens en Tech Lead, Platform Engineer ou Cloud Architect sur des contextes
          exigeants en scale, fiabilité et conformité, avec un focus sur la standardisation
          CI/CD (GitHub Actions), l’observabilité (Datadog, Dynatrace, OpenTelemetry) et
          l’efficience FinOps. Disponible pour de nouvelles missions freelance, à Lille
          ou en remote depuis la France.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-on-primary shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-elevated focus-visible:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            Me contacter
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/cv-faycal-zouaoui.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Télécharger le CV
            <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-2xs uppercase tracking-wider text-muted-foreground">
              PDF
            </span>
          </a>
          <a
            href="/cv-faycal-zouaoui.docx"
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            <span className="font-mono text-2xs uppercase tracking-wider">.docx</span>
          </a>
          <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {PROFILE.location}
          </span>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
            Stack signature
          </p>
          <span aria-hidden className="h-px w-8 bg-border" />
          {PROFILE.signatureStack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {(Object.keys(stats) as (keyof typeof stats)[]).map((key) => {
            const Icon = STATS_META[key].icon
            return (
              <div
                key={key}
                className="flex flex-col gap-2 bg-surface/80 p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                    {STATS_META[key].label}
                  </span>
                </div>
                <dd className="font-display text-3xl font-semibold tabular-nums tracking-tightest sm:text-4xl">
                  {stats[key]}
                  <span className="text-accent">+</span>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
