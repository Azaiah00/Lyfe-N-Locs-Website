# DESIGN.md — Lyfe N' Locs Beauty Lounge
## Design System: "Bold Glam Studio"

> Single source of truth for the Lyfe N' Locs website **and** booking portal.
> Tell your build agent: **"Follow DESIGN.md exactly."** Every color, type ramp, spacing,
> radius, motion rule, and component spec below is binding. Do not introduce off-system
> colors, default framework blues/purples, or template-default shadows.

---

### 0. Brand in one line
A bold, glossy, high-contrast loc-and-braid studio — gold on black with an electric
punch — built for a younger, Instagram/TikTok-native clientele who want their hair to
look expensive and their booking to feel effortless. Glam, confident, unmistakably her.

Design north star: **"magazine cover meets neon salon window."** Big type, deep black,
gold that actually looks like metal, and one hot accent that makes the CTAs impossible
to miss.

---

### 1. Color tokens

Bold Glam = **high contrast**. Near-black canvas, real metallic gold as the hero, and a
single electric-fuchsia accent used sparingly (5–10% of any screen) to create energy and
drive the eye to "Book."

```
/* ---- Core neutrals ---- */
--noir:          #0B0B0D;   /* page background (true near-black, never pure #000) */
--onyx:          #141417;   /* raised surfaces, cards */
--onyx-2:        #1C1C21;   /* card hover / nested surface */
--smoke:         #2A2A31;   /* hairline borders, dividers */
--ivory:         #F7F3EC;   /* primary text on dark */
--muted:         #A19B90;   /* secondary text, captions */
--muted-2:       #6E6A63;   /* disabled, meta */

/* ---- Gold (the brand hero) — use as a GRADIENT for the metallic read ---- */
--gold:          #E5B94E;   /* base gold */
--gold-hi:       #F6E1A3;   /* champagne highlight (top of metal sweep) */
--gold-lo:       #B8862F;   /* antique shade (bottom of metal sweep) */
--gold-ink:      #3A2C0C;   /* text/icon ON solid gold buttons */

/* ---- Electric accent (energy / CTA sparks) — sparingly! ---- */
--fuchsia:       #FF2E88;   /* hot glam accent: CTA underlines, sparks, active states */
--fuchsia-soft:  #FF6FAE;   /* hover / glow */

/* ---- Support ---- */
--success:       #3FD08A;
--warning:       #FFB020;
--danger:        #FF5A5A;
--overlay:       rgba(7,7,9,0.72);  /* modal / drawer scrim */
```

**Metallic gold gradient (use for the wordmark, key headlines, primary button fill, rule lines):**
```css
--grad-gold: linear-gradient(135deg, var(--gold-hi) 0%, var(--gold) 38%, var(--gold-lo) 78%, var(--gold-hi) 100%);
```

