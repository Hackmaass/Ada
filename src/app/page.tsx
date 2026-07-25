import { Component as AdaHeroSection } from "@/components/ui/horizon-hero-section";
import { GalaxyCardsSection } from "@/components/ui/galaxy-cards-section";
import { BrandEndingSection } from "@/components/ui/brand-ending-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="bg-black">
      <AdaHeroSection />
      <GalaxyCardsSection />
      <BrandEndingSection />
      <Footer />
    </main>
  );
}

