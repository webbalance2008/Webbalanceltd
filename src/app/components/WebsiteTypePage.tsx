import { DepartmentHero } from "./DepartmentHero";
import { SEOHead } from "./SEOHead";
import { ArrowRight, Check, X, Plus } from "lucide-react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import type { ScreenLayout } from "./AppTypePage";
import { useIsMobile } from "../hooks/useIsMobile";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

/* ── Teal-cyan palette (Web Design department) ────────────── */
const ACC       = "#5ec4d4";
const ACC_50    = "rgba(94,196,212,0.5)";
const ACC_35    = "rgba(94,196,212,0.35)";
const ACC_25    = "rgba(94,196,212,0.25)";
const ACC_20    = "rgba(94,196,212,0.2)";
const ACC_10    = "rgba(94,196,212,0.1)";
const ACC_08    = "rgba(94,196,212,0.08)";
const ACC_05    = "rgba(94,196,212,0.05)";
const BG_PAGE   = "#16212e";
const BG_CARD   = "#1a2840";

export interface WebsiteTypeIndustry { name: string; description: string }
export interface WebsiteTypeFeature  { icon: LucideIcon; title: string; body: string }
export interface WebsiteTypeProcess  { step: string; title: string; description: string }
export interface WebsiteTypeRelated  { label: string; title: string; description: string; path: string }
export interface WebsiteConcept      { title: string; description: string; layout: ScreenLayout }

export interface WebsiteTypePageProps {
  label: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroColor?: string;
  overview: string;
  overviewDetail: string;
  features: WebsiteTypeFeature[];
  industries: WebsiteTypeIndustry[];
  included: string[];
  process: WebsiteTypeProcess[];
  related: WebsiteTypeRelated[];
  ctaTitle?: string;
  concepts?: WebsiteConcept[];
  seoPath?: string;
  seoKeywords?: string;
}

