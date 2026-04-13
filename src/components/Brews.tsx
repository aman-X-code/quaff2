import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/* ─── Data ───────────────────────────────────────────────────── */
const beers = [
  {
    id: "01",
    name: "Delhi Gold",
    style: "Golden Lager",
    abv: "4.8",
    description:
      "Our flagship. Crisp, clean, and refreshingly light with a honey malt finish.",
    color: "#C8902A",
  },
  {
    id: "02",
    name: "Old Delhi Amber",
    style: "Amber Ale",
    abv: "5.4",
    description:
      "Caramel maltiness meets subtle spice. A nod to the city's rich heritage.",
    color: "#A84232",
  },
  {
    id: "03",
    name: "Haze District",
    style: "Hazy IPA",
    abv: "6.2",
    description:
      "Juicy, tropical, and boldly hopped. For those who like it hazy.",
    color: "#3D8B5E",
  },
  {
    id: "04",
    name: "Midnight Stout",
    style: "Oatmeal Stout",
    abv: "5.8",
    description:
      "Velvety dark with notes of chocolate and roasted coffee. A winter favourite.",
    color: "#4A6A8A",
  },
  {
    id: "05",
    name: "Chandni Wit",
    style: "Belgian Witbier",
    abv: "4.5",
    description:
      "Light and citrusy with coriander and orange peel. Smooth as moonlight.",
    color: "#7A5FA0",
  },
  {
    id: "06",
    name: "Rebel Red",
    style: "Irish Red Ale",
    abv: "5.1",
    description:
      "Toasty, balanced, and dangerously drinkable. Malt-forward with a dry finish.",
    color: "#B03A2E",
  },
];

/* ─── Single Card ────────────────────────────────────────────── */
function BrewCard({
  beer,
  index,
}: {
  beer: (typeof beers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* scroll-driven 3-D entry */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const rawRX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const rawO = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useSpring(rawY, { stiffness: 70, damping: 18 });
  const rotateX = useSpring(rawRX, { stiffness: 70, damping: 18 });

  return (
    <motion.article
      ref={ref}
      style={{
        y,
        rotateX,
        opacity: rawO,
        transformPerspective: 900,
        transformOrigin: "top center",
      }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card shell */}
      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${hovered ? beer.color + "70" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 16,
          transition: "border-color 0.35s ease",
        }}
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: beer.color }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Subtle color wash on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 15% 50%, ${beer.color}12 0%, transparent 65%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Card content */}
        <div className="relative z-10 p-7 flex flex-col h-full">

          {/* Top row: index + style + abv */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[10px] tracking-[0.22em] uppercase font-medium"
              style={{ color: beer.color }}
            >
              {beer.id}
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] tracking-[0.18em] uppercase font-medium opacity-50"
                style={{ color: "hsl(40,20%,95%)" }}
              >
                {beer.style}
              </span>
              <span
                className="w-px h-3 opacity-20"
                style={{ background: "hsl(40,20%,95%)" }}
              />
              <span
                className="text-[10px] tracking-[0.18em] uppercase font-semibold"
                style={{ color: beer.color }}
              >
                {beer.abv}% abv
              </span>
            </div>
          </div>

          {/* Thin separator that slides in */}
          <div className="relative h-px mb-5 overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: beer.color }}
              initial={{ width: 0 }}
              whileInView={{ width: "25%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.08 }}
            />
          </div>

          {/* Large faded index watermark */}
          <div
            className="absolute right-5 top-4 text-[88px] font-heading italic leading-none pointer-events-none select-none"
            style={{
              color: beer.color,
              opacity: hovered ? 0.07 : 0.035,
              transition: "opacity 0.4s ease",
            }}
          >
            {beer.id}
          </div>

          {/* Beer name */}
          <motion.h3
            className="font-heading italic leading-[1.05] mb-3"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
              color: "hsl(40,20%,96%)",
              letterSpacing: "-0.01em",
            }}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {beer.name}
          </motion.h3>

          {/* Description */}
          <p
            className="text-sm font-light leading-relaxed flex-1"
            style={{
              color: "hsl(40,15%,68%)",
              fontFamily: "var(--font-body)",
            }}
          >
            {beer.description}
          </p>

          {/* Bottom: animated underline */}
          <div className="mt-6 relative h-px overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: beer.color, opacity: 0.6 }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ─── Section Header ─────────────────────────────────────────── */
function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto mb-20 px-1">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-8"
      >
        <span
          className="text-[10px] tracking-[0.28em] uppercase font-semibold"
          style={{ color: "#C8902A" }}
        >
          On Tap
        </span>
        <div className="h-px flex-1 max-w-20" style={{ background: "rgba(200,144,42,0.3)" }} />
      </motion.div>

      {/* Main heading with parallax */}
      <motion.div style={{ y }} className="overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading italic tracking-tight leading-[0.88]"
          style={{
            fontSize: "clamp(3.2rem, 7vw, 6rem)",
            color: "hsl(40,20%,95%)",
          }}
        >
          Brewed here.
          <br />
          <span style={{ color: "hsl(40,20%,70%)" }}>Poured fresh.</span>
        </motion.h2>
      </motion.div>

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-8 text-sm font-light leading-relaxed max-w-md"
        style={{ color: "hsl(40,15%,55%)", fontFamily: "var(--font-body)" }}
      >
        Six signature beers brewed in small batches right behind the bar.
        Seasonal specials rotate monthly.
      </motion.p>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function Brews() {
  return (
    <section
      id="brews"
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <Header />

      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ perspective: "1100px" }}
      >
        {beers.map((beer, i) => (
          <BrewCard key={beer.id} beer={beer} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-7xl mx-auto mt-14 text-[10px] tracking-[0.22em] uppercase text-center"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        All beers brewed on-site · Ask your server about today's cask
      </motion.p>
    </section>
  );
}
