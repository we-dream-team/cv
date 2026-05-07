# Analyse GEO — cv.wedreamteam.com

> Analyse Generative Engine Optimization (GEO) du portfolio de Fayçal ZOUAOUI.
> Cadrée pour un site CV personnel (et non un blog SaaS) : objectif = être correctement cité par ChatGPT, Claude, Perplexity et Google AI Overviews sur des requêtes nominatives ou professionnelles.
>
> Date d'analyse : 2026-05-07
> Périmètre : `https://cv.wedreamteam.com/` (Next.js 14, `output: 'export'`, hébergé S3 + CloudFront).

---

## 1. Score de préparation GEO : **74 / 100**

| Dimension | Poids | Score | Pondéré | Commentaire |
|---|---|---|---|---|
| Citabilité (passages extractibles) | 25 % | 60/100 | 15.0 | Données denses et factuelles, mais aucun bloc-réponse self-contained de 134-167 mots pour les requêtes-cibles ("Qui est Fayçal ZOUAOUI ?"). |
| Lisibilité structurelle | 20 % | 75/100 | 15.0 | Hiérarchie H1>H2>H3 propre, sections numérotées (01-04), mais H3 = noms d'entreprises uniquement, pas de titre-question. |
| Contenu multi-modal | 15 % | 70/100 | 10.5 | OG image, PDF + DOCX servis, carrousel LinkedIn dans `public/`. Manque alt-text descriptif et logos clients. |
| Autorité & signaux de marque | 20 % | 70/100 | 14.0 | LinkedIn présent (atout #1 pour un individu), but pas de GitHub, pas de `sameAs` dans le JSON-LD, pas d'organisation cliente dans le schema. |
| Accessibilité technique (crawlers IA) | 20 % | 96/100 | 19.2 | SSR confirmé (HTML 139 KB pré-rendu, JSON-LD inline), `robots.txt`, `llms.txt`, `sitemap.xml` présents. Manque `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`. |

**Total : 73.7 → 74 / 100**

### Score par plateforme cible

| Plateforme | Score | Note |
|---|---|---|
| Google AI Overviews (AIO) | 78 | Bon : SSR + JSON-LD `Person`, sitemap, métadonnées complètes. À améliorer : `sameAs`, FAQ. |
| ChatGPT (GPTBot + OAI-SearchBot) | 70 | GPTBot autorisé ; **OAI-SearchBot et ChatGPT-User absents de robots.txt** = risque de blocage par défaut côté search/browsing. |
| Perplexity | 65 | **PerplexityBot non listé explicitement** dans robots.txt (seul un wildcard `User-agent: *` couvre, mais PerplexityBot ignore parfois). |
| Bing Copilot | 75 | Bingbot est couvert par le `*`. Schema.org bien lu. Pas de `bingbot` explicite. |
| Claude (ClaudeBot) | 80 | ClaudeBot explicitement autorisé. Contenu clair et factuel = bien adapté à Claude. |

---

## 2. Accès des crawlers IA (`public/robots.txt`)

État du fichier actuel :

```
User-agent: *               Allow: /
User-agent: GPTBot          Allow: /
User-agent: ClaudeBot       Allow: /
User-agent: PerplexityBot   Allow: /
User-agent: Google-Extended Allow: /
Sitemap: https://cv.wedreamteam.com/sitemap.xml
```

| Crawler | Statut | Recommandation |
|---|---|---|
| GPTBot (OpenAI training) | OK explicite | RAS |
| **OAI-SearchBot** (ChatGPT search) | Manquant | **À ajouter** — c'est CE bot qui amène les citations ChatGPT |
| **ChatGPT-User** (browsing utilisateur) | Manquant | **À ajouter** |
| ClaudeBot | OK | RAS |
| **anthropic-ai** (legacy) | Manquant | À ajouter pour rétro-compat |
| **Claude-SearchBot / Claude-User** | Manquant | À ajouter |
| PerplexityBot | OK | RAS |
| **Perplexity-User** | Manquant | À ajouter |
| Google-Extended | OK (bloque/autorise Bard/Gemini training) | RAS |
| **Googlebot** | Couvert par `*` | OK |
| **Bingbot** | Couvert par `*` | OK |
| CCBot (Common Crawl) | Couvert par `*` (autorisé) | Optionnel : bloquer si vous ne voulez pas servir au training |
| Applebot-Extended | Manquant | À ajouter (Siri / Apple Intelligence) |
| Amazonbot, Bytespider, Meta-ExternalAgent | Manquants | Optionnels |

**Action concrète — `public/robots.txt` à remplacer par :**

```
User-agent: *
Allow: /

# AI search & answer engines (visibilité)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://cv.wedreamteam.com/sitemap.xml
```

Note : ne PAS bloquer CCBot — Common Crawl alimente nombre de modèles open et de moteurs de recherche IA tiers.

---

## 3. Statut `llms.txt` (`public/llms.txt`)

**Présent, valide, mais sous-exploité.**

Le contenu actuel (22 lignes) est correct dans la forme (titre H1, sections H2, listes Markdown). Les manques :

- Pas de section `## Liens` avec URLs canoniques (CV PDF, LinkedIn, GitHub, sitemap).
- Missions listées sans dates ni stack par mission → un LLM qui ne lit que `llms.txt` ne peut pas répondre à "Sur quoi a travaillé Fayçal en 2024 ?".
- Pas de bloc "À propos" en 2-3 phrases extractibles tel quel.
- Email obsolète : `faycal.zouaoui@wedreamteam.com` dans `llms.txt` mais `zouaoui.faycal.p@gmail.com` dans `src/app/_data/profile.ts` → **incohérence à corriger**.
- Mission Dailymotion (oct. 2025) et Nexity (jan-oct 2025) **absentes** alors qu'elles sont dans `profile.ts`. Le fichier date d'une version antérieure.
- Pas de `Disponibilité` (info précieuse pour un freelance — un LLM peut directement répondre "oui, il est disponible").

**Version recommandée pour `public/llms.txt` :**

```markdown
# Fayçal ZOUAOUI — Tech Lead DevOps / Cloud Engineer

Tech Lead DevOps et ingénieur Cloud basé à Lille (France).
10+ ans d'expérience sur AWS, Kubernetes (EKS/GKE), Terraform, GitOps, sécurité cloud et FinOps.
Disponible pour missions freelance (Lille / remote / Europe) — réponse sous 24 h.

## Contact
- Email : zouaoui.faycal.p@gmail.com
- Téléphone : +33 6 51 16 02 07
- LinkedIn : https://www.linkedin.com/in/faycal-zouaoui-65b0a5201
- Localisation : Lille, France
- Site : https://cv.wedreamteam.com

## Missions (anti-chronologique)
- 2025–présent — **Dailymotion** — Platform Engineer (EKS multi-régions, GKE, Wiz CNAPP, FluxCD, Kyverno, FinOps).
- 2025 — **Nexity (CCOE)** — Cloud / DevOps Engineer (Terraform/Terragrunt, EKS GitOps, OIDC/IRSA, Dynatrace).
- 2023–2024 — **Waykonect (TotalEnergies)** — Tech Lead DevOps (GitHub Actions, Trivy, ACM-PCA, encadrement).
- 2022–2023 — **SNCF Connect & Tech** — Cloud Engineer AWS (FluxCD, Vault, KEDA, EC2 → EKS).
- 2021–2022 — **Société Générale (coretech cloud)** — Cloud Engineer AWS (Terraform, Vault blue/green, Jaeger).
- 2020–2021 — **Finalcad** — Cloud Engineer AWS (EKS + Fargate, ArgoCD, migration Beanstalk → EKS).
- 2018–2020 — **Société Générale** — DevOps (Jenkins, ELK, Terraform/Packer, OpenShift).
- 2018 — **PMU** — DevOps (Puppet, Foreman, Red Hat 7).
- 2015–2018 — **SFIL** — Ingénieur Linux & Production (RHEL, Pacemaker, Control-M).

## Stack signature
AWS (EKS, IAM, Route53, RDS), Kubernetes, Terraform / Terragrunt, GitOps (FluxCD, ArgoCD),
Helm, Vault, KEDA, GitHub Actions, Wiz CNAPP, Trivy, Prometheus / Grafana, Datadog, Dynatrace.

## Ressources
- CV PDF : https://cv.wedreamteam.com/cv-faycal-zouaoui.pdf
- CV DOCX : https://cv.wedreamteam.com/cv-faycal-zouaoui.docx
- Sitemap : https://cv.wedreamteam.com/sitemap.xml
```

---

## 4. Citabilité au niveau du passage

### Bilan

Le contenu factuel est riche mais **pas formaté pour être cité tel quel par un LLM**. Les LLM citent de préférence des paragraphes auto-suffisants de 134–167 mots qui répondent directement à une question.

Aujourd'hui, le DOM contient :
- Des **listes** (puces de réalisations) → bonnes pour parsing, mais difficiles à citer comme "réponse" (un LLM préfère reformuler).
- Aucune **phrase de synthèse de 30-50 mots** au début de chaque mission qui réponde à "qu'a fait X chez Y ?".
- Aucun **bloc bio** (`<section id="about">`) qui réponde à "qui est Fayçal ZOUAOUI ?".
- Pas de **FAQ** (très efficace pour AI Overviews).

### Requêtes cibles probables et préparation actuelle

| Requête type | Préparation | Gap |
|---|---|---|
| "Qui est Fayçal ZOUAOUI ?" | Faible | Pas de paragraphe bio extractible. Le H1 = juste le nom. La tagline est marketing, pas factuelle. |
| "Quelle est l'expérience de Fayçal ZOUAOUI ?" | Moyenne | Stats `getProfileStats()` rendues mais pas dans une phrase complète. |
| "Tech Lead DevOps Lille freelance" | Moyenne | Lille mentionné mais pas associé à "freelance" ou "disponible" dans une phrase complète. |
| "Quelles missions a fait Fayçal ZOUAOUI ?" | Bonne | Timeline complète bien rendue, mais en cartes sans phrase de synthèse. |
| "Stack technique Fayçal ZOUAOUI" | Bonne | `signatureStack` rendu, mais comme tags isolés. |
| "Comment contacter Fayçal ZOUAOUI ?" | Bonne | Email + tel + LinkedIn dans `ContactFooter`. |

### Action concrète : ajouter un bloc bio extractible

Dans `src/app/_components/Hero.tsx`, juste après la `tagline` (ligne 59), insérer un paragraphe self-contained de ~150 mots :

```tsx
<p className="mt-4 max-w-2xl text-base text-muted-foreground/90 text-pretty">
  Fayçal ZOUAOUI est Tech Lead DevOps et Cloud Engineer basé à Lille, France,
  avec plus de 10 ans d'expérience dans l'industrialisation de plateformes
  cloud à grande échelle. Il intervient depuis 2015 chez des grands comptes
  (TotalEnergies via Waykonect, SNCF Connect &amp; Tech, Société Générale,
  Dailymotion, Nexity) sur des sujets AWS, Kubernetes (EKS et GKE),
  Terraform, GitOps (FluxCD, ArgoCD), sécurité cloud (Wiz, Trivy, Vault),
  observabilité (Prometheus, Grafana, Datadog, Dynatrace) et FinOps. Il
  encadre techniquement des équipes DevOps, conçoit des modules Terraform
  réutilisables, opère des clusters EKS en GitOps multi-comptes et
  multi-régions, et accompagne la migration de workloads on-premise vers
  le cloud. Disponible en freelance pour des missions à Lille, en remote
  ou ponctuellement en Europe, il répond aux sollicitations sous 24 heures.
</p>
```

Cette zone aura un excellent pouvoir d'extraction parce que :
- Elle commence par "Fayçal ZOUAOUI est…" (réponse directe à la requête nominative).
- Elle cite tous les clients (entités nommées qu'un LLM peut croiser).
- Elle énumère les technologies sans liste à puces.
- Elle finit par la disponibilité (intent commercial).

### Action concrète : ajouter une section FAQ

Créer `src/app/_components/FAQ.tsx` et le monter avant `<ContactFooter />` dans `src/app/page.tsx`. Questions à couvrir (avec réponses de 40-60 mots chacune) :

- Qui est Fayçal ZOUAOUI ?
- Quelles sont ses spécialités techniques ?
- Est-il disponible pour des missions freelance ?
- Sur quels secteurs a-t-il travaillé ?
- Quelle est sa stack signature ?
- Comment le contacter ?

Marquer cette section avec `schema.org/FAQPage` (cf. §6).

### Action concrète : phrase de synthèse par mission

Dans `src/app/_components/MissionCard.tsx` (ou le composant qui rend une mission), ajouter en tête de carte un `<p>` de 25-40 mots construit ainsi :
> "Chez {company} ({dates}), Fayçal a {objectif en une phrase} en s'appuyant sur {2-3 techno principales}."

Génération possible directement depuis `profile.ts` (champs `company`, `dates`, `objectif`, `tags[0..2]`) sans dupliquer la donnée.

---

## 5. JSON-LD / Schema.org

Schema actuel (lu dans `src/app/page.tsx` lignes 41-65 et confirmé dans le HTML rendu) :

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fayçal ZOUAOUI",
  "jobTitle": "Tech Lead DevOps · Cloud Engineer",
  "address": "Lille, France",
  "email": "mailto:zouaoui.faycal.p@gmail.com",
  "worksFor": "Indépendant / Missions",
  "hasPart": { "@type": "ItemList", "itemListElement": [...] }
}
```

**Problèmes :**
1. `address` est une chaîne, devrait être `PostalAddress`.
2. `worksFor` est une chaîne, devrait être `Organization`.
3. `hasPart` n'est **pas une propriété valide** sur `Person` (c'est une propriété de `CreativeWork`). Pour des expériences pro, utiliser `hasOccupation` ou un graphe avec des nœuds `WorkRole`.
4. Pas de `sameAs` (LinkedIn, GitHub, site agence) — c'est **le signal principal** pour qu'un LLM relie l'entité Person à ses comptes externes.
5. Pas de `image`, `telephone`, `url`, `alumniOf`, `knowsAbout`, `nationality`.
6. Pas de schema `WebSite` ni `Organization` (We Dream Team).

**Schema recommandé** — remplacer le bloc `useMemo` (lignes 41-65 de `src/app/page.tsx`) :

```ts
const jsonLd = useMemo(
  () => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://cv.wedreamteam.com/#person',
        name: PROFILE.name,
        givenName: 'Fayçal',
        familyName: 'ZOUAOUI',
        jobTitle: PROFILE.role,
        description:
          "Tech Lead DevOps et Cloud Engineer basé à Lille, 10+ ans d'expérience AWS, Kubernetes, Terraform, GitOps.",
        url: 'https://cv.wedreamteam.com/',
        image: 'https://cv.wedreamteam.com/og.png',
        email: `mailto:${PROFILE.email}`,
        telephone: '+33651160207',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lille',
          addressRegion: 'Hauts-de-France',
          addressCountry: 'FR',
        },
        nationality: { '@type': 'Country', name: 'France' },
        knowsAbout: [
          'Amazon Web Services', 'Kubernetes', 'Terraform', 'GitOps',
          'FluxCD', 'ArgoCD', 'Helm', 'Cloud security', 'CI/CD',
          'Observability', 'FinOps', 'Site Reliability Engineering',
        ],
        knowsLanguage: ['fr', 'en'],
        sameAs: [
          PROFILE.linkedin,
          'https://github.com/<HANDLE_GITHUB>',          // à remplir
          'https://wedreamteam.com',
        ],
        worksFor: {
          '@type': 'Organization',
          '@id': 'https://wedreamteam.com/#org',
          name: 'We Dream Team',
          url: 'https://wedreamteam.com',
        },
        hasOccupation: MISSIONS.map((m) => ({
          '@type': 'EmployeeRole',
          roleName: m.role,
          startDate: extractStartDate(m.dates),  // helper à créer
          endDate: extractEndDate(m.dates),
          worksFor: { '@type': 'Organization', name: m.company },
          description: m.objectif,
          skills: m.tags.join(', '),
        })),
      },
      {
        '@type': 'WebSite',
        '@id': 'https://cv.wedreamteam.com/#website',
        url: 'https://cv.wedreamteam.com/',
        name: 'Fayçal ZOUAOUI — Portfolio',
        inLanguage: 'fr-FR',
        about: { '@id': 'https://cv.wedreamteam.com/#person' },
      },
    ],
  }),
  []
)
```

Ajouter ensuite, **si la section FAQ est créée**, un second `<script type="application/ld+json">` avec un `FAQPage`.

---

## 6. Vérification SSR (accessibilité technique)

**Confirmé : le contenu est intégralement présent dans le HTML statique.**

Vérifications faites sur `out/index.html` (139 KB) :

| Élément | Présent ? | Notes |
|---|---|---|
| Nom complet | Oui (15 occurrences "Fayçal") | OK |
| Entreprises clientes | Oui (Dailymotion ×4, TotalEnergies ×6, Nexity ×4) | OK |
| H1 / H2 / H3 | Oui | 1× H1, 4× H2 (numérotées 01-04), 9× H3 missions + 7× H3 catégories skills |
| JSON-LD | Oui (inline en fin de body) | OK |
| Métadonnées OG / Twitter | Oui | OK |
| Schema `Person` | Oui | À enrichir (cf. §5) |

Le `'use client'` n'est **pas bloquant** ici : Next.js statique pré-rend l'arbre React au build et hydrate côté client. Les bots IA voient le HTML pré-rendu. Test manuel possible : `curl -A "GPTBot" https://cv.wedreamteam.com/ | grep -c "Dailymotion"` doit renvoyer ≥ 1.

