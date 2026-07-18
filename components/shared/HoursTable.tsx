import { hours } from "@/data/facts";
import { cn } from "@/lib/cn";

/**
 * HoursTable — verbatim hours from the data layer (FACTS.md), Friday split
 * shown intact. Highlights the "today" row via a data attribute set client-side
 * would risk hydration mismatch, so it stays static and accessible.
 */
export function HoursTable({ className }: { className?: string }) {
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      <caption className="sr-only">Weekly opening hours</caption>
      <tbody>
        {hours.map((d) => {
          const closed = d.ranges.length === 0;
          return (
            <tr key={d.day} className="border-b border-[var(--color-smoke)] last:border-0">
              <th
                scope="row"
                className="py-3 pr-4 text-left font-sans text-base font-semibold text-[var(--color-ivory)]"
              >
                {d.day}
              </th>
              <td
                className={cn(
                  "py-3 text-right text-sm md:text-base",
                  closed ? "text-[var(--color-muted-2)]" : "text-[var(--color-muted)]"
                )}
              >
                {d.display}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
