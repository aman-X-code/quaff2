import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

// Word component that reveals based on scroll progress
const ScrollWord = ({
  word,
  index,
  total,
  scrollProgress,
  isHighlight,
}: {
  word: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  isHighlight?: boolean;
}) => {
  // Each word gets its own slice of the scroll timeline
  const wordStart = 0.15 + (index / total) * 0.45;
  const wordEnd = wordStart + 0.06;

  const opacity = useTransform(scrollProgress, [wordStart, wordEnd], [0, 1]);
  const y = useTransform(scrollProgress, [wordStart, wordEnd], [30, 0]);
  const blur = useTransform(scrollProgress, [wordStart, wordEnd], [8, 0]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: blurFilter,
        display: "inline-block",
        color: isHighlight ? "hsl(35, 80%, 50%)" : "hsl(var(--foreground))",
        marginRight: "0.3em",
      }}
    >
      {word}
    </motion.span>
  );
};

const BurpText = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.4,
  });

  // Amen header — appears first
  const amenOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const amenY = useTransform(smoothProgress, [0.1, 0.2], [30, 0]);
  const amenBlur = useTransform(smoothProgress, [0.1, 0.2], [10, 0]);
  const amenFilter = useTransform(amenBlur, (v) => `blur(${v}px)`);

  // Burp text
  const burpX = useTransform(smoothProgress, [0.3, 0.6, 1.0], ["120%", "0%", "-50%"]);
  const burpY = useTransform(smoothProgress, [0.3, 0.6, 1.0], ["0%", "0%", "25%"]);
  const burpOp = useTransform(smoothProgress, [0.3, 0.5, 0.78, 0.95], [0, 1, 1, 0]);
  const burpRotate = useTransform(smoothProgress, [0.3, 0.6, 1.0], [-8, -12, -16]);
  const burpScale = useTransform(smoothProgress, [0.3, 0.6, 0.85], [0.9, 1, 1.05]);

  // Quote words with highlight markers
  const quoteLines = [
    { text: '"He who drinks beer sleeps well.', highlights: [] as number[] },
    { text: "He who sleeps well", highlights: [] as number[] },
    { text: "cannot sin.", highlights: [0, 1] }, // highlight these word indices
    { text: 'He who does not sin goes to heaven. Amen."', highlights: [] as number[] },
  ];

  // Flatten all words with metadata
  const allWords: { word: string; lineIndex: number; isHighlight: boolean }[] = [];
  quoteLines.forEach((line, li) => {
    line.text.split(" ").forEach((word, wi) => {
      allWords.push({
        word,
        lineIndex: li,
        isHighlight: line.highlights.includes(wi),
      });
    });
  });

  // Glitter canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.35 + 0.1,
      drift: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: Math.random() * 0.025 + 0.008,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.flicker += p.flickerSpeed;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.flicker));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,151,62,${a})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Group words back into lines for rendering
  const lineBreaks = [0];
  let currentLine = 0;
  allWords.forEach((w, i) => {
    if (i > 0 && w.lineIndex !== allWords[i - 1].lineIndex) {
      lineBreaks.push(i);
      currentLine = w.lineIndex;
    }
  });

  const renderLines = () => {
    const lines: { word: string; isHighlight: boolean; globalIndex: number }[][] = [];
    let current: { word: string; isHighlight: boolean; globalIndex: number }[] = [];
    let prevLine = 0;

    allWords.forEach((w, i) => {
      if (w.lineIndex !== prevLine) {
        lines.push(current);
        current = [];
        prevLine = w.lineIndex;
      }
      current.push({ word: w.word, isHighlight: w.isHighlight, globalIndex: i });
    });
    if (current.length) lines.push(current);

    return lines.map((line, li) => (
      <div key={li} className="flex flex-wrap justify-center" style={{ gap: 0 }}>
        {line.map((w) => (
          <ScrollWord
            key={w.globalIndex}
            word={w.word}
            index={w.globalIndex}
            total={allWords.length}
            scrollProgress={smoothProgress}
            isHighlight={w.isHighlight}
          />
        ))}
      </div>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-visible bg-background"
      style={{ minHeight: "150vh" }}
    >
      {/* Glitter canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, hsla(35, 80%, 50%, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Sticky content container */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center w-full"
      >
        <div
          className="relative z-10 flex flex-col items-center w-full"
          style={{ padding: isMobile ? "0 6%" : "0 4%" }}
        >
          {/* Amen! — scroll-driven */}
          <motion.span
            style={{
              opacity: amenOpacity,
              y: amenY,
              filter: amenFilter,
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "2.4rem" : "3.2rem",
              color: "hsl(35, 80%, 50%)",
              lineHeight: 1,
              textShadow: "0 0 40px hsla(35, 80%, 50%, 0.5)",
            }}
            className="block text-center mb-6 italic"
          >
            Amen!
          </motion.span>

          {/* Quote — word by word scroll reveal */}
          <div
            className="text-center"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "1.8rem" : "3rem",
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: "-0.02em",
            }}
          >
            {renderLines()}
          </div>
        </div>

        {/* Buuuuurp — scroll-driven */}
        <motion.div
          style={{
            position: "absolute",
            bottom: isMobile ? "12%" : "6%",
            left: "50%",
            zIndex: 5,
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "32vw" : "18vw",
            fontWeight: 900,
            fontStyle: "italic",
            color: "hsla(30, 3%, 70%, 0.15)",
            letterSpacing: "-0.03em",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            lineHeight: 1,
            willChange: "transform, opacity",
            x: burpX,
            y: burpY,
            opacity: burpOp,
            rotate: burpRotate,
            scale: burpScale,
            translateX: "-50%",
          }}
        >
          Buuuuurp!
        </motion.div>
      </div>
    </section>
  );
};

export default BurpText;
