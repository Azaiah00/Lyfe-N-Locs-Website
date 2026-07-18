/**
 * portfolio.ts — Portfolio gallery items.
 *
 * IMPORTANT: These reference AI PLACEHOLDER images (docs/IMAGE-PROMPTS.md).
 * They must be replaced with her real, permissioned work photos before launch
 * (see docs/CONFIRM.md). Titles are descriptive, not fabricated client stories.
 */

export type PortfolioFilter = "Locs" | "Styles" | "Braids" | "Color" | "Men's";

export type PortfolioItem = {
  id: string;
  /** image filename in /public/images (branded gold-dust fallback if missing) */
  src: string;
  alt: string;
  filter: PortfolioFilter;
};

export const portfolioFilters: ("All" | PortfolioFilter)[] = [
  "All",
  "Locs",
  "Styles",
  "Braids",
  "Color",
  "Men's",
];

export const portfolioItems: PortfolioItem[] = [
  { id: "p1", src: "cat-retwist.jpg", alt: "Crisp medium loc retwist with clean gridwork parting, Arlington TX", filter: "Locs" },
  { id: "p2", src: "cat-starter.jpg", alt: "Freshly coiled starter locs on healthy natural hair", filter: "Locs" },
  { id: "p3", src: "cat-micro.jpg", alt: "Uniform microlocs with delicate precise parting", filter: "Locs" },
  { id: "p4", src: "hero.jpg", alt: "Sculptural loc updo styled for a special occasion", filter: "Styles" },
  { id: "p5", src: "cat-faux.jpg", alt: "Long bohemian faux locs with curly ends", filter: "Styles" },
  { id: "p6", src: "cat-color.jpg", alt: "Locs with honey-gold colored tips catching warm light", filter: "Color" },
  { id: "p7", src: "cat-mens.jpg", alt: "Men's two-strand twists with sharp designer parting", filter: "Men's" },
  { id: "p8", src: "cat-faux.jpg", alt: "Knotless braids down the back, waist length", filter: "Braids" },
  { id: "p9", src: "cat-retwist.jpg", alt: "Interlock maintenance on small locs", filter: "Locs" },
  { id: "p10", src: "cat-color.jpg", alt: "Multi-tone loc color, retwist and style", filter: "Color" },
  { id: "p11", src: "hero.jpg", alt: "Loc curls set into a soft glamorous style", filter: "Styles" },
  { id: "p12", src: "cat-mens.jpg", alt: "Men's full-head designer braids, clean finish", filter: "Men's" },
];
