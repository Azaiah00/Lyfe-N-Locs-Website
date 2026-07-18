import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { business, online } from "@/data/facts";

/**
 * Reviews — honest rating stat. Never fabricate featured reviews; link out to
 * Facebook for real client feedback until permissioned quotes are added.
 */
export function Reviews() {
  return (
    <Section aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center">Loved by clients</Eyebrow>
        <h2 id="reviews-heading" className="mt-4 text-h1">
          <span className="text-gold-metal">{business.rating}★</span> and counting.
        </h2>

        <div className="mx-auto mt-6 flex items-center justify-center gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < Math.round(business.rating)} />
          ))}
        </div>

        <p className="mt-8 text-body-l text-[var(--color-muted)]">
          Read what clients are saying on Facebook — real reviews from real chairs.
        </p>

        <a
          href={online.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-gold)] hover:underline"
        >
          Read reviews on Facebook →
        </a>
      </div>
    </Section>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-gold)" : "none"}
      stroke="var(--color-gold)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z" />
    </svg>
  );
}
