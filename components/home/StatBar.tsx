import { CountUp } from "@/components/motion/CountUp";
import { Confirm } from "@/components/ui/Confirm";
import { Section } from "@/components/ui/Section";
import { business } from "@/data/facts";

/**
 * StatBar — stat row (MOTION.md). Only verifiable NUMBERS animate (Count Up);
 * the lead tile is static craft copy, never a raw service count — a number here
 * reads as puffy and she has ~40 distinct services once size-variants collapse
 * (docs/CONTENT.md / docs/SERVICES.md). "Years locking" stays a visible
 * 【CONFIRM】 token (docs/CONFIRM.md).
 */
export function StatBar() {
  return (
    <Section className="!py-14" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        By the numbers
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        <Stat
          value="Every loc size & stage"
          label="Specialty"
          valueClass="text-display-m text-gold-metal"
        />
        <Stat
          value={<CountUp value={business.rating} decimals={1} suffix="★" />}
          label="Average rating"
        />
        <Stat 
          value={<><span className="block">Arlington,</span><span className="block">TX</span></>} 
          label="Studio location" 
          valueClass="text-display-m text-gold-metal"
        />
        <Stat 
          value="Tue–Sun" 
          label="Open by appointment" 
          valueClass="text-display-m text-gold-metal"
        />
      </dl>

      <p className="mt-8 text-center text-caption">
        Locking hair for <Confirm>years locking, e.g. &ldquo;6+ yrs&rdquo;</Confirm> — verify
        before launch.
      </p>
    </Section>
  );
}

function Stat({ value, label, valueClass }: { value: React.ReactNode; label: string; valueClass?: string }) {
  return (
    <div className="text-center">
      <dd className={valueClass || "text-display-l text-gold-metal"}>{value}</dd>
      <dt className="mt-2 text-eyebrow text-[var(--color-muted)]">{label}</dt>
    </div>
  );
}
