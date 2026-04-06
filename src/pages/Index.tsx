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

const Index = () => {
  return (
    <div className="bg-background overflow-x-hidden">
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
