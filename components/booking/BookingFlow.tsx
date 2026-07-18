"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CategoryId, Service } from "@/data/services";
import { services } from "@/data/services";
import type { Slot, ClientDetails, BookingResult } from "@/lib/booking/types";
import { submitBooking } from "@/lib/booking/client";
import { computeDeposit } from "@/lib/booking/config";
import { Stepper, type StepId } from "./Stepper";
import { CategoryStep } from "./steps/CategoryStep";
import { ServiceStep } from "./steps/ServiceStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { DetailsStep } from "./steps/DetailsStep";
import { DepositStep } from "./steps/DepositStep";
import { SuccessStep } from "./steps/SuccessStep";
import { WaitlistStep } from "./steps/WaitlistStep";

const CONSULTATION_ID = "loc-consultation";

/**
 * BookingFlow — the guided, category-first portal (docs/BOOKING-ARCHITECTURE.md).
 * A small client state machine that talks only to the provider via the API
 * client, so the engine (Square default / Stripe stub) stays swappable. Honors
 * an initial ?service= deep-link by jumping straight to date & time.
 */
type Step = StepId | "waitlist";

export function BookingFlow({ initialServiceId }: { initialServiceId?: string }) {
  const reduce = useReducedMotion();
  const initialService = initialServiceId
    ? services.find((s) => s.id === initialServiceId)
    : undefined;

  const [step, setStep] = useState<Step>(initialService ? "datetime" : "category");
  const [categoryId, setCategoryId] = useState<CategoryId | null>(
    initialService?.category ?? null
  );
  const [service, setService] = useState<Service | null>(initialService ?? null);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [client, setClient] = useState<ClientDetails | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const stepperStep: StepId = step === "waitlist" ? "datetime" : step;

  const goConsultation = () => {
    const consult = services.find((s) => s.id === CONSULTATION_ID)!;
    setService(consult);
    setCategoryId(consult.category);
    setAddOnIds([]);
    setStep("datetime");
  };

  const confirmBooking = async () => {
    if (!service || !slot || !client) return;
    setSubmitting(true);
    setError(undefined);
    try {
      const res = await submitBooking({
        serviceId: service.id,
        slotStart: slot.start,
        addOnIds,
        client,
        depositAmount: computeDeposit(service.priceFrom),
      });
      if (!res.ok) {
        setError(res.message || "Something went wrong. Please try again or call the studio.");
        setSubmitting(false);
        return;
      }
      setResult(res);
      setStep("success");
    } catch {
      setError("Network error. Please try again or call the studio.");
    }
    setSubmitting(false);
  };

  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div>
      {step !== "success" && step !== "waitlist" && (
        <div className="mb-10">
          <Stepper current={stepperStep} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={transition}
        >
          {step === "category" && (
            <CategoryStep
              onPick={(id) => {
                setCategoryId(id);
                setStep("service");
              }}
              onConsultation={goConsultation}
            />
          )}

          {step === "service" && categoryId && (
            <ServiceStep
              categoryId={categoryId}
              onBack={() => setStep("category")}
              onConsultation={goConsultation}
              onContinue={(serviceId, addons) => {
                setService(services.find((s) => s.id === serviceId) ?? null);
                setAddOnIds(addons);
                setStep("datetime");
              }}
            />
          )}

          {step === "datetime" && service && (
            <DateTimeStep
              service={service}
              onBack={() => setStep(categoryId ? "service" : "category")}
              onWaitlist={() => setStep("waitlist")}
              onContinue={(s) => {
                setSlot(s);
                setStep("details");
              }}
            />
          )}

          {step === "details" && (
            <DetailsStep
              initial={client ?? undefined}
              onBack={() => setStep("datetime")}
              onContinue={(details) => {
                setClient(details);
                setStep("deposit");
              }}
            />
          )}

          {step === "deposit" && service && slot && client && (
            <DepositStep
              service={service}
              addOnIds={addOnIds}
              slot={slot}
              client={client}
              submitting={submitting}
              error={error}
              onBack={() => setStep("details")}
              onConfirm={confirmBooking}
            />
          )}

          {step === "success" && service && slot && result && client && (
            <SuccessStep service={service} slot={slot} result={result} client={client} />
          )}

          {step === "waitlist" && (
            <WaitlistStep
              service={service ?? undefined}
              onBack={() => setStep("datetime")}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Consultation CTA everywhere (except once we're at consultation/success) */}
      {step !== "success" &&
        step !== "waitlist" &&
        service?.id !== CONSULTATION_ID && (
          <div className="mt-10 border-t border-[var(--color-smoke)] pt-6 text-center">
            <p className="text-sm text-[var(--color-muted)]">
              Not sure this is the right service?{" "}
              <button
                type="button"
                onClick={goConsultation}
                className="font-semibold text-[var(--color-gold)] underline underline-offset-2"
              >
                Book a $25 consultation
              </button>{" "}
              and we&apos;ll plan it together.
            </p>
          </div>
        )}
    </div>
  );
}
