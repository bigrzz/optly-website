# Optly Website

Official marketing and landing page for **Optly** — a privacy-focused product that helps individuals discover and remove their personal information from data broker and people-search websites.

**Live site:** [https://optly.awakyn.ai](https://optly.awakyn.ai)

---

## What is Optly?

Optly is designed to solve a growing privacy problem: personal information (names, addresses, phone numbers, relatives, etc.) is routinely collected and published by data brokers and people-search sites.

Most people don’t know these sites exist until they search for their own name and find multiple results. Optly makes the process of finding and removing that information simpler.

### Core Features

- **Free Web Presence Scan**  
  Users can enter a name and see whether it appears on major data broker / people-search sites.

- **Automated Opt-Out Assistance**  
  Paid plans help submit and track removal requests across supported sites.

- **Ongoing Monitoring**  
  Continuous checks so new listings can be detected and addressed.

- **Simple Freemium Model**  
  Free to scan. Paid plans unlock removal tools and monitoring.

---

## Product Positioning

| Item                    | Detail                                      |
|-------------------------|---------------------------------------------|
| Product Name            | Optly                                       |
| Parent Company          | Awakyn Labs                                 |
| Primary Domain          | optly.awakyn.ai                             |
| Target Audience         | Individuals concerned about online privacy  |
| Business Model          | Freemium (Free scan → Paid removal plans)   |
| Platform                | Web + future iOS app                        |

---

## Pricing

| Plan       | Price     | Description                              |
|------------|-----------|------------------------------------------|
| Free       | $0        | Web presence scan                        |
| Monthly    | $1.99/mo  | Monitoring + automated opt-outs          |
| Yearly     | $14.99/yr | Best value (significant savings)         |
| Lifetime   | $29.99    | One-time payment, lifetime access        |

---

## Technology Stack

### Frontend (this repository)
- Static HTML + Tailwind CSS (via CDN)
- Vanilla JavaScript for interactive elements
- Font Awesome icons
- Designed for fast loading and mobile responsiveness

### Backend (separate repository)
- Cloudflare Workers
- Cloudflare D1 (SQLite database)
- Hono framework (planned)
- Stripe for payments

### Infrastructure
- Cloudflare Pages (hosting)
- Custom domain: `optly.awakyn.ai`
- Cloudflare DNS

---

## Repository Structure

```
optly-website/
├── index.html          # Main landing page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
├── robots.txt          # Search engine directives
├── sitemap.xml         # Sitemap for SEO
├── README.md           # This file
└── (future assets)
    ├── favicon.ico
    ├── og-image.jpg
    └── assets/
```

---

## Local Development

Because this is a pure static site, you can open it directly or use a simple local server:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server
npx serve .
```

---

## Deployment

### Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy . --project-name=optly
```

Then add the custom domain `optly.awakyn.ai` in the Cloudflare dashboard under:

**Workers & Pages → optly → Custom domains**

### Recommended DNS Setup

| Type  | Name  | Content                     | Proxy Status |
|-------|-------|-----------------------------|--------------|
| CNAME | optly | `<project>.pages.dev`       | Proxied      |

---

## Current Status

| Component              | Status          | Notes                              |
|------------------------|-----------------|------------------------------------|
| Landing page           | Ready           | Complete static page               |
| Privacy Policy         | Ready           |                                    |
| Terms of Service       | Ready           |                                    |
| Free scan UI           | Demo only       | Currently simulated in frontend    |
| Backend API            | In progress     | Cloudflare Workers + D1            |
| Stripe integration     | Planned         | Checkout sessions                  |
| iOS app                | Planned         | Future phase                       |
| Real opt-out automation| Planned         | Requires backend + legal review    |

---

## Roadmap

### Phase 1 – Website & Branding
- [x] Landing page
- [x] Privacy Policy
- [x] Terms of Service
- [ ] Favicon + Open Graph image
- [ ] Deploy to `optly.awakyn.ai`

### Phase 2 – Backend
- [ ] Cloudflare Worker API
- [ ] D1 database schema
- [ ] Web presence scan endpoint
- [ ] User accounts

### Phase 3 – Payments
- [ ] Stripe products (Monthly / Yearly / Lifetime)
- [ ] Checkout flow
- [ ] Subscription management

### Phase 4 – Automation
- [ ] Opt-out request submission
- [ ] Status tracking
- [ ] Email notifications

### Phase 5 – Mobile
- [ ] iOS app (SwiftUI)
- [ ] App Store release

---

## Important Notes

### Legal & Compliance
Automated opt-outs must be implemented carefully. Many data brokers have specific requirements (forms, email verification, identity confirmation, etc.). The product should clearly communicate what is automated versus what still requires user action.

### Privacy
Optly handles sensitive personal information. A clear Privacy Policy and secure data handling practices are required before accepting real user data.

### Accuracy of Scans
Public search results can be noisy. The free scan should set realistic expectations and avoid over-promising perfect detection.

---

## Related Repositories

| Repository              | Purpose                          |
|-------------------------|----------------------------------|
| `optly-website`         | This marketing site              |
| `optly-api` (planned)   | Cloudflare Workers backend       |
| `optly-ios` (planned)   | Native iOS application           |

---

## Contact

**Optly** is a product of **Awakyn Labs**.

- Website: [https://awakyn.ai](https://awakyn.ai)
- Email: info@awakyn.ai
- Location: Greater Milwaukee Area, USA

---

## License

Private repository. All rights reserved © 2026 Awakyn Labs / Optly.
