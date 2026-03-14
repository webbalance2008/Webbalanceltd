import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, X, Plus } from "lucide-react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import { getServiceColors, type ServiceKey } from "../utils/serviceColors";

export interface FeatureModal {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  modal?: FeatureModal;
}

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

interface Stat {
  value: string;
  label: string;
  modal?: {
    heading: string;
    body: string;
    bullets?: string[];
  };
}

export interface ServicePageProps {
  serviceType: ServiceKey;
  label: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroColor?: string;
  intro: string;
  features?: Feature[];
  stats?: Stat[];
  process?: {
    step: string;
    title: string;
    description: string;
    modal?: FeatureModal;
  }[];
  pricing?: PricingTier[];
  ctaTitle?: string;
  ctaPath?: string;
  ctaLabel?: string;
  children?: React.ReactNode;
}

export function ServicePageLayout({
  serviceType,
  label,
  title,
  subtitle,
  heroImage,
  heroColor,
  intro,
  features,
  stats,
  process,
  pricing,
  ctaTitle = "Ready to get started?",
  ctaPath = "/contact",
  ctaLabel = "Start Your Project",
  children,
}: ServicePageProps) {
  const colors = getServiceColors(serviceType);
  const effectiveHeroColor = heroColor || colors.dark;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#16212e",
      }}
    >
      {/* ─── HERO ─── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.8) 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 0%, #16212e 100%)` }}
        />

        <div className="relative h-full flex flex-col justify-end max-w-[1440px] mx-auto px-8 md:px-16 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
            className="text-xs tracking-[0.35em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
            {label}
          </motion.p>
          <div className="overflow-hidden pb-[0.2em]">
            <motion.h1
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-light"
            >
              {title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm tracking-[0.2em] uppercase mt-4 max-w-lg"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <IntroSection text={intro} colors={colors} />

      {/* ─── STATS ─── */}
      {stats && stats.length > 0 && <StatsSection stats={stats} colors={colors} />}

      {/* ─── FEATURES ─── */}
      {features && features.length > 0 && <FeaturesSection features={features} colors={colors} />}

      {/* ─── PROCESS ─── */}
      {process && process.length > 0 && <ProcessSection steps={process} colors={colors} />}

      {/* ─── PRICING ─── */}
      {pricing && pricing.length > 0 && <PricingSection tiers={pricing} colors={colors} />}

      {/* ─── CUSTOM CHILDREN ─── */}
      {children}

      {/* ─── CTA ─── */}
      <CtaSection title={ctaTitle} path={ctaPath} label={ctaLabel} colors={colors} />
    </div>
  );
}

/* ── Sub-sections ──────────────────────────────────────── */

