# ARCHITECTURE.md — Recommended Structure

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind v4 · React 19 · Framer Motion · next/font.

## Folder layout
```
app/
  layout.tsx            # fonts, <Nav/>, <Footer/>, gold-dust bg, JSON-LD org
  page.tsx              # Home
  services/page.tsx
  portfolio/page.tsx
  about/page.tsx
  policies/page.tsx
  contact/page.tsx
  book/page.tsx         # hosts the booking portal
  (future) shop/ learn/ blog/     # feature-flagged, hidden from nav for now
  sitemap.ts  robots.ts
components/
  nav/ Nav.tsx MobileMenu.tsx
  footer/ Footer.tsx
  ui/ Button.tsx Card.tsx Chip.tsx Eyebrow.tsx PriceTag.tsx DurationChip.tsx Section.tsx
  motion/ GoldDust.tsx ShinyText.tsx SplitText.tsx ScrollReveal.tsx CountUp.tsx SpotlightCard.tsx Marquee.tsx
  home/ Hero.tsx StatBar.tsx StartHere.tsx FeaturedCategories.tsx PortfolioStrip.tsx MeetArtist.tsx Reviews.tsx HoursLocation.tsx FaqTeaser.tsx BookBand.tsx
  services/ ServiceCard.tsx CategorySection.tsx CategoryNav.tsx PriceNote.tsx
  booking/ ...            # see BOOKING-ARCHITECTURE.md
data/
  services.ts            # from SERVICES.md
  facts.ts               # from FACTS.md (NAP, hours, socials)
  faqs.ts
lib/
  seo.ts jsonld.ts booking/ (BookingProvider, square adapter, stripe stub)
public/
  images/                # from IMAGE-PROMPTS.md
  logo/                  # gold line-mark + favicon
docs/                    # this folder (context)
DESIGN.md CLAUDE.md README.md START-HERE.md
```

## Data-driven
Drive the services page and booking flow from `data/services.ts` (typed, see SERVICES.md).
Drive NAP/hours/socials from `data/facts.ts` so there is a single source and JSON-LD stays in
sync. Never hardcode the address/phone in multiple places.

## Component rules
- Every visual choice comes from DESIGN.md tokens (Tailwind `@theme`). No inline hex.
- Buttons: one `<Button variant="primary|secondary|ghost">`. Primary = gold gradient fill.
- Motion components wrap children and respect `prefers-reduced-motion` internally.
- All images via a `<SmartImage>` wrapper over next/image with a branded gold-dust fallback.
