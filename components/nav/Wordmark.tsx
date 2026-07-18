import Link from "next/link";
import Image from "next/image";
import { business } from "@/data/facts";
import { cn } from "@/lib/cn";

/**
 * Wordmark — The official Lyfe 'n' Locs logo image.
 */
export function Wordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${business.brand} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/images/logo-transparent.png"
        alt={business.brand}
        width={150}
        height={150}
        className="h-16 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </Link>
  );
}
