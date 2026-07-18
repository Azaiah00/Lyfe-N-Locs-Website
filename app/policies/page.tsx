import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = pageMetadata({
  title: "Policies & FAQ — Deposits, Cancellations, Prep",
  description:
    "Booking policies and FAQ for Lyfe N' Locs Beauty Lounge in Arlington, TX: consultations, new clients, deposits, cancellations, after-hours, and prep. (Draft — pending owner confirmation.)",
  path: "/policies",
});

/**
 * Policies & FAQ — EVERY policy renders with visible 【CONFIRM】 tokens where
 * unverified (docs/CONTENT.md / CONFIRM.md). Recommended defaults are drafted
 * but explicitly not presented as final. FAQPage JSON-LD is intentionally NOT
 * emitted until answers are confirmed (docs/SEO.md).
 */

const policies = [
  {
    id: "consultations",
    title: "Consultations",
    parts: [
      { text: "New or complex? Book a $25 loc consultation first so we plan the right service. The consult fee is " },
      { text: "applied to your service / non-refundable", confirm: true },
      { text: "." },
    ],
  },
  {
    id: "new-clients",
    title: "New Clients",
    parts: [
      { text: "Please book under the \"New Client\" services so I schedule enough time. Unsure of your loc size or count? Book a consultation instead of guessing." },
    ],
  },
  {
    id: "deposits",
    title: "Deposits",
    parts: [
      { text: "" },
      { text: "strongly recommended — a deposit is required to hold your appointment and applies to your total", confirm: true },
      { text: "" },
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation / Reschedule",
    parts: [
      { text: "Please give " },
      { text: "48", confirm: true },
      { text: " hours' notice. Late cancellations / no-shows may forfeit the deposit." },
    ],
  },
  {
    id: "after-hours",
    title: "After-Hours / Off-Day",
    parts: [
      { text: "Friday evenings and off-day appointments are available for retwist only (no braids / styles) at the posted after-hours rate. Call to schedule." },
    ],
  },
  {
    id: "returning",
    title: "Returning After 6+ Months",
    parts: [
      { text: "An additional fee applies for locs not maintained in 6+ months, due to extra detangling / detox time." },
    ],
  },
  {
    id: "prep",
    title: "Prep",
    parts: [
      { text: "Come with hair " },
      { text: "washed & dry / as booked — varies per service", confirm: true },
      { text: ". Add a shampoo service if you need it." },
    ],
  },
];

function Parts({ parts }: { parts: { text: string; confirm?: boolean }[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.confirm ? <Confirm key={i}>{p.text}</Confirm> : <span key={i}>{p.text}</span>
      )}
    </>
  );
}

export default function PoliciesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Policies", path: "/policies" },
        ])}
      />

      <section className="relative overflow-hidden">
        <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-64" />
        <div className="container-glam relative pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="max-w-3xl">
            <Eyebrow>The Fine Print</Eyebrow>
            <h1 className="mt-4 text-display-l">Policies &amp; FAQ.</h1>
            <p className="mt-6 text-body-l text-[var(--color-muted)]">
              Booking a loc appointment is booking a chunk of my day — these policies keep it
              fair for everyone. Anything marked{" "}
              <span className="confirm-token">【CONFIRM】</span> is a recommended draft awaiting
              the owner&apos;s final word and is not yet policy.
            </p>
          </div>
        </div>
      </section>

      <div className="container-glam pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Policies */}
          <section aria-labelledby="policies-heading">
            <h2 id="policies-heading" className="text-h1">
              Policies
            </h2>
            <dl className="mt-6">
              {policies.map((p) => (
                <div key={p.id} className="border-b border-[var(--color-smoke)] py-6 first:pt-0">
                  <dt className="text-h3 text-[var(--color-ivory)]">{p.title}</dt>
                  <dd className="mt-2 text-[var(--color-muted)]">
                    <Parts parts={p.parts} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-h1">
              FAQ
            </h2>
            <div className="mt-6">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border-b border-[var(--color-smoke)] py-5 first:pt-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h3 text-[var(--color-ivory)]">
                    {faq.question}
                    <span className="text-[var(--color-gold)] transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--color-muted)]">
                    <Parts parts={faq.answer} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-10 text-center hairline-top">
          <h2 className="text-h2">Still have a question?</h2>
          <p className="max-w-md text-[var(--color-muted)]">
            Book a $25 consultation and we&apos;ll sort out the right service and plan together.
          </p>
          <Button href="/book?service=loc-consultation">Book a Consultation</Button>
        </div>
      </div>
    </>
  );
}
