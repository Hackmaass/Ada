import { Component as AdaHeroSection } from "@/components/ui/horizon-hero-section";
import { GalaxyCardsSection } from "@/components/ui/galaxy-cards-section";
import { BrandEndingSection } from "@/components/ui/brand-ending-section";

export default function Home() {
  return (
    <main className="bg-black">
      <AdaHeroSection />
      <GalaxyCardsSection />
      <BrandEndingSection />
    </main>
  );
}

