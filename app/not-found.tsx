import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="wash-gold pointer-events-none absolute inset-0" />
      <div className="container-glam relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <LogoMark className="h-16 w-16 opacity-70" />
        <p className="mt-8 text-eyebrow text-[var(--color-gold)]">Error 404</p>
        <h1 className="mt-4 text-display-l">This page took a different part.</h1>
        <p className="mt-4 max-w-md text-body-l text-[var(--color-muted)]">
          The page you&apos;re looking for isn&apos;t here — but your next appointment can be.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back Home</Button>
          <Button href="/services" variant="secondary">
            Browse Services
          </Button>
        </div>
      </div>
    </section>
  );
}
