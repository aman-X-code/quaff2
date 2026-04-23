import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import StarRating from "./StarRating";

/* ─── Videos ─────────────────────────────────────────────────── */
const videos = [
  {
    src: "https://res.cloudinary.com/dave3np5n/video/upload/v1773117242/MVI_0974_qendlq.mp4",
    label: "The Taproom",
    sub: "Where stories begin",
  },
  {
    src: "https://res.cloudinary.com/dave3np5n/video/upload/v1773117240/MVI_0977_ucddxq.mp4",
    label: "The Brew",
    sub: "Craft, every batch",
  },
  {
    src: "https://res.cloudinary.com/dave3np5n/video/upload/v1773117240/MVI_0983_gevxok.mp4",
    label: "The Pour",
    sub: "Cold and golden",
  },
  {
    src: "https://res.cloudinary.com/dave3np5n/video/upload/v1773117242/MVI_0981_hifcki.mp4",
    label: "The Vibe",
    sub: "Good times, always",
  },
];

const AUTO_INTERVAL = 7000;

/* ─── Hero ───────────────────────────────────────────────────── */
const Hero = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % videos.length;
      });
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden bg-black">

      {/* ── Full-screen video layers ── */}
      {videos.map((v, i) => {
        const rotated = i > 0; // 2nd, 3rd, 4th need -90deg rotation
        return (
          <video
            key={v.src}
            src={v.src}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: rotated ? "50%" : 0,
              left: rotated ? "50%" : 0,
              width: rotated ? "100vh" : "100%",
              height: rotated ? "100vw" : "100%",
              objectFit: "cover",
              transform: rotated
                ? "translate(-50%, -50%) rotate(-90deg)"
                : "none",
              opacity: i === active ? 1 : 0,
              transition: "opacity 1.4s cubic-bezier(0.4,0,0.2,1)",
              zIndex: i === active ? 2 : 1,
            }}
          />
        );
      })}

      {/* Scrim — dark overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,3,2,0.35) 0%, rgba(4,3,2,0.15) 40%, rgba(4,3,2,0.6) 80%, hsl(20 8% 3%) 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,3,2,0.55) 100%)",
        }}
      />

      {/* ── Hero copy ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="section-badge pointer-events-auto"
        >
          Craft Brewery &amp; Kitchen · Gurgaon
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading italic text-5xl md:text-7xl lg:text-[7rem] text-foreground tracking-[-3px] leading-[0.85] max-w-5xl"
        >
          Where Every Pint
          <br />
          <span style={{ color: "hsl(40,20%,70%)" }}>Tells a Story</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="section-subtext mt-6 text-center max-w-md"
        >
          Handcrafted beers brewed in-house, paired with bold flavours and a
          vibe that keeps you coming back.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex gap-4 mt-10 pointer-events-auto"
        >
          <a
            href="#brews"
            className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-body font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Explore Our Brews
          </a>
          <a
            href="#visit"
            className="rounded-full px-8 py-3.5 text-sm font-body font-semibold transition-opacity hover:opacity-85"
            style={{ background: "#C8902A", color: "#0a0602" }}
          >
            Visit Us
          </a>
        </motion.div>

        {/* Rating — top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute top-24 right-8 flex flex-col items-end gap-1.5 pointer-events-none"
        >
          <StarRating rating={5} size={13} />
          <span
            className="text-[10px] font-body font-light tracking-wider"
            style={{ color: "hsla(40,20%,95%,0.3)" }}
          >
            4.9 &nbsp;·&nbsp; 2,400+ reviews
          </span>
        </motion.div>

      </div>

      {/* ── Video switcher strip — bottom centre, outside the flex column so it never clips ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-0 right-0 z-20 flex items-end justify-center gap-3 px-6 pointer-events-auto"
      >
        {videos.map((v, i) => {
          const isActive = i === active;
          return (
            <button
              key={v.src}
              onClick={() => goTo(i)}
              className="group flex flex-col items-start gap-1.5 focus:outline-none"
              aria-label={`Play ${v.label}`}
            >
              {/* Label — fades in when active */}
              <div
                className="text-left transition-all duration-500 overflow-hidden"
                style={{ maxHeight: isActive ? 32 : 0, opacity: isActive ? 1 : 0 }}
              >
                <span
                  className="text-[9px] tracking-[0.24em] uppercase font-semibold block"
                  style={{ color: "#C8902A" }}
                >
                  {v.label}
                </span>
                <span
                  className="text-[8px] tracking-[0.16em] block"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {v.sub}
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: isActive ? 72 : 32,
                  height: 2,
                  background: "rgba(255,255,255,0.15)",
                  transition: "width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "#C8902A" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                    key={`bar-${active}`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 z-20 pointer-events-none"
      >
        <ArrowDown className="text-foreground/25 animate-bounce" size={18} />
      </motion.div>

    </section>
  );
};

export default Hero;
