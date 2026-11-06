import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Check, RotateCcw, HelpCircle, ChevronDown,
  Server, Globe, Mail, Database,
  Calendar, Zap, Building2, ShoppingBag, Users, Wrench, Cpu,
  UserCheck, LayoutDashboard, CreditCard, Bell, FolderUp, BarChart3,
  Plug, Smartphone, BrainCircuit, Languages, Bot, Search, FileSearch,
  Workflow, TrendingUp, LucideIcon, Info, PoundSterling,
} from "lucide-react";
import { sendEmail } from "../utils/sendEmail";
import { SEOHead } from "../components/SEOHead";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePricingRates, RatesMap } from "../hooks/usePricingRates";

const ACCENT      = "#b89fd4";
const ACCENT_RGB  = "180, 150, 220";
const TOTAL_STEPS = 8;
const HOURLY_RATE = 75;
const VAT_RATE    = 0.20;

// ─── App Types ────────────────────────────────────────────────────────────────

const appTypes: { id: string; label: string; sub: string; Icon: LucideIcon; unsure?: boolean }[] = [
  { id: "booking",    label: "Booking System",      sub: "Take reservations & appointments 24/7",      Icon: Calendar    },
  { id: "portal",     label: "Customer Portal",      sub: "Branded account dashboards for your clients", Icon: Building2   },
  { id: "saas",       label: "SaaS Platform",        sub: "Multi-tenant software product",               Icon: Cpu         },
  { id: "ecommerce",  label: "E-Commerce Store",     sub: "Sell online on your own terms",               Icon: ShoppingBag },
  { id: "membership", label: "Membership Platform",  sub: "Recurring revenue & loyalty",                 Icon: Users       },
  { id: "internal",   label: "Internal Tool",        sub: "Replace spreadsheets with custom software",   Icon: Wrench      },
  { id: "other",      label: "Something Else",       sub: "I'll describe it in my brief",                Icon: HelpCircle, unsure: true },
];

// Base prices ex-VAT
const appTypeBase: Record<string, number> = {
  booking:    2500,
  portal:     3000,
  saas:       5000,
  ecommerce:  3500,
  membership: 3500,
  internal:   2000,
  other:      3000,
};

// ─── Step 2 — Goals & Scale ──────────────────────────────────────────────────

const primaryGoals = [
  "Automate a manual process",
  "Generate direct revenue",
  "Improve customer experience",
  "Replace an existing system",
  "Launch a new product / service",
  "Build internal efficiency",
  "I'm not sure yet",
];

const userScaleOptions: { id: string; label: string; sub: string; unsure?: boolean }[] = [
  { id: "under-100",   label: "Under 100 users",       sub: "Internal or small team"    },
  { id: "100-1k",      label: "100 – 1,000 users",     sub: "Growing user base"          },
  { id: "1k-10k",      label: "1,000 – 10,000 users",  sub: "Scaled product"             },
  { id: "10k-plus",    label: "10,000+ users",          sub: "Enterprise scale"           },
  { id: "unsure",      label: "I'm not sure yet",       sub: "We'll help you estimate",  unsure: true },
];

// ─── Step 3 — Features & Scope ───────────────────────────────────────────────

interface CoreFeature { id: string; label: string; cost: number; hours: number; Icon: LucideIcon; unsure?: boolean }

const coreFeatures: CoreFeature[] = [
  { id: "auth",       label: "User accounts & authentication",     cost:  500, hours:  6.7, Icon: UserCheck       },
  { id: "admin",      label: "Admin / management dashboard",       cost:  600, hours:  8.0, Icon: LayoutDashboard },
  { id: "payments",   label: "Payments & subscriptions (Stripe)",  cost:  750, hours: 10.0, Icon: CreditCard      },
  { id: "notify",     label: "Email / SMS notifications",          cost:  350, hours:  4.7, Icon: Bell            },
  { id: "uploads",    label: "File uploads & storage",             cost:  400, hours:  5.3, Icon: FolderUp        },
  { id: "analytics",  label: "Reporting & analytics",              cost:  600, hours:  8.0, Icon: BarChart3       },
  { id: "api",        label: "Third-party integrations / API",     cost:  500, hours:  6.7, Icon: Plug            },
  { id: "pwa",        label: "Mobile-responsive (PWA)",            cost:  300, hours:  4.0, Icon: Smartphone      },
  { id: "native",     label: "Native mobile app (iOS / Android)",  cost: 2500, hours: 33.3, Icon: Smartphone      },
  { id: "ai-feature", label: "AI / automation features",           cost:  600, hours:  8.0, Icon: BrainCircuit    },
  { id: "i18n",       label: "Multi-language / localisation",      cost:  450, hours:  6.0, Icon: Languages       },
  { id: "unsure",     label: "I'm not sure yet",                   cost:    0, hours:  0,   Icon: HelpCircle, unsure: true },
];

const dataComplexity: { id: string; label: string; sub: string; multiplier: number; unsure?: boolean }[] = [
  { id: "simple",   label: "Simple",   sub: "A few data types, straightforward logic",                           multiplier: 1.0 },
  { id: "moderate", label: "Moderate", sub: "Multiple entities, business rules, workflows",                      multiplier: 1.4 },
  { id: "complex",  label: "Complex",  sub: "Advanced logic, real-time data, high performance requirements",      multiplier: 1.8 },
  { id: "unsure",   label: "I'm not sure yet", sub: "Tell us your use case and we'll advise",                    multiplier: 1.0, unsure: true },
];

// ─── Step 4 — AI & Automation ────────────────────────────────────────────────

interface AiFeature { id: string; label: string; sub: string; cost: number; Icon: LucideIcon; unsure?: boolean; noai?: boolean }

const aiFeatures: AiFeature[] = [
  { id: "ai-content",    label: "AI-assisted content",          sub: "Auto-generate text, summaries, descriptions",           cost:  600, Icon: BrainCircuit },
  { id: "ai-search",     label: "Smart search / recommendations", sub: "Surface the right content or products",               cost:  800, Icon: Search       },
  { id: "ai-docs",       label: "Document processing",          sub: "Extract data from PDFs, forms, invoices",               cost: 1000, Icon: FileSearch   },
  { id: "ai-chatbot",    label: "Chatbot / AI assistant",       sub: "Built-in support or guided flows",                     cost: 1200, Icon: Bot          },
  { id: "ai-workflow",   label: "Workflow automation",          sub: "Trigger actions based on conditions",                   cost:  900, Icon: Workflow     },
  { id: "ai-insights",   label: "Predictive insights",          sub: "Dashboards that surface trends",                       cost:  800, Icon: TrendingUp   },
  { id: "no-ai",         label: "No AI needed",                 sub: "Keep it straightforward",                               cost:    0, Icon: Check, noai: true },
  { id: "ai-unsure",     label: "I'm not sure yet — advise me", sub: "",                                                      cost:    0, Icon: HelpCircle, unsure: true },
];

const buildApproaches: { id: string; label: string; sub: string; discount: number; unsure?: boolean }[] = [
  { id: "traditional",  label: "Traditional build",            sub: "Custom code, full control, higher upfront",                         discount: 0    },
  { id: "ai-build",     label: "AI-accelerated build",         sub: "AI coding tools to reduce hours — lower cost, same quality",        discount: 0.20 },
  { id: "low-code",     label: "Low-code / no-code hybrid",    sub: "Platforms like Bubble, Xano, Webflow Logic",                        discount: 0.15 },
  { id: "build-unsure", label: "Not sure — recommend best",   sub: "We'll propose the right approach after discovery",                   discount: 0,   unsure: true },
];

// ─── Step 5 — Hosting & Infrastructure ──────────────────────────────────────

interface TechOption { id: string; label: string; sub: string; owned?: boolean; unsure?: boolean; cost?: number }

