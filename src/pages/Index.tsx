import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Brews from "@/components/Brews";
import MenuSection from "@/components/MenuSection";
import BrewerySection from "@/components/BrewerySection";
import Testimonials from "@/components/Testimonials";
import BurpText from "@/components/BurpText";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import RevealLoader from "@/components/RevealLoader";

const Index = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ── Cinematic preloader ── */}
      {!loaderDone && (
        <RevealLoader
          text="QUAFF"
          bgColors={["hsl(26, 14%, 4%)", "hsl(26, 22%, 9%)"]}
          angle={135}
          staggerOrder="center-out"
          movementDirection="top-down"
          textFadeDelay={0.55}
          onComplete={() => setLoaderDone(true)}
        />
      )}

      {/* ── Page content ── */}
      <Navbar />
      <Hero />
      <OurStory />
      <Brews />
      <MenuSection />
      <BrewerySection />
      <Testimonials />
      <BurpText />
      <VisitSection />
      <Footer />
    </div>
  );
};

export default Index;
