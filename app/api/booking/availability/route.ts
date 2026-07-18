import { NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";
import { AVAILABILITY_WINDOW_DAYS } from "@/lib/booking/config";

/** GET /api/booking/availability?serviceId=&from=&to= → { demo, slots } */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");
  if (!serviceId) {
    return NextResponse.json({ error: "serviceId required" }, { status: 400 });
  }

  // Default window: tomorrow → +N days (never offer same-day/past — honest hours).
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  const end = new Date(start);
  end.setDate(end.getDate() + (AVAILABILITY_WINDOW_DAYS - 1));

  const pad = (n: number) => n.toString().padStart(2, "0");
  const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const from = searchParams.get("from") || iso(start);
  const to = searchParams.get("to") || iso(end);

  const provider = getBookingProvider();
  const slots = await provider.getAvailability(serviceId, { from, to });

  return NextResponse.json({ demo: provider.demo, slots });
}