export function WebsiteTypePage({
  label, title, subtitle, heroImage, heroColor = BG_PAGE,
  overview, overviewDetail, features, industries, included, process, related,
  ctaTitle = "Ready to build something remarkable?",
  concepts,
  seoPath,
  seoKeywords,
}: WebsiteTypePageProps) {
  return (
    <div className="min-h-screen" style={{ background: BG_PAGE }}>
      <SEOHead
        title={`${title} — Web Design`}
        description={subtitle + ". " + overview}
        path={seoPath || `/web-design`}
        keywords={seoKeywords || `${title.toLowerCase()}, web design, UK, bespoke website`}
      />
      <DepartmentHero
        label={label}
        heading={<>{title.split(" ").slice(0, -1).join(" ")}{" "}<span style={{ color: ACC }}>{title.split(" ").slice(-1)[0]}</span>.</>}
        subtitle={subtitle}
        accent={ACC}
        primaryCta={{ label: "View Packages", to: "/web-design/packages" }}
        secondaryCta={{ label: "Start a Project", to: "/web-design/start" }}
        patternId={`wt-${label.replace(/\s+/g, "").slice(0, 6).toLowerCase()}`}
      />
      <OverviewSection overview={overview} overviewDetail={overviewDetail} />
      {concepts && concepts.length > 0 && <ConceptsSection concepts={concepts} />}
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
    <p style={{ fontFamily: "'DM Mono', monospace", color: ACC }} className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3">
      <span className="w-6 h-px" style={{ backgroundColor: ACC }} />
      {children}
    </p>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function OverviewSection({ overview, overviewDetail }: { overview: string; overviewDetail: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-5">
          <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-6"><SectionLabel>What It Is</SectionLabel></motion.div>
          <motion.p initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white/85 text-2xl md:text-3xl leading-relaxed font-light">{overview}</motion.p>
        </div>
        <div className="md:col-span-7 flex items-center">
          <motion.p initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/45 text-base leading-[1.9]">{overviewDetail}</motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── Concept Screens ──────────────────────────────────────── */
function ScreenWireframe({ layout }: { layout: ScreenLayout }) {
  const w = 280, h = 180;
  const accent = ACC, accLow = ACC_20, accVLow = ACC_08, line = ACC_10;
  const chrome = (
    <>
      <rect x="0" y="0" width={w} height={h} rx="6" fill="#0d1926" stroke={line} strokeWidth="1" />
      <rect x="0" y="0" width={w} height="20" rx="6" fill="#111e2e" />
      <rect x="0" y="14" width={w} height="6" fill="#111e2e" />
      <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.08)" />
      <circle cx="22" cy="10" r="3" fill="rgba(255,255,255,0.08)" />
      <circle cx="32" cy="10" r="3" fill="rgba(255,255,255,0.08)" />
      <rect x="80" y="6" width="120" height="8" rx="4" fill="rgba(255,255,255,0.04)" />
    </>
  );

  const layouts: Record<ScreenLayout, React.ReactNode> = {
    dashboard: (
      <>
        {chrome}
        {/* Nav bar */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {[0,1,2,3].map(i => <rect key={i} x={16 + i*50} y="29" width="30" height="4" rx="2" fill={i===0 ? ACC_25 : "rgba(255,255,255,0.06)"} />)}
        {/* Hero section */}
        <rect x="10" y="42" width={w-20} height="50" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="24" y="52" width="100" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="24" y="62" width="140" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        <rect x="24" y="70" width="60" height="10" rx="3" fill={accent} opacity="0.2" />
        <rect x="34" y="73" width="40" height="4" rx="2" fill={accent} opacity="0.5" />
        <rect x="190" y="48" width="70" height="38" rx="3" fill="#152030" />
        {/* Content cards */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={10 + i*88} y="100" width="82" height="72" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x={13 + i*88} y="103" width="76" height="30" rx="2" fill="#0d1926" />
            <rect x={16 + i*88} y="138" width="40" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x={16 + i*88} y="146" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x={16 + i*88} y="153" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x={16 + i*88} y="162" width="28" height="5" rx="2.5" fill={ACC_08} />
          </g>
        ))}
      </>
    ),
    calendar: (
      <>
        {chrome}
        {/* Nav */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {[0,1,2,3].map(i => <rect key={i} x={16 + i*50} y="29" width="30" height="4" rx="2" fill={i===0 ? ACC_25 : "rgba(255,255,255,0.06)"} />)}
        {/* Gallery grid */}
        {[0,1,2].map(r => [0,1,2,3].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={10 + c*66} y={42 + r*44} width="62" height="40" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x={12 + c*66} y={44 + r*44} width="58" height="24" rx="2" fill={`rgba(94,196,212,${0.03 + (r*4+c)*0.008})`} />
            <rect x={14 + c*66} y={72 + r*44} width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
            <rect x={14 + c*66} y={77 + r*44} width="20" height="2" rx="1" fill="rgba(255,255,255,0.03)" />
          </g>
        )))}
      </>
    ),
    form: (
      <>
        {chrome}
        {/* Two-col layout: form + image */}
        <rect x="10" y="28" width="140" height="146" rx="4" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="20" y="38" width="80" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="20" y="48" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="20" y={60 + i*24} width="30" height="3" rx="1.5" fill={ACC_25} />
            <rect x="20" y={68 + i*24} width="120" height="12" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
          </g>
        ))}
        <rect x="90" y="152" width="50" height="12" rx="3" fill={accent} opacity="0.2" />
        <rect x="100" y="155" width="30" height="5" rx="2" fill={accent} opacity="0.5" />
        {/* Right image */}
        <rect x="158" y="28" width="112" height="146" rx="4" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="162" y="32" width="104" height="90" rx="3" fill="#0d1926" />
        <rect x="162" y="128" width="60" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="162" y="136" width="90" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="162" y="143" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
      </>
    ),
    list: (
      <>
        {chrome}
        {/* Nav */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {/* Blog post list */}
        {[0,1,2,3].map(r => (
          <g key={r}>
            <rect x="10" y={42 + r*33} width={w-20} height="30" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            {/* Thumbnail */}
            <rect x="14" y={45 + r*33} width="36" height="24" rx="2" fill="#0d1926" />
            {/* Title + excerpt */}
            <rect x="56" y={47 + r*33} width="90" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="56" y={55 + r*33} width="150" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x="56" y={61 + r*33} width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.03)" />
            {/* Date */}
            <rect x={w-55} y={48 + r*33} width="35" height="3" rx="1.5" fill={ACC_10} />
          </g>
        ))}
      </>
    ),
    store: (
      <>
        {chrome}
        {/* Nav */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {[0,1,2,3].map(i => <rect key={i} x={16 + i*60} y="29" width="35" height="4" rx="2" fill={i===0? ACC_25:"rgba(255,255,255,0.06)"} />)}
        {/* Product grid */}
        {[0,1,2].map(r => [0,1,2].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={10 + c*90} y={42 + r*44} width="82" height="40" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x={13 + c*90} y={45 + r*44} width="76" height="18" rx="2" fill="#0d1926" />
            <rect x={13 + c*90} y={66 + r*44} width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
            <rect x={13 + c*90} y={72 + r*44} width="18" height="3" rx="1.5" fill={accent} opacity="0.4" />
            <rect x={65 + c*90} y={70 + r*44} width="20" height="7" rx="2" fill={ACC_10} />
          </g>
        )))}
      </>
    ),
    portal: (
      <>
        {chrome}
        {/* Sidebar */}
        <rect x="0" y="20" width="60" height={h-20} fill="#111e2e" />
        <circle cx="30" cy="38" r="10" fill={ACC_08} stroke={ACC_20} strokeWidth="0.5" />
        <rect x="14" y="54" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
        {[66,78,90,102,114].map(y => <rect key={y} x="10" y={y} width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />)}
        <rect x="10" y="78" width="40" height="3" rx="1.5" fill={ACC_25} />
        {/* Content */}
        {[0,1,2].map(i => <rect key={i} x={70 + i*50} y="28" width="40" height="8" rx="4" fill={i===0? ACC_10:"transparent"} />)}
        {[0,1].map(r => [0,1].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={70 + c*100} y={44 + r*60} width="92" height="52" rx="3" fill="#152030" stroke={line} strokeWidth="0.5" />
            <rect x={78 + c*100} y={52 + r*60} width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x={78 + c*100} y={60 + r*60} width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
            <rect x={78 + c*100} y={80 + r*60} width="30" height="6" rx="3" fill={ACC_08} />
          </g>
        )))}
      </>
    ),
    login: (
      <>
        {chrome}
        {/* Split layout: left brand + right form */}
        <rect x="0" y="20" width="120" height={h-20} fill="#111e2e" />
        <rect x="30" y="60" width="60" height="8" rx="3" fill={accent} opacity="0.15" />
        <rect x="20" y="75" width="80" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="25" y="83" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="30" y="95" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.03)" />
        {/* Right side CTA / signup */}
        <rect x="135" y="50" width="130" height="90" rx="4" fill="#152030" stroke={line} strokeWidth="0.5" />
        <rect x="155" y="62" width="60" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="150" y="75" width="100" height="12" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
        <rect x="150" y="93" width="100" height="12" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
        <rect x="150" y="115" width="100" height="14" rx="3" fill={accent} opacity="0.2" />
        <rect x="175" y="119" width="50" height="5" rx="2" fill={accent} opacity="0.5" />
      </>
    ),
    chat: (
      <>
        {chrome}
        {/* Nav */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {/* Hero with large heading */}
        <rect x="10" y="42" width={w-20} height="70" rx="3" fill={`rgba(94,196,212,0.04)`} />
        <rect x="30" y="55" width="120" height="8" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="40" y="68" width="100" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        <rect x="85" y="80" width="110" height="12" rx="6" fill={accent} opacity="0.15" />
        <rect x="105" y="83" width="70" height="5" rx="2" fill={accent} opacity="0.4" />
        {/* Features row */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={10 + i*67} y="120" width="62" height="52" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <circle cx={41 + i*67} cy="135" r="6" fill={ACC_08} stroke={ACC_10} strokeWidth="0.5" />
            <rect x={22 + i*67} y="146" width="38" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x={18 + i*67} y="154" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x={20 + i*67} y="160" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.03)" />
          </g>
        ))}
      </>
    ),
    analytics: (
      <>
        {chrome}
        {/* Nav */}
        <rect x="10" y="26" width={w-20} height="10" fill="#111e2e" />
        {/* Full-width hero image */}
        <rect x="10" y="42" width={w-20} height="55" rx="3" fill="#111e2e" />
        <rect x="10" y="42" width={w-20} height="55" rx="3" fill={`rgba(94,196,212,0.05)`} />
        {/* Menu items */}
        {[0,1,2].map(r => (
          <g key={r}>
            <rect x="10" y={105 + r*24} width={w-20} height="20" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x="18" y={109 + r*24} width="50" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="18" y={116 + r*24} width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x={w-55} y={110 + r*24} width="30" height="4" rx="2" fill={accent} opacity="0.35" />
          </g>
        ))}
      </>
    ),
    kanban: (
      <>
        {chrome}
        {/* Two-col: text left, image right */}
        <rect x="10" y="30" width="130" height="140" rx="3" fill="transparent" />
        <rect x="16" y="40" width="80" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="16" y="52" width="110" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="16" y="60" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="16" y="67" width="90" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="16" y="74" width="105" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="16" y="86" width="50" height="10" rx="3" fill={accent} opacity="0.2" />
        <rect x="22" y="89" width="38" height="4" rx="2" fill={accent} opacity="0.5" />
        {/* Testimonial */}
        <rect x="16" y="108" width="118" height="50" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="24" y="116" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
        <rect x="24" y="123" width="80" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        <circle cx="32" cy="143" r="6" fill={ACC_08} />
        <rect x="42" y="141" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
        {/* Right image */}
        <rect x="148" y="30" width="122" height="140" rx="4" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="152" y="34" width="114" height="132" rx="3" fill="#0d1926" />
      </>
    ),
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {layouts[layout]}
    </svg>
  );
}

