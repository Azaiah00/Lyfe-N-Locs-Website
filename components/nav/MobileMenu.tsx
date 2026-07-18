"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "@/data/nav";
import { bookingNote } from "@/data/facts";
import { cn } from "@/lib/cn";

/**
 * MobileMenu — hamburger → full-screen noir overlay with big Fraunces links and
 * Book pinned at the bottom (DESIGN.md §4). Locks scroll, traps focus roughly,
 * closes on Escape / route change. Reduced-motion → instant.
 */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the overlay whenever the route changes (navigation is an external
  // event, so this is a legitimate effect-driven state reset).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Lock body scroll + Escape to close while open; restore focus on close.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // move focus into the panel
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-ivory)]"
      >
        <span className="sr-only">Menu</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {/* Portal to <body> so the fixed overlay escapes the nav header's
          backdrop-filter containing block and covers the full viewport. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                ref={panelRef}
                className="fixed inset-0 z-[100] flex flex-col bg-[var(--color-noir)]"
                style={{ backgroundColor: "var(--color-noir)" }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
            <div className="wash-gold pointer-events-none absolute inset-x-0 top-0 h-64" />
            <div className="container-glam relative flex h-[72px] items-center justify-between">
              <span className="font-script text-2xl text-gold-metal">Lyfe &apos;n&apos; Locs</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-ivory)]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="container-glam relative flex flex-1 flex-col justify-center gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block py-3 text-display-l",
                      isActive(link.href) ? "text-gold-metal" : "text-[var(--color-ivory)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="container-glam relative pb-10 pt-4">
              <p className="mb-4 text-caption">{bookingNote}</p>
              <Button href="/book" size="lg" className="w-full">
                Book Now
              </Button>
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
