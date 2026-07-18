# MOTION.md — Motion Spec

Motion is part of the "Bold Glam" promise, but **taste rules override everything**: max 1–2
effects visible per screen, tint every effect to brand tokens (gold/fuchsia — no default
palettes), hold 60fps, honor `prefers-reduced-motion`, never let motion cost Lighthouse ≥ 95
or block LCP.

## Signature set (echoes the logo's gold-dust sparkle)
| Effect | Where | Notes |
|---|---|---|
| **Gold particle drift** | Hero bg + one mid-page band | THE brand motion. ~40–60 slow gold specks, 0.2–0.4 opacity, cheap canvas. Disable on reduced-motion. |
| **Shiny Text** (gold shimmer) | Wordmark + one hero word | ~3s loop, subtle. |
| **Split / Blur Text reveal** | Hero headline on load | Stagger in. |
| **Scroll Reveal / Float** | Section entrances | Rise 16px + fade, once. |
| **Count Up** | Stat bar | 80+ / 4.6★ / etc. |
| **Spotlight Card** | Service & category cards | Cursor-follow sheen, desktop only. |
| **Circular Gallery / Carousel** | Portfolio | Drag on mobile. |
| **Marquee** | Gold trust bar | Slow: "Starter Locs · Retwists · Microlocs · Faux Locs · Color · Braids". |

## Timing
Ease `cubic-bezier(0.22,1,0.36,1)`; durations 200–600ms.

## React Bits picks (reactbits.dev) — install source-in, then tint to tokens
Backgrounds: Grainient (tinted gold) for particle feel. Text: Split Text / Blur Text, Shiny
Text (gold), Scroll Float/Reveal, Count Up. Components: Spotlight/Tilted Card, Circular
Gallery/Carousel, Marquee.

## Reduced motion
Disable particle drift, shimmer, parallax; keep instant fades only. Every motion component
checks `useReducedMotion()` / the CSS media query itself.

## AVOID (cheapen a premium brand)
Splash/Blob cursor, Pixel Trail, Ballpit, Balatro, Antigravity, bounce/rubber easing, neon
glow on everything, autoplaying sound.
