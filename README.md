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

## Cloudflare automation

Push to `main` deploys via **Wrangler Direct Upload**. Pull requests get a Pages preview URL. A Worker pings the live site every 15 minutes.

```
PR / push → GitHub Actions CI (scripts/ci-check.mjs + cf-pack)
                 ↓
            push to main
                 ↓
     Wrangler pages deploy dist/  →  optly-website  →  optlyouts.awakyn.ai
                 ↓
     wrangler deploy workers/health.js (cron */15)
                 ↓
     optional zone cache purge (CLOUDFLARE_ZONE_ID)
```

| Workflow | When | What |
|----------|------|------|
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | PR + every push | Required files, brand, 26-broker scan, pack `dist/` |
| [`.github/workflows/preview.yml`](.github/workflows/preview.yml) | pull requests | Direct-upload a Pages preview branch |
| [`.github/workflows/cd.yml`](.github/workflows/cd.yml) | `main` + manual | Production Pages deploy + health Worker |

### Arm the deploy (one-time)

GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Required | Where to get it |
|--------|----------|-----------------|
| `CLOUDFLARE_API_TOKEN` | yes | [API tokens](https://dash.cloudflare.com/profile/api-tokens) — permissions: **Account → Cloudflare Pages → Edit** and **Account → Workers Scripts → Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | yes | Right rail of any zone in the Cloudflare dashboard |
| `CLOUDFLARE_ZONE_ID` | no | Same right rail, for `awakyn.ai` — enables cache purge after deploy |

Custom domain `optlyouts.awakyn.ai` is attached on the Pages project `optly-website`.

Run CI locally:

```bash
node scripts/ci-check.mjs
```

Pack assets without deploying:

```bash
node scripts/cf-pack.mjs
```

---

## Files

- `index.html` — landing, scan, pricing, FAQ
- `brokers.html` — broker directory + DIY steps
- `privacy.html` / `terms.html` — legal
- `scan.js` — broker catalog + exposure engine
- `_headers` / `_redirects` — Cloudflare Pages config
- `wrangler.toml` — Pages project (`dist/`)
- `wrangler.health.toml` + `workers/health.js` — 15-minute uptime Worker
- `scripts/ci-check.mjs` — CI gate
- `scripts/cf-pack.mjs` — Pages asset pack
