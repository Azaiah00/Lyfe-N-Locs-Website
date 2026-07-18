# BUILD-PROMPTS.md — Master Prompts

Two prompts. Paste **PROMPT A** first (marketing site), then **PROMPT B** (booking portal).
Each already assumes the repo context files exist. Start every follow-up prompt with
*"Follow CLAUDE.md and DESIGN.md exactly."*

Optional pre-step if the repo has no app yet:
> "Scaffold a Next.js 15 App Router + TypeScript + Tailwind v4 + React 19 project here following
> CLAUDE.md and DESIGN.md. Wire next/font (Fraunces, Manrope, Ephesis), the Tailwind v4 @theme
> token block from DESIGN.md §8, a base layout with sticky nav + footer, and a GoldDust
> background primitive. No pages yet."

---

## PROMPT A — Marketing Website

```
Follow CLAUDE.md and DESIGN.md EXACTLY. Read CLAUDE.md, DESIGN.md, and everything in docs/
before writing code. Build the premium, mobile-first marketing website for "Lyfe N' Locs
Beauty Lounge LLC" (loc & braid studio, Arlington TX) in the "Bold Glam Studio" direction:
near-black canvas, metallic-gold hero, one electric-fuchsia spark, big Fraunces headlines,
gold-dust motion.

STACK: Next.js 15 (App Router) + TypeScript + Tailwind v4 + React 19 + Framer Motion. Self-host
fonts with next/font (Fraunces, Manrope, Ephesis). Use the folder structure in
docs/ARCHITECTURE.md. Drive services from data/services.ts (docs/SERVICES.md) and NAP/hours
from data/facts.ts (docs/FACTS.md) — single source of truth, no duplicated hardcoded contact info.

ROUTES:
- /            Home — sections in docs/CONTENT.md (hero, stat bar, "start here" finder, 6
               featured categories, portfolio strip, meet-the-artist, reviews, hours+map,
               FAQ teaser, book band)
- /services    Full menu — the 10 categories from docs/SERVICES.md, each service a card
               (name, note, "from $X", duration chip, Book →), sticky category nav, and the
               pricing-varies note banner verbatim.
- /portfolio   Filterable gallery (All · Locs · Styles · Braids · Color · Men's).
- /about       Meet the artist (docs/CONTENT.md; keep 【CONFIRM: name】 visible).
- /policies    Policies & FAQ (docs/CONTENT.md; every item stays a visible 【CONFIRM】).
- /contact     NAP, tap-to-call, email, Google map embed, hours table, socials.
- /book        Routes to the booking portal (PROMPT B); until built, deep-link to
               https://locs-lyfe.square.site/.
Add hidden/feature-flagged nav hooks for /shop, /learn, /blog.

CONTENT: Use docs/CONTENT.md copy and docs/FACTS.md facts VERBATIM (name, 1049 W. Abram St
Arlington TX 76013, (682) 203-3728, mwarns2000@yahoo.com, hours incl. Friday split, socials).
NEVER invent prices, reviews, an owner name, or policies — unknowns render as visible
【CONFIRM】 tokens (track them in docs/CONFIRM.md). Prices are "from $" starting prices.

MOTION: per docs/MOTION.md — gold particle drift (hero + one band), Shiny Text on the wordmark,
Split/Blur reveal on hero headline, scroll-reveal sections, Count Up stat bar, spotlight cards
(desktop), circular portfolio carousel, slow gold marquee. Max 1–2 effects per screen, tinted
to tokens, 60fps, honor prefers-reduced-motion, never hurt Lighthouse.

SEO/TECH: per docs/SEO.md — HairSalon JSON-LD with real NAP+geo+hours (openingHoursSpecification
incl. Friday split), per-page metadata + OG, sitemap.ts, robots.ts, tel: links. Lighthouse ≥95,
LCP <2s, CLS <0.05. Semantic HTML, keyboard-accessible, AA contrast, alt text, skip link.

IMAGES: consume /public/images (docs/IMAGE-PROMPTS.md filenames) via next/image (width/height,
AVIF/WebP, priority hero, lazy below fold). Missing image → branded gold-dust placeholder,
never broken.

DELIVERABLES: working repo; README run/deploy steps; DESIGN.md honored on every screen; all
routes 200; docs/CONFIRM.md updated. VERIFY the build compiles and every internal link works
before reporting done.
```

---

## PROMPT B — Booking Portal ("better than Square")

```
Follow CLAUDE.md and DESIGN.md EXACTLY. Read docs/BOOKING-ARCHITECTURE.md fully first. Build a
custom booking portal for "Lyfe N' Locs Beauty Lounge LLC" that feels dramatically better than
her Square site and is visually seamless with the marketing site from PROMPT A.

GOAL: turn 80 confusing services into a guided, glam, mobile-first flow that gets each client
into the RIGHT service, protects her time with deposits + consultation gating, and confirms
clearly.

ARCHITECTURE: implement the swappable BookingProvider interface from docs/BOOKING-ARCHITECTURE.md.
Default = Square adapter (wrap Square as calendar+payments via Bookings API/deep-links — no
migration). Keep a Stripe/standalone stub behind a flag. Document the tradeoff in
docs/BOOKING-ARCHITECTURE.md and make the engine swappable. The site must NEVER store raw card
numbers — always hand off to hosted checkout.

FLOW (category-first, NOT one giant list): 1) "What are you here for?" → 10 category tiles
(docs/SERVICES.md). 2) New-client gating → route unsure/new loc clients to the $25 Consultation.
3) Service select → real from-$ price, duration, note, relevant add-ons as checkboxes. 4)
Date/time → real availability; respect hours incl. Friday split (8–3 & 5–8) and Monday closed;
after-hours/off-day = retwist only. 5) Client details (name, phone, email, loc size/count,
notes, optional photo). 6) DEPOSIT step → require a deposit that applies to the total (recommend
$25–$50 or 20% on $300+; 【CONFIRM exact rule】) via hosted checkout. 7) Review + confirm →
success with add-to-calendar, per-service prep, policy reminder, directions. 8) "My bookings"
lookup by phone/email to view/reschedule.

EXTRAS THAT BEAT SQUARE: live end-time preview ("done by ~4:30 PM"), price-range explainer,
search + filters (size/time/price), consultation CTA everywhere, SMS/email confirmation +
reminder hooks 【CONFIRM provider】, waitlist for full days, saved-client fast path.

CONSTRAINTS: reuse DESIGN.md tokens/components (gold buttons, fuchsia focus ring, onyx cards,
gold hairlines, restrained gold-dust motion). Mobile-first, fully keyboard-accessible, AA
contrast, Lighthouse ≥95. Every unverified price/policy/deposit = visible 【CONFIRM】. Never
invent availability. Must run in DEMO MODE with mock data when API keys are absent, so the full
flow is demoable end-to-end.

DELIVERABLES: portal wired into the /book route; BookingProvider with Square adapter (default)
+ Stripe/standalone stub; docs/BOOKING-ARCHITECTURE.md + docs/CONFIRM.md updated; compiles
clean; whole flow demoable with mock data. VERIFY the full flow before reporting done.
```
