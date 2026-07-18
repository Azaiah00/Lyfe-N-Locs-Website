/**
 * services.ts — SINGLE SOURCE OF TRUTH for the service menu (docs/SERVICES.md).
 * Drives the /services page, featured categories, and the hasOfferCatalog JSON-LD.
 *
 * All prices are STARTING prices ("from $X") and are PLACEHOLDERS pending owner
 * confirmation (see docs/CONFIRM.md). Durations are verbatim from her Square menu.
 */

export type ServiceTag = "popular" | "new" | "advised-only";

export type CategoryId =
  | "consultations"
  | "starter"
  | "retwist"
  | "interlock"
  | "styling"
  | "faux-braids"
  | "crochet"
  | "mens"
  | "color"
  | "extensions";

export type Service = {
  id: string;
  name: string;
  category: CategoryId;
  priceFrom: number;
  durationMins: number;
  note?: string;
  tags?: ServiceTag[];
};

export type Category = {
  id: CategoryId;
  index: number;
  label: string; // full menu label
  short: string; // compact label for nav/tiles
  blurb: string;
  featured?: boolean; // shows in the Home "featured categories" grid
  image?: string; // /public/images filename (docs/IMAGE-PROMPTS.md)
};

export const categories: Category[] = [
  {
    id: "consultations",
    index: 1,
    label: "Consultations & First Visit",
    short: "Consultations",
    blurb: "New, unsure, or coming back? Start here so we plan the right service.",
    image: "cat-starter.png",
  },
  {
    id: "starter",
    index: 2,
    label: "Starter Locs",
    short: "Starter Locs",
    blurb: "Coils, two-strand, small, extra-small, and microloc starts — done to grow healthy.",
    featured: true,
    image: "cat-starter.png",
  },
  {
    id: "retwist",
    index: 3,
    label: "Retwist & Maintenance",
    short: "Retwist",
    blurb: "Crisp, clean maintenance for existing clients — every size and count.",
    featured: true,
    image: "cat-retwist.png",
  },
  {
    id: "interlock",
    index: 4,
    label: "Interlock · Micro · Sisterlocs",
    short: "Micro / Sisterlocs",
    blurb: "Precise interlocking, micro, and sisterloc work with a delicate, premium touch.",
    featured: true,
    image: "cat-micro.png",
  },
  {
    id: "styling",
    index: 5,
    label: "Loc Styling",
    short: "Loc Styling",
    blurb: "Updos, curls, loc bobs, and twist-outs that turn heads.",
    featured: true,
    image: "hero.png",
  },
  {
    id: "faux-braids",
    index: 6,
    label: "Faux Locs & Braids",
    short: "Faux Locs & Braids",
    blurb: "Knotless, box braids, boho, and faux locs — over your own hair or your locs.",
    featured: true,
    image: "cat-faux.png",
  },
  {
    id: "crochet",
    index: 7,
    label: "Crochet & Takedowns",
    short: "Crochet & Takedowns",
    blurb: "Crochet installs, styles, and gentle takedown-and-wash service.",
    image: "cat-faux.png",
  },
  {
    id: "mens",
    index: 8,
    label: "Men's Grooming",
    short: "Men's",
    blurb: "Two-strand, designer braids, and clean full-head styles for men.",
    // No men's work photos yet — SmartImage shows branded fallback until added
    image: "cat-mens.png",
  },
  {
    id: "color",
    index: 9,
    label: "Color",
    short: "Color",
    blurb: "Single, multi, and tip color built to keep locs healthy and glossy.",
    featured: true,
    image: "cat-color.png",
  },
  {
    id: "extensions",
    index: 10,
    label: "Extensions, Recovery & Wash/Press",
    short: "Extensions & Wash",
    blurb: "Loc extensions, detox, deep shampoo, silk press, and recovery services.",
    image: "cat-retwist.png",
  },
];

