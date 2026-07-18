import { cn } from "@/lib/cn";
import type { ServiceTag } from "@/data/services";

/** Neutral pill chip (DESIGN.md §4). */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-smoke)]",
        "px-3 py-1 text-xs font-medium text-[var(--color-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}

const tagCopy: Record<ServiceTag, string> = {
  popular: "Popular",
  new: "New",
  "advised-only": "By advice",
};

/** Fuchsia accent tag for "Popular" / "New" (DESIGN.md §4 — the one spark). */
export function Tag({ tag }: { tag: ServiceTag }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide",
        "border border-[rgba(255,46,136,0.4)] bg-[rgba(255,46,136,0.1)] text-[var(--color-fuchsia)]"
      )}
    >
      {tagCopy[tag]}
    </span>
  );
}
