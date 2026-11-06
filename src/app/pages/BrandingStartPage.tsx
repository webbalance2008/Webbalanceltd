import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Check, HelpCircle,
  Compass, PenLine, RefreshCw, Share2, Printer, Megaphone, BookOpen, Package,
  Clock, Zap, LucideIcon,
} from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePricingRates, RatesMap } from "../hooks/usePricingRates";

const ACCENT      = "#f472b6";
const ACCENT_RGB  = "244, 114, 182";
const DEPT_BG     = "#16212e";
const TOTAL_STEPS = 8;
const VAT_RATE    = 0.20;

// ─── Step 1 — Primary Service ─────────────────────────────────────────────────

interface ServiceOption { id: string; label: string; sub: string; base: number; Icon: LucideIcon }

const serviceOptions: ServiceOption[] = [
  { id: "full-brand",   label: "Full Brand Identity",        sub: "Strategy, logo, colour, type, guidelines",    base: 3500, Icon: Compass    },
  { id: "logo",         label: "Logo Design",                sub: "Primary logo, variants & brand mark",         base: 800,  Icon: PenLine    },
  { id: "refresh",      label: "Brand Refresh / Evolution",  sub: "Evolving an existing brand identity",         base: 1800, Icon: RefreshCw  },
  { id: "social",       label: "Social Media Brand Pack",    sub: "Templates, profile assets, content system",   base: 600,  Icon: Share2     },
  { id: "print",        label: "Print & Collateral",         sub: "Cards, brochures, signage, packaging",        base: 500,  Icon: Printer    },
  { id: "marketing",    label: "Digital Marketing Campaign", sub: "Paid social, Google Ads, email creative",     base: 900,  Icon: Megaphone  },
  { id: "guidelines",   label: "Brand Guidelines Document",  sub: "The rulebook for your brand",                 base: 700,  Icon: BookOpen   },
  { id: "full-bundle",  label: "Brand + Marketing Bundle",   sub: "Full identity & ongoing campaign management", base: 5000, Icon: Package    },
];

// ─── Step 2 — Current Brand Status ───────────────────────────────────────────

const brandStatuses: { id: string; label: string; sub: string; unsure?: boolean }[] = [
  { id: "new",       label: "We're a brand new business",       sub: "No brand assets exist yet — clean slate"            },
  { id: "logo-only", label: "We have a logo and nothing else",  sub: "Logo exists but no system around it"                },
  { id: "partial",   label: "Some assets, but needs work",      sub: "Fragmented — needs bringing together"               },
  { id: "rebrand",   label: "Full rebrand — start over",        sub: "Existing identity no longer serves us"              },
  { id: "unsure",    label: "Not sure what we need",            sub: "We'll help you assess and recommend the right scope", unsure: true },
];

// ─── Step 3 — Brand Identity Deliverables ─────────────────────────────────────

interface Deliverable { id: string; label: string; cost: number; group: string }

const deliverables: Deliverable[] = [
  // Identity
  { id: "strategy",   label: "Brand strategy document",           cost: 900,  group: "Brand Identity" },
  { id: "logo-suite", label: "Logo suite (primary, secondary, icon)", cost: 600, group: "Brand Identity" },
  { id: "colour",     label: "Colour palette system",             cost: 250,  group: "Brand Identity" },
  { id: "typography", label: "Typography system",                 cost: 200,  group: "Brand Identity" },
  { id: "guidelines", label: "Brand guidelines PDF",              cost: 550,  group: "Brand Identity" },
  { id: "iconography",label: "Custom icon set",                   cost: 400,  group: "Brand Identity" },
  // Collateral
  { id: "social-pack",label: "Social media template pack",        cost: 450,  group: "Marketing Assets" },
  { id: "social-profiles", label: "Profile & cover images (all platforms)", cost: 200, group: "Marketing Assets" },
  { id: "biz-card",   label: "Business card design",              cost: 200,  group: "Marketing Assets" },
  { id: "letterhead", label: "Letterhead & email signature",      cost: 150,  group: "Marketing Assets" },
  { id: "brochure",   label: "Brochure / capability document",    cost: 600,  group: "Marketing Assets" },
  { id: "packaging",  label: "Packaging & label design",          cost: 750,  group: "Marketing Assets" },
  { id: "signage",    label: "Signage & display graphics",        cost: 500,  group: "Marketing Assets" },
  // Campaign
  { id: "social-ads", label: "Social media ad creative",          cost: 300,  group: "Campaign Creative" },
  { id: "google-ads", label: "Google Ads creative",               cost: 350,  group: "Campaign Creative" },
  { id: "email-campaign", label: "Email campaign design",         cost: 300,  group: "Campaign Creative" },
  { id: "photo-art",  label: "Photography art direction brief",   cost: 250,  group: "Campaign Creative" },
];

