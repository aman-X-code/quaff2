import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "quaff_age_verified";

interface AgeGateProps {
  onVerified: () => void;
}

const AgeGate = ({ onVerified }: AgeGateProps) => {
  const [declined, setDeclined] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleYes = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setExiting(true);
    // Give exit animation time to play
    setTimeout(onVerified, 700);
  };

  const handleNo = () => {
    setDeclined(true);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="age-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, hsl(26,22%,8%) 0%, hsl(26,14%,3%) 100%)",
          }}
        >
          {/* Subtle grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
              opacity: 0.4,
            }}
          />

          {/* Gold top line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, #C8902A 30%, #C8902A 70%, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <AnimatePresence mode="wait">
            {!declined ? (
              /* ── Verification screen ── */
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center max-w-sm w-full"
              >
                {/* Logo wordmark */}
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.28em" }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="font-heading italic mb-10"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: "hsl(40,20%,92%)",
                    letterSpacing: "0.28em",
                  }}
                >
                  Quaff
                </motion.p>

                {/* Gold divider */}
                <motion.div
                  className="w-8 h-px mb-8"
                  style={{ background: "#C8902A" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                />

                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-6"
                  style={{ color: "#C8902A" }}
                >
                  Age Verification
                </motion.p>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="font-heading italic leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.7rem, 5vw, 2.4rem)",
                    color: "hsl(40,20%,92%)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  You must be 25 years
                  <br />
                  <span style={{ color: "hsl(40,20%,62%)" }}>or older to enter.</span>
                </motion.h1>

                {/* Sub-text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-sm font-light leading-relaxed mb-10"
                  style={{
                    color: "hsl(40,12%,48%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  By proceeding, you confirm you are of legal
                  <br className="hidden sm:block" /> drinking age in your country of residence.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  {/* YES */}
                  <button
                    id="age-gate-yes"
                    onClick={handleYes}
                    className="flex-1 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8902A 0%, #e0a83a 100%)",
                      color: "hsl(26,14%,6%)",
                      fontFamily: "var(--font-body)",
                      boxShadow: "0 4px 24px rgba(200,144,42,0.35)",
                    }}
                  >
                    Yes, I am 25+
                  </button>

                  {/* NO */}
                  <button
                    id="age-gate-no"
                    onClick={handleNo}
                    className="flex-1 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-75 active:scale-[0.97]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "hsl(40,12%,50%)",
                      fontFamily: "var(--font-body)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    No, I'm not
                  </button>
                </motion.div>

                {/* Fine print */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 text-[10px] leading-relaxed"
                  style={{
                    color: "hsl(40,12%,32%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Drink responsibly. Do not share with minors.
                </motion.p>
              </motion.div>
            ) : (
              /* ── Declined screen ── */
              <motion.div
                key="declined"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-7"
                  style={{
                    border: "1px solid rgba(200,144,42,0.25)",
                    background: "rgba(200,144,42,0.08)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8902A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>

                <h2
                  className="font-heading italic leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    color: "hsl(40,20%,80%)",
                  }}
                >
                  Sorry, you're not
                  <br />
                  <span style={{ color: "hsl(40,20%,50%)" }}>old enough to enter.</span>
                </h2>

                <p
                  className="text-sm font-light leading-relaxed"
                  style={{
                    color: "hsl(40,12%,40%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  This website contains content about
                  <br />
                  alcohol. Please come back when you
                  <br />
                  are of legal drinking age.
                </p>

                <p
                  className="mt-10 text-[10px] tracking-widest uppercase"
                  style={{ color: "hsl(40,12%,28%)", fontFamily: "var(--font-body)" }}
                >
                  Drink responsibly · Quaff Brewing Co.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { SESSION_KEY };
export default AgeGate;
