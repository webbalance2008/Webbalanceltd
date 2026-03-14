import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Check, HelpCircle,
  Globe, Layers, Code2, ShoppingCart, Database, Server, LayoutTemplate,
  Users, TrendingUp, BarChart3, Zap,
  Shield, HardDrive, Wifi, RefreshCw, Mail, Activity, Lock, Copy,
  Star, LucideIcon,
} from "lucide-react";

const ACCENT      = "#f59e6a";
const ACCENT_RGB  = "245, 158, 106";
const DEPT_BG     = "#2a1a4e";
const TOTAL_STEPS = 6;
const VAT_RATE    = 0.20;

// ─── Step 1 — What needs hosting ─────────────────────────────────────────────

const hostingNeeds: { id: string; label: string; sub: string; Icon: LucideIcon }[] = [
  { id: "new-site",    label: "New website being built",       sub: "Not live yet — needs hosting from launch",     Icon: Globe    },
  { id: "migration",   label: "Existing site (moving hosts)",  sub: "Live site that needs migrating",               Icon: RefreshCw },
  { id: "webapp",      label: "Web application / platform",    sub: "Custom-built app, API, or platform",           Icon: Code2    },
  { id: "wordpress",   label: "WordPress website",             sub: "Standard or WooCommerce-powered site",         Icon: LayoutTemplate },
  { id: "multi-site",  label: "Multiple websites",             sub: "More than one domain to manage",               Icon: Copy     },
  { id: "other",       label: "Something else",                sub: "I'll describe it in my brief",                 Icon: Server   },
];

// ─── Step 2 — Platform / Technology ──────────────────────────────────────────

const platforms: { id: string; label: string; sub: string; Icon: LucideIcon; unsure?: boolean }[] = [
  { id: "wordpress",   label: "WordPress",                     sub: "Including WooCommerce",                        Icon: LayoutTemplate },
  { id: "react",       label: "React / Next.js / Vite",        sub: "Modern JS framework",                          Icon: Code2    },
  { id: "shopify",     label: "Shopify / Headless E-Commerce", sub: "Custom Shopify theme or headless",             Icon: ShoppingCart },
  { id: "static",      label: "Static / JAMstack",             sub: "HTML, Jekyll, Hugo, Astro",                    Icon: Globe    },
  { id: "laravel",     label: "Laravel / PHP",                 sub: "PHP applications and APIs",                    Icon: Server   },
  { id: "python",      label: "Python / Django / FastAPI",     sub: "Python applications",                          Icon: Database },
  { id: "other",       label: "Other / Custom Stack",          sub: "Something else entirely",                      Icon: Layers   },
  { id: "unsure",      label: "Not sure / need advice",        sub: "We'll recommend the best fit",                 Icon: HelpCircle, unsure: true },
];

// ─── Step 3 — Traffic & Scale ─────────────────────────────────────────────────

const trafficLevels: { id: string; label: string; sub: string; rec: string; Icon: LucideIcon; unsure?: boolean }[] = [
  { id: "tiny",     label: "Under 1,000 visits/mo",     sub: "Small business, just starting",         rec: "starter",      Icon: Users      },
  { id: "small",    label: "1,000 – 10,000 visits/mo",  sub: "Growing local or niche business",       rec: "starter",      Icon: TrendingUp },
  { id: "medium",   label: "10,000 – 50,000 visits/mo", sub: "Established regional business",         rec: "professional", Icon: BarChart3  },
  { id: "large",    label: "50,000 – 200,000 visits/mo",sub: "High-traffic website or e-commerce",    rec: "professional", Icon: Zap        },
  { id: "enterprise",label: "200,000+/mo",              sub: "Enterprise or high-volume platform",    rec: "enterprise",   Icon: Server     },
  { id: "variable", label: "Variable / spiky traffic",  sub: "Campaigns, seasonal, or unpredictable", rec: "professional", Icon: TrendingUp },
  { id: "unsure",   label: "Not sure yet",              sub: "We'll help you estimate the right size", rec: "starter",     Icon: HelpCircle, unsure: true },
];

// ─── Step 4 — Required Features ──────────────────────────────────────────────

