import { business, contact, online, hours } from "@/data/facts";
import { services, isoDuration } from "@/data/services";
import { SITE_URL } from "@/lib/seo";

/**
 * HairSalon (LocalBusiness subtype) JSON-LD, built from the data layer so it
 * stays in sync with FACTS.md (docs/SEO.md). openingHoursSpecification includes
 * the Friday split. aggregateRating is intentionally OMITTED — we do not ship a
 * fabricated review count (FACTS.md / docs/SEO.md).
 */

const dayUri: Record<string, string> = {
  Mo: "https://schema.org/Monday",
  Tu: "https://schema.org/Tuesday",
  We: "https://schema.org/Wednesday",
  Th: "https://schema.org/Thursday",
  Fr: "https://schema.org/Friday",
  Sa: "https://schema.org/Saturday",
  Su: "https://schema.org/Sunday",
};

function openingHoursSpecification() {
  const spec: Record<string, string>[] = [];
  for (const d of hours) {
    for (const r of d.ranges) {
      spec.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayUri[d.short],
        opens: r.open,
        closes: r.close,
      });
    }
  }
  return spec;
}

export function hairSalonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/#business`,
    name: business.legalName,
    alternateName: business.brand,
    description: business.descriptor,
    url: SITE_URL,
    telephone: "+1-682-203-3728",
    email: contact.email,
    priceRange: business.priceRange,
    image: `${SITE_URL}/images/hero.png`,
    logo: `${SITE_URL}/logo/mark.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine,
      addressLocality: contact.city,
      addressRegion: contact.state,
      postalCode: contact.postalCode,
      addressCountry: contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    sameAs: [online.facebook, online.tiktok],
    openingHoursSpecification: openingHoursSpecification(),
    isAccessibleForFree: true,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.brand} Services`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: s.priceFrom,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: s.priceFrom,
          valueAddedTaxIncluded: false,
        },
        itemOffered: {
          "@type": "Service",
          name: s.name,
          serviceType: "Loc & braid styling",
          ...(s.durationMins ? { estimatedDuration: isoDuration(s.durationMins) } : {}),
        },
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
