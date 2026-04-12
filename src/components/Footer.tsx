import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const navRows = [
    ["Home", "Our Story", "Brews"],
    ["Menu", "Visit Us", "Gallery"],
    ["Cyber Hub", "Eros City Square"],
  ];

  return (
    <footer
      ref={footerRef}
      className="relative pt-14 overflow-hidden"
      style={{
        background: "hsl(20, 10%, 3%)",
        borderRadius: "40px 40px 0 0",
        marginTop: "2px",
        boxShadow: "0 -1px 0 hsla(40, 20%, 95%, 0.07), 0 -40px 80px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Row 1: social icons left | contact right */}
        <div className="flex items-start justify-between mb-8">
          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { label: "Twitter", path: "M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.15 4.83a4.28 4.28 0 001.32 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.27 4.27 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.06a8.53 8.53 0 01-2.54.7z" },
              { label: "Instagram", path: "M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a.88.88 0 110 1.76.88.88 0 010-1.76z" },
              { label: "YouTube", path: "M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
            ].map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
                style={{ border: "1px solid hsla(40, 20%, 95%, 0.15)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="hsla(40, 20%, 95%, 0.6)">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
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

        {/* Row 2: nav links with "/" separators — styled exactly like Templyo */}
        <div className="space-y-1.5 mb-16">
          {navRows.map((row, ri) => (
            <div key={ri} className="flex items-center gap-0">
              {row.map((link, li) => (
                <span key={link} className="flex items-center">
                  <a
                    href="#"
                    className="font-body font-light text-sm transition-opacity hover:opacity-80"
                    style={{ color: "hsla(40, 20%, 95%, 0.6)" }}
                  >
                    {link}
                  </a>
                  {li < row.length - 1 && (
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
          ))}
        </div>
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
