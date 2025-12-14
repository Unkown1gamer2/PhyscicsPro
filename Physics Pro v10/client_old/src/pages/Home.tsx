import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeatureStrip } from "@/components/FeatureStrip";
import { MultiLearnSection } from "@/components/MultiLearnSection";
import { TopicsGrid } from "@/components/TopicsGrid";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeatureStrip />
      <MultiLearnSection />
      <TopicsGrid />
      <Testimonials />
      <Footer />
    </div>
  );
}
