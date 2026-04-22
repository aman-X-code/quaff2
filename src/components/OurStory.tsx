import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";

/* ─── Data ───────────────────────────────────────────────────── */
const IMAGES = [
  "https://res.cloudinary.com/dave3np5n/image/upload/v1773117272/IMG_1002_2_q7uepn.jpg",
  "https://res.cloudinary.com/dave3np5n/image/upload/v1773117277/IMG_1015_dq7pav.jpg",
  "https://res.cloudinary.com/dave3np5n/image/upload/v1773117258/IMG_0994_2_qglhlp.jpg",
];

const stats = [
  { value: "4+", label: "House Beers" },
  { value: "2", label: "Taprooms" },
  { value: "#1", label: "Delhi NCR" },
  { value: "∞", label: "Good Times" },
];

const milestones = [
  { year: "Start", label: "Born in Gurgaon", detail: "A simple mission — bring true craft beer to Gurgaon. Built on real craft, exquisite imported ingredients, and a whole lot of love." },
  { year: "Beers", label: "Brewed In-House", detail: "Bold, fresh, and flavorful craft beers brewed on-site. Every batch made with hand-selected ingredients, poured straight from the tank." },
  { year: "Food", label: "Vibrant Food Menu", detail: "Our kitchen pairs perfectly with every pour. A lively food menu designed to complement your craft beer experience." },
  { year: "Today", label: "Most Awarded Brewery", detail: "The most awarded craft brewery in Delhi NCR — two taprooms at Cyber Hub and Eros City Square. Something new on tap, every time." },
];

/* ─── Root ───────────────────────────────────────────────────── */
export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [openMs, setOpenMs] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveImg((i) => (i + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  /* Subtle parallax on the image itself */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgY = useSpring(rawY, { stiffness: 50, damping: 18 });

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

        {/* ── Left: image + floating stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Image slideshow */}
          <div
            ref={imgContainerRef}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            {IMAGES.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt={`Quaff Brewing Co. — scene ${i + 1}`}
                loading="lazy"
                animate={{
                  opacity: i === activeImg ? 1 : 0,
                  scale: i === activeImg ? 1.06 : 1.0,
                }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeInOut" },
                  scale: { duration: 6, ease: "easeInOut" },
                }}
                style={{ y: imgY, top: "-6%", height: "112%" }}
                className="absolute w-full object-cover"
              />
            ))}

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(10,8,6,0.5) 100%)",
              }}
            />

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: i === activeImg ? 20 : 6,
                    height: 6,
                    background: i === activeImg ? "#C8902A" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Stats row — floats below the image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-4 gap-px mt-px"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "0 0 16px 16px",
              overflow: "hidden",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-5 px-2 gap-1"
                style={{ background: "rgba(10,8,6,0.75)", backdropFilter: "blur(8px)" }}
              >
                <span
                  className="font-heading italic leading-none"
                  style={{ fontSize: "1.5rem", color: "#C8902A" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[9px] tracking-widest uppercase text-center font-medium"
                  style={{ color: "hsl(40,15%,45%)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: copy + milestones ── */}
        <div className="flex flex-col">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="text-[10px] tracking-[0.28em] uppercase font-semibold"
              style={{ color: "#C8902A" }}
            >
              Our Story
            </span>
            <div
              className="h-px flex-1 max-w-[3rem]"
              style={{ background: "rgba(200,144,42,0.3)" }}
            />
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-heading italic leading-[0.9]"
              style={{
                fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
                color: "hsl(40,20%,95%)",
                letterSpacing: "-0.02em",
              }}
            >
              Delhi NCR's
              <br />
              <span style={{ color: "hsl(40,20%,62%)" }}>most awarded brew.</span>
            </motion.h2>
          </div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[15px] font-light leading-[1.75] mb-12 max-w-md"
            style={{ color: "hsl(40,12%,56%)", fontFamily: "var(--font-body)" }}
          >
            Quaff Brewing Co. is the most awarded craft brewery in Delhi NCR —
            born out of a passion for great beer and good times. We brew bold,
            fresh, and flavorful craft beers in-house, paired with a vibrant
            food menu and a lively atmosphere. With two taprooms in Gurgaon —
            Cyber Hub and Eros City Square — Quaff is where beer lovers come
            to discover something new on tap, every time.
          </motion.p>

          {/* Milestone accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            {milestones.map((m, i) => {
              const isOpen = openMs === i;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                >
                  {/* Row */}
                  <button
                    onClick={() => setOpenMs(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-4 group text-left"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className="text-[11px] tracking-[0.2em] tabular-nums font-medium transition-colors duration-200"
                        style={{ color: isOpen ? "#C8902A" : "rgba(200,144,42,0.45)" }}
                      >
                        {m.year}
                      </span>
                      <span
                        className="text-sm font-medium transition-colors duration-200"
                        style={{
                          color: isOpen ? "hsl(40,20%,92%)" : "hsl(40,20%,62%)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {m.label}
                      </span>
                    </div>

                    {/* Plus / minus */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-base flex-shrink-0"
                      style={{ color: isOpen ? "#C8902A" : "rgba(200,144,42,0.4)" }}
                    >
                      +
                    </motion.span>
                  </button>

                  {/* Expandable detail */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="text-sm font-light leading-relaxed pl-14 py-3"
                      style={{
                        color: "hsl(40,12%,52%)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {m.detail}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <motion.a
              href="#brews"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="inline-flex items-center gap-3 text-sm font-medium group"
              style={{ color: "hsl(40,20%,78%)", fontFamily: "var(--font-body)" }}
            >
              <motion.span
                className="block h-px"
                style={{ background: "#C8902A", width: 32 }}
                whileHover={{ width: 56 }}
                transition={{ duration: 0.25 }}
              />
              See What's on Tap
              <span style={{ color: "#C8902A" }}>→</span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
