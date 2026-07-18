import { cn } from "@/lib/cn";

export type StepId = "category" | "service" | "datetime" | "details" | "deposit" | "success";

export const STEP_ORDER: StepId[] = [
  "category",
  "service",
  "datetime",
  "details",
  "deposit",
  "success",
];

const LABELS: Record<StepId, string> = {
  category: "Category",
  service: "Service",
  datetime: "Date & time",
  details: "Your details",
  deposit: "Deposit",
  success: "Confirmed",
};

/** Stepper — glam progress indicator. Gold gradient fill on completed steps,
 *  fuchsia dot on the current step. Accessible via aria. */
export function Stepper({ current }: { current: StepId }) {
  const currentIndex = STEP_ORDER.indexOf(current);

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center gap-1.5">
        {STEP_ORDER.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={step} className="flex flex-1 flex-col gap-2">
              <span
                className={cn(
                  "h-1 w-full rounded-full transition-colors duration-300",
                  done && "bg-grad-gold",
                  active && "bg-[var(--color-fuchsia)]",
                  !done && !active && "bg-[var(--color-smoke)]"
                )}
              />
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "hidden text-[0.7rem] font-semibold uppercase tracking-wider sm:block",
                  active ? "text-[var(--color-ivory)]" : "text-[var(--color-muted-2)]"
                )}
              >
                {LABELS[step]}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-caption sm:hidden">
        Step {Math.min(currentIndex + 1, STEP_ORDER.length)} of {STEP_ORDER.length} —{" "}
        {LABELS[current]}
      </p>
    </nav>
  );
}
