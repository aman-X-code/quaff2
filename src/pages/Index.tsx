import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
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
import NavigationIndicator from "@/components/NavigationIndicator";
import AgeGate, { SESSION_KEY } from "@/components/AgeGate";

/* Sections tracked by the nav indicator */
const NAV_SECTIONS = [
  { id: "home",         label: "Home" },
  { id: "our-story",   label: "Our Story" },
  { id: "brews",       label: "Brews" },
  { id: "menu",        label: "Menu" },
  { id: "brewery",     label: "Brewery" },
  { id: "testimonials",label: "Guests" },
  { id: "visit",       label: "Visit" },
];

const Index = ({ section }: { section?: string } = {}) => {
  // Age gate: persist for the browser session
  const [ageVerified, setAgeVerified] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [loaderDone, setLoaderDone] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const scrolledRef = useRef(false);

  /* After loader finishes, scroll to the deep-link section once */
  useEffect(() => {
    if (!loaderDone || !section || scrolledRef.current) return;
    scrolledRef.current = true;
    // Small delay so the page has painted before we scroll
    const t = setTimeout(() => {
      const el = document.getElementById(section);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [loaderDone, section]);

  /* Track which section is most visible */
  useEffect(() => {
    if (!loaderDone) return;

    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((sec, i) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [loaderDone]);

  const handleNavClick = (index: number) => {
    const el = document.getElementById(NAV_SECTIONS[index].id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ── Age verification gate ── */}
      {!ageVerified && (
        <AgeGate onVerified={() => setAgeVerified(true)} />
      )}

      {/* ── Cinematic preloader (only after age verified) ── */}
      {ageVerified && !loaderDone && (
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

      {/* ── Fixed right-side navigation indicator ── */}
      {loaderDone && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
          <NavigationIndicator
            items={NAV_SECTIONS.map((s) => s.label)}
            activeIndex={activeIndex}
            onClick={handleNavClick}
          />
        </motion.div>
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
