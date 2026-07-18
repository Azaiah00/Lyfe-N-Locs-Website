# CLAUDE.md — Lyfe N' Locs Beauty Lounge Website

> This file is auto-loaded by Claude Code. It is the binding contract for this repo.
> Read it fully, then read `DESIGN.md` and the `docs/` folder before writing any code.

## What this is
A premium, mobile-first **marketing website + custom booking portal** for **Lyfe N' Locs
Beauty Lounge LLC**, a solo loc & braid studio in Arlington, TX. Design direction:
**"Bold Glam Studio"** — near-black canvas, metallic gold hero, one electric-fuchsia spark,
big Fraunces headlines, gold-dust motion.

## The rules (non-negotiable)
1. **Follow `DESIGN.md` EXACTLY.** It is the styling source of truth — colors, type, spacing,
   radius, shadow, motion. No off-system colors. No default Tailwind blue/indigo/purple. No
   gray drop-shadow boxes. Gold is always the metallic gradient, never flat mustard.
2. **Real facts only.** Use `docs/FACTS.md` verbatim for name, address, phone, email, hours,
   socials. NEVER invent prices, reviews, an owner name, policies, or availability.
3. **Unknowns render as visible `【CONFIRM】` tokens**, never as invented content. Every token
   is tracked in `docs/CONFIRM.md`. A launched page must never show fabricated info as fact.
4. **Prices are starting prices** ("from $X") and are **placeholders pending the owner's
   confirmation.** Always show the pricing-varies note on the services page.
5. **Mobile-first. Premium over template-default.** One primary CTA per page — almost always
   **"Book."**
6. **Performance is a feature:** Lighthouse ≥ 95 all categories, LCP < 2s, CLS < 0.05.
7. **Accessibility:** AA contrast, full keyboard operability (especially the booking flow),
   visible focus states (fuchsia ring), alt text, semantic landmarks, `prefers-reduced-motion`.
8. **Motion taste rules:** max 1–2 effects visible per screen, every effect tinted to brand
   tokens, 60fps, never block LCP. See `docs/MOTION.md`. Avoid the cheapening effects listed
   in `DESIGN.md §5`.
9. **Never** have the site itself collect raw card/bank numbers — always hand off to hosted
   checkout (Square/Stripe). See `docs/BOOKING-ARCHITECTURE.md`.

## Tech stack (use exactly this)
- **Next.js 15 (App Router) + TypeScript + Tailwind v4 + React 19 + Framer Motion**
- Self-hosted fonts via `next/font`: **Fraunces** (display), **Manrope** (UI/body),
  **Ephesis** (script accent, tiny use only)
- `next/image` for all images (AVIF/WebP, width/height, priority on hero, lazy below fold)
- Motion helpers from **React Bits** (reactbits.dev) where useful, always tinted to tokens
- Deploy target: **Vercel or Netlify** (include config + a `docs/DEPLOY.md` when you build)

## Routes to build (marketing site — PROMPT A)
`/` · `/services` · `/portfolio` · `/about` · `/policies` · `/contact` · `/book`
Hidden/feature-flagged nav hooks for future upsells: `/shop`, `/learn`, `/blog`.

## Booking portal (PROMPT B)
Guided, category-first flow with deposit + consultation gating. Default architecture:
**wrap Square** as calendar+payments via a swappable `BookingProvider` interface (Square
adapter default, Stripe/standalone stub behind a flag). Full spec in
`docs/BOOKING-ARCHITECTURE.md`.

## Where everything lives
- `DESIGN.md` — design system (colors, type, components, motion, Tailwind `@theme`)
- `docs/FACTS.md` — verified business facts (verbatim)
- `docs/SERVICES.md` — full 80-service menu in 10 categories with "from $" + durations
- `docs/CONTENT.md` — page-by-page site copy
- `docs/ARCHITECTURE.md` — recommended folder structure, components, data model
- `docs/MOTION.md` — motion spec + React Bits picks
- `docs/SEO.md` — metadata, JSON-LD, sitemap, local SEO targets
- `docs/IMAGE-PROMPTS.md` — AI image prompts for placeholder assets
- `docs/BOOKING-ARCHITECTURE.md` — booking portal spec + provider interface
- `docs/BUILD-PROMPTS.md` — the two master prompts (A: site, B: portal)
- `docs/CONFIRM.md` — every 【CONFIRM】 placeholder the owner must resolve

## Definition of done
Repo compiles clean; every route returns 200; every internal link works; DESIGN.md honored on
every screen; Lighthouse ≥ 95; zero fabricated facts (only visible 【CONFIRM】 tokens);
`docs/CONFIRM.md` updated with anything still open. Verify before reporting done.
