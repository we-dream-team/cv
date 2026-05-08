'use client'

import { ArrowUpRight, Briefcase, Sparkles } from 'lucide-react'

type ProjectKind = 'perso' | 'client'

type Project = {
  name: string
  domain: string
  href: string
  description: string
  kind: ProjectKind
}

const PROJECTS: Project[] = [
  {
    name: 'We Dream Team',
    domain: 'wedreamteam.com',
    href: 'https://wedreamteam.com',
    description: 'Mon agence Cloud / DevOps. Conseil, build & run de plateformes.',
    kind: 'perso',
  },
  {
    name: 'Dentaboard',
    domain: 'dentaboard.com',
    href: 'https://dentaboard.com',
    description: 'SaaS de pilotage pour cabinets dentaires.',
    kind: 'perso',
  },
  {
    name: 'Leasing Malin',
    domain: 'leasingmalin.com',
    href: 'https://leasingmalin.com',
    description: 'Plateforme de leasing — comparaison & souscription en ligne.',
    kind: 'perso',
  },
  {
    name: 'MN Médecine Esthétique',
    domain: 'mn-medecine-esthetique.com',
    href: 'https://mn-medecine-esthetique.com',
    description: 'Site vitrine — cabinet de médecine esthétique.',
    kind: 'client',
  },
  {
    name: 'Pluridental',
    domain: 'pluridental.fr',
    href: 'https://pluridental.fr',
    description: 'Site vitrine — cabinet dentaire pluridisciplinaire.',
    kind: 'client',
  },
]

const KIND_META: Record<ProjectKind, { label: string; icon: typeof Sparkles; classes: string }> = {
  perso: {
    label: 'Projet perso',
    icon: Sparkles,
    classes: 'border-accent/30 bg-accent/10 text-accent',
  },
  client: {
    label: 'Client',
    icon: Briefcase,
    classes: 'border-border bg-background text-muted-foreground',
  },
}

export function Projects() {
  return (
    <section
      id="projets"
      aria-labelledby="projets-heading"
      className="relative border-t border-border py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <header className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
              03 — Réalisations
            </p>
            <h2
              id="projets-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Projets & sites en production
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Mes propres produits et quelques sites livrés pour des clients.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => {
            const meta = KIND_META[p.kind]
            const KindIcon = meta.icon
            return (
              <a
                key={p.domain}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elevated"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:bg-accent/10"
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.2em] ${meta.classes}`}
                  >
                    <KindIcon className="h-3 w-3" />
                    {meta.label}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{p.domain}</p>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">
                  {p.description}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