interface Feature { id: string; label: string; sub: string; Icon: LucideIcon; alwaysOn?: boolean }

const features: Feature[] = [
  { id: "ssl",       label: "Free SSL Certificate",      sub: "HTTPS — automatic & auto-renewing",      Icon: Lock,       alwaysOn: true },
  { id: "backups",   label: "Daily Automated Backups",   sub: "30-day retention, one-click restore",    Icon: HardDrive  },
  { id: "cdn",       label: "Global CDN",                sub: "Edge delivery for fast global load times",Icon: Wifi       },
  { id: "staging",   label: "Staging Environment",       sub: "Test changes before going live",          Icon: Layers     },
  { id: "updates",   label: "Managed CMS Updates",       sub: "Plugin & core updates handled for you",   Icon: RefreshCw  },
  { id: "monitoring",label: "24/7 Uptime Monitoring",    sub: "Instant alerts if anything goes down",   Icon: Activity   },
  { id: "email",     label: "Email Hosting",             sub: "Professional mailboxes on your domain",   Icon: Mail       },
  { id: "ddos",      label: "DDoS Protection",           sub: "Traffic filtering at the edge",          Icon: Shield     },
  { id: "multisite", label: "Multi-Domain Support",      sub: "Host multiple sites under one account",  Icon: Globe      },
];

// ─── Plans ────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthly: 25,
    setup: 150,
    description: "Perfect for small business websites with standard traffic.",
    features: ["5GB Storage", "100GB Bandwidth", "Free SSL", "Daily Backups (14-day)", "Uptime Monitoring", "Email Support"],
    recommended: ["tiny", "small"],
  },
  {
    id: "professional",
    name: "Professional",
    monthly: 65,
    setup: 250,
    description: "High-performance hosting for growing businesses.",
    features: ["25GB Storage", "Unlimited Bandwidth", "Free SSL", "Daily Backups (30-day)", "Global CDN", "Staging Environment", "Priority Support"],
    highlight: true,
    recommended: ["medium", "large", "variable"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 0,
    setup: 0,
    description: "Dedicated infrastructure and bespoke SLAs for mission-critical applications.",
    features: ["Dedicated Server", "Custom Storage & Bandwidth", "Advanced DDoS", "99.99% SLA", "Dedicated Account Manager", "24/7 Phone Support"],
    recommended: ["enterprise"],
  },
];

// ─── Step meta ────────────────────────────────────────────────────────────────

const stepMeta = [
  { step: 1, label: "Hosting Need",  title: "What needs hosting?",               subtitle: "Tell us about the site or application we'll be powering." },
  { step: 2, label: "Technology",    title: "What platform is it built on?",      subtitle: "This determines the optimal infrastructure for your setup." },
  { step: 3, label: "Scale",         title: "How much traffic do you expect?",    subtitle: "This helps us recommend the right plan and infrastructure." },
  { step: 4, label: "Features",      title: "What do you need included?",         subtitle: "SSL is included on every plan. Select any additional requirements." },
  { step: 5, label: "Your Plan",     title: "Choose your hosting plan.",          subtitle: "Based on your requirements — we'll confirm fit on our call." },
  { step: 6, label: "About You",     title: "Almost there.",                       subtitle: "A few details so we can prepare your personalised hosting quote." },
];

// ─── Form state ───────────────────────────────────────────────────────────────

interface HostingFormData {
  hostingNeed: string;
  platform: string;
  traffic: string;
  features: string[];
  plan: string;
  name: string; emailAddr: string; company: string; website: string; brief: string;
}

const initialData: HostingFormData = {
  hostingNeed: "", platform: "", traffic: "", features: ["ssl"], plan: "",
  name: "", emailAddr: "", company: "", website: "", brief: "",
};

function fmt(n: number) { return "£" + n.toLocaleString("en-GB"); }

// ─── UI helpers ───────────────────────────────────────────────────────────────

// ─── TypeCard ────────────────────────────────────────────────────────────────

