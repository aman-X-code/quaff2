import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/* ─── Data ───────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Hands down the best brewpub in Gurgaon — the craft ales here are absolutely unreal.",
    author: "Arjun Mehta",
    role: "Regular Guest",
    company: "Quaff Cyber Hub",
  },
  {
    quote:
      "The Midnight Velvet Stout paired with lamb chops is a match made in heaven.",
    author: "Priya Sharma",
    role: "Food Blogger",
    company: "Quaff Eros City",
  },
  {
    quote:
      "Five courses, each paired with a unique brew — an experience you simply don't forget.",
    author: "Rohit Kapoor",
    role: "Beer Enthusiast",
    company: "Brewmaster's Table",
  },
  {
    quote:
      "Live jazz, cold pints, truffle fries — Quaff has set the bar incredibly high.",
    author: "Sneha Reddy",
    role: "Music Lover",
    company: "Friday Nights at Quaff",
  },
];

/* ─── Testimonials ───────────────────────────────────────── */
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const goNext = () =>
    setActiveIndex((p) => (p + 1) % testimonials.length);
  const goPrev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[activeIndex];
  const GOLD = "hsl(35, 80%, 62%)";
  const GOLD_FAINT = "rgba(200,151,62,0.15)";

  return (
    <section id="testimonials" style={{ padding: "4rem 0 0" }} className="overflow-hidden">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: '2rem 2rem 0',
        }}
      >
        {/* ── Section label above ── */}
        <div className="text-center mb-16">
          <span className="section-badge">What Guests Say</span>
          <h2 className="section-heading">
            Stories from our tables,<br />brewed with pride.
          </h2>
        </div>

        {/* ── Oversized index number (parallax) ── */}
        <motion.div
          style={{
            position: "absolute",
            left: "-1rem",
            top: "50%",
            translateY: "-50%",
            fontSize: "clamp(14rem, 22vw, 24rem)",
            fontWeight: 700,
            color: "rgba(200,151,62,0.04)",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            x: numberX,
            y: numberY,
            fontFamily: "inherit",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block" }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* ── Main content row ── */}
        <div style={{ position: "relative", display: "flex" }}>

          {/* Left column — vertical label + progress bar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "3rem",
              borderRight: `1px solid ${GOLD_FAINT}`,
              flexShrink: 0,
            }}
          >
            <motion.span
              style={{
                fontSize: "0.7rem",
                color: GOLD,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontFamily: "inherit",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.span>

            {/* Vertical progress line */}
            <div
              style={{
                position: "relative",
                height: 120,
                width: 1,
                background: GOLD_FAINT,
                marginTop: "2rem",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  background: GOLD,
                  transformOrigin: "top",
                }}
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Right — quote content */}
          <div
            style={{
              flex: 1,
              paddingLeft: "3rem",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: "2rem" }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.75rem",
                    fontFamily: "inherit",
                    color: "hsla(40,20%,95%,0.55)",
                    border: "1px solid rgba(200,151,62,0.2)",
                    borderRadius: 9999,
                    padding: "4px 14px",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: GOLD,
                      flexShrink: 0,
                    }}
                  />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote — word-by-word reveal */}
            <div
              style={{
                position: "relative",
                marginBottom: "3rem",
                minHeight: 140,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`q-${activeIndex}`}
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "hsl(40,20%,92%)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    fontFamily: "inherit",
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      style={{ display: "inline-block", marginRight: "0.3em" }}
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row + nav buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <motion.div
                    style={{ width: 32, height: 1, background: GOLD }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "inherit",
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "hsl(40,20%,92%)",
                        margin: 0,
                      }}
                    >
                      {current.author}
                    </p>
                    <p
                      style={{
                        fontFamily: "inherit",
                        fontSize: "0.85rem",
                        color: "hsla(40,20%,95%,0.45)",
                        margin: 0,
                        marginTop: 2,
                      }}
                    >
                      {current.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {[
                  { fn: goPrev, d: "M10 12L6 8L10 4" },
                  { fn: goNext, d: "M6 4L10 8L6 12" },
                ].map(({ fn, d }, i) => (
                  <motion.button
                    key={i}
                    onClick={fn}
                    whileHover={{
                      background: "rgba(200,151,62,0.1)",
                      borderColor: GOLD,
                    }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(200,151,62,0.25)",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "hsl(40,20%,85%)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d={d}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom scrolling ticker ── */}
        <div
          style={{
            position: "absolute",
            bottom: "-1rem",
            left: 0,
            right: 0,
            overflow: "hidden",
            opacity: 0.06,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: GOLD,
              fontFamily: "inherit",
            }}
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} style={{ margin: "0 2rem" }}>
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
