# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / CV for Fayçal ZOUAOUI. Next.js 14 multi-page app exported as static HTML, hosted on S3 + CloudFront. UI is in French.

Pages:
- `/` — main CV (hero, missions timeline, skills, contact footer).
- `/count` — public visitor counter, reads from counterapi.dev (3rd-party).

## Commands

```bash
npm run dev      # local dev server on http://localhost:3000
npm run build    # static export to ./out (next build with output:'export')
npm run lint     # next lint (no test runner configured)
npm start        # serve a production build locally (rarely used — site is static)
```

There is no test suite. `npm run lint` is the only programmatic check.

## Architecture

### Static export constraint

`next.config.mjs` has `output: 'export'` and `trailingSlash: true`. This means:
- No server runtime in production — only static files in `./out`.
- API routes, server components, image optimization, middleware, and dynamic routes do not work in deployed builds.
- For requests like `/count/`, CloudFront rewrites the URI to `/count/index.html` via a CloudFront Function (see `infra/cloudfront.tf`).

### UI

- `src/app/page.tsx` (`'use client'`) — main CV page, composed of components in `src/app/_components/`.
- `src/app/count/page.tsx` (`'use client'`) — visitor counter standalone page.
- Profile / missions data is hardcoded in `src/app/_data/profile.ts`. Skill categorisation in `src/app/_data/skill-categories.ts`. Stats helpers in `src/app/_data/stats.ts`.
- Visitor counter (`VisitorCount.tsx`) hits `https://api.counterapi.dev/v1/cv-faycal-zouaoui/visits/up` (POST-equivalent GET) on first session view, then `…/visits/` on rerenders. SessionStorage flag `vc:cv-faycal-zouaoui:visits:counted` dedupes.

### CV downloads

Built artefacts served as static assets from `public/`:
- `public/cv-faycal-zouaoui.pdf` — generated locally from `EXPERIENCES.md` via `pandoc → weasyprint` with `.pandoc-print.css`.
- `public/cv-faycal-zouaoui.docx` — generated locally from `EXPERIENCES.md` via `pandoc`.
- `public/linkedin-carousel/*.png` — 6 carousel slides generated via the `gpt-image-2` skill.

Regenerate (after editing `EXPERIENCES.md`):

```bash
pandoc EXPERIENCES.md -o EXPERIENCES.docx --from markdown --to docx --toc --toc-depth=2
pandoc EXPERIENCES.md -o /tmp/experiences.html --from markdown --to html5 --standalone --css .pandoc-print.css --embed-resources
weasyprint /tmp/experiences.html EXPERIENCES.pdf
cp EXPERIENCES.pdf public/cv-faycal-zouaoui.pdf
cp EXPERIENCES.docx public/cv-faycal-zouaoui.docx
```

### Infrastructure (Terraform under `infra/`)

- `s3.tf` — site bucket (private, OAC-only access) + `random_id.suffix` used to name the OAC.
- `cloudfront.tf` — distribution with optional ACM cert in us-east-1 when `domain_name` + `hosted_zone_id` are set. Includes a CloudFront Function (`rewrite_index`) that rewrites `/foo/` → `/foo/index.html` (and `/foo` → `/foo/index.html` when there is no extension), required for sub-routes like `/count/`. Custom error responses on 403 + 404 fall back to `/index.html`.
- `route53.tf` — DNS (only when custom domain set; toggle via `local.use_custom_domain` in `locals.tf`).
- `backend.tf` — Terraform required providers + AWS provider config (region + us-east-1 alias for ACM). Backend is local by default; commented-out S3 backend stub for future use.
- CloudFront access logging is intentionally disabled — re-enabling requires reinstating the logs bucket and an ACL-compatible ownership setting.

Region: `eu-west-3` for everything except the ACM cert (`us-east-1`, via the `aws.use1` provider alias) which CloudFront requires.

### GitHub Actions workflows

- `.github/workflows/infrastructure.yml` — fires on changes under `infra/**`. Runs `terraform fmt/validate/plan`, applies on push to `main`. PRs get a plan comment but no apply.
- `.github/workflows/deploy.yml` — fires on push to `main`. Builds the Next site, syncs `./out` to S3 with two cache policies (5 min for HTML, 1 year immutable for `_next/` assets), looks up the CloudFront distribution by S3 origin, then invalidates `/*`.

Both authenticate to AWS via OIDC role assumption (`AWS_ROLE_TO_ASSUME` secret), not access keys.

Required GitHub secrets: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`.

### Env files

- `env.example` — local dev template, copy to `.env.local`.
- `env.production` — committed file, used at build time. Currently only contains `NODE_ENV=production`.
- `infra/terraform.tfvars` is gitignored in CI; `infra/terraform.tfvars.template` is the canonical source the workflow copies.

## Conventions

- Code comments, commit messages, and UI copy are in French. Match the existing language when editing.
- When editing missions / experience, update **both** `src/app/_data/profile.ts` and `EXPERIENCES.md`. Regenerate PDF + DOCX in `public/` if you want the downloads in sync.