const hostingOptions: TechOption[] = [
  { id: "managed",    label: "Managed Cloud Hosting",      sub: "We handle everything (AWS / GCP / Vercel)",      cost: 350 },
  { id: "cloudflare", label: "Cloudflare + Edge",          sub: "Ultra-fast global delivery",                     cost: 250 },
  { id: "vps",        label: "VPS / Dedicated Server",     sub: "Full control, self-managed",                     cost: 450 },
  { id: "existing",   label: "Already have hosting",       sub: "I'll provide access details",                    owned: true, cost: 0 },
  { id: "unsure",     label: "I'm not sure yet",           sub: "Happy to take a recommendation",                 unsure: true, cost: 0 },
];

const databaseOptions: TechOption[] = [
  { id: "managed-db", label: "Managed database",          sub: "We set it up and maintain it"                   },
  { id: "serverless",  label: "Serverless / edge functions", sub: "Fast, scalable, usage-based"                  },
  { id: "self-hosted", label: "Self-hosted / on-premise",  sub: "Data stays on your infrastructure"              },
  { id: "db-unsure",   label: "I'm not sure yet",          sub: "We'll recommend the right fit", unsure: true    },
];

const domainOptions: TechOption[] = [
  { id: "new",      label: "Need a new domain",       sub: "We'll help you find & register one",           cost: 50   },
  { id: "existing", label: "Already have a domain",   sub: "Will transfer or point DNS",   owned: true, cost: 0    },
  { id: "unsure",   label: "I'm not sure yet",        sub: "I'll confirm closer to launch", unsure: true, cost: 0   },
];

// ─── Step 6 — Timeline ───────────────────────────────────────────────────────

const timelines = [
  { label: "Within 4 weeks",    sub: "Urgent / MVP launch",       surcharge: 0.20 },
  { label: "4 – 8 weeks",       sub: "Standard turnaround",       surcharge: 0    },
  { label: "2 – 4 months",      sub: "Considered pace",           surcharge: 0    },
  { label: "4 – 6 months",      sub: "Full-featured product",     surcharge: 0    },
  { label: "Phased launch",     sub: "MVP first, then iterate",   surcharge: 0    },
  { label: "Flexible",          sub: "No hard deadline",          surcharge: 0    },
  { label: "Not sure yet",      sub: "We'll work it out together", surcharge: 0, unsure: true },
];

// ─── Step meta ────────────────────────────────────────────────────────────────

const stepMeta = [
  { step: 1, label: "App Type",   title: "What are you building?",               subtitle: "Tell us about the type of web application you need."                       },
  { step: 2, label: "Goals",      title: "What matters most to you?",            subtitle: "Select your primary goal and give us a sense of scale."                    },
  { step: 3, label: "Features",   title: "What does your app need to do?",       subtitle: "Select all the core features you'll need."                                 },
  { step: 4, label: "AI",         title: "How much should AI do the heavy lifting?", subtitle: "Modern apps can use AI to automate tasks, reduce manual work, and personalise experiences." },
  { step: 5, label: "Hosting",    title: "Where will your app live?",            subtitle: "Choose your infrastructure preference."                                     },
  { step: 6, label: "Timeline",   title: "When do you need to launch?",          subtitle: "This helps us plan the right team and pace for your project."              },
  { step: 7, label: "Estimate",   title: "Your indicative estimate.",            subtitle: "Based on your answers — transparent pricing before we talk."               },
  { step: 8, label: "About You",  title: "Almost there.",                        subtitle: "A few last details so we can tailor our proposal."                         },
];

// ─── Payment Plans ────────────────────────────────────────────────────────────

interface PaymentPlan { id: string; label: string; badge: string | null; desc: string; rows: (total: number) => { label: string; amount: number; sub?: string }[] }

const paymentPlans: PaymentPlan[] = [
  {
    id: "50-50", label: "50 / 50", badge: "Standard",
    desc: "Half on project kickoff, half on launch day.",
    rows: (t) => [
      { label: "Due now",           amount: t * 0.50, sub: "Deposit to begin"    },
      { label: "Due on completion", amount: t * 0.50, sub: "Paid before launch"  },
    ],
  },
  {
    id: "3-month", label: "3-Month Plan", badge: null,
    desc: "35% to start, balance spread across 3 monthly payments.",
    rows: (t) => [
      { label: "Due now",          amount: t * 0.35,        sub: "Deposit to begin"          },
      { label: "Per month × 3",   amount: (t * 0.65) / 3,  sub: "Months 1–3 after kickoff" },
    ],
  },
  {
    id: "6-month", label: "6-Month Plan", badge: null,
    desc: "35% to start, balance spread across 6 monthly payments.",
    rows: (t) => [
      { label: "Due now",          amount: t * 0.35,        sub: "Deposit to begin"          },
      { label: "Per month × 6",   amount: (t * 0.65) / 6,  sub: "Months 1–6 after kickoff" },
    ],
  },
];

// ─── Form State ───────────────────────────────────────────────────────────────

interface WAFormData {
  appType: string;
  goals: string[];
  userScale: string;
  coreFeatures: string[];
  dataComplexity: string;
  aiFeatures: string[];
  buildApproach: string;
  hosting: string;
  database: string;
  domain: string;
  timeline: string;
  paymentPlan: string;
  name: string; emailAddr: string; company: string; website: string; brief: string;
}

const initialData: WAFormData = {
  appType: "", goals: [], userScale: "", coreFeatures: [], dataComplexity: "",
  aiFeatures: [], buildApproach: "", hosting: "", database: "", domain: "",
  timeline: "", paymentPlan: "",
  name: "", emailAddr: "", company: "", website: "", brief: "",
};

// ─── Pricing Engine ───────────────────────────────────────────────────────────

interface LineItem { label: string; amount: number; hours?: number }
interface Estimate  { lineItems: LineItem[]; subtotal: number; vat: number; total: number }

function fmt(n: number) { return "£" + Math.round(n).toLocaleString("en-GB"); }

