import { NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";

/** GET /api/booking/lookup?contact= → { demo, bookings }
 *  Look up bookings by phone or email. Never fabricates real client data. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contact = (searchParams.get("contact") || "").trim();
  if (!contact) {
    return NextResponse.json({ error: "contact required" }, { status: 400 });
  }

  const provider = getBookingProvider();
  const bookings = await provider.lookupBookings(contact);
  return NextResponse.json({ demo: provider.demo, bookings });
}
