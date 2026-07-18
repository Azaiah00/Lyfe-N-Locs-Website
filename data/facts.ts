/**
 * facts.ts — SINGLE SOURCE OF TRUTH for NAP, hours, and socials.
 * Sourced verbatim from docs/FACTS.md. Never hardcode contact info elsewhere —
 * import from here so the site copy and JSON-LD stay in sync.
 */

export const business = {
  legalName: "Lyfe N' Locs Beauty Lounge LLC",
  brand: "Lyfe N' Locs",
  wordmark: "Lyfe 'n' Locs",
  /** Owner / artist display name — confirmed by stakeholder */
  ownerName: "Muriel",
  tagline: "Loc & braid salon",
  descriptor: "Solo master loc artist — locs, braids, color & more in Arlington, TX.",
  priceRange: "$$",
  rating: 4.6, // ~4.6★ per FACTS.md — present honestly, never fabricate a review count.
} as const;

export const contact = {
  addressLine: "1049 W. Abram St",
  city: "Arlington",
  state: "TX",
  postalCode: "76013",
  country: "US",
  get fullAddress() {
    return `${this.addressLine}, ${this.city}, ${this.state} ${this.postalCode}`;
  },
  phoneDisplay: "(682) 203-3728",
  phoneHref: "tel:+16822033728",
  email: "mwarns2000@yahoo.com",
  emailHref: "mailto:mwarns2000@yahoo.com",
  geo: { lat: 32.7363821, lng: -97.120018 },
  accessibility: "Wheelchair accessible — parking, entrance, and restroom.",
} as const;

export const online = {
  squareBooking: "https://locs-lyfe.square.site/",
  facebook: "https://www.facebook.com/lyfenlocs2021/",
  tiktok: "https://www.tiktok.com/@lyfe_n_locs",
} as const;

export const socials = [
  { label: "Facebook", href: online.facebook, handle: "lyfenlocs2021" },
  { label: "TikTok", href: online.tiktok, handle: "@lyfe_n_locs" },
] as const;

/**
 * Hours — verbatim from FACTS.md. Friday is a SPLIT schedule; the evening
 * 5–8 block is after-hours (retwist only). Ranges use 24h for JSON-LD.
 */
export type HoursRange = { open: string; close: string; note?: string };
export type DayHours = {
  day: string;
  short: "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";
  display: string;
  ranges: HoursRange[]; // empty = closed
};

export const hours: DayHours[] = [
  { day: "Monday", short: "Mo", display: "Closed", ranges: [] },
  { day: "Tuesday", short: "Tu", display: "9:00 AM – 3:00 PM", ranges: [{ open: "09:00", close: "15:00" }] },
  { day: "Wednesday", short: "We", display: "8:00 AM – 3:00 PM", ranges: [{ open: "08:00", close: "15:00" }] },
  { day: "Thursday", short: "Th", display: "8:00 AM – 3:00 PM", ranges: [{ open: "08:00", close: "15:00" }] },
  {
    day: "Friday",
    short: "Fr",
    display: "8:00 AM – 3:00 PM & 5:00 PM – 8:00 PM",
    ranges: [
      { open: "08:00", close: "15:00" },
      { open: "17:00", close: "20:00", note: "After-hours — retwist only" },
    ],
  },
  { day: "Saturday", short: "Sa", display: "9:00 AM – 5:00 PM", ranges: [{ open: "09:00", close: "17:00" }] },
  { day: "Sunday", short: "Su", display: "9:00 AM – 1:00 PM", ranges: [{ open: "09:00", close: "13:00" }] },
];

export const bookingNote = "By appointment only.";
