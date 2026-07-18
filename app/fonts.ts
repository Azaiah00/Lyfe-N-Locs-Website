import { Fraunces, Manrope, Ephesis } from "next/font/google";

// Display / headlines — high-contrast glam serif with optical sizing.
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  // Variable font: weight axis is included by default; opsz gives large sizes
  // the high-contrast "expensive" look (DESIGN.md §2). No explicit weight array
  // is allowed alongside `axes`.
  axes: ["opsz"],
  variable: "--font-fraunces",
  preload: true, // only the display face is preloaded (DESIGN.md §7)
});

// UI / body / labels — clean geometric sans.
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  preload: false,
});

// Signature script accent — tiny use only.
export const ephesis = Ephesis({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-ephesis",
  preload: false,
});
