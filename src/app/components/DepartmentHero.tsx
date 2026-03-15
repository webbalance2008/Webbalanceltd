import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { ReactNode } from "react";

// ── Floating dot config ──────────────────────────────────────────────────────
const FLOATING_DOTS = [
  { top: "8%",  left: "6%",   size: 4, delay: 0,    speed: 4   },
  { top: "14%", left: "22%",  size: 3, delay: 1.2,  speed: 5   },
  { top: "5%",  left: "48%",  size: 5, delay: 0.6,  speed: 3.5 },
  { top: "22%", left: "72%",  size: 3, delay: 2.1,  speed: 6   },
  { top: "11%", left: "88%",  size: 4, delay: 0.9,  speed: 4.5 },
  { top: "30%", left: "28%",  size: 3, delay: 0.5,  speed: 5.6 },
  { top: "35%", left: "42%",  size: 4, delay: 2.8,  speed: 3.9 },
  { top: "33%", left: "82%",  size: 5, delay: 1.1,  speed: 3.8 },
  { top: "52%", left: "18%",  size: 4, delay: 0.3,  speed: 4   },
  { top: "50%", left: "70%",  size: 4, delay: 0.7,  speed: 4.1 },
  { top: "63%", left: "25%",  size: 3, delay: 2.7,  speed: 6.1 },
  { top: "68%", left: "48%",  size: 5, delay: 0.1,  speed: 3.6 },
  { top: "72%", left: "75%",  size: 3, delay: 1.3,  speed: 5.9 },
  { top: "58%", left: "91%",  size: 3, delay: 1.6,  speed: 4.4 },
  { top: "80%", left: "10%",  size: 4, delay: 0.8,  speed: 4.2 },
  { top: "85%", left: "60%",  size: 3, delay: 2.0,  speed: 5.4 },
];

export interface DepartmentHeroProps {
  /** Pill badge text, e.g. "Web Design" */
  label: string;
  /** Heading — pass JSX with accent-coloured word(s) */
  heading: ReactNode;
  /** Uppercase subtitle below the heading */
  subtitle: string;
  /** Department / page accent colour */
  accent: string;
  /** Primary CTA (accent-bordered) */
  primaryCta?: { label: string; to: string; description?: string };
  /** Secondary CTA (white-bordered) */
  secondaryCta?: { label: string; to: string; description?: string };
  /** Unique ID prefix for SVG patterns to avoid collisions */
  patternId?: string;
}

