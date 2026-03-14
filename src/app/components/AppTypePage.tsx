import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

/* ── Purple palette constants ─────────────────────────────── */
const ACC       = "#b89fd4";
const ACC_50    = "rgba(184,159,212,0.5)";
const ACC_35    = "rgba(184,159,212,0.35)";
const ACC_25    = "rgba(184,159,212,0.25)";
const ACC_20    = "rgba(184,159,212,0.2)";
const ACC_10    = "rgba(184,159,212,0.1)";
const ACC_08    = "rgba(184,159,212,0.08)";
const ACC_05    = "rgba(184,159,212,0.05)";
const BG_PAGE   = "#16212e";
const BG_CARD   = "#1a2840";   /* elevated panel */
const BG_CARD_HOV = "#243245"; /* panel hover */
const BG_HERO_FADE = "#16212e";

export interface AppTypeIndustry {
  name: string;
  description: string;
}

export interface AppTypeFeature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface AppTypeProcess {
  step: string;
  title: string;
  description: string;
}

export interface AppTypeRelated {
  label: string;
  title: string;
  description: string;
  path: string;
}

export interface AppTypePageProps {
  label: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroColor?: string;
  overview: string;
  overviewDetail: string;
  features: AppTypeFeature[];
  industries: AppTypeIndustry[];
  included: string[];
  process: AppTypeProcess[];
  related: AppTypeRelated[];
  ctaTitle?: string;
}

export function AppTypePage({
  label,
  title,
  subtitle,
  heroImage,
  heroColor = BG_HERO_FADE,
  overview,
  overviewDetail,
  features,
  industries,
  included,
  process,
  related,
  ctaTitle = "Ready to build something remarkable?",
}: AppTypePageProps) {
  return (
    <div className="min-h-screen" style={{ background: BG_PAGE }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${heroColor}f0 0%, ${heroColor}80 50%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #16212e 0%, rgba(22,33,46,0.25) 50%, transparent 100%)" }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-28 left-8 md:left-16"
        >
          <Link
            to="/web-apps"
            className="flex items-center gap-3 transition-colors group"
            style={{ color: ACC_35 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACC; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ACC_35; }}
          >
            <ArrowRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Web Apps</span>
          </Link>
        </motion.div>

        <div className="relative h-full flex flex-col justify-end max-w-[1440px] mx-auto px-8 md:px-16 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Mono', monospace", color: ACC }}
            className="text-xs tracking-[0.35em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px" style={{ backgroundColor: ACC }} />
            {label}
          </motion.p>
          <div className="overflow-hidden pb-[0.2em]">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em] max-w-3xl font-light"
            >
              {title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm tracking-[0.18em] uppercase mt-4 max-w-lg"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      <OverviewSection overview={overview} overviewDetail={overviewDetail} />
      <FeaturesSection features={features} />
      <IndustriesSection industries={industries} />
      <IncludedSection included={included} />
      <ProcessSection process={process} />
      {related.length > 0 && <RelatedSection related={related} />}
      <CtaSection title={ctaTitle} />
    </div>
  );
}

/* ── Shared label ─────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ fontFamily: "'DM Mono', monospace", color: ACC }}
      className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3"
    >
      <span className="w-6 h-px" style={{ backgroundColor: ACC }} />
      {children}
    </p>
  );
}

/* ── Overview ─────────────────────────────────────────────── */

