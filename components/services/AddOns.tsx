import { addOns } from "@/data/services";

/** AddOns — small add-on fee note, not headline services (docs/SERVICES.md). */
export function AddOns() {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] p-6 hairline-top">
      <h3 className="text-eyebrow text-[var(--color-gold)]">Add-Ons</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {addOns.map((a) => (
          <li
            key={a.label}
            className="flex items-center justify-between gap-4 border-b border-[var(--color-smoke)] pb-3 text-sm last:border-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-0"
          >
            <span className="text-[var(--color-muted)]">{a.label}</span>
            <span className="font-semibold text-[var(--color-gold)]">{a.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
