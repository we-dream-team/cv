'use client'

import { Building2, Calendar, ChevronRight } from 'lucide-react'
import type { Mission } from '../_data/profile'

type Props = {
  mission: Mission
  activeTag: string | null
  onTagClick: (tag: string) => void
}

export function MissionCard({ mission, activeTag, onTagClick }: Props) {
  return (
    <article className="card group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:border-accent/40 hover:shadow-elevated sm:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {mission.dates}
        </span>
        <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-2xs uppercase tracking-[0.2em] text-accent">
          {mission.role}
        </span>
      </header>

      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-[1.6rem]">
        {mission.title}
      </h3>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4" /> {mission.company}
      </p>

      <div className="mt-5 grid gap-3 text-sm leading-relaxed">
        <p className="text-pretty">
          <span className="font-medium text-foreground">Contexte. </span>
          <span className="text-muted-foreground">{mission.contexte}</span>
        </p>
        <p className="text-pretty">
          <span className="font-medium text-foreground">Objectif. </span>
          <span className="text-muted-foreground">{mission.objectif}</span>
        </p>
      </div>

      <ul className="mt-5 space-y-2 border-l border-border pl-4">
        {mission.realisations.map((r, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed">
            <ChevronRight className="mt-0.5 h-4 w-4 flex-none text-accent" />
            <span className="text-pretty">{r}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {mission.tags.map((t) => {
          const isActive = activeTag === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => onTagClick(t)}
              className={`rounded-full border px-2.5 py-1 font-mono text-xs transition-colors ${
                isActive
                  ? 'border-accent bg-accent text-on-primary'
                  : 'border-border bg-muted/60 text-muted-foreground hover:border-accent/40 hover:text-foreground'
              }`}
            >
              {t}
            </button>
          )
        })}
      </div>
    </article>
  )
}
