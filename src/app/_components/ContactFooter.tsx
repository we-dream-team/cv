'use client'

import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { PROFILE } from '../_data/profile'
import { VisitorCount } from './VisitorCount'

type ContactItem = {
  label: string
  value: string
  display: string
  href: string
  icon: typeof Mail
  external?: boolean
}

export function ContactFooter() {
  const items: ContactItem[] = [
    {
      label: 'Email',
      value: PROFILE.email,
      display: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      icon: Mail,
    },
    {
      label: 'Téléphone',
      value: PROFILE.phone,
      display: PROFILE.phone,
      href: `tel:${PROFILE.phone.replace(/\s/g, '')}`,
      icon: Phone,
    },
  ]

  if (PROFILE.linkedin) {
    items.push({
      label: 'LinkedIn',
      value: PROFILE.linkedin,
      display: PROFILE.linkedin.replace(/^https?:\/\//, ''),
      href: PROFILE.linkedin,
      icon: Linkedin,
      external: true,
    })
  }

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border bg-background scroll-mt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
              03 — Contact
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-balance sm:text-5xl">
              Parlons de votre prochaine plateforme.
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground text-pretty">
              Disponible pour des missions Cloud / DevOps, audits d’architecture,
              industrialisation CI-CD ou accompagnement d’équipes plateforme.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-2xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Réponse sous 24 h
            </div>
          </div>

          <ul className="grid content-start gap-3">
            {items.map(({ label, display, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elevated"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                        {label}
                      </span>
                      <span className="mt-0.5 block font-medium">{display}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> Basé à {PROFILE.location}
          </p>
          <VisitorCount />
          <p className="font-mono text-2xs uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
