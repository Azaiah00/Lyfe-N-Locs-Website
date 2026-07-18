# SEO.md — SEO & Metadata

## Local SEO targets (Arlington, TX loc/braid intent)
Primary: "loc retwist Arlington TX", "starter locs Arlington", "microlocs Arlington",
"sisterlocks Arlington", "loc extensions Arlington", "faux locs Arlington", "knotless braids
Arlington", "loc salon Arlington TX". Secondary: "interlocking near me", "loc color Arlington",
"men's locs/braids Arlington".

## Per-page metadata
Unique `<title>` + `meta description` per route (loc-intent + Arlington). OG image = gold/black
brand card per page. Twitter card. Canonical URLs.

Examples:
- Home: `Lyfe N' Locs Beauty Lounge | Loc & Braid Studio in Arlington, TX`
- Services: `Loc Services & Pricing | Starter Locs, Retwist, Microlocs — Arlington TX`
- Book: `Book a Loc Appointment in Arlington, TX | Lyfe N' Locs`

## JSON-LD (from data/facts.ts — keep in sync with FACTS.md)
`HairSalon` (subtype of `LocalBusiness`):
- name "Lyfe N' Locs Beauty Lounge LLC"
- address 1049 W. Abram St, Arlington, TX 76013
- telephone +1-682-203-3728, email mwarns2000@yahoo.com
- geo 32.7363821, -97.120018
- url (site), sameAs [Facebook, TikTok]
- priceRange "$$"
- `openingHoursSpecification` — Tue 09–15, Wed 08–15, Thu 08–15, Fri 08–15 & 17–20, Sat 09–17,
  Sun 09–13, Mon closed
- `hasOfferCatalog` of `Service` items (from SERVICES.md)
- `aggregateRating` — 【ONLY if using real, verifiable numbers; otherwise omit】

Add `BreadcrumbList` on inner pages and `FAQPage` on /policies (once answers are confirmed).

## Technical
sitemap.xml + robots.txt (allow all, point to sitemap). `tel:` links. Fast fonts (next/font,
display swap, preload display face). Image alt text with loc/service + Arlington where natural.
Lighthouse ≥ 95, LCP < 2s, CLS < 0.05.

## Google Business Profile (off-site checklist for owner)
Claim/verify GBP; exact NAP match; loc service categories; post portfolio photos; enable
booking link; request reviews after appointments (reply to all).
