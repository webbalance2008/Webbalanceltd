import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroDevices } from "./HeroDevices";
import { SolarSystem } from "./SolarSystem";
import { usePreloaderDone } from "../contexts/PreloaderContext";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { useEditMode } from "../contexts/EditModeContext";
import { EditableText } from "./admin/EditableText";

// Department colours — must match serviceColors.ts primary values
const DEPT_COLORS = [
  "#5ec4d4", // Web Design — soft teal-cyan
  "#b89fd4", // Web Apps — lavender purple
  "#3dd68c", // SEO — green
  "#f472b6", // Branding — pink-magenta
  "#f59e6a", // Hosting — warm orange
  "#00d4e8", // Support — brand cyan
];

const BRAND_CYAN = "#00d4e8";

// Plain text version of phase 0 body for use in inline editing
const PHASE0_BODY_STR =
  "For over 15 years, we have been providing professional, results-driven digital solutions — from web apps and websites to SEO, branding and strategy-led marketing.";

// ── All 7 headline phases ──────────────────────────────────────────────────────
// gradientColor: null = use brand cyan; string = fixed dept color
const PHASES = [
  {
    line1: "Digital",
    line2: "Experiences",
    line3: "That Convert",
    body: (
      <>
        For over 15 years, we have been providing professional, results-driven
        digital solutions — from web apps and websites to SEO, branding and
        strategy-led marketing.
      </>
    ),
    gradientColor: null, // brand cyan
    label: null,
    isInitial: true,
    cta: { label: "Start Your Project", href: "/start", secondary: null },
  },
  {
    line1: "Let's build something",
    line2: "extraordinary",
    line3: "together.",
    body: <>Ready to elevate your online presence? Tell us about your project and we'll get back to you within 24 hours.</>,
    gradientColor: null, // brand cyan
    label: null,
    cta: { label: "Start Your Project", href: "/start", secondary: null },
  },
  {
    line1: "Websites that",
    line2: "turn heads &",
    line3: "drive results.",
    body: <>Award-winning web design that blends stunning aesthetics with conversion-focused architecture — crafted to turn visitors into customers.</>,
    gradientColor: "#5ec4d4",
    label: "Web Design",
    cta: { label: "Explore Web Design", href: "/web-design", secondary: { label: "Start a Project", href: "/start/web-design" } },
  },
  {
    line1: "Web apps built",
    line2: "for your",
    line3: "business.",
    body: <>From client portals to complex platforms, we build powerful web applications tailored precisely to your workflows and growth ambitions.</>,
    gradientColor: "#b89fd4",
    label: "Web Apps",
    cta: { label: "Explore Web Apps", href: "/web-apps", secondary: { label: "Start a Project", href: "/start/web-apps" } },
  },
  {
    line1: "Rank higher.",
    line2: "Reach further.",
    line3: "Grow faster.",
    body: <>Data-led SEO strategies that put your business at the top of search results — and keep it there. More visibility, more traffic, more revenue.</>,
    gradientColor: "#3dd68c",
    label: "SEO",
    cta: { label: "Explore SEO", href: "/seo", secondary: { label: "Start a Project", href: "/start/seo" } },
  },
  {
    line1: "A brand identity",
    line2: "as bold as",
    line3: "your ambition.",
    body: <>Strategic brand design — from logo to full visual guidelines — that makes you instantly recognisable, memorable, and trusted.</>,
    gradientColor: "#f472b6",
    label: "Branding",
    cta: { label: "Explore Branding", href: "/branding", secondary: { label: "Start a Project", href: "/start/branding" } },
  },
  {
    line1: "Always on.",
    line2: "Always fast.",
    line3: "Always secure.",
    body: <>Managed hosting and dedicated ongoing support — so your website performs at its peak, every hour of every day.</>,
    gradientColor: "#f59e6a",
    label: "Hosting & Support",
    cta: { label: "Explore Hosting", href: "/hosting", secondary: { label: "Start a Project", href: "/start/hosting" } },
  },
] as const;

const TOTAL_PHASES = PHASES.length;