function IntroSection({ text, colors }: { text: string; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3"
          >
            <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
            What We Do
          </motion.p>
        </div>
        <div className="md:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white/80 text-2xl md:text-3xl leading-relaxed"
          >
            {text}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ stats, colors }: { stats: { value: string; label: string; modal?: { heading: string; body: string; bullets?: string[] } }[]; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [activeStat, setActiveStat] = useState<typeof stats[0] | null>(null);

  useEffect(() => {
    if (activeStat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeStat]);

  return (
    <>
      <section className="py-20 border-b border-white/5">
        <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const hasModal = !!s.modal;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                onClick={() => hasModal && setActiveStat(s)}
                className={`border p-6 transition-all duration-300 relative ${hasModal ? "cursor-pointer" : ""}`}
                style={{
                  borderColor: `rgba(${colors.rgb}, 0.4)`,
                  backgroundColor: `rgba(${colors.rgb}, 0.06)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.5)`;
                  e.currentTarget.style.backgroundColor = `rgba(${colors.rgb}, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.4)`;
                  e.currentTarget.style.backgroundColor = `rgba(${colors.rgb}, 0.06)`;
                }}
              >
                <div
                  style={{ fontFamily: "'Montserrat', sans-serif", color: colors.primary }}
                  className="text-4xl mb-2"
                >
                  {s.value}
                </div>
                <div
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/50 text-xs tracking-[0.15em] uppercase"
                >
                  {s.label}
                </div>
                {hasModal && (
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
                      className="text-[10px] tracking-[0.2em] uppercase"
                    >
                      Learn more
                    </span>
                    <Plus size={11} style={{ color: colors.primary }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {activeStat && activeStat.modal && (
          <StatModalOverlay
            stat={activeStat}
            onClose={() => setActiveStat(null)}
            colors={colors}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function StatModalOverlay({
  stat,
  onClose,
  colors,
}: {
  stat: { value: string; label: string; modal?: { heading: string; body: string; bullets?: string[] } };
  onClose: () => void;
  colors: ReturnType<typeof getServiceColors>;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-[201] flex items-center justify-center px-4 md:px-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#1d2d3e] border border-white/10 w-full max-w-xl pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="h-[1px] w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
            }}
          />
          <div className="p-8 md:p-12">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border text-white/30 hover:text-white transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.4)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {/* Large stat value as display element */}
            <div
              style={{ fontFamily: "'Montserrat', sans-serif", color: colors.primary }}
              className="text-6xl mb-1 font-light"
            >
              {stat.value}
            </div>
            <p
              style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${colors.rgb}, 0.6)` }}
              className="text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2"
            >
              <span className="w-4 h-px" style={{ backgroundColor: `rgba(${colors.rgb}, 0.6)` }} />
              {stat.label}
            </p>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-2xl md:text-3xl mb-5 leading-tight font-light"
            >
              {stat.modal?.heading}
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/50 text-sm leading-relaxed mb-6"
            >
              {stat.modal?.body}
            </p>

            {stat.modal?.bullets && stat.modal.bullets.length > 0 && (
              <ul className="space-y-2.5 mb-8">
                {stat.modal.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: colors.primary }} className="text-[10px] mt-1.5 flex-shrink-0">✦</span>
                    <span
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/50 text-sm leading-relaxed"
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 px-6 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Work With Us
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Feature Card + Modal ───────────────────────────────── */

function FeaturesSection({ features, colors }: { features: Feature[]; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  useEffect(() => {
    if (activeFeature) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeFeature]);

  return (
    <>
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-12"
          >
            <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
            What's Included
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const hasModal = !!f.modal;
              return (
                <motion.div
                   key={f.title}
                   initial={{ opacity: 0, y: 30 }}
                   animate={inView ? { opacity: 1, y: 0 } : {}}
                   transition={{ delay: i * 0.08 }}
                   onClick={() => hasModal && setActiveFeature(f)}
                   className={`border p-8 transition-all duration-300 group relative ${
                     hasModal ? "cursor-pointer" : ""
                   }`}
                   style={{
                     borderColor: `rgba(${colors.rgb}, 0.4)`,
                     backgroundColor: `rgba(${colors.rgb}, 0.06)`,
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.5)`;
                     e.currentTarget.style.backgroundColor = `rgba(${colors.rgb}, 0.08)`;
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.4)`;
                     e.currentTarget.style.backgroundColor = `rgba(${colors.rgb}, 0.06)`;
                   }}
                 >
                  <div
                    className="mb-6 inline-flex items-center justify-center w-12 h-12 border transition-colors duration-300"
                    style={{ borderColor: `rgba(${colors.rgb}, 0.5)` }}
                    onMouseEnter={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent?.classList.contains("group")) {
                        e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.7)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.5)`;
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.25}
                      style={{ color: colors.primary }}
                      className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-white text-xl mb-3 transition-colors"
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 text-sm leading-relaxed"
                  >
                    {f.description}
                  </p>

                  {hasModal && (
                    <div className="mt-6 flex items-center gap-2">
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
                        className="text-[10px] tracking-[0.2em] uppercase"
                      >
                        Learn more
                      </span>
                      <Plus size={11} style={{ color: colors.primary }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeFeature && (
          <FeatureModalOverlay
            feature={activeFeature}
            onClose={() => setActiveFeature(null)}
            colors={colors}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureModalOverlay({
  feature,
  onClose,
  colors,
}: {
  feature: Feature;
  onClose: () => void;
  colors: ReturnType<typeof getServiceColors>;
}) {
  const Icon = feature.icon;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-0 z-[201] flex items-center justify-center px-4 md:px-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#1d2d3e] border border-white/10 w-full max-w-xl pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="h-[1px] w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
            }}
          />

          <div className="p-8 md:p-12">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border border-white/10 text-white/30 hover:text-white transition-all"
              style={{
                borderColor: undefined,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div
              className="mb-7 inline-flex items-center justify-center w-14 h-14 border"
              style={{ borderColor: `rgba(${colors.rgb}, 0.4)` }}
            >
              <Icon size={22} strokeWidth={1.25} style={{ color: colors.primary }} />
            </div>

            <p
              style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
              className="text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
            >
              <span className="w-4 h-px" style={{ backgroundColor: colors.primary }} />
              {feature.title}
            </p>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-2xl md:text-3xl mb-5 leading-tight font-light"
            >
              {feature.modal?.heading ?? feature.title}
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/50 text-sm leading-relaxed mb-6"
            >
              {feature.modal?.body ?? feature.description}
            </p>

            {feature.modal?.bullets && feature.modal.bullets.length > 0 && (
              <ul className="space-y-2.5 mb-8">
                {feature.modal.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: colors.primary }} className="text-[10px] mt-1.5 flex-shrink-0">✦</span>
                    <span
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/50 text-sm leading-relaxed"
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 px-6 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Discuss This With Us
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Process ────────────────────────────────────────────── */

function ProcessSection({ steps, colors }: { steps: { step: string; title: string; description: string; modal?: FeatureModal }[]; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [activeStep, setActiveStep] = useState<typeof steps[0] | null>(null);

  useEffect(() => {
    if (activeStep) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeStep]);

  return (
    <>
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-12"
          >
            <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
            Our Process
          </motion.p>
          <div className="space-y-0">
            {steps.map((s, i) => {
              const hasModal = !!s.modal;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => hasModal && setActiveStep(s)}
                  className={`grid grid-cols-12 gap-8 py-8 border-b border-white/5 last:border-b-0 group transition-all duration-300 relative overflow-hidden ${hasModal ? "cursor-pointer" : ""}`}
                  style={{ borderLeftWidth: "2px", borderLeftColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = colors.primary;
                    e.currentTarget.style.backgroundColor = `rgba(${colors.rgb}, 0.05)`;
                    e.currentTarget.style.paddingLeft = "1.5rem";
                    const h3 = e.currentTarget.querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = "transparent";
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.paddingLeft = "";
                    const h3 = e.currentTarget.querySelector("h3");
                    if (h3) (h3 as HTMLElement).style.color = "white";
                  }}
                >
                  {/* Step number */}
                  <div className="col-span-2 md:col-span-1 flex items-start pt-1">
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: colors.primary,
                        opacity: 0.45,
                        transition: "opacity 0.3s",
                      }}
                      className="text-xs tracking-widest group-hover:!opacity-100"
                    >
                      {s.step}
                    </span>
                  </div>

                  {/* Title + Learn more */}
                  <div className="col-span-10 md:col-span-4 flex flex-col justify-between gap-3">
                    <h3
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "white",
                        transition: "color 0.3s",
                      }}
                      className="text-2xl"
                    >
                      {s.title}
                    </h3>
                    {hasModal && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
                          className="text-[10px] tracking-[0.2em] uppercase"
                        >
                          Learn more
                        </span>
                        <Plus size={11} style={{ color: colors.primary }} />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-span-12 md:col-span-7">
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300"
                    >
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeStep && activeStep.modal && (
          <ProcessModalOverlay
            step={activeStep}
            onClose={() => setActiveStep(null)}
            colors={colors}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProcessModalOverlay({
  step,
  onClose,
  colors,
}: {
  step: { step: string; title: string; description: string; modal?: FeatureModal };
  onClose: () => void;
  colors: ReturnType<typeof getServiceColors>;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-[201] flex items-center justify-center px-4 md:px-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#1d2d3e] border border-white/10 w-full max-w-xl pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent line */}
          <div
            className="h-[1px] w-full"
            style={{ background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)` }}
          />

          <div className="p-8 md:p-12">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border text-white/30 hover:text-white transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${colors.rgb}, 0.4)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {/* Step badge */}
            <p
              style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
              className="text-[10px] tracking-[0.35em] uppercase mb-3 flex items-center gap-3"
            >
              <span className="w-4 h-px" style={{ backgroundColor: colors.primary }} />
              Step {step.step}
            </p>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-2xl md:text-3xl mb-5 leading-tight font-light"
            >
              {step.modal?.heading ?? step.title}
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/50 text-sm leading-relaxed mb-6"
            >
              {step.modal?.body ?? step.description}
            </p>

            {step.modal?.bullets && step.modal.bullets.length > 0 && (
              <ul className="space-y-2.5 mb-8">
                {step.modal.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: colors.primary }} className="text-[10px] mt-1.5 flex-shrink-0">✦</span>
                    <span
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/50 text-sm leading-relaxed"
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 px-6 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Start Your Project
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Pricing ────────────────────────────────────────────── */

function PricingSection({ tiers, colors }: { tiers: PricingTier[]; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
          className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
        >
          <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
          Packages & Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-3xl md:text-4xl mb-12 font-light"
        >
          Transparent Pricing
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-8 border relative"
              style={{
                borderColor: tier.highlight ? `rgba(${colors.rgb}, 0.5)` : "rgba(255, 255, 255, 0.05)",
                backgroundColor: tier.highlight ? `rgba(${colors.rgb}, 0.05)` : "transparent",
              }}
            >
              {tier.highlight && (
                <div
                  style={{ fontFamily: "'DM Mono', monospace", backgroundColor: colors.primary }}
                  className="absolute -top-3 left-8 text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase px-3 py-1"
                >
                  Most Popular
                </div>
              )}
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4"
              >
                {tier.name}
              </p>
              <div
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-4xl mb-1"
              >
                {tier.price}
                {tier.period && (
                  <span className="text-lg text-white/30 ml-1">{tier.period}</span>
                )}
              </div>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/40 text-sm mb-8 mt-3 leading-relaxed"
              >
                {tier.description}
              </p>
              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-white/50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span style={{ color: colors.primary }} className="mt-0.5 flex-shrink-0">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────── */

function CtaSection({ title, path, label, colors }: { title: string; path: string; label: string; colors: ReturnType<typeof getServiceColors> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-32">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-3xl md:text-5xl mb-8 font-light"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <Link
            to={path}
            className="inline-flex items-center gap-3 px-8 py-4 border text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              borderColor: colors.primary,
              color: colors.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.primary;
            }}
          >
            {label}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}