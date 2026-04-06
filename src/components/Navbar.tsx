import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Home", "Our Story", "Brews", "Menu", "Visit"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s/g, "-"));
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading italic text-2xl text-foreground tracking-tight relative z-50">
            BrewHaus
          </span>

          <button
            className="relative z-50 w-11 h-11 flex items-center justify-center rounded-full liquid-glass"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center">
              <motion.span
                className="block w-5 h-[2px] bg-foreground rounded-full origin-center"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-foreground rounded-full"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-foreground rounded-full origin-center"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center"
          >
            {/* Decorative subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <nav className="relative z-10 flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.45,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  onClick={() => scrollTo(link)}
                  className="text-4xl md:text-5xl font-heading italic text-foreground tracking-tight py-3 hover:text-primary transition-colors duration-300"
                >
                  {link}
                </motion.button>
              ))}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