export const services: Service[] = [
  // ① Consultations & First Visit
  { id: "loc-consultation", name: "Loc Consultation", category: "consultations", priceFrom: 25, durationMins: 30, note: "Plan your loc journey; book if unsure which service.", tags: ["popular"] },
  { id: "new-client-retwist-medium", name: "New Client Retwist (Normal Medium Locs)", category: "consultations", priceFrom: 125, durationMins: 150 },
  { id: "new-client-retwist-small", name: "New Client Retwist — Small Locs", category: "consultations", priceFrom: 150, durationMins: 150, note: "No style; not for micro." },
  { id: "new-client-retwist-twostrand", name: "New Client Retwist w/ Two-Strand — Medium", category: "consultations", priceFrom: 150, durationMins: 150 },
  { id: "new-client-interlock-medium", name: "New Client Medium Interlock", category: "consultations", priceFrom: 160, durationMins: 120 },
  { id: "new-client-interlock-small", name: "New Client Interlock — Small Locs", category: "consultations", priceFrom: 200, durationMins: 210 },
  { id: "new-client-extra", name: "New Client Extra", category: "consultations", priceFrom: 50, durationMins: 30 },
  { id: "loc-repair", name: "Loc Repair (After Consultation)", category: "consultations", priceFrom: 25, durationMins: 90, note: "Price varies by work needed." },
  { id: "returning-6mo", name: "Returning After 6+ Months", category: "consultations", priceFrom: 50, durationMins: 30, note: "Extra detangling / detox time." },

  // ② Starter Locs
  { id: "starter-adults-coils", name: "Starter Locs — Adults, Regular Coils", category: "starter", priceFrom: 185, durationMins: 120, note: "Price rises with thickness / length.", tags: ["popular"] },
  { id: "starter-twostrand", name: "Starter Locs w/ Two-Strand Twist, Regular", category: "starter", priceFrom: 200, durationMins: 150 },
  { id: "starter-small-coils", name: "Small Loc Start — Coils", category: "starter", priceFrom: 225, durationMins: 180 },
  { id: "starter-small-twostrand", name: "Small Loc Start — Two-Strand", category: "starter", priceFrom: 275, durationMins: 180 },
  { id: "starter-xs-coils", name: "Extra Small Loc Start — Coils", category: "starter", priceFrom: 275, durationMins: 210 },
  { id: "starter-xs-interlock", name: "Extra Small Interlock Loc Start", category: "starter", priceFrom: 450, durationMins: 450 },
  { id: "starter-micro-coils", name: "Microloc Start — Coils (Short Hair Only)", category: "starter", priceFrom: 300, durationMins: 270 },
  { id: "starter-micro-twostrand", name: "Microloc Two-Strand Starter", category: "starter", priceFrom: 450, durationMins: 360 },
  { id: "starter-micro-interlock", name: "Microloc Start — Full Interlocking Method", category: "starter", priceFrom: 650, durationMins: 480 },
  { id: "starter-partial", name: "Partial Head Loc Start (Grow-Out)", category: "starter", priceFrom: 50, durationMins: 60 },
  { id: "starter-freeform", name: "Freeform First Retwist", category: "starter", priceFrom: 200, durationMins: 150 },

  // ③ Retwist & Maintenance
  { id: "retwist-nostyle", name: "Retwist, No Style — 1–90 Locs", category: "retwist", priceFrom: 80, durationMins: 60, tags: ["popular"] },
  { id: "retwist-simple", name: "Retwist + Simple Style — Medium, 1–90", category: "retwist", priceFrom: 100, durationMins: 60 },
  { id: "retwist-small-nostyle", name: "Retwist, Small, No Style — 91–150", category: "retwist", priceFrom: 100, durationMins: 120 },
  { id: "retwist-small-style", name: "Retwist + Style — Small, 90–150", category: "retwist", priceFrom: 125, durationMins: 120 },
  { id: "retwist-twostrand-medium", name: "Retwist w/ Two-Strand Style — Medium (≤90 Locs)", category: "retwist", priceFrom: 125, durationMins: 90 },
  { id: "retwist-twostrand-thick", name: "Small / Long / Thick Retwist w/ Two-Strand", category: "retwist", priceFrom: 160, durationMins: 150 },
  { id: "retwist-xs-nostyle", name: "Extra Small Retwist, No Style", category: "retwist", priceFrom: 160, durationMins: 180 },
  { id: "retwist-xs-simple", name: "Extra Small Retwist + Simple Style", category: "retwist", priceFrom: 185, durationMins: 210 },
  { id: "retwist-micro-touchup", name: "Microloc Touch-Up", category: "retwist", priceFrom: 115, durationMins: 180 },
  { id: "retwist-micro", name: "Microloc Retwist", category: "retwist", priceFrom: 250, durationMins: 180 },

  // ④ Interlock · Micro · Sisterlocs
  { id: "interlock-medium", name: "Interlock — Medium Locs", category: "interlock", priceFrom: 130, durationMins: 120 },
  { id: "interlock-small", name: "Interlock — Small Locs", category: "interlock", priceFrom: 185, durationMins: 210 },
  { id: "interlock-xs", name: "Extra Small Interlock", category: "interlock", priceFrom: 225, durationMins: 245, note: "Book only if advised.", tags: ["advised-only"] },
  { id: "sisterloc-interlock", name: "Sisterloc Interlock", category: "interlock", priceFrom: 450, durationMins: 450, note: "No style; +$100 two-strand; styles +$25–50." },
  { id: "sisterloc-style", name: "Sisterloc Style", category: "interlock", priceFrom: 50, durationMins: 30 },
  { id: "microloc-interlock", name: "Microloc Interlock", category: "interlock", priceFrom: 300, durationMins: 270 },
  { id: "micro-sisterloc-shampoo-style", name: "Micro / Sisterloc Shampoo & Style", category: "interlock", priceFrom: 75, durationMins: 60 },
  { id: "miracle-knots-medium", name: "Miracle Knots (Medium)", category: "interlock", priceFrom: 150, durationMins: 210, note: "+$50 thick / long; arrive washed & dry." },

  // ⑤ Loc Styling
  { id: "updo-loc-style", name: "Updo Loc Style (Over Locs)", category: "styling", priceFrom: 150, durationMins: 180 },
  { id: "loc-curls", name: "Loc Curls", category: "styling", priceFrom: 150, durationMins: 120 },
  { id: "loc-curls-styles", name: "Loc Curls — Styles", category: "styling", priceFrom: 50, durationMins: 60 },
  { id: "loc-bob-twostrand", name: "Loc Bob w/ Two-Strand — Medium Only", category: "styling", priceFrom: 160, durationMins: 150 },
  { id: "boho-loc-bob", name: "Boho Loc Bob w/ Two-Strand", category: "styling", priceFrom: 190, durationMins: 180 },
  { id: "invisible-locs-flat-twist", name: "Invisible Locs Flat Twist (Incl. Wash)", category: "styling", priceFrom: 130, durationMins: 150 },
  { id: "natural-twist-out", name: "Natural Hair Twist Out", category: "styling", priceFrom: 85, durationMins: 120 },

  // ⑥ Faux Locs & Braids
  { id: "small-knotless-boho", name: "Small Knotless Boho", category: "faux-braids", priceFrom: 300, durationMins: 360 },
  { id: "knotless-over-locs", name: "Knotless Over Locs", category: "faux-braids", priceFrom: 350, durationMins: 360 },
  { id: "knotless-waist", name: "Knotless Braids — Waist, 26\"", category: "faux-braids", priceFrom: 275, durationMins: 270, tags: ["popular"] },
  { id: "knotless-midback", name: "Knotless Braids — Mid-Back, 20\"", category: "faux-braids", priceFrom: 200, durationMins: 270 },
  { id: "knotless-touchup", name: "Knotless Braid Touch-Up (2 Rows Around)", category: "faux-braids", priceFrom: 125, durationMins: 120 },
  { id: "box-braids-medium", name: "Box Braids — Medium (Natural Hair)", category: "faux-braids", priceFrom: 200, durationMins: 240 },
  { id: "box-braids-over-locs", name: "Box Braids Over Locs", category: "faux-braids", priceFrom: 250, durationMins: 270, note: "Arrive clean & dry." },
  { id: "box-braid-touchup", name: "Box Braid Touch-Up", category: "faux-braids", priceFrom: 100, durationMins: 90 },
  { id: "faux-locs-over-locs", name: "Faux Locs Over Locs", category: "faux-braids", priceFrom: 300, durationMins: 420, note: "Price varies by size / length." },

  // ⑦ Crochet & Takedowns
  { id: "individual-crochet", name: "Individual Crochet (Natural Hair)", category: "crochet", priceFrom: 150, durationMins: 210 },
  { id: "crochet-styles", name: "Crochet Styles (Natural Hair Only)", category: "crochet", priceFrom: 125, durationMins: 120 },
  { id: "crochet-takedown-wash", name: "Crochet / Braids Takedown & Wash", category: "crochet", priceFrom: 50, durationMins: 60 },

  // ⑧ Men's Grooming
  { id: "mens-box-twostrand", name: "Men's Box Braids / Two-Strand — Full Head", category: "mens", priceFrom: 150, durationMins: 180 },
  { id: "mens-designer-braids", name: "Men's Full-Head Designer Braids", category: "mens", priceFrom: 105, durationMins: 150 },
  { id: "mens-braids-simple", name: "Men's Braids, Full Head — Simple Style", category: "mens", priceFrom: 85, durationMins: 90 },
  { id: "mens-braids-top", name: "Men's Simple Braid Style — Top Only", category: "mens", priceFrom: 75, durationMins: 60 },

  // ⑨ Color
  { id: "loc-color-single", name: "Loc Color — 1 Color, Retwist & Style", category: "color", priceFrom: 285, durationMins: 300, note: "+$100 small / thick / long." },
  { id: "loc-color-multi", name: "Locs Multiple Color (Retwist & Style Incl.)", category: "color", priceFrom: 350, durationMins: 300 },
  { id: "loc-tips-color", name: "Loc Tips Color w/ Retwist — Medium", category: "color", priceFrom: 200, durationMins: 210 },
  { id: "natural-loc-color", name: "Natural Loc Color — Black or Brown", category: "color", priceFrom: 125, durationMins: 60 },
  { id: "color-only-natural", name: "Color Only — Natural Hair", category: "color", priceFrom: 185, durationMins: 90 },
  { id: "color-tips-short", name: "Color Tips — Short Hair Only", category: "color", priceFrom: 85, durationMins: 90 },
  { id: "additional-color-thick", name: "Additional Color Cost — Thick Hair", category: "color", priceFrom: 50, durationMins: 30 },

  // ⑩ Extensions, Recovery & Wash/Press
  { id: "loc-extensions-install", name: "Loc Extensions Install — Up to 100 Locs", category: "extensions", priceFrom: 1000, durationMins: 690, note: "Top-ticket service." },
  { id: "loc-extension-removal", name: "Loc Extension Removal", category: "extensions", priceFrom: 100, durationMins: 90 },
  { id: "loc-detox", name: "Loc Detox", category: "extensions", priceFrom: 80, durationMins: 60 },
  { id: "deep-loc-shampoo", name: "Deep Loc Shampoo", category: "extensions", priceFrom: 25, durationMins: 30 },
  { id: "shampoo", name: "Shampoo", category: "extensions", priceFrom: 25, durationMins: 35 },
  { id: "shampoo-style", name: "Shampoo & Style", category: "extensions", priceFrom: 50, durationMins: 45, note: "Not micro / sisterlocs." },
  { id: "silk-press", name: "Silk Press", category: "extensions", priceFrom: 85, durationMins: 120, note: "Starts $75; more w/ trim / difficulty." },
  { id: "split-ends-cut", name: "Split Ends Cut", category: "extensions", priceFrom: 40, durationMins: 30 },
];

/** Add-on fees — shown as a small "Add-Ons" note, not headline services. */
export const addOns = [
  { label: "Long / Thick Hair Tax", price: "+$50" },
  { label: "Diamond / Triangle / Custom Parting", price: "+$50" },
  { label: "Additional Complex Style", price: "+$20" },
  { label: "After-Hours / Off-Day (Retwist Only)", price: "$150" },
];

/** Services-page note banner — shown VERBATIM from docs/SERVICES.md. */
export const priceNote =
  "Prices shown are starting prices. Final pricing depends on loc count, length, thickness, and style. Long/thick hair and complex parting may add a fee — you'll always know before we start.";

// ---- Helpers -------------------------------------------------------------

export const featuredCategories = categories.filter((c) => c.featured);

export function servicesByCategory(id: CategoryId): Service[] {
  return services.filter((s) => s.category === id);
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** "2h30" style duration from minutes. */
export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, "0")}`;
}

/** ISO 8601 duration for schema.org (e.g. "PT2H30M"). */
export function isoDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}` || "PT0M";
}

export const serviceCount = services.length;