function TypeCard({ id, label, sub, Icon, isActive, isUnsure, onClick }: {
  id: string; label: string; sub: string; Icon: LucideIcon; isActive: boolean; isUnsure?: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-5 border text-left transition-all duration-200"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : isUnsure ? `rgba(${ACCENT_RGB},0.28)` : `rgba(${ACCENT_RGB},0.15)`,
        borderStyle:     isUnsure && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : isUnsure ? "transparent" : `rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive ? `0 0 22px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 14px rgba(${ACCENT_RGB},0.1)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.45),transparent)` : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.12),transparent)`,
        transition: "all 0.2s",
      }} />
      <Icon size={18} strokeWidth={1.25} style={{ color: isActive ? ACCENT : isUnsure ? `rgba(${ACCENT_RGB},0.5)` : `rgba(${ACCENT_RGB},0.4)`, marginBottom: "10px", transition: "color 0.2s" }} />
      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", fontWeight: 600, color: isActive ? "white" : isUnsure ? `rgba(${ACCENT_RGB},0.75)` : "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{label}</p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: isActive ? `rgba(${ACCENT_RGB},0.7)` : "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{sub}</p>
      {isActive && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── FeatureToggle ────────────────────────────────────────────────────────────

function FeatureToggle({ feat, isActive, onClick }: { feat: Feature; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const Icon = feat.Icon;
  const locked = !!feat.alwaysOn;
  return (
    <button type="button" onClick={locked ? undefined : onClick}
      onMouseEnter={() => !locked && setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-4 border text-left transition-all duration-200"
      style={{
        cursor:          locked ? "not-allowed" : "pointer",
        opacity:         locked ? 0.6 : 1,
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.15)`,
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : `rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive && !locked ? `0 0 18px rgba(${ACCENT_RGB},0.18)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : "transparent",
        transition: "all 0.2s",
      }} />
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.4)`, marginTop: "2px", flexShrink: 0, transition: "color 0.2s" }} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px", fontWeight: 600, color: isActive ? "white" : "rgba(255,255,255,0.9)" }}>{feat.label}</p>
            {locked && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.12em", color: ACCENT, backgroundColor: `rgba(${ACCENT_RGB},0.12)`, padding: "2px 6px", border: `1px solid rgba(${ACCENT_RGB},0.3)` }}>INCLUDED</span>}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{feat.sub}</p>
        </div>
        <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200" style={{
          backgroundColor: isActive ? ACCENT : "transparent",
          border: `1px solid ${isActive ? ACCENT : `rgba(${ACCENT_RGB},0.3)`}`,
        }}>
          {isActive && <Check size={9} color="#0a0a0a" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}

// ─── PlanCard ────────────────────────────────────────────────────────────────

function PlanCard({ plan, isActive, isRecommended, onClick }: {
  plan: typeof plans[0]; isActive: boolean; isRecommended: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const isEnterprise = plan.id === "enterprise";
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-6 border text-left transition-all duration-200 w-full"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : plan.highlight ? `rgba(${ACCENT_RGB},0.25)` : `rgba(${ACCENT_RGB},0.15)`,
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : plan.highlight ? `rgba(${ACCENT_RGB},0.05)` : "transparent",
        boxShadow:       isActive ? `0 0 28px rgba(${ACCENT_RGB},0.2)` : hov ? `0 0 16px rgba(${ACCENT_RGB},0.12)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)` : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)` : plan.highlight ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.2),transparent)` : "transparent",
        transition: "all 0.2s",
      }} />

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "18px", fontWeight: 700, color: isActive ? "white" : "rgba(255,255,255,0.9)" }}>{plan.name}</p>
            {plan.highlight && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.15em", color: "#0a0a0a", backgroundColor: ACCENT, padding: "2px 8px" }}>POPULAR</span>}
            {isRecommended && !isActive && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.15em", color: ACCENT, border: `1px solid rgba(${ACCENT_RGB},0.4)`, padding: "2px 8px" }}>RECOMMENDED</span>}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", maxWidth: "200px", lineHeight: 1.4 }}>{plan.description}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          {isEnterprise ? (
            <p style={{ fontFamily: "'Montserrat',sans-serif", color: isActive ? ACCENT : "rgba(255,255,255,0.7)", fontSize: "18px" }}>Custom</p>
          ) : (
            <>
              <p style={{ fontFamily: "'Montserrat',sans-serif", color: isActive ? ACCENT : "white", fontSize: "24px" }}>{fmt(plan.monthly)}<span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mo</span></p>
              <p style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.08em" }}>+{fmt(plan.setup)} setup</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {plan.features.map(f => (
          <div key={f} className="flex items-center gap-2">
            <Check size={11} style={{ color: isActive ? ACCENT : `rgba(${ACCENT_RGB},0.5)`, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)" }}>{f}</span>
          </div>
        ))}
      </div>

      {isActive && (
        <div className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HostingStartPage() {
  const [step, setStep]   = useState(1);
  const [dir, setDir]     = useState(1);
  const [data, setData]   = useState<HostingFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const next = () => { setDir(1); setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 1)); };

  const toggleFeature = (id: string) => {
    if (id === "ssl") return; // always on
    setData(d => ({ ...d, features: d.features.includes(id) ? d.features.filter(x => x !== id) : [...d.features, id] }));
  };

  const canNext = () => {
    if (step === 1) return !!data.hostingNeed;
    if (step === 2) return !!data.platform;
    if (step === 3) return !!data.traffic;
    if (step === 4) return true; // features optional (SSL always on)
    if (step === 5) return !!data.plan;
    return true;
  };

  const sm = stepMeta[step - 1];
  const progress = (step / TOTAL_STEPS) * 100;

  // Recommended plan based on traffic
  const trafficOpt = trafficLevels.find(t => t.id === data.traffic);
  const recommendedPlan = trafficOpt?.rec ?? "";

  const selectedPlan = plans.find(p => p.id === data.plan);
  const isEnterprisePlan = data.plan === "enterprise";

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: DEPT_BG }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: `rgba(${ACCENT_RGB},0.15)`, border: `1px solid ${ACCENT}` }}>
            <Check size={28} style={{ color: ACCENT }} />
          </div>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", color: "white" }} className="text-3xl mb-4">Quote request received.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.55)" }} className="text-sm leading-relaxed mb-8">
            Our hosting team will review your requirements and come back with a confirmed quote within 1 business day.
          </p>
          <a href="/hosting" style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, border: `1px solid rgba(${ACCENT_RGB},0.3)`, padding: "12px 28px", fontSize: "11px", letterSpacing: "0.25em" }} className="uppercase inline-block">
            Back to Hosting
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEPT_BG }}>
      {/* Progress bar */}
      <div className="fixed top-24 left-0 right-0 z-40 h-px" style={{ backgroundColor: `rgba(${ACCENT_RGB},0.1)` }}>
        <motion.div className="h-full" style={{ backgroundColor: ACCENT, width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-40 pb-32">
        {/* Step label */}
        <motion.p key={`label-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: "'DM Mono',monospace", color: ACCENT }} className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-8">
          <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
          Step {sm.step} of {TOTAL_STEPS} — {sm.label}
        </motion.p>

        {/* Title */}
        <div className="overflow-hidden pb-[0.2em] mb-2">
          <motion.h1 key={`title-${step}`} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Montserrat',sans-serif", color: "white" }} className="text-4xl md:text-5xl">
            {sm.title}
          </motion.h1>
        </div>
        <motion.p key={`sub-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed mb-12">
          {sm.subtitle}
        </motion.p>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>

            {/* Step 1 — Hosting Need */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostingNeeds.map(n => (
                  <TypeCard key={n.id} {...n} isActive={data.hostingNeed === n.id} onClick={() => setData(d => ({ ...d, hostingNeed: n.id }))} />
                ))}
              </div>
            )}

            {/* Step 2 — Platform */}
            {step === 2 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {platforms.map(p => (
                  <TypeCard key={p.id} {...p} isActive={data.platform === p.id} isUnsure={!!p.unsure} onClick={() => setData(d => ({ ...d, platform: p.id }))} />
                ))}
              </div>
            )}

            {/* Step 3 — Traffic */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trafficLevels.map(t => (
                  <TypeCard key={t.id} {...t} isActive={data.traffic === t.id} isUnsure={!!t.unsure} onClick={() => setData(d => ({ ...d, traffic: t.id }))} />
                ))}
              </div>
            )}

            {/* Step 4 — Features */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map(f => (
                  <FeatureToggle key={f.id} feat={f} isActive={data.features.includes(f.id)} onClick={() => toggleFeature(f.id)} />
                ))}
              </div>
            )}

            {/* Step 5 — Plan */}
            {step === 5 && (
              <div className="space-y-4">
                {recommendedPlan && (
                  <p style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.6)`, fontSize: "10px", letterSpacing: "0.3em" }} className="uppercase mb-4">
                    Based on your traffic estimate, we recommend {plans.find(p => p.id === recommendedPlan)?.name}
                  </p>
                )}
                {plans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} isActive={data.plan === plan.id} isRecommended={plan.id === recommendedPlan && data.plan !== plan.id} onClick={() => setData(d => ({ ...d, plan: plan.id }))} />
                ))}
              </div>
            )}

            {/* Step 6 — About You */}
            {step === 6 && (
              <div className="space-y-8">
                {/* Quote summary */}
                {selectedPlan && (
                  <div className="p-5 border" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, backgroundColor: `rgba(${ACCENT_RGB},0.05)` }}>
                    <p style={{ fontFamily: "'DM Mono',monospace", color: ACCENT, fontSize: "10px", letterSpacing: "0.3em" }} className="uppercase mb-3">Quote Summary</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p style={{ fontFamily: "'Montserrat',sans-serif", color: "white", fontSize: "18px" }}>{selectedPlan.name} Plan</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                          {data.features.length} feature{data.features.length !== 1 ? "s" : ""} selected
                        </p>
                      </div>
                      <div className="text-right">
                        {isEnterprisePlan ? (
                          <p style={{ fontFamily: "'Montserrat',sans-serif", color: ACCENT, fontSize: "20px" }}>Custom</p>
                        ) : (
                          <>
                            <p style={{ fontFamily: "'Montserrat',sans-serif", color: ACCENT, fontSize: "22px" }}>{fmt(selectedPlan.monthly)}/mo</p>
                            <p style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>+{fmt(selectedPlan.setup)} setup • ex. VAT</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  {[
                    { field: "name" as const,     label: "Your name",      ph: "Jane Smith",             type: "text"  },
                    { field: "emailAddr" as const, label: "Email address",  ph: "jane@company.com",      type: "email" },
                    { field: "company" as const,   label: "Company name",   ph: "Your Company Ltd",       type: "text"  },
                    { field: "website" as const,   label: "Current website URL (if migrating)", ph: "https://yoursite.co.uk", type: "url" },
                  ].map(({ field, label, ph, type }) => (
                    <div key={field}>
                      <label style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.7)`, fontSize: "10px", letterSpacing: "0.25em" }} className="uppercase block mb-2">{label}</label>
                      <input type={type} value={data[field]} onChange={e => setData(d => ({ ...d, [field]: e.target.value }))} placeholder={ph}
                        className="w-full bg-transparent border px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, color: "white", fontFamily: "'Inter',sans-serif" }}
                        onFocus={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`; }}
                        onBlur={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.2)`; }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.7)`, fontSize: "10px", letterSpacing: "0.25em" }} className="uppercase block mb-2">Anything else we should know?</label>
                    <textarea value={data.brief} onChange={e => setData(d => ({ ...d, brief: e.target.value }))} placeholder="Current host, migration deadline, expected traffic spikes, tech stack details, special requirements..."
                      rows={4} className="w-full bg-transparent border px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                      style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, color: "white", fontFamily: "'Inter',sans-serif" }}
                      onFocus={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.2)`; }} />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-14">
          <button type="button" onClick={back} disabled={step === 1}
            className="flex items-center gap-2 transition-opacity duration-200"
            style={{ fontFamily: "'DM Mono',monospace", color: `rgba(${ACCENT_RGB},0.5)`, fontSize: "11px", letterSpacing: "0.2em", opacity: step === 1 ? 0 : 1 }}>
            <ArrowLeft size={13} /> Back
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
              REQUEST QUOTE <Check size={13} />
            </button>
          )}
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{ width: i + 1 === step ? "20px" : "6px", height: "6px", backgroundColor: i + 1 <= step ? ACCENT : `rgba(${ACCENT_RGB},0.2)` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
