import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const words = ["Digital", "Experiences"];

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-end pb-24 overflow-hidden">
      {/* Animated SVG Grid Background */}
      <div className="absolute inset-0 opacity-40">
        {/* Layer 1: Dot grid with connecting lines */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Dots */}
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.9)" />
              <circle cx="60" cy="0" r="1.5" fill="rgba(255,255,255,0.9)" />
              <circle cx="0" cy="60" r="1.5" fill="rgba(255,255,255,0.9)" />
              {/* Subtle connecting lines */}
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              {/* Gold accent dots (sparse) */}
              <circle cx="30" cy="30" r="1" fill="rgba(212,175,55,0.8)" />
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
              <line x1="0" y1="0" x2="80" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
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
                stroke="rgba(212,175,55,0.25)" 
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

      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/3 blur-[100px] pointer-events-none" />

      {/* Top label */}
      

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/30 text-xs tracking-[0.3em] uppercase mb-6"
          >
            Crafting
          </motion.p>

          <div className="overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.02em] block font-light"
              >
                {word}
              </motion.span>
            ))}
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.02em] block font-light"
            >
              <span 
                style={{ 
                  background: "linear-gradient(135deg, #c9a96e 0%, #a08550 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                That Convert
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/30 text-xs tracking-[0.3em] uppercase leading-relaxed max-w-xs"
          >
            For over 15-years we have been providing unique, user-friendly websites that convert.
            <br />
            We aim to exceed your expectations and support your digital growth.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 text-white/30 hover:text-[#c9a96e] transition-colors group"
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