function ConceptsSection({ concepts }: { concepts: WebsiteConcept[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4"><SectionLabel>What You Could Build</SectionLabel></motion.div>
        <motion.h2 initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl md:text-4xl mb-14 max-w-2xl leading-tight font-light">
          Website Ideas & Inspiration
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept, i) => (
            <motion.div key={concept.title} initial={isMobile ? false : { opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.1 }} className="group">
              <div className="overflow-hidden mb-5 border transition-all duration-400" style={{ borderColor: ACC_10 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_35; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_10; }}>
                <div className="p-3" style={{ backgroundColor: "#0d1926" }}>
                  <ScreenWireframe layout={concept.layout} />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-lg mb-2 font-medium group-hover:text-[#5ec4d4] transition-colors duration-300">{concept.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm leading-relaxed">{concept.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feature modal ────────────────────────────────────────── */
function FeatureModal({ feature, onClose }: { feature: WebsiteTypeFeature; onClose: () => void }) {
  const Icon = feature.icon;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return createPortal(
    <>
      <motion.div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="relative w-full max-w-lg pointer-events-auto overflow-hidden" style={{ background: "#1a2840", border: `1px solid ${ACC_20}` }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()}>
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${ACC}, transparent)` }} />
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}>
              <X size={16} />
            </button>
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 border" style={{ borderColor: ACC_35 }}>
              <Icon size={20} strokeWidth={1.25} style={{ color: ACC }} />
            </div>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl mb-4 font-light">{feature.title}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-[1.85]">{feature.body}</p>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Industry modal ───────────────────────────────────────── */
function IndustryModal({ industry, onClose }: { industry: WebsiteTypeIndustry; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return createPortal(
    <>
      <motion.div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="relative w-full max-w-lg pointer-events-auto overflow-hidden" style={{ background: "#1a2840", border: `1px solid ${ACC_20}` }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()}>
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${ACC}, transparent)` }} />
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}>
              <X size={16} />
            </button>
            <span style={{ color: ACC }} className="text-[10px] tracking-[0.3em] uppercase font-mono mb-4 block">✦ Industry</span>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl mb-4 font-light">{industry.name}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-[1.85]">{industry.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Features ─────────────────────────────────────────────── */
function FeaturesSection({ features }: { features: WebsiteTypeFeature[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  const [active, setActive] = useState<WebsiteTypeFeature | null>(null);
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12"><SectionLabel>Core Capabilities</SectionLabel></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={isMobile ? false : { opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
                className="group cursor-pointer relative p-6 transition-colors duration-300" style={{ border: `1px solid ${ACC_10}` }}
                onClick={() => setActive(f)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_35; (e.currentTarget as HTMLElement).style.backgroundColor = ACC_05; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_10; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Plus size={12} style={{ color: ACC }} />
                </div>
                <div className="mb-5 inline-flex items-center justify-center w-11 h-11 border" style={{ borderColor: ACC_20 }}>
                  <Icon size={18} strokeWidth={1.25} style={{ color: ACC }} className="opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-xl mb-3 group-hover:!text-[#5ec4d4] transition-colors">{f.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm leading-relaxed line-clamp-3">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {active && <FeatureModal feature={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ── Industries ───────────────────────────────────────────── */
function IndustriesSection({ industries }: { industries: WebsiteTypeIndustry[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  const [active, setActive] = useState<WebsiteTypeIndustry | null>(null);
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4"><SectionLabel>Who It's For</SectionLabel></motion.div>
        <motion.h2 initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-4xl md:text-5xl mb-12 max-w-2xl leading-tight font-light">
          Industries We Design For
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: ACC_08 }}>
          {industries.map((ind, i) => (
            <motion.div key={ind.name} initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
              className="p-8 group transition-colors duration-300 cursor-pointer relative" style={{ backgroundColor: BG_CARD }}
              onClick={() => setActive(ind)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1e3248"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BG_CARD; }}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Plus size={12} style={{ color: ACC }} />
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[10px] mt-1 flex-shrink-0" style={{ color: ACC }}>✦</span>
                <div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-xl mb-2 group-hover:!text-[#5ec4d4] transition-colors">{ind.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/35 text-sm leading-relaxed">{ind.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && <IndustryModal industry={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ── Included ─────────────────────────────────────────────── */
function IncludedSection({ included }: { included: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  const half = Math.ceil(included.length / 2);
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4"><SectionLabel>Included As Standard</SectionLabel></motion.div>
            <motion.h2 initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl md:text-4xl leading-tight font-light">Everything You Need, Nothing You Don't</motion.h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
              {[included.slice(0, half), included.slice(half)].map((col, ci) => (
                <ul key={ci} className="space-y-0">
                  {col.map((item, i) => (
                    <motion.li key={item} initial={isMobile ? false : { opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: (ci * half + i) * 0.05 }} className="flex items-center gap-3 py-3.5" style={{ borderBottom: `1px solid ${ACC_08}` }}>
                      <Check size={12} strokeWidth={2} style={{ color: ACC }} className="flex-shrink-0" />
                      <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm">{item}</span>
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
function ProcessSection({ process }: { process: WebsiteTypeProcess[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12"><SectionLabel>How We Build It</SectionLabel></motion.div>
        <div className="space-y-0">
          {process.map((s, i) => (
            <motion.div key={s.step} initial={isMobile ? false : { opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 }}
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
              }}>
              <div className="col-span-2 md:col-span-1">
                <span style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }} className="text-sm tracking-widest">{s.step}</span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-2xl font-light">{s.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Related ──────────────────────────────────────────────── */
function RelatedSection({ related }: { related: WebsiteTypeRelated[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10"><SectionLabel>Also Design With Us</SectionLabel></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <motion.div key={r.path} initial={isMobile ? false : { opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
              <Link to={r.path} className="block p-8 h-full group transition-all duration-300" style={{ border: `1px solid ${ACC_10}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_35; (e.currentTarget as HTMLElement).style.backgroundColor = ACC_05; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_10; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                <p style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }} className="text-[10px] tracking-[0.3em] uppercase mb-3">{r.label}</p>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-xl mb-3 group-hover:!text-[#5ec4d4] transition-colors leading-snug font-light">{r.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/30 text-sm leading-relaxed mb-5">{r.description}</p>
                <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }}>
                  <span className="tracking-[0.15em] uppercase group-hover:text-[#5ec4d4] transition-colors duration-300">Learn More</span>
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
  const isMobile = useIsMobile();
  return (
    <section className="py-32">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.p initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ fontFamily: "'DM Mono', monospace", color: ACC }} className="text-[10px] tracking-[0.3em] uppercase mb-6">Ready to start?</motion.p>
        <motion.h2 initial={isMobile ? false : { opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-4xl md:text-6xl mb-10 max-w-3xl mx-auto font-light">{title}</motion.h2>
        <motion.div initial={isMobile ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/web-design/start" className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#7dd8e6"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ACC; }}>
            Start Your Project <ArrowRight size={14} />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_50; (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_25; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
            Book a Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}