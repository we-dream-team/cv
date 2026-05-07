import { MISSIONS, PROFILE } from './profile'

export function getProfileStats() {
  const yearsOfXp = new Date().getFullYear() - PROFILE.startYear
  const allTags = new Set(MISSIONS.flatMap((m) => m.tags))
  const companies = new Set(MISSIONS.map((m) => m.company))

  return {
    yearsOfXp,
    missions: MISSIONS.length,
    technologies: allTags.size,
    companies: companies.size,
  }
}

export function getAllTags() {
  return Array.from(new Set(MISSIONS.flatMap((m) => m.tags))).sort()
}

export function getCompanies() {
  const seen = new Set<string>()
  const out: { name: string; short: string }[] = []
  for (const m of MISSIONS) {
    if (seen.has(m.company)) continue
    seen.add(m.company)
    const short = m.company.split(' (')[0].split(' – ')[0].trim()
    out.push({ name: m.company, short })
  }
  return out
}