function calculateEstimate(data: WAFormData, rates: RatesMap): Estimate {
  const items: LineItem[] = [];

  // 1. App type base
  const base = rates[`web-apps.base_${data.appType}`] ?? appTypeBase[data.appType] ?? 3000;
  const typeLabel = appTypes.find(t => t.id === data.appType)?.label ?? "Web Application";
  items.push({ label: `${typeLabel} — Base`, amount: base });

  // 2. Core features
  const selectedFeatures = coreFeatures.filter(f => !f.unsure && data.coreFeatures.includes(f.id));
  selectedFeatures.forEach(f => {
    const cost = rates[`web-apps.feat_${f.id}`] ?? f.cost;
    items.push({ label: f.label, amount: cost, hours: f.hours > 0 ? f.hours : undefined });
  });

  // 3. AI features (only real AI items, not "no-ai" or "unsure")
  const selectedAi = aiFeatures.filter(f => !f.noai && !f.unsure && data.aiFeatures.includes(f.id));
  selectedAi.forEach(f => {
    const aiKey = f.id.replace("ai-", "");
    const cost = rates[`web-apps.ai_${aiKey}`] ?? f.cost;
    items.push({ label: f.label, amount: cost });
  });

  // 4. Complexity multiplier (applied to base + features + AI as adjustment)
  const beforeMultiplier = items.reduce((s, i) => s + i.amount, 0);
  const complexityEntry = dataComplexity.find(d => d.id === data.dataComplexity);
  const multiplier = complexityEntry?.multiplier ?? 1.0;
  if (multiplier > 1.0) {
    const adj = beforeMultiplier * (multiplier - 1);
    items.push({ label: `Data & logic complexity adjustment (×${multiplier})`, amount: adj });
  }

  // Running total before discounts / surcharges
  let labour = items.reduce((s, i) => s + i.amount, 0);

  // 5. Build approach discount
  const approach = buildApproaches.find(b => b.id === data.buildApproach);
  if (approach && approach.discount > 0) {
    const disc = -(labour * approach.discount);
    items.push({ label: `${approach.label} discount (−${Math.round(approach.discount * 100)}%)`, amount: disc });
    labour += disc;
  }

  // 6. Hosting setup (flat, not subject to multipliers)
  const hostOpt = hostingOptions.find(h => h.id === data.hosting);
  if (hostOpt?.cost && hostOpt.cost > 0) {
    const hostCost = rates[`web-apps.hosting_${data.hosting}`] ?? hostOpt.cost;
    items.push({ label: "Hosting setup & configuration", amount: hostCost });
  }

  // 7. Domain
  if (data.domain === "new") {
    items.push({ label: "Domain registration & DNS setup", amount: rates["global.domain_registration"] ?? 50 });
  }

  // 8. Urgent timeline surcharge
  const tl = timelines.find(t => t.label === data.timeline);
  if (tl && tl.surcharge > 0) {
    const surcharge = labour * tl.surcharge;
    items.push({ label: `Urgent timeline surcharge (+${Math.round(tl.surcharge * 100)}%)`, amount: surcharge });
  }

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const vatRate = (rates["global.vat_rate"] ?? 20) / 100;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  return { lineItems: items, subtotal, vat, total };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chipStyle(active: boolean, hovered = false) {
  return {
    borderColor:     active ? ACCENT : hovered ? `rgba(${ACCENT_RGB},0.6)` : `rgba(${ACCENT_RGB},0.2)`,
    backgroundColor: active ? `rgba(${ACCENT_RGB},0.14)` : hovered ? `rgba(${ACCENT_RGB},0.07)` : `rgba(${ACCENT_RGB},0.03)`,
    color:           active ? ACCENT : hovered ? "white" : "rgba(255,255,255,0.88)",
    boxShadow:       active ? `0 0 14px rgba(${ACCENT_RGB},0.2)` : hovered ? `0 0 10px rgba(${ACCENT_RGB},0.1)` : "none",
    transition: "all 0.18s ease",
  };
}

function unsureChipStyle(active: boolean, hovered = false) {
  return {
    borderColor:     active ? ACCENT : hovered ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.28)`,
    borderStyle:     active ? "solid" : "dashed" as const,
    backgroundColor: active ? `rgba(${ACCENT_RGB},0.14)` : hovered ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
    color:           active ? ACCENT : hovered ? `rgba(${ACCENT_RGB},0.9)` : `rgba(${ACCENT_RGB},0.55)`,
    boxShadow:       active ? `0 0 14px rgba(${ACCENT_RGB},0.2)` : hovered ? `0 0 10px rgba(${ACCENT_RGB},0.08)` : "none",
    transition: "all 0.18s ease",
  };
}

// ─── TechCard ─────────────────────────────────────────────────────────────────

function TechCard({ option, isActive, onClick }: {
  option: { id: string; label: string; sub: string; owned?: boolean; unsure?: boolean };
  isActive: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const isUnsure = !!option.unsure;
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
        background: isActive
          ? `linear-gradient(90deg,transparent,${ACCENT},transparent)`
          : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.45),transparent)`
          : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.12),transparent)`,
        transition: "all 0.2s",
      }} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {isUnsure && (
              <HelpCircle size={12} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.8)` : `rgba(${ACCENT_RGB},0.5)`, flexShrink: 0, transition: "color 0.2s" }} />
            )}
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
              color:isActive?"white":hov?"rgba(255,255,255,0.95)":isUnsure?`rgba(${ACCENT_RGB},0.75)`:"rgba(255,255,255,0.9)",
              transition:"color 0.2s" }}>
              {option.label}
            </p>
          </div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.5,
            color:isActive?`rgba(${ACCENT_RGB},0.8)`:hov?`rgba(${ACCENT_RGB},0.6)`:"white",
            transition:"color 0.2s" }}>
            {option.sub}
          </p>
        </div>
        {option.owned && (
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.12em",
            color:isActive?"#0a0a0a":`rgba(${ACCENT_RGB},0.7)`,
            backgroundColor:isActive?ACCENT:`rgba(${ACCENT_RGB},0.12)`,
            border:`1px solid ${isActive?ACCENT:`rgba(${ACCENT_RGB},0.3)`}`,
            padding:"2px 7px", whiteSpace:"nowrap" as const, flexShrink:0, transition:"all 0.2s" }}>
            HAVE IT
          </span>
        )}
      </div>
      {isActive && (
        <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── InfraSection ─────────────────────────────────────────────────────────────

function InfraSection({ Icon, label, hint, children }: { Icon:LucideIcon; label:string; hint?:string; children:React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Icon size={18} style={{ color:ACCENT, filter:`drop-shadow(0 0 5px rgba(${ACCENT_RGB},0.5))` }} />
        <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }} className="text-[14px] tracking-[0.3em] uppercase">
          {label}
        </label>
        {hint && <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white" }}>— {hint}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ feature, isActive, onClick }: {
  feature: CoreFeature; isActive: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const isUnsure = !!feature.unsure;
  const Icon = feature.Icon;
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-4 border text-left transition-all duration-200"
      style={{
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : isUnsure ? `rgba(${ACCENT_RGB},0.28)` : `rgba(${ACCENT_RGB},0.15)`,
        borderStyle:     isUnsure && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : `rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive ? `0 0 18px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.08)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive
          ? `linear-gradient(90deg,transparent,${ACCENT},transparent)`
          : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)`
          : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.1),transparent)`,
        transition: "all 0.2s",
      }} />
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.7)` : `rgba(${ACCENT_RGB},0.4)`, transition:"color 0.2s", flexShrink:0, marginTop:"2px" }} />
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
            color:isActive?"white":hov?"rgba(255,255,255,0.95)":isUnsure?`rgba(${ACCENT_RGB},0.75)`:"rgba(255,255,255,0.9)",
            transition:"color 0.2s", marginBottom:"3px" }}>
            {feature.label}
          </p>
          {feature.cost > 0 && (
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.08em",
              color:isActive?`rgba(${ACCENT_RGB},0.8)`:hov?`rgba(${ACCENT_RGB},0.55)`:`rgba(${ACCENT_RGB},0.35)`,
              transition:"color 0.2s" }}>
              +{fmt(feature.cost)}
            </p>
          )}
        </div>
      </div>
      {isActive && (
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor:ACCENT, boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }}>
          <Check size={9} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── AI Feature Card ──────────────────────────────────────────────────────────

function AiFeatureCard({ feature, isActive, onClick, noAiActive }: {
  feature: AiFeature; isActive: boolean; onClick: () => void; noAiActive: boolean;
}) {
  const [hov, setHov] = useState(false);
  const isUnsure = !!feature.unsure;
  const isNoAi   = !!feature.noai;
  const Icon = feature.Icon;
  const dimmed = (noAiActive && !isNoAi && !isActive);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative p-4 border text-left transition-all duration-200"
      style={{
        opacity: dimmed ? 0.4 : 1,
        borderColor:     isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : isUnsure||isNoAi ? `rgba(${ACCENT_RGB},0.28)` : `rgba(${ACCENT_RGB},0.15)`,
        borderStyle:     (isUnsure||isNoAi) && !isActive ? "dashed" : "solid",
        backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : `rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive ? `0 0 18px rgba(${ACCENT_RGB},0.18)` : hov ? `0 0 10px rgba(${ACCENT_RGB},0.08)` : "none",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: isActive
          ? `linear-gradient(90deg,transparent,${ACCENT},transparent)`
          : hov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)`
          : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.1),transparent)`,
        transition: "all 0.2s",
      }} />
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color: isActive ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.7)` : `rgba(${ACCENT_RGB},0.4)`, transition:"color 0.2s", flexShrink:0, marginTop:"2px" }} />
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
            color:isActive?"white":hov?"rgba(255,255,255,0.95)":isUnsure||isNoAi?`rgba(${ACCENT_RGB},0.75)`:"rgba(255,255,255,0.9)",
            transition:"color 0.2s", marginBottom:"3px" }}>
            {feature.label}
          </p>
          {feature.sub && (
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", lineHeight:1.4,
              color:isActive?`rgba(${ACCENT_RGB},0.7)`:hov?`rgba(${ACCENT_RGB},0.5)`:"rgba(255,255,255,0.85)",
              transition:"color 0.2s" }}>
              {feature.sub}
            </p>
          )}
          {feature.cost > 0 && (
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.08em",
              color:isActive?`rgba(${ACCENT_RGB},0.8)`:hov?`rgba(${ACCENT_RGB},0.55)`:`rgba(${ACCENT_RGB},0.35)`,
              transition:"color 0.2s", marginTop:"4px" }}>
              +{fmt(feature.cost)}
            </p>
          )}
        </div>
      </div>
      {isActive && (
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor:ACCENT, boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }}>
          <Check size={9} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── Payment Plan Card ────────────────────────────────────────────────────────

function PaymentPlanCard({ plan, total, isActive, onClick }: {
  plan: PaymentPlan; total: number; isActive: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const rows = plan.rows(total);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative text-left border transition-all duration-200 overflow-hidden"
      style={{
        borderColor:     isActive?ACCENT:hov?`rgba(${ACCENT_RGB},0.45)`:`rgba(${ACCENT_RGB},0.15)`,
        backgroundColor: isActive?`rgba(${ACCENT_RGB},0.1)`:hov?`rgba(${ACCENT_RGB},0.05)`:`rgba(${ACCENT_RGB},0.02)`,
        boxShadow:       isActive?`0 0 30px rgba(${ACCENT_RGB},0.2),inset 0 0 40px rgba(${ACCENT_RGB},0.04)`:hov?`0 0 16px rgba(${ACCENT_RGB},0.1)`:"none",
      }}>
      <div className="h-px w-full" style={{
        background:isActive?`linear-gradient(90deg,transparent,${ACCENT},transparent)`
          :hov?`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.45),transparent)`
          :`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.12),transparent)`,
        transition:"background 0.2s",
      }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"16px", fontWeight:600,
              color:isActive?"white":hov?"white":"rgba(255,255,255,0.9)",
              transition:"color 0.2s", marginBottom:"5px" }}>
              {plan.label}
            </p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.5,
              color:isActive?`rgba(${ACCENT_RGB},0.8)`:"rgba(255,255,255,0.9)", transition:"color 0.2s" }}>
              {plan.desc}
            </p>
          </div>
          {plan.badge && (
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.15em",
              backgroundColor:isActive?ACCENT:`rgba(${ACCENT_RGB},0.15)`,
              color:isActive?"#0a0a0a":`rgba(${ACCENT_RGB},0.8)`,
              border:`1px solid ${isActive?ACCENT:`rgba(${ACCENT_RGB},0.3)`}`,
              padding:"3px 8px", whiteSpace:"nowrap" as const, flexShrink:0, transition:"all 0.2s" }}>
              {plan.badge}
            </span>
          )}
        </div>
        <div className="space-y-4 pt-5 border-t" style={{ borderColor:"rgba(180,150,220,0.12)" }}>
          {rows.map((row, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.15em",
                  color:isActive?`rgba(${ACCENT_RGB},0.7)`:"rgba(255,255,255,0.6)",
                  textTransform:"uppercase", transition:"color 0.2s" }}>
                  {row.label}
                </span>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"19px", fontWeight:300,
                  color:isActive?"white":hov?"white":"rgba(255,255,255,0.85)",
                  transition:"color 0.2s" }}>
                  {fmt(row.amount)}
                </span>
              </div>
              {row.sub && (
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                  color:"rgba(255,255,255,0.5)", marginTop:"2px", textAlign:"right" }}>
                  {row.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {isActive && (
        <div className="absolute top-5 right-5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.6)` }}>
          <Check size={11} color="#0a0a0a" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

