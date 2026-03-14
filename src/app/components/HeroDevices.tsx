import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import laptopImg1 from "figma:asset/ce59ee156d0d8072651a8da0a13ff6f04edbe8c8.png";
import laptopImg2 from "figma:asset/a1cda730e072ed6bb06551d27d69e0aee21194e8.png";
import laptopImg3 from "figma:asset/c20a8b4fab13529d1bfd238eead48e32ff2b73a1.png";
import laptopImg4 from "figma:asset/5e862106f38d8c4eb17ab6c833c9381a3f52cf24.png";
import laptopImg5 from "figma:asset/804c9037eed6d0c4bd3376c253e29007fae5eb54.png";
import laptopImg6 from "figma:asset/2b4da7082565d85c0ac9bba5cf2663452a0107d8.png";
import laptopImg7 from "figma:asset/3bc383f9ec318bc1ed39067a41cf1ecd7ac09ba9.png";
import phonesImg1 from "figma:asset/ea66bb08c0cadf8488cb0b9c5240abd3e16edde5.png";
import phonesImg2 from "figma:asset/f5e854e28cc3f55c6f2f6731702303cb00d2fa1c.png";
import phonesImg3 from "figma:asset/4a4605f09d6b8ffd9486f6be1abe85e3cac82fdb.png";
import phonesImg4 from "figma:asset/38ace8938bef6a8deb42bdaff8b0d108d3c726b5.png";
import phonesImg5 from "figma:asset/c1372c3f4af48fd9e3aa884ace088cc04e7db9cf.png";
import phonesImg6 from "figma:asset/a26482936a49a132ca48162a966e3e11e134f0d1.png";
import phonesImg7 from "figma:asset/d21d59932fb10cf372851c5e08610b95433ce0c7.png";

// ─── Matched pairs (laptop + phone from the same project set) ────────────────
const IMAGE_PAIRS: { laptop: string; phone: string }[] = [
  { laptop: laptopImg1, phone: phonesImg1 },
  { laptop: laptopImg2, phone: phonesImg2 },
  { laptop: laptopImg3, phone: phonesImg3 },
  { laptop: laptopImg4, phone: phonesImg4 },
  { laptop: laptopImg5, phone: phonesImg5 },
  { laptop: laptopImg6, phone: phonesImg6 },
  { laptop: laptopImg7, phone: phonesImg7 },
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
}

export function HeroDevices({ accentColor }: HeroDevicesProps) {
  const initialIndex = useMemo(
    () => Math.floor(Math.random() * IMAGE_PAIRS.length),
    []
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle every 3 seconds, pause if user manually selects a dot
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGE_PAIRS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    setIsPaused(true);
    // Resume auto-cycle after 8 seconds of inactivity
    setTimeout(() => setIsPaused(false), 8000);
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
            maxWidth: 560,
            filter: `drop-shadow(0 40px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 30px ${accentColor}1a)`,
            transition: "filter 1.2s ease",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`laptop-${activeIndex}`}
              src={pair.laptop}
              alt="Laptop website preview"
              className="w-full h-auto"
              draggable={false}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </motion.div>

        {/* ── Navigation dots ────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 mt-5" style={{ zIndex: 20 }}>
          {IMAGE_PAIRS.map((_, i) => {
            const dotColor = DEPT_COLORS[i % DEPT_COLORS.length];
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`View project set ${i + 1}`}
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
      </div>

      {/* ── Phones ─────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute select-none"
        style={{
          width: 220,
          bottom: "14%",
          right: "-4%",
          zIndex: 10,
          filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.75)) drop-shadow(0 0 16px ${accentColor}33)`,
          transition: "filter 1.2s ease",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`phone-${activeIndex}`}
            src={pair.phone}
            alt="Mobile website previews"
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