/**
 * portfolio.ts — Portfolio gallery items.
 *
 * Real client work photos from the owner (permissioned). Filenames live in
 * /public/images. Missing files still fall back to the branded gold-dust panel
 * via <SmartImage>.
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
  // —— Locs ——
  {
    id: "p1",
    src: "work-locs-low-bun.png",
    alt: "Mature locs retwisted and styled into a textured low bun with clean geometric parting",
    filter: "Locs",
  },
  {
    id: "p2",
    src: "work-starter-coils.png",
    alt: "Fresh starter loc coils with precise diamond parting across the crown",
    filter: "Locs",
  },
  {
    id: "p3",
    src: "work-micro-sisterlocs-long.png",
    alt: "Long ultra-fine sisterlocs / microlocs with precise parting cascading past the mid-back",
    filter: "Locs",
  },
  {
    id: "p3b",
    src: "work-starter-loc-starts.png",
    alt: "Fine starter locs with clean rectangular parting and copper-toned ends",
    filter: "Locs",
  },
  {
    id: "p4",
    src: "work-locs-twists-honey-tips.png",
    alt: "Medium two-strand twists with honey-blonde tips and neat square parting",
    filter: "Locs",
  },
  {
    id: "p5",
    src: "work-locs-twists-grid.png",
    alt: "Two-strand twists with honey highlights and a clean grid parting",
    filter: "Locs",
  },

  // —— Styles (loc updos) ——
  {
    id: "p6",
    src: "work-locs-updo-nape.png",
    alt: "Locs gathered into a neat nape bun with one loc left free at the ear",
    filter: "Styles",
  },
  {
    id: "p7",
    src: "work-locs-saltpepper-bun-rear.png",
    alt: "Salt-and-pepper locs styled into a voluminous high bun",
    filter: "Styles",
  },
  {
    id: "p8",
    src: "work-locs-saltpepper-bun-side.png",
    alt: "Salt-and-pepper loc high bun with face-framing locs, side view",
    filter: "Styles",
  },

  // —— Braids (kids + adult) ——
  {
    id: "p9",
    src: "work-kids-braids-spacebuns-a.png",
    alt: "Kids braids with cornrows, space buns, and pink and purple accent braids",
    filter: "Braids",
  },
  {
    id: "p10",
    src: "work-kids-braids-blue.png",
    alt: "Kids shoulder-length braids with curly ends and a royal blue accent braid",
    filter: "Braids",
  },
  {
    id: "p11",
    src: "work-braids-burgundy-goddess.png",
    alt: "Bohemian goddess braids with burgundy curly ends and clean parting",
    filter: "Braids",
  },

  // —— Color ——
  {
    id: "p12",
    src: "work-locs-twists-honey-tips.png",
    alt: "Two-strand twists with honey-gold tip color",
    filter: "Color",
  },
  {
    id: "p13",
    src: "work-braids-burgundy-goddess.png",
    alt: "Burgundy goddess braids with curly ends",
    filter: "Color",
  },
];
