"use client";

import { useState } from "react";
import type { ClientDetails } from "@/lib/booking/types";
import { Button } from "@/components/ui/Button";
import { StepHeading } from "./CategoryStep";
import { cn } from "@/lib/cn";

/**
 * Step 5 — client details (docs/BOOKING-ARCHITECTURE.md). Name, phone, email,
 * loc size/count, notes, optional photo (filename only — the site never uploads
 * card data). Fully keyboard-accessible, labels above fields, fuchsia focus ring.
 */
export function DetailsStep({
  initial,
  onBack,
  onContinue,
}: {
  initial?: ClientDetails;
  onBack: () => void;
  onContinue: (details: ClientDetails) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [locSizeCount, setLocSizeCount] = useState(initial?.locSizeCount ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [photoName, setPhotoName] = useState(initial?.photoName ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!/^[0-9()+\-.\s]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) e.email = "Enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onContinue({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      locSizeCount: locSizeCount.trim() || undefined,
      notes: notes.trim() || undefined,
      photoName: photoName || undefined,
    });
  };

  return (
    <form onSubmit={submit} noValidate>
      <StepHeading
        eyebrow="Step 5"
        title="Your details"
        sub="So I can confirm your appointment and prep for your hair."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name} className="sm:col-span-2">
          <input
            type="text"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field label="Phone" required error={errors.phone}>
          <input
            type="tel"
            value={phone}
            autoComplete="tel"
            inputMode="tel"
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls(!!errors.phone)}
          />
        </Field>

        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={email}
            autoComplete="email"
            inputMode="email"
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls(!!errors.email)}
          />
        </Field>

        <Field
          label="Loc size & count (if you know it)"
          hint="e.g. medium locs, ~120"
          className="sm:col-span-2"
        >
          <input
            type="text"
            value={locSizeCount}
            onChange={(e) => setLocSizeCount(e.target.value)}
            className={inputCls(false)}
          />
        </Field>

        <Field label="Anything I should know?" className="sm:col-span-2">
          <textarea
            value={notes}
            rows={3}
            onChange={(e) => setNotes(e.target.value)}
            className={cn(inputCls(false), "min-h-[96px] resize-y py-3")}
          />
        </Field>

        <Field
          label="Reference photo (optional)"
          hint="Helps me plan your style. Images only."
          className="sm:col-span-2"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
            className="block w-full text-sm text-[var(--color-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[rgba(229,185,78,0.12)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-gold)] hover:file:bg-[rgba(229,185,78,0.2)]"
          />
          {photoName && (
            <p className="mt-1 text-xs text-[var(--color-muted)]">Selected: {photoName}</p>
          )}
        </Field>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={onBack} type="button">
          ← Back
        </Button>
        <Button type="submit">Review &amp; deposit →</Button>
      </div>
    </form>
  );
}

function inputCls(error: boolean): string {
  return cn(
    "h-12 w-full rounded-[var(--radius-sm)] border bg-[var(--color-onyx)] px-3.5 text-[var(--color-ivory)]",
    "placeholder:text-[var(--color-muted-2)] transition-colors",
    "focus:outline-none focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[rgba(255,46,136,0.3)]",
    error ? "border-[var(--color-danger)]" : "border-[var(--color-smoke)]"
  );
}

function Field({
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block font-sans text-[13px] font-semibold text-[var(--color-ivory)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-fuchsia)]">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-[var(--color-muted)]">{hint}</span>}
      {error && (
        <span className="mt-1 block text-xs text-[var(--color-danger)]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
