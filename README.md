# OptlyOuts Website

Official marketing site for **OptlyOuts** — a privacy product from Awakyn Labs that helps people find and remove personal information from data-broker and people-search sites.

**Live site:** [https://optlyouts.awakyn.ai](https://optlyouts.awakyn.ai)

---

## What is OptlyOuts?

People-search sites collect names, addresses, phones, and relatives, then rank them in search results. OptlyOuts gives you a free exposure scan, a DIY opt-out wiki, and affordable paid plans for automated removals.

### Features

- **Free exposure scan** — name + optional city/state, hashed estimate across 26 brokers
- **DIY broker wiki** — official opt-out links and steps for every tracked site
- **Paid assistance** — automated opt-out help and monitoring
- **No data selling** — we do not sell personal information

---

## Product

| Item | Detail |
|------|--------|
| Product name | OptlyOuts |
| Parent | Awakyn Labs |
| Domain | optlyouts.awakyn.ai |
| Audience | Individuals who want their people-search listings reduced |
| Model | Freemium (free scan → paid removal plans) |

---

## Pricing

| Plan | Price | Notes |
|------|-------|-------|
| Free | $0 | Exposure scan + DIY wiki |
| Monthly | $1.99/mo | Automated opt-outs + monitoring |
| Yearly | $14.99/yr | Best value |
| Lifetime | $29.99 | One-time |

---

## Stack

- Static HTML + Tailwind CSS (CDN) + vanilla JS (`scan.js`)
- Cloudflare Pages hosting, custom domain `optlyouts.awakyn.ai`
- Cream / navy brand (Fraunces + Figtree)

The free scan is a **deterministic hash estimate**, not a live crawl of every broker database.

---

## CI/CD

```
PR / push → GitHub Actions CI (scripts/ci-check.mjs)
                 ↓
            push to main
                 ↓
     Cloudflare Pages (Git integration)  →  optlyouts.awakyn.ai
                 ↓
     Optional Wrangler Direct Upload if CLOUDFLARE_API_TOKEN is set
```

| Workflow | When | What |
|----------|------|------|
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | PR + every push | Required files, brand/canonical, 26-broker catalog, deterministic scan |
| [`.github/workflows/cd.yml`](.github/workflows/cd.yml) | `main` + manual | Re-runs CI, then deploys. Pages Git connection is the default ship path |

Run CI locally:

```bash
node scripts/ci-check.mjs
```

Optional Wrangler fallback — add repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Until those exist, CD still passes; Pages already ships `main`.

---

## Files

- `index.html` — landing, scan, pricing, FAQ
- `brokers.html` — broker directory + DIY steps
- `privacy.html` / `terms.html` — legal
- `scan.js` — broker catalog + exposure engine
- `_headers` / `_redirects` — Cloudflare Pages config
- `scripts/ci-check.mjs` — CI gate used by GitHub Actions
