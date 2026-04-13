import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";

/* ─── Data ───────────────────────────────────────────────────── */
const IMG =
  "https://res.cloudinary.com/dave3np5n/image/upload/v1773117272/IMG_1002_2_q7uepn.jpg";

const stats = [
  { value: "6+", label: "House Beers" },
  { value: "2", label: "Locations" },
  { value: "3×", label: "Best Brewery" },
  { value: "50k+", label: "Pints Poured" },
];

const milestones = [
  { year: "2018", label: "Founded in Gurgaon", detail: "Two friends, one simple dream — bring world-class craft beer to Delhi NCR." },
  { year: "2019", label: "Six Beers on Tap", detail: "Our core lineup launched. Lines out the door from opening night." },
  { year: "2021", label: "Eros City Opens", detail: "Second location, same obsessive attention to every pour." },
  { year: "2023", label: "Best Brewery Award", detail: "Voted India's Best Craft Microbrewery for the third consecutive year." },
];

/* ─── Root ───────────────────────────────────────────────────── */
export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [openMs, setOpenMs] = useState<number | null>(null);

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
          {/* Image wrapper — subtle inset border */}
          <div
            ref={imgContainerRef}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            <motion.img
              src={IMG}
              alt="Quaff Brewing Co. interior"
              style={{ y: imgY, top: "-6%", height: "112%" }}
              className="absolute w-full object-cover"
              loading="lazy"
            />
            {/* Very subtle dark vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(10,8,6,0.45) 100%)",
              }}
            />
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
              Born from a love
              <br />
              <span style={{ color: "hsl(40,20%,62%)" }}>of great beer.</span>
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
            Quaff started with a simple obsession — beer worth caring about.
            Every batch is brewed on-site with hand-selected ingredients.
            This isn't just a bar. It's where Gurgaon comes to celebrate.
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