**Limitations à documenter :**
- Le filtre par tag (`onTagClick`) et la recherche (`query`) sont 100 % côté client → un crawler voit toutes les missions sans filtre, ce qui est exactement ce qu'on veut.
- `/count/` est inutile pour les LLM (compteur de visites). Pas d'action requise.
- La page de Hero contient une badge "Disponible" rendue côté client mais le texte est dans le HTML SSR (vérifié).

---

## 7. Signaux de marque & d'autorité (réalistes pour un individu)

Pour un CV personnel, la pondération diffère d'un site SaaS. Les sources qu'un LLM va **réellement** croiser pour construire l'entité "Fayçal ZOUAOUI" :

| Signal | Pertinence pour ce site | État | Action |
|---|---|---|---|
| LinkedIn (profil + posts) | **Critique** (signal #1 pour un pro) | Lié dans le footer + JSON-LD futur | S'assurer que le profil LinkedIn FR est bien public et que le titre/résumé miroir le site (cohérence d'entité). |
| GitHub | **Important** | **Manquant sur le site** | Ajouter dans `PROFILE` (`profile.ts`), dans `ContactFooter`, et dans `sameAs` du schema. |
| Site agence (wedreamteam.com) | Important | Listé dans Projects | OK. S'assurer que wedreamteam.com a aussi un schema `Organization` avec `founder` pointant vers `cv.wedreamteam.com/#person`. |
| Conférences / talks | Marginal pour ce profil | Absent | Si applicable, ajouter une section. Sinon, ignorer. |
| Wikipedia | **Non pertinent** | — | Inutile pour un freelance non public-figure. **Ne pas perdre de temps là-dessus.** |
| Reddit / YouTube | Non pertinent | — | Idem. La corrélation YouTube 0.737 mentionnée dans la littérature GEO concerne des marques B2B/B2C, pas un consultant individuel. |
| Stack Overflow | Léger plus | Inconnu | Si profil actif, l'ajouter dans `sameAs`. |
| Mentions sur dev.to / Medium / blog perso | Léger plus | Absent | Optionnel. Un seul article technique signé peut suffire à cimenter l'entité. |

**Cohérence d'entité (critère sous-estimé) :** un LLM relie `Fayçal ZOUAOUI` sur le site, sur LinkedIn, sur GitHub uniquement si les triplets `(name, jobTitle, location)` correspondent. Vérifier que LinkedIn affiche bien : "Tech Lead DevOps · Cloud Engineer" / "Lille" / mêmes clients listés.

---

## 8. Top 5 changements à plus fort impact

Classés par ratio impact / effort.

### #1 — Compléter `robots.txt` avec les bots IA manquants
- **Fichier** : `public/robots.txt`
- **Effort** : 5 min
- **Impact** : élevé — sans `OAI-SearchBot`, ChatGPT search peut omettre le site dans certaines de ses requêtes.
- **Action** : remplacer par le bloc fourni en §2.

### #2 — Synchroniser et enrichir `llms.txt`
- **Fichier** : `public/llms.txt`
- **Effort** : 15 min
- **Impact** : élevé — c'est la version "fiche personne" qu'un LLM lira en priorité s'il est bien configuré.
- **Action** : remplacer par le contenu fourni en §3 (corrige email, ajoute Dailymotion + Nexity, ajoute disponibilité et URLs canoniques).

### #3 — Ajouter un paragraphe bio extractible (~150 mots) dans le Hero
- **Fichier** : `src/app/_components/Hero.tsx`
- **Effort** : 20 min
- **Impact** : élevé — débloque la citabilité directe sur "Qui est Fayçal ZOUAOUI ?". Aujourd'hui un LLM doit reconstruire la phrase à partir de bouts épars.
- **Action** : insérer le `<p>` fourni en §4 sous la tagline.

### #4 — Refondre le JSON-LD `Person` (sameAs, PostalAddress, hasOccupation, WebSite)
- **Fichier** : `src/app/page.tsx` (lignes 41-65)
- **Effort** : 45 min (incl. helpers `extractStartDate` / `extractEndDate`)
- **Impact** : moyen-élevé — Google AIO et Bing Copilot utilisent le schema pour la knowledge box. `sameAs` est le pont vers LinkedIn/GitHub.
- **Action** : remplacer par le `@graph` fourni en §5. Ajouter `github` dans `PROFILE` (`profile.ts`).

### #5 — Ajouter une section FAQ avec `FAQPage` schema
- **Fichiers** : créer `src/app/_components/FAQ.tsx`, monter dans `src/app/page.tsx` avant `<ContactFooter />`.
- **Effort** : 1 h (rédaction des 6 Q/R + composant + JSON-LD)
- **Impact** : élevé pour Google AIO et Perplexity (qui aiment citer des FAQ). C'est typiquement le format que ChatGPT cite verbatim.
- **Action** : 6 questions citées en §4. Réponses 40-60 mots chacune.

---

## 9. Suggestions complémentaires de reformatage

Ces actions ont un impact moindre mais sont peu coûteuses.

- **`MissionCard`** : ajouter une phrase de synthèse en tête (cf. §4) — exploite directement `profile.ts` sans duplication.
- **Headings questions-based** : passer le H2 "Missions sélectionnées" à un format plus interrogeable, par ex. ajouter un sous-titre "Sur quoi a travaillé Fayçal ZOUAOUI ?" en `<p>` avant le H2 (H2 conservé pour le design).
- **`sitemap.xml`** : la page `/count/` n'est pas listée. Si vous voulez qu'elle soit indexée (peu d'intérêt SEO), l'ajouter. Sinon, ajouter `<meta name="robots" content="noindex">` sur cette page via export de `metadata` dans `src/app/count/page.tsx`.
- **OG image alt-text** : actuel "Fayçal ZOUAOUI – Ingénieur Cloud / DevOps". OK. À améliorer : générer 1-2 OG images alternatives (fr / en) si LinkedIn génère des aperçus différents.
- **Logos clients dans `ClientLogos.tsx`** : vérifier que les `<img alt="">` contiennent bien "TotalEnergies", "SNCF Connect & Tech", "Société Générale", etc., pour ancrer les entités côté texte alt.
- **Cohérence email** : `profile.ts` (`zouaoui.faycal.p@gmail.com`) vs `llms.txt` (`faycal.zouaoui@wedreamteam.com`) **doivent être identiques**. Choisir une adresse canonique.
- **HTTP headers** : vérifier que CloudFront ne sert pas un `X-Robots-Tag: noindex` involontaire sur certains chemins. À tester via `curl -I https://cv.wedreamteam.com/`.
- **Indexation explicite** : soumettre le sitemap à Google Search Console et Bing Webmaster Tools (signal indirect mais utile).

---

## 10. Tests de validation à faire après changements

```bash
# 1. Vérifier que les bots IA ne reçoivent pas de blocage
curl -sI -A "GPTBot/1.0" https://cv.wedreamteam.com/ | head -5
curl -sA  "OAI-SearchBot" https://cv.wedreamteam.com/robots.txt
curl -sA  "PerplexityBot" https://cv.wedreamteam.com/llms.txt

# 2. Vérifier que le contenu est bien dans le HTML pré-rendu
curl -s https://cv.wedreamteam.com/ | grep -c "Dailymotion"   # doit être > 0
curl -s https://cv.wedreamteam.com/ | grep -c "TotalEnergies" # doit être > 0
curl -s https://cv.wedreamteam.com/ | grep -c "FAQPage"       # après §8 #5

# 3. Valider le schema
# https://validator.schema.org/  → coller le HTML rendu
# https://search.google.com/test/rich-results

# 4. Tester la citabilité (manuel)
# Demander à ChatGPT, Claude et Perplexity :
#  - "Qui est Fayçal ZOUAOUI ?"
#  - "Tech Lead DevOps Lille freelance disponible"
#  - "ingénieur cloud AWS Kubernetes Lille"
# Comparer les citations avant/après.
```

---

## 11. Récap exécutif

- **Score global : 74 / 100** — au-dessus de la moyenne, mais avec des gains rapides accessibles.
- Le site est techniquement excellent (SSR confirmé, JSON-LD, sitemap, robots.txt, llms.txt).
- Les **3 gaps prioritaires** sont :
  1. `robots.txt` incomplet (manque OAI-SearchBot, ChatGPT-User, Perplexity-User, Applebot-Extended).
  2. `llms.txt` désynchronisé (email faux, missions 2025 manquantes) — c'est un fichier dédié aux LLM, il doit être impeccable.
  3. Aucun **paragraphe bio self-contained** dans le DOM → les LLM ne peuvent pas extraire une réponse propre à "Qui est Fayçal ZOUAOUI ?".
- Le JSON-LD est présent mais sous-renseigné (pas de `sameAs`, pas de `PostalAddress`, `worksFor` non typé). Refonte recommandée.
- Aucune action de type "créer un blog" / "lancer une chaîne YouTube" : pour un CV personnel, ce n'est pas ROI-positif. Concentrer l'effort sur la **cohérence d'entité** entre le site, LinkedIn et GitHub.
