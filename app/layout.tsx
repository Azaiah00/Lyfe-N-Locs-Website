import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, manrope, ephesis } from "./fonts";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { baseMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { hairSalonJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${ephesis.variable}`}
    >
      <body>
        {/* HairSalon LocalBusiness JSON-LD (data-driven, matches FACTS.md) */}
        <JsonLd data={hairSalonJsonLd()} />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
