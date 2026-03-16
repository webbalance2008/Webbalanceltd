import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Check, HelpCircle, ChevronDown,
  Building2, ShoppingBag, UtensilsCrossed, Home, Heart, Star, Briefcase,
  Globe, MapPin, Map, Plane,
  BarChart3, TrendingUp, Target, Zap, ShieldCheck, Link2, FileSearch, LineChart,
  PoundSterling, LucideIcon,
} from "lucide-react";
import { sendEmail } from "../utils/sendEmail";
import { SEOHead } from "../components/SEOHead";
import { useIsMobile } from "../hooks/useIsMobile";

const ACCENT      = "#3dd68c";
const ACCENT_RGB  = "61, 214, 140";
const DEPT_BG     = "#16212e";
const TOTAL_STEPS = 8;
const VAT_RATE    = 0.20;

// ─── Step 1 — Business Type ──────────────────────────────────────────────────

const businessTypes: { id: string; label: string; sub: string; Icon: LucideIcon }[] = [
  { id: "local",        label: "Local Service Business",     sub: "Trades, clinics, salons, professionals",   Icon: MapPin      },
  { id: "hospitality",  label: "Restaurant & Hospitality",   sub: "Restaurants, hotels, bars, venues",        Icon: UtensilsCrossed },
  { id: "ecommerce",    label: "E-Commerce Store",           sub: "Products sold online",                     Icon: ShoppingBag },
  { id: "b2b",          label: "B2B / Professional Services",sub: "Agencies, consultancies, SaaS",            Icon: Briefcase   },
  { id: "property",     label: "Property & Real Estate",     sub: "Agents, developers, lettings",             Icon: Home        },
  { id: "healthcare",   label: "Healthcare & Medical",        sub: "Practices, clinics, therapists",           Icon: Heart       },
  { id: "charity",      label: "Charity / Non-Profit",       sub: "Causes, NGOs, community organisations",    Icon: Star        },
  { id: "other",        label: "Other",                      sub: "I'll describe it in my brief",             Icon: Building2   },
];

// ─── Step 2 — Current SEO Status ─────────────────────────────────────────────

const seoStatuses: { id: string; label: string; sub: string }[] = [
  { id: "new-site",    label: "Brand new website, no SEO yet",          sub: "Starting from scratch — clean slate"           },
  { id: "existing-none", label: "Existing site, never had SEO",         sub: "Site is live but never optimised"              },
  { id: "existing-paused", label: "Had SEO before, now stopped",        sub: "Previous work done but momentum lost"          },
  { id: "switching",   label: "With another agency, looking to switch",  sub: "Current provider isn't delivering results"     },
  { id: "unsure",      label: "Not sure where we stand",                 sub: "We'll help you assess your current position",  },
];

// ─── Step 3 — Goals + Scope ──────────────────────────────────────────────────

const seoGoals: string[] = [
  "Rank on Google for local searches",
  "Outrank specific competitors",
  "Generate more leads & enquiries",
  "Drive more traffic to the website",
  "Improve technical site health",
  "Build domain authority & trust",
  "Recover from a Google penalty",
  "Expand into new geographic markets",
];

const scopes: { id: string; label: string; sub: string; Icon: LucideIcon }[] = [
  { id: "local",      label: "Local",        sub: "One city, town, or postcode area",  Icon: MapPin  },
  { id: "regional",   label: "Regional",     sub: "Multiple cities or counties",        Icon: Map     },
  { id: "national",   label: "National",     sub: "UK-wide campaigns",                  Icon: Globe   },
  { id: "international", label: "International", sub: "Multi-country or global reach",  Icon: Plane   },
];

// ─── Step 4 — Monthly Budget ─────────────────────────────────────────────────

