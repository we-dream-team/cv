'use client'

import { ArrowLeft, Eye, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const NAMESPACE = 'cv-faycal-zouaoui'
const KEY = 'visits'
const READ_URL = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/`

const formatNumber = (n: number) => new Intl.NumberFormat('fr-FR').format(n)

type CounterPayload = {
  count?: number
  value?: number
  updated_at?: string
}

export default function CountPage() {
  const [count, setCount] = useState<number | null>(null)
  const [previous, setPrevious] = useState<number | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const lastCount = useRef<number | null>(null)

  const fetchCount = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true)
    try {
      const r = await fetch(READ_URL, { cache: 'no-store' })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data: CounterPayload = await r.json()
      const value = typeof data.count === 'number' ? data.count : data.value ?? null
      if (value === null) throw new Error('payload invalide')

      if (lastCount.current !== null && lastCount.current !== value) {
        setPrevious(lastCount.current)
      }
      lastCount.current = value
      setCount(value)
      if (data.updated_at) setUpdatedAt(data.updated_at)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau')
    } finally {
      if (!silent) setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchCount()
    const id = window.setInterval(() => fetchCount(true), 10_000)
    return () => window.clearInterval(id)
  }, [fetchCount])

  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_50%,#000_30%,transparent_80%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--color-border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-border)/0.6)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col px-6 py-10 sm:px-8 sm:py-14">
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour CV
          </a>
          <button
            type="button"
            onClick={() => fetchCount()}
            aria-label="Rafraîchir"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            Compteur public · cv.wedreamteam.com
          </span>

          <h1 className="mt-8 font-display text-7xl font-semibold leading-none tabular-nums tracking-tightest sm:text-8xl lg:text-[10rem]">
            {count === null ? (
              <span className="text-muted-foreground">···</span>
            ) : (
              <span>{formatNumber(count)}</span>
            )}
          </h1>

          <p className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            visites
          </p>

          <p className="mt-2 max-w-md text-sm text-muted-foreground text-pretty">
            Nombre cumulé d’ouvertures de mon CV depuis sa mise en ligne.
          </p>

          {previous !== null && count !== null && previous !== count && (
            <p className="mt-3 font-mono text-2xs uppercase tracking-[0.2em] text-emerald-500">
              +{count - previous} depuis l’ouverture de cette page
            </p>
          )}
        </section>

        <footer className="mt-10 grid gap-2 border-t border-border pt-6 text-center font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground sm:grid-cols-3 sm:text-left">
          <span>
            Source : <span className="text-foreground">counterapi.dev</span>
          </span>
          <span className="sm:text-center">
            Rafraîchi toutes les 10 s
          </span>
          <span className="sm:text-right">
            {updatedAt
              ? `MAJ ${new Date(updatedAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}`
              : ''}
          </span>
          {error && (
            <span className="text-destructive sm:col-span-3">⚠ {error}</span>
          )}
        </footer>
      </div>
    </main>
  )
}