// ─── Nav Buttons ─────────────────────────────────────────────────────────────

function BackBtn({ onClick, disabled, className="" }: { onClick:()=>void; disabled:boolean; className?:string }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className={`flex items-center justify-center gap-2.5 px-5 py-3 border tracking-[0.2em] uppercase transition-all duration-200 ${className}`}
      style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px",
        borderColor:     disabled?"rgba(255,255,255,0.07)":hov?"rgba(255,255,255,0.45)":"rgba(255,255,255,0.18)",
        color:           disabled?"rgba(255,255,255,0.15)":hov?"white":"rgba(255,255,255,0.55)",
        backgroundColor: hov&&!disabled?"rgba(255,255,255,0.05)":"transparent",
        cursor:          disabled?"default":"pointer" }}>
      <ArrowLeft size={14} />
      Back
    </button>
  );
}

function ResetBtn({ onClick, className="" }: { onClick:()=>void; className?:string }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className={`flex items-center justify-center gap-2.5 px-5 py-3 border tracking-[0.2em] uppercase transition-all duration-200 ${className}`}
      style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px",
        borderColor:     hov?"rgba(220,70,70,0.7)":"rgba(200,60,60,0.35)",
        color:           hov?"rgba(240,100,100,0.95)":"rgba(200,80,80,0.7)",
        backgroundColor: hov?"rgba(220,60,60,0.07)":"transparent" }}>
      <RotateCcw size={13} />
      Start from Scratch
    </button>
  );
}

function NavButton({ label, canGo, onClick }: { label:string; canGo:boolean; onClick:()=>void }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-3 px-8 py-4 border tracking-[0.25em] uppercase transition-all duration-200"
      style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
        borderColor:     canGo?ACCENT:"rgba(255,255,255,0.1)",
        color:           canGo?(hov?"#0a0a0a":ACCENT):"rgba(255,255,255,0.18)",
        backgroundColor: canGo&&hov?ACCENT:"transparent",
        cursor:          canGo?"pointer":"default",
        boxShadow:       canGo&&hov?`0 0 20px rgba(${ACCENT_RGB},0.35)`:"none" }}>
      {label}
      <ArrowRight size={15} />
    </button>
  );
}

// ─── Breakdown Toggle ─────────────────────────────────────────────────────────

function BreakdownToggle({ open, onToggle }: { open:boolean; onToggle:()=>void }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onToggle}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3 mb-8 px-5 py-2.5 border transition-all duration-200"
      style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.28em", textTransform:"uppercase",
        borderColor:     open?ACCENT:hov?`rgba(${ACCENT_RGB},0.7)`:`rgba(${ACCENT_RGB},0.35)`,
        color:           open?ACCENT:hov?ACCENT:`rgba(${ACCENT_RGB},0.6)`,
        backgroundColor: open?`rgba(${ACCENT_RGB},0.08)`:hov?`rgba(${ACCENT_RGB},0.06)`:"transparent",
        boxShadow:       open?`0 0 18px rgba(${ACCENT_RGB},0.18),inset 0 0 12px rgba(${ACCENT_RGB},0.06)`:hov?`0 0 12px rgba(${ACCENT_RGB},0.12)`:"none" }}>
      {open?"Hide":"Show"} Full Breakdown
      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.22, ease:"easeInOut" }}>
        <ChevronDown size={13} />
      </motion.div>
    </button>
  );
}

// ─── HoverField ───────────────────────────────────────────────────────────────

function HoverField({ label, name, type="text", placeholder, required, value, onChange }: {
  label:string; name:string; type?:string; placeholder?:string; required?:boolean;
  value:string; onChange:(v:string)=>void;
}) {
  const [isHov, setIsHov] = useState(false);
  const [isFoc, setIsFoc] = useState(false);
  return (
    <div onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
      <label htmlFor={name} style={{ fontFamily:"'DM Mono',monospace",
        color:isFoc?ACCENT:"white", transition:"color 0.2s",
        display:"block", fontSize:"14px", letterSpacing:"0.3em", textTransform:"uppercase" as const, marginBottom:"12px" }}>
        {label}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b py-4 focus:outline-none placeholder-white/30"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
          borderColor:isFoc?ACCENT:isHov?`rgba(${ACCENT_RGB},0.6)`:`rgba(${ACCENT_RGB},0.25)`,
          color:"rgba(255,255,255,0.9)", transition:"all 0.2s" }}
        onFocus={() => setIsFoc(true)} onBlur={() => setIsFoc(false)} />
    </div>
  );
}

