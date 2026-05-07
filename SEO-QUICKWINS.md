# SEO Quick Wins — cv.wedreamteam.com

Audit du 2026-05-07. Score actuel : **62/100**. Les actions ci-dessous visent les points Critical/High avec le meilleur ratio impact/effort.

## Ordre de priorité

| # | Action | Impact | Effort | Fichier |
|---|--------|--------|--------|---------|
| 1 | `robots.txt` + `sitemap.xml` + `llms.txt` | Critical | 5 min | `public/` |
| 2 | Metadata API : title / description / OG / Twitter / canonical | Critical | 15 min | `src/app/layout.tsx` |
| 3 | Générer `og.png` (1200×630) | Critical | 20 min | `public/og.png` |
| 4 | Upgrade JSON-LD Person (`sameAs`, `address`, `image`, `knowsAbout`) | High | 10 min | `src/app/page.tsx` |
| 5 | Bouton PDF → `<a href download>` (crawlable) | Medium | 5 min | `src/app/page.tsx` |
| 6 | Date « Mis à jour le » visible dans la page | Medium | 2 min | `src/app/page.tsx` |
| 7 | Favicon + apple-touch-icon | Medium | 10 min | `public/` + metadata |
| 8 | Supprimer le div compteur de visites caché | Low | 1 min | `src/app/page.tsx` |

---

## 1. `public/robots.txt`

Actuellement `https://cv.wedreamteam.com/robots.txt` renvoie **403 AccessDenied** (S3). Crawlers interprètent cela négativement.

```
User-agent: *
Allow: /

# AI crawlers (GEO)
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://cv.wedreamteam.com/sitemap.xml
```

## 2. `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cv.wedreamteam.com/</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

> Pense à actualiser `<lastmod>` à chaque mise à jour majeure du contenu.

## 3. `public/llms.txt` (GEO — citations IA)

```
# Fayçal ZOUAOUI — Ingénieur Cloud / DevOps

Portfolio de missions de Fayçal ZOUAOUI, Tech Lead DevOps basé à Lille (France).
10+ ans d'expérience AWS, Kubernetes, Terraform, GitOps, sécurité cloud.

## Contact
- Email: faycal.zouaoui@wedreamteam.com
- LinkedIn: https://www.linkedin.com/in/faycal-zouaoui-65b0a5201
- Localisation: Lille, France

## Missions principales
- Waykonect (TotalEnergies) — Tech Lead DevOps (2023–présent)
- SNCF Connect & Tech — Cloud Engineer AWS (2022–2023)
- Société Générale — Cloud Engineer AWS / DevOps (2018–2022)
- Finalcad — Cloud Engineer AWS (2020–2021)
- PMU — DevOps (2018)
- SFIL — Ingénieur Linux & Production (2015–2018)

## Stack
AWS, EKS, Terraform, GitHub Actions, FluxCD, ArgoCD, Helm, Vault,
Prometheus, Grafana, Jenkins, CircleCI, GitOps, Trivy, ACM-PCA, KEDA.
```

## 4. Metadata API — `src/app/layout.tsx`

Ajouter (ou enrichir) l'export `metadata` :

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cv.wedreamteam.com'),
  title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps · AWS · Kubernetes · Terraform',
  description:
    "Portfolio de missions de Fayçal ZOUAOUI, Ingénieur Cloud & DevOps à Lille. " +
    "Tech Lead DevOps (Waykonect/TotalEnergies), expert AWS, EKS, Terraform, " +
    "GitOps, sécurité & CI/CD. 10+ ans d'expérience.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: 'https://cv.wedreamteam.com/',
    title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps',
    description: "Tech Lead DevOps · AWS · Kubernetes · Terraform · 10+ ans d'expérience",
    siteName: 'Fayçal ZOUAOUI – Portfolio',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Fayçal ZOUAOUI – Ingénieur Cloud / DevOps',
    }],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps',
    description: 'Portfolio de missions Cloud & DevOps',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};
