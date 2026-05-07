'use client'

import { Filter, Moon, Printer, Search, SunMedium, X } from 'lucide-react'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  tag: string | null
  onTagChange: (t: string | null) => void
  allTags: string[]
  dark: boolean
  onToggleDark: () => void
  resultsCount: number
  totalCount: number
}

export function Toolbar({
  query,
  onQueryChange,
  tag,
  onTagChange,
  allTags,
  dark,
  onToggleDark,
  resultsCount,
  totalCount,
}: Props) {
  const hasFilter = query.length > 0 || tag !== null

  return (
    <div className="no-print sticky top-0 z-30 border-b border-border bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3 sm:px-8">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Rechercher (entreprise, techno, action…)"
            className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-accent"
            aria-label="Rechercher dans les missions"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-2xs text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={tag ?? ''}
              onChange={(e) => onTagChange(e.target.value || null)}
              className="h-10 appearance-none rounded-full border border-border bg-surface pl-10 pr-9 text-sm focus:border-accent"
              aria-label="Filtrer par technologie"
            >
              <option value="">Toutes technologies</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {hasFilter && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('')
                onTagChange(null)
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" /> Réinitialiser
            </button>
          )}

          <span className="hidden rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground tabular-nums sm:inline-flex">
            {resultsCount}
            <span className="mx-1 text-border">/</span>
            {totalCount}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground hover:bg-muted"
          >
            {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            aria-label="Imprimer ou télécharger en PDF"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground hover:bg-muted"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
