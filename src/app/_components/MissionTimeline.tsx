'use client'

import type { Mission } from '../_data/profile'
import { MissionCard } from './MissionCard'

type Props = {
  missions: Mission[]
  activeTag: string | null
  onTagClick: (tag: string) => void
}

export function MissionTimeline({ missions, activeTag, onTagClick }: Props) {
  if (missions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-display text-lg">Aucune mission ne correspond à ces critères.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Essaie de retirer le filtre ou d’élargir la recherche.
        </p>
      </div>
    )
  }

  const total = missions.length

  return (
    <ol className="relative">
      <span
        aria-hidden
        className="no-print pointer-events-none absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent sm:left-[27px]"
      />
      {missions.map((m, idx) => (
        <li
          key={`${m.company}-${m.dates}`}
          className="relative grid grid-cols-[40px_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[56px_1fr] sm:gap-x-6"
        >
          <div className="no-print flex flex-col items-center pt-6">
            <span
              aria-hidden
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface font-mono text-2xs font-medium text-muted-foreground shadow-soft sm:h-14 sm:w-14 sm:text-xs"
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-md" />
              {String(total - idx).padStart(2, '0')}
            </span>
          </div>

          <MissionCard mission={m} activeTag={activeTag} onTagClick={onTagClick} />
        </li>
      ))}
    </ol>
  )
}