**Signature "gold dust" radial (echoes the logo's sparkle scatter — hero/section washes):**
```css
--glow-gold: radial-gradient(60% 60% at 50% 0%, rgba(229,185,78,0.22) 0%, rgba(229,185,78,0) 70%);
--glow-fuchsia: radial-gradient(50% 50% at 80% 20%, rgba(255,46,136,0.16) 0%, rgba(255,46,136,0) 70%);
```

**Usage rules**
- Background is `--noir` everywhere. This is a **dark-first** brand; there is no light mode.
- Gold is for brand moments: wordmark, hero accents, primary buttons, price tags, icons,
  rule lines, category labels. When gold is a large fill, use `--grad-gold`, never flat.
- Fuchsia is the *spark*, not a theme. Allowed: primary CTA hover glow, active nav
  underline, "new" / "popular" tags, form focus ring, micro-sparkles in motion. Never
  large fuchsia fills, never fuchsia body text.
- Text: `--ivory` for body, `--muted` for secondary. Never pure white (#FFF) — it glares
  on black; ivory is warmer and reads premium.
- Contrast floor: body text ≥ 4.5:1, large text ≥ 3:1. `--ivory` on `--noir` passes; keep
  gold text at ≥ 18px/semibold or larger (small gold-on-black fails AA — use ivory then).

---

### 2. Typography

Three families, each with one job. Load from Google Fonts.

```
Display / headlines → "Fraunces"      (high-contrast glam serif; wght 300–900, opsz on)
UI / body / labels  → "Manrope"       (clean geometric sans; wght 400–800)
Signature accent    → "Ephesis"       (script — echoes the logo wordmark; USE TINY)
```

- **Fraunces** carries the magazine-cover glam. Use big and heavy (700–900) with tight
  leading for hero and section titles; enable optical sizing (`opsz`) so large sizes get
  the high-contrast "expensive" look. Set `font-variation-settings: "SOFT" 0, "WONK" 0`.
- **Manrope** is everything functional: nav, buttons, body, forms, prices, the entire
  booking portal UI. Labels/eyebrows are UPPERCASE, 600, letter-spacing 0.16em.
- **Ephesis** appears only as a *garnish* — a signature flourish like "Lyfe 'n' Locs" or a
  section kicker ("the artistry"). Never for anything the user must read quickly. Max 1
  per viewport.

**Type ramp (fluid, clamp-based)**
```
Display XL  clamp(2.75rem, 7vw, 6.5rem)   Fraunces 900, line 0.98, tracking -0.02em
Display L   clamp(2.25rem, 5vw, 4rem)     Fraunces 800, line 1.02, tracking -0.015em
H1          clamp(2rem, 3.5vw, 3rem)      Fraunces 800, line 1.05
H2          clamp(1.5rem, 2.4vw, 2.15rem) Fraunces 700, line 1.1
H3          1.25rem                        Manrope 700, line 1.25
Body-L      1.125rem                       Manrope 400, line 1.65
Body        1rem                           Manrope 400, line 1.65
Eyebrow     0.8125rem                      Manrope 600 UPPERCASE, tracking 0.16em, gold
Caption     0.8125rem                      Manrope 500, --muted
Price       1.125rem                       Manrope 700, gold
```

---

### 3. Spacing, radius, shadow, layout

```
--space: 4px base scale → 4 8 12 16 24 32 48 64 96 128 (px)
--radius-sm: 8px    (chips, inputs)
--radius:    16px   (cards, buttons)
--radius-lg: 28px   (hero media, modals, portfolio tiles)
--radius-pill: 999px

--border: 1px solid var(--smoke);
--border-gold: 1px solid rgba(229,185,78,0.35);

/* Shadows are LOW and warm — glam glow, not gray drop-shadow */
--shadow-card: 0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 50px -30px rgba(0,0,0,0.9);
--shadow-gold: 0 10px 40px -12px rgba(229,185,78,0.35);
--shadow-fuchsia: 0 10px 40px -12px rgba(255,46,136,0.45);

Container: max-width 1200px, gutter 20px mobile / 32px desktop.
Section rhythm: 96px mobile / 128–160px desktop vertical padding.
Grid: 12-col desktop, 4-col mobile. Cards snap to 3-up (desktop) / 1-up (mobile).
```

**Signature detail — hairline gold rules.** Section dividers and card tops use a 1px line
filled with `--grad-gold` at ~35% opacity. It's the connective tissue of the whole brand.

---

### 4. Components

**Buttons**
- **Primary ("Book"):** fill `--grad-gold`, text `--gold-ink` (dark), radius 16, weight 700,
  padding 16×28. Hover: lift 2px + `--shadow-gold` + a 1px `--fuchsia` inner ring fades in.
  Active: press 1px. This is the single most important element on every page.
- **Secondary:** transparent fill, `--border-gold`, text `--ivory`. Hover: bg
  `rgba(229,185,78,0.08)`.
- **Ghost/nav:** text `--ivory`; active route shows a `--fuchsia` 2px underline.
- Minimum tap target 44×44. One primary button per section.

**Cards (service / category / portfolio)**
- bg `--onyx`, `--border`, radius `--radius-lg`, `--shadow-card`. Top edge = gold hairline.
- Hover: bg `--onyx-2`, translateY(-4px), gold hairline brightens, optional spotlight sheen
  follows cursor (see Motion). Portfolio tiles: image zoom 1.04 + gold vignette on hover.
- Service card anatomy: category eyebrow (gold), service name (H3 ivory), one-line note
  (`--muted`), then a row: **price (gold, "from $X")** · duration chip · **Book →**.

**Chips / tags**
- Pill, `--border`, `--muted` text. "Popular"/"New" tag = fuchsia text on
  `rgba(255,46,136,0.1)` with fuchsia border. Duration chip = clock icon + time, muted.

**Inputs (forms + booking portal)**
- bg `--onyx`, `--border`, radius 8, text ivory, placeholder `--muted-2`, height 48.
- Focus: border gold + 3px focus ring `rgba(255,46,136,0.3)` (fuchsia). Error: `--danger`.
- Labels above field, Manrope 600 13px. Never rely on placeholder as label.

**Nav**
- Sticky, `--noir` at 80% + backdrop-blur(12px), gold hairline bottom border on scroll.
- Left: wordmark (gold, Ephesis or logo SVG). Center/right: links. Far right: **Book** (primary).
- Mobile: hamburger → full-screen `--noir` overlay, big Fraunces links, Book pinned bottom.

**Footer**
- `--noir`, gold hairline top. Columns: brand + tagline, quick links, services, hours block,
  contact (NAP + tap-to-call + email + map link), socials (FB, TikTok, IG). Gold dust wash
  behind. Fine print + "Site by Couture House Co."

---

### 5. Motion (React Bits + Framer Motion, tinted to tokens)

Motion is part of the "bold glam" promise, but **taste rules override everything**:
max 1–2 effects visible per screen, tint every effect gold/fuchsia (no default palettes),
hold 60fps, honor `prefers-reduced-motion`, never let motion cost Lighthouse ≥ 95.

Signature set (echoing the logo's gold-dust sparkle):
- **Gold particle drift** — a low-density canvas of slow gold specks behind the hero and
  one mid-page band. ~40–60 particles, 0.2–0.4 opacity, no interaction cost. This is THE
  brand motion. (React Bits "Grainient" tinted, or a light custom canvas.)
- **Shiny Text** (gold shimmer sweep) on the wordmark and one hero word ("expensive," or
  the salon name). ~3s loop, subtle.
- **Split Text / Blur Text** reveal on hero headline (stagger in on load).
- **Scroll Float / Scroll Reveal** — sections rise 16px + fade as they enter (once).
- **Count Up** for the stat row (years locking, 5-star reviews, services offered).
- **Spotlight Card** — cursor-follow sheen on service/category cards (desktop only).
- **Circular Gallery / Carousel** for the portfolio (drag on mobile).
- **Marquee** — a slow gold trust bar ("Starter Locs · Retwists · Microlocs · Faux Locs · Color · Braids").

Global timing: ease `cubic-bezier(0.22,1,0.36,1)`, durations 200–600ms. Reduced-motion:
disable particle drift, shimmer, and parallax; keep instant fades only.

**AVOID (cheapen a premium brand):** Splash/Blob cursor, Pixel Trail, Ballpit, Balatro,
Antigravity, any bounce/rubber easing, neon glow on everything, autoplaying sound.

---

### 6. Imagery & iconography

- **Photography first.** Real close-ups of her loc work (retwist parts, micro/sisterlocs,
  color, faux locs, styled updos) shot tight and glossy on dark. Until real photos are
  wired, use the AI image prompts in the build package (gold/black glam, editorial).
- Treatment: rich shadows, warm highlights, slight contrast boost; subtle gold-dust
  particles may overlay hero media. Never stocky/bright/clinical.
- **Signature icon:** the logo's loc-bun woman silhouette becomes a reusable gold line-mark
  — section markers, favicon, loading state, empty states in the booking portal.
- Icons: thin-line (Lucide), 1.5px stroke, gold or ivory. Never filled/duotone default sets.

---

### 7. Accessibility & performance (non-negotiable)
- Lighthouse ≥ 95 all categories; LCP < 2s; CLS < 0.05. Mobile-first.
- All text meets AA contrast (see §1). Focus states always visible (fuchsia ring).
- Every interactive element keyboard-reachable; booking flow fully operable without a mouse.
- Images: next/image, AVIF/WebP, explicit width/height, lazy below fold, priority on hero.
- Fonts: `next/font` self-hosted, `display: swap`, preload display face only.
- Respect `prefers-reduced-motion`. Alt text on all images. Semantic landmarks + skip link.

---

### 8. Tailwind v4 token block (paste into globals.css `@theme`)

```css
@theme {
  --color-noir: #0B0B0D;
  --color-onyx: #141417;
  --color-onyx-2: #1C1C21;
  --color-smoke: #2A2A31;
  --color-ivory: #F7F3EC;
  --color-muted: #A19B90;
  --color-muted-2: #6E6A63;
  --color-gold: #E5B94E;
  --color-gold-hi: #F6E1A3;
  --color-gold-lo: #B8862F;
  --color-gold-ink: #3A2C0C;
  --color-fuchsia: #FF2E88;
  --color-fuchsia-soft: #FF6FAE;
  --color-success: #3FD08A;
  --color-danger: #FF5A5A;

  --font-display: "Fraunces", serif;
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-script: "Ephesis", cursive;

  --radius-sm: 8px;
  --radius: 16px;
  --radius-lg: 28px;

  --shadow-card: 0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 50px -30px rgba(0,0,0,0.9);
  --shadow-gold: 0 10px 40px -12px rgba(229,185,78,0.35);
  --shadow-fuchsia: 0 10px 40px -12px rgba(255,46,136,0.45);
}
```

---

### 9. Do / Don't

**Do:** real metallic gold (gradient), deep warm black, huge Fraunces headlines, one
fuchsia spark per screen, gold hairline rules, gold-dust motion, tight glossy photography,
one clear "Book" per page.

**Don't:** flat mustard "gold," pure black or pure white, more than one script line per
screen, rainbow gradients, default Tailwind blue/indigo, drop-shadow gray boxes, cluttered
multi-CTA sections, autoplay video with sound, motion that stutters or blocks LCP.