const deliverableGroups = ["Brand Identity", "Marketing Assets", "Campaign Creative"];

// ─── Step 4 — Timeline ────────────────────────────────────────────────────────

const timelines: { id: string; label: string; sub: string; surcharge: number; Icon: LucideIcon; unsure?: boolean }[] = [
  { id: "2wks",     label: "Within 2 weeks",       sub: "Very urgent — rush delivery",     surcharge: 0.3,  Icon: Zap   },
  { id: "4wks",     label: "2 – 4 weeks",          sub: "Urgent but manageable",           surcharge: 0.15, Icon: Clock },
  { id: "2months",  label: "1 – 2 months",         sub: "Standard timeline",               surcharge: 0,    Icon: Clock },
  { id: "3months",  label: "2 – 3 months",         sub: "Considered, thorough pace",       surcharge: 0,    Icon: Clock },
  { id: "phased",   label: "Phased delivery",      sub: "Identity first, collateral later",surcharge: 0,    Icon: Clock },
  { id: "flexible", label: "Flexible",             sub: "No hard deadline yet",             surcharge: 0,    Icon: Clock },
];

// ─── Step meta ────────────────────────────────────────────────────────────────

const stepMeta = [
  { step: 1, label: "Service",      title: "What do you need from us?",              subtitle: "Choose the primary service — we'll build the scope from there." },
  { step: 2, label: "Status",       title: "Where is your brand right now?",          subtitle: "Honest answers help us understand the scope from the start." },
  { step: 3, label: "Identity",     title: "Brand identity deliverables.",             subtitle: "Select any brand foundation items you need us to create." },
  { step: 4, label: "Assets",       title: "Marketing assets & collateral.",           subtitle: "Select any marketing materials you'd like included." },
  { step: 5, label: "Campaign",     title: "Campaign creative.",                       subtitle: "Select any campaign-specific design work you need." },
  { step: 6, label: "Timeline",     title: "When do you need this?",                  subtitle: "Shorter timelines may incur a rush fee." },
  { step: 7, label: "Estimate",     title: "Your indicative project investment.",      subtitle: "Based on your selections — clear pricing before we talk." },
  { step: 8, label: "About You",    title: "Almost there.",                            subtitle: "A few details so we can tailor our proposal." },
];

// ─── Form state ───────────────────────────────────────────────────────────────

interface BrandingFormData {
  service: string;
  status: string;
  deliverables: string[];
  timeline: string;
  name: string; emailAddr: string; company: string; website: string; brief: string;
}

const initialData: BrandingFormData = {
  service: "", status: "", deliverables: [], timeline: "",
  name: "", emailAddr: "", company: "", website: "", brief: "",
};

// ─── Pricing ─────────────────────────────────────────────────────────────────

interface Estimate { subtotal: number; surcharge: number; vat: number; total: number; }

function fmt(n: number) { return "£" + Math.round(n).toLocaleString("en-GB"); }

const BRANDING_SERVICE_KEY: Record<string, string> = {
  "full-brand": "base_full_brand", "logo": "base_logo", "refresh": "base_refresh",
  "social": "base_social", "print": "base_print", "marketing": "base_marketing",
  "guidelines": "base_guidelines", "full-bundle": "base_bundle",
};

