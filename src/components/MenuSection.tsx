import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BarMenuBook from "./BarMenuBook";
import FoodMenuBook from "./FoodMenuBook";

type MenuMode = "bar" | "food";

const MODES: { key: MenuMode; icon: string; label: string; sub: string }[] = [
  { key: "bar", icon: "🍸", label: "Bar Menu", sub: "Drinks & Cocktails" },
  { key: "food", icon: "🍽️", label: "Food Menu", sub: "Kitchen Fare" },
];

const MenuSection = () => {
  const [mode, setMode] = useState<MenuMode>("bar");

  return (
    <section id="menu" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="section-badge">The Bar &amp; Kitchen</span>
          <h2 className="section-heading">
            Every sip, every bite,
            <br />
            crafted with care.
          </h2>
          <p className="section-subtext mx-auto text-center mt-2">
            Award-winning microbrewery · DLF Cyber Hub, Gurgaon
          </p>
        </div>

        {/* ── Premium sliding pill tab switcher ── */}
        <div className="flex justify-center mb-10">
          <div
            style={{
              display: "inline-flex",
              alignItems: "stretch",
              background: "hsla(40,20%,95%,0.04)",
              border: "1px solid hsla(40,20%,95%,0.08)",
              borderRadius: 999,
              padding: 5,
              gap: 2,
            }}
          >
            {MODES.map(({ key, icon, label, sub }) => {
              const active = mode === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setMode(key)}
                  whileHover={active ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 32px",
                    borderRadius: 999,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: active ? "hsl(20,10%,5%)" : "hsla(40,20%,95%,0.55)",
                    transition: "color 0.3s ease",
                    zIndex: 1,
                  }}
                >
                  {/* Animated gold pill sliding underneath */}
                  {active && (
                    <motion.div
                      layoutId="menu-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 999,
                        background: "hsl(35,80%,50%)",
                        boxShadow: "0 4px 24px hsl(35 80% 50% / 0.4)",
                        zIndex: -1,
                      }}
                    />
                  )}

                  {/* Icon — bounces when active */}
                  <motion.span
                    animate={{ scale: active ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}
                  >
                    {icon}
                  </motion.span>

                  {/* Labels */}
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 1.5,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: 13.5,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "inherit",
                        fontWeight: 300,
                        fontSize: 10.5,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        color: active ? "hsl(20,10%,25%)" : "hsla(40,20%,95%,0.3)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {sub}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hint text */}
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "hsla(40,20%,95%,0.25)",
            marginBottom: 28,
            fontFamily: "inherit",
          }}
        >
          Use{" "}
          <span style={{ color: "hsla(40,20%,95%,0.45)" }}>← →</span> arrow keys or buttons to flip pages
        </p>

        {/* ── Flipbook content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {mode === "bar" ? <BarMenuBook /> : <FoodMenuBook />}
          </motion.div>
        </AnimatePresence>

        {/* Legal footnote */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "inherit",
            fontSize: 11,
            marginTop: 40,
            color: "hsla(40,20%,95%,0.18)",
            lineHeight: 1.6,
          }}
        >
          Government taxes as applicable · Alcoholic beverages will not be served to persons below 21 years of age
          <br />
          All prices in ₹ · +10% service charge applicable
        </p>
      </div>
    </section>
  );
};

export default MenuSection;
