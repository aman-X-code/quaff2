import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Our Story", "Brews", "Menu", "Visit"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s/g, "-"));
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "liquid-glass-strong" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-heading italic text-2xl text-foreground tracking-tight">
          BrewHaus
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-4 py-2 text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("visit")}
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Reserve a Table
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden liquid-glass-strong px-6 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="py-3 text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors text-left border-b border-foreground/5"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("visit")}
            className="mt-2 px-5 py-3 bg-primary text-primary-foreground rounded-full text-sm font-body font-semibold"
          >
            Reserve a Table
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
