/**
 * Confirm — renders an unverified value as a VISIBLE 【CONFIRM】 token.
 * Per CLAUDE.md rule #3: unknowns must never render as invented content.
 * Every token maps to docs/CONFIRM.md.
 */
export function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <span className="confirm-token" role="mark" aria-label="Pending owner confirmation">
      【CONFIRM: {children}】
    </span>
  );
}
