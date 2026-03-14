import { SolarSystem } from "./SolarSystem";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HeroDevices } from "./HeroDevices";
import { usePreloaderDone } from "../contexts/PreloaderContext";

// Department colours — the left "start" of the gradient cycles, white stays on the right
const DEPT_COLORS = [
  "#00d4e8", // Web Design — brand cyan
  "#b89fd4", // Web Apps — lavender purple
  "#4ade80", // SEO — green
  "#f59e0b", // Branding — amber
  "#60a5fa", // Hosting — blue
  "#f472b6", // Support — pink
];

// ── Meteor configurations: varied sizes & entry points, all travel top-left → bottom-right ──
const METEOR_CONFIGS = [
  // Shallow angle — enters from far left
  { top: "5%",   left: "-20%", dx: 1700, dy:  280,  w: 320,  h: 2,  dur: 1.5 },
  // Shallow angle — enters mid-left
  { top: "18%",  left: "-15%", dx: 1600, dy:  260,  w: 280,  h: 1.5,dur: 1.4 },
  // Shallow angle — enters lower-left
  { top: "40%",  left: "-18%", dx: 1650, dy:  220,  w: 260,  h: 1.5,dur: 1.3 },
  // Medium diagonal — enters top-left corner
  { top: "-5%",  left: "-8%",  dx: 1200, dy:  720,  w: 360,  h: 3,  dur: 1.8 },
  // Medium diagonal — enters top-left, lower start
  { top: "2%",   left: "-10%", dx: 1150, dy:  680,  w: 320,  h: 2.5,dur: 1.7 },
  // Medium diagonal — enters from top edge
  { top: "-8%",  left: "10%",  dx: 1100, dy:  750,  w: 340,  h: 3,  dur: 1.9 },
  // Medium diagonal — enters from top edge, centre
  { top: "-8%",  left: "28%",  dx: 1050, dy:  700,  w: 300,  h: 2.5,dur: 1.8 },
  // Steep — enters from top-left
  { top: "-10%", left: "5%",   dx:  600, dy: 1150,  w: 220,  h: 2,  dur: 2.1 },
  // Steep — enters from top, slightly right
  { top: "-10%", left: "22%",  dx:  540, dy: 1100,  w: 200,  h: 1.5,dur: 2.0 },
  // Steep — enters from top-centre
  { top: "-10%", left: "42%",  dx:  480, dy: 1200,  w: 210,  h: 2,  dur: 2.2 },
  // Large — enters top-left, low angle
  { top: "-2%",  left: "-18%", dx: 1800, dy:  520,  w: 460,  h: 4,  dur: 1.4 },
  // Large — enters left, mid height
  { top: "15%",  left: "-20%", dx: 1750, dy:  480,  w: 440,  h: 4,  dur: 1.4 },
  // Small & quick — enters top-left
  { top: "8%",   left: "-12%", dx: 1400, dy:  380,  w: 160,  h: 1.5,dur: 1.2 },
];

type MeteorConfig = typeof METEOR_CONFIGS[0];

