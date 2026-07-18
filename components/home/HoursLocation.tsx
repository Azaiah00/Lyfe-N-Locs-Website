import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { HoursTable } from "@/components/shared/HoursTable";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { directionsHref } from "@/lib/maps";
import { contact, bookingNote } from "@/data/facts";

/**
 * HoursLocation — hours table (FACTS.md) + map + tap-to-call + directions
 * (docs/CONTENT.md Home).
 */
export function HoursLocation() {
  return (
    <Section divider aria-labelledby="hours-heading">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Eyebrow>Visit the Studio</Eyebrow>
          <h2 id="hours-heading" className="mt-4 text-h1">
            Come get locked in.
          </h2>

          <address className="mt-6 not-italic">
            <p className="text-body-l text-[var(--color-ivory)]">
              {contact.addressLine}
              <br />
              {contact.city}, {contact.state} {contact.postalCode}
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{contact.accessibility}</p>
          </address>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={contact.phoneHref} variant="secondary">
              Call {contact.phoneDisplay}
            </Button>
            <Button href={directionsHref()} variant="secondary" external>
              Get Directions
            </Button>
          </div>

          <p className="mt-4 text-caption">{bookingNote}</p>

          <div className="mt-8">
            <HoursTable />
          </div>
        </div>

        <div className="min-h-[320px]">
          <MapEmbed className="h-full" />
        </div>
      </div>
    </Section>
  );
}
