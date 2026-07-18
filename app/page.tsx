import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { StatBar } from "@/components/home/StatBar";
import { StartHere } from "@/components/home/StartHere";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { PortfolioStrip } from "@/components/home/PortfolioStrip";
import { MeetArtist } from "@/components/home/MeetArtist";
import { Reviews } from "@/components/home/Reviews";
import { HoursLocation } from "@/components/home/HoursLocation";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { BookBand } from "@/components/home/BookBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <StatBar />
      <StartHere />
      <FeaturedCategories />
      <PortfolioStrip />
      <MeetArtist />
      <Reviews />
      <HoursLocation />
      <FaqTeaser />
      <BookBand />
    </>
  );
}
