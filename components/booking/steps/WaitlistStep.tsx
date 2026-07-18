"use client";

import { useState } from "react";
import type { Service } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { StepHeading } from "./CategoryStep";
import { cn } from "@/lib/cn";

/**
 * Waitlist capture for full days (extras that beat Square). Collects contact +
 * flexibility; in demo it just confirms. No availability is invented.
 */
export function WaitlistStep({
  service,
  onBack,
}: {
  service?: Service;
  onBack: () => void;
}) {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [contactVal, setContactVal] = useState("");

  if (done) {
    return (
      <div className="text-center">
        <LogoMark className="mx-auto h-12 w-12 opacity-70" />
        <h2 className="mt-6 text-h1">You&apos;re on the list.</h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-muted)]">
          I&apos;ll reach out the moment a spot opens{service ? ` for ${service.name}` : ""}.
          Thanks for your patience — good hair is worth the wait.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim() && contactVal.trim()) setDone(true);
      }}
    >
      <StepHeading
        eyebrow="Waitlist"
        title="Join the waitlist"
        sub={`Full for now${service ? ` — ${service.name}` : ""}. Leave your details and I'll text or email you when a slot opens.`}
      />
      <div className="grid gap-5">
        <label className="block">
          <span className="mb-1.5 block font-sans text-[13px] font-semibold text-[var(--color-ivory)]">
            Full name <span className="text-[var(--color-fuchsia)]">*</span>
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-sans text-[13px] font-semibold text-[var(--color-ivory)]">
            Phone or email <span className="text-[var(--color-fuchsia)]">*</span>
          </span>
          <input
            value={contactVal}
            onChange={(e) => setContactVal(e.target.value)}
            required
            className={field}
          />
        </label>
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" type="button" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit">Join waitlist →</Button>
      </div>
    </form>
  );
}

const field = cn(
  "h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-smoke)] bg-[var(--color-onyx)] px-3.5 text-[var(--color-ivory)]",
  "focus:outline-none focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[rgba(255,46,136,0.3)]"
);
