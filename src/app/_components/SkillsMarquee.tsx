'use client'

import { useEffect, useMemo, useRef } from 'react'
import { getAllTags } from '../_data/stats'

type RowProps = {
  items: string[]
  dir: 1 | -1
  baseSpeed: number
  velRef: React.MutableRefObject<number>
}

function MarqueeRow({ items, dir, baseSpeed, velRef }: RowProps) {
  const groupRef = useRef<HTMLSpanElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const offset = useRef(0)
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let last = 0
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 16.67, 3) : 1
      last = now
      const half = group.offsetWidth
      // vitesse de base + contribution de la vélocité de scroll
      offset.current -= (baseSpeed + Math.abs(velRef.current) * 0.6) * dir * dt
      if (half > 0) {
        if (offset.current <= -half) offset.current += half
        if (offset.current >= 0) offset.current -= half
      }
      const skew = Math.max(-8, Math.min(8, velRef.current * dir * 0.25))
      track.style.transform = `translate3d(${offset.current}px,0,0) skewX(${skew}deg)`
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [baseSpeed, dir, velRef])

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="flex will-change-transform">
        {[0, 1].map((k) => (
          <span
            key={k}
            ref={k === 0 ? groupRef : undefined}
            aria-hidden={k === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-6xl">
                  {t}
                </span>
                <span className="mx-5 text-accent sm:mx-8" aria-hidden>
                  ✳
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsMarquee() {
  const tags = useMemo(() => getAllTags(), [])
  const velRef = useRef(0)

  // Trois bandes alternées, contenu décalé pour éviter l'alignement vertical.
  const rows = useMemo(() => {
    const n = Math.ceil(tags.length / 3)
    return [tags.slice(0, n), tags.slice(n, 2 * n), tags.slice(2 * n)]
  }, [tags])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      velRef.current = y - lastY
      lastY = y
    }
    const decay = () => {
      velRef.current *= 0.88
      id = requestAnimationFrame(decay)
    }
    let id = requestAnimationFrame(decay)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <div className="select-none space-y-3 py-2">
      <MarqueeRow items={rows[0]} dir={1} baseSpeed={0.6} velRef={velRef} />
      <MarqueeRow items={rows[1]} dir={-1} baseSpeed={0.9} velRef={velRef} />
      <MarqueeRow items={rows[2]} dir={1} baseSpeed={0.7} velRef={velRef} />
    </div>
  )
}
