import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/* ─── Types ─────────────────────────────────────────────── */
export type StaggerType =
  | "left-to-right"
  | "right-to-left"
  | "center-out"
  | "edges-in";

export type MovementType =
  | "top-down"
  | "bottom-up"
  | "fade-out"
  | "scale-vertical";

interface RevealLoaderProps {
  text?: string;
  textSize?: string;
  textColor?: string;
  bgColors?: string[];
  angle?: number;
  staggerOrder?: StaggerType;
  movementDirection?: MovementType;
  textFadeDelay?: number;
  className?: string;
  onComplete?: () => void;
}

/* ─── Helpers ────────────────────────────────────────────── */
const getStaggerFrom = (type: StaggerType): gsap.TweenVars["from"] => {
  switch (type) {
    case "right-to-left": return "end";
    case "center-out":    return "center";
    case "edges-in":      return "edges";
    default:              return "start";
  }
};

const getAnimationProperties = (type: MovementType): gsap.TweenVars => {
  switch (type) {
    case "bottom-up":        return { y: "-100%",  ease: "power2.inOut" };
    case "fade-out":         return { autoAlpha: 0, ease: "power2.inOut" };
    case "scale-vertical":   return { scaleY: 0, transformOrigin: "center", ease: "power2.inOut" };
    default: /* top-down */  return { y: "100%",  ease: "power2.inOut" };
  }
};

/* ─── Component ──────────────────────────────────────────── */
const RevealLoader = ({
  text = "QUAFF",
  textSize = "clamp(5rem, 18vw, 14rem)",
  textColor = "white",
  bgColors = ["hsl(26, 14%, 6%)", "hsl(26, 20%, 10%)"],
  angle = 135,
  staggerOrder = "center-out",
  movementDirection = "top-down",
  textFadeDelay = 0.55,
  className,
  onComplete,
}: RevealLoaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  const bgStyle =
    bgColors.length === 1
      ? { backgroundColor: bgColors[0] }
      : { backgroundImage: `linear-gradient(${angle}deg, ${bgColors.join(", ")})` };

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete });

      const moveProps = getAnimationProperties(movementDirection);
      const staggerCfg = { each: 0.1, from: getStaggerFrom(staggerOrder) };

      /* 1 — Characters drop in */
      tl.to(".rl-char", {
        y: 0,
        stagger: 0.045,
        duration: 0.22,
        ease: "power3.out",
      });

      /* 2 — Hold, then bars exit */
      tl.to(
        ".rl-bar",
        {
          delay: 1,
          duration: 0.55,
          stagger: staggerCfg,
          ...moveProps,
        }
      );

      /* 3 — Text fades before/alongside bars leaving */
      tl.to(
        ".rl-char",
        { autoAlpha: 0, duration: 0.3, stagger: 0.03 },
        `<${textFadeDelay}`
      );

      /* 4 — Hide the wrapper */
      tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.1 }, "+=0.05");
    },
    {
      scope: preloaderRef,
      dependencies: [staggerOrder, movementDirection, textFadeDelay],
    }
  );

  return (
    <div
      ref={preloaderRef}
      className={cn(
        "fixed inset-0 z-[9999] flex overflow-hidden",
        className
      )}
    >
      {/* 10 vertical bars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="rl-bar h-full"
          style={{ width: "10%", ...bgStyle }}
        />
      ))}

      {/* Centred text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: textSize,
              color: textColor,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1,
              display: "flex",
              position: "relative",
              zIndex: 10,
            }}
          >
            {text.split("").map((char, i) => (
              <span
                key={i}
                className="rl-char inline-block"
                style={{ transform: "translateY(110%)" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevealLoader;