function OverviewSection({ overview, overviewDetail }: { overview: string; overviewDetail: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-6">
            <SectionLabel>What It Is</SectionLabel>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white/85 text-2xl md:text-3xl leading-relaxed font-light"
          >
            {overview}
          </motion.p>
        </div>
        <div className="md:col-span-7 flex items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/45 text-base leading-[1.9]"
          >
            {overviewDetail}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────────── */

function FeaturesSection({ features }: { features: AppTypeFeature[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <SectionLabel>Core Capabilities</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                className="group"
              >
                <div
                  className="mb-5 inline-flex items-center justify-center w-11 h-11 border transition-colors duration-300"
                  style={{ borderColor: ACC_20 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_50; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_20; }}
                >
                  <Icon size={18} strokeWidth={1.25} style={{ color: ACC_50 }} className="opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3
                  style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
                  className="text-xl mb-3 group-hover:!text-[#b89fd4] transition-colors"
                >
                  {f.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm leading-relaxed">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Industries ───────────────────────────────────────────── */

function IndustriesSection({ industries }: { industries: AppTypeIndustry[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <SectionLabel>Who It's For</SectionLabel>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-4xl md:text-5xl mb-12 max-w-2xl leading-tight font-light"
        >
          Industries We Serve With This Solution
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: ACC_08 }}>
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="p-8 group transition-colors duration-300"
              style={{ backgroundColor: BG_CARD }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a2660"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BG_CARD; }}
            >
              <div className="flex items-start gap-4">
                <span className="text-[10px] mt-1 flex-shrink-0" style={{ color: ACC }}>✦</span>
                <div>
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
                    className="text-xl mb-2 group-hover:!text-[#b89fd4] transition-colors"
                  >
                    {ind.name}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/35 text-sm leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Included ─────────────────────────────────────────────── */

function IncludedSection({ included }: { included: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const half = Math.ceil(included.length / 2);
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
              <SectionLabel>Included As Standard</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-3xl md:text-4xl leading-tight font-light"
            >
              Everything You Need, Nothing You Don't
            </motion.h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
              {[included.slice(0, half), included.slice(half)].map((col, ci) => (
                <ul key={ci} className="space-y-0">
                  {col.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: (ci * half + i) * 0.05 }}
                      className="flex items-center gap-3 py-3.5"
                      style={{ borderBottom: `1px solid ${ACC_08}` }}
                    >
                      <Check size={12} strokeWidth={2} style={{ color: ACC }} className="flex-shrink-0" />
                      <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────────── */

function ProcessSection({ process }: { process: AppTypeProcess[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <SectionLabel>How We Build It</SectionLabel>
        </motion.div>
        <div className="space-y-0">
          {process.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-12 gap-8 py-10 group transition-colors duration-300"
              style={{ borderBottom: `1px solid ${ACC_08}`, borderLeft: "2px solid transparent" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = ACC;
                (e.currentTarget as HTMLElement).style.backgroundColor = ACC_05;
                (e.currentTarget as HTMLElement).style.paddingLeft = "1.5rem";
                const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                if (h3) h3.style.color = ACC;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.paddingLeft = "";
                const h3 = (e.currentTarget as HTMLElement).querySelector("h3");
                if (h3) h3.style.color = "white";
              }}
            >
              <div className="col-span-2 md:col-span-1">
                <span style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }} className="text-xs tracking-widest">
                  {s.step}
                </span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-2xl font-light">
                  {s.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300"
                >
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Related ──────────────────────────────────────────────── */

function RelatedSection({ related }: { related: AppTypeRelated[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10">
          <SectionLabel>Also Build With Us</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <motion.div key={r.path} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
              <Link
                to={r.path}
                className="block p-8 h-full group transition-all duration-300"
                style={{ border: `1px solid ${ACC_10}` }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = ACC_35;
                  (e.currentTarget as HTMLElement).style.backgroundColor = ACC_05;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = ACC_10;
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <p style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }} className="text-[10px] tracking-[0.3em] uppercase mb-3">
                  {r.label}
                </p>
                <h3
                  style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
                  className="text-xl mb-3 group-hover:!text-[#b89fd4] transition-colors leading-snug font-light"
                >
                  {r.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/30 text-sm leading-relaxed mb-5">
                  {r.description}
                </p>
                <div className="flex items-center gap-2 text-xs transition-colors duration-300" style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }}>
                  <span className="tracking-[0.15em] uppercase group-hover:text-[#b89fd4] transition-colors duration-300">Learn More</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */

function CtaSection({ title }: { title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <section className="py-32">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'DM Mono', monospace", color: ACC }}
          className="text-[10px] tracking-[0.3em] uppercase mb-6"
        >
          Ready to start?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-4xl md:text-6xl mb-10 max-w-3xl mx-auto font-light"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/web-apps/start"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif", backgroundColor: ACC, color: "#1a0f2e" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#cdb8e8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ACC; }}
          >
            Start Your Project
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif", border: `1px solid ${ACC_25}`, color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = ACC_50;
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = ACC_25;
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Book a Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}