// ── Meteor configurations ──────────────────────────────────────────────────────
const METEOR_CONFIGS = [
  { top: "5%",   left: "-20%", dx: 1700, dy:  280, w: 320, h: 2,   dur: 1.5 },
  { top: "18%",  left: "-15%", dx: 1600, dy:  260, w: 280, h: 1.5, dur: 1.4 },
  { top: "40%",  left: "-18%", dx: 1650, dy:  220, w: 260, h: 1.5, dur: 1.3 },
  { top: "-5%",  left: "-8%",  dx: 1200, dy:  720, w: 360, h: 3,   dur: 1.8 },
  { top: "2%",   left: "-10%", dx: 1150, dy:  680, w: 320, h: 2.5, dur: 1.7 },
  { top: "-8%",  left: "10%",  dx: 1100, dy:  750, w: 340, h: 3,   dur: 1.9 },
  { top: "-8%",  left: "28%",  dx: 1050, dy:  700, w: 300, h: 2.5, dur: 1.8 },
  { top: "-10%", left: "5%",   dx:  600, dy: 1150, w: 220, h: 2,   dur: 2.1 },
  { top: "-10%", left: "22%",  dx:  540, dy: 1100, w: 200, h: 1.5, dur: 2.0 },
  { top: "-10%", left: "42%",  dx:  480, dy: 1200, w: 210, h: 2,   dur: 2.2 },
  { top: "-2%",  left: "-18%", dx: 1800, dy:  520, w: 460, h: 4,   dur: 1.4 },
  { top: "15%",  left: "-20%", dx: 1750, dy:  480, w: 440, h: 4,   dur: 1.4 },
  { top: "8%",   left: "-12%", dx: 1400, dy:  380, w: 160, h: 1.5, dur: 1.2 },
];

type MeteorConfig = typeof METEOR_CONFIGS[0];

