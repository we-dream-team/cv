# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / CV for Fayçal ZOUAOUI. Next.js 14 single-page app exported as static HTML, hosted on S3 + CloudFront, with a CV-download notification flow that emails the owner via Resend. UI is in French.

## Commands

```bash
npm run dev      # local dev server on http://localhost:3000
npm run build    # static export to ./out (next build with output:'export')
npm run lint     # next lint (no test runner configured)
npm start        # serve a production build locally (rarely used — site is static)
```

There is no test suite. `npm run lint` is the only programmatic check.

Manual API smoke test: open `http://localhost:3000/test-api.html` after `npm run dev`.

## Architecture

### Two notification backends — pick one based on environment

The CV-download notification has **two parallel implementations** that share identical logic and HTML email template. Both must be kept in sync when either changes:

- `src/app/api/notify/route.ts` — Next.js API route. **Only works in `next dev` / `next start`.** Because `next.config.mjs` sets `output: 'export'`, this route is **not included in the static build** and does nothing in production.
- `lambda-notify/index.js` — AWS Lambda (Node 20) behind API Gateway. This is what production actually calls. Built into `lambda-notify.zip` by the infra workflow and deployed by Terraform.

Both expect `POST { email, downloadTime }` and read `RESEND_API_KEY` + `RESEND_ACCOUNT_EMAIL` from env.

### Static export constraint

`next.config.mjs` has `output: 'export'` and `trailingSlash: true`. This means:
- No server runtime in production — only static files in `./out`.
- API routes, server components, image optimization, middleware, and dynamic routes do not work in deployed builds. The `app/api/notify` route only exists for local dev.
- Any new server-side logic must be added to `lambda-notify/` (and a corresponding API Gateway route in `infra/lambda-notify.tf`), not to `src/app/api/`.

### Single-page UI

`src/app/page.tsx` (`'use client'`) is the entire UI. Profile data, missions, and tags are hardcoded constants at the top of the file (`PROFILE`, `MISSIONS`). Editing the CV content means editing arrays in this file. There is no CMS, no data fetching, and no routing beyond the root path.

### Infrastructure (Terraform under `infra/`)

- `s3.tf` — site bucket (private, OAC-only access).
- `cloudfront.tf` — distribution with optional ACM cert in us-east-1 when `domain_name` + `hosted_zone_id` are set.
- `lambda-notify.tf` — Lambda + REST API Gateway (`/notify` POST, stage `prod`). Lambda env vars are populated from `var.resend_api_key` / `var.resend_account_email`.
- `route53.tf` — DNS (only when custom domain set; toggle via `local.use_custom_domain` in `locals.tf`).
- Backend is local by default (state in `infra/`); a commented-out S3 backend stub lives in `backend.tf`.
- CloudFront access logging is intentionally disabled (commented out in both `cloudfront.tf` and `s3.tf`) — re-enabling requires reinstating the logs bucket and an ACL-compatible ownership setting.

Region: `eu-west-3` for everything except the ACM cert (`us-east-1`, via the `aws.use1` provider alias) which CloudFront requires.

### Two GitHub Actions workflows, deliberately separated

- `.github/workflows/infrastructure.yml` — fires on changes under `infra/**`. Builds `lambda-notify.zip`, runs `terraform fmt/validate/plan`, applies on push to `main`. PRs get a plan comment but no apply.
- `.github/workflows/deploy.yml` — fires on push to `main`. Builds the Next site, syncs `./out` to S3 with two cache policies (5 min for HTML, 1 year immutable for `_next/` assets), invalidates CloudFront.

Both authenticate to AWS via OIDC role assumption (`AWS_ROLE_TO_ASSUME` secret), not access keys.

Required GitHub secrets: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`, `RESEND_API_KEY`, `RESEND_ACCOUNT_EMAIL`, `DISTRIBUTION_ID`, `API_GATEWAY_URL`.

### Env files

- `env.example` — local dev template, copy to `.env.local`.
- `env.production` — committed file, populated by the deploy workflow at build time.
- `infra/terraform.tfvars` is gitignored; `infra/terraform.tfvars.template` has `REPLACE_WITH_SECRET` placeholders rewritten by the infra workflow via `sed`.

## Conventions

- Code comments, commit messages, and UI copy are in French. Match the existing language when editing.
- When changing the notification email's HTML or behavior, update **both** `src/app/api/notify/route.ts` and `lambda-notify/index.js` so dev and prod stay aligned.
- After editing anything under `lambda-notify/`, the infra workflow rebuilds the zip; locally you can run `infra/build-lambda.sh` (or `scripts/build-lambda.sh`) before `terraform apply`.
