'use client'

import { Boxes, Cloud, Coins, Eye, GitBranch, Server, ShieldCheck, Sparkles } from 'lucide-react'
import { getCategorizedSkills } from '../_data/skill-categories'

const CATEGORY_ICONS: Record<string, typeof Sparkles> = {
  cloud: Cloud,
  iac: Boxes,
  gitops: GitBranch,
  observability: Eye,
  security: ShieldCheck,
  platform: Server,
  finops: Coins,
  other: Sparkles,
}

type Props = {
  activeTag: string | null
  onTagClick: (tag: string) => void
}

export function SkillsGrid({ activeTag, onTagClick }: Props) {
  const categories = getCategorizedSkills()
  const total = categories.reduce((acc, c) => acc + c.items.length, 0)

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t border-border bg-muted/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <header className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
              02 — Stack
            </p>
            <h2
              id="skills-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Compétences techniques
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            <span className="font-mono tabular-nums text-foreground">{total}</span> technologies, regroupées par
            domaine. Le compteur indique la fréquence en mission.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles
            return (
              <div
                key={cat.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:bg-accent/10"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {cat.label}
                    </h3>
                  </div>
                  <span className="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                    {cat.items.length}
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => {
                    const isActive = activeTag === item.tag
                    return (
                      <li key={item.tag}>
                        <button
                          type="button"
                          onClick={() => onTagClick(item.tag)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                            isActive
                              ? 'border-accent bg-accent text-on-primary'
                              : 'border-border bg-background text-foreground hover:border-accent/40'
                          }`}
                        >
                          <span className="font-medium">{item.tag}</span>
                          <span
                            className={`font-mono tabular-nums ${
                              isActive ? 'text-on-primary/80' : 'text-muted-foreground'
                            }`}
                          >
                            ×{item.count}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
