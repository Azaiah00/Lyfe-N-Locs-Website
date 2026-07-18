/** Navigation config. Future upsell routes are feature-flagged OFF (hidden from nav). */

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
];

/**
 * Hidden/feature-flagged nav hooks for future upsells (CLAUDE.md).
 * Flip a flag to surface the route in nav + footer once built.
 */
export const featureFlags = {
  shop: false,
  learn: false,
  blog: false,
} as const;

export const upsellNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Learn", href: "/learn" },
  { label: "Blog", href: "/blog" },
].filter((l) => featureFlags[l.label.toLowerCase() as keyof typeof featureFlags]);
