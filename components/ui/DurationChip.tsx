import { formatDuration } from "@/data/services";
import { Chip } from "@/components/ui/Chip";

/** DurationChip — clock icon + duration (DESIGN.md §4). */
export function DurationChip({ minutes }: { minutes: number }) {
  return (
    <Chip>
      <ClockIcon />
      <span>{formatDuration(minutes)}</span>
    </Chip>
  );
}

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
