import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Matched pairs (laptop + phone) — one per client ────────────────────────
const IMAGE_PAIRS: { laptop: string; phone: string; client: string }[] = [
  { laptop: "/hero-laptop-granite-elite.png",  phone: "/hero-phone-granite-elite.png",  client: "Granite Elite" },
  { laptop: "/hero-laptop-tac.png",            phone: "/hero-phone-tac.png",            client: "TAC Healthcare" },
  { laptop: "/hero-laptop-gt-diagnostics.png", phone: "/hero-phone-gt-diagnostics.png", client: "GT Diagnostics" },
  { laptop: "/hero-laptop-banks-odee.png",     phone: "/hero-phone-banks-odee.png",     client: "Banks O'Dee" },
  { laptop: "/hero-laptop-romar-abrado.png",   phone: "/hero-phone-romar-abrado.png",   client: "Romar Abrado" },
  { laptop: "/hero-laptop-sfs.png",            phone: "/hero-phone-sfs.png",            client: "SFS Fire Protection" },
  { laptop: "/hero-laptop-waverley.png",       phone: "/hero-phone-waverley.png",       client: "Waverley" },
];

// Department colours — one per dot, cycling through the 6 brand colours
const DEPT_COLORS = [
  "#00d4e8", // cyan
  "#b89fd4", // lavender
  "#4ade80", // green
  "#f59e0b", // amber
  "#60a5fa", // blue
  "#f472b6", // pink
  "#00d4e8", // wrap back to cyan for 7th pair
];

// ─────────────────────────────────────────────────────────────────────────────

interface HeroDevicesProps {
  accentColor: string;
  cycleSignal: number; // increments each time Hero wants a device transition
}

export function HeroDevices({ accentColor, cycleSignal }: HeroDevicesProps) {
  const initialIndex = useMemo(
    () => Math.floor(Math.random() * IMAGE_PAIRS.length),
    []
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const prevSignal = useRef(cycleSignal);

  // Advance device image whenever Hero fires a cycle (headline transition)
  useEffect(() => {
    if (cycleSignal === prevSignal.current) return;
    prevSignal.current = cycleSignal;
    if (!isPaused) {
      setActiveIndex((prev) => (prev + 1) % IMAGE_PAIRS.length);
    }
  }, [cycleSignal, isPaused]);

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 18000);
  };

  const pair = IMAGE_PAIRS[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{ minHeight: 480 }}
    >
      {/* Deep background shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-20% -10%",
          background: "radial-gradient(ellipse 80% 70% at 55% 55%, rgba(0,0,0,0.55) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Accent colour haze */}
      <motion.div
        animate={{
          background: `radial-gradient(ellipse 60% 50% at 55% 50%, ${accentColor}18 0%, transparent 65%)`,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{ inset: "-10% -5%", zIndex: 0 }}
      />

      {/* ── Shooting stars ──────────────────────────────────────── */}
      {[
        { top: "5%",  left: "10%", dx: 120, dy: 80,  duration: 1.8, delay: 0.5,  length: 100 },
        { top: "15%", left: "50%", dx: 100, dy: 65,  duration: 1.6, delay: 3.8,  length: 80  },
        { top: "40%", left: "5%",  dx: 130, dy: 90,  duration: 2.0, delay: 6.5,  length: 110 },
        { top: "60%", left: "35%", dx: 90,  dy: 60,  duration: 1.7, delay: 2.0,  length: 75  },
        { top: "25%", left: "70%", dx: 110, dy: 75,  duration: 1.9, delay: 9.0,  length: 90  },
        { top: "10%", left: "80%", dx: 95,  dy: 65,  duration: 1.6, delay: 5.2,  length: 85  },
      ].map((star, i) => {
        const angle = Math.atan2(star.dy, star.dx) * (180 / Math.PI);
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
              width: star.length,
              height: 1.5,
              rotate: angle,
              transformOrigin: "left center",
              zIndex: 0,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.7, 0.5, 0],
              x: [0, star.dx],
              y: [0, star.dy],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 8 + i * 1.5,
              ease: "easeOut",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(to right, transparent, ${accentColor}88 35%, white 80%, transparent)`,
                borderRadius: 2,
              }}
            />
          </motion.div>
        );
      })}

      {/* ── Device images (flex column so dots sit naturally below) ── */}
      <div className="relative w-full flex flex-col items-center" style={{ zIndex: 1 }}>

        {/* ── Laptop ─────────────────────────────────────────────── */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative select-none w-full"
          style={{
            maxWidth: 680,
            filter: `drop-shadow(0 40px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 30px ${accentColor}1a)`,
            transition: "filter 1.2s ease",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`laptop-${activeIndex}`}
              src={pair.laptop}
              alt={`${pair.client} website design — laptop`}
              className="w-full h-auto"
              draggable={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Navigation dots — pinned to bottom centre of container ── */}
      <div
        className="absolute flex items-center gap-2.5"
        style={{ bottom: "4%", left: "50%", transform: "translateX(-50%)", zIndex: 20 }}
      >
        {IMAGE_PAIRS.map((_, i) => {
          const dotColor = DEPT_COLORS[i % DEPT_COLORS.length];
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`View ${IMAGE_PAIRS[i].client}`}
              style={{
                width: isActive ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: isActive ? dotColor : `${dotColor}44`,
                boxShadow: isActive ? `0 0 8px ${dotColor}bb` : "none",
                border: `1px solid ${isActive ? dotColor : `${dotColor}66`}`,
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
            />
          );
        })}
      </div>

      {/* ── Phones ─────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute select-none"
        style={{
          width: 130,
          bottom: "14%",
          right: "2%",
          zIndex: 10,
          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.75)) drop-shadow(0 0 16px ${accentColor}33)`,
          transition: "filter 1.2s ease",
        }}
      >
        <AnimatePresence mode="wait">
            <motion.img
              key={`phone-${activeIndex}`}
              src={pair.phone}
              alt={`${pair.client} website design — mobile`}
            className="w-full h-auto"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* ── Floating accent dots ────────────────────────────────── */}
      {[
        { top: "10%", left: "5%",   size: 4, delay: 0   },
        { top: "78%", left: "12%",  size: 3, delay: 0.8 },
        { top: "18%", right: "4%",  size: 5, delay: 1.5 },
        { top: "62%", right: "22%", size: 3, delay: 0.4 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 0.85, 0.3], scale: [1, 1.5, 1] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  dot.size,
            height: dot.size,
            top:    (dot as any).top,
            left:   (dot as any).left,
            right:  (dot as any).right,
            background: accentColor,
            boxShadow: `0 0 ${dot.size * 4}px ${accentColor}`,
            transition: "background 1.2s ease, box-shadow 1.2s ease",
          }}
        />
      ))}
    </motion.div>
  );
}