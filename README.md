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