export function Hero() {
  const [colorIndex, setColorIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [meteorKey, setMeteorKey] = useState(0);
  const [meteorActive, setMeteorActive] = useState(false);
  const [meteorConfig, setMeteorConfig] = useState<MeteorConfig>(METEOR_CONFIGS[1]);
  const meteorTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const ready = usePreloaderDone();

  useEffect(() => {
    const id = setInterval(() => {
      setPrevIndex((i) => (i === null ? 0 : i));
      setColorIndex((c) => {
        const next = (c + 1) % DEPT_COLORS.length;
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Large meteor every 5 seconds — random config each time
  useEffect(() => {
    const fire = () => {
      const cfg = METEOR_CONFIGS[Math.floor(Math.random() * METEOR_CONFIGS.length)];
      setMeteorConfig(cfg);
      setMeteorKey((k) => k + 1);
      setMeteorActive(true);
    };

    const initial = setTimeout(fire, 1500);
    meteorTimer.current = setInterval(fire, 5000);

    return () => {
      clearTimeout(initial);
      if (meteorTimer.current) clearInterval(meteorTimer.current);
    };
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentColor = DEPT_COLORS[colorIndex];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #16212e 0%, #1d2d3e 60%, #16212e 100%)" }} />

      {/* Animated SVG Grid Background */}
      <div className="absolute inset-0 opacity-40">
        {/* Layer 1: Dot grid with connecting lines */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Dots */}
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.4)" />
              <circle cx="60" cy="0" r="1.5" fill="rgba(255,255,255,0.4)" />
              <circle cx="0" cy="60" r="1.5" fill="rgba(255,255,255,0.4)" />
              {/* Subtle connecting lines */}
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              {/* Accent dots (sparse) */}
              <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 60"
              dur="20s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        
        {/* Layer 2: Diagonal lines overlay */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="80" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 80 0"
              dur="30s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>

        {/* Layer 3: Hexagonal accent pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPattern" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <path 
                d="M 50 0 L 93.3 25 L 93.3 75 L 50 100 L 6.7 75 L 6.7 25 Z" 
                fill="none" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 100 86.6"
              dur="40s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      {/* Gradient orb — also transitions colour */}
      <motion.div
        animate={{ background: `radial-gradient(circle, ${currentColor}14 0%, transparent 70%)` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
      />
      <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-[#b89fd4]/8 blur-[100px] pointer-events-none" />

      {/* ── Solar System — behind accent dots, above gradient orbs ── */}
      <SolarSystem accentColor={currentColor} />

      {/* ── Large Meteor — fires every 5 seconds ───────────────────────────────── */}
      <AnimatePresence>
        {meteorActive && (
          <motion.div
            key={`meteor-${meteorKey}`}
            className="absolute pointer-events-none"
            style={{
              top: meteorConfig.top,
              left: meteorConfig.left,
              width: meteorConfig.w,
              height: meteorConfig.h,
              rotate: Math.atan2(meteorConfig.dy, meteorConfig.dx) * (180 / Math.PI),
              transformOrigin: "left center",
              zIndex: 5,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              x: [0, 0, meteorConfig.dx * 0.45, meteorConfig.dx * 1.1],
              y: [0, 0, meteorConfig.dy * 0.45, meteorConfig.dy * 1.1],
            }}
            transition={{
              duration: meteorConfig.dur,
              ease: "linear",
              times: [0, 0.05, 0.5, 1],
            }}
            onAnimationComplete={() => setMeteorActive(false)}
          >
            {/* Trail */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(to right, transparent 0%, ${currentColor}22 15%, ${currentColor}88 55%, white 88%, transparent 100%)`,
                borderRadius: 6,
                filter: "blur(0.5px)",
              }}
            />
            {/* Bright head glow */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "white",
                boxShadow: `0 0 12px 6px white, 0 0 30px 14px ${currentColor}, 0 0 60px 24px ${currentColor}88`,
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scattered accent dots across the hero */}
      {[
        { top: "4%",  left: "2%",   size: 2, delay: 0,    speed: 4.5 },
        { top: "8%",  left: "6%",   size: 3, delay: 0,    speed: 4   },
        { top: "12%", left: "14%",  size: 2, delay: 2.0,  speed: 5.2 },
        { top: "14%", left: "22%",  size: 2, delay: 1.2,  speed: 5   },
        { top: "3%",  left: "33%",  size: 3, delay: 0.8,  speed: 4.7 },
        { top: "5%",  left: "48%",  size: 4, delay: 0.6,  speed: 3.5 },
        { top: "9%",  left: "61%",  size: 2, delay: 1.5,  speed: 6.2 },
        { top: "22%", left: "72%",  size: 2, delay: 2.1,  speed: 6   },
        { top: "7%",  left: "80%",  size: 3, delay: 0.4,  speed: 4.3 },
        { top: "11%", left: "88%",  size: 3, delay: 0.9,  speed: 4.5 },
        { top: "17%", left: "95%",  size: 2, delay: 2.3,  speed: 5.8 },
        { top: "25%", left: "8%",   size: 3, delay: 1.3,  speed: 4.9 },
        { top: "30%", left: "28%",  size: 2, delay: 0.5,  speed: 5.6 },
        { top: "38%", left: "3%",   size: 2, delay: 1.7,  speed: 5.5 },
        { top: "35%", left: "42%",  size: 3, delay: 2.8,  speed: 3.9 },
        { top: "28%", left: "58%",  size: 2, delay: 1.0,  speed: 6.4 },
        { top: "33%", left: "82%",  size: 4, delay: 1.1,  speed: 3.8 },
        { top: "42%", left: "93%",  size: 2, delay: 0.2,  speed: 5.1 },
        { top: "45%", left: "12%",  size: 2, delay: 3.0,  speed: 4.6 },
        { top: "52%", left: "18%",  size: 3, delay: 0.3,  speed: 4   },
        { top: "48%", left: "35%",  size: 2, delay: 1.9,  speed: 5.7 },
        { top: "45%", left: "55%",  size: 2, delay: 2.4,  speed: 6.5 },
        { top: "50%", left: "70%",  size: 3, delay: 0.7,  speed: 4.1 },
        { top: "55%", left: "85%",  size: 2, delay: 2.2,  speed: 5.3 },
        { top: "60%", left: "91%",  size: 2, delay: 0.5,  speed: 5   },
        { top: "58%", left: "5%",   size: 3, delay: 1.6,  speed: 4.4 },
        { top: "63%", left: "25%",  size: 2, delay: 2.7,  speed: 6.1 },
        { top: "68%", left: "48%",  size: 4, delay: 0.1,  speed: 3.6 },
        { top: "70%", left: "38%",  size: 3, delay: 1.8,  speed: 4.2 },
        { top: "72%", left: "75%",  size: 2, delay: 1.3,  speed: 5.9 },
        { top: "78%", left: "64%",  size: 2, delay: 0.7,  speed: 6   },
        { top: "75%", left: "15%",  size: 3, delay: 2.5,  speed: 4.8 },
        { top: "82%", left: "10%",  size: 4, delay: 2.6,  speed: 3.5 },
        { top: "80%", left: "32%",  size: 2, delay: 0.9,  speed: 5.4 },
        { top: "84%", left: "55%",  size: 3, delay: 1.4,  speed: 4.0 },
        { top: "88%", left: "78%",  size: 2, delay: 1.4,  speed: 5.5 },
        { top: "86%", left: "90%",  size: 3, delay: 2.9,  speed: 4.7 },
        { top: "92%", left: "20%",  size: 2, delay: 0.6,  speed: 6.3 },
        { top: "92%", left: "44%",  size: 3, delay: 0.2,  speed: 4.8 },
        { top: "95%", left: "68%",  size: 2, delay: 1.7,  speed: 5.0 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            scale:   [1, 1.8, 1],
          }}
          transition={{
            duration: dot.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  dot.size,
            height: dot.size,
            top:    dot.top,
            left:   dot.left,
            background:  currentColor,
            boxShadow:  `0 0 ${dot.size * 5}px ${currentColor}`,
            transition: "background 1.2s ease, box-shadow 1.2s ease",
          }}
        />
      ))}

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">

          {/* ── Left: Text ── */}
          <div className="flex-1 lg:pr-8">
            <div className="mb-8">

              {/* "Digital" — mask reveal line 1 */}
              <div style={{ overflow: "hidden", lineHeight: 1.0 }}>
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                  transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.0 }}
                  className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                >
                  Digital
                </motion.span>
              </div>

              {/* "Experiences" — mask reveal line 2 */}
              <div style={{ overflow: "hidden", lineHeight: 1.0 }}>
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                  transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.0 }}
                  className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                >
                  Experiences
                </motion.span>
              </div>

              {/* "That Convert" — mask reveal line 3, cycling gradient colour */}
              <div style={{ overflow: "hidden", lineHeight: 1.0, paddingBottom: "0.2em", marginBottom: "-0.2em" }}>
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                  transition={{ duration: 1, delay: 0.31, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.0 }}
                  className="text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                >
                  <span className="relative inline-block">
                    {/* Invisible placeholder to hold width */}
                    <span
                      aria-hidden
                      style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        visibility: "hidden",
                      }}
                    >
                      That Convert
                    </span>
                    {/* Cycling colour overlay */}
                    <AnimatePresence mode="sync">
                      <motion.span
                        key={colorIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(90deg, ${currentColor} 0%, #ffffff 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        That Convert
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Body copy — fades up after headline */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/60 text-xs tracking-[0.3em] uppercase leading-relaxed max-w-lg"
            >
              For over 15 years, we have been providing professional, results-driven digital solutions — from web apps and websites to SEO, branding and strategy-led marketing.
              <br /><br />
              We work with businesses of all sizes to exceed expectations and drive real digital growth.
            </motion.p>
          </div>

          {/* ── Right: Devices ── */}
          <div className="hidden lg:block flex-1 relative" style={{ height: 520 }}>
            <HeroDevices accentColor={currentColor} />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 text-white/50 hover:text-[#00d4e8] transition-colors group z-10"
      >
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-xs tracking-[0.2em] uppercase"
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}