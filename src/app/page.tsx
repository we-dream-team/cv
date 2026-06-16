'use client'

import { useMemo } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { MiniNav } from './_components/MiniNav'
import { Reveal } from './_components/Reveal'
import { SkillsMarquee } from './_components/SkillsMarquee'
import { MISSIONS, PROFILE } from './_data/profile'
import { getCompanies, getProfileStats } from './_data/stats'

// Punchline éditoriale par mission phare (le « pourquoi ça compte »).
const PUNCH: Record<string, string> = {
  Dailymotion: '15+ clusters scannés, la dette Kubernetes remise à plat.',
  Nexity: 'Une plateforme AWS multi-comptes, livrable en GitOps.',
  'Waykonect (filiale TotalEnergies)':
    'Un cadre CI/CD commun pour 15 ingénieurs, sécurité intégrée.',
  'SNCF Connect & Tech':
    'EC2 → EKS : des déploiements auditables, secrets sous Vault.',
  'Société Générale': 'Des modules Terraform réutilisables, Vault en blue/green.',
}

const PROJECTS = [
  { name: 'We Dream Team', domain: 'wedreamteam.com', href: 'https://wedreamteam.com' },
  { name: 'Dentaboard', domain: 'dentaboard.com', href: 'https://dentaboard.com' },
  { name: 'Leasing Malin', domain: 'leasingmalin.com', href: 'https://leasingmalin.com' },
]

function shortCompany(c: string) {
  return c.split(' (')[0].split(' – ')[0].trim()
}