const budgets: { id: string; label: string; sub: string; package: string; monthly: number; setup: number; unsure?: boolean }[] = [
  { id: "essentials",  label: "£300 – £500/mo",   sub: "Local SEO essentials",                   package: "Essentials",   monthly: 399,  setup: 299  },
  { id: "growth",      label: "£500 – £1,000/mo", sub: "Regional or competitive local",           package: "Growth",       monthly: 699,  setup: 499  },
  { id: "accelerator", label: "£1,000 – £2,000/mo", sub: "National campaigns & e-commerce",      package: "Accelerator",  monthly: 1299, setup: 799  },
  { id: "enterprise",  label: "£2,000+/mo",        sub: "Highly competitive / enterprise scale",  package: "Enterprise",   monthly: 0,    setup: 0    },
  { id: "unsure",      label: "I'm not sure yet",  sub: "Advise me on the right level",           package: "TBD",          monthly: 0,    setup: 0, unsure: true },
];

const packageIncludes: Record<string, string[]> = {
  essentials:  ["Up to 5 tracked keywords", "Full technical site audit", "Monthly on-page optimisation", "Monthly ranking report", "Google Business Profile setup"],
  growth:      ["Up to 20 tracked keywords", "Full technical site audit", "Monthly on-page optimisation", "2 blog posts / content pieces per month", "Link building (up to 5 links/mo)", "Monthly ranking & traffic report"],
  accelerator: ["Unlimited keyword tracking", "Advanced technical SEO", "Weekly on-page optimisation", "4 blog posts / content pieces per month", "Aggressive link building campaign", "Google Business Profile management", "Quarterly strategy review calls"],
  enterprise:  ["Bespoke keyword strategy", "Full technical SEO team", "Daily monitoring & reporting", "Unlimited content production", "Digital PR & authority building", "Dedicated account manager", "Custom SLA & reporting"],
};

// ─── Step 5 — Add-On Services ─────────────────────────────────────────────────

interface AddOn { id: string; label: string; sub: string; monthlyAdd: number; oneOff: number; Icon: LucideIcon }

const addOns: AddOn[] = [
  { id: "ppc",     label: "Google Ads (PPC) management",     sub: "Search, Shopping & Display campaigns",        monthlyAdd: 199, oneOff: 0,   Icon: Target     },
  { id: "content", label: "Extra content writing",           sub: "+2 additional blog posts per month",          monthlyAdd: 149, oneOff: 0,   Icon: FileSearch  },
  { id: "links",   label: "Dedicated link-building campaign", sub: "High-authority domain outreach & placement",  monthlyAdd: 199, oneOff: 0,   Icon: Link2      },
  { id: "audit",   label: "One-off technical SEO audit",     sub: "Standalone in-depth audit & report only",     monthlyAdd: 0,   oneOff: 499, Icon: ShieldCheck },
  { id: "report",  label: "Enhanced monthly reporting",      sub: "Custom GA4 dashboard & executive summary",    monthlyAdd: 99,  oneOff: 0,   Icon: LineChart   },
  { id: "none",    label: "No add-ons needed",               sub: "Standard plan only",                          monthlyAdd: 0,   oneOff: 0,   Icon: Check       },
];

// ─── Step meta ────────────────────────────────────────────────────────────────

const stepMeta = [
  { step: 1, label: "Business",  title: "Tell us about your business.",          subtitle: "This helps us understand your market and competition." },
  { step: 2, label: "Status",    title: "Where are you with SEO right now?",     subtitle: "Honest answers help us build the right strategy from day one." },
  { step: 3, label: "Goals",     title: "What do you want to achieve?",          subtitle: "Select all that apply — we'll build your strategy around these." },
  { step: 4, label: "Scope",     title: "What's your geographic focus?",         subtitle: "This determines the scale and targeting of your campaign." },
  { step: 5, label: "Budget",    title: "What's your monthly SEO investment?",   subtitle: "SEO is a long-term strategy — choosing the right level matters." },
  { step: 6, label: "Add-Ons",   title: "Any additional services?",              subtitle: "Stack extra services on top of your core retainer." },
  { step: 7, label: "Estimate",  title: "Your indicative SEO investment.",        subtitle: "Based on your answers — transparent pricing before we talk." },
  { step: 8, label: "About You", title: "Almost there.",                          subtitle: "A few details so we can prepare a personalised proposal." },
];

