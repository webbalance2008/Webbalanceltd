import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WebBalanceLogo } from "./WebBalanceLogo";

// Department colours — mirrors Hero.tsx
const DEPT_COLORS = [
  "#00d4e8",
  "#b89fd4",
  "#4ade80",
  "#f59e0b",
  "#60a5fa",
  "#f472b6",
];

interface PreloaderProps {
  onComplete: () => void;
}

type Phase = "visible" | "exiting";

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("visible");
  const [accentIndex, setAccentIndex] = useState(0);

  // Cycle accent colour every 300ms while loading — matches hero feel
  useEffect(() => {
    const id = setInterval(() => {
      setAccentIndex((i) => (i + 1) % DEPT_COLORS.length);
    }, 320);
    return () => clearInterval(id);
  }, []);

  // Timing: bar fills for 1.8s → short pause → exit
  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exiting"), 2200);
    const doneTimer = setTimeout(() => onComplete(), 2900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const accent = DEPT_COLORS[accentIndex];

  return (
    <AnimatePresence>
      {phase === "visible" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0f0a1e" }}
        >
          {/* Background subtle radial glow that shifts with the colour */}
          <motion.div
            animate={{
              background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 65%)`,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12"
          >
            <WebBalanceLogo className="w-56 md:w-72 opacity-90" />
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative w-48 md:w-64"
          >
            {/* Track */}
            <div
              className="w-full rounded-full overflow-hidden"
              style={{
                height: 1.5,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Fill */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  height: "100%",
                  background: accent,
                  boxShadow: `0 0 8px 2px ${accent}88`,
                  borderRadius: 999,
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                }}
              />
            </div>

            {/* Percentage counter */}
            <CounterText accentColor={accent} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="absolute bottom-10 text-white text-[10px] tracking-[0.35em] uppercase"
          >
            Digital Experiences That Convert
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Animates 0 → 100 over 1.7s to match the bar
function CounterText({ accentColor }: { accentColor: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1700;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start - 300; // matches delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setCount(Math.floor(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="absolute right-0 -top-5 tabular-nums"
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: accentColor,
        opacity: 0.7,
        transition: "color 0.3s ease",
        letterSpacing: "0.1em",
      }}
    >
      {count}%
    </div>
  );
}