export default function Page() {
  const stats = getProfileStats()
  const companies = useMemo(() => getCompanies(), [])
  const flagship = MISSIONS.slice(0, 5)
  const earlier = MISSIONS.slice(5)

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

  return (
    <>
      <span id="top" />
      <MiniNav />

      <main className="overflow-x-clip">
        {/* ─── Écran 1 — la phrase ───────────────────────────────────── */}
        <section className="flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {PROFILE.name} — {PROFILE.role}
          </p>

          <h1 className="max-w-[16ch] font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.86] tracking-tight">
            Je construis des plateformes qui{' '}
            <span className="text-accent">ne tombent pas.</span>
          </h1>

          <a
            href="#parcours"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </span>
            Faire défiler
          </a>
        </section>

        {/* ─── Écran 2 — le chiffre ──────────────────────────────────── */}
        <section className="flex min-h-[90svh] items-center border-t border-border px-6 py-20 sm:px-10">
          <div className="max-w-5xl">
            <Reveal as="p" className="font-display text-[clamp(2.2rem,7vw,5.5rem)] uppercase leading-[0.92] tracking-tight">
              {stats.yearsOfXp} ans. {companies.length} grands comptes.
              <br />
              Une obsession : <span className="text-accent">la fiabilité.</span>
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mt-8 max-w-2xl font-body text-lg text-muted-foreground sm:text-xl text-pretty"
            >
              Depuis {PROFILE.startYear}, j’industrialise les plateformes cloud de
              grands groupes : AWS et GCP multi-comptes, Kubernetes en GitOps,
              Infrastructure as Code, sécurité et observabilité. Mon métier, c’est
              rendre l’infra répétable, sûre et sobre — pas de page de garde inutile.
            </Reveal>
            <Reveal as="ul" delay={220} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {companies.map((c) => (
                <li key={c.name}>{c.short}</li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ─── Chapitres — missions phares ───────────────────────────── */}
        <div id="parcours">
          {flagship.map((m, i) => {
            const co = shortCompany(m.company)
            return (
              <section
                key={`${m.company}-${m.dates}`}
                className="relative flex min-h-[85svh] items-center border-t border-border px-6 py-24 sm:px-10 sm:py-28"
              >
                <span
                  aria-hidden
                  className="ghost-num pointer-events-none absolute right-4 top-6 font-display text-[18vw] leading-none sm:right-10"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative w-full max-w-4xl">
                  <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {m.dates} · {m.role}
                  </Reveal>

                  <Reveal
                    as="h2"
                    effect="reveal"
                    className="mt-4 font-display text-[clamp(2.6rem,9vw,7rem)] uppercase leading-[0.88] tracking-tight"
                  >
                    {co}
                  </Reveal>

                  <span aria-hidden className="rule-draw mt-6 block h-0.5 w-40 origin-left bg-accent" />

                  {PUNCH[m.company] && (
                    <Reveal
                      as="p"
                      delay={100}
                      className="mt-6 max-w-2xl font-display text-2xl uppercase leading-tight tracking-tight text-foreground sm:text-3xl"
                    >
                      {PUNCH[m.company]}
                    </Reveal>
                  )}

                  {/* Mise en situation + objectif */}
                  <Reveal
                    as="p"
                    delay={150}
                    className="mt-7 max-w-2xl font-body text-base leading-relaxed text-muted-foreground text-pretty"
                  >
                    {m.contexte}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={180}
                    className="mt-4 max-w-2xl font-body text-base leading-relaxed text-foreground text-pretty"
                  >
                    <span className="text-accent">Objectif — </span>
                    {m.objectif}
                  </Reveal>

                  {/* Ce que j'ai livré */}
                  <Reveal as="div" delay={220} className="mt-10">
                    <p className="font-mono text-2xs uppercase tracking-[0.25em] text-muted-foreground">
                      Ce que j’ai livré
                    </p>
                    <ul className="mt-4 max-w-3xl border-t border-border">
                      {m.realisations.map((r, j) => (
                        <li
                          key={j}
                          className="flex gap-4 border-b border-border py-3.5 font-body text-sm leading-relaxed text-pretty sm:text-base"
                        >
                          <span className="select-none font-mono text-xs text-accent" aria-hidden>
                            {String(j + 1).padStart(2, '0')}
                          </span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal
                    as="p"
                    delay={260}
                    className="mt-6 font-mono text-xs leading-relaxed tracking-wide text-muted-foreground"
                  >
                    {m.tags.join(' · ')}
                  </Reveal>
                </div>
              </section>
            )
          })}
        </div>

        {/* ─── Avant ça — condensé ───────────────────────────────────── */}
        <section className="border-t border-border px-6 py-20 sm:px-10">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Avant ça
          </Reveal>
          <ul className="mt-8 max-w-4xl divide-y divide-border">
            {earlier.map((m) => (
              <li key={`${m.company}-${m.dates}`}>
                <Reveal className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
                      {shortCompany(m.company)}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                      {m.dates}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl font-body text-sm text-muted-foreground text-pretty">
                    <span className="text-foreground">{m.role}.</span> {m.objectif}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Le stack en mouvement ─────────────────────────────────── */}
        <section className="overflow-hidden border-t border-border py-20">
          <p className="mb-10 px-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:px-10">
            La boîte à outils tourne en continu
          </p>
          <SkillsMarquee />
        </section>

        {/* ─── Index des projets ─────────────────────────────────────── */}
        <section className="border-t border-border px-6 py-20 sm:px-10">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            En production, signé moi
          </Reveal>
          <ul className="mt-8 max-w-4xl">
            {PROJECTS.map((p) => (
              <li key={p.domain} className="border-b border-border">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6"
                >
                  <span className="font-display text-3xl uppercase tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
                    {p.name}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-foreground">
                    {p.domain}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Contact — dernier écran ───────────────────────────────── */}
        <section
          id="contact"
          className="flex min-h-[100svh] flex-col justify-center border-t border-border px-6 py-20 sm:px-10"
        >
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Disponible · Lille / Remote · Freelance
          </Reveal>
          <Reveal as="h2" delay={80} className="mt-6 font-display text-[clamp(3rem,12vw,9rem)] uppercase leading-[0.85] tracking-tight">
            Parlons.
          </Reveal>

          <div className="mt-12 grid max-w-3xl gap-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-baseline gap-3 font-display text-2xl uppercase tracking-tight transition-colors hover:text-accent sm:text-4xl"
            >
              {PROFILE.email}
              <ArrowUpRight className="h-5 w-5 self-center text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm uppercase tracking-[0.12em]">
              <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="text-muted-foreground transition-colors hover:text-foreground">
                {PROFILE.phone}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="border-b border-transparent text-muted-foreground transition-colors hover:border-accent hover:text-foreground">
                LinkedIn
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="border-b border-transparent text-muted-foreground transition-colors hover:border-accent hover:text-foreground">
                GitHub
              </a>
              <a href="/cv-faycal-zouaoui.pdf" download className="border-b border-transparent text-muted-foreground transition-colors hover:border-accent hover:text-foreground">
                CV.pdf
              </a>
              <a href="/cv-faycal-zouaoui.docx" download className="border-b border-transparent text-muted-foreground transition-colors hover:border-accent hover:text-foreground">
                CV.docx
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <span>{PROFILE.location}</span>
            <span className="flex items-center gap-4">
              <a href="/mentions-legales/" className="transition-colors hover:text-foreground">
                Mentions légales
              </a>
              <span>© {new Date().getFullYear()} {PROFILE.name}</span>
            </span>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