// ── Gradient word helper ───────────────────────────────────────────────────────
function GradientWord({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <span className="relative inline-block">
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
        {text}
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${color} 0%, #ffffff 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {text}
      </span>
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────
export function Hero() {
  const contentBlocks = useContentBlocks("/");
  const { isEditMode } = useEditMode();
  const [meteorKey, setMeteorKey]             = useState(0);
  const [meteorActive, setMeteorActive]       = useState(false);
  const [meteorConfig, setMeteorConfig]       = useState<MeteorConfig>(METEOR_CONFIGS[1]);
  // Initialise synchronously so mobile never flickers through desktop path
  const [isMobile, setIsMobile]               = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [headlinePhase, setHeadlinePhase]     = useState(0);
  const [deviceCycleSignal, setDeviceCycleSignal] = useState(0);
  const meteorTimer      = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimeoutRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const phaseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isEditModeRef    = useRef(isEditMode);
  const ready = usePreloaderDone();

  // Keep ref in sync with isEditMode state
  useEffect(() => { isEditModeRef.current = isEditMode; }, [isEditMode]);

  // Freeze on phase 0 when edit mode activates
  useEffect(() => {
    if (isEditMode) setHeadlinePhase(0);
  }, [isEditMode]);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Cycle headline phases through all 7, advancing every 9s
  useEffect(() => {
    if (!ready) return;
    phaseTimeoutRef.current = setTimeout(() => {
      if (isEditModeRef.current) return; // don't start cycle if editing
      let p = 1;
      setHeadlinePhase(p);
      if (!isMobile) setDeviceCycleSignal((s) => s + 1);
      phaseIntervalRef.current = setInterval(() => {
        if (isEditModeRef.current) return; // skip tick if editing
        p = (p + 1) % TOTAL_PHASES;
        setHeadlinePhase(p);
        if (!isMobile) setDeviceCycleSignal((s) => s + 1);
      }, 9000);
    }, 5500);
    return () => {
      if (phaseTimeoutRef.current)  clearTimeout(phaseTimeoutRef.current);
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current);
    };
  }, [ready, isMobile]);

  // Large meteor every 5s — desktop only
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  // Derive current accent color from active phase
  const currentColor = PHASES[headlinePhase].gradientColor ?? BRAND_CYAN;

  return (
    <section className="relative flex flex-col justify-start pt-48 pb-40 md:pt-44 md:pb-56 overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #16212e 0%, #1d2d3e 60%, #16212e 100%)" }} />

      {/* Animated SVG Grid — desktop only */}
      <div className="absolute inset-0 opacity-40 hidden md:block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.4)" />
              <circle cx="60" cy="0" r="1.5" fill="rgba(255,255,255,0.4)" />
              <circle cx="0" cy="60" r="1.5" fill="rgba(255,255,255,0.4)" />
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)">
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 60" dur="20s" repeatCount="indefinite" />
          </rect>
        </svg>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="80" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" opacity="0.8">
            <animateTransform attributeName="transform" type="translate" values="0 0; 80 0" dur="30s" repeatCount="indefinite" />
          </rect>
        </svg>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPattern" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 93.3 25 L 93.3 75 L 50 100 L 6.7 75 L 6.7 25 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.6">
            <animateTransform attributeName="transform" type="translate" values="0 0; 100 86.6" dur="40s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      {/* Gradient orbs — fixed colors */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BRAND_CYAN}14 0%, transparent 70%)` }}
      />
      <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-[#b89fd4]/8 blur-[100px] pointer-events-none" />

      {/* Solar System — desktop only, fixed brand cyan */}
      <div className="hidden md:block">
        <SolarSystem accentColor={BRAND_CYAN} />
      </div>

      {/* Large Meteor — desktop only */}
      {!isMobile && (
      <MotionConfig reducedMotion="never">
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
              transition={{ duration: meteorConfig.dur, ease: "linear", times: [0, 0.05, 0.5, 1] }}
              onAnimationComplete={() => setMeteorActive(false)}
            >
              <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: `linear-gradient(to right, transparent 0%, ${currentColor}22 15%, ${currentColor}88 55%, white 88%, transparent 100%)`, borderRadius: 6, filter: "blur(0.5px)" }} />
              <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, borderRadius: "50%", background: "white", boxShadow: `0 0 12px 6px white, 0 0 30px 14px ${currentColor}, 0 0 60px 24px ${currentColor}88`, filter: "blur(1px)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
      )}

      {/* Scattered accent dots — desktop only, each with a fixed individual color */}
      <div className="hidden md:block">
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
        ].map((dot, i) => {
          const dotColor = DEPT_COLORS[i % DEPT_COLORS.length];
          return (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.8, 1] }}
              transition={{ duration: dot.speed, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: dot.size, height: dot.size,
                top: dot.top, left: dot.left,
                background: dotColor,
                boxShadow: `0 0 ${dot.size * 5}px ${dotColor}`,
              }}
            />
          );
        })}
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">

          {/* ── Left: Text ── */}
          <div className="flex-1 lg:pr-8">
            {isMobile ? (
              /* ── MOBILE: CSS-only phase cycling, zero Motion overhead ── */
              <div className="relative">
                {/* Hidden spacer — keeps layout stable across all phases */}
                <div aria-hidden style={{ visibility: "hidden", pointerEvents: "none" }}>
                  <div style={{ height: "1.5rem", marginBottom: "1rem" }} />
                  <div style={{ lineHeight: 1.15 }} className="text-[clamp(2.25rem,5.5vw,6rem)]">Digital</div>
                  <div style={{ lineHeight: 1.15 }} className="text-[clamp(2.25rem,5.5vw,6rem)]">Experiences</div>
                  <div style={{ lineHeight: 1.15, paddingBottom: "0.2em" }} className="text-[clamp(2.25rem,5.5vw,6rem)]">That Convert</div>
                  <div style={{ marginTop: "2rem" }} className="text-sm leading-relaxed max-w-lg">
                    For over 15 years, we have been providing professional, results-driven
                    digital solutions — from web apps and websites to SEO, branding and
                    strategy-led marketing.
                  </div>
                  <div style={{ marginTop: "3rem", height: "2.5rem" }} />
                </div>

                {/* All phases rendered, only the active one visible via CSS transition */}
                {PHASES.map((phase, idx) => {
                  const isActive = headlinePhase === idx;
                  const gradColor = phase.gradientColor ?? BRAND_CYAN;
                  // Apply Supabase content overrides for phase 0 (default/initial state)
                  const line1 = idx === 0 ? (contentBlocks?.get("h1_0") ?? phase.line1) : phase.line1;
                  const line2 = idx === 0 ? (contentBlocks?.get("h1_1") ?? phase.line2) : phase.line2;
                  const line3 = idx === 0 ? (contentBlocks?.get("h1_2") ?? phase.line3) : phase.line3;
                  const bodyOverride = idx === 0 ? contentBlocks?.get("p_0") : undefined;

                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(12px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      {/* Department label */}
                      <div style={{ height: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                        {phase.label && (
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: gradColor,
                              border: `1px solid ${gradColor}55`,
                              borderRadius: "999px",
                              padding: "0.2em 0.75em",
                            }}
                          >
                            {phase.label}
                          </span>
                        )}
                      </div>

                      {/* Line 1 */}
                      <div style={{ lineHeight: 1.15 }}>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                          className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                          {idx === 0 ? <EditableText blockId="h1_0" resolved={line1} as="span" /> : line1}
                        </span>
                      </div>

                      {/* Line 2 */}
                      <div style={{ lineHeight: 1.15 }}>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                          className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                          {idx === 0 ? <EditableText blockId="h1_1" resolved={line2} as="span" /> : line2}
                        </span>
                      </div>

                      {/* Line 3 — gradient */}
                      <div style={{ lineHeight: 1.15, paddingBottom: "0.2em" }}>
                        <h1 style={{ fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.15 }}
                          className="text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                          {idx === 0 && isEditMode ? (
                            <EditableText blockId="h1_2" resolved={line3} as="span" style={{ color: gradColor }} />
                          ) : (
                            <GradientWord text={line3} color={gradColor} />
                          )}
                        </h1>
                      </div>

                      {/* Body copy */}
                      <p style={{ fontFamily: "'Inter', sans-serif", marginTop: "2rem" }}
                        className="text-white/60 text-sm tracking-[0.3em] uppercase leading-relaxed max-w-lg">
                        {idx === 0
                          ? <EditableText blockId="p_0" resolved={bodyOverride ?? PHASE0_BODY_STR} as="span" multiline />
                          : (bodyOverride ?? phase.body)
                        }
                      </p>

                      {/* CTA */}
                      <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <Link
                          to={phase.cta.href}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.7rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.7em 1.4em",
                            borderRadius: "999px",
                            border: `1px solid ${gradColor}`,
                            color: gradColor,
                            background: `${gradColor}12`,
                            textDecoration: "none",
                          }}
                        >
                          {phase.cta.label}
                          <ArrowRight size={11} />
                        </Link>
                        {"secondary" in phase.cta && phase.cta.secondary && (
                          <Link
                            to={phase.cta.secondary.href}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.7rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.7em 1.4em",
                              borderRadius: "999px",
                              border: "1px solid rgba(255,255,255,0.18)",
                              color: "rgba(255,255,255,0.55)",
                              background: "transparent",
                              textDecoration: "none",
                            }}
                          >
                            {phase.cta.secondary.label}
                            <ArrowRight size={11} />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
            <MotionConfig reducedMotion="never">
              <div className="relative">

                {/* ── Hidden spacer (phase 0 content — tallest body copy) ── */}
                <div aria-hidden style={{ visibility: "hidden", pointerEvents: "none" }}>
                  {/* label placeholder (matches dept phases) */}
                  <div style={{ height: "1.5rem", marginBottom: "1rem" }} />
                  <div style={{ lineHeight: 1.15 }} className="text-[clamp(2.25rem,5.5vw,6rem)]">Digital</div>
                  <div style={{ lineHeight: 1.15 }} className="text-[clamp(2.25rem,5.5vw,6rem)]">Experiences</div>
                  <div style={{ lineHeight: 1.15, paddingBottom: "0.2em" }} className="text-[clamp(2.25rem,5.5vw,6rem)]">That Convert</div>
                  <div style={{ marginTop: "2rem" }} className="text-sm leading-relaxed max-w-lg">
                    For over 15 years, we have been providing professional, results-driven
                    digital solutions — from web apps and websites to SEO, branding and
                    strategy-led marketing.
                  </div>
                  {/* CTA row spacer */}
                  <div style={{ marginTop: "3rem", height: "2.5rem" }} />
                </div>

                {/* ── Phases rendered dynamically ── */}
                {PHASES.map((phase, idx) => {
                  const isActive = headlinePhase === idx;
                  const gradColor = phase.gradientColor ?? BRAND_CYAN;
                  // Apply Supabase content overrides for phase 0
                  const line1 = idx === 0 ? (contentBlocks?.get("h1_0") ?? phase.line1) : phase.line1;
                  const line2 = idx === 0 ? (contentBlocks?.get("h1_1") ?? phase.line2) : phase.line2;
                  const line3 = idx === 0 ? (contentBlocks?.get("h1_2") ?? phase.line3) : phase.line3;
                  const bodyOverride = idx === 0 ? contentBlocks?.get("p_0") : undefined;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: idx === 0 ? 0 : 14 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : (idx < headlinePhase ? -14 : 14),
                      }}
                      transition={{
                        duration: isActive ? 2.0 : 1.6,
                        delay: isActive ? 0.8 : 0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      {/* Department label (phases 2–6) */}
                      <div style={{ height: "1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                        {phase.label && (
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: gradColor,
                              border: `1px solid ${gradColor}55`,
                              borderRadius: "999px",
                              padding: "0.2em 0.75em",
                              transition: "color 0.6s ease, border-color 0.6s ease",
                            }}
                          >
                            {phase.label}
                          </span>
                        )}
                      </div>

                      {/* Line 1 */}
                      {phase.isInitial ? (
                        <div style={{ overflow: "hidden", lineHeight: 1.15 }}>
                          <motion.span
                            initial={{ y: "105%", opacity: 0 }}
                            animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                            transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                            className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                          >
                            <EditableText blockId="h1_0" resolved={line1} as="span" />
                          </motion.span>
                        </div>
                      ) : (
                        <div style={{ lineHeight: 1.15 }}>
                          <span style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                            className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                            {line1}
                          </span>
                        </div>
                      )}

                      {/* Line 2 */}
                      {phase.isInitial ? (
                        <div style={{ overflow: "hidden", lineHeight: 1.15 }}>
                          <motion.span
                            initial={{ y: "105%", opacity: 0 }}
                            animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                            className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                          >
                            <EditableText blockId="h1_1" resolved={line2} as="span" />
                          </motion.span>
                        </div>
                      ) : (
                        <div style={{ lineHeight: 1.15 }}>
                          <span style={{ fontFamily: "'Montserrat', sans-serif", display: "block", lineHeight: 1.15 }}
                            className="text-white text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                            {line2}
                          </span>
                        </div>
                      )}

                      {/* Line 3 — gradient word */}
                      {phase.isInitial ? (
                        <div style={{ overflow: "hidden", lineHeight: 1.15, paddingBottom: "0.2em" }}>
                          <motion.h1
                            initial={{ y: "105%", opacity: 0 }}
                            animate={ready ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                            transition={{ duration: 1, delay: 0.31, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.15 }}
                            className="text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light"
                          >
                            {isEditMode ? (
                              <EditableText blockId="h1_2" resolved={line3} as="span" style={{ color: gradColor }} />
                            ) : (
                              <GradientWord text={line3} color={gradColor} />
                            )}
                          </motion.h1>
                        </div>
                      ) : (
                        <div style={{ lineHeight: 1.15, paddingBottom: "0.2em" }}>
                          <h1 style={{ fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.15 }}
                            className="text-[clamp(2.25rem,5.5vw,6rem)] tracking-[-0.02em] font-light">
                            <GradientWord text={line3} color={gradColor} />
                          </h1>
                        </div>
                      )}

                      {/* Body copy */}
                      {phase.isInitial ? (
                        <motion.p
                          initial={{ opacity: 0, y: 22 }}
                          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          style={{ fontFamily: "'Inter', sans-serif", marginTop: "2rem" }}
                          className="text-white/60 text-sm tracking-[0.3em] uppercase leading-relaxed max-w-lg"
                        >
                          <EditableText blockId="p_0" resolved={bodyOverride ?? PHASE0_BODY_STR} as="span" multiline />
                        </motion.p>
                      ) : (
                        <p style={{ fontFamily: "'Inter', sans-serif", marginTop: "2.5rem" }}
                          className="text-white/60 text-sm tracking-[0.3em] uppercase leading-relaxed max-w-lg">
                          {bodyOverride ?? phase.body}
                        </p>
                      )}

                      {/* Call to action */}
                      <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        {/* Primary CTA */}
                        <Link
                          to={phase.cta.href}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.7rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.7em 1.4em",
                            borderRadius: "999px",
                            border: `1px solid ${gradColor}`,
                            color: gradColor,
                            background: `${gradColor}12`,
                            backdropFilter: "blur(4px)",
                            transition: "background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
                            textDecoration: "none",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = `${gradColor}28`;
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${gradColor}33`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = `${gradColor}12`;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          {phase.cta.label}
                          <ArrowRight size={11} />
                        </Link>

                        {/* Secondary CTA (dept phases only) */}
                        {"secondary" in phase.cta && phase.cta.secondary && (
                          <Link
                            to={phase.cta.secondary.href}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.7rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.7em 1.4em",
                              borderRadius: "999px",
                              border: "1px solid rgba(255,255,255,0.18)",
                              color: "rgba(255,255,255,0.55)",
                              background: "transparent",
                              transition: "border-color 0.3s ease, color 0.3s ease",
                              textDecoration: "none",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
                              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                            }}
                          >
                            {phase.cta.secondary.label}
                            <ArrowRight size={11} />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </MotionConfig>
            )}
          </div>

          {/* ── Right: Devices ── */}
          <div className="hidden lg:block flex-1 relative" style={{ height: 520 }}>
            <HeroDevices accentColor={currentColor} cycleSignal={deviceCycleSignal} />
          </div>

        </div>
      </div>

    </section>
  );
}