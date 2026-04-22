import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const zomatoIcon = "https://res.cloudinary.com/dave3np5n/image/upload/v1776888901/unnamed_v7snxv.webp";
const swiggyIcon = "https://res.cloudinary.com/dave3np5n/image/upload/v1776888857/unnamed_g1s7c2.png";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#our-story" },
    { label: "Brews", href: "#brews" },
    { label: "Menu", href: "#menu" },
    { label: "Visit Us", href: "#visit" },
  ];

  const locationLinks = [
    { label: "Cyber Hub", href: "tel:+919654659050" },
    { label: "Eros City Square", href: "tel:+917059800007" },
  ];


  return (
    <footer
      ref={footerRef}
      className="relative pt-14 overflow-hidden"
      style={{
        background: "#000",
        borderRadius: "40px 40px 0 0",
        marginTop: "2px",
        boxShadow: "0 -1px 0 hsla(40, 20%, 95%, 0.07), 0 -40px 80px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Row 1: social icons left | contact right */}
        <div className="flex items-start justify-between mb-8">
          {/* Social + platform icons */}
          <div className="flex gap-3 flex-wrap">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/quaffbrewingco.cyberhub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45)",
                border: "none",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a.88.88 0 110 1.76.88.88 0 010-1.76z" />
              </svg>
            </a>

            {/* Zomato */}
            <a
              href="https://www.zomato.com/ncr/quaff-brewing-co-dlf-cyber-city-gurgaon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zomato"
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all hover:opacity-80"
              style={{ border: "1px solid #E2374444", background: "#E2374415" }}
            >
              <img
                src={zomatoIcon}
                alt="Zomato"
                className="w-full h-full object-contain"
              />
            </a>

            {/* Swiggy */}
            <a
              href="https://www.swiggy.com/restaurants/quaff-brewing-co-dlf-cyber-city-gurgaon-1108301/dineout"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Swiggy Dineout"
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all hover:opacity-80"
              style={{ border: "1px solid #FC801944", background: "#FC801915" }}
            >
              <img
                src={swiggyIcon}
                alt="Swiggy"
                className="w-full h-full object-contain"
              />
            </a>
          </div>


          {/* Contact */}
          <div className="text-right">
            <p
              className="font-body text-xs uppercase tracking-widest mb-1.5"
              style={{ color: "hsla(40, 20%, 95%, 0.4)" }}
            >
              Contact Us
            </p>
            <a
              href="mailto:Quaff@vegahospitality.co.in"
              className="font-body font-light text-base transition-opacity hover:opacity-80"
              style={{ color: "hsl(35, 80%, 55%)" }}
            >
              Quaff@vegahospitality.co.in
            </a>
          </div>
        </div>

        {/* Nav links row */}
        <div className="flex flex-wrap items-center gap-x-0 gap-y-1.5 mb-3">
          {navLinks.map((link, li) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                className="font-body font-light text-sm transition-opacity hover:opacity-80"
                style={{ color: "hsla(40, 20%, 95%, 0.6)" }}
              >
                {link.label}
              </a>
              {li < navLinks.length - 1 && (
                <span
                  className="mx-3 font-body font-light text-sm"
                  style={{ color: "hsla(40, 20%, 95%, 0.2)" }}
                >
                  /
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Location phone links */}
        <div className="flex flex-wrap items-center gap-x-0 gap-y-1.5 mb-16">
          {locationLinks.map((loc, li) => (
            <span key={loc.label} className="flex items-center">
              <a
                href={loc.href}
                className="font-body font-light text-sm transition-opacity hover:opacity-80"
                style={{ color: "hsla(40, 20%, 95%, 0.35)" }}
              >
                {loc.label}
              </a>
              {li < locationLinks.length - 1 && (
                <span
                  className="mx-3 font-body font-light text-sm"
                  style={{ color: "hsla(40, 20%, 95%, 0.15)" }}
                >
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      </div>


      {/* Vega Hospitality attribution */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-6 flex items-center justify-center">
        <p
          className="font-body text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "hsla(40, 20%, 95%, 0.22)" }}
        >
          A Vega Hospitality venture
        </p>
      </div>

      {/* Giant "Quaff" watermark — flush to bottom like Templyo */}
      <motion.div
        className="w-full overflow-hidden pointer-events-none select-none"
        style={{ y: textY }}
      >
        <p
          className="font-heading italic text-center leading-none"
          style={{
            fontSize: "clamp(100px, 22vw, 400px)",
            color: "hsla(40, 20%, 95%, 0.12)",
            letterSpacing: "-0.03em",
            marginBottom: "-0.12em",
          }}
        >
          Quaff
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