// ─── HoverTextarea ────────────────────────────────────────────────────────────

function HoverTextarea({ label, name, placeholder, value, onChange }: {
  label:string; name:string; placeholder?:string; value:string; onChange:(v:string)=>void;
}) {
  const [isHov, setIsHov] = useState(false);
  const [isFoc, setIsFoc] = useState(false);
  return (
    <div onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
      <label style={{ fontFamily:"'DM Mono',monospace",
        color:isFoc?ACCENT:"white", transition:"color 0.2s",
        display:"block", fontSize:"14px", letterSpacing:"0.3em", textTransform:"uppercase" as const, marginBottom:"14px" }}>
        {label}
      </label>
      <textarea name={name} rows={6} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border px-6 py-5 leading-relaxed focus:outline-none resize-none placeholder-white/30 transition-all duration-200"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
          borderColor:isFoc?ACCENT:isHov?`rgba(${ACCENT_RGB},0.6)`:`rgba(${ACCENT_RGB},0.25)`,
          color:"rgba(255,255,255,0.9)" }}
        onFocus={() => setIsFoc(true)} onBlur={() => setIsFoc(false)} />
    </div>
  );
}

// ─── SubmitButton ─────────────────────────────────────────────────────────────

function SubmitButton() {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3 px-10 py-5 border tracking-[0.25em] uppercase transition-all duration-300"
      style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
        borderColor:ACCENT, color:hov?"#0a0a0a":ACCENT,
        backgroundColor:hov?ACCENT:"transparent",
        boxShadow:hov?`0 0 24px rgba(${ACCENT_RGB},0.4)`:"none" }}>
      Send My Brief
      <ArrowRight size={16} />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WebAppStartPage() {
  const isMobile = useIsMobile();
  const rates = usePricingRates();
  const HR = rates["global.hourly_rate"] ?? HOURLY_RATE;
  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState(1);
  const [data,      setData]      = useState<WAFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [hovGoal,     setHovGoal]     = useState<string|null>(null);
  const [hovType,     setHovType]     = useState<string|null>(null);
  const [hovTimeline, setHovTimeline] = useState<string|null>(null);
  const [hovApproach, setHovApproach] = useState<string|null>(null);

  const set = <K extends keyof WAFormData>(k: K, v: WAFormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const toggleGoal = (g: string) =>
    set("goals", data.goals.includes(g) ? data.goals.filter(x=>x!==g) : [...data.goals, g].slice(0,2));

  const toggleCoreFeature = (id: string) => {
    const unsure = coreFeatures.find(f=>f.id==="unsure")!;
    if (id === unsure.id) {
      set("coreFeatures", data.coreFeatures.includes(id) ? [] : [id]);
    } else {
      set("coreFeatures",
        data.coreFeatures.includes(id)
          ? data.coreFeatures.filter(x=>x!==id)
          : [...data.coreFeatures.filter(x=>x!==unsure.id), id]
      );
    }
  };

  const toggleAiFeature = (id: string) => {
    const noAi = "no-ai";
    const aiUnsure = "ai-unsure";
    if (id === noAi) {
      // deselect everything else
      set("aiFeatures", data.aiFeatures.includes(id) ? [] : [id]);
    } else if (id === aiUnsure) {
      set("aiFeatures", data.aiFeatures.includes(id) ? [] : [id]);
    } else {
      // remove no-ai and unsure if they were selected
      const filtered = data.aiFeatures.filter(x=>x!==noAi&&x!==aiUnsure);
      set("aiFeatures",
        filtered.includes(id) ? filtered.filter(x=>x!==id) : [...filtered, id]
      );
    }
  };

  const noAiActive = data.aiFeatures.includes("no-ai");

  const canAdvance = () => {
    if (step === 1) return !!data.appType;
    if (step === 2) return data.goals.length > 0 && !!data.userScale;
    if (step === 3) return true;
    if (step === 4) return true;
    if (step === 5) return true;
    if (step === 6) return !!data.timeline;
    if (step === 7) return !!data.paymentPlan;
    return true;
  };

  const goNext = () => { if (!canAdvance()) return; setDirection(1);  setStep(s=>Math.min(s+1,TOTAL_STEPS)); };
  const goBack = () => {                             setDirection(-1); setStep(s=>Math.max(s-1,1)); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);
  const handleReset = () => { setData(initialData); setDirection(-1); setStep(1); setShowBreakdown(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const est = calculateEstimate(data, rates);
    sendEmail("web-app-wizard", {
      name: data.name, email: data.emailAddr, company: data.company, website: data.website,
      appType: data.appType, goals: data.goals.join(", "), userScale: data.userScale,
      coreFeatures: data.coreFeatures.join(", "), dataComplexity: data.dataComplexity,
      aiFeatures: data.aiFeatures.join(", "), buildApproach: data.buildApproach,
      hosting: data.hosting, database: data.database, timeline: data.timeline,
      paymentPlan: data.paymentPlan,
      estimate: `£${Math.round(est.total).toLocaleString("en-GB")}`, brief: data.brief,
    });
  };

  const meta     = stepMeta[step-1];
  const estimate = calculateEstimate(data, rates);

  const variants = {
    enter:  (dir:number) => ({ x: dir>0?60:-60, opacity:0 }),
    center: { x:0, opacity:1 },
    exit:   (dir:number) => ({ x: dir>0?-60:60, opacity:0 }),
  };

  // ── Submitted ──────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background:"#16212e" }}>
        <motion.div initial={isMobile ? false : { opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.6, ease:[0.16,1,0.3,1] }} className="text-center px-8 max-w-lg">
          <div className="w-20 h-20 border flex items-center justify-center mx-auto mb-10"
            style={{ borderColor:ACCENT, boxShadow:`0 0 32px rgba(${ACCENT_RGB},0.2)` }}>
            <Check size={32} style={{ color:ACCENT }} />
          </div>
          <p style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
             className="text-sm tracking-[0.35em] uppercase mb-5">Brief Received</p>
          <h2 style={{ fontFamily:"'Montserrat',sans-serif" }}
              className="text-white text-4xl font-light mb-5 leading-tight">
            Thank you — we'll be in touch.
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif" }} className="text-white/40 text-sm leading-relaxed">
            We review every brief personally and will come back to you within 24 hours with a tailored response.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen" style={{ background:"#16212e" }}>
      <SEOHead
        title="Web App Quote Builder — Scope Your Project"
        description="Walk through our 8-step web app wizard to scope your custom application and get a tailored estimate. Booking systems, portals, SaaS and more."
        path="/web-apps/start"
        keywords="web app quote, custom app cost, bespoke web application, UK web app development pricing"
      />

      {/* ── Progress ────────────────────────────────────────────────────────── */}
      <div className="fixed top-24 left-0 right-0 z-40 px-4 sm:px-8 md:px-16 pointer-events-none"
        style={{ backgroundColor:"rgba(22,33,46,0.92)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(180,150,220,0.1)" }}>
        <div className="max-w-[1320px] mx-auto py-3 sm:py-4">

          {/* Mobile compact */}
          <div className="flex sm:hidden items-center gap-3">
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.2em", color:ACCENT, whiteSpace:"nowrap" }}>
              {step} / {TOTAL_STEPS}
            </span>
            <div className="flex-1 relative" style={{ height:"2px", backgroundColor:"rgba(255,255,255,0.1)" }}>
              <div className="absolute inset-y-0 left-0 transition-all duration-500"
                style={{ width:`${(step/TOTAL_STEPS)*100}%`, backgroundColor:ACCENT, boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }} />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.15em",
              color:"white", textTransform:"uppercase" as const, whiteSpace:"nowrap" }}>
              {stepMeta[step-1].label}
            </span>
          </div>

          {/* Desktop dot indicators */}
          <div className="hidden sm:flex items-center">
            {stepMeta.map((s, i) => {
              const isActive = step === s.step;
              const isDone   = step > s.step;
              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor:     isDone?ACCENT:isActive?ACCENT:"rgba(255,255,255,0.15)",
                        backgroundColor: isDone?ACCENT:isActive?`rgba(${ACCENT_RGB},0.15)`:"transparent",
                        boxShadow:       isActive?`0 0 12px rgba(${ACCENT_RGB},0.35)`:"none",
                      }}>
                      {isDone
                        ? <Check size={12} color="#0a0a0a" strokeWidth={3} />
                        : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:isActive?ACCENT:"rgba(255,255,255,0.5)" }}>{s.step}</span>
                      }
                    </div>
                    <span className="uppercase hidden md:block" style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"8px",
                      color:isActive?ACCENT:isDone?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.4)",
                      letterSpacing:"0.15em", transition:"color 0.3s", whiteSpace:"nowrap",
                    }}>{s.label}</span>
                  </div>
                  {i < stepMeta.length-1 && (
                    <div className="flex-1 h-px mx-2 md:mx-3 transition-all duration-500"
                      style={{ backgroundColor: step > s.step ? ACCENT : "rgba(180,150,220,0.15)" }} />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Hero heading ──────────────────────────────────────────────────── */}
      <section className="pt-48 sm:pt-56 md:pt-64 pb-6 sm:pb-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`hero-${step}`} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration:0.36, ease:[0.16,1,0.3,1] }}>
              <p style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                 className="text-[11px] tracking-[0.35em] uppercase mb-5 flex items-center gap-3">
                <span className="w-5 h-px" style={{ backgroundColor:ACCENT }} />
                Step {step} of {TOTAL_STEPS}
              </p>
              <h1 style={{ fontFamily:"'Montserrat',sans-serif" }}
                  className="text-white text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-tight mb-3">
                {meta.title}
              </h1>
              <p style={{ fontFamily:"'Inter',sans-serif" }} className="text-white/40 text-[15px] leading-relaxed max-w-2xl">
                {meta.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Step content ──────────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-36">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`step-${step}`} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration:0.36, ease:[0.16,1,0.3,1] }}>

              {/* ── STEP 1 ─ App Type ───────────────────────────────────────── */}
              {step === 1 && (
                <div className="mt-6 sm:mt-8">
                  <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                         className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                    App Category <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select one)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {appTypes.filter(t => !t.unsure).map(({ id, label, sub, Icon }) => {
                      const isActive = data.appType === id;
                      const isHov    = hovType === id;
                      return (
                        <button key={id} type="button"
                          onClick={() => set("appType", id)}
                          onMouseEnter={() => setHovType(id)}
                          onMouseLeave={() => setHovType(null)}
                          className="relative text-left p-4 sm:p-6 border transition-all duration-200"
                          style={{
                            borderColor:     isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.55)`:`rgba(${ACCENT_RGB},0.18)`,
                            backgroundColor: isActive?`rgba(${ACCENT_RGB},0.14)`:isHov?`rgba(${ACCENT_RGB},0.07)`:`rgba(${ACCENT_RGB},0.03)`,
                            boxShadow:       isActive?`0 0 32px rgba(${ACCENT_RGB},0.25),inset 0 0 24px rgba(${ACCENT_RGB},0.06)`:isHov?`0 0 20px rgba(${ACCENT_RGB},0.15)`:"none",
                          }}>
                          <div className="absolute top-0 left-0 right-0 h-px" style={{
                            background: isActive ? `linear-gradient(90deg,transparent,${ACCENT},transparent)`
                              : isHov ? `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.6),transparent)`
                              : `linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.2),transparent)`,
                            transition:"all 0.2s",
                          }} />
                          <Icon size={26} className="mb-5" style={{
                            color:isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.85)`:`rgba(${ACCENT_RGB},0.45)`,
                            filter:isActive||isHov?`drop-shadow(0 0 6px rgba(${ACCENT_RGB},0.5))`:"none",
                            transition:"all 0.2s",
                          }} />
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
                            color:isActive?"white":isHov?"white":"rgba(255,255,255,0.9)",
                            marginBottom:"6px", letterSpacing:"0.01em", transition:"color 0.2s" }}>
                            {label}
                          </p>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.4,
                            color:isActive?`rgba(${ACCENT_RGB},0.8)`:isHov?`rgba(${ACCENT_RGB},0.65)`:"rgba(255,255,255,0.9)",
                            transition:"color 0.2s" }}>
                            {sub}
                          </p>
                          {isActive && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.6)` }}>
                              <Check size={11} color="#0a0a0a" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Something Else — full-width dashed */}
                  {(() => {
                    const other = appTypes.find(t=>t.unsure)!;
                    const isActive = data.appType === other.id;
                    const isHov = hovType === other.id;
                    return (
                      <button type="button"
                        onClick={() => set("appType", other.id)}
                        onMouseEnter={() => setHovType(other.id)}
                        onMouseLeave={() => setHovType(null)}
                        className="relative w-full flex items-center gap-5 px-7 py-5 border transition-all duration-200"
                        style={{
                          borderColor: isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.55)`:`rgba(${ACCENT_RGB},0.3)`,
                          borderStyle: isActive?"solid":"dashed",
                          backgroundColor: isActive?`rgba(${ACCENT_RGB},0.12)`:isHov?`rgba(${ACCENT_RGB},0.06)`:"transparent",
                          boxShadow: isActive?`0 0 24px rgba(${ACCENT_RGB},0.2)`:"none",
                        }}>
                        <HelpCircle size={22} style={{
                          color: isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.9)`:`rgba(${ACCENT_RGB},0.5)`,
                          filter: isActive||isHov?`drop-shadow(0 0 6px rgba(${ACCENT_RGB},0.4))`:"none",
                          transition:"all 0.2s", flexShrink:0,
                        }} />
                        <div className="text-left">
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"15px", fontWeight:600,
                            color: isActive?"white":isHov?`rgba(${ACCENT_RGB},0.95)`:`rgba(${ACCENT_RGB},0.65)`,
                            transition:"color 0.2s", marginBottom:"3px" }}>
                            Something Else
                          </p>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
                            color: isActive?`rgba(${ACCENT_RGB},0.75)`:"white", transition:"color 0.2s" }}>
                            I'll describe it in my brief — tell us about your idea and we'll scope it
                          </p>
                        </div>
                        {isActive && (
                          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.6)` }}>
                            <Check size={11} color="#0a0a0a" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })()}
                </div>
              )}

              {/* ── STEP 2 ─ Goals & Scale ──────────────────────────────────── */}
              {step === 2 && (
                <div className="mt-8 sm:mt-12 space-y-10 sm:space-y-16">
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Primary Goal{" "}
                      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>
                        (pick up to 2)
                      </span>
                    </label>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                      {primaryGoals.map((g) => {
                        const isUnsureGoal = g === "I'm not sure yet";
                        const isActive = data.goals.includes(g);
                        const isHov = hovGoal === g;
                        return (
                          <button key={g} type="button" onClick={() => toggleGoal(g)}
                            onMouseEnter={() => setHovGoal(g)} onMouseLeave={() => setHovGoal(null)}
                            className="flex items-center gap-2 px-5 py-3.5 sm:py-3 border tracking-[0.08em] transition-all duration-200 w-full sm:w-auto"
                            style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px",
                              ...(isUnsureGoal ? unsureChipStyle(isActive, isHov) : chipStyle(isActive, isHov)) }}>
                            {isUnsureGoal && <HelpCircle size={13} style={{ flexShrink:0 }} />}
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Expected Users <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select one)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {userScaleOptions.map((o) => (
                        <TechCard key={o.id} option={o} isActive={data.userScale===o.id} onClick={() => set("userScale", o.id)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ─ Features & Scope ───────────────────────────────── */}
              {step === 3 && (
                <div className="mt-8 sm:mt-12 space-y-10 sm:space-y-16">
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Core Features <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {coreFeatures.map(f => (
                        <FeatureCard key={f.id} feature={{ ...f, cost: rates[`web-apps.feat_${f.id}`] ?? f.cost }} isActive={data.coreFeatures.includes(f.id)} onClick={() => toggleCoreFeature(f.id)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Data &amp; Complexity <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select one)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {dataComplexity.map(o => (
                        <TechCard key={o.id}
                          option={{ id:o.id, label:o.label, sub:o.sub+(o.multiplier>1?` (+${Math.round((o.multiplier-1)*100)}%)`:""), unsure:o.unsure }}
                          isActive={data.dataComplexity===o.id}
                          onClick={() => set("dataComplexity", o.id)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4 ─ AI & Automation ────────────────────────────────── */}
              {step === 4 && (
                <div className="mt-8 sm:mt-12 space-y-10 sm:space-y-16">
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      AI Features <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {aiFeatures.map(f => (
                        <AiFeatureCard key={f.id} feature={{ ...f, cost: rates[`web-apps.ai_${f.id.replace("ai-", "")}`] ?? f.cost }} isActive={data.aiFeatures.includes(f.id)} onClick={() => toggleAiFeature(f.id)} noAiActive={noAiActive} />
                      ))}
                    </div>
                    <p className="mt-5" style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", lineHeight:1.7, color:"rgba(255,255,255,0.6)" }}>
                      We're transparent about how we build. AI-assisted development can reduce project cost by 20–40% with no compromise on quality.
                    </p>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Build Approach <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"white", letterSpacing:0, textTransform:"none" }}>(select one)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {buildApproaches.map(({ id, label, sub, discount, unsure }) => {
                        const isActive = data.buildApproach === id;
                        const isHov    = hovApproach === id;
                        return (
                          <button key={id} type="button"
                            onClick={() => set("buildApproach", id)}
                            onMouseEnter={() => setHovApproach(id)}
                            onMouseLeave={() => setHovApproach(null)}
                            className="relative p-5 border text-left transition-all duration-200"
                            style={{
                              borderColor:     isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.45)`:unsure?`rgba(${ACCENT_RGB},0.28)`:`rgba(${ACCENT_RGB},0.15)`,
                              borderStyle:     unsure&&!isActive?"dashed":"solid",
                              backgroundColor: isActive?`rgba(${ACCENT_RGB},0.12)`:isHov?`rgba(${ACCENT_RGB},0.06)`:"transparent",
                              boxShadow:       isActive?`0 0 22px rgba(${ACCENT_RGB},0.18)`:isHov?`0 0 14px rgba(${ACCENT_RGB},0.1)`:"none",
                            }}>
                            <div className="absolute top-0 left-0 right-0 h-px" style={{
                              background:isActive?`linear-gradient(90deg,transparent,${ACCENT},transparent)`
                                :isHov?`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.4),transparent)`
                                :`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.1),transparent)`,
                              transition:"all 0.2s",
                            }} />
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
                                  color:isActive?"white":isHov?"rgba(255,255,255,0.95)":unsure?`rgba(${ACCENT_RGB},0.75)`:"rgba(255,255,255,0.9)",
                                  transition:"color 0.2s", marginBottom:"5px" }}>
                                  {label}
                                </p>
                                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.5,
                                  color:isActive?`rgba(${ACCENT_RGB},0.75)`:isHov?`rgba(${ACCENT_RGB},0.55)`:"rgba(255,255,255,0.9)",
                                  transition:"color 0.2s" }}>
                                  {sub}
                                </p>
                              </div>
                              {discount > 0 && (
                                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.1em",
                                  backgroundColor:isActive?ACCENT:`rgba(${ACCENT_RGB},0.15)`,
                                  color:isActive?"#0a0a0a":`rgba(${ACCENT_RGB},0.8)`,
                                  border:`1px solid ${isActive?ACCENT:`rgba(${ACCENT_RGB},0.3)`}`,
                                  padding:"3px 8px", whiteSpace:"nowrap" as const, flexShrink:0, transition:"all 0.2s" }}>
                                  -{Math.round(discount*100)}%
                                </span>
                              )}
                            </div>
                            {isActive && (
                              <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
                                style={{ backgroundColor:ACCENT, boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }}>
                                <Check size={9} color="#0a0a0a" strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5 ─ Hosting & Infrastructure ───────────────────────── */}
              {step === 5 && (
                <div className="mt-12 space-y-12">
                  <InfraSection Icon={Server} label="Hosting" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {hostingOptions.map(o => (
                        <TechCard key={o.id} option={o} isActive={data.hosting===o.id} onClick={() => set("hosting", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                  <div className="h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.15),transparent)` }} />
                  <InfraSection Icon={Database} label="Database & Backend" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {databaseOptions.map(o => (
                        <TechCard key={o.id} option={o} isActive={data.database===o.id} onClick={() => set("database", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                  <div className="h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.15),transparent)` }} />
                  <InfraSection Icon={Globe} label="Domain & SSL" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {domainOptions.map(o => (
                        <TechCard key={o.id} option={o} isActive={data.domain===o.id} onClick={() => set("domain", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                </div>
              )}

              {/* ── STEP 6 ─ Timeline ────────────────────────────────────────── */}
              {step === 6 && (
                <div className="mt-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {timelines.filter(t=>!t.unsure).map(({ label, sub, surcharge }) => {
                      const isActive = data.timeline === label;
                      const isHov    = hovTimeline === label;
                      return (
                        <button key={label} type="button"
                          onClick={() => set("timeline", label)}
                          onMouseEnter={() => setHovTimeline(label)}
                          onMouseLeave={() => setHovTimeline(null)}
                          className="relative p-5 border text-left transition-all duration-200"
                          style={{
                            borderColor:     isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.5)`:`rgba(${ACCENT_RGB},0.15)`,
                            backgroundColor: isActive?`rgba(${ACCENT_RGB},0.12)`:isHov?`rgba(${ACCENT_RGB},0.06)`:`rgba(${ACCENT_RGB},0.02)`,
                            boxShadow:       isActive?`0 0 20px rgba(${ACCENT_RGB},0.18)`:"none",
                          }}>
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"16px", fontWeight:500,
                              color:isActive?"white":isHov?"white":"rgba(255,255,255,0.88)",
                              transition:"color 0.2s" }}>
                              {label}
                            </p>
                            {label === "4 – 8 weeks" && (
                              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.12em",
                                color:isActive?"#0a0a0a":ACCENT,
                                backgroundColor:isActive?ACCENT:`rgba(${ACCENT_RGB},0.12)`,
                                border:`1px solid ${isActive?ACCENT:`rgba(${ACCENT_RGB},0.3)`}`,
                                padding:"2px 7px", whiteSpace:"nowrap" as const, flexShrink:0, transition:"all 0.2s" }}>
                                Standard
                              </span>
                            )}
                            {surcharge > 0 && (
                              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.1em",
                                color:isActive?"#0a0a0a":"rgba(240,130,80,0.9)",
                                backgroundColor:isActive?"rgba(240,130,80,0.9)":"rgba(240,130,80,0.12)",
                                border:"1px solid rgba(240,130,80,0.4)",
                                padding:"2px 7px", whiteSpace:"nowrap" as const, flexShrink:0 }}>
                                +{Math.round(surcharge*100)}%
                              </span>
                            )}
                          </div>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
                            color:isActive?`rgba(${ACCENT_RGB},0.8)`:"rgba(255,255,255,0.9)", transition:"color 0.2s" }}>
                            {sub}
                          </p>
                          {isActive && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.55)` }}>
                              <Check size={11} color="#0a0a0a" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Not sure yet — full-width */}
                  {(() => {
                    const unsureT = timelines.find(t=>t.unsure)!;
                    const isActive = data.timeline === unsureT.label;
                    const isHov = hovTimeline === unsureT.label;
                    return (
                      <button type="button"
                        onClick={() => set("timeline", unsureT.label)}
                        onMouseEnter={() => setHovTimeline(unsureT.label)}
                        onMouseLeave={() => setHovTimeline(null)}
                        className="w-full flex items-center gap-5 mt-4 px-7 py-5 border transition-all duration-200"
                        style={{
                          borderColor: isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.55)`:`rgba(${ACCENT_RGB},0.3)`,
                          borderStyle: isActive?"solid":"dashed",
                          backgroundColor: isActive?`rgba(${ACCENT_RGB},0.12)`:isHov?`rgba(${ACCENT_RGB},0.06)`:"transparent",
                          boxShadow: isActive?`0 0 24px rgba(${ACCENT_RGB},0.2)`:"none",
                        }}>
                        <HelpCircle size={22} style={{
                          color: isActive?ACCENT:isHov?`rgba(${ACCENT_RGB},0.9)`:`rgba(${ACCENT_RGB},0.5)`,
                          filter: isActive||isHov?`drop-shadow(0 0 6px rgba(${ACCENT_RGB},0.4))`:"none",
                          transition:"all 0.2s", flexShrink:0,
                        }} />
                        <div className="text-left">
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"16px", fontWeight:500,
                            color: isActive?"white":isHov?`rgba(${ACCENT_RGB},0.95)`:`rgba(${ACCENT_RGB},0.65)`,
                            transition:"color 0.2s", marginBottom:"3px" }}>
                            Not Sure Yet
                          </p>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
                            color: isActive?`rgba(${ACCENT_RGB},0.8)`:"rgba(255,255,255,0.9)", transition:"color 0.2s" }}>
                            {unsureT.sub}
                          </p>
                        </div>
                        {isActive && (
                          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor:ACCENT, boxShadow:`0 0 8px rgba(${ACCENT_RGB},0.6)` }}>
                            <Check size={11} color="#0a0a0a" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })()}
                </div>
              )}

              {/* ── STEP 7 ─ Estimate ────────────────────────────────────────── */}
              {step === 7 && (
                <div className="mt-12 space-y-14">

                  <div className="border" style={{
                    borderColor:`rgba(${ACCENT_RGB},0.2)`,
                    backgroundColor:`rgba(${ACCENT_RGB},0.03)`,
                    boxShadow:`0 0 60px rgba(${ACCENT_RGB},0.06)`,
                  }}>
                    <div className="h-px w-full" style={{
                      background:`linear-gradient(90deg,transparent,${ACCENT},transparent)`,
                    }} />
                    <div className="p-5 sm:p-8 md:p-10">
                      <BreakdownToggle open={showBreakdown} onToggle={() => setShowBreakdown(v=>!v)} />

                      <AnimatePresence>
                        {showBreakdown && (
                          <motion.div
                            initial={{ opacity:0, height:0 }}
                            animate={{ opacity:1, height:"auto" }}
                            exit={{ opacity:0, height:0 }}
                            transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                            className="overflow-hidden">
                            <div className="mb-7 space-y-0">
                              {estimate.lineItems.map((item, i) => (
                                <div key={i} className="flex flex-wrap items-baseline justify-between py-3 sm:py-3.5 border-b"
                                  style={{ borderColor:"rgba(180,150,220,0.1)", gap:"2px 12px" }}>
                                  <div className="flex flex-wrap items-baseline gap-2 flex-1 min-w-0">
                                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.85)" }}>
                                      {item.label}
                                    </span>
                                    {item.hours != null && item.hours > 0 && (
                                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px",
                                        color:`rgba(${ACCENT_RGB},0.6)`, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
                                        {Number.isInteger(item.hours) ? item.hours : item.hours.toFixed(1)}h @ £{HR}/hr
                                      </span>
                                    )}
                                  </div>
                                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px",
                                    color: item.amount < 0 ? `rgba(${ACCENT_RGB},0.9)` : "rgba(255,255,255,0.9)", whiteSpace:"nowrap" }}>
                                    {item.amount < 0 ? `-${fmt(Math.abs(item.amount))}` : fmt(item.amount)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-0">
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", letterSpacing:"0.15em",
                            color:"rgba(255,255,255,0.85)", textTransform:"uppercase" }}>Subtotal (ex-VAT)</span>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"17px", color:"white" }}>
                            {fmt(estimate.subtotal)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-0">
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", letterSpacing:"0.15em",
                            color:"rgba(255,255,255,0.85)", textTransform:"uppercase" }}>VAT (20%)</span>
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"17px", color:"rgba(255,255,255,0.85)" }}>
                            {fmt(estimate.vat)}
                          </span>
                        </div>
                        <div className="h-px" style={{ backgroundColor:"rgba(180,150,220,0.15)" }} />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                          <div>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", letterSpacing:"0.25em",
                              color:ACCENT, textTransform:"uppercase" }}>Total Investment</span>
                            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                              color:"rgba(255,255,255,0.75)", marginTop:"4px" }}>Including VAT</p>
                          </div>
                          <div className="sm:text-right">
                            <span style={{ fontFamily:"'Montserrat',sans-serif",
                              fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:300,
                              color:"white", letterSpacing:"-0.01em" }}>
                              {fmt(estimate.total)}
                            </span>
                            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px",
                              color:`rgba(${ACCENT_RGB},0.5)`, letterSpacing:"0.15em", marginTop:"2px" }}>
                              INC. VAT
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 sm:px-8 md:px-10 py-5 border-t"
                      style={{ borderColor:`rgba(${ACCENT_RGB},0.1)`, backgroundColor:"rgba(20,10,40,0.4)" }}>
                      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", lineHeight:1.6, color:"rgba(255,255,255,0.65)" }}>
                        This is an indicative estimate based on your selections and our standard rate of £{HR}/hr. AI-accelerated projects may be priced differently after discovery. Final pricing is confirmed after a discovery call.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-3">
                      Payment Preference
                    </label>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.75)" }}
                       className="mb-7">
                      Choose how you'd like to structure the investment — this doesn't commit you to anything.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      {paymentPlans.map(plan => (
                        <PaymentPlanCard key={plan.id} plan={plan} total={estimate.total}
                          isActive={data.paymentPlan===plan.id}
                          onClick={() => set("paymentPlan", plan.id)} />
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ── STEP 8 ─ About You ───────────────────────────────────────── */}
              {step === 8 && (
                <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <HoverField label="Your Name"     name="name"    placeholder="Jane Smith"        required value={data.name}      onChange={v=>set("name", v)} />
                    <HoverField label="Email Address" name="email"   placeholder="jane@company.com"  required type="email" value={data.emailAddr} onChange={v=>set("emailAddr", v)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <HoverField label="Company / Brand"  name="company" placeholder="Acme Ltd."             value={data.company} onChange={v=>set("company", v)} />
                    <HoverField label="Existing Website" name="website" placeholder="https://yoursite.com"  value={data.website} onChange={v=>set("website", v)} />
                  </div>
                  <HoverTextarea
                    label="Anything else we should know?"
                    name="brief"
                    placeholder="Tell us about your project, competitors you admire, inspiration, or anything that will help us understand your vision…"
                    value={data.brief}
                    onChange={v=>set("brief", v)}
                  />
                  <SubmitButton />
                </form>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ───────────────────────────────────────────────────── */}
          {step < 8 && (
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t" style={{ borderColor:"rgba(180,150,220,0.1)" }}>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <BackBtn onClick={goBack} disabled={step===1} className="w-full sm:w-auto" />
                {step > 1 && <ResetBtn onClick={handleReset} className="w-full sm:w-auto" />}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                {step === 5 && (
                  <button type="button" onClick={goNext}
                    className="tracking-[0.2em] uppercase transition-colors duration-200 text-center py-2"
                    style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:"rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => { e.currentTarget.style.color="rgba(255,255,255,0.65)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.35)"; }}>
                    Skip for now
                  </button>
                )}
                <div className="w-full sm:w-auto">
                  <NavButton
                    label={step===7?"Provide My Details":step===6?"See My Estimate":"Continue"}
                    canGo={canAdvance()}
                    onClick={goNext}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-7 pt-6 border-t" style={{ borderColor:"rgba(180,150,220,0.1)" }}>
              <BackBtn onClick={goBack} disabled={false} className="w-full sm:w-auto" />
              <ResetBtn onClick={handleReset} className="w-full sm:w-auto" />
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
