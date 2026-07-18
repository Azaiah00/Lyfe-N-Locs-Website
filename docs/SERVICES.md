# SERVICES.md — Full Menu (10 categories)

> Her Square menu literally lists ~76 bookable services + ~4 add-on fees. Many are size/count
> variants (small / extra small / micro / medium) of the same core service, so the number of
> *distinct* services is closer to ~40 — still a deep menu. The /services page shows the full
> list (that's fine); DO NOT put a raw count like "80+"/"76" on the homepage (see CONTENT.md).
>
> Reorganized below so clients find the right service
> fast and premium work isn't buried. "from $" = starting price. Durations verbatim. Notes
> condensed. **Prices are placeholders pending owner confirmation.** Model each as a card:
> category eyebrow (gold) · name (H3) · one-line note (muted) · price "from $X" (gold) ·
> duration chip · Book →.

## Suggested data shape (`/data/services.ts`)
```ts
export type Service = {
  id: string; name: string; category: Category; priceFrom: number;
  durationMins: number; note?: string; tags?: ("popular"|"new"|"advised-only")[];
};
```

## ① Consultations & First Visit
- Loc Consultation — from $25 · 30m — *Plan your loc journey; book if unsure which service.*
- New Client Retwist (normal medium locs) — from $125 · 2h30
- New Client Retwist — Small Locs — from $150 · 2h30 — *no style; not for micro*
- New Client Retwist w/ Two-Strand — Medium — from $150 · 2h30
- New Client Medium Interlock — from $160 · 2h
- New Client Interlock — Small Locs — from $200 · 3h30
- New Client Extra — from $50 · 30m
- Loc Repair (after consultation) — from $25 · 1h30 — *price varies by work needed*
- Returning after 6+ months — from $50 · 30m — *extra detangling/detox time*

## ② Starter Locs
- Starter Locs — Adults, Regular Coils — from $185 · 2h — *price ↑ with thickness/length*
- Starter Locs w/ Two-Strand Twist, Regular — from $200 · 2h30
- Small Loc Start — Coils — from $225 · 3h
- Small Loc Start — Two-Strand — from $275 · 3h
- Extra Small Loc Start — Coils — from $275 · 3h30
- Extra Small Interlock Loc Start — from $450 · 7h30
- Microloc Start — Coils (short hair only) — from $300 · 4h30
- Microloc Two-Strand Starter — from $450 · 6h
- Microloc Start — Full Interlocking Method — from $650 · 8h
- Partial Head Loc Start (grow-out) — from $50 · 1h
- Freeform First Retwist — from $200 · 2h30

## ③ Retwist & Maintenance (existing clients)
- Retwist, No Style — 1–90 locs — from $80 · 1h
- Retwist + Simple Style — Medium, 1–90 — from $100 · 1h
- Retwist, Small, No Style — 91–150 — from $100 · 2h
- Retwist + Style — Small, 90–150 — from $125 · 2h
- Retwist w/ Two-Strand Style — Medium (≤90 locs) — from $125 · 1h30
- Small/Long/Thick Retwist w/ Two-Strand — from $160 · 2h30
- Extra Small Retwist, No Style — from $160 · 3h
- Extra Small Retwist + Simple Style — from $185 · 3h30
- Microloc Touch-Up — from $115 · 3h
- Microloc Retwist — from $250 · 3h

## ④ Interlock · Micro · Sisterlocs
- Interlock — Medium Locs — from $130 · 2h
- Interlock — Small Locs — from $185 · 3h30
- Extra Small Interlock — from $225 · 4h5 — *book only if advised*
- Sisterloc Interlock — from $450 · 7h30 — *no style; +$100 two-strand; styles +$25–50*
- Sisterloc Style — from $50 · 30m
- Microloc Interlock — from $300 · 4h30
- Micro/Sisterloc Shampoo & Style — from $75 · 1h
- Miracle Knots (Medium) — from $150 · 3h30 — *+$50 thick/long; arrive washed & dry*

## ⑤ Loc Styling
- Updo Loc Style (over locs) — from $150 · 3h
- Loc Curls — from $150 · 2h
- Loc Curls — Styles — from $50 · 1h
- Loc Bob w/ Two-Strand — Medium only — from $160 · 2h30
- Boho Loc Bob w/ Two-Strand — from $190 · 3h
- Invisible Locs Flat Twist (incl. wash) — from $130 · 2h30
- Natural Hair Twist Out — from $85 · 2h

## ⑥ Faux Locs & Braids
- Small Knotless Boho — from $300 · 6h
- Knotless Over Locs — from $350 · 6h
- Knotless Braids — Waist, 26" — from $275 · 4h30
- Knotless Braids — Mid-back, 20" — from $200 · 4h30
- Knotless Braid Touch-Up (2 rows around) — from $125 · 2h
- Box Braids — Medium (natural hair) — from $200 · 4h
- Box Braids Over Locs — from $250 · 4h30 — *arrive clean & dry*
- Box Braid Touch-Up — from $100 · 1h30
- Faux Locs Over Locs — from $300 · 7h — *price varies by size/length*

## ⑦ Crochet & Takedowns
- Individual Crochet (natural hair) — from $150 · 3h30
- Crochet Styles (natural hair only) — from $125 · 2h
- Crochet / Braids Takedown & Wash — from $50 · 1h

## ⑧ Men's Grooming
- Men's Box Braids / Two-Strand — Full Head — from $150 · 3h
- Men's Full-Head Designer Braids — from $105 · 2h30
- Men's Braids, Full Head — Simple Style — from $85 · 1h30
- Men's Simple Braid Style — Top Only — from $75 · 1h

## ⑨ Color
- Loc Color — 1 Color, Retwist & Style — from $285 · 5h — *+$100 small/thick/long*
- Locs Multiple Color (retwist & style incl.) — from $350 · 5h
- Loc Tips Color w/ Retwist — Medium — from $200 · 3h30
- Natural Loc Color — Black or Brown — from $125 · 1h
- Color Only — Natural Hair — from $185 · 1h30
- Color Tips — Short Hair Only — from $85 · 1h30
- Additional Color Cost — Thick Hair — from $50 · 30m

## ⑩ Extensions, Recovery & Wash/Press
- Loc Extensions Install — up to 100 locs — from $1,000 · 11h30  *(top-ticket service)*
- Loc Extension Removal — from $100 · 1h30
- Loc Detox — from $80 · 1h
- Deep Loc Shampoo — from $25 · 30m
- Shampoo — from $25 · 35m
- Shampoo & Style — from $50 · 45m — *not micro/sisterlocs*
- Silk Press — from $85 · 2h — *starts $75; more w/ trim/difficulty*
- Split Ends Cut — from $40 · 30m

## Add-on fees (show as small "Add-Ons" note, not headline services)
- Long/Thick Hair Tax — +$50
- Diamond/Triangle/Custom Parting — +$50
- Additional Complex Style — +$20
- After-hours / Off-day (retwist only) — $150

## Services-page note banner (show verbatim)
> Prices shown are starting prices. Final pricing depends on loc count, length, thickness, and
> style. Long/thick hair and complex parting may add a fee — you'll always know before we start.
