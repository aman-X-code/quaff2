import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "motion/react";

/* ─── Assets ─────────────────────────────────────────────── */
const breweryImg =
  "https://res.cloudinary.com/dave3np5n/image/upload/v1773117270/IMG_0998_h1zegt.jpg";

/* ─── Stats data ─────────────────────────────────────────── */
const stats = [
  { value: 12, suffix: "+", label: "Craft Brews", sub: "Brewed in-house" },
  { value: 2000, suffix: "+", label: "Happy Guests", sub: "Every month" },
  { value: 2,   suffix: "",  label: "Locations",   sub: "Cyber Hub & Eros City" },
  { value: 6,   suffix: "×", label: "Best Brewery", sub: "Award-winning" },
];

/* ─── Awards marquee data ─────────────────────────────────── */
const awards = [
  "Best Microbrewery — Times Food Awards",
  "Top Craft Beer Destination — Condé Nast Traveller",
  "Brewer of the Year — India Beer Cup",
  "Best Bar Experience — Hindustan Times",
  "6× Consecutive Award Winner",
];

/* ─── Counter hook ───────────────────────────────────────── */
const useCounter = (target: number, duration = 1.8) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
};

/* ─── Single stat card ───────────────────────────────────── */
const StatCard = ({
  value,
  suffix,
  label,
  sub,
  delay,
}: (typeof stats)[0] & { delay: number }) => {
  const { count, ref } = useCounter(value, 1.6);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [6, -6]), { stiffness: 300, damping: 25 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const GOLD = "hsl(35,80%,62%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          borderRadius: 24,
          padding: "32px 28px",
          background: "hsla(40,20%,95%,0.035)",
          backdropFilter: "blur(16px)",
          border: "1px solid hsla(40,20%,95%,0.08)",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
        whileHover={{
          background: "hsla(40,20%,95%,0.06)",
          borderColor: "hsla(35,80%,62%,0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px hsla(35,80%,62%,0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer beam on hover */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background: "linear-gradient(to right, transparent, hsla(40,20%,95%,0.06), transparent)",
            pointerEvents: "none",
          }}
          whileHover={{ left: "150%" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: delay + 0.3 }}
          style={{
            height: 2,
            background: `linear-gradient(to right, ${GOLD}, transparent)`,
            transformOrigin: "left",
            marginBottom: 20,
            borderRadius: 99,
          }}
        />

        {/* Animated number */}
        <div
          style={{
            fontStyle: "italic",
            fontSize: "clamp(2.8rem,5vw,4rem)",
            fontWeight: 700,
            color: "hsl(40,20%,94%)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          <span ref={ref}>
            {value >= 1000 ? `${Math.floor(count / 1000)}K` : count}
          </span>
          <span style={{ color: GOLD }}>{suffix}</span>
        </div>

        {/* Label */}
        <p
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "hsl(40,20%,88%)",
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: 11, color: "hsla(40,20%,95%,0.38)" }}>{sub}</p>
      </motion.div>
    </motion.div>
  );
};

/* ─── Marquee ticker ─────────────────────────────────────── */
const Marquee = () => (
  <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
    <motion.div
      style={{ display: "flex", whiteSpace: "nowrap", gap: "3rem" }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      {[...awards, ...awards].map((a, i) => (
        <span
          key={i}
          style={{
            fontSize: 12,
            color: "hsla(40,20%,95%,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {a}
          <span style={{ color: "hsl(35,80%,62%)", fontSize: 14 }}>✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─── Main section ───────────────────────────────────────── */
const BrewerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: image moves slower than scroll */
  const rawY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgY = useSpring(rawY, { stiffness: 60, damping: 18 });

  /* Fade vignette based on scroll */
  const brightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.35, 0.35, 0.2]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", padding: "6rem 0", overflow: "hidden" }}
    >
      {/* ── Parallax background ── */}
      <motion.img
        src={breweryImg}
        alt="Quaff brewery interior"
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "115%",
          objectFit: "cover",
          top: "-7.5%",
          y: imgY,
          filter: "saturate(0.45)",
          brightness,
        }}
      />

      {/* Top & bottom fades */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to bottom, hsl(20 10% 5%), transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to top, hsl(20 10% 5%), transparent)", zIndex: 1 }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-badge">By the Numbers</span>
          <h2 className="section-heading" style={{ marginTop: 12 }}>
            Six years of craft,<br />counted in every pint.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.12} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, hsla(40,20%,95%,0.12), transparent)",
            marginBottom: 32,
            transformOrigin: "center",
          }}
        />

        {/* Awards marquee */}
        <Marquee />
      </div>
    </section>
  );
};

export default BrewerySection;