```

**Avant** :
- title : 38 chars (trop court)
- description : 63 chars (trop court)
- pas d'OG, pas de Twitter, pas de canonical

**Après** :
- title : ~75 chars (Google tronquera mais les mots-clés AWS/Kubernetes/Terraform passeront)
- description : ~210 chars (Google affichera ~160, le reste sert d'enrichissement sémantique)
- OG + Twitter complets → previews LinkedIn/Slack/Twitter OK
- Canonical self-referencing

## 5. `public/og.png` — image 1200×630

À générer (Figma, Canva, ou IA). Spécifications :
- 1200×630 px, ratio 1.91:1
- Fond slate-950 (cohérent avec le thème dark du site)
- Texte principal : « Fayçal ZOUAOUI »
- Sous-titre : « Ingénieur Cloud / DevOps · AWS · Kubernetes · Terraform »
- Petit pied : « cv.wedreamteam.com »
- Format PNG ou JPG, < 200 KB

> Astuce : `/seo image-gen og` peut générer cela via Gemini si l'extension `nanobanana-mcp` est installée.

## 6. JSON-LD enrichi — remplace le bloc actuel dans `src/app/page.tsx`

```ts
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fayçal ZOUAOUI',
  givenName: 'Fayçal',
  familyName: 'ZOUAOUI',
  jobTitle: 'Ingénieur Cloud / DevOps',
  description:
    "Tech Lead DevOps avec 10+ ans d'expérience en AWS, Kubernetes, Terraform et GitOps.",
  url: 'https://cv.wedreamteam.com/',
  image: 'https://cv.wedreamteam.com/profile.jpg',
  email: 'faycal.zouaoui@wedreamteam.com',
  telephone: '+33651160207',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lille',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.linkedin.com/in/faycal-zouaoui-65b0a5201',
  ],
  knowsAbout: [
    'AWS', 'Kubernetes', 'EKS', 'Terraform', 'GitOps', 'FluxCD', 'ArgoCD',
    'Helm', 'Vault', 'CI/CD', 'GitHub Actions', 'DevOps', 'Cloud Security',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Waykonect (filiale TotalEnergies)',
  },
};
```

**Changements vs version actuelle** :
- `address` : string → `PostalAddress` typé
- `worksFor` : string → `Organization`
- `email` : suppression du préfixe `mailto:`
- Ajout : `url`, `image`, `description`, `sameAs`, `knowsAbout`, `givenName`, `familyName`, `telephone`
- ItemList des missions peut rester, mais `CreativeWork` → considérer `Role` ou simplement laisser tel quel (pas de gain SEO majeur)

## 7. PDF crawlable — `src/app/page.tsx`

Le bouton actuel est un `<button>` non crawlable. À remplacer :

```tsx
<a
  href="/cv-faycal-zouaoui.pdf"
  download
  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
  aria-label="Télécharger le CV en PDF"
  title="Télécharger le CV en PDF"
>
  <Download className="w-4 h-4" />
</a>
```

> Place le PDF dans `public/cv-faycal-zouaoui.pdf` (taille recommandée < 1 MB).

## 8. Date de mise à jour visible

Ajouter en header ou footer :

```tsx
<p className="text-xs opacity-60">Mis à jour le 7 mai 2026</p>
```

Signal de fraîcheur pour Google + AI search. Idéalement automatisé via `last-modified` du build (variable `process.env.BUILD_DATE` injectée dans le workflow).

## 9. Favicon

- Place `favicon.ico` (32×32 et 16×16) dans `public/`
- Place `apple-touch-icon.png` (180×180) dans `public/`
- Déjà déclarés dans le bloc `metadata` (point 4)

## 10. Nettoyage

Supprimer le div caché `nbr-visite` dans `src/app/page.tsx` (compteur de visites non utilisé, pollue le DOM).

---

## Vérification post-déploiement

```bash
# robots.txt
curl -sI https://cv.wedreamteam.com/robots.txt | head -5

# sitemap
curl -s https://cv.wedreamteam.com/sitemap.xml | head -20

# llms.txt
curl -s https://cv.wedreamteam.com/llms.txt | head -10

# OG tags
curl -s https://cv.wedreamteam.com/ | grep -E 'og:|twitter:|canonical'

# JSON-LD
curl -s https://cv.wedreamteam.com/ | grep -oE '<script type="application/ld\+json">[^<]+' | head -1
```

Outils de validation :
- [Rich Results Test](https://search.google.com/test/rich-results) — JSON-LD
- [OpenGraph.xyz](https://www.opengraph.xyz/) — preview cards
- [PageSpeed Insights](https://pagespeed.web.dev/) — Core Web Vitals

## Score visé après quick wins

**62 → 85+**, principalement via :
- robots/sitemap/llms.txt (Technical + GEO)
- OG/Twitter (On-Page + partage social)
- JSON-LD enrichi (Schema + AI citation)
- Title/description enrichis (On-Page + ranking)
