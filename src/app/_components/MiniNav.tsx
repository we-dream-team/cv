'use client'

import { useEffect, useState } from 'react'

export function MiniNav() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`no-print fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        shown ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg uppercase tracking-tight text-foreground"
        >
          F. Zouaoui
        </a>
        <nav className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.15em]">
          <a
            href="/cv-faycal-zouaoui.pdf"
            download
            className="border-b border-transparent text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            cv.pdf
          </a>
          <a
            href="#contact"
            className="bg-primary px-3 py-1.5 text-on-primary transition-colors hover:bg-accent"
          >
            Me contacter
          </a>
        </nav>
      </div>
      <div className="h-px w-full bg-border" />
    </div>
  )
}
