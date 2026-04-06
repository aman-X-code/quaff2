import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

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

  // Smooth spring-based transforms for buttery motion
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.5 });

  const burpX = useTransform(smoothProgress, [0.25, 0.55, 1.0], ["120%", "0%", "-50%"]);
  const burpY = useTransform(smoothProgress, [0.25, 0.55, 1.0], ["0%", "0%", "25%"]);
  const burpOp = useTransform(smoothProgress, [0.25, 0.4, 0.78, 0.95], [0, 1, 1, 0]);
  const burpRotate = useTransform(smoothProgress, [0.25, 0.55, 1.0], [-8, -12, -16]);
  const burpScale = useTransform(smoothProgress, [0.25, 0.55, 0.85], [0.9, 1, 1.05]);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-visible bg-background"
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

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{ padding: isMobile ? "0 6%" : "0 4%", marginTop: "-10vh" }}
      >
        {/* Amen! */}
        <motion.span
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="block text-center mb-6 italic"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "2.4rem" : "3.2rem",
            color: "hsl(35, 80%, 50%)",
            lineHeight: 1,
            textShadow: "0 0 40px hsla(35, 80%, 50%, 0.5)",
          }}
        >
          Amen!
        </motion.span>

        {/* Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center m-0"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            color: "hsl(var(--foreground))",
            whiteSpace: isMobile ? "normal" : "nowrap",
            maxWidth: isMobile ? "100%" : "none",
          }}
        >
          {isMobile ? (
            <>
              "He who drinks beer sleeps well. He who sleeps well{" "}
              <span style={{ color: "hsl(35, 80%, 50%)" }}>cannot sin.</span>{" "}
              He who does not sin goes to heaven. Amen."
            </>
          ) : (
            <>
              "He who drinks beer sleeps well.
              <br />
              He who sleeps well{" "}
              <span style={{ color: "hsl(35, 80%, 50%)" }}>cannot sin.</span>
              <br />
              He who does not sin goes to heaven. Amen."
            </>
          )}
        </motion.h2>
      </div>

      {/* Buuuuurp — scroll-driven */}
      <motion.div
        style={{
          position: "absolute",
          bottom: isMobile ? "18%" : "4%",
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
    </section>
  );
};

export default BurpText;
