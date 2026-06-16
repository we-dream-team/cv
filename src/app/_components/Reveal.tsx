'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Classe d'effet appliquée avant l'entrée (reveal | rule-draw). */
  effect?: 'reveal' | 'rule-draw'
  /** Délai d'apparition, en ms. */
  delay?: number
  as?: ElementType
  once?: boolean
}

/**
 * Révèle son contenu quand il entre dans le viewport.
 * Volet clip-path (jamais de fade-up). Sûr en SSR ; l'état caché initial est
 * porté par le CSS, donc aucun flash avant hydratation.
 */
export function Reveal({
  children,
  className = '',
  effect = 'reveal',
  delay = 0,
  as,
  once = true,
}: Props) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Si le mouvement est réduit ou si l'API manque : on révèle direct, sans armer.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // On « arme » l'élément : c'est seulement ICI (JS vivant) que le CSS le masque.
    el.dataset.armed = ''

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            if (once) io.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    // Filet de sécurité : si rien ne se déclenche en 2.5 s, on révèle quand même.
    const safety = window.setTimeout(() => setInView(true), 2500)

    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [once])

  return (
    <Tag
      ref={ref}
      className={`${effect} ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
