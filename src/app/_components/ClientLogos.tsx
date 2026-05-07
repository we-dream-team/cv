'use client'

import { getCompanies } from '../_data/stats'

export function ClientLogos() {
  const companies = getCompanies()
  return (
    <section
      aria-label="Entreprises avec lesquelles j’ai travaillé"
      className="border-b border-border bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex items-center gap-3">
          <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
            Ils m’ont fait confiance
          </p>
          <span aria-hidden className="h-px flex-1 bg-border" />
          <span className="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
            {String(companies.length).padStart(2, '0')}
          </span>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {companies.map((c) => (
            <li
              key={c.name}
              title={c.name}
              className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-border transition-colors group-hover:bg-accent"
              />
              <span className="truncate">{c.short}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
