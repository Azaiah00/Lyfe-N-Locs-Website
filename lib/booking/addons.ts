import { addOns } from "@/data/services";

/** Add-ons with stable ids for the booking flow (docs/SERVICES.md). Pricing is
 *  display-only and confirmed in the chair — never presented as a final total. */
export const ADDON_LIST = addOns.map((a, i) => ({ id: `addon-${i}`, ...a }));

export function addOnLabel(id: string): string | undefined {
  return ADDON_LIST.find((a) => a.id === id)?.label;
}
