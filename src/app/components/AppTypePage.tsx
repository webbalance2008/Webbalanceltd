import { DepartmentHero } from "./DepartmentHero";
import { SEOHead } from "./SEOHead";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Check, X, Plus } from "lucide-react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import { createPortal } from "react-dom";

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

export interface AppTypeIndustry {
  name: string;
  description: string;
  detail?: string;
}

export interface AppTypeFeature {
  icon: LucideIcon;
  title: string;
  body: string;
  detail?: string;
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

/* ── Concept screen types ─────────────────────────────────── */
export type ScreenLayout =
  | "dashboard"   // sidebar + cards + chart
  | "calendar"    // calendar grid with slots
  | "form"        // input form with fields
  | "list"        // data table / list
  | "store"       // product grid + cart
  | "portal"      // tabbed portal with sidebar
  | "login"       // auth screen
  | "chat"        // messaging interface
  | "analytics"   // chart-heavy view
  | "kanban";     // kanban board columns

export interface AppConcept {
  title: string;
  description: string;
  layout: ScreenLayout;
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
  concepts?: AppConcept[];
  seoPath?: string;
  seoKeywords?: string;
}

export function AppTypePage({
  label,
  title,
  subtitle,
  heroImage,
  heroColor = BG_PAGE,
  overview,
  overviewDetail,
  features,
  industries,
  included,
  process,
  related,
  ctaTitle = "Ready to build something remarkable?",
  concepts,
  seoPath,
  seoKeywords,
}: AppTypePageProps) {
  return (
    <div className="min-h-screen" style={{ background: BG_PAGE }}>
      <SEOHead
        title={`${title} — Custom Web Apps`}
        description={subtitle + ". " + overview}
        path={seoPath || `/web-apps`}
        keywords={seoKeywords || `${title.toLowerCase()}, web app, custom development, UK`}
      />
      {/* ── HERO ─────────────────────────────────────────── */}
      <DepartmentHero
        label={label}
        heading={
          <>
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span style={{ color: ACC }}>{title.split(" ").slice(-1)[0]}</span>.
          </>
        }
        subtitle={subtitle}
        accent={ACC}
        primaryCta={{ label: "View Packages", to: "/web-apps/packages" }}
        secondaryCta={{ label: "Start a Project", to: "/web-apps/start" }}
        patternId={`at-${label.replace(/\s+/g, "").slice(0, 6).toLowerCase()}`}
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
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-5">
          <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-6">
            <SectionLabel>What It Is</SectionLabel>
          </motion.div>
          <motion.p
            initial={isMobile ? false : { opacity: 0, y: 20 }}
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
            initial={isMobile ? false : { opacity: 0, y: 20 }}
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

/* ── Concept Screens — Abstract wireframe schematics ──────── */

function ScreenWireframe({ layout }: { layout: ScreenLayout }) {
  const w = 280;
  const h = 180;
  const accent = ACC;
  const accLow = ACC_35;
  const accVLow = ACC_20;
  const line = ACC_25;

  // Common browser chrome
  const chrome = (
    <>
      <rect x="0" y="0" width={w} height={h} rx="6" fill="#0d1926" stroke={line} strokeWidth="1" />
      <rect x="0" y="0" width={w} height="20" rx="6" fill="#111e2e" />
      <rect x="0" y="14" width={w} height="6" fill="#111e2e" />
      <circle cx="12" cy="10" r="3" fill="rgba(184,159,212,0.25)" />
      <circle cx="22" cy="10" r="3" fill="rgba(184,159,212,0.15)" />
      <circle cx="32" cy="10" r="3" fill="rgba(184,159,212,0.1)" />
      <rect x="80" y="6" width="120" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
    </>
  );

  const layouts: Record<ScreenLayout, React.ReactNode> = {
    dashboard: (
      <>
        {chrome}
        {/* Sidebar */}
        <rect x="0" y="20" width="55" height={h-20} fill="#111e2e" />
        <rect x="8" y="30" width="38" height="4" rx="2" fill={accLow} />
        {[42,52,62,72,82].map(y => <rect key={y} x="8" y={y} width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />)}
        <rect x="8" y="52" width="32" height="3" rx="1.5" fill={ACC_25} />
        {/* Header */}
        <rect x="65" y="28" width="60" height="5" rx="2" fill="rgba(255,255,255,0.12)" />
        {/* Stat cards */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={65 + i*70} y="42" width="60" height="32" rx="3" fill="#152030" stroke={line} strokeWidth="0.5" />
            <rect x={72 + i*70} y="48" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
            <rect x={72 + i*70} y="56" width="30" height="6" rx="2" fill={i===0 ? accent : accLow} opacity={i===0? 0.6 : 0.3} />
            <rect x={72 + i*70} y="66" width="14" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
          </g>
        ))}
        {/* Chart area */}
        <rect x="65" y="82" width="205" height="88" rx="3" fill="#152030" stroke={line} strokeWidth="0.5" />
        <polyline points="75,155 100,140 125,148 150,130 175,135 200,118 225,125 250,110" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.85" />
        <polyline points="75,155 100,148 125,152 150,142 175,145 200,138 225,140 250,132" fill="none" stroke={accLow} strokeWidth="1" opacity="0.5" />
      </>
    ),
    calendar: (
      <>
        {chrome}
        <rect x="10" y="28" width="60" height="5" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x={w-70} y="27" width="55" height="8" rx="4" fill={accent} opacity="0.4" />
        <rect x={w-65} y="29" width="45" height="4" rx="2" fill={accent} opacity="0.5" />
        {/* Day headers */}
        {[0,1,2,3,4,5,6].map(d => (
          <rect key={d} x={12 + d*38} y="42" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
        ))}
        {/* Calendar grid */}
        {[0,1,2,3,4].map(r => [0,1,2,3,4,5,6].map(c => {
          const booked = (r===1&&c===2)||(r===2&&c===4)||(r===3&&c===1)||(r===1&&c===5)||(r===4&&c===3);
          const active = r===2&&c===2;
          return (
            <rect key={`${r}-${c}`} x={10 + c*38} y={50 + r*24} width="34" height="20" rx="2"
              fill={active ? accent : booked ? ACC_08 : "#0f1a28"}
              stroke={active ? accent : line} strokeWidth="0.5"
              opacity={active ? 0.25 : booked ? 1 : 0.6} />
          );
        }))}
        {/* Time slot indicators */}
        {[50+1*24+6, 50+2*24+6, 50+3*24+6].map((y,i) => (
          <rect key={i} x={12 + [2,4,1][i]*38} y={y} width="16" height="2" rx="1" fill={accent} opacity="0.4" />
        ))}
      </>
    ),
    form: (
      <>
        {chrome}
        <rect x="40" y="30" width="200" height="144" rx="4" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="55" y="40" width="80" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="55" y="50" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
        {/* Form fields */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x="55" y={64 + i*28} width="30" height="3" rx="1.5" fill={ACC_25} />
            <rect x="55" y={72 + i*28} width="170" height="14" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
            {i===0 && <rect x="60" y={76 + i*28} width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />}
          </g>
        ))}
        {/* Submit button */}
        <rect x="155" y="152" width="70" height="14" rx="3" fill={accent} opacity="0.2" />
        <rect x="170" y="156" width="40" height="4" rx="2" fill={accent} opacity="0.5" />
      </>
    ),
    list: (
      <>
        {chrome}
        {/* Search bar */}
        <rect x="10" y="28" width="180" height="12" rx="4" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <rect x="16" y="32" width="40" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        {/* Filter pills */}
        {[0,1,2].map(i => (
          <rect key={i} x={200 + i*26} y="29" width="22" height="10" rx="5" fill={i===0? ACC_10 : "#111e2e"} stroke={line} strokeWidth="0.5" />
        ))}
        {/* Table header */}
        <rect x="10" y="48" width={w-20} height="12" fill="#111e2e" />
        {[0,1,2,3].map(i => <rect key={i} x={16 + i*65} y="51" width="40" height="4" rx="2" fill="rgba(255,255,255,0.08)" />)}
        {/* Table rows */}
        {[0,1,2,3,4,5,6].map(r => (
          <g key={r}>
            <rect x="10" y={62 + r*16} width={w-20} height="15" fill={r%2===0 ? "transparent" : "#0f1a28"} />
            {[0,1,2].map(c => <rect key={c} x={16 + c*65} y={66 + r*16} width={c===0?50:35} height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />)}
            <rect x={16 + 3*65} y={65 + r*16} width="28" height="8" rx="4" fill={r===1||r===4? accent : ACC_10} opacity={r===1||r===4? 0.2 : 0.5} />
          </g>
        ))}
      </>
    ),
    store: (
      <>
        {chrome}
        {/* Category nav */}
        <rect x="10" y="28" width={w-20} height="10" fill="#111e2e" />
        {[0,1,2,3].map(i => <rect key={i} x={16 + i*60} y="31" width="35" height="4" rx="2" fill={i===0? ACC_25:"rgba(255,255,255,0.06)"} />)}
        {/* Product grid */}
        {[0,1,2].map(r => [0,1,2].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={10 + c*90} y={46 + r*44} width="82" height="38" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x={13 + c*90} y={49 + r*44} width="76" height="18" rx="2" fill="#0d1926" />
            <rect x={13 + c*90} y={70 + r*44} width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
            <rect x={13 + c*90} y={76 + r*44} width="18" height="3" rx="1.5" fill={accent} opacity="0.4" />
            <rect x={65 + c*90} y={74 + r*44} width="20" height="7" rx="2" fill={ACC_10} />
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
        {/* Tabs */}
        {[0,1,2].map(i => (
          <rect key={i} x={70 + i*50} y="28" width="40" height="8" rx="4" fill={i===0? ACC_10:"transparent"} />
        ))}
        {[0,1,2].map(i => (
          <rect key={`t${i}`} x={78 + i*50} y="31" width="24" height="3" rx="1.5" fill={i===0? ACC_25:"rgba(255,255,255,0.06)"} />
        ))}
        {/* Content cards */}
        {[0,1].map(r => [0,1].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={70 + c*100} y={44 + r*60} width="92" height="52" rx="3" fill="#152030" stroke={line} strokeWidth="0.5" />
            <rect x={78 + c*100} y={52 + r*60} width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x={78 + c*100} y={60 + r*60} width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
            <rect x={78 + c*100} y={66 + r*60} width="55" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x={78 + c*100} y={80 + r*60} width="30" height="6" rx="3" fill={ACC_08} />
          </g>
        )))}
      </>
    ),
    login: (
      <>
        {chrome}
        <rect x="70" y="32" width="140" height="140" rx="5" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <circle cx="140" cy="55" r="12" fill={ACC_08} stroke={ACC_20} strokeWidth="0.5" />
        <rect x="105" y="74" width="70" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="115" y="82" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
        {/* Email field */}
        <rect x="85" y="94" width="110" height="14" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
        <rect x="92" y="99" width="40" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        {/* Password field */}
        <rect x="85" y="114" width="110" height="14" rx="3" fill="#0d1926" stroke={line} strokeWidth="0.5" />
        {[0,1,2,3,4].map(i => <circle key={i} cx={96 + i*8} cy="121" r="2" fill="rgba(255,255,255,0.06)" />)}
        {/* Submit */}
        <rect x="85" y="136" width="110" height="14" rx="3" fill={accent} opacity="0.2" />
        <rect x="115" y="140" width="50" height="5" rx="2" fill={accent} opacity="0.5" />
        {/* Social login */}
        {[0,1].map(i => <rect key={i} x={95 + i*30} y="155" width="20" height="8" rx="4" fill={ACC_08} />)}
      </>
    ),
    chat: (
      <>
        {chrome}
        {/* Contact sidebar */}
        <rect x="0" y="20" width="70" height={h-20} fill="#111e2e" />
        <rect x="8" y="28" width="54" height="10" rx="5" fill="#0d1926" stroke={line} strokeWidth="0.5" />
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx="20" cy={50 + i*24} r="7" fill={i===0? ACC_08:"rgba(255,255,255,0.03)"} stroke={i===0?ACC_20:line} strokeWidth="0.5" />
            <rect x="32" y={46 + i*24} width="28" height="3" rx="1.5" fill={i===0? ACC_25:"rgba(255,255,255,0.06)"} />
            <rect x="32" y={52 + i*24} width="18" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
          </g>
        ))}
        {/* Messages */}
        <rect x="80" y="30" width="110" height="18" rx="8" fill="#152030" />
        <rect x="86" y="36" width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x={w-90} y="55" width="78" height="18" rx="8" fill={ACC_08} />
        <rect x={w-84} y="61" width="40" height="4" rx="2" fill={ACC_25} />
        <rect x="80" y="80" width="130" height="26" rx="8" fill="#152030" />
        <rect x="86" y="86" width="80" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="86" y="93" width="50" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
        <rect x={w-70} y="115" width="58" height="18" rx="8" fill={ACC_08} />
        <rect x={w-64} y="121" width="30" height="4" rx="2" fill={ACC_25} />
        {/* Input bar */}
        <rect x="78" y={h-22} width={w-88} height="16" rx="8" fill="#111e2e" stroke={line} strokeWidth="0.5" />
      </>
    ),
    analytics: (
      <>
        {chrome}
        <rect x="10" y="28" width="60" height="5" rx="2" fill="rgba(255,255,255,0.12)" />
        {/* KPI row */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={10 + i*66} y="40" width="60" height="28" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
            <rect x={16 + i*66} y="46" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
            <rect x={16 + i*66} y="53" width="34" height="6" rx="2" fill={i===0? accent:accLow} opacity={i===0?0.5:0.25} />
          </g>
        ))}
        {/* Bar chart */}
        <rect x="10" y="76" width="160" height="96" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        {[0,1,2,3,4,5,6,7].map(i => {
          const barH = [30,45,25,55,40,60,35,50][i];
          return <rect key={i} x={22 + i*18} y={165-barH} width="10" height={barH} rx="2" fill={accent} opacity={0.15 + (i%3)*0.08} />;
        })}
        {/* Donut chart */}
        <rect x="178" y="76" width="92" height="96" rx="3" fill="#111e2e" stroke={line} strokeWidth="0.5" />
        <circle cx="224" cy="116" r="24" fill="none" stroke={ACC_10} strokeWidth="6" />
        <circle cx="224" cy="116" r="24" fill="none" stroke={accent} strokeWidth="6" opacity="0.35"
          strokeDasharray="50 100" strokeLinecap="round" />
        <circle cx="224" cy="116" r="24" fill="none" stroke={ACC_25} strokeWidth="6"
          strokeDasharray="30 120" strokeDashoffset="-50" strokeLinecap="round" />
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x="202" y={148 + i*8} width="6" height="4" rx="1" fill={[accent,ACC_25,ACC_10][i]} opacity="0.5" />
            <rect x="212" y={149 + i*8} width="20" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
          </g>
        ))}
      </>
    ),
    kanban: (
      <>
        {chrome}
        <rect x="10" y="28" width="60" height="5" rx="2" fill="rgba(255,255,255,0.12)" />
        {/* Column headers */}
        {[0,1,2,3].map(c => (
          <g key={c}>
            <rect x={10 + c*67} y="40" width="62" height="10" rx="3" fill={[ACC_10, ACC_08, ACC_05, ACC_05][c]} />
            <rect x={16 + c*67} y="43" width="30" height="4" rx="2" fill={c===0?ACC_25:"rgba(255,255,255,0.06)"} />
            {/* Cards */}
            {[0,1,2].map(r => {
              if (c===3 && r>0) return null;
              if (c===2 && r>1) return null;
              return (
                <g key={r}>
                  <rect x={12 + c*67} y={56 + r*36} width="58" height="30" rx="3" fill="#152030" stroke={line} strokeWidth="0.5" />
                  <rect x={16 + c*67} y={61 + r*36} width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
                  <rect x={16 + c*67} y={67 + r*36} width="24" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
                  <rect x={16 + c*67} y={74 + r*36} width="16" height="5" rx="2.5" fill={ACC_08} />
                  <circle cx={58 + c*67} cy={77 + r*36} r="4" fill={ACC_05} stroke={ACC_10} strokeWidth="0.5" />
                </g>
              );
            })}
          </g>
        ))}
      </>
    ),
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {layouts[layout]}
    </svg>
  );
}

