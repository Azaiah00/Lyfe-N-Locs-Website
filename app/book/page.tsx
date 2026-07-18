import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldDust } from "@/components/motion/GoldDust";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { MyBookings } from "@/components/booking/MyBookings";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { bookingNote } from "@/data/facts";

export const metadata: Metadata = pageMetadata({
  title: "Book a Loc Appointment in Arlington, TX",
  description:
    "Book your loc or braid appointment with Lyfe N' Locs in Arlington, TX. A guided, category-first booking flow — pick your service and time, or start with a $25 consultation.",
  path: "/book",
});

/**
 * Book — hosts the custom booking portal (PROMPT B). A ?service=<id> deep-link
 * jumps straight to date & time for that service.
 */
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceId } = await searchParams;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ])}
      />

      {/* Header */}
      <section className="relative overflow-hidden">
        <GoldDust density={34} opacity={0.24} />
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-56" />
        <div className="container-glam relative flex flex-col items-center py-16 text-center md:py-20">
          <Eyebrow>Book</Eyebrow>
          <h1 className="mt-4 max-w-2xl text-display-l">Book your appointment.</h1>
          <p className="mt-5 max-w-xl text-body-l text-[var(--color-muted)]">
            Pick your service and time. New or unsure? Start with a $25 consultation. {bookingNote}
          </p>
        </div>
      </section>

      {/* Portal */}
      <div className="container-glam pb-24">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[rgba(20,20,23,0.6)] p-6 hairline-top md:p-10">
          <BookingFlow initialServiceId={serviceId} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <MyBookings />
        </div>
      </div>
    </>
  );
}
