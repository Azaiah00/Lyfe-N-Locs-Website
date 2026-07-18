import Link from "next/link";
import { Wordmark } from "@/components/nav/Wordmark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryNav, upsellNav } from "@/data/nav";
import { business, contact, socials, hours, bookingNote } from "@/data/facts";
import { featuredCategories } from "@/data/services";
import { mapSearchHref } from "@/lib/maps";

/**
 * Footer — brand, quick links, services, hours, contact (NAP), socials.
 * Gold dust wash behind + gold hairline top (DESIGN.md §4). NAP comes from the
 * data layer (single source of truth) so it matches the JSON-LD exactly.
 */
export function Footer() {
  const links = [...primaryNav.filter((l) => l.href !== "/"), ...upsellNav];

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(229,185,78,0.35)] bg-[var(--color-noir)]">
      <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-48" />

      <div className="container-glam relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-xs text-[var(--color-muted)]">
              {business.tagline} in {contact.city}, {contact.state}. Healthy locs first,
              beautiful always — by appointment only.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${business.brand} on ${s.label} (${s.handle})`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-smoke)] text-[var(--color-muted)] transition-colors hover:border-[rgba(229,185,78,0.5)] hover:text-[var(--color-gold)]"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="md:col-span-2">
            <Eyebrow as="h2" className="mb-4">
              Explore
            </Eyebrow>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ivory)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-3">
            <Eyebrow as="h2" className="mb-4">
              Services
            </Eyebrow>
            <ul className="space-y-2.5">
              {featuredCategories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/services#${c.id}`}
                    className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ivory)]"
                  >
                    {c.short}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[var(--color-gold)] hover:underline">
                  View full menu →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + hours */}
          <div className="md:col-span-3">
            <Eyebrow as="h2" className="mb-4">
              Visit
            </Eyebrow>
            <address className="space-y-2 not-italic text-[var(--color-muted)]">
              <a
                href={mapSearchHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[var(--color-ivory)]"
              >
                {contact.addressLine}
                <br />
                {contact.city}, {contact.state} {contact.postalCode}
              </a>
              <a
                href={contact.phoneHref}
                className="block font-semibold text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold)]"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.emailHref}
                className="block break-all transition-colors hover:text-[var(--color-ivory)]"
              >
                {contact.email}
              </a>
            </address>

            <p className="mt-4 text-caption">{bookingNote}</p>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-[var(--color-gold)]">Hours</summary>
              <ul className="mt-2 space-y-1 text-[var(--color-muted)]">
                {hours.map((d) => (
                  <li key={d.day} className="flex justify-between gap-4">
                    <span>{d.day}</span>
                    <span className="text-right">{d.display}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <hr className="rule-gold my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-caption md:flex-row">
          <p>
            © {STATIC_YEAR} {business.legalName}. All rights reserved.
          </p>
          <p>
            Site by{" "}
            <a
              href="#"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
            >
              Couture House Co.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Fixed at build; avoids a hydration mismatch from Date on the client.
const STATIC_YEAR = 2026;

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  // TikTok
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 3c.3 2 1.6 3.6 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1v5.9a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.8a2.7 2.7 0 1 0 1.9 2.6V3H16z" />
    </svg>
  );
}