// ─── Form State ───────────────────────────────────────────────────────────────

interface SEOFormData {
  businessType: string;
  seoStatus: string;
  goals: string[];
  scope: string;
  budget: string;
  addOns: string[];
  name: string; emailAddr: string; company: string; website: string; brief: string;
}

const initialData: SEOFormData = {
  businessType: "", seoStatus: "", goals: [], scope: "", budget: "", addOns: [],
  name: "", emailAddr: "", company: "", website: "", brief: "",
};

// ─── Pricing ─────────────────────────────────────────────────────────────────

interface Estimate { monthly: number; monthlyVat: number; monthlyTotal: number; setup: number; setupVat: number; setupTotal: number; oneOffExtras: number; packageLabel: string; }

function fmt(n: number) { return "£" + Math.round(n).toLocaleString("en-GB"); }

function calculateEstimate(data: SEOFormData): Estimate {
  const budgetOpt = budgets.find(b => b.id === data.budget);
  const monthly = budgetOpt?.monthly ?? 0;
  const setup   = budgetOpt?.setup ?? 0;
  const pkgLabel = budgetOpt?.package ?? "Custom";

  const selectedAddOns = addOns.filter(a => a.id !== "none" && data.addOns.includes(a.id));
  const monthlyAddExtra  = selectedAddOns.reduce((s, a) => s + a.monthlyAdd, 0);
  const oneOffExtras     = selectedAddOns.reduce((s, a) => s + a.oneOff, 0);

  const totalMonthly = monthly + monthlyAddExtra;
  return {
    monthly:      totalMonthly,
    monthlyVat:   totalMonthly * VAT_RATE,
    monthlyTotal: totalMonthly * (1 + VAT_RATE),
    setup,
    setupVat:     setup * VAT_RATE,
    setupTotal:   setup * (1 + VAT_RATE),
    oneOffExtras,
    packageLabel: pkgLabel,
  };
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function chipStyle(active: boolean, hov = false) {
  return {
    borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.6)` : `rgba(${ACCENT_RGB},0.2)`,
    backgroundColor: active ? `rgba(${ACCENT_RGB},0.14)` : hov ? `rgba(${ACCENT_RGB},0.07)` : `rgba(${ACCENT_RGB},0.03)`,
    color:           active ? ACCENT : hov ? "white" : "rgba(255,255,255,0.88)",
    boxShadow:       active ? `0 0 14px rgba(${ACCENT_RGB},0.2)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.1)` : "none",
    transition: "all 0.18s ease",
  };
}

function unsureChipStyle(active: boolean, hov = false) {
  return {
    borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.28)`,
    borderStyle:     active ? "solid" : "dashed" as const,
    backgroundColor: active ? `rgba(${ACCENT_RGB},0.14)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
    color:           active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.9)` : `rgba(${ACCENT_RGB},0.55)`,
    boxShadow:       active ? `0 0 14px rgba(${ACCENT_RGB},0.2)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.08)` : "none",
    transition: "all 0.18s ease",
  };
}

// ─── TypeCard ────────────────────────────────────────────────────────────────

function TypeCard({ id, label, sub, Icon, isActive, onClick }: {
  id: string; label: string; sub: string; Icon: LucideIcon; isActive: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
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
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.9)", marginBottom: "4px", transition: "color 0.2s" }}>{label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: isActive ? `rgba(${ACCENT_RGB},0.8)` : "rgba(255,255,255,0.9)", lineHeight: 1.5, transition: "color 0.2s" }}>{sub}</p>
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── StatusCard ──────────────────────────────────────────────────────────────

function StatusCard({ opt, isActive, onClick }: { opt: typeof seoStatuses[0]; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const isUnsure = opt.id === "unsure";
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
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)` : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.1),transparent)`,
        transition: "all 0.2s",
      }} />
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : isUnsure ? `rgba(${ACCENT_RGB},0.75)` : "rgba(255,255,255,0.9)", marginBottom: "4px", transition: "color 0.2s" }}>{opt.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: isActive ? `rgba(${ACCENT_RGB},0.7)` : "rgba(255,255,255,0.9)", lineHeight: 1.5, transition: "color 0.2s" }}>{opt.sub}</p>
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── BudgetCard ──────────────────────────────────────────────────────────────

