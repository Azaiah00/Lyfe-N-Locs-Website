import type { Metadata } from "next";
import { business, contact } from "@/data/facts";

/**
 * Site-wide SEO helpers (docs/SEO.md). Unique title + description per route,
 * gold/black OG card, canonical URLs.
 *
 * IMPORTANT: Use one stable origin everywhere (canonical, OG, sitemap, JSON-LD).
 * Never use Netlify DEPLOY_URL — it changes on every deploy and breaks text-message
 * link previews. Prefer NEXT_PUBLIC_SITE_URL, then Netlify's primary URL env.
 */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL || // Netlify primary site address (stable)
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  return (raw ?? "https://lyfenlocs.netlify.app").replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = business.legalName;

const DEFAULT_OG = {
  images: [
    {
      url: "/images/og-default.jpg",
      width: 1200,
      height: 630,
      alt: `${business.brand} — loc & braid studio in ${contact.city}, ${contact.state}`,
    },
  ],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.brand} Beauty Lounge | Loc & Braid Studio in ${contact.city}, ${contact.state}`,
    template: `%s | ${business.brand}`,
  },
  description:
    "Premium loc & braid studio in Arlington, TX. Starter locs, retwists, microlocs, sisterlocs, faux locs, color & braids — crafted by hand to grow healthy. Book the artist.",
  applicationName: business.brand,
  keywords: [
    "loc retwist Arlington TX",
    "starter locs Arlington",
    "microlocs Arlington",
    "sisterlocks Arlington",
    "loc extensions Arlington",
    "faux locs Arlington",
    "knotless braids Arlington",
    "loc salon Arlington TX",
  ],
  authors: [{ name: business.legalName }],
  creator: business.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.brand,
    locale: "en_US",
    url: SITE_URL,
    ...DEFAULT_OG,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.brand} | Loc & Braid Studio — ${contact.city}, ${contact.state}`,
    description:
      "Starter locs, retwists, microlocs, faux locs, color & braids in Arlington, TX. Book the artist who treats your hair like the investment it is.",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: [{ url: "/logo/mark.svg", type: "image/svg+xml" }],
    shortcut: "/logo/mark.svg",
    apple: "/logo/mark.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** Per-page metadata builder with canonical path. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: `${opts.title} | ${business.brand}`,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      ...DEFAULT_OG,
    },
    twitter: {
      title: `${opts.title} | ${business.brand}`,
      description: opts.description,
    },
  };
}
