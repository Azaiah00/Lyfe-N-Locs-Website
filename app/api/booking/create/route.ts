import { NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";
import { computeDeposit } from "@/lib/booking/config";
import { services } from "@/data/services";
import type { BookingInput } from "@/lib/booking/types";

/** POST /api/booking/create → BookingResult. Body = BookingInput.
 *  The site never receives card data — the result carries a hosted-checkout URL. */
export async function POST(request: Request) {
  let body: Partial<BookingInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { serviceId, slotStart, addOnIds = [], client } = body;
  const service = serviceId ? services.find((s) => s.id === serviceId) : undefined;

  if (!service || !slotStart || !client?.name || !client?.phone || !client?.email) {
    return NextResponse.json(
      { ok: false, error: "Missing required booking fields." },
      { status: 400 }
    );
  }

  const provider = getBookingProvider();
  const result = await provider.createBooking({
    serviceId: service.id,
    slotStart,
    addOnIds,
    client,
    depositAmount: computeDeposit(service.priceFrom),
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