const BRANDING_DEL_KEY: Record<string, string> = {
  "strategy": "del_strategy", "logo-suite": "del_logo_suite", "colour": "del_colour",
  "typography": "del_typography", "guidelines": "del_guidelines", "iconography": "del_iconography",
  "social-pack": "del_social_pack", "social-profiles": "del_social_profiles",
  "biz-card": "del_biz_card", "letterhead": "del_letterhead", "brochure": "del_brochure",
  "packaging": "del_packaging", "signage": "del_signage", "social-ads": "del_social_ads",
  "google-ads": "del_google_ads", "email-campaign": "del_email_campaign", "photo-art": "del_photo_art",
};

function calculateEstimate(data: BrandingFormData, rates: RatesMap): Estimate {
  const svc = serviceOptions.find(s => s.id === data.service);
  const baseKey = BRANDING_SERVICE_KEY[data.service];
  const base = (baseKey ? rates[`branding.${baseKey}`] : undefined) ?? svc?.base ?? 0;

  const selectedDeliverables = deliverables.filter(d => data.deliverables.includes(d.id));
  const extraCost = selectedDeliverables.reduce((s, d) => {
    const delKey = BRANDING_DEL_KEY[d.id];
    return s + ((delKey ? rates[`branding.${delKey}`] : undefined) ?? d.cost);
  }, 0);

  const timelineOpt = timelines.find(t => t.id === data.timeline);
  const surchargeRate = timelineOpt?.surcharge ?? 0;
  const subtotalBeforeSurcharge = base + extraCost;
  const surcharge = subtotalBeforeSurcharge * surchargeRate;
  const subtotal = subtotalBeforeSurcharge + surcharge;
  const vatRate = (rates["global.vat_rate"] ?? 20) / 100;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  return { subtotal: subtotalBeforeSurcharge, surcharge, vat, total };
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function chipStyle(active: boolean, hov = false) {
  return {
    borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.6)` : `rgba(${ACCENT_RGB},0.2)`,
    backgroundColor: active ? `rgba(${ACCENT_RGB},0.14)` : hov ? `rgba(${ACCENT_RGB},0.07)` : `rgba(${ACCENT_RGB},0.03)`,
    color:           active ? ACCENT : hov ? "white" : "rgba(255,255,255,0.88)",
    boxShadow:       active ? `0 0 14px rgba(${ACCENT_RGB},0.2)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.1)` : "none",
    transition: "all 0.18s ease",
  };
}

// ─── ServiceCard ─────────────────────────────────────────────────────────────

function ServiceCard({ opt, isActive, onClick }: { opt: ServiceOption; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const Icon = opt.Icon;
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-5 border text-left transition-all duration-200"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.15)`,
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : `rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive ? `0 0 22px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 14px rgba(${ACCENT_RGB},0.1)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.45),transparent)` : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.12),transparent)`,
        transition: "all 0.2s",
      }} />
      <Icon size={20} strokeWidth={1.25} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.7)` : `rgba(${ACCENT_RGB},0.4)`, marginBottom: "12px", transition: "color 0.2s" }} />
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{opt.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: isActive ? `rgba(${ACCENT_RGB},0.7)` : "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: "10px" }}>{opt.sub}</p>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.35)`, transition: "color 0.2s" }}>
        from {fmt(opt.base)}
      </p>
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── StatusCard ──────────────────────────────────────────────────────────────

