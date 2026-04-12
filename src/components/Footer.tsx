import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative bg-background pt-16 pb-8 px-6 md:px-16 overflow-hidden"
      style={{ borderTop: "1px solid hsla(40, 20%, 95%, 0.06)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row: socials + contact */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { label: "Twitter", path: "M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.15 4.83a4.28 4.28 0 001.32 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.27 4.27 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.06a8.53 8.53 0 01-2.54.7z" },
              { label: "Instagram", path: "M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a.88.88 0 110 1.76.88.88 0 010-1.76z" },
              { label: "YouTube", path: "M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
            ].map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                style={{
                  border: "1px solid hsla(40, 20%, 95%, 0.15)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="hsla(40, 20%, 95%, 0.6)"
                >
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="text-right">
            <p
              className="font-body text-xs uppercase tracking-wider mb-1"
              style={{ color: "hsl(35, 80%, 50%)" }}
            >
              Contact Us
            </p>
            <a
              href="mailto:hello@brewhaus.in"
              className="font-body text-lg font-light transition-colors hover:opacity-80"
              style={{ color: "hsl(var(--foreground))" }}
            >
              hello@brewhaus.in
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16">
          {[
            ["Home", "Our Story", "Menu"],
            ["Brews", "Visit Us", "Brewery"],
          ].flat().map((link, i, arr) => (
            <span key={link} className="flex items-center gap-6">
              <a
                href="#"
                className="font-body text-sm font-light transition-colors hover:opacity-80"
                style={{ color: "hsla(40, 20%, 95%, 0.6)" }}
              >
                {link}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: "hsla(40, 20%, 95%, 0.2)" }}>/</span>
              )}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <span
            className="font-heading italic text-lg"
            style={{ color: "hsla(40, 20%, 95%, 0.6)" }}
          >
            BrewHaus
          </span>
          <p
            className="font-body font-light text-xs"
            style={{ color: "hsla(40, 20%, 95%, 0.3)" }}
          >
            © 2026 BrewHaus Delhi. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant "Queff" text at the bottom */}
      <motion.div
        className="w-full overflow-hidden pointer-events-none select-none"
        style={{ y: textY, opacity: textOpacity }}
      >
        <p
          className="font-heading italic text-center leading-none"
          style={{
            fontSize: "clamp(100px, 18vw, 320px)",
            color: "hsla(40, 20%, 95%, 0.04)",
            letterSpacing: "-0.03em",
            marginBottom: "-0.15em",
          }}
        >
          Queff
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
