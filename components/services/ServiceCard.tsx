import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { DurationChip } from "@/components/ui/DurationChip";
import { Tag } from "@/components/ui/Chip";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import type { Service } from "@/data/services";
import { getCategory } from "@/data/services";

/**
 * ServiceCard — the service card anatomy from DESIGN.md §4:
 * category eyebrow (gold) · name (H3 ivory) · note (muted) · then a row of
 * price ("from $X", gold) · duration chip · Book →.
 * Wrapped in a SpotlightCard (cursor-follow sheen on desktop).
 */
export function ServiceCard({ service }: { service: Service }) {
  const category = getCategory(service.category);
  const bookHref = `/book?service=${service.id}`;

  return (
    <SpotlightCard as="article" className="flex h-full flex-col p-6">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="text-eyebrow text-[var(--color-gold)]">{category?.short}</p>
        {service.tags?.length ? (
          <div className="flex shrink-0 gap-1.5">
            {service.tags.map((t) => (
              <Tag key={t} tag={t} />
            ))}
          </div>
        ) : null}
      </div>

      <h3 className="text-h3 text-[var(--color-ivory)]">{service.name}</h3>

      {service.note && (
        <p className="mt-2 text-sm text-[var(--color-muted)]">{service.note}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5">
        <PriceTag amount={service.priceFrom} />
        <DurationChip minutes={service.durationMins} />
        <Button
          href={bookHref}
          variant="secondary"
          size="md"
          className="ml-auto !min-h-[40px] !px-4 !py-2 text-sm"
        >
          Book →
        </Button>
      </div>
    </SpotlightCard>
  );
}
