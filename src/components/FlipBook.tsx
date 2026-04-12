import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "motion/react";

/* ─── Types ─────────────────────────────────────────────── */
export type FlipPage = { node: React.ReactNode; bg?: string };

interface FlipBookProps {
  pages: FlipPage[];
}

/* ─── Constants ─────────────────────────────────────────── */
export const BGL = "hsl(26, 14%, 6%)";
export const BGR = "hsl(26, 12%, 8%)";
export const GOLD = "hsl(35, 80%, 62%)";
export const TEXT = "hsl(40, 20%, 90%)";
export const DIM = "hsla(40, 20%, 95%, 0.38)";

/* ─── Shared Page Primitives ────────────────────────────── */
export const PageShell = ({
  children,
  num,
}: {
  children: React.ReactNode;
  num: number;
}) => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 16px 10px",
        scrollbarWidth: "thin",
        scrollbarColor: "hsla(35,80%,50%,0.3) transparent",
      }}
    >
      {children}
    </div>
    <div
      style={{
        padding: "6px 20px",
        borderTop: "1px solid hsla(40,20%,95%,0.05)",
        textAlign: "center",
      }}
    >
      <span style={{ color: "hsla(40,20%,95%,0.2)", fontSize: 10 }}>{num}</span>
    </div>
  </div>
);

export const SectionTitle = ({
  children,
  sub,
  style,
}: {
  children: React.ReactNode;
  sub?: string;
  style?: React.CSSProperties;
}) => (
  <div style={{ marginBottom: 10, ...style }}>
    <h3
      style={{
        fontStyle: "italic",
        fontSize: "0.9rem",
        color: GOLD,
        lineHeight: 1.2,
        margin: 0,
      }}
    >
      {children}
    </h3>
    {sub && (
      <p style={{ fontSize: 10, color: DIM, marginTop: 2, marginBottom: 0 }}>
        {sub}
      </p>
    )}
    <div
      style={{
        height: 1,
        background: `${GOLD}28`,
        marginTop: 6,
        marginBottom: 8,
      }}
    />
  </div>
);

export const BookItem = ({
  name,
  price,
  desc,
  veg,
}: {
  name: string;
  price: string;
  desc?: string;
  veg?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 6,
      paddingTop: 5,
      paddingBottom: 5,
      borderBottom: "1px solid hsla(40,20%,95%,0.05)",
    }}
  >
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
        {veg && (
          <span
            style={{
              color: "#22c55e",
              fontSize: 9,
              fontWeight: "bold",
              border: "1px solid #22c55e",
              borderRadius: 3,
              padding: "0 2px",
              lineHeight: 1.6,
              flexShrink: 0,
            }}
          >
            V
          </span>
        )}
        <span style={{ fontSize: 12.5, fontWeight: 500, color: TEXT }}>{name}</span>
      </div>
      {desc && (
        <p style={{ fontSize: 10.5, color: DIM, marginTop: 1, marginBottom: 0, lineHeight: 1.35 }}>
          {desc}
        </p>
      )}
    </div>
    <span style={{ fontSize: 11, color: GOLD, whiteSpace: "nowrap", paddingTop: 1 }}>
      ₹{price}
    </span>
  </div>
);

/* ─── ActiveFlip state type ─────────────────────────────── */
type ActiveFlip = {
  direction: "next" | "prev";
  frontNode: React.ReactNode;
  frontBg: string;
  backNode: React.ReactNode;
  backBg: string;
  underNode: React.ReactNode | null;
  underBg: string;
  panelLeft: string;
  transformOrigin: string;
  targetRotate: number;
} | null;

/* ─── NavButton ─────────────────────────────────────────── */
const NavBtn = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) => (
  <motion.button
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "inherit",
      fontSize: 13,
      padding: "10px 20px",
      borderRadius: 99,
      border: "1px solid hsla(40,20%,95%,0.14)",
      color: "hsla(40,20%,95%,0.65)",
      background: "transparent",
      opacity: disabled ? 0.25 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    {children}
  </motion.button>
);

