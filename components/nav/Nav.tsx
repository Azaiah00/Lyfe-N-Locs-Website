"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/nav/Wordmark";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { Button } from "@/components/ui/Button";
import { primaryNav, upsellNav } from "@/data/nav";
import { cn } from "@/lib/cn";

/**
 * Nav — sticky, noir 80% + backdrop-blur, gold hairline bottom border on scroll
 * (DESIGN.md §4). Active route shows a fuchsia underline. Book = primary CTA.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const links = [...primaryNav, ...upsellNav];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        "bg-[rgba(11,11,13,0.8)] backdrop-blur-[12px]",
        scrolled ? "border-b border-[rgba(229,185,78,0.35)]" : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-glam flex h-[72px] items-center justify-between gap-4"
      >
        <Wordmark />

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-[var(--color-ivory)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ivory)]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-fuchsia)] transition-transform duration-200 origin-left",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button href="/book" size="md">
            Book
          </Button>
        </div>

        <MobileMenu links={links} />
      </nav>
    </header>
  );
}
