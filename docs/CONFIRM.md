# CONFIRM.md — Owner Verification Checklist

Everything here is a **placeholder** rendered as a visible `【CONFIRM】` token in the build until
the owner confirms. Nothing fabricated ships. Update this list as items are resolved.

## Where the 【CONFIRM】 tokens render in the marketing site (PROMPT A — built)
- **Owner's name** — Home "Meet the artist" section + `/about` headline & intro.
- **"Years locking"** stat — Home stat bar caption (only real, verifiable stats animate).
- **Real reviews** — Home "Reviews" section (rating shown honestly; no fabricated count).
- **Deposit rule** — `/policies` (Deposits) + Home FAQ teaser.
- **Cancellation window (48h)** + **consultation fee** + **prep instructions** — `/policies`
  and the FAQ accordion.
- **Real portfolio photos + headshot** — `/portfolio` header note + every gallery image and the
  `/about` / Home portrait use branded placeholders via `<SmartImage>`.

Everything else on the marketing site uses verified `docs/FACTS.md` data (NAP, hours incl.
Friday split, socials) and the `docs/SERVICES.md` menu (starting prices, flagged as placeholders
via the pricing-varies banner). `FAQPage` and `aggregateRating` JSON-LD are intentionally NOT
emitted until answers/reviews are confirmed.

## Brand & identity
- [ ] Owner's real first/display name (email initials suggest "M. Warns" — UNCONFIRMED)
- [ ] Preferred brand voice / personality words
- [ ] Domain (e.g. lyfenlocs.com) + who owns/registers it
- [ ] Logo source files (hi-res) — folder: `C:\Users\azaia\Downloads\Real Advancement\Clients\Lyfe N' Locs\Logos`

## Services & pricing
- [ ] Confirm ALL prices in SERVICES.md are current (pulled from Square; treat as placeholders)
- [ ] Any services to add/remove/rename
- [ ] Add-on fee rules current?

## Policies (currently unpublished — recommended defaults drafted)
- [ ] Deposit amount/rule (recommend $25–$50 flat or 20% on $300+)
- [ ] Cancellation / reschedule window (recommend 48h)
- [ ] Consultation fee: applied to service or non-refundable?
- [ ] Per-service prep instructions (washed/dry vs. as-booked)
- [ ] After-hours / off-day confirmation (retwist only)

## Proof & media
- [ ] 12–20 real portfolio photos (categorized: Locs, Styles, Braids, Color, Men's)
- [ ] Real headshot of the artist
- [ ] Permission + text of real reviews to feature (or link to Google/FB only)

## Integrations
- [ ] Booking engine choice — wrap Square (recommended) vs. Stripe standalone
      *(Built: Square adapter is the default; Stripe standalone stub behind a flag.
      Runs in DEMO MODE until keys are added — see `.env.example`.)*
- [ ] **Deposit rule** — the portal shows a recommended default (20% on $300+, else $25 flat,
      cap $50) as a visible 【CONFIRM】 on the deposit step. Set the real rule in
      `lib/booking/config.ts` (`DEPOSIT_RULE`, flip `confirmed: true` to drop the badge).
- [ ] SMS/email confirmation + reminder provider — placeholder 【CONFIRM provider】 in
      `lib/booking/config.ts` (`NOTIFICATIONS`) and `.env.example`.
- [ ] Analytics provider
- [ ] Deposit processor keys (Square or Stripe) — `.env.example` documents the vars.
- [ ] **Per-service prep instructions** — the booking success screen shows a 【CONFIRM】 token
      until real prep copy is set (also referenced on `/policies`).

## Growth (later phases — build nav hooks now)
- [ ] Retail products for `/shop`?
- [ ] Interest in a paid loc-care course for `/learn`?
- [ ] Blog for SEO?
- [ ] Pre-paid retwist membership?