function StatusCard({ opt, isActive, onClick }: { opt: typeof brandStatuses[0]; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const isUnsure = !!opt.unsure;
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-5 border text-left transition-all duration-200"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : isUnsure ? `rgba(${ACCENT_RGB},0.28)` : `rgba(${ACCENT_RGB},0.15)`,
        borderStyle:     isUnsure && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       isActive ? `0 0 22px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 14px rgba(${ACCENT_RGB},0.1)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)` : "transparent",
        transition: "all 0.2s",
      }} />
      {isUnsure && <HelpCircle size={14} style={{ color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.5)`, marginBottom: "8px" }} />}
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : isUnsure ? `rgba(${ACCENT_RGB},0.75)` : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{opt.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: isActive ? `rgba(${ACCENT_RGB},0.7)` : "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{opt.sub}</p>
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── TimelineCard ─────────────────────────────────────────────────────────────

function TimelineCard({ opt, isActive, onClick }: { opt: typeof timelines[0]; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const Icon = opt.Icon;
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-5 border text-left transition-all duration-200"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.15)`,
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       isActive ? `0 0 22px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 14px rgba(${ACCENT_RGB},0.1)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)` : "transparent",
        transition: "all 0.2s",
      }} />
      <Icon size={16} strokeWidth={1.5} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.7)` : `rgba(${ACCENT_RGB},0.4)`, marginBottom: "10px", transition: "color 0.2s" }} />
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{opt.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{opt.sub}</p>
      {opt.surcharge > 0 && (
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.1em", color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.4)`, marginTop: "8px", transition: "color 0.2s" }}>
          +{Math.round(opt.surcharge * 100)}% rush fee
        </p>
      )}
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BrandingStartPage() {
  const isMobile = useIsMobile();
  const rates = usePricingRates();
  const [step, setStep]   = useState(1);
  const [dir, setDir]     = useState(1);
  const [data, setData]   = useState<BrandingFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [hovChips, setHovChips]   = useState<Record<string, boolean>>({});

  const next = () => { setDir(1); setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 1)); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const toggleDeliverable = (id: string) =>
    setData(d => ({ ...d, deliverables: d.deliverables.includes(id) ? d.deliverables.filter(x => x !== id) : [...d.deliverables, id] }));

  const canNext = () => {
    if (step === 1) return !!data.service;
    if (step === 2) return !!data.status;
    // Steps 3-5 (deliverable groups) are always skippable
    if (step === 6) return !!data.timeline;
    return true;
  };

  const estimate = calculateEstimate(data, rates);
  const sm = stepMeta[step - 1];
  const progress = (step / TOTAL_STEPS) * 100;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: DEPT_BG }}>
        <motion.div initial={isMobile ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: `rgba(${ACCENT_RGB},0.15)`, border: `1px solid ${ACCENT}` }}>
            <Check size={28} style={{ color: ACCENT }} />
          </div>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", color: "white" }} className="text-3xl mb-4">Brief received.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.55)" }} className="text-sm leading-relaxed mb-8">
            Our creative team will review your brief and come back with a tailored proposal — typically within 1 business day.
          </p>
          <a href="/branding" style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, border: `1px solid rgba(${ACCENT_RGB},0.3)`, padding: "12px 28px", fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase inline-block">
            Back to Branding
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEPT_BG }}>
      <SEOHead
        title="Branding Quote Builder — Scope Your Project"
        description="Walk through our branding wizard to scope your brand identity project. Logo design, brand guidelines, print and more — get a tailored branding quote."
        path="/branding/start"
        keywords="branding quote, logo design pricing, brand identity cost, UK branding agency"
      />

      {/* ── Progress / Step indicator bar ──────────────────────────────────── */}
      <div className="fixed top-24 left-0 right-0 z-40 px-4 sm:px-8 md:px-16 pointer-events-none"
        style={{ backgroundColor:"rgba(22,33,46,0.92)", backdropFilter:"blur(16px)", borderBottom:`1px solid rgba(${ACCENT_RGB},0.1)` }}>
        <div className="max-w-[1320px] mx-auto py-3 sm:py-4">
          {/* Mobile compact */}
          <div className="flex sm:hidden items-center gap-3">
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.2em", color:ACCENT, whiteSpace:"nowrap" }}>{step} / {TOTAL_STEPS}</span>
            <div className="flex-1 relative" style={{ height:"2px", backgroundColor:`rgba(${ACCENT_RGB},0.1)` }}>
              <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width:`${progress}%`, backgroundColor:ACCENT, boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }} />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.15em", color:"white", textTransform:"uppercase" as const, whiteSpace:"nowrap" }}>{sm.label}</span>
          </div>
          {/* Desktop step indicators */}
          <div className="hidden sm:flex items-center">
            {stepMeta.map((s, i) => {
              const isActive = step === s.step;
              const isDone   = step > s.step;
              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{ borderColor: isDone ? ACCENT : isActive ? ACCENT : "rgba(255,255,255,0.15)", backgroundColor: isDone ? ACCENT : isActive ? `rgba(${ACCENT_RGB},0.15)` : "transparent", boxShadow: isActive ? `0 0 12px rgba(${ACCENT_RGB},0.35)` : "none" }}>
                      {isDone ? <Check size={12} color="#0a0a0a" strokeWidth={3} /> : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:isActive?ACCENT:"rgba(255,255,255,0.5)" }}>{s.step}</span>}
                    </div>
                    <span className="uppercase hidden md:block" style={{ fontFamily:"'DM Mono',monospace", fontSize:"8px", color:isActive?ACCENT:isDone?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.4)", letterSpacing:"0.15em", transition:"color 0.3s", whiteSpace:"nowrap" }}>{s.label}</span>
                  </div>
                  {i < stepMeta.length - 1 && <div className="flex-1 h-px mx-2 md:mx-3 transition-all duration-500" style={{ backgroundColor: step > s.step ? ACCENT : `rgba(${ACCENT_RGB},0.08)` }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Hero heading ─────────────────────────────────────────────────── */}
      <section className="pt-48 sm:pt-56 md:pt-64 pb-6 sm:pb-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`hero-${step}`} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration:0.36, ease:[0.16,1,0.3,1] }}>
              <p style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }} className="text-[11px] tracking-[0.35em] uppercase mb-5 flex items-center gap-3">
                <span className="w-5 h-px" style={{ backgroundColor:ACCENT }} />
                Step {sm.step} of {TOTAL_STEPS}
              </p>
              <h1 style={{ fontFamily:"'Montserrat',sans-serif" }} className="text-white text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-tight mb-3">{sm.title}</h1>
              <p style={{ fontFamily:"'Inter',sans-serif" }} className="text-white/40 text-[15px] leading-relaxed">{sm.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Step content ─────────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-36">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>

            {/* Step 1 — Service */}
            {step === 1 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {serviceOptions.map(opt => (
                  <ServiceCard key={opt.id} opt={{ ...opt, base: (BRANDING_SERVICE_KEY[opt.id] ? rates[`branding.${BRANDING_SERVICE_KEY[opt.id]}`] : undefined) ?? opt.base }} isActive={data.service === opt.id} onClick={() => setData(d => ({ ...d, service: opt.id }))} />
                ))}
              </div>
            )}

            {/* Step 2 — Status */}
            {step === 2 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {brandStatuses.map(s => (
                  <StatusCard key={s.id} opt={s} isActive={data.status === s.id} onClick={() => setData(d => ({ ...d, status: s.id }))} />
                ))}
              </div>
            )}

            {/* Step 3 — Brand Identity Deliverables */}
            {step === 3 && (
              <div className="mt-6 sm:mt-8">
                <div className="flex flex-wrap gap-2">
                  {deliverables.filter(d => d.group === "Brand Identity").map(d => (
                    <button key={d.id} type="button"
                      onMouseEnter={() => setHovChips(h => ({ ...h, [d.id]: true }))}
                      onMouseLeave={() => setHovChips(h => ({ ...h, [d.id]: false }))}
                      onClick={() => toggleDeliverable(d.id)}
                      className="px-4 py-3 border text-base transition-all duration-200 flex items-center gap-2"
                      style={chipStyle(data.deliverables.includes(d.id), hovChips[d.id])}>
                      {d.label}
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", opacity: 0.6 }}>+{fmt((BRANDING_DEL_KEY[d.id] ? rates[`branding.${BRANDING_DEL_KEY[d.id]}`] : undefined) ?? d.cost)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 — Marketing Assets & Collateral */}
            {step === 4 && (
              <div className="mt-6 sm:mt-8">
                <div className="flex flex-wrap gap-2">
                  {deliverables.filter(d => d.group === "Marketing Assets").map(d => (
                    <button key={d.id} type="button"
                      onMouseEnter={() => setHovChips(h => ({ ...h, [d.id]: true }))}
                      onMouseLeave={() => setHovChips(h => ({ ...h, [d.id]: false }))}
                      onClick={() => toggleDeliverable(d.id)}
                      className="px-4 py-3 border text-base transition-all duration-200 flex items-center gap-2"
                      style={chipStyle(data.deliverables.includes(d.id), hovChips[d.id])}>
                      {d.label}
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", opacity: 0.6 }}>+{fmt((BRANDING_DEL_KEY[d.id] ? rates[`branding.${BRANDING_DEL_KEY[d.id]}`] : undefined) ?? d.cost)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 — Campaign Creative */}
            {step === 5 && (
              <div className="mt-6 sm:mt-8">
                <div className="flex flex-wrap gap-2">
                  {deliverables.filter(d => d.group === "Campaign Creative").map(d => (
                    <button key={d.id} type="button"
                      onMouseEnter={() => setHovChips(h => ({ ...h, [d.id]: true }))}
                      onMouseLeave={() => setHovChips(h => ({ ...h, [d.id]: false }))}
                      onClick={() => toggleDeliverable(d.id)}
                      className="px-4 py-3 border text-base transition-all duration-200 flex items-center gap-2"
                      style={chipStyle(data.deliverables.includes(d.id), hovChips[d.id])}>
                      {d.label}
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", opacity: 0.6 }}>+{fmt((BRANDING_DEL_KEY[d.id] ? rates[`branding.${BRANDING_DEL_KEY[d.id]}`] : undefined) ?? d.cost)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6 — Timeline */}
            {step === 6 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {timelines.map(t => (
                  <TimelineCard key={t.id} opt={t} isActive={data.timeline === t.id} onClick={() => setData(d => ({ ...d, timeline: t.id }))} />
                ))}
              </div>
            )}

            {/* Step 7 — Estimate */}
            {step === 7 && (
              <div className="mt-6 sm:mt-8 space-y-8 max-w-3xl">
                <div className="p-6 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.25)`, backgroundColor: `rgba(${ACCENT_RGB},0.06)` }}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, fontSize: "11px", letterSpacing: "0.3em" }} className="uppercase mb-1">Project Total</p>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", color: "white", fontSize: "14px" }}>
                        {serviceOptions.find(s => s.id === data.service)?.label ?? "Brand Project"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontFamily: "'Montserrat',sans-serif", color: ACCENT, fontSize: "28px" }}>{fmt(estimate.total)}</p>
                      <p style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "0.15em" }}>inc. VAT</p>
                    </div>
                  </div>

                  {/* Selected deliverables */}
                  {data.deliverables.length > 0 && (
                    <div className="border-t pt-4" style={{ borderColor: `rgba(${ACCENT_RGB},0.15)` }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.6)`, fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase mb-3">Selected deliverables</p>
                      <div className="space-y-2">
                        {deliverables.filter(d => data.deliverables.includes(d.id)).map(d => (
                          <div key={d.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Check size={11} style={{ color: ACCENT, flexShrink: 0 }} />
                              <span style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{d.label}</span>
                            </div>
                            <span style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>{fmt((BRANDING_DEL_KEY[d.id] ? rates[`branding.${BRANDING_DEL_KEY[d.id]}`] : undefined) ?? d.cost)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cost breakdown */}
                <div className="border" style={{ borderColor: `rgba(${ACCENT_RGB},0.12)` }}>
                  {[
                    { label: `${serviceOptions.find(s => s.id === data.service)?.label ?? "Service"} — base`, val: fmt((BRANDING_SERVICE_KEY[data.service] ? rates[`branding.${BRANDING_SERVICE_KEY[data.service]}`] : undefined) ?? serviceOptions.find(s => s.id === data.service)?.base ?? 0) },
                    ...(data.deliverables.length > 0 ? [{ label: `Additional deliverables (${data.deliverables.length})`, val: fmt(deliverables.filter(d => data.deliverables.includes(d.id)).reduce((s, d) => s + ((BRANDING_DEL_KEY[d.id] ? rates[`branding.${BRANDING_DEL_KEY[d.id]}`] : undefined) ?? d.cost), 0)) }] : []),
                    ...(estimate.surcharge > 0 ? [{ label: `Rush timeline surcharge (+${Math.round((timelines.find(t => t.id === data.timeline)?.surcharge ?? 0) * 100)}%)`, val: fmt(estimate.surcharge) }] : []),
                    { label: "VAT (20%)", val: fmt(estimate.vat) },
                    { label: "Project total (inc. VAT)", val: fmt(estimate.total), highlight: true },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-4 border-b last:border-b-0" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)`, backgroundColor: row.highlight ? `rgba(${ACCENT_RGB},0.07)` : "transparent" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", color: row.highlight ? "white" : "rgba(255,255,255,0.5)", fontSize: "13px" }}>{row.label}</span>
                      <span style={{ fontFamily: "'DM Mono',monospace", color: row.highlight ? ACCENT : "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "0.05em" }}>{row.val}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  * Indicative pricing. Your final quote may vary following our discovery consultation.
                </p>
              </div>
            )}

            {/* Step 8 — About You */}
            {step === 8 && (
              <div className="mt-6 sm:mt-8 space-y-5 max-w-2xl">
                {[
                  { field: "name" as const,     label: "Your name",      ph: "Jane Smith",             type: "text"  },
                  { field: "emailAddr" as const, label: "Email address",  ph: "jane@company.com",      type: "email" },
                  { field: "company" as const,   label: "Company name",   ph: "Your Company Ltd",       type: "text"  },
                  { field: "website" as const,   label: "Website URL",    ph: "https://yoursite.co.uk", type: "url"   },
                ].map(({ field, label, ph, type }) => (
                  <div key={field}>
                    <label style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.7)`, fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase block mb-2">{label}</label>
                    <input type={type} value={data[field]} onChange={e => setData(d => ({ ...d, [field]: e.target.value }))} placeholder={ph}
                      className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, color: "white", fontFamily: "'Inter',sans-serif" }}
                      onFocus={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.2)`; }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.7)`, fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase block mb-2">Tell us more about your brand vision</label>
                  <textarea value={data.brief} onChange={e => setData(d => ({ ...d, brief: e.target.value }))} placeholder="Your industry, target audience, competitors you admire, brands you like, any brand history or guidelines you have..."
                    rows={4} className="w-full bg-transparent border px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                    style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, color: "white", fontFamily: "'Inter',sans-serif" }}
                    onFocus={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.2)`; }} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

          {/* ── Navigation ────────────────────────────────────────────────────── */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-white/5">
            <button type="button" onClick={back} disabled={step === 1}
              className="flex items-center gap-2 transition-opacity duration-200"
              style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.5)`, fontSize: "11px", letterSpacing: "0.2em", opacity: step === 1 ? 0 : 1 }}>
              <ArrowLeft size={13} /> BACK
            </button>

            {step < TOTAL_STEPS ? (
              <button type="button" onClick={next} disabled={!canNext()}
                className="flex items-center gap-3 px-8 py-4 transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.2em",
                  backgroundColor: canNext() ? ACCENT : "transparent",
                  color: canNext() ? "#0a0a0a" : `rgba(${ACCENT_RGB},0.3)`,
                  border: `1px solid ${canNext() ? ACCENT : `rgba(${ACCENT_RGB},0.2)`}`,
                  cursor: canNext() ? "pointer" : "not-allowed",
                }}>
                CONTINUE <ArrowRight size={13} />
              </button>
            ) : (
              <button type="button" onClick={() => setSubmitted(true)}
                disabled={!data.name || !data.emailAddr}
                className="flex items-center gap-3 px-8 py-4 transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.2em",
                  backgroundColor: (data.name && data.emailAddr) ? ACCENT : "transparent",
                  color: (data.name && data.emailAddr) ? "#0a0a0a" : `rgba(${ACCENT_RGB},0.3)`,
                  border: `1px solid ${(data.name && data.emailAddr) ? ACCENT : `rgba(${ACCENT_RGB},0.2)`}`,
                  cursor: (data.name && data.emailAddr) ? "pointer" : "not-allowed",
                }}>
                SEND BRIEF <Check size={13} />
              </button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}