function BudgetCard({ opt, isActive, onClick }: { opt: typeof budgets[0]; isActive: boolean; onClick: () => void }) {
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
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 700, color: isActive ? "white" : isUnsure ? `rgba(${ACCENT_RGB},0.75)` : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{opt.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: isActive ? `rgba(${ACCENT_RGB},0.7)` : "rgba(255,255,255,0.9)" }}>{opt.sub}</p>
      {!isUnsure && opt.monthly > 0 && (
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.35)`, marginTop: "10px", transition: "color 0.2s" }}>
          from {fmt(opt.monthly)}/mo + VAT
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

// ─── AddOnCard ───────────────────────────────────────────────────────────────

function AddOnCard({ addon, isActive, onClick, noneActive }: { addon: AddOn; isActive: boolean; onClick: () => void; noneActive: boolean }) {
  const [hov, setHov] = useState(false);
  const isNone = addon.id === "none";
  const dimmed = noneActive && !isNone && !isActive;
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-5 border text-left transition-all duration-200"
      style={{
        opacity:         dimmed ? 0.4 : 1,
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : isNone ? `rgba(${ACCENT_RGB},0.28)` : `rgba(${ACCENT_RGB},0.15)`,
        borderStyle:     isNone && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       isActive ? `0 0 18px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.08)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)` : "transparent",
        transition: "all 0.2s",
      }} />
      <addon.Icon size={16} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.7)` : `rgba(${ACCENT_RGB},0.4)`, marginBottom: "10px", transition: "color 0.2s" }} />
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{addon.label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.9)", marginBottom: "8px", lineHeight: 1.5 }}>{addon.sub}</p>
      {(addon.monthlyAdd > 0 || addon.oneOff > 0) && (
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.08em", color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.35)`, transition: "color 0.2s" }}>
          {addon.monthlyAdd > 0 ? `+${fmt(addon.monthlyAdd)}/mo` : `${fmt(addon.oneOff)} one-off`}
        </p>
      )}
      {isActive && (
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px rgba(${ACCENT_RGB},0.6)` }}>
          <Check size={9} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SeoStartPage() {
  const isMobile = useIsMobile();
  const [step, setStep]     = useState(1);
  const [dir, setDir]       = useState(1);
  const [data, setData]     = useState<SEOFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [hovChips, setHovChips]   = useState<Record<string, boolean>>({});

  const next = () => { setDir(1); setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 1)); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const toggleGoal = (g: string) =>
    setData(d => ({ ...d, goals: d.goals.includes(g) ? d.goals.filter(x => x !== g) : [...d.goals, g] }));

  const toggleAddOn = (id: string) => {
    if (id === "none") { setData(d => ({ ...d, addOns: d.addOns.includes("none") ? [] : ["none"] })); return; }
    setData(d => ({ ...d, addOns: d.addOns.includes(id) ? d.addOns.filter(x => x !== id) : d.addOns.filter(x => x !== "none").concat(id) }));
  };

  const canNext = () => {
    if (step === 1) return !!data.businessType;
    if (step === 2) return !!data.seoStatus;
    if (step === 3) return data.goals.length > 0;
    if (step === 4) return !!data.scope;
    if (step === 5) return !!data.budget;
    if (step === 6) return data.addOns.length > 0;
    return true;
  };

  const estimate = calculateEstimate(data);
  const budgetOpt = budgets.find(b => b.id === data.budget);
  const isEnterprise = data.budget === "enterprise" || data.budget === "unsure";
  const sm = stepMeta[step - 1];
  const progress = (step / TOTAL_STEPS) * 100;
  const noneActive = data.addOns.includes("none");

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
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", color: "white" }} className="text-3xl mb-4">We've got your brief.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.55)" }} className="text-sm leading-relaxed mb-8">
            One of our SEO strategists will review your answers and come back to you with a personalised proposal within 1 business day.
          </p>
          <a href="/seo" style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, border: `1px solid rgba(${ACCENT_RGB},0.3)`, padding: "12px 28px", fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase inline-block">
            Back to SEO
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEPT_BG }}>
      <SEOHead
        title="SEO Quote Builder"
        description="Walk through our SEO wizard to scope your search engine optimisation campaign. Get a tailored strategy estimate in minutes."
        path="/seo/start"
        keywords="SEO quote, search engine optimisation pricing, SEO cost estimator, UK SEO services"
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

            {/* Step 1 — Business Type */}
            {step === 1 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {businessTypes.map(bt => (
                  <TypeCard key={bt.id} {...bt} isActive={data.businessType === bt.id} onClick={() => setData(d => ({ ...d, businessType: bt.id }))} />
                ))}
              </div>
            )}

            {/* Step 2 — SEO Status */}
            {step === 2 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {seoStatuses.map(s => (
                  <StatusCard key={s.id} opt={s} isActive={data.seoStatus === s.id} onClick={() => setData(d => ({ ...d, seoStatus: s.id }))} />
                ))}
              </div>
            )}

            {/* Step 3 — Goals + Scope */}
            {step === 3 && (
              <div className="mt-6 sm:mt-8 space-y-10">
                <div>
                  <p style={{ fontFamily: "'DM Mono',monospace", color: ACCENT }} className="text-[11px] tracking-[0.3em] uppercase mb-5">Primary Goals — select all that apply</p>
                  <div className="flex flex-wrap gap-2">
                    {seoGoals.map(g => (
                      <button key={g} type="button"
                        onMouseEnter={() => setHovChips(h => ({ ...h, [g]: true }))}
                        onMouseLeave={() => setHovChips(h => ({ ...h, [g]: false }))}
                        onClick={() => toggleGoal(g)}
                        className="px-4 py-3 border text-base transition-all duration-200"
                        style={chipStyle(data.goals.includes(g), hovChips[g])}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Scope */}
            {step === 4 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {scopes.map(sc => (
                  <TypeCard key={sc.id} id={sc.id} label={sc.label} sub={sc.sub} Icon={sc.Icon} isActive={data.scope === sc.id} onClick={() => setData(d => ({ ...d, scope: sc.id }))} />
                ))}
              </div>
            )}

            {/* Step 5 — Budget */}
            {step === 5 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {budgets.map(b => (
                  <BudgetCard key={b.id} opt={b} isActive={data.budget === b.id} onClick={() => setData(d => ({ ...d, budget: b.id }))} />
                ))}
              </div>
            )}

            {/* Step 6 — Add-Ons */}
            {step === 6 && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {addOns.map(a => (
                  <AddOnCard key={a.id} addon={a} isActive={data.addOns.includes(a.id)} onClick={() => toggleAddOn(a.id)} noneActive={noneActive} />
                ))}
              </div>
            )}

            {/* Step 7 — Estimate */}
            {step === 7 && (
              <div className="mt-6 sm:mt-8 space-y-8 max-w-3xl">
                {isEnterprise ? (
                  <div className="p-8 border text-center" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, backgroundColor: `rgba(${ACCENT_RGB},0.04)` }}>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", color: ACCENT }} className="text-2xl mb-3">Enterprise / Custom</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.5)" }} className="text-sm leading-relaxed">
                      Your requirements call for a tailored proposal. One of our SEO strategists will prepare a bespoke plan and pricing after reviewing your brief.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Package summary */}
                    <div className="p-6 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.25)`, backgroundColor: `rgba(${ACCENT_RGB},0.06)` }}>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, fontSize: "11px", letterSpacing: "0.3em" }} className="uppercase mb-1">Recommended Package</p>
                          <p style={{ fontFamily: "'Montserrat',sans-serif", color: "white", fontSize: "24px" }}>{estimate.packageLabel}</p>
                        </div>
                        <div className="text-right">
                          <p style={{ fontFamily: "'Montserrat',sans-serif", color: ACCENT, fontSize: "28px" }}>{fmt(estimate.monthlyTotal)}</p>
                          <p style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.15em" }}>per month inc. VAT</p>
                        </div>
                      </div>
                      {/* Package includes */}
                      <div className="border-t pt-5" style={{ borderColor: `rgba(${ACCENT_RGB},0.15)` }}>
                        <p style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.6)`, fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase mb-3">What's included</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(packageIncludes[data.budget] ?? []).map(item => (
                            <div key={item} className="flex items-start gap-2">
                              <Check size={12} style={{ color: ACCENT, marginTop: "3px", flexShrink: 0 }} />
                              <span style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Cost breakdown */}
                    <div className="space-y-0 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.12)` }}>
                      {[
                        { label: "Monthly retainer (ex. VAT)", val: fmt(estimate.monthly) },
                        { label: "VAT (20%)", val: fmt(estimate.monthlyVat) },
                        { label: "Monthly total (inc. VAT)", val: fmt(estimate.monthlyTotal), highlight: true },
                      ].map(row => (
                        <div key={row.label} className="flex items-center justify-between px-5 py-4 border-b last:border-b-0" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)`, backgroundColor: row.highlight ? `rgba(${ACCENT_RGB},0.07)` : "transparent" }}>
                          <span style={{ fontFamily: "'Inter',sans-serif", color: row.highlight ? "white" : "rgba(255,255,255,0.5)", fontSize: "13px" }}>{row.label}</span>
                          <span style={{ fontFamily: "'DM Mono',monospace", color: row.highlight ? ACCENT : "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "0.05em" }}>{row.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Setup fee */}
                    {estimate.setup > 0 && (
                      <div className="flex items-center justify-between px-5 py-4 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.12)` }}>
                        <div>
                          <span style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>One-time setup & audit fee</span>
                          <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>Covers site audit, keyword research, and campaign setup</p>
                        </div>
                        <span style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{fmt(estimate.setupTotal)} inc. VAT</span>
                      </div>
                    )}

                    {/* Add-on extras */}
                    {estimate.oneOffExtras > 0 && (
                      <div className="flex items-center justify-between px-5 py-4 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.12)` }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>One-off add-on services</span>
                        <span style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{fmt(estimate.oneOffExtras * 1.2)} inc. VAT</span>
                      </div>
                    )}

                    <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                      * Indicative pricing based on your answers. Your final proposal may vary after our discovery call. Minimum 3-month contract recommended for SEO results.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Step 8 — About You */}
            {step === 8 && (
              <div className="mt-6 sm:mt-8 space-y-5 max-w-2xl">
                {[
                  { field: "name" as const,      label: "Your name",       ph: "Jane Smith",                 type: "text"  },
                  { field: "emailAddr" as const,  label: "Email address",   ph: "jane@company.com",          type: "email" },
                  { field: "company" as const,    label: "Company name",    ph: "Your Company Ltd",           type: "text"  },
                  { field: "website" as const,    label: "Website URL",     ph: "https://yoursite.co.uk",    type: "url"   },
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
                  <label style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.7)`, fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase block mb-2">Anything else we should know?</label>
                  <textarea value={data.brief} onChange={e => setData(d => ({ ...d, brief: e.target.value }))} placeholder="Tell us about your competitors, target keywords, past SEO experiences, or any specific goals we haven't covered..."
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
              <button type="button" onClick={() => {
                  setSubmitted(true);
                  sendEmail("start-project", {
                    name: data.name, email: data.emailAddr, company: data.company, website: data.website,
                    services: "SEO", brief: data.brief,
                    budget: data.budget, goals: data.goals.join(", "),
                  });
                }}
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