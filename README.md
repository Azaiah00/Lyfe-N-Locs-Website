# Lyfe N' Locs Beauty Lounge — Website

Premium, mobile-first marketing website for **Lyfe N' Locs Beauty Lounge LLC**, a solo loc &
braid studio in Arlington, TX.

- **Design direction:** Bold Glam Studio — near-black canvas, metallic-gold hero, one
  electric-fuchsia spark, big Fraunces headlines, gold-dust motion.
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v4 · React 19 · Framer Motion ·
  self-hosted fonts via `next/font` (Fraunces, Manrope, Ephesis).
- **Repo:** https://github.com/Azaiah00/Lyfe-N-Locs-Website

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (hot reload) |
| `npm run build` | Production build (runs type-check + lint) |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with `eslint-config-next` |

**Requirements:** Node 18.18+ (built and verified on Node 22).

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, trust marquee, stat bar, "start here" finder, featured categories, portfolio strip, meet-the-artist, reviews, hours + map, FAQ teaser, book band |
| `/services` | Full 80-service menu (10 categories) with sticky category nav + pricing-varies banner |
| `/portfolio` | Filterable gallery (All · Locs · Styles · Braids · Color · Men's) |
| `/about` | Meet the artist |
| `/policies` | Policies & FAQ (all draft policies shown as visible 【CONFIRM】 tokens) |
| `/contact` | NAP, tap-to-call, email, map embed, hours table, socials |
| `/book` | **Custom booking portal** — guided, category-first flow (gating → service → date/time → details → deposit → confirm) + "manage a booking" lookup. Runs in demo mode on mock data with no keys. |

`/shop`, `/learn`, `/blog` are feature-flagged **off** in [`data/nav.ts`](./data/nav.ts) — flip a
flag to surface one in nav + footer once built.

Also generated: `sitemap.xml`, `robots.txt`, a branded 404, and `HairSalon` JSON-LD.

---

## Architecture

Single sources of truth (no duplicated hardcoded content):

- **[`data/facts.ts`](./data/facts.ts)** — NAP, hours (incl. the Friday split), socials. Powers
  the contact page, footer, hours tables, **and** the JSON-LD, so SEO stays in sync.
- **[`data/services.ts`](./data/services.ts)** — the full typed menu. Drives the services page,
  featured categories, and the `hasOfferCatalog` JSON-LD.
- **[`data/faqs.ts`](./data/faqs.ts)** / **[`data/portfolio.ts`](./data/portfolio.ts)** /
  **[`data/nav.ts`](./data/nav.ts)** — FAQ, gallery, and nav config.

Folders follow [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md): `app/` (routes), `components/`
(`ui`, `motion`, `nav`, `footer`, `home`, `services`, `portfolio`, `shared`), `lib/` (seo,
jsonld, maps), `data/`, `public/`.

### Design system
All visual choices come from the DESIGN.md tokens declared in
[`app/globals.css`](./app/globals.css) (`@theme` block + signature utilities: gold gradient,
gold-dust washes, hairline rules, card/spotlight/button surfaces). No off-system colors.

### Motion (all reduced-motion aware)
Gold particle drift (hero + book band), Shiny Text wordmark, Split/Blur hero reveal,
scroll-reveal sections, Count Up stat bar, spotlight cards, portfolio carousel, gold marquee.
Every motion component checks `prefers-reduced-motion` and disables particles/shimmer/parallax.

---

## Images

Drop placeholder assets into [`public/images/`](./public/images/) using the exact filenames in
[`docs/IMAGE-PROMPTS.md`](./docs/IMAGE-PROMPTS.md) — the build wires them automatically. **Any
missing image renders a branded gold-dust fallback** via `<SmartImage>`, never a broken image,
so the site is fully presentable before real photos land.

> ⚠️ Replace AI placeholders with her real, permissioned work photos before launch.

---

## Content integrity (non-negotiable)

- **Real facts only** — name, address, phone, email, hours, and socials come verbatim from
  [`docs/FACTS.md`](./docs/FACTS.md).
- **Prices are starting prices** ("from $X") and placeholders pending owner confirmation; the
  pricing-varies banner shows on `/services`.
- **Unknowns render as visible 【CONFIRM】 tokens** — never invented content. Owner name,
  reviews, deposit/cancellation policy, prep, and "years locking" are all flagged. Track and
  resolve them in [`docs/CONFIRM.md`](./docs/CONFIRM.md).
- The site never collects raw card/bank numbers — booking hands off to hosted checkout.

---

## Deploy

See **[docs/DEPLOY.md](./docs/DEPLOY.md)** for Vercel and Netlify steps. In short: push to
GitHub, import the repo, framework preset **Next.js**, build `next build` — zero config needed.
Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, sitemap, and JSON-LD use
it.

---
*Site by Couture House Co.*