export function DepartmentHero({
  label,
  heading,
  subtitle,
  accent,
  primaryCta,
  secondaryCta,
  patternId = "dh",
}: DepartmentHeroProps) {
  // Derive rgba helper
  const hexToRgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #16212e 0%, #1d2d3e 60%, #16212e 100%)",
        }}
      />

      {/* Animated SVG Grid — desktop only */}
      <div className="absolute inset-0 hidden md:block">
        {/* Layer 1: Dot grid with connecting lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`${patternId}Dot`}
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0"  cy="0"  r="1.2" fill="rgba(255,255,255,0.45)" />
              <circle cx="50" cy="0"  r="1.2" fill="rgba(255,255,255,0.45)" />
              <circle cx="0"  cy="50" r="1.2" fill="rgba(255,255,255,0.45)" />
              <circle cx="50" cy="50" r="1.2" fill="rgba(255,255,255,0.45)" />
              <line x1="0" y1="0" x2="50" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="0.7" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId}Dot)`} opacity="0.85">
            <animateTransform
              attributeName="transform" type="translate"
              values="0 0; 0 50" dur="25s" repeatCount="indefinite"
            />
          </rect>
        </svg>

        {/* Layer 2: Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`${patternId}Diag`}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="80" y2="80" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId}Diag)`}>
            <animateTransform
              attributeName="transform" type="translate"
              values="0 0; 80 0" dur="35s" repeatCount="indefinite"
            />
          </rect>
        </svg>

        {/* Layer 3: Hex grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`${patternId}Hex`}
              width="100"
              height="86.6"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 93.3 25 L 93.3 75 L 50 100 L 6.7 75 L 6.7 25 Z"
                fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId}Hex)`}>
            <animateTransform
              attributeName="transform" type="translate"
              values="0 0; 100 86.6" dur="45s" repeatCount="indefinite"
            />
          </rect>
        </svg>

        {/* Layer 4: Accent-tinted cross-grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`${patternId}Acc`}
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="60" x2="120" y2="60" stroke={hexToRgba(accent, 0.07)} strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="120" stroke={hexToRgba(accent, 0.07)} strokeWidth="0.5" />
              <circle cx="60" cy="60" r="1.5" fill={hexToRgba(accent, 0.12)} />
              <circle cx="0"  cy="0"  r="1"   fill={hexToRgba(accent, 0.08)} />
              <circle cx="120" cy="0" r="1"   fill={hexToRgba(accent, 0.08)} />
              <circle cx="0" cy="120" r="1"   fill={hexToRgba(accent, 0.08)} />
              <circle cx="120" cy="120" r="1" fill={hexToRgba(accent, 0.08)} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId}Acc)`}>
            <animateTransform
              attributeName="transform" type="translate"
              values="0 0; 0 120" dur="30s" repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-[15%] right-[20%] w-[700px] h-[700px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.18)} 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-[25%] left-[8%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(accent, 0.1)} 0%, transparent 65%)`,
        }}
      />

      {/* Floating dots — desktop only */}
      <div className="hidden md:block">
        {FLOATING_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              background: hexToRgba(accent, 0.4 + (i % 5) * 0.08),
              boxShadow: `0 0 ${dot.size * 4}px ${hexToRgba(accent, 0.5)}, 0 0 ${dot.size * 8}px ${hexToRgba(accent, 0.2)}`,
            }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -14, 0] }}
            transition={{
              duration: dot.speed,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #16212e 100%)",
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-[1440px] mx-auto px-8 md:px-16 pt-40 md:pt-48 pb-8 md:pb-28">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span
            className="inline-block px-4 py-1.5 border rounded-full text-[10px] tracking-[0.35em] uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: accent,
              borderColor: hexToRgba(accent, 0.4),
            }}
          >
            {label}
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden pb-[0.15em] mb-2">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-[clamp(1.75rem,5.5vw,6rem)] leading-[1.15] tracking-[-0.02em] font-light max-w-4xl"
          >
            {heading}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-white/90 text-sm md:text-base tracking-[0.12em] uppercase mt-8 max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col gap-3 mt-10 w-full max-w-sm"
          >
            {/* Section label */}
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.25rem",
            }}>
              How would you like to proceed?
            </p>

            {primaryCta && (
              <Link
                to={primaryCta.to}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300"
                style={{
                  border: `1px solid ${hexToRgba(accent, 0.35)}`,
                  background: hexToRgba(accent, 0.06),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hexToRgba(accent, 0.12);
                  e.currentTarget.style.borderColor = hexToRgba(accent, 0.65);
                  e.currentTarget.style.boxShadow = `0 0 24px ${hexToRgba(accent, 0.12)}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = hexToRgba(accent, 0.06);
                  e.currentTarget.style.borderColor = hexToRgba(accent, 0.35);
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex flex-col gap-1">
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: accent,
                  }}>
                    {primaryCta.label}
                  </span>
                  {primaryCta.description && (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0",
                      textTransform: "none",
                    }}>
                      {primaryCta.description}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} style={{ color: accent, flexShrink: 0 }} />
              </Link>
            )}

            {secondaryCta && (
              <Link
                to={secondaryCta.to}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                }}
              >
                <div className="flex flex-col gap-1">
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                  }}>
                    {secondaryCta.label}
                  </span>
                  {secondaryCta.description && (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0",
                      textTransform: "none",
                    }}>
                      {secondaryCta.description}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} style={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}