import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import StarRating from "./StarRating";

const heroImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117249/IMG_0970_2_h11ttp.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="BrewHaus craft brewery bar interior"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/60" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px]"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(20 10% 5%))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-badge"
        >
          Craft Brewery & Kitchen · DLF Cyber Hub, Gurgaon
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] text-foreground tracking-[-3px] leading-[0.85] max-w-4xl"
        >
          Where Every Pint
          <br />
          Tells a Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="section-subtext mt-6 text-center max-w-lg"
        >
          Handcrafted beers brewed in-house. Chef-curated gourmet food. The finest
          brewpub experience in Gurgaon's DLF Cyber Hub.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex gap-4 mt-10"
        >
          <a
            href="#brews"
            className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-body font-medium text-foreground hover:bg-foreground/5 transition-colors"
          >
            Explore Our Brews
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8"
        >
          <ArrowDown className="text-foreground/40 animate-bounce" size={20} />
        </motion.div>

        {/* Star rating — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 right-8 flex flex-col items-end gap-2"
        >
          <StarRating rating={5} size={15} />
          <span
            className="text-[11px] font-body font-light tracking-wider"
            style={{ color: "hsla(40,20%,95%,0.4)" }}
          >
            4.9 &nbsp;·&nbsp; 2,400+ reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
