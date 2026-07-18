# DEPLOY.md — Shipping the site

The marketing site is a standard Next.js 15 App Router app — it deploys with **zero config** on
Vercel or Netlify. Pick one.

## Environment variables

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production origin (e.g. `https://lyfenlocs.com`). Used for canonical URLs, `sitemap.xml`, `robots.txt`, and JSON-LD. Defaults to `https://lyfenlocs.com` if unset. |

The booking portal at `/book` runs in **demo mode** on mock data when no keys are set, so it
deploys and demos immediately. To take deposits live, add `SQUARE_ACCESS_TOKEN` +
`SQUARE_LOCATION_ID` (or set `NEXT_PUBLIC_BOOKING_ENGINE=stripe-standalone` + `STRIPE_*`). See
[`.env.example`](../.env.example). Keep secrets out of git; use the host's env UI (`.env*.local`
is git-ignored).

---

## Option A — Vercel (recommended)

1. Push this repo to GitHub (`github.com/Azaiah00/Lyfe-N-Locs-Website`).
2. In Vercel → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Build command `next build`, output auto.
4. Add env var `NEXT_PUBLIC_SITE_URL = https://<your-domain>`.
5. **Deploy.** Add the custom domain under **Settings → Domains**.

## Option B — Netlify

1. Push to GitHub.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Netlify auto-detects Next.js via the official Next runtime. Build command `next build`,
   publish directory handled by the runtime (leave default).
4. Add env var `NEXT_PUBLIC_SITE_URL`.
5. **Deploy** and attach the domain under **Domain management**.

---

## Pre-launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Drop real (permissioned) photos into `public/images/` using the
      [IMAGE-PROMPTS.md](./IMAGE-PROMPTS.md) filenames, incl. `og-default.jpg` (1200×630).
- [ ] Resolve every 【CONFIRM】 token — see [CONFIRM.md](./CONFIRM.md).
- [ ] Verify NAP matches the Google Business Profile exactly (it's driven from `data/facts.ts`).
- [ ] Run Lighthouse on the deployed URL (target ≥ 95 all categories; LCP < 2s; CLS < 0.05).
- [ ] Confirm `/sitemap.xml` and `/robots.txt` resolve on the live domain.
- [ ] Booking portal: add `SQUARE_*` keys to leave demo mode, then set the real deposit rule in
      `lib/booking/config.ts` and a notification provider (see [CONFIRM.md](./CONFIRM.md)).