/* ─── Mobile single-page view ───────────────────────────── */
const MobileFlipBook = ({ pages }: { pages: FlipPage[] }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;

  const goNext = () => {
    if (!canNext) return;
    setDirection(1);
    setPageIndex((p) => p + 1);
  };
  const goPrev = () => {
    if (!canPrev) return;
    setDirection(-1);
    setPageIndex((p) => p - 1);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [pageIndex]);

  const current = pages[pageIndex];

  return (
    <div className="select-none">
      {/* Single page */}
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          minHeight: "54vh",
          maxHeight: "54vh",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.85), 0 0 0 1px hsla(40,20%,95%,0.07)",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: current?.bg ?? BGL,
            }}
          >
            {current?.node}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
          gap: 12,
        }}
      >
        <NavBtn onClick={goPrev} disabled={!canPrev}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15,18 9,12 15,6" />
          </svg>
          Prev
        </NavBtn>

        {/* Dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {pages.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                setDirection(i > pageIndex ? 1 : -1);
                setPageIndex(i);
              }}
              style={{
                width: i === pageIndex ? 18 : 5,
                height: 5,
                borderRadius: 99,
                border: "none",
                background: i === pageIndex ? GOLD : "hsla(40,20%,95%,0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <NavBtn onClick={goNext} disabled={!canNext}>
          Next
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9,6 15,12 9,18" />
          </svg>
        </NavBtn>
      </div>

      <p style={{ textAlign: "center", fontFamily: "inherit", fontSize: 11, marginTop: 8, color: "hsla(40,20%,95%,0.22)" }}>
        Page {pageIndex + 1} of {pages.length}
        {"  ·  "}
        <span style={{ color: "hsla(40,20%,95%,0.35)" }}>← → keys to flip</span>
      </p>
    </div>
  );
};

/* ─── Desktop spread view ───────────────────────────────── */
const DesktopFlipBook = ({ pages }: { pages: FlipPage[] }) => {
  const totalSpreads = Math.ceil(pages.length / 2);
  const [spread, setSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [activeFlip, setActiveFlip] = useState<ActiveFlip>(null);
  const controls = useAnimationControls();

  const lp = pages[spread * 2] ?? null;
  const rp = pages[spread * 2 + 1] ?? null;

  const doFlip = useCallback(
    async (direction: "next" | "prev") => {
      if (isFlipping) return;
      const ns = direction === "next" ? spread + 1 : spread - 1;
      if (ns < 0 || ns >= totalSpreads) return;
      setIsFlipping(true);

      let af: NonNullable<ActiveFlip>;
      if (direction === "next") {
        const nl = pages[ns * 2] ?? null;
        const nr = pages[ns * 2 + 1] ?? null;
        af = {
          direction: "next",
          frontNode: rp?.node ?? null,
          frontBg: rp?.bg ?? BGR,
          backNode: nl?.node ?? null,
          backBg: nl?.bg ?? BGL,
          underNode: nr?.node ?? null,
          underBg: nr?.bg ?? BGR,
          panelLeft: "50%",
          transformOrigin: "left center",
          targetRotate: -180,
        };
      } else {
        const pl = pages[ns * 2] ?? null;
        const pr = pages[ns * 2 + 1] ?? null;
        af = {
          direction: "prev",
          frontNode: lp?.node ?? null,
          frontBg: lp?.bg ?? BGL,
          backNode: pr?.node ?? null,
          backBg: pr?.bg ?? BGR,
          underNode: pl?.node ?? null,
          underBg: pl?.bg ?? BGL,
          panelLeft: "0%",
          transformOrigin: "right center",
          targetRotate: 180,
        };
      }

      setActiveFlip(af);
      await new Promise<void>((r) => setTimeout(r, 16));
      await controls.start({
        rotateY: af.targetRotate,
        transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
      });
      setSpread(ns);
      setActiveFlip(null);
      controls.set({ rotateY: 0 });
      setIsFlipping(false);
    },
    [spread, isFlipping, totalSpreads, pages, lp, rp, controls]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") doFlip("next");
      if (e.key === "ArrowLeft") doFlip("prev");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [doFlip]);

  const showLN = activeFlip?.direction === "prev" ? activeFlip.underNode : lp?.node;
  const showLB = activeFlip?.direction === "prev" ? activeFlip.underBg : (lp?.bg ?? BGL);
  const showRN = activeFlip?.direction === "next" ? activeFlip.underNode : rp?.node;
  const showRB = activeFlip?.direction === "next" ? activeFlip.underBg : (rp?.bg ?? BGR);

  const canPrev = !isFlipping && spread > 0;
  const canNext = !isFlipping && spread < totalSpreads - 1;

  return (
    <div className="select-none" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ perspective: "2500px" }}>
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "82vh",
            maxHeight: "82vh",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow:
              "0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px hsla(40,20%,95%,0.06), inset 0 1px 0 hsla(40,20%,95%,0.04)",
          }}
        >
          <div style={{ background: showLB, position: "relative", overflow: "hidden" }}>
            {showLN}
          </div>
          <div style={{ background: showRB, position: "relative", overflow: "hidden", borderLeft: "1px solid hsla(40,20%,95%,0.04)" }}>
            {showRN}
          </div>

          {activeFlip && (
            <motion.div
              animate={controls}
              initial={{ rotateY: 0 }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: activeFlip.panelLeft,
                width: "50%",
                transformOrigin: activeFlip.transformOrigin,
                transformStyle: "preserve-3d",
                zIndex: 10,
              }}
            >
              <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: activeFlip.frontBg, overflow: "hidden" }}>
                {activeFlip.frontNode}
                <div style={{ position: "absolute", inset: 0, background: activeFlip.direction === "next" ? "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 22%)" : "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 22%)", pointerEvents: "none" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", background: activeFlip.backBg, overflow: "hidden" }}>
                {activeFlip.backNode}
                <div style={{ position: "absolute", inset: 0, background: activeFlip.direction === "next" ? "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 22%)" : "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 22%)", pointerEvents: "none" }} />
              </div>
            </motion.div>
          )}

          {/* Spine */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 20, transform: "translateX(-50%)", background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.55) 100%)", zIndex: 20, pointerEvents: "none" }} />
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, gap: 16 }}>
        <NavBtn onClick={() => doFlip("prev")} disabled={!canPrev}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15,18 9,12 15,6" />
          </svg>
          Previous
        </NavBtn>

        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                if (isFlipping || i === spread) return;
                if (Math.abs(i - spread) === 1) doFlip(i > spread ? "next" : "prev");
                else setSpread(i);
              }}
              style={{ width: i === spread ? 22 : 6, height: 6, borderRadius: 99, border: "none", background: i === spread ? GOLD : "hsla(40,20%,95%,0.2)", cursor: isFlipping ? "not-allowed" : "pointer", transition: "all 0.3s ease", padding: 0 }}
            />
          ))}
        </div>

        <NavBtn onClick={() => doFlip("next")} disabled={!canNext}>
          Next
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9,6 15,12 9,18" />
          </svg>
        </NavBtn>
      </div>

      <p style={{ textAlign: "center", fontFamily: "inherit", fontSize: 11, marginTop: 8, color: "hsla(40,20%,95%,0.22)" }}>
        Pages {spread * 2 + 1}–{Math.min(spread * 2 + 2, pages.length)} of {pages.length}
        {"  ·  "}
        <span style={{ color: "hsla(40,20%,95%,0.35)" }}>← → keys to flip</span>
      </p>
    </div>
  );
};

/* ─── FlipBook — responsive wrapper ─────────────────────── */
export const FlipBook = ({ pages }: FlipBookProps) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile
    ? <MobileFlipBook pages={pages} />
    : <DesktopFlipBook pages={pages} />;
};

export default FlipBook;