function ConceptsSection({ concepts }: { concepts: AppConcept[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <SectionLabel>What You Could Build</SectionLabel>
        </motion.div>
        <motion.h2
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-3xl md:text-4xl mb-14 max-w-2xl leading-tight font-light"
        >
          App Ideas & Inspiration
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={isMobile ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="group"
            >
              <div
                className="overflow-hidden mb-5 border transition-all duration-400"
                style={{ borderColor: ACC_10 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_35; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_10; }}
              >
                <div className="p-3" style={{ backgroundColor: "#0d1926" }}>
                  <ScreenWireframe layout={concept.layout} />
                </div>
              </div>
              <h3
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-lg mb-2 font-medium group-hover:text-[#b89fd4] transition-colors duration-300"
              >
                {concept.title}
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/40 text-sm leading-relaxed"
              >
                {concept.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feature modal ────────────────────────────────────────── */
function FeatureModal({ feature, onClose }: { feature: AppTypeFeature; onClose: () => void }) {
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
        <motion.div
          className="relative w-full max-w-lg pointer-events-auto overflow-hidden"
          style={{ background: "#1a2840", border: `1px solid ${ACC_20}` }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${ACC}, transparent)` }} />
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}>
              <X size={16} />
            </button>
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 border" style={{ borderColor: ACC_35 }}>
              <Icon size={20} strokeWidth={1.25} style={{ color: ACC }} />
            </div>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl mb-4 font-light">{feature.title}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-[1.85]">{feature.detail || feature.body}</p>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Features ─────────────────────────────────────────────── */

function FeaturesSection({ features }: { features: AppTypeFeature[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  const [active, setActive] = useState<AppTypeFeature | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <SectionLabel>Core Capabilities</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={isMobile ? false : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                className="group cursor-pointer relative p-6 transition-colors duration-300"
                style={{ border: `1px solid ${ACC_25}`, backgroundColor: ACC_05 }}
                onClick={() => setActive(f)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_50; (e.currentTarget as HTMLElement).style.backgroundColor = ACC_10; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC_25; (e.currentTarget as HTMLElement).style.backgroundColor = ACC_05; }}
              >
                <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <Plus size={12} style={{ color: ACC }} />
                </div>
                <div className="mb-5 inline-flex items-center justify-center w-11 h-11 border" style={{ borderColor: ACC_35 }}>
                  <Icon size={18} strokeWidth={1.25} style={{ color: ACC }} className="opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }} className="text-xl mb-3 group-hover:!text-[#b89fd4] transition-colors">
                  {f.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-relaxed line-clamp-3">
                  {f.body}
                </p>
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

/* ── Industry modal ───────────────────────────────────────── */
function IndustryModal({ industry, onClose }: { industry: AppTypeIndustry; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return createPortal(
    <>
      <motion.div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div
          className="relative w-full max-w-lg pointer-events-auto overflow-hidden"
          style={{ background: "#1a2840", border: `1px solid ${ACC_20}` }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${ACC}, transparent)` }} />
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors duration-200" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}>
              <X size={16} />
            </button>
            <span style={{ color: ACC }} className="text-[10px] tracking-[0.3em] uppercase font-mono mb-4 block" >✦ Industry</span>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl mb-4 font-light">{industry.name}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-[1.85]">{industry.detail || industry.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

/* ── Industries ───────────────────────────────────────────── */

function IndustriesSection({ industries }: { industries: AppTypeIndustry[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();
  const [active, setActive] = useState<AppTypeIndustry | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <SectionLabel>Who It's For</SectionLabel>
        </motion.div>
        <motion.h2
          initial={isMobile ? false : { opacity: 0, y: 20 }}
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
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="p-8 group transition-colors duration-300 cursor-pointer relative"
              style={{ backgroundColor: "#1c2f48" }}
              onClick={() => setActive(ind)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#223557"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1c2f48"; }}
            >
              <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <Plus size={12} style={{ color: ACC }} />
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[10px] mt-1 flex-shrink-0" style={{ color: ACC }}>✦</span>
                <div>
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
                    className="text-xl mb-2 group-hover:!text-[#b89fd4] transition-colors"
                  >
                    {ind.name}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/55 text-sm leading-relaxed">
                    {ind.description}
                  </p>
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
            <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
              <SectionLabel>Included As Standard</SectionLabel>
            </motion.div>
            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
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
                      initial={isMobile ? false : { opacity: 0, x: -12 }}
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
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <SectionLabel>How We Build It</SectionLabel>
        </motion.div>
        <div className="space-y-0">
          {process.map((s, i) => (
            <motion.div
              key={s.step}
              initial={isMobile ? false : { opacity: 0, x: -20 }}
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
                <span style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }} className="text-sm tracking-widest">
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
  const isMobile = useIsMobile();
  return (
    <section className="py-24" style={{ borderBottom: `1px solid ${ACC_08}` }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div initial={isMobile ? false : { opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10">
          <SectionLabel>Also Build With Us</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r, i) => (
            <motion.div key={r.path} initial={isMobile ? false : { opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
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
                <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ fontFamily: "'DM Mono', monospace", color: ACC_35 }}>
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
  const isMobile = useIsMobile();
  return (
    <section className="py-32">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <motion.p
          initial={isMobile ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'DM Mono', monospace", color: ACC }}
          className="text-[10px] tracking-[0.3em] uppercase mb-6"
        >
          Ready to start?
        </motion.p>
        <motion.h2
          initial={isMobile ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-4xl md:text-6xl mb-10 max-w-3xl mx-auto font-light"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/web-apps/start"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif", backgroundColor: ACC, color: "#1a0f2e" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#7dd8e6"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ACC; }}
          >
            Start Your Project
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300"
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