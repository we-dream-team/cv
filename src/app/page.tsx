'use client'

import { useEffect, useMemo, useState } from 'react'
import { ClientLogos } from './_components/ClientLogos'
import { ContactFooter } from './_components/ContactFooter'
import { Hero } from './_components/Hero'
import { MissionTimeline } from './_components/MissionTimeline'
import { Projects } from './_components/Projects'
import { SkillsGrid } from './_components/SkillsGrid'
import { Toolbar } from './_components/Toolbar'
import { MISSIONS, PROFILE } from './_data/profile'
import { getAllTags } from './_data/stats'

const allTags = getAllTags()

export default function Page() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MISSIONS.filter((m) => {
      const matchesQuery = !q
        ? true
        : [m.title, m.company, m.role, m.contexte, m.objectif, ...m.realisations, ...m.tags]
            .join(' ')
            .toLowerCase()
            .includes(q)
      const matchesTag = tag ? m.tags.includes(tag) : true
      return matchesQuery && matchesTag
    })
  }, [query, tag])

  const jsonLd = useMemo(() => {
    const siteUrl = 'https://cv.wedreamteam.com'
    const personId = `${siteUrl}/#person`
    const phoneE164 = `+33${PROFILE.phone.replace(/\s/g, '').replace(/^0/, '')}`

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': personId,
      name: PROFILE.name,
      givenName: 'Fayçal',
      familyName: 'ZOUAOUI',
      jobTitle: PROFILE.role,
      description:
        'Tech Lead DevOps et Cloud Engineer à Lille. 10+ ans d’expérience en industrialisation de plateformes cloud (AWS, GCP, Kubernetes, Terraform, GitOps, sécurité).',
      url: `${siteUrl}/`,
      image: `${siteUrl}/og.png`,
      email: `mailto:${PROFILE.email}`,
      telephone: phoneE164,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'We Dream Team',
        url: 'https://wedreamteam.com',
      },
      knowsAbout: [
        'Cloud computing',
        'Amazon Web Services',
        'Google Cloud Platform',
        'Kubernetes',
        'Terraform',
        'GitOps',
        'DevOps',
        'Platform Engineering',
        'Infrastructure as Code',
        'CI/CD',
        'Cloud Security',
        'FinOps',
        'Observability',
        'Site Reliability Engineering',
      ],
      knowsLanguage: ['fr', 'en'],
      sameAs: [PROFILE.linkedin, PROFILE.github].filter(Boolean),
      hasOccupation: MISSIONS.map((m) => ({
        '@type': 'Occupation',
        name: `${m.title} — ${m.company}`,
        description: m.objectif,
        occupationLocation: { '@type': 'Place', name: m.company },
        skills: m.tags.join(', '),
      })),
    }

    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: `${PROFILE.name} — Portfolio`,
      inLanguage: 'fr-FR',
      author: { '@id': personId },
      publisher: { '@id': personId },
    }

    return [person, website]
  }, [])

  const handleTagClick = (t: string) => {
    setTag((prev) => (prev === t ? null : t))
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <a
        href="#missions"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Aller au contenu
      </a>

      <Toolbar
        query={query}
        onQueryChange={setQuery}
        tag={tag}
        onTagChange={setTag}
        allTags={allTags}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        resultsCount={filtered.length}
        totalCount={MISSIONS.length}
      />

      <main>
        <Hero />
        <ClientLogos />

        <section
          id="missions"
          aria-labelledby="missions-heading"
          className="border-t border-border py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <header className="flex items-end justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
                  01 — Parcours
                </p>
                <h2
                  id="missions-heading"
                  className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Missions sélectionnées
                </h2>
              </div>
              <p className="hidden font-mono text-xs text-muted-foreground sm:block">
                {filtered.length} / {MISSIONS.length} missions
              </p>
            </header>

            <div className="mt-10">
              <MissionTimeline
                missions={filtered}
                activeTag={tag}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        </section>

        <SkillsGrid activeTag={tag} onTagClick={handleTagClick} />

        <Projects />
      </main>

      <ContactFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
