/** PriceTag — "from $X" starting price in gold (DESIGN.md §2 Price token). */
export function PriceTag({ amount }: { amount: number }) {
  return (
    <span className="font-sans font-bold text-[1.125rem] text-[var(--color-gold)]">
      <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--color-muted)] mr-1 align-middle">
        from
      </span>
      {`$${amount.toLocaleString("en-US")}`}
    </span>
  );
}
