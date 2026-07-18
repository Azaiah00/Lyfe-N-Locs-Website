import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Confirm } from "@/components/ui/Confirm";
import { teaserFaqs } from "@/data/faqs";

/**
 * FaqTeaser — 3 FAQs → /policies (docs/CONTENT.md). Answers with unverified
 * policy render visible 【CONFIRM】 tokens.
 */
export function FaqTeaser() {
  return (
    <Section aria-labelledby="faq-heading">
      <div className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-1">
          <Eyebrow>Good to Know</Eyebrow>
          <h2 id="faq-heading" className="mt-4 text-h1">
            Before you book.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            A few quick answers. See the full policies &amp; FAQ for deposits, prep, and
            cancellations.
          </p>
          <Link
            href="/policies"
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-gold)]"
          >
            Read all policies
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <dl className="md:col-span-2">
          {teaserFaqs.map((faq) => (
            <div key={faq.id} className="border-b border-[var(--color-smoke)] py-6 first:pt-0">
              <dt className="text-h3 text-[var(--color-ivory)]">{faq.question}</dt>
              <dd className="mt-2 text-[var(--color-muted)]">
                {faq.answer.map((part, i) =>
                  part.confirm ? (
                    <Confirm key={i}>{part.text}</Confirm>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
