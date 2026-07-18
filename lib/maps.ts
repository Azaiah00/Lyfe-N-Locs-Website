import { business, contact } from "@/data/facts";

/** Google Maps directions link to the studio (NAP from FACTS.md). */
export function directionsHref() {
  const q = encodeURIComponent(`${business.legalName}, ${contact.fullAddress}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

/** Google Maps search link to the studio listing. */
export function mapSearchHref() {
  const q = encodeURIComponent(`${business.legalName}, ${contact.fullAddress}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
