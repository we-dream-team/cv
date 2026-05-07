'use client'

import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

const NAMESPACE = 'cv-faycal-zouaoui'
const KEY = 'visits'
const SESSION_FLAG = `vc:${NAMESPACE}:${KEY}:counted`

const formatNumber = (n: number) => new Intl.NumberFormat('fr-FR').format(n)

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const alreadyCounted =
      typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_FLAG) === '1'

    const url = alreadyCounted
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`

    let cancelled = false

    fetch(url, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { count?: number; value?: number }) => {
        if (cancelled) return
        const value = typeof data.count === 'number' ? data.count : data.value
        if (typeof value === 'number') setCount(value)
        if (!alreadyCounted) window.sessionStorage.setItem(SESSION_FLAG, '1')
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  if (count === null) return null

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground"
      title="Nombre total de visites de ce CV"
    >
      <Eye className="h-3.5 w-3.5" />
      <span className="tabular-nums text-foreground">{formatNumber(count)}</span>
      <span>visites</span>
    </span>
  )
}
