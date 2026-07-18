import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { HoursTable } from "@/components/shared/HoursTable";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { directionsHref } from "@/lib/maps";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { business, contact, socials, bookingNote } from "@/data/facts";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Location — Arlington, TX",
  description:
    "Visit Lyfe N' Locs Beauty Lounge at 1049 W. Abram St, Arlington, TX 76013. Tap to call (682) 203-3728, email, hours, and directions. By appointment only.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="relative overflow-hidden">
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-64" />
        <div className="container-glam relative pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="max-w-3xl">
            <Eyebrow>Visit</Eyebrow>
            <h1 className="mt-4 text-display-l">Come get locked in.</h1>
            <p className="mt-6 text-body-l text-[var(--color-muted)]">
              {business.legalName} · {business.tagline} in {contact.city}, {contact.state}.{" "}
              {bookingNote}
            </p>
          </div>
        </div>
      </section>

      <div className="container-glam pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Details */}
          <div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-7 hairline-top">
              <h2 className="text-eyebrow text-[var(--color-gold)]">Studio</h2>
              <address className="mt-4 space-y-5 not-italic">
                <ContactRow label="Address">
                  <a
                    href={directionsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-l text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold)]"
                  >
                    {contact.addressLine}, {contact.city}, {contact.state} {contact.postalCode}
                  </a>
                </ContactRow>
                <ContactRow label="Phone">
                  <a
                    href={contact.phoneHref}
                    className="text-body-l font-semibold text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold)]"
                  >
                    {contact.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow label="Email">
                  <a
                    href={contact.emailHref}
                    className="break-all text-body-l text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold)]"
                  >
                    {contact.email}
                  </a>
                </ContactRow>
                <ContactRow label="Accessibility">
                  <span className="text-[var(--color-muted)]">{contact.accessibility}</span>
                </ContactRow>
              </address>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={contact.phoneHref} className="flex-1">
                  Call Now
                </Button>
                <Button href={contact.emailHref} variant="secondary" className="flex-1">
                  Email
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-smoke)] px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:border-[rgba(229,185,78,0.5)] hover:text-[var(--color-gold)]"
                  >
                    {s.label} <span className="text-[var(--color-muted-2)]">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-7 hairline-top">
              <h2 className="text-eyebrow text-[var(--color-gold)]">Hours</h2>
              <div className="mt-4">
                <HoursTable />
              </div>
              <p className="mt-4 text-caption">
                Friday runs a split schedule — the 5–8 PM block is after-hours (retwist only).
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="lg:sticky lg:top-[88px] lg:self-start">
            <MapEmbed className="h-[420px] lg:h-[560px]" />
            <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-7 text-center hairline-top">
              <h2 className="text-h2">Ready to book?</h2>
              <p className="mt-2 text-[var(--color-muted)]">
                Reserve your service online, or start with a $25 consultation.
              </p>
              <div className="mt-5">
                <Button href="/book">Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-eyebrow text-[var(--color-muted)]">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
