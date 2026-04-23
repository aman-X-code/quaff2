import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

const hefeImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1776884084/hefeweizen_vumkw7.jpg";
const blondeImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1776885210/Blonde_ale_gvdaeb.jpg";
const ipaImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1776885040/IPA_xdhmyn.jpg";
const dubbelImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1776884083/Dubbel_zkri6z.jpg";

/* ─── Data ───────────────────────────────────────────────────── */
const beers = [
  {
    id: "01",
    name: "Hefeweizen",
    style: "German Wheat Beer",
    abv: "4.8",
    description:
      "Hazy, smooth, and refreshingly light. Notes of banana and clove with a soft, creamy finish. The perfect starting point for anyone new to craft beer.",
    color: "#D4A847",
    img: hefeImg,
  },
  {
    id: "02",
    name: "Blonde Ale",
    style: "Session Blonde",
    abv: "4.5",
    description:
      "Easy-drinking and crisp with a clean malt backbone. Subtle hints of honey and light fruit make this one dangerously sessionable.",
    color: "#C8902A",
    img: blondeImg,
  },
  {
    id: "03",
    name: "IPA",
    style: "India Pale Ale",
    abv: "6.5",
    description:
      "Bold, hoppy, and unapologetic. Citrus and pine on the nose with a solid bitter kick that lingers. Built for those who like their beer with attitude.",
    color: "#E07840",
    img: ipaImg,
  },
  {
    id: "04",
    name: "Dubbel",
    style: "Belgian-Style Ale",
    abv: "7.0",
    description:
      "Rich caramel and dark fruit — raisins, plum, and a touch of spice. Complex but smooth, a slow sipper for the adventurous palate.",
    color: "#8B4A2F",
    img: dubbelImg,
  },
];

/* ─── Card ───────────────────────────────────────────────────── */
function BrewCard({
  beer,
  index,
}: {
  beer: (typeof beers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Magnetic 3-D tilt ── */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 380,
    damping: 36,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 380,
    damping: 36,
  });

  /* ── Cursor-tracking radial shine ── */
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  /* ABV fill: map 0–10% ABV → 0–100% bar width */
  const abvFill = `${(parseFloat(beer.abv) / 10) * 100}%`;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: "1000px", willChange: "transform" }}
      className="w-full"
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.article
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderRadius: 14,
          aspectRatio: "3 / 4",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* ── 1. Image ── */}
        <motion.img
          src={beer.img}
          alt={`${beer.name} — Quaff Brewing`}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          animate={{
            scale: hovered ? 1.07 : 1,
            filter: hovered
              ? "brightness(0.7) saturate(1.15)"
              : "brightness(0.8) saturate(1.05)",
          }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* ── 2. Permanent bottom gradient ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,3,1,0.96) 0%, rgba(5,3,1,0.45) 42%, transparent 72%)",
            pointerEvents: "none",
          }}
        />

        {/* ── 3. Colored tint bloom on hover ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 110%, ${beer.color}30 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.55 }}
        />

        {/* ── 4. Cursor-tracking gloss ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.09) 0%, transparent 52%)`,
            pointerEvents: "none",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* ── 5. Border glow ring ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            pointerEvents: "none",
          }}
          animate={{
            boxShadow: hovered
              ? `inset 0 0 0 1px ${beer.color}70, 0 28px 60px rgba(0,0,0,0.7)`
              : `inset 0 0 0 1px rgba(255,255,255,0.09)`,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* ── 6. Ghost number watermark ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 10,
            right: 14,
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontSize: "6rem",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
          animate={{
            color: hovered ? `${beer.color}12` : "rgba(255,255,255,0.07)",
            y: hovered ? -8 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {beer.id}
        </motion.div>

        {/* ── 7. Shimmer sweep on hover ── */}
        {hovered && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
            }}
            initial={{ x: "-120%" }}
            animate={{ x: "160%" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        )}

        {/* ── 8. Bottom content overlay ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 18px 18px",
          }}
        >
          {/* Style pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + index * 0.09, duration: 0.45 }}
            style={{ marginBottom: 10 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 99,
                background: beer.color + "22",
                border: `1px solid ${beer.color}44`,
                color: beer.color,
              }}
            >
              {beer.style}
            </span>
          </motion.div>

          {/* Name + ABV row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <motion.h3
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "1.5rem",
                color: "hsl(40,20%,97%)",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                margin: 0,
              }}
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {beer.name}
            </motion.h3>

            <motion.span
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: beer.color,
                fontWeight: 700,
                flexShrink: 0,
                fontFamily: "var(--font-body)",
              }}
              animate={{ opacity: hovered ? 1 : 0.55, y: hovered ? 0 : 3 }}
              transition={{ duration: 0.3 }}
            >
              {beer.abv}% abv
            </motion.span>
          </div>

          {/* Description — slides up on hover */}
          <motion.div
            animate={{
              height: hovered ? "auto" : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 11.5,
                fontWeight: 300,
                lineHeight: 1.62,
                color: "hsl(40,12%,66%)",
                fontFamily: "var(--font-body)",
                margin: "10px 0 0",
              }}
            >
              {beer.description}
            </p>
          </motion.div>

          {/* ABV fill bar */}
          <div
            style={{
              marginTop: 14,
              height: 1,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ height: "100%", background: beer.color, borderRadius: 99 }}
              initial={{ width: "0%" }}
              animate={{ width: hovered ? abvFill : "0%" }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ─── Section Header ─────────────────────────────────────────── */
function Header() {
  return (
    <div className="max-w-6xl mx-auto mb-14 px-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="flex items-center gap-4 mb-7"
      >
        <span
          className="text-[10px] tracking-[0.28em] uppercase font-semibold"
          style={{ color: "#C8902A" }}
        >
          On Tap
        </span>
        <div
          className="h-px flex-1 max-w-16"
          style={{ background: "rgba(200,144,42,0.3)" }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading italic tracking-tight leading-[0.9]"
        style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "hsl(40,20%,95%)" }}
      >
        Brewed here.
        <br />
        <span style={{ color: "hsl(40,20%,68%)" }}>Poured fresh.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-sm font-light leading-relaxed max-w-sm"
        style={{ color: "hsl(40,14%,50%)", fontFamily: "var(--font-body)" }}
      >
        Four signature beers brewed in small batches right behind the bar.
        Hover a card to explore.
      </motion.p>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function Brews() {
  return (
    <section
      id="brews"
      className="py-24 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <Header />

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {beers.map((beer, i) => (
          <BrewCard key={beer.id} beer={beer} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-6xl mx-auto mt-10 text-[9px] tracking-[0.22em] uppercase text-center"
        style={{ color: "rgba(255,255,255,0.16)" }}
      >
        All beers brewed on-site · Ask your server about today's seasonal special
      </motion.p>
    </section>
  );
}
