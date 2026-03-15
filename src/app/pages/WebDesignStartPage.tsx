import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, Check, Plus, X, Zap, Building2, ShoppingBag,
  Palette, UtensilsCrossed, Home, BookOpen, Users,
  Server, Video, Globe, Mail, RotateCcw, HelpCircle, ChevronDown, Search, FileText, ImageIcon, LucideIcon, CornerDownRight, ArrowUpDown, Clock, Sparkles, Info, PoundSterling,
} from "lucide-react";
import { sendEmail } from "../utils/sendEmail";
import { SEOHead } from "../components/SEOHead";

const ACCENT      = "#00d4e8";
const ACCENT_RGB  = "0, 212, 232";
const TOTAL_STEPS = 7;
const HOURLY_RATE = 75;
const VAT_RATE    = 0.20;

// ─── Website Types ─────────────────────────────────────────────────────────────

const websiteTypes: { id: string; label: string; sub: string; Icon: LucideIcon; unsure?: boolean }[] = [
  { id: "landing",     label: "Landing Page",             sub: "Single page, conversion focused",     Icon: Zap             },
  { id: "brochure",    label: "Business / Brochure",      sub: "Multi-page professional presence",    Icon: Building2       },
  { id: "ecommerce",   label: "E-Commerce Store",         sub: "Product catalogue & online checkout", Icon: ShoppingBag     },
  { id: "portfolio",   label: "Portfolio / Creative",     sub: "Showcase work & attract clients",     Icon: Palette         },
  { id: "hospitality", label: "Restaurant & Hospitality", sub: "Menus, bookings, atmosphere",         Icon: UtensilsCrossed },
  { id: "realestate",  label: "Real Estate / Property",   sub: "Listings, agents & lead generation",  Icon: Home            },
  { id: "blog",        label: "Blog / Magazine",          sub: "Content-led, editorial design",       Icon: BookOpen        },
  { id: "membership",  label: "Membership / Community",   sub: "Gated content & subscriber access",   Icon: Users           },
  { id: "unsure",      label: "I'm Not Sure Yet",         sub: "We'll help you find the right fit",   Icon: HelpCircle, unsure: true },
];

// ─── Conditional Logic Helpers ────────────────────────────────────────────────

// showPageBuilder: all types get the builder except "unsure"
function showPageBuilder(typeId: string) {
  return !!typeId && typeId !== "unsure";
}

// isMultiPage: types that allow adding multiple pages (not landing, not unsure)
function isMultiPage(typeId: string) {
  return typeId !== "landing" && typeId !== "unsure";
}

const SETUP_TYPES = ["ecommerce", "hospitality", "realestate", "blog", "membership"];
function hasSetupFee(typeId: string) { return SETUP_TYPES.includes(typeId); }

// ─── Per-page build time weighting ────────────────────────────────────────────
// Returns estimated design + development hours for a single page.
// Sub-pages share layouts/components with their parent so cost roughly 60% of top-level.
function getPageBuildHours(pageName: string, isSub: boolean): number {
  const n = pageName.toLowerCase().trim();

  // Landing page — fixed 2-day build (included in base project cost)
  if (/^(landing page|landing)$/.test(n))                           return isSub ? 0   : 16;

  // Tier 1 — Homepage (unique design, hero section, full layout)
  if (/^(home|homepage|home page)$/.test(n))                        return isSub ? 5   : 10;

  // Tier 2 — Core service / product / complex pages
  if (/service|what we do|our services/.test(n))                    return isSub ? 4   : 7;
  if (/shop|store|product|e-?commerce|catalogue|catalog/.test(n))   return isSub ? 4   : 7;
  if (/member dashboard|dashboard|content library/.test(n))         return isSub ? 4   : 7;
  if (/book a|booking|reserv|appointment/.test(n))                  return isSub ? 3.5 : 6;
  if (/listing|property detail|property listing/.test(n))           return isSub ? 3.5 : 6;
  if (/pricing|packages|plans|rates/.test(n))                       return isSub ? 3   : 5;
  if (/our menu|menu|food|drinks/.test(n))                          return isSub ? 3   : 5;

  // Tier 3 — Portfolio & showcase pages
  if (/portfolio|gallery|work|projects/.test(n))                    return isSub ? 3   : 6;
  if (/case stud/.test(n))                                          return isSub ? 3   : 6;

  // Tier 4 — Supporting content pages
  if (/about|our story|who we are|the team/.test(n))                return isSub ? 3   : 5;
  if (/blog|articles|news|journal|press|publication/.test(n))       return isSub ? 3   : 5;
  if (/membership plan|subscription/.test(n))                       return isSub ? 3   : 5;
  if (/community|forum/.test(n))                                    return isSub ? 3   : 5;
  if (/process|how we work|approach|methodology/.test(n))           return isSub ? 2   : 4;
  if (/events|event|private dining|takeaway/.test(n))               return isSub ? 2   : 4;
  if (/valuations|valuation/.test(n))                               return isSub ? 2   : 4;

  // Tier 5 — Lighter supporting pages
  if (/team|meet|staff|people|author/.test(n))                      return isSub ? 2   : 3;
  if (/contact|find us|get in touch|location/.test(n))              return isSub ? 1.5 : 3;
  if (/testimonial|review|client|feedback/.test(n))                 return isSub ? 1.5 : 3;
  if (/faq|frequently asked|questions/.test(n))                     return isSub ? 1.5 : 3;
  if (/newsletter|subscribe|mailing/.test(n))                       return isSub ? 1.5 : 3;
  if (/login|register|sign up|sign in|auth/.test(n))               return isSub ? 1.5 : 3;
  if (/career|jobs|vacancies/.test(n))                              return isSub ? 2   : 3;

  // Tier 6 — Utility & legal
  if (/delivery|returns|refund|shipping/.test(n))                   return isSub ? 1   : 2;
  if (/privacy|terms|legal|gdpr|cookie/.test(n))                    return isSub ? 1   : 1.5;
  if (/thank|success|confirm/.test(n))                              return isSub ? 0.5 : 1.5;
  if (/404|error|not found/.test(n))                                return isSub ? 0.5 : 1;
  if (/sitemap/.test(n))                                            return isSub ? 0.5 : 1;

  // Default — unknown page type
  return isSub ? 2 : 4;
}

const step3Meta: Record<string, { title: string; subtitle: string }> = {
  landing:     { title: "Let's shape your page.",           subtitle: "Tell us what your single page needs to achieve and the features that belong on it."    },
  brochure:    { title: "Let's talk scale.",                subtitle: "Help us understand the size and features of your project."                             },
  ecommerce:   { title: "Let's size up your store.",        subtitle: "Tell us about your catalogue, features and how customers will interact."               },
  portfolio:   { title: "Let's plan your showcase.",        subtitle: "Help us understand the scope and any interactive elements you'd like."                 },
  hospitality: { title: "Let's plan your venue site.",      subtitle: "Tell us about the sections and features your guests will need."                        },
  realestate:  { title: "Let's scope your property site.",  subtitle: "Help us understand the listings, tools and features your site needs."                  },
  blog:        { title: "Let's plan your publication.",     subtitle: "Tell us about the sections, CMS needs and features your content platform requires."    },
  membership:  { title: "Let's plan your community.",       subtitle: "Help us understand the gating, content and features your members will need."           },
  unsure:      { title: "Let's explore your options.",      subtitle: "No worries — tell us about your goals and we'll recommend the right approach."         },
};

const featuresByType: Record<string, string[]> = {
  landing: [
    "Contact Form", "Online Booking", "Live Chat",
    "Custom Animations", "SEO Package", "Analytics Dashboard", "Multi-language",
  ],
  brochure: [
    "CMS / Content Management", "Blog", "Contact Form", "Gallery / Portfolio",
    "Online Booking", "Live Chat", "E-Commerce", "Multi-language",
    "Password Protected Area", "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  ecommerce: [
    "CMS / Content Management", "Blog", "Contact Form", "Gallery / Portfolio",
    "Online Booking", "Live Chat", "Multi-language",
    "Password Protected Area", "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  portfolio: [
    "CMS / Content Management", "Blog", "Contact Form",
    "Online Booking", "Live Chat", "E-Commerce", "Multi-language",
    "Password Protected Area", "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  hospitality: [
    "CMS / Content Management", "Blog", "Contact Form", "Gallery / Portfolio",
    "Online Booking", "Live Chat", "E-Commerce", "Multi-language",
    "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  realestate: [
    "CMS / Content Management", "Blog", "Contact Form", "Gallery / Portfolio",
    "Online Booking", "Live Chat", "E-Commerce", "Multi-language",
    "Password Protected Area", "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  blog: [
    "CMS / Content Management", "Contact Form", "Gallery / Portfolio",
    "E-Commerce", "Multi-language", "Password Protected Area",
    "Custom Animations", "SEO Package", "Analytics Dashboard", "Live Chat",
  ],
  membership: [
    "CMS / Content Management", "Blog", "Contact Form", "Gallery / Portfolio",
    "Online Booking", "Live Chat", "E-Commerce", "Multi-language",
    "Custom Animations", "SEO Package", "Analytics Dashboard",
  ],
  unsure: [
    "Contact Form", "Online Booking", "E-Commerce", "Blog",
    "CMS / Content Management", "Gallery / Portfolio", "Live Chat",
    "Custom Animations", "SEO Package", "Analytics Dashboard", "Multi-language",
  ],
};

function getAvailableFeatures(typeId: string): string[] {
  return featuresByType[typeId] ?? [];
}

// ─── Other form data ──────────────────────────────────────────────────────────

const goals = [
  "Generate leads & enquiries", "Sell products online",     "Showcase my work",
  "Build brand awareness",      "Share content / blog",     "Enable online bookings",
  "I'm not sure yet",
];

const brandingOptions = [
  { id: "full",    label: "I have full brand guidelines", sub: "Logo, colours, fonts — all ready" },
  { id: "logo",    label: "I already have a logo",        sub: "I have a logo but little else"    },
  { id: "partial", label: "I have some assets",           sub: "Bits and pieces — needs work"     },
  { id: "none",    label: "I'm starting from scratch",    sub: "Need branding as well"            },
  { id: "unsure",  label: "I'm not sure yet",             sub: "We'll help you assess what you have", unsure: true },
];

// ─── Page Builder ─────────────────────────────────────────────────────────────

interface PageItem { id: string; name: string; seo: boolean; content: boolean; images: number; videos: number; animation: boolean; parent?: string; }

const PAGE_SEO_HOURS        = 1;      // per page
const PAGE_CONTENT_HOURS    = 2;      // per page
const IMAGE_UNIT_PRICE      = 35;     // per image (flat rate)
const VIDEO_UNIT_PRICE      = 65;     // per video (flat rate)
const ANIMATION_PAGE_PRICE  = 95;     // per page (flat rate)
const ANIMATION_PAGE_HOURS  = 1.25;   // hours for animation
const SETUP_HOURS           = 30;     // 4 working days × 7.5 hrs
const SETUP_FEE             = SETUP_HOURS * HOURLY_RATE; // £2,250

// Type-specific preset pages
const presetPagesByType: Record<string, string[]> = {
  landing:     [], // locked single page — no presets needed
  brochure:    ["Home", "About Us", "Services", "Our Team", "Pricing", "Gallery", "Testimonials", "Case Studies", "Blog", "FAQ", "Careers", "News", "Contact", "Privacy Policy", "Terms & Conditions"],
  ecommerce:   ["Home", "Shop", "Product Detail", "About", "Blog", "Delivery Info", "Returns & Refunds", "Contact", "Privacy Policy", "Terms & Conditions"],
  portfolio:   ["Home", "About", "Work", "Case Study", "Services", "Process", "Testimonials", "Blog", "Shop", "Contact"],
  hospitality: ["Home", "Our Menu", "Book a Table", "About Us", "Gallery", "Events", "Private Dining", "Takeaway", "Find Us", "Blog", "Contact"],
  realestate:  ["Home", "Property Listings", "Property Detail", "About Us", "Our Team", "Valuations", "Blog", "Contact"],
  blog:        ["Home", "Articles", "Article Detail", "Categories", "About", "Authors", "Newsletter", "Contact"],
  membership:  ["Home", "About", "Membership Plans", "Member Dashboard", "Content Library", "Community", "Events", "Login / Register", "Contact"],
  unsure:      ["Home", "About Us", "Services", "Blog", "Contact"],
};

// What's included in the setup fee (per type)
const setupFeeIncludes: Record<string, string[]> = {
  ecommerce:   ["Platform configuration", "Product catalogue setup", "Payment gateway integration", "Cart & checkout flow", "Testing & launch"],
  hospitality: ["Core site structure", "Menu system setup", "Booking integration", "Brand application", "Testing & launch"],
  realestate:  ["Listing system setup", "Search & filter tools", "Lead capture forms", "Brand application", "Testing & launch"],
  blog:        ["CMS configuration", "Article templates", "Category & tag system", "Brand application", "Testing & launch"],
  membership:  ["Auth & gating system", "Member dashboard setup", "Subscription flow", "Brand application", "Testing & launch"],
};

interface TechOption { id: string; label: string; sub: string; owned?: boolean; unsure?: boolean }

const hostingOptions: TechOption[] = [
  { id: "managed",    label: "Managed Hosting",        sub: "We handle everything — hassle-free"          },
  { id: "cloudflare", label: "Cloudflare Pages / CDN", sub: "Edge-deployed, global, ultra-fast"           },
  { id: "vps",        label: "VPS / Cloud Server",     sub: "Scalable, full control (AWS, DigitalOcean…)" },
  { id: "wordpress",  label: "Managed WordPress",      sub: "Optimised WP infrastructure"                 },
  { id: "existing",   label: "Already have hosting",   sub: "I'll provide access details",   owned: true  },
  { id: "unsure",     label: "I'm not sure yet",       sub: "Happy to take a recommendation", unsure: true },
];

const videoOptions: TechOption[] = [
  { id: "cloudflare-stream", label: "Cloudflare Stream",  sub: "Professional delivery, no YouTube branding" },
  { id: "youtube",           label: "YouTube / Vimeo",    sub: "Embed existing channel or account"          },
  { id: "self",              label: "Self-hosted video",  sub: "Uploaded directly to the server"            },
  { id: "none",              label: "No video content",   sub: "Not needed for this project"                },
  { id: "existing",          label: "Already set up",     sub: "I have a streaming service in place", owned: true },
  { id: "unsure",            label: "I'm not sure yet",   sub: "We'll recommend the best option", unsure: true },
];

const domainOptions: TechOption[] = [
  { id: "new",      label: "Need a new domain",      sub: "We'll help you find & register one"          },
  { id: "existing", label: "Already have a domain",  sub: "I own it — will transfer or point DNS", owned: true },
  { id: "transfer", label: "Transfer to Cloudflare", sub: "Move my domain for free management"          },
  { id: "unsure",   label: "I'm not sure yet",       sub: "I'll confirm closer to launch", unsure: true },
];

const emailOptions: TechOption[] = [
  { id: "google",     label: "Google Workspace",        sub: "Gmail for business — most popular"              },
  { id: "m365",       label: "Microsoft 365",           sub: "Outlook, Teams & Office suite"                  },
  { id: "zoho",       label: "Zoho Mail",               sub: "Affordable professional email"                  },
  { id: "cloudflare", label: "Cloudflare Email Routing",sub: "Free forwarding to existing inbox"              },
  { id: "existing",   label: "Already have email",      sub: "Set up and working — no change needed", owned: true },
  { id: "none",       label: "Don't need email",        sub: "Not part of this project"                       },
  { id: "unsure",     label: "I'm not sure yet",        sub: "We'll recommend what suits you", unsure: true   },
];

const timelines = [
  { label: "Within 4 weeks", sub: "Urgent launch"       },
  { label: "4 – 8 weeks",    sub: "Standard turnaround" },
  { label: "2 – 4 months",   sub: "Considered pace"     },
  { label: "4 – 6 months",   sub: "Large-scale project" },
  { label: "Flexible",       sub: "No hard deadline"    },
  { label: "Not sure yet",   sub: "We'll work it out together", unsure: true },
];

// ─── Pricing Engine ───────────────────────────────────────────────────────────

// Hours-based types only — setup-based types use SETUP_FEE instead.
// These represent project OVERHEAD only (discovery, design system, QA, deployment, PM).
// Individual page build hours are added separately via getPageBuildHours().
// Exception: "landing" covers the full single-page build (no per-page hours added).
// "unsure" uses a flat ballpark with no page builder shown.
const baseHours: Record<string, number> = {
  landing: 22,  // full single-page build included
  brochure: 20, // overhead only — pages billed individually
  portfolio: 16, // overhead only — pages billed individually
  unsure: 40,   // rough ballpark, no page builder
};

const featureHours: Record<string, number> = {
  "CMS / Content Management": 10, "Blog": 8,  "Contact Form": 3,
  "Gallery / Portfolio": 6,       "Online Booking": 15, "Live Chat": 4,
  "E-Commerce": 25,               "Multi-language": 15, "Password Protected Area": 10,
  "Custom Animations": 12,        "SEO Package": 10,    "Analytics Dashboard": 8,
};

const brandingAddHours: Record<string, number> = { none: 20, partial: 8, logo: 2, full: 0, unsure: 5 };
const hostingSetupCost: Record<string, number>  = { managed: 250, cloudflare: 150, vps: 350, wordpress: 250 };
const emailAddHours: Record<string, number>     = { google: 4, m365: 4, zoho: 3, cloudflare: 2 };

interface LineItem { label: string; amount: number; hours?: number }
interface Estimate  { lineItems: LineItem[]; subtotal: number; vat: number; total: number }

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function calculateEstimate(data: FormData): Estimate {
  const items: LineItem[] = [];

  const wLabel = websiteTypes.find((w) => w.id === data.websiteType)?.label ?? "Website";

  if (hasSetupFee(data.websiteType)) {
    // Setup-based types: flat 4-day setup fee (platform config, not page builds)
    items.push({ label: `${wLabel} — Project Setup (4 days)`, amount: SETUP_FEE, hours: SETUP_HOURS });
  } else {
    // Hours-based types: landing, brochure, portfolio, unsure
    const bH   = baseHours[data.websiteType] ?? 40;
    const base = bH * HOURLY_RATE;
    // Label reflects what the overhead covers (landing is a complete build; others are overhead only)
    const baseLabel = data.websiteType === "landing"
      ? `${wLabel} — Design & Build`
      : data.websiteType === "unsure"
        ? wLabel
        : `${wLabel} — Project setup & overhead`;
    items.push({ label: baseLabel, amount: base, hours: bH });
  }

  // ── Per-page build hours ─────────────────────────────────────────────────────
  // Applied to all non-landing, non-unsure types that have pages in the builder.
  // Landing type: baseHours already covers the full single-page build — skip.
  // Setup types: setup fee covers platform config, NOT page design/build.
  if (data.websiteType !== "landing" && data.websiteType !== "unsure" && data.pages.length > 0) {
    const totalPageH = data.pages.reduce(
      (sum, p) => sum + getPageBuildHours(p.name, !!p.parent), 0
    );
    const n = data.pages.length;
    if (totalPageH > 0) {
      items.push({
        label: `Page design & build (${n} page${n > 1 ? "s" : ""})`,
        amount: totalPageH * HOURLY_RATE,
        hours: totalPageH,
      });
    }
  }

  // Per-page add-ons (SEO, content, images, animation, video) for all builder types
  if (showPageBuilder(data.websiteType) && data.pages.length > 0) {
    const seoCount       = data.pages.filter((p) => p.seo).length;
    const contentCount   = data.pages.filter((p) => p.content).length;
    const totalImages    = data.pages.reduce((sum, p) => sum + (p.images || 0), 0);
    const animationCount = data.pages.filter((p) => p.animation).length;
    const totalVideos    = data.pages.reduce((sum, p) => sum + (p.videos || 0), 0);
    if (seoCount > 0) {
      const h = seoCount * PAGE_SEO_HOURS;
      items.push({ label: `SEO optimisation (${seoCount} page${seoCount > 1 ? "s" : ""})`, amount: h * HOURLY_RATE, hours: h });
    }
    if (contentCount > 0) {
      const h = contentCount * PAGE_CONTENT_HOURS;
      items.push({ label: `Content writing (${contentCount} page${contentCount > 1 ? "s" : ""})`, amount: h * HOURLY_RATE, hours: h });
    }
    if (totalImages > 0) {
      items.push({ label: `Image sourcing & optimisation (${totalImages} image${totalImages > 1 ? "s" : ""})`, amount: totalImages * IMAGE_UNIT_PRICE, hours: 0 });
    }
    if (animationCount > 0) {
      const h = animationCount * ANIMATION_PAGE_HOURS;
      items.push({ label: `Page animations (${animationCount} page${animationCount > 1 ? "s" : ""})`, amount: animationCount * ANIMATION_PAGE_PRICE, hours: h });
    }
    if (totalVideos > 0) {
      items.push({ label: `Video integration (${totalVideos} video${totalVideos > 1 ? "s" : ""})`, amount: totalVideos * VIDEO_UNIT_PRICE, hours: 0 });
    }
  }

  data.features.forEach((f) => {
    const h = featureHours[f] ?? 5;
    items.push({ label: f, amount: h * HOURLY_RATE, hours: h });
  });

  const bBrand = brandingAddHours[data.branding] ?? 0;
  if (bBrand > 0) {
    items.push({
      label: data.branding === "none" ? "Brand identity & design" : "Branding support",
      amount: bBrand * HOURLY_RATE, hours: bBrand,
    });
  }

  const hSetup = hostingSetupCost[data.hosting] ?? 0;
  if (hSetup > 0) items.push({ label: "Hosting setup & configuration", amount: hSetup });

  const eH = emailAddHours[data.email] ?? 0;
  if (eH > 0) items.push({ label: "Email setup & configuration", amount: eH * HOURLY_RATE, hours: eH });

  if (data.domain === "new") items.push({ label: "Domain registration & DNS setup", amount: 50 });

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const vat      = subtotal * VAT_RATE;
  const total    = subtotal + vat;

  return { lineItems: items, subtotal, vat, total };
}

interface PaymentPlan {
  id: string; label: string; badge: string | null; desc: string;
  rows: (total: number) => { label: string; amount: number; sub?: string }[];
}

const paymentPlans: PaymentPlan[] = [
  {
    id: "50-50", label: "50 / 50", badge: "Standard",
    desc: "Half on project start, half on launch day.",
    rows: (t) => [
      { label: "Deposit",           amount: t * 0.5,        sub: "Deposit to begin"   },
      { label: "Due on completion", amount: t * 0.5,        sub: "Paid before launch" },
    ],
  },
  {
    id: "3-month", label: "3-Month Plan", badge: null,
    desc: "35% to start, balance spread across 3 monthly payments.",
    rows: (t) => [
      { label: "Deposit",        amount: t * 0.35,       sub: "Deposit to begin"            },
      { label: "Per month × 3", amount: (t * 0.65) / 3,  sub: "Months 1–3 after kickoff"   },
    ],
  },
  {
    id: "6-month", label: "6-Month Plan", badge: null,
    desc: "35% to start, balance spread across 6 monthly payments.",
    rows: (t) => [
      { label: "Deposit",        amount: t * 0.35,       sub: "Deposit to begin"            },
      { label: "Per month × 6", amount: (t * 0.65) / 6,  sub: "Months 1–6 after kickoff"   },
    ],
  },
];

// ─── Step config ──────────────────────────────────────────────────────────────

const stepMeta = [
  { step: 1, label: "Type",      title: "What type of website do you need?",   subtitle: "Choose the category that best describes your project."        },
  { step: 2, label: "Goals",     title: "What matters most to you?",           subtitle: "Select your primary goal and tell us about your brand."        },
  { step: 3, label: "Scope",     title: "Let's talk scale.",                   subtitle: "Help us understand the size and features of your project."     },
  { step: 4, label: "Hosting",   title: "Hosting & infrastructure.",           subtitle: "Tell us what you already have — we'll handle everything else." },
  { step: 5, label: "Timeline",  title: "When do you need to launch?",         subtitle: "This helps us plan the right team and pace for your project."  },
  { step: 6, label: "Estimate",  title: "Your indicative estimate.",           subtitle: "Based on your answers — transparent pricing before we talk."   },
  { step: 7, label: "About You", title: "Almost there.",                       subtitle: "A few last details so we can tailor our proposal."              },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  websiteType: string; goals: string[]; branding: string;
  pages: PageItem[];   features: string[];
  hosting: string;     video: string;    domain: string; email: string;
  timeline: string;    paymentPlan: string;
  name: string;        emailAddr: string; company: string; website: string; brief: string;
}

const initialData: FormData = {
  websiteType: "", goals: [], branding: "", pages: [], features: [],
  hosting: "", video: "", domain: "", email: "",
  timeline: "", paymentPlan: "",
  name: "", emailAddr: "", company: "", website: "", brief: "",
};

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

// Style for "I'm not sure yet" type chips — dashed border, subdued but clear
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

function TechCard({ option, isActive, onClick }: { option: TechOption; isActive: boolean; onClick: () => void }) {
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
            color:isActive?`rgba(${ACCENT_RGB},0.8)`:hov?`rgba(${ACCENT_RGB},0.6)`:isUnsure?"white":"white",
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function WebDesignStartPage() {
  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState(1);
  const [data,      setData]      = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [hovGoal,    setHovGoal]    = useState<string | null>(null);
  const [hovType,    setHovType]    = useState<string | null>(null);
  const [hovFeature, setHovFeature] = useState<string | null>(null);
  const [hovTimeline,setHovTimeline]= useState<string | null>(null);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const LANDING_PAGE: PageItem = { id: "landing-main", name: "Your Landing Page", seo: false, content: false, images: 0, videos: 0, animation: false };

  const setWebsiteType = (id: string) => {
    const availFeatures = featuresByType[id] ?? [];
    setData((d) => ({
      ...d,
      websiteType: id,
      pages: id === "landing"          ? [LANDING_PAGE]
           : id === "unsure"           ? []
           : d.websiteType === "landing" ? []       // clear locked page when moving away from landing
           : d.pages,
      features: d.features.filter((f) => availFeatures.includes(f)),
    }));
  };

  const toggleGoal = (g: string) =>
    set("goals", data.goals.includes(g) ? data.goals.filter((x) => x !== g) : [...data.goals, g].slice(0, 2));

  const toggleFeature = (f: string) =>
    set("features", data.features.includes(f) ? data.features.filter((x) => x !== f) : [...data.features, f]);

  const availableFeatures = getAvailableFeatures(data.websiteType);
  const needsPageBuilder  = showPageBuilder(data.websiteType);

  const canAdvance = () => {
    if (step === 1) return !!data.websiteType;
    if (step === 2) return data.goals.length > 0 && !!data.branding;
    if (step === 3) return true; // pages optional; features optional for some types
    if (step === 4) return true;
    if (step === 5) return !!data.timeline;
    if (step === 6) return !!data.paymentPlan;
    return true;
  };

  const goNext = () => { if (!canAdvance()) return; setDirection(1);  setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
  const goBack = () => {                              setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const est = calculateEstimate(data);
    sendEmail("web-design-wizard", {
      name: data.name, email: data.emailAddr, company: data.company, website: data.website,
      websiteType: data.websiteType, goals: data.goals.join(", "), branding: data.branding,
      pages: data.pages.map(p => p.name).join(", "), features: data.features.join(", "),
      hosting: data.hosting, timeline: data.timeline, paymentPlan: data.paymentPlan,
      estimate: `£${Math.round(est.total).toLocaleString("en-GB")}`, brief: data.brief,
    });
  };

  const handleReset = () => {
    setData(initialData);
    setDirection(-1);
    setStep(1);
    setShowBreakdown(false);
  };

  const resolvedStepMeta = stepMeta.map((s) => {
    if (s.step === 3 && data.websiteType && step3Meta[data.websiteType]) {
      return { ...s, ...step3Meta[data.websiteType] };
    }
    return s;
  });

  const meta     = resolvedStepMeta[step - 1];
  const estimate = calculateEstimate(data);

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  // ── Submitted ──────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background:"#16212e" }}>
        <motion.div initial={{ opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }}
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
        title="Web Design Quote Builder"
        description="Walk through our 7-step web design wizard to build a tailored quote for your bespoke website. Get a personalised estimate in minutes."
        path="/web-design/start"
        keywords="web design quote, website cost estimator, bespoke website wizard, UK web design pricing"
      />

      {/* ── Progress ────────────────────────────────────────────────────────── */}
      <div className="fixed top-24 left-0 right-0 z-40 px-4 sm:px-8 md:px-16 pointer-events-none"
        style={{ backgroundColor:"rgba(22,33,46,0.92)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1320px] mx-auto py-3 sm:py-4">

          {/* Mobile compact indicator — xs only */}
          <div className="flex sm:hidden items-center gap-3">
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.2em",
              color:ACCENT, whiteSpace:"nowrap" }}>
              {step} / {TOTAL_STEPS}
            </span>
            <div className="flex-1 relative" style={{ height:"2px", backgroundColor:"rgba(255,255,255,0.1)" }}>
              <div className="absolute inset-y-0 left-0 transition-all duration-500"
                style={{ width:`${(step/TOTAL_STEPS)*100}%`, backgroundColor:ACCENT,
                  boxShadow:`0 0 6px rgba(${ACCENT_RGB},0.6)` }} />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.15em",
              color:"white", textTransform:"uppercase" as const, whiteSpace:"nowrap" }}>
              {resolvedStepMeta[step - 1].label}
            </span>
          </div>

          {/* Tablet & desktop dot indicators — sm+ */}
          <div className="hidden sm:flex items-center">
            {resolvedStepMeta.map((s, i) => {
              const isActive = step === s.step;
              const isDone   = step > s.step;
              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor:     isDone ? ACCENT : isActive ? ACCENT : "rgba(255,255,255,0.15)",
                        backgroundColor: isDone ? ACCENT : isActive ? `rgba(${ACCENT_RGB},0.15)` : "transparent",
                        boxShadow:       isActive ? `0 0 12px rgba(${ACCENT_RGB},0.35)` : "none",
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
                  {i < resolvedStepMeta.length - 1 && (
                    <div className="flex-1 h-px mx-2 md:mx-3 transition-all duration-500"
                      style={{ backgroundColor: step > s.step ? ACCENT : "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Hero heading ─────────────────────────────────────────────────── */}
      <section className="pt-48 sm:pt-56 md:pt-64 pb-6 sm:pb-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`hero-${step}-${data.websiteType}`} custom={direction} variants={variants}
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
              <p style={{ fontFamily:"'Inter',sans-serif" }} className="text-white/40 text-[15px] leading-relaxed">
                {meta.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Step content ────────────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-36">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`step-${step}`} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration:0.36, ease:[0.16,1,0.3,1] }}>

              {/* ── STEP 1 ─ Website Type ────────────────────────────────────── */}
              {step === 1 && (
                <div className="mt-6 sm:mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {websiteTypes.filter(t => !t.unsure).map(({ id, label, sub, Icon }) => {
                      const isActive = data.websiteType === id;
                      const isHov    = hovType === id;
                      return (
                        <button key={id} type="button"
                          onClick={() => setWebsiteType(id)}
                          onMouseEnter={() => setHovType(id)}
                          onMouseLeave={() => setHovType(null)}
                          className="relative text-left p-4 sm:p-6 border transition-all duration-200"
                          style={{
                            borderColor:     isActive ? ACCENT : isHov ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.18)`,
                            backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.14)` : isHov ? `rgba(${ACCENT_RGB},0.07)` : `rgba(${ACCENT_RGB},0.03)`,
                            boxShadow:       isActive ? `0 0 32px rgba(${ACCENT_RGB},0.25),inset 0 0 24px rgba(${ACCENT_RGB},0.06)` : isHov ? `0 0 20px rgba(${ACCENT_RGB},0.15)` : "none",
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

                  {/* "Not sure yet" — full-width, visually distinct */}
                  {(() => {
                    const unsureType = websiteTypes.find(t => t.unsure)!;
                    const isActive = data.websiteType === unsureType.id;
                    const isHov = hovType === unsureType.id;
                    return (
                      <button type="button"
                        onClick={() => setWebsiteType(unsureType.id)}
                        onMouseEnter={() => setHovType(unsureType.id)}
                        onMouseLeave={() => setHovType(null)}
                        className="relative w-full flex items-center gap-5 px-7 py-5 border-dashed border transition-all duration-200"
                        style={{
                          borderColor: isActive ? ACCENT : isHov ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.3)`,
                          borderStyle: isActive ? "solid" : "dashed",
                          backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : isHov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
                          boxShadow: isActive ? `0 0 24px rgba(${ACCENT_RGB},0.2)` : "none",
                        }}>
                        <HelpCircle size={22} style={{
                          color: isActive ? ACCENT : isHov ? `rgba(${ACCENT_RGB},0.9)` : `rgba(${ACCENT_RGB},0.5)`,
                          filter: isActive || isHov ? `drop-shadow(0 0 6px rgba(${ACCENT_RGB},0.4))` : "none",
                          transition: "all 0.2s", flexShrink: 0,
                        }} />
                        <div className="text-left">
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:600,
                            color: isActive ? "white" : isHov ? `rgba(${ACCENT_RGB},0.95)` : `rgba(${ACCENT_RGB},0.65)`,
                            transition:"color 0.2s", marginBottom:"3px" }}>
                            I'm Not Sure Yet
                          </p>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
                            color: isActive ? `rgba(${ACCENT_RGB},0.75)` : "white", transition:"color 0.2s" }}>
                            No problem — tell us about your goals and we'll recommend the right approach
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

              {/* ── STEP 2 ─ Goals + Branding ──��─────────────────────────────── */}
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
                      {goals.map((g) => {
                        const isUnsureGoal = g === "I'm not sure yet";
                        const isActive = data.goals.includes(g);
                        const isHov = hovGoal === g;
                        return (
                          <button key={g} type="button" onClick={() => toggleGoal(g)}
                            onMouseEnter={() => setHovGoal(g)} onMouseLeave={() => setHovGoal(null)}
                            className="flex items-center gap-2 px-5 py-3.5 sm:py-3 border tracking-[0.08em] transition-all duration-200 w-full sm:w-auto"
                            style={{
                              fontFamily:"'Inter',sans-serif",
                              fontSize:"16px",
                              ...(isUnsureGoal ? unsureChipStyle(isActive, isHov) : chipStyle(isActive, isHov)),
                            }}>
                            {isUnsureGoal && <HelpCircle size={13} style={{ flexShrink: 0 }} />}
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-5">
                      Branding
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                      {brandingOptions.map(({ id, label, sub, unsure }) => (
                        <TechCard key={id} option={{ id, label, sub, unsure }} isActive={data.branding===id} onClick={() => set("branding", id)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ─ Scope ────────────────────────────────────────────── */}
              {step === 3 && (
                <div className="mt-8 sm:mt-12 space-y-10 sm:space-y-16">

                  {/* Setup fee card — shown for ecommerce, hospitality, realestate, blog, membership */}
                  {hasSetupFee(data.websiteType) && (
                    <div>
                      <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                             className="block text-[14px] tracking-[0.3em] uppercase mb-6">
                        Project Setup
                      </label>
                      <div className="border p-5" style={{ borderColor:`rgba(${ACCENT_RGB},0.25)`, backgroundColor:`rgba(${ACCENT_RGB},0.05)` }}>
                        <div className="flex items-start justify-between gap-6 flex-wrap">
                          <div className="flex flex-col gap-1.5">
                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:"rgba(255,255,255,0.95)" }}>
                              {websiteTypes.find(w => w.id === data.websiteType)?.label} — Core Setup & Configuration
                            </span>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.18em", color:`rgba(${ACCENT_RGB},0.7)` }}>
                              4 WORKING DAYS · {SETUP_HOURS} HRS
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"20px", color:ACCENT }}>
                              £{SETUP_FEE.toLocaleString("en-GB")}
                            </span>
                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.4)" }}>
                              + VAT · at £{HOURLY_RATE}/hr
                            </span>
                          </div>
                        </div>
                        {setupFeeIncludes[data.websiteType] && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4" style={{ borderTop:`1px solid rgba(${ACCENT_RGB},0.12)` }}>
                            {setupFeeIncludes[data.websiteType].map((item) => (
                              <span key={item} className="flex items-center gap-1.5 px-3 py-1.5 border"
                                style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px",
                                  borderColor:`rgba(${ACCENT_RGB},0.2)`, color:`rgba(${ACCENT_RGB},0.75)`,
                                  backgroundColor:`rgba(${ACCENT_RGB},0.06)` }}>
                                <Check size={10} />
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {needsPageBuilder && (
                    <PageBuilder
                      typeId={data.websiteType}
                      pages={data.pages}
                      onChange={(pages) => set("pages", pages)}
                      isSetupType={hasSetupFee(data.websiteType)}
                    />
                  )}

                  {availableFeatures.length > 0 && (
                    <div>
                      {/* Section header — 04 / Features */}
                      <div className="mb-6">
                        <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "20px", color: "white", letterSpacing: "0.01em", marginBottom: "4px" }}>
                          {data.websiteType === "landing"
                            ? "What do you need on your page?"
                            : hasSetupFee(data.websiteType)
                              ? "Additional Features"
                              : "Features"}
                        </h3>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                          Select all features that apply to this project.
                        </p>
                      </div>

                      {hasSetupFee(data.websiteType) && (
                        <p className="mb-5" style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                          color:`rgba(${ACCENT_RGB},0.65)`, lineHeight:1.6 }}>
                          {data.websiteType === "ecommerce"   && "Core platform & checkout is covered in your setup fee. Add extras below."}
                          {data.websiteType === "hospitality" && "Core site structure & booking system is in your setup fee. Add extras below."}
                          {data.websiteType === "realestate"  && "Listing system & lead capture tools are in your setup fee. Add extras below."}
                          {data.websiteType === "blog"        && "CMS, article templates & category system are in your setup fee. Add extras below."}
                          {data.websiteType === "membership"  && "Auth, gating & member dashboard are in your setup fee. Add extras below."}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {availableFeatures.map((f) => (
                          <button key={f} type="button" onClick={() => toggleFeature(f)}
                            onMouseEnter={() => setHovFeature(f)} onMouseLeave={() => setHovFeature(null)}
                            className="px-5 py-2.5 border tracking-[0.06em] transition-all duration-200"
                            style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", ...chipStyle(data.features.includes(f), hovFeature===f) }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 4 ─ Hosting & Infrastructure ───────────────────────── */}
              {step === 4 && (
                <div className="mt-12 space-y-12">
                  <InfraSection Icon={Server} label="Web Hosting" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {hostingOptions.map((o) => (
                        <TechCard key={o.id} option={o} isActive={data.hosting===o.id} onClick={() => set("hosting", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                  <div className="h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.15),transparent)` }} />
                  <InfraSection Icon={Video} label="Video & Media Streaming" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {videoOptions.map((o) => (
                        <TechCard key={o.id} option={o} isActive={data.video===o.id} onClick={() => set("video", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                  <div className="h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.15),transparent)` }} />
                  <InfraSection Icon={Globe} label="Domain Name" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {domainOptions.map((o) => (
                        <TechCard key={o.id} option={o} isActive={data.domain===o.id} onClick={() => set("domain", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                  <div className="h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(${ACCENT_RGB},0.15),transparent)` }} />
                  <InfraSection Icon={Mail} label="Email Setup" hint="select one">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {emailOptions.map((o) => (
                        <TechCard key={o.id} option={o} isActive={data.email===o.id} onClick={() => set("email", o.id)} />
                      ))}
                    </div>
                  </InfraSection>
                </div>
              )}

              {/* ── STEP 5 ─ Timeline ────────────────────────────────────────── */}
              {step === 5 && (
                <div className="mt-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {timelines.filter(t => !t.unsure).map(({ label, sub }) => {
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
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"16px", fontWeight:500,
                            color:isActive?"white":isHov?"white":"rgba(255,255,255,0.88)",
                            marginBottom:"4px", transition:"color 0.2s" }}>
                            {label}
                          </p>
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

                  {/* "Not sure yet" — prominent full-width option */}
                  {(() => {
                    const unsureT = timelines.find(t => t.unsure)!;
                    const isActive = data.timeline === unsureT.label;
                    const isHov = hovTimeline === unsureT.label;
                    return (
                      <button type="button"
                        onClick={() => set("timeline", unsureT.label)}
                        onMouseEnter={() => setHovTimeline(unsureT.label)}
                        onMouseLeave={() => setHovTimeline(null)}
                        className="w-full flex items-center gap-5 mt-4 px-7 py-5 border transition-all duration-200"
                        style={{
                          borderColor: isActive ? ACCENT : isHov ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.3)`,
                          borderStyle: isActive ? "solid" : "dashed",
                          backgroundColor: isActive ? `rgba(${ACCENT_RGB},0.12)` : isHov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
                          boxShadow: isActive ? `0 0 24px rgba(${ACCENT_RGB},0.2)` : "none",
                        }}>
                        <HelpCircle size={22} style={{
                          color: isActive ? ACCENT : isHov ? `rgba(${ACCENT_RGB},0.9)` : `rgba(${ACCENT_RGB},0.5)`,
                          filter: isActive || isHov ? `drop-shadow(0 0 6px rgba(${ACCENT_RGB},0.4))` : "none",
                          transition: "all 0.2s", flexShrink: 0,
                        }} />
                        <div className="text-left">
                          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"16px", fontWeight:500,
                            color: isActive ? "white" : isHov ? `rgba(${ACCENT_RGB},0.95)` : `rgba(${ACCENT_RGB},0.65)`,
                            transition:"color 0.2s", marginBottom:"3px" }}>
                            Not Sure Yet
                          </p>
                          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
                            color: isActive ? `rgba(${ACCENT_RGB},0.8)` : "rgba(255,255,255,0.9)", transition:"color 0.2s" }}>
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

              {/* ── STEP 6 ─ Estimate ────────────────────────────────────────── */}
              {step === 6 && (
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
                      <BreakdownToggle open={showBreakdown} onToggle={() => setShowBreakdown((v) => !v)} />

                      <AnimatePresence>
                        {showBreakdown && (
                          <motion.div
                            initial={{ opacity:0, height:0 }}
                            animate={{ opacity:1, height:"auto" }}
                            exit={{ opacity:0, height:0 }}
                            transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                            className="overflow-hidden"
                          >
                            <div className="mb-7 space-y-0">
                              {estimate.lineItems.map((item, i) => (
                                <div key={i} className="flex flex-wrap items-baseline justify-between py-3 sm:py-3.5 border-b"
                                  style={{ borderColor:"rgba(255,255,255,0.05)", gap:"2px 12px" }}>
                                  <div className="flex flex-wrap items-baseline gap-2 flex-1 min-w-0">
                                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.85)" }}>
                                      {item.label}
                                    </span>
                                    {item.hours != null && item.hours > 0 && (
                                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px",
                                        color:`rgba(${ACCENT_RGB},0.6)`, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
                                        {Number.isInteger(item.hours) ? item.hours : item.hours.toFixed(1)}h @ £{HOURLY_RATE}/hr
                                      </span>
                                    )}
                                  </div>
                                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px",
                                    color:"rgba(255,255,255,0.9)", whiteSpace:"nowrap" }}>
                                    {fmt(item.amount)}
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
                        <div className="h-px" style={{ backgroundColor:"rgba(255,255,255,0.08)" }} />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                          <div>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", letterSpacing:"0.25em",
                              color:ACCENT, textTransform:"uppercase" }}>Total Investment</span>
                            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                              color:"rgba(255,255,255,0.85)", marginTop:"4px" }}>Including VAT</p>
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
                      style={{ borderColor:`rgba(${ACCENT_RGB},0.1)`, backgroundColor:`rgba(0,0,0,0.2)` }}>
                      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", lineHeight:1.6, color:"rgba(255,255,255,0.65)" }}>
                        This is an indicative estimate based on your selections and our standard rate of £{HOURLY_RATE}/hr. Final pricing is confirmed after a discovery call and may vary based on specific requirements. All prices include VAT at the current UK rate of 20%.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", color:ACCENT }}
                           className="block text-[14px] tracking-[0.3em] uppercase mb-3">
                      Payment Preference
                    </label>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:"rgba(255,255,255,0.85)" }}
                       className="mb-7">
                      Choose how you'd like to structure the investment — this doesn't commit you to anything.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      {paymentPlans.map((plan) => (
                        <PaymentPlanCard key={plan.id} plan={plan} total={estimate.total}
                          isActive={data.paymentPlan===plan.id}
                          onClick={() => set("paymentPlan", plan.id)} />
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ── STEP 7 ─ About You ───────────────────────────────────���───── */}
              {step === 7 && (
                <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <HoverField label="Your Name"    name="name"  placeholder="Jane Smith"       required value={data.name}      onChange={(v) => set("name", v)}      accent={ACCENT} accentRgb={ACCENT_RGB} />
                    <HoverField label="Email Address" name="email" placeholder="jane@company.com" required type="email" value={data.emailAddr} onChange={(v) => set("emailAddr", v)} accent={ACCENT} accentRgb={ACCENT_RGB} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <HoverField label="Company / Brand"  name="company" placeholder="Acme Ltd."             value={data.company} onChange={(v) => set("company", v)} accent={ACCENT} accentRgb={ACCENT_RGB} />
                    <HoverField label="Existing Website" name="website" placeholder="https://yoursite.com"  value={data.website} onChange={(v) => set("website", v)} accent={ACCENT} accentRgb={ACCENT_RGB} />
                  </div>
                  <HoverTextarea
                    label="Anything else we should know?"
                    name="brief"
                    placeholder="Tell us about your project, competitors you admire, inspiration, or anything that will help us understand your vision..."
                    value={data.brief}
                    onChange={(v) => set("brief", v)}
                    accent={ACCENT}
                    accentRgb={ACCENT_RGB}
                  />
                  <SubmitButton accent={ACCENT} accentRgb={ACCENT_RGB} />
                </form>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ────────────────────────────────────────────────────── */}
          {step < 7 && (
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-white/5">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <BackBtn onClick={goBack} disabled={step===1} className="w-full sm:w-auto" />
                {step > 1 && <ResetBtn onClick={handleReset} className="w-full sm:w-auto" />}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                {step === 4 && (
                  <button type="button" onClick={goNext}
                    className="tracking-[0.2em] uppercase transition-colors duration-200 text-center py-2"
                    style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:"rgba(255,255,255,0.35)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color="rgba(255,255,255,0.65)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color="rgba(255,255,255,0.35)"; }}>
                    Skip for now
                  </button>
                )}
                <div className="w-full sm:w-auto">
                  <NavButton
                    label={step === 6 ? "Provide My Details" : step === 5 ? "See My Estimate" : "Continue"}
                    canGo={canAdvance()}
                    onClick={goNext}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-7 pt-6 border-t border-white/5">
              <BackBtn onClick={goBack} disabled={false} className="w-full sm:w-auto" />
              <ResetBtn onClick={handleReset} className="w-full sm:w-auto" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Payment Plan Card ─────────────��──────────────────────────────────────────

function PaymentPlanCard({ plan, total, isActive, onClick }:
  { plan: PaymentPlan; total: number; isActive: boolean; onClick: () => void }) {
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
              color:isActive?`rgba(${ACCENT_RGB},0.8)`:"rgba(255,255,255,0.85)", transition:"color 0.2s" }}>
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
        <div className="space-y-4 pt-5 border-t" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
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

// ─── Shared sub-components ────────────────────────────────────────────────────

function BackBtn({ onClick, disabled, className = "" }: { onClick: () => void; disabled: boolean; className?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex items-center justify-center gap-2.5 px-5 py-3 border tracking-[0.2em] uppercase transition-all duration-200 ${className}`}
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "14px",
        borderColor:     disabled ? "rgba(255,255,255,0.07)" : hov ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)",
        color:           disabled ? "rgba(255,255,255,0.15)" : hov ? "white" : "rgba(255,255,255,0.55)",
        backgroundColor: hov && !disabled ? "rgba(255,255,255,0.05)" : "transparent",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
}

function ResetBtn({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex items-center justify-center gap-2.5 px-5 py-3 border tracking-[0.2em] uppercase transition-all duration-200 ${className}`}
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "14px",
        borderColor:     hov ? "rgba(220,70,70,0.7)" : "rgba(200,60,60,0.35)",
        color:           hov ? "rgba(240,100,100,0.95)" : "rgba(200,80,80,0.7)",
        backgroundColor: hov ? "rgba(220,60,60,0.07)" : "transparent",
      }}
    >
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

function HoverField({ label, name, type="text", placeholder, required, value, onChange, accent, accentRgb }: {
  label:string; name:string; type?:string; placeholder?:string; required?:boolean;
  value:string; onChange:(v:string)=>void; accent:string; accentRgb:string;
}) {
  const [isHov, setIsHov] = useState(false);
  const [isFoc, setIsFoc] = useState(false);
  return (
    <div onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
      <label htmlFor={name} style={{ fontFamily:"'DM Mono',monospace",
        color:isFoc?accent:"white", transition:"color 0.2s",
        display:"block", fontSize:"14px", letterSpacing:"0.3em", textTransform:"uppercase" as const, marginBottom:"12px" }}>
        {label}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b py-4 focus:outline-none placeholder-white/30"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
          borderColor:isFoc?accent:isHov?`rgba(${accentRgb},0.6)`:`rgba(${accentRgb},0.25)`,
          color:"rgba(255,255,255,0.9)", transition:"all 0.2s" }}
        onFocus={() => setIsFoc(true)} onBlur={() => setIsFoc(false)} />
    </div>
  );
}

function HoverTextarea({ label, name, placeholder, value, onChange, accent, accentRgb }: {
  label:string; name:string; placeholder?:string;
  value:string; onChange:(v:string)=>void; accent:string; accentRgb:string;
}) {
  const [isHov, setIsHov] = useState(false);
  const [isFoc, setIsFoc] = useState(false);
  return (
    <div onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
      <label style={{ fontFamily:"'DM Mono',monospace",
        color:isFoc?accent:"white", transition:"color 0.2s",
        display:"block", fontSize:"14px", letterSpacing:"0.3em", textTransform:"uppercase" as const, marginBottom:"14px" }}>
        {label}
      </label>
      <textarea name={name} rows={6} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border px-6 py-5 leading-relaxed focus:outline-none resize-none placeholder-white/30 transition-all duration-200"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px",
          borderColor:isFoc?accent:isHov?`rgba(${accentRgb},0.6)`:`rgba(${accentRgb},0.25)`,
          color:"rgba(255,255,255,0.9)" }}
        onFocus={() => setIsFoc(true)} onBlur={() => setIsFoc(false)} />
    </div>
  );
}

// ─── AddonToggle ──────────────────────────────────────────────────────────────

function AddonToggle({
  active, label, sublabel, Icon, onClick,
}: {
  active: boolean; label: string; sublabel: string; Icon: LucideIcon; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const lit = active || hov;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex flex-col items-center gap-1.5 px-3 py-2.5 border transition-all duration-150 select-none"
      style={{
        borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.18)`,
        backgroundColor: active ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       active ? `0 0 12px rgba(${ACCENT_RGB},0.18)` : "none",
        minWidth: "70px",
      }}
    >
      {/* checkbox */}
      <div
        className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-150"
        style={{
          borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.5)` : `rgba(${ACCENT_RGB},0.25)`,
          backgroundColor: active ? ACCENT : "transparent",
        }}
      >
        {active && <Check size={10} color="#0a0a0a" strokeWidth={3} />}
      </div>
      {/* icon */}
      <Icon
        size={13}
        style={{ color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`, transition: "color 0.15s" }}
      />
    </button>
  );
}

// ─── ImageStepper ─────────────────────────────────────────────────────────────

function ImageStepper({ qty, price, onChange }: { qty: number; price: string; onChange: (q: number) => void }) {
  const [hov, setHov] = useState(false);
  const active = qty > 0;
  const lit = active || hov;
  return (
    <div
      className="flex flex-col items-center gap-1.5 px-3 py-2.5 border transition-all duration-150 select-none"
      style={{
        borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.18)`,
        backgroundColor: active ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       active ? `0 0 12px rgba(${ACCENT_RGB},0.18)` : "none",
        minWidth: "70px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <ImageIcon size={13} style={{ color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`, transition: "color 0.15s" }} />
      {/* stepper row */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(qty - 1)}
          className="w-4 h-4 flex items-center justify-center border transition-all duration-150"
          style={{
            borderColor: lit ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.2)`,
            color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`,
            fontSize: "11px", lineHeight: 1,
          }}
        >−</button>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color: active ? "white" : `rgba(255,255,255,0.35)`, minWidth:"14px", textAlign:"center", transition:"color 0.15s" }}>
          {qty}
        </span>
        <button
          type="button"
          onClick={() => onChange(qty + 1)}
          className="w-4 h-4 flex items-center justify-center border transition-all duration-150"
          style={{
            borderColor: lit ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.2)`,
            color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`,
            fontSize: "11px", lineHeight: 1,
          }}
        >+</button>
      </div>
    </div>
  );
}

// ─── VideoStepper ─────────────────────────────────────────────────────────────

function VideoStepper({ qty, price, onChange }: { qty: number; price: string; onChange: (q: number) => void }) {
  const [hov, setHov] = useState(false);
  const active = qty > 0;
  const lit = active || hov;
  return (
    <div
      className="flex flex-col items-center gap-1.5 px-3 py-2.5 border transition-all duration-150 select-none"
      style={{
        borderColor:     active ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.45)` : `rgba(${ACCENT_RGB},0.18)`,
        backgroundColor: active ? `rgba(${ACCENT_RGB},0.12)` : hov ? `rgba(${ACCENT_RGB},0.06)` : "transparent",
        boxShadow:       active ? `0 0 12px rgba(${ACCENT_RGB},0.18)` : "none",
        minWidth: "70px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Video size={13} style={{ color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`, transition: "color 0.15s" }} />
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(qty - 1)}
          className="w-4 h-4 flex items-center justify-center border transition-all duration-150"
          style={{
            borderColor: lit ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.2)`,
            color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`,
            fontSize: "11px", lineHeight: 1,
          }}
        >−</button>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color: active ? "white" : `rgba(255,255,255,0.35)`, minWidth:"14px", textAlign:"center", transition:"color 0.15s" }}>
          {qty}
        </span>
        <button
          type="button"
          onClick={() => onChange(qty + 1)}
          className="w-4 h-4 flex items-center justify-center border transition-all duration-150"
          style={{
            borderColor: lit ? `rgba(${ACCENT_RGB},0.55)` : `rgba(${ACCENT_RGB},0.2)`,
            color: lit ? ACCENT : `rgba(${ACCENT_RGB},0.4)`,
            fontSize: "11px", lineHeight: 1,
          }}
        >+</button>
      </div>
    </div>
  );
}

// ─── Build Hours Info Modal ────────────────────────────────────────────────────

function BuildHoursInfo() {
  const [open, setOpen] = useState(false);

  const phases = [
    {
      step: "01",
      title: "Discovery & Wireframing",
      desc: "We map out the page's purpose, user journey, and layout. Low-fidelity wireframes are produced and shared for sign-off before any design begins.",
    },
    {
      step: "02",
      title: "Concept & Ideation",
      desc: "Visual direction is explored — typography hierarchy, spacing, colour application, and any unique design treatments specific to the page.",
    },
    {
      step: "03",
      title: "High-Fidelity Design",
      desc: "The approved wireframe is brought to life in full detail: desktop and mobile compositions, imagery placement, and micro-interactions.",
    },
    {
      step: "04",
      title: "Client Revisions",
      desc: "Up to two rounds of structured revisions are included per page. Feedback is consolidated and applied with precision.",
    },
    {
      step: "05",
      title: "Development Handoff",
      desc: "Annotated design specs, assets, and interaction notes are prepared and handed to the development team for build.",
    },
    {
      step: "06",
      title: "QA & Sign-off",
      desc: "The built page is reviewed against the design for pixel accuracy, responsiveness, and performance before final approval.",
    },
  ];

  const tiers = [
    { label: "Homepage",                     hrs: "10h", note: "Full layout, hero, all sections" },
    { label: "Service / Product pages",      hrs: "7h",  note: "Complex layouts, feature-heavy" },
    { label: "Portfolio / Gallery / Work",   hrs: "6h",  note: "Visual-led, case study depth"   },
    { label: "About / Blog / Content",       hrs: "5h",  note: "Editorial structure"             },
    { label: "Process / Events",             hrs: "4h",  note: "Supporting content pages"        },
    { label: "Contact / Testimonials / FAQ", hrs: "3h",  note: "Lighter structure"               },
    { label: "Legal / Utility pages",        hrs: "1.5h",note: "Minimal layout"                  },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          background: "none", border: "none", padding: 0, cursor: "pointer",
          display: "inline-flex", alignItems: "center", lineHeight: 1,
        }}
        aria-label="What's included in page build hours"
      >
        <Info
          size={11}
          style={{ color: `rgba(${ACCENT_RGB},0.5)`, transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={(e) => (e.currentTarget.style.color = `rgba(${ACCENT_RGB},0.5)`)}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 9998,
                backgroundColor: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                width: "min(720px, 92vw)",
                maxHeight: "88vh",
                overflowY: "auto",
                background: "linear-gradient(160deg, #1a2535 0%, #111827 60%, #0e141f 100%)",
                border: `1px solid rgba(${ACCENT_RGB},0.22)`,
                boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(${ACCENT_RGB},0.06), inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {/* Top accent line */}
              <div style={{
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                opacity: 0.6,
              }} />

              <div style={{ padding: "36px 40px 40px" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", letterSpacing: "0.32em",
                      textTransform: "uppercase", color: ACCENT, marginBottom: "10px" }}>
                      Understanding your quote
                    </p>
                    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)",
                      color: "white", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                      What's included in<br />Page Build Hours?
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    style={{
                      background: "none", border: `1px solid rgba(255,255,255,0.1)`,
                      color: "rgba(255,255,255,0.4)", cursor: "pointer",
                      width: "36px", height: "36px", display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0, transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.5)`;
                      e.currentTarget.style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }}
                    aria-label="Close modal"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Intro paragraph */}
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", lineHeight: "1.7",
                  color: "rgba(255,255,255,0.6)", marginBottom: "36px",
                  borderLeft: `2px solid rgba(${ACCENT_RGB},0.3)`, paddingLeft: "16px" }}>
                  Every page on your site goes through a structured design and planning process before a single line of code is written.
                  Page build hours cover everything from initial concept through to development handoff — not just the visual design.
                </p>

                {/* Process phases grid */}
                <div style={{ marginBottom: "36px" }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.3em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
                    What's covered in each page
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "10px" }}>
                    {phases.map((phase) => (
                      <div
                        key={phase.step}
                        style={{
                          padding: "16px 18px",
                          border: `1px solid rgba(${ACCENT_RGB},0.1)`,
                          backgroundColor: `rgba(${ACCENT_RGB},0.03)`,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
                            color: `rgba(${ACCENT_RGB},0.45)`, letterSpacing: "0.1em", flexShrink: 0 }}>
                            {phase.step}
                          </span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px",
                            color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>
                            {phase.title}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px",
                          color: "rgba(255,255,255,0.65)", lineHeight: "1.6", margin: 0 }}>
                          {phase.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hour tiers table */}
                <div style={{ borderTop: `1px solid rgba(${ACCENT_RGB},0.12)`, paddingTop: "28px" }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "0.3em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "12px" }}>
                    Estimated hours by page type
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {tiers.map(({ label, hrs, note }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "10px 14px",
                          backgroundColor: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <div>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px",
                            color: "rgba(255,255,255,0.75)" }}>
                            {label}
                          </span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px",
                            color: "rgba(255,255,255,0.28)", marginLeft: "10px" }}>
                            {note}
                          </span>
                        </div>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px",
                          color: ACCENT, letterSpacing: "0.06em", flexShrink: 0, marginLeft: "16px" }}>
                          {hrs}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px",
                    color: "rgba(255,255,255,0.25)", lineHeight: "1.5", marginTop: "12px" }}>
                    Sub-pages share layouts with their parent page and are billed at ~60% of the equivalent top-level rate.
                    All hours are multiplied by the £{HOURLY_RATE}/hr rate. Final figures are confirmed after your discovery call.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── PageBuilder ──────────────────────────────────────────────────────────────

function PageBuilder({ pages, onChange, typeId = "brochure", isSetupType = false }: { pages: PageItem[]; onChange: (p: PageItem[]) => void; typeId?: string; isSetupType?: boolean }) {
  const isLanding = typeId === "landing";
  const presetPages = presetPagesByType[typeId] ?? presetPagesByType.brochure;
  const [customName, setCustomName] = useState("");
  const [customParent, setCustomParent] = useState<string>("");
  const [showCustom, setShowCustom] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);
  const [enabledAddons, setEnabledAddons] = useState<Set<string>>(
    new Set(["seo", "content", "images", "animation", "video"])
  );
  const toggleEnabledAddon = (key: string) =>
    setEnabledAddons((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  // Mobile card collapse state — collapsed by default
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const toggleCard = (id: string) =>
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Pages eligible to be parents (top-level only, no circular nesting)
  const parentOptions = pages.filter((p) => !p.parent);

  const addPage = (name: string, parent?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (pages.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...pages, { id: `${Date.now()}-${Math.random()}`, name: trimmed, seo: false, content: false, images: 0, videos: 0, animation: false, parent: parent || undefined }]);
  };

  const removePage = (id: string) => onChange(pages.filter((p) => p.id !== id && p.parent !== id));

  const toggleAddon = (id: string, addon: "seo" | "content" | "animation") =>
    onChange(pages.map((p) => p.id === id ? { ...p, [addon]: !p[addon] } : p));

  const setImages = (id: string, qty: number) =>
    onChange(pages.map((p) => p.id === id ? { ...p, images: Math.max(0, qty) } : p));

  const setVideos = (id: string, qty: number) =>
    onChange(pages.map((p) => p.id === id ? { ...p, videos: Math.max(0, qty) } : p));

  const handleCustomAdd = () => {
    addPage(customName, customParent || undefined);
    setCustomName("");
    setCustomParent("");
    setShowCustom(false);
  };

  const isAdded = (name: string) => pages.some((p) => p.name === name);

  // Standard website page order for auto-sort
  const STANDARD_ORDER = [
    "home", "about us", "about", "our story", "who we are",
    "services", "what we do", "solutions",
    "portfolio", "work", "our work", "projects",
    "case studies",
    "team", "our team", "meet the team",
    "testimonials", "reviews",
    "pricing", "packages",
    "gallery",
    "blog", "news", "articles", "insights",
    "events",
    "shop", "store",
    "faq", "faqs", "help",
    "careers", "jobs", "work with us",
    "contact", "contact us", "get in touch",
    "sitemap",
    "privacy policy", "privacy",
    "terms & conditions", "terms and conditions", "terms",
    "cookie policy",
  ];

  const sortByStandardPractices = () => {
    const getOrder = (name: string) => {
      const idx = STANDARD_ORDER.indexOf(name.toLowerCase());
      return idx === -1 ? 9000 : idx;
    };
    const topLevel = pages.filter((p) => !p.parent).slice().sort((a, b) => getOrder(a.name) - getOrder(b.name));
    const sorted: PageItem[] = [];
    topLevel.forEach((p) => {
      sorted.push(p);
      pages.filter((c) => c.parent === p.id).forEach((c) => sorted.push(c));
    });
    onChange(sorted);
  };

  const SEO_PRICE       = `+£${Math.round(PAGE_SEO_HOURS * HOURLY_RATE)}/pg`;
  const CONTENT_PRICE   = `+£${Math.round(PAGE_CONTENT_HOURS * HOURLY_RATE)}/pg`;
  const IMAGES_PRICE    = `£${IMAGE_UNIT_PRICE}/img`;
  const ANIMATION_PRICE = `+£${ANIMATION_PAGE_PRICE}/pg`;
  const VIDEO_PRICE     = `£${VIDEO_UNIT_PRICE}/vid`;

  // ── Addon definitions (single source of truth for selector + table) ──
  const ADDON_DEFS = [
    { key: "seo",       label: "SEO",       description: "Search engine optimisation per page",      sub: SEO_PRICE,       Icon: Search,    color: ACCENT },
    { key: "content",   label: "Content",   description: "Professional copywriting per page",        sub: CONTENT_PRICE,   Icon: FileText,  color: ACCENT },
    { key: "images",    label: "Images",    description: "Stock / sourced photography",               sub: IMAGES_PRICE,    Icon: ImageIcon, color: ACCENT },
    { key: "animation", label: "Animation", description: "Scroll & entrance animations per page",    sub: ANIMATION_PRICE, Icon: Sparkles,  color: ACCENT },
    { key: "video",     label: "Video",     description: "Embedded or background video per page",    sub: VIDEO_PRICE,     Icon: Video,     color: ACCENT },
  ];

  const activeAddons = ADDON_DEFS.filter((a) => enabledAddons.has(a.key));
  const addonColWidths = activeAddons.map(() => "70px").join(" ");
  const gridTemplate = `1fr ${addonColWidths}${activeAddons.length > 0 ? " " : ""}72px 80px 72px 36px`;

  return (
    <div>
      {/* Section header — 01 / Pages */}
      <div className="mb-7">
        <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "20px", color: "white", letterSpacing: "0.01em", marginBottom: "4px" }}>
          {isLanding ? "Add-ons" : isSetupType ? "Additional Pages" : "Pages"}
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.5" }}>
          {isLanding
            ? "Choose the add-ons for your landing page."
            : isSetupType
              ? "Beyond your core setup, add extra pages with individual add-ons."
              : "Click presets or add your own, then choose add-ons per page."}
        </p>
      </div>

      {/* Preset chips — hidden for landing (locked single page) */}
      {!isLanding && (
      <div className="flex flex-wrap gap-2 mb-10">
        {presetPages.map((name) => {
          const added = isAdded(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => added ? removePage(pages.find((p) => p.name === name)!.id) : addPage(name)}
              className="flex items-center gap-1.5 px-3.5 py-2 border transition-all duration-150"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "14px",
                borderColor:     added ? ACCENT : `rgba(${ACCENT_RGB},0.2)`,
                backgroundColor: added ? `rgba(${ACCENT_RGB},0.12)` : `rgba(${ACCENT_RGB},0.03)`,
                color:           added ? ACCENT : "rgba(255,255,255,0.75)",
              }}
            >
              {added
                ? <Check size={11} style={{ flexShrink: 0 }} />
                : <Plus  size={11} style={{ flexShrink: 0, opacity: 0.5 }} />}
              {name}
            </button>
          );
        })}

        {/* Add Custom Page button — sits inline with the preset chips */}
        <button
          type="button"
          onClick={() => { setShowCustom((v) => { if (!v) setTimeout(() => customInputRef.current?.focus(), 50); return !v; }); setCustomName(""); setCustomParent(""); }}
          className="flex items-center gap-1.5 px-3.5 py-2 border transition-all duration-150"
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "14px",
            borderColor: showCustom ? "rgba(239,68,68,0.5)" : "rgba(239,68,68,0.25)",
            backgroundColor: showCustom ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.03)",
            color: showCustom ? "rgba(239,68,68,0.9)" : "rgba(239,68,68,0.65)",
          }}
        >
          {showCustom
            ? <X size={11} style={{ flexShrink: 0 }} />
            : <Plus size={11} style={{ flexShrink: 0 }} />}
          Add Custom Page
        </button>
      </div>
      )} {/* end !isLanding preset chips */}

      {/* Custom page input — hidden by default, revealed by button above */}
      <AnimatePresence>
      {!isLanding && showCustom && (
      <motion.div
        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
        animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
      <div className="flex flex-col gap-2 border px-4 pt-4 pb-5" style={{ borderColor: `rgba(239,68,68,0.2)`, backgroundColor: "rgba(239,68,68,0.03)" }}>
        {/* Input + Add — stacks on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            ref={customInputRef}
            placeholder="Custom page name…"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCustomAdd())}
            className="flex-1 bg-transparent border-b py-3 focus:outline-none"
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "14px",
              borderColor: `rgba(${ACCENT_RGB},0.25)`,
              color: "rgba(255,255,255,0.9)",
            }}
          />
          <button
            type="button"
            onClick={handleCustomAdd}
            disabled={!customName.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 border tracking-[0.2em] uppercase transition-all duration-150"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "11px",
              borderColor: customName.trim() ? ACCENT : `rgba(${ACCENT_RGB},0.18)`,
              color:       customName.trim() ? ACCENT : `rgba(${ACCENT_RGB},0.3)`,
            }}
          >
            <Plus size={13} />
            Add
          </button>
        </div>

        {/* Parent page selector — label above chips on mobile */}
        {parentOptions.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2">
            <div className="flex items-center gap-1.5" style={{ flexShrink: 0 }}>
              <CornerDownRight size={11} style={{ color: `rgba(${ACCENT_RGB},0.45)` }} />
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.2em", color:`rgba(${ACCENT_RGB},0.5)`, textTransform:"uppercase" }}>
                Sub-page of
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {/* "None" chip */}
              <button
                type="button"
                onClick={() => setCustomParent("")}
                className="px-3 py-1.5 border transition-all duration-100"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "11px",
                  borderColor: customParent === "" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
                  color:       customParent === "" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                  backgroundColor: customParent === "" ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                None
              </button>
              {parentOptions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCustomParent(customParent === p.id ? "" : p.id)}
                  className="px-3 py-1.5 border transition-all duration-100"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "11px",
                    borderColor:     customParent === p.id ? ACCENT : `rgba(${ACCENT_RGB},0.18)`,
                    color:           customParent === p.id ? ACCENT : "rgba(255,255,255,0.5)",
                    backgroundColor: customParent === p.id ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </motion.div>
      )}
      </AnimatePresence>

      {/* ── What will pages need? ── */}
      <div style={{ borderTop: `1px solid rgba(${ACCENT_RGB},0.1)`, paddingTop: "28px" }}>
        {/* Question heading */}
        <div className="mb-5">
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "20px", color: "white", letterSpacing: "0.01em", marginBottom: "4px" }}>
            What do your pages need?
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.5" }}>
            Select the add-ons that apply to this project — columns will show or hide in the page list below.
          </p>
        </div>

        {/* Toggle cards */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          {ADDON_DEFS.map(({ key, label, description, sub, Icon, color }) => {
            const active = enabledAddons.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleEnabledAddon(key)}
                className="flex flex-col items-start gap-2 transition-all duration-200"
                style={{
                  padding: "12px 14px",
                  minWidth: "0",
                  flex: "1 1 130px",
                  maxWidth: "200px",
                  border: active
                    ? `1px solid ${color}`
                    : `1px solid rgba(255,255,255,0.07)`,
                  backgroundColor: active
                    ? `${color}18`
                    : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                  outline: "none",
                }}
              >
                {/* Checkbox indicator */}
                <div className="flex items-center justify-between w-full">
                  <div style={{
                    width: "16px", height: "16px", border: active ? `2px solid ${color}` : "2px solid rgba(255,255,255,0.18)",
                    backgroundColor: active ? color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.15s",
                  }}>
                    {active && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <Icon size={14} style={{ color: active ? color : "rgba(255,255,255,0.25)", transition: "color 0.15s" }} />
                </div>

                <div>
                  <div style={{
                    fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "0.18em",
                    textTransform: "uppercase", color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                    transition: "color 0.15s", marginBottom: "3px",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "10px",
                    color: active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)",
                    lineHeight: "1.4", transition: "color 0.15s",
                  }}>
                    {description}
                  </div>
                </div>

                <div style={{
                  fontFamily: "'DM Mono',monospace", fontSize: "11px",
                  color: active ? color : "rgba(255,255,255,0.2)",
                  letterSpacing: "0.05em", transition: "color 0.15s",
                }}>
                  {sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* "None selected" notice */}
        {enabledAddons.size === 0 && (
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: `rgba(${ACCENT_RGB},0.45)`, marginTop: "12px" }}>
            No add-ons selected — the page list will show build costs only.
          </p>
        )}
      </div>

      {/* Spacer between addon selector and page list */}
      <div style={{ height: "36px" }} />

      {/* Section header — 03 / Sitemap */}
      <div className="mb-5">
        <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "20px", color: "white", letterSpacing: "0.01em", marginBottom: "4px" }}>
          Your Sitemap
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.5" }}>
          Your selected pages and per-page add-on costs at a glance.
        </p>
      </div>

      {/* Page list */}
      <AnimatePresence>
        {pages.length > 0 && (() => {
          // Shared sort logic
          const topLevel = pages.filter((p) => !p.parent);
          const sorted: PageItem[] = [];
          topLevel.forEach((p) => {
            sorted.push(p);
            pages.filter((c) => c.parent === p.id).forEach((c) => sorted.push(c));
          });
          pages.filter((p) => p.parent && !pages.find((t) => t.id === p.parent)).forEach((p) => sorted.push(p));

          // Shared footer totals
          const totalAddonCost = pages.reduce((sum, p) =>
            sum
            + (enabledAddons.has("seo")       && p.seo       ? PAGE_SEO_HOURS * HOURLY_RATE    : 0)
            + (enabledAddons.has("content")   && p.content   ? PAGE_CONTENT_HOURS * HOURLY_RATE : 0)
            + (enabledAddons.has("images")                    ? p.images * IMAGE_UNIT_PRICE      : 0)
            + (enabledAddons.has("animation") && p.animation  ? ANIMATION_PAGE_PRICE             : 0)
            + (enabledAddons.has("video")                     ? p.videos * VIDEO_UNIT_PRICE      : 0)
          , 0);
          const totalBuildCost = pages.reduce((sum, p) => sum + getPageBuildHours(p.name, !!p.parent) * HOURLY_RATE, 0);
          const combinedTotal = totalAddonCost + totalBuildCost;

          const footerCol = (label: string, value: string, isAccent = false) => (
            <div className="flex flex-col gap-0.5">
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.22em",
                textTransform:"uppercase" as const, color:"rgba(255,255,255,0.3)" }}>{label}</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px",
                color: isAccent ? ACCENT : "rgba(255,255,255,0.75)" }}>{value}</span>
            </div>
          );

          const FooterBar = () => (
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3"
              style={{ backgroundColor:`rgba(${ACCENT_RGB},0.04)`, borderTop:`1px solid rgba(${ACCENT_RGB},0.1)` }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.2em",
                color:`rgba(${ACCENT_RGB},0.5)`, textTransform:"uppercase" }}>
                {isLanding ? "Your page" : `${pages.length} page${pages.length !== 1 ? "s" : ""}`}
              </span>
              <div className="flex items-center" style={{ border:`1px solid rgba(${ACCENT_RGB},0.3)`, borderRadius:"2px" }}>
                <div className="px-3 sm:px-5 py-1.5">{footerCol("Add On Cost", totalAddonCost > 0 ? fmt(totalAddonCost) : "—")}</div>
                <div className="px-3 sm:px-5 py-1.5" style={{ borderLeft:`1px solid rgba(${ACCENT_RGB},0.2)` }}>{footerCol("Page Build", totalBuildCost > 0 ? fmt(totalBuildCost) : "—")}</div>
                <div className="px-3 sm:px-5 py-1.5" style={{ borderLeft:`1px solid rgba(${ACCENT_RGB},0.2)`, backgroundColor:`rgba(${ACCENT_RGB},0.07)` }}>{footerCol("Total", combinedTotal > 0 ? fmt(combinedTotal) : "—", true)}</div>
              </div>
            </div>
          );

          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
              className="overflow-hidden"
            >

              {/* ── Mobile card view (< md) ──────────────────────────────────── */}
              <div className="md:hidden border" style={{ borderColor:`rgba(${ACCENT_RGB},0.15)` }}>
                <AnimatePresence>
                  {sorted.map((page, i) => {
                    const isSub = !!page.parent;
                    const parentPage = isSub ? pages.find((p) => p.id === page.parent) : undefined;
                    const addonCost =
                        (enabledAddons.has("seo")       && page.seo       ? PAGE_SEO_HOURS * HOURLY_RATE    : 0)
                      + (enabledAddons.has("content")   && page.content   ? PAGE_CONTENT_HOURS * HOURLY_RATE : 0)
                      + (enabledAddons.has("images")                       ? page.images * IMAGE_UNIT_PRICE   : 0)
                      + (enabledAddons.has("animation") && page.animation  ? ANIMATION_PAGE_PRICE             : 0)
                      + (enabledAddons.has("video")                        ? page.videos * VIDEO_UNIT_PRICE   : 0);
                    const pageBuildCost = getPageBuildHours(page.name, isSub) * HOURLY_RATE;
                    const rowTotal = addonCost + pageBuildCost;
                    return (
                      <motion.div key={page.id}
                        initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0, x:20 }} transition={{ duration:0.2, delay: i * 0.03 }}
                        className="border-b" style={{ borderColor:"rgba(255,255,255,0.05)" }}>

                        {/* Card header: clickable to expand/collapse add-ons */}
                        {(() => {
                          const isExpanded = expandedCards.has(page.id);
                          const hasAddons = activeAddons.length > 0;
                          return (
                            <>
                              <div
                                className="flex items-center justify-between px-4 py-3"
                                style={{
                                  backgroundColor: isSub ? `rgba(${ACCENT_RGB},0.03)` : isLanding ? `rgba(${ACCENT_RGB},0.04)` : "transparent",
                                  cursor: hasAddons ? "pointer" : "default",
                                }}
                                onClick={() => hasAddons && toggleCard(page.id)}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  {isSub && <CornerDownRight size={11} style={{ color:`rgba(${ACCENT_RGB},0.4)`, flexShrink:0 }} />}
                                  {!isSub && !isLanding && (
                                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)`, minWidth:"16px", flexShrink:0 }}>
                                      {String(topLevel.indexOf(page) + 1).padStart(2,"0")}
                                    </span>
                                  )}
                                  {isLanding && (
                                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.15em",
                                      color:"rgba(255,255,255,0.35)", border:"1px solid rgba(255,255,255,0.12)",
                                      padding:"2px 5px", whiteSpace:"nowrap" as const, flexShrink:0 }}>LOCKED</span>
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px",
                                        color: isSub ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)" }}>
                                        {page.name}
                                      </span>
                                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px",
                                        color:`rgba(${ACCENT_RGB},0.45)`, whiteSpace:"nowrap" as const }}>
                                        {(() => { const h = getPageBuildHours(page.name, isSub); return Number.isInteger(h) ? h : h.toFixed(1); })()}h
                                      </span>
                                    </div>
                                    {isSub && parentPage && (
                                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px",
                                        letterSpacing:"0.1em", color:`rgba(${ACCENT_RGB},0.4)` }}>
                                        /{parentPage.name.toLowerCase().replace(/\s+/g,"-")}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Right side: collapsed total pill + chevron + delete */}
                                <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                  {/* Collapsed total — shown only when collapsed and addons exist */}
                                  {hasAddons && !isExpanded && (
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleCard(page.id)}>
                                      <div className="flex items-center" style={{ border:`1px solid rgba(${ACCENT_RGB},0.2)`, borderRadius:"2px" }}>
                                        <div className="px-2.5 py-1">
                                          <div className="flex flex-col gap-0.5">
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"7px", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:`rgba(${ACCENT_RGB},0.4)` }}>Total</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:ACCENT, fontWeight:600 }}>{fmt(rowTotal)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Chevron toggle */}
                                  {hasAddons && (
                                    <button
                                      type="button"
                                      onClick={() => toggleCard(page.id)}
                                      className="flex items-center justify-center transition-transform duration-200"
                                      style={{
                                        width:"28px", height:"28px",
                                        border:`1px solid rgba(${ACCENT_RGB},0.2)`,
                                        color:`rgba(${ACCENT_RGB},0.6)`,
                                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                        flexShrink:0,
                                      }}
                                    >
                                      <ChevronDown size={13} />
                                    </button>
                                  )}

                                  {!isLanding && <DeletePageBtn onClick={() => removePage(page.id)} />}
                                </div>
                              </div>

                              {/* Collapsible body — add-on rows + cost footer */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    key="body"
                                    initial={{ height:0, opacity:0 }}
                                    animate={{ height:"auto", opacity:1 }}
                                    exit={{ height:0, opacity:0 }}
                                    transition={{ duration:0.22, ease:[0.16,1,0.3,1] }}
                                    style={{ overflow:"hidden" }}
                                  >
                                    {/* Add-on rows */}
                                    <div style={{ borderTop:`1px solid rgba(${ACCENT_RGB},0.08)` }}>
                                      {enabledAddons.has("seo") && (
                                        <div className="flex items-center justify-between px-4 py-2.5"
                                          style={{ borderBottom:`1px solid rgba(${ACCENT_RGB},0.06)` }}>
                                          <div className="flex items-center gap-2">
                                            <Search size={12} style={{ color:`rgba(${ACCENT_RGB},0.5)`, flexShrink:0 }} />
                                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.85)" }}>SEO</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>{SEO_PRICE}</span>
                                          </div>
                                          <AddonToggle active={page.seo} label="SEO" sublabel={SEO_PRICE} Icon={Search} onClick={() => toggleAddon(page.id,"seo")} />
                                        </div>
                                      )}
                                      {enabledAddons.has("content") && (
                                        <div className="flex items-center justify-between px-4 py-2.5"
                                          style={{ borderBottom:`1px solid rgba(${ACCENT_RGB},0.06)` }}>
                                          <div className="flex items-center gap-2">
                                            <FileText size={12} style={{ color:`rgba(${ACCENT_RGB},0.5)`, flexShrink:0 }} />
                                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.85)" }}>Content</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>{CONTENT_PRICE}</span>
                                          </div>
                                          <AddonToggle active={page.content} label="Content" sublabel={CONTENT_PRICE} Icon={FileText} onClick={() => toggleAddon(page.id,"content")} />
                                        </div>
                                      )}
                                      {enabledAddons.has("images") && (
                                        <div className="flex items-center justify-between px-4 py-2.5"
                                          style={{ borderBottom:`1px solid rgba(${ACCENT_RGB},0.06)` }}>
                                          <div className="flex items-center gap-2">
                                            <ImageIcon size={12} style={{ color:`rgba(${ACCENT_RGB},0.5)`, flexShrink:0 }} />
                                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.85)" }}>Images</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>{IMAGES_PRICE}</span>
                                          </div>
                                          <ImageStepper qty={page.images} price={IMAGES_PRICE} onChange={(q) => setImages(page.id,q)} />
                                        </div>
                                      )}
                                      {enabledAddons.has("animation") && (
                                        <div className="flex items-center justify-between px-4 py-2.5"
                                          style={{ borderBottom:`1px solid rgba(${ACCENT_RGB},0.06)` }}>
                                          <div className="flex items-center gap-2">
                                            <Sparkles size={12} style={{ color:`rgba(${ACCENT_RGB},0.5)`, flexShrink:0 }} />
                                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.85)" }}>Animation</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>{ANIMATION_PRICE}</span>
                                          </div>
                                          <AddonToggle active={page.animation} label="Anim." sublabel={ANIMATION_PRICE} Icon={Sparkles} onClick={() => toggleAddon(page.id,"animation")} />
                                        </div>
                                      )}
                                      {enabledAddons.has("video") && (
                                        <div className="flex items-center justify-between px-4 py-2.5"
                                          style={{ borderBottom:`1px solid rgba(${ACCENT_RGB},0.06)` }}>
                                          <div className="flex items-center gap-2">
                                            <Video size={12} style={{ color:`rgba(${ACCENT_RGB},0.5)`, flexShrink:0 }} />
                                            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.85)" }}>Video</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>{VIDEO_PRICE}</span>
                                          </div>
                                          <VideoStepper qty={page.videos} price={VIDEO_PRICE} onChange={(q) => setVideos(page.id,q)} />
                                        </div>
                                      )}
                                    </div>

                                    {/* Expanded cost footer */}
                                    <div className="flex items-center justify-end px-4 py-2"
                                      style={{ backgroundColor:`rgba(${ACCENT_RGB},0.03)`, borderTop:`1px solid rgba(${ACCENT_RGB},0.08)` }}>
                                      <div className="flex items-center" style={{ border:`1px solid rgba(${ACCENT_RGB},0.2)`, borderRadius:"2px" }}>
                                        <div className="px-3 py-1">
                                          <div className="flex flex-col gap-0.5">
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.25)" }}>Add-ons</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:addonCost > 0 ? `rgba(${ACCENT_RGB},0.9)` : "rgba(255,255,255,0.2)" }}>{addonCost > 0 ? fmt(addonCost) : "—"}</span>
                                          </div>
                                        </div>
                                        <div className="px-3 py-1" style={{ borderLeft:`1px solid rgba(${ACCENT_RGB},0.15)` }}>
                                          <div className="flex flex-col gap-0.5">
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.25)" }}>Build</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:"rgba(255,255,255,0.6)" }}>{fmt(pageBuildCost)}</span>
                                          </div>
                                        </div>
                                        <div className="px-3 py-1" style={{ borderLeft:`1px solid rgba(${ACCENT_RGB},0.2)`, backgroundColor:`rgba(${ACCENT_RGB},0.07)` }}>
                                          <div className="flex flex-col gap-0.5">
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:`rgba(${ACCENT_RGB},0.45)` }}>Total</span>
                                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:ACCENT, fontWeight:600 }}>{fmt(rowTotal)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          );
                        })()}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <FooterBar />
              </div>

              {/* ── Desktop table view (md+) ─────────────────────────────────── */}
              <div className="hidden md:block border" style={{ borderColor:`rgba(${ACCENT_RGB},0.15)` }}>
                {/* Table header */}
                <div className="grid items-center px-5 py-3 border-b"
                  style={{ gridTemplateColumns:gridTemplate, columnGap:"16px",
                    borderColor:`rgba(${ACCENT_RGB},0.12)`, backgroundColor:`rgba(${ACCENT_RGB},0.04)` }}>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", letterSpacing:"0.22em", color:`rgba(${ACCENT_RGB},0.55)`, textTransform:"uppercase" }}>Page</span>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.4)` }}>build hrs</span>
                      <BuildHoursInfo />
                    </div>
                  </div>
                  {activeAddons.map(({ key, label, sub, Icon }) => (
                    <div key={key} className="flex flex-col items-center gap-1">
                      <Icon size={13} style={{ color:"rgba(255,255,255,0.75)" }} />
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.85)", textTransform:"uppercase" }}>{label}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.5)" }}>{sub}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center gap-1" style={{ borderLeft:`2px solid rgba(${ACCENT_RGB},0.4)`, paddingLeft:"10px" }}>
                    <Clock size={13} style={{ color:`rgba(${ACCENT_RGB},0.6)` }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.15em", color:`rgba(${ACCENT_RGB},0.8)`, textTransform:"uppercase" }}>Add On</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.45)` }}>cost</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <PoundSterling size={13} style={{ color:"rgba(255,255,255,0.5)" }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.65)", textTransform:"uppercase" }}>Page</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"rgba(255,255,255,0.38)" }}>build</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <PoundSterling size={13} style={{ color:ACCENT }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:"0.15em", color:ACCENT, textTransform:"uppercase" }}>Total</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:`rgba(${ACCENT_RGB},0.5)` }}>page</span>
                  </div>
                  <span />
                </div>

                {/* Table rows */}
                <AnimatePresence>
                  {sorted.map((page, i) => {
                    const isSub = !!page.parent;
                    const parentPage = isSub ? pages.find((p) => p.id === page.parent) : undefined;
                    const addonCost =
                        (enabledAddons.has("seo")       && page.seo       ? PAGE_SEO_HOURS * HOURLY_RATE    : 0)
                      + (enabledAddons.has("content")   && page.content   ? PAGE_CONTENT_HOURS * HOURLY_RATE : 0)
                      + (enabledAddons.has("images")                       ? page.images * IMAGE_UNIT_PRICE   : 0)
                      + (enabledAddons.has("animation") && page.animation  ? ANIMATION_PAGE_PRICE             : 0)
                      + (enabledAddons.has("video")                        ? page.videos * VIDEO_UNIT_PRICE   : 0);
                    const pageBuildCost = getPageBuildHours(page.name, isSub) * HOURLY_RATE;
                    const rowTotal = addonCost + pageBuildCost;
                    return (
                      <motion.div key={page.id}
                        initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0, x:20 }} transition={{ duration:0.2, delay:i*0.03 }}
                        className="grid items-center border-b"
                        style={{
                          gridTemplateColumns: gridTemplate,
                          columnGap: "16px",
                          borderColor: isSub ? `rgba(${ACCENT_RGB},0.08)` : "rgba(255,255,255,0.04)",
                          backgroundColor: isSub ? `rgba(${ACCENT_RGB},0.03)` : isLanding ? `rgba(${ACCENT_RGB},0.04)` : i % 2 === 0 ? "transparent" : `rgba(${ACCENT_RGB},0.015)`,
                          paddingLeft: isSub ? "48px" : "20px",
                          paddingRight: "20px", paddingTop: "14px", paddingBottom: "14px",
                        }}>
                        <div className="flex items-center gap-2">
                          {isSub && <CornerDownRight size={12} style={{ color:`rgba(${ACCENT_RGB},0.4)`, flexShrink:0 }} />}
                          {!isSub && !isLanding && (
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:`rgba(${ACCENT_RGB},0.4)`, minWidth:"18px" }}>
                              {String(topLevel.indexOf(page) + 1).padStart(2,"0")}
                            </span>
                          )}
                          {isLanding && (
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.18em",
                              color:"rgba(255,255,255,0.35)", border:"1px solid rgba(255,255,255,0.12)",
                              padding:"2px 6px", whiteSpace:"nowrap" as const, flexShrink:0 }}>LOCKED</span>
                          )}
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:isSub?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.9)" }}>{page.name}</span>
                              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"0.1em", color:`rgba(${ACCENT_RGB},0.45)`, whiteSpace:"nowrap" as const }}>
                                {(() => { const h = getPageBuildHours(page.name,isSub); return Number.isInteger(h)?h:h.toFixed(1); })()}h
                              </span>
                            </div>
                            {isSub && parentPage && (
                              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:"0.1em", color:`rgba(${ACCENT_RGB},0.4)` }}>
                                /{parentPage.name.toLowerCase().replace(/\s+/g,"-")}
                              </span>
                            )}
                          </div>
                        </div>
                        {enabledAddons.has("seo")       && <div className="flex justify-center"><AddonToggle active={page.seo} label="SEO" sublabel={SEO_PRICE} Icon={Search} onClick={() => toggleAddon(page.id,"seo")} /></div>}
                        {enabledAddons.has("content")   && <div className="flex justify-center"><AddonToggle active={page.content} label="Content" sublabel={CONTENT_PRICE} Icon={FileText} onClick={() => toggleAddon(page.id,"content")} /></div>}
                        {enabledAddons.has("images")    && <div className="flex justify-center"><ImageStepper qty={page.images} price={IMAGES_PRICE} onChange={(q) => setImages(page.id,q)} /></div>}
                        {enabledAddons.has("animation") && <div className="flex justify-center"><AddonToggle active={page.animation} label="Anim." sublabel={ANIMATION_PRICE} Icon={Sparkles} onClick={() => toggleAddon(page.id,"animation")} /></div>}
                        {enabledAddons.has("video")     && <div className="flex justify-center"><VideoStepper qty={page.videos} price={VIDEO_PRICE} onChange={(q) => setVideos(page.id,q)} /></div>}
                        <div className="flex items-center justify-center" style={{ borderLeft:`2px solid rgba(${ACCENT_RGB},0.3)`, paddingLeft:"4px" }}>
                          {addonCost > 0 ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:`rgba(${ACCENT_RGB},0.9)` }}>{fmt(addonCost)}</span>
                            : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.15)" }}>—</span>}
                        </div>
                        <div className="flex items-center justify-center">
                          {pageBuildCost > 0 ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:"rgba(255,255,255,0.6)" }}>{fmt(pageBuildCost)}</span>
                            : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"14px", color:"rgba(255,255,255,0.15)" }}>—</span>}
                        </div>
                        <div className="flex items-center justify-center">
                          {rowTotal > 0 ? <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:ACCENT, fontWeight:600 }}>{fmt(rowTotal)}</span>
                            : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"13px", color:"rgba(255,255,255,0.15)" }}>—</span>}
                        </div>
                        {isLanding ? <span /> : <DeletePageBtn onClick={() => removePage(page.id)} />}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <FooterBar />
              </div>

            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Sort by Standard Practices button — only for multi-page builds */}
      {!isLanding && pages.length > 1 && (
        <SortStandardBtn onClick={sortByStandardPractices} />
      )}
    </div>
  );
}

function SortStandardBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [sorted, setSorted] = useState(false);

  const handleClick = () => {
    onClick();
    setSorted(true);
    setTimeout(() => setSorted(false), 2200);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2.5 mt-4 px-4 py-2.5 border transition-all duration-200"
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "10px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        borderColor:     sorted ? `rgba(${ACCENT_RGB},0.6)` : hov ? `rgba(${ACCENT_RGB},0.4)` : `rgba(${ACCENT_RGB},0.18)`,
        color:           sorted ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.85)` : `rgba(${ACCENT_RGB},0.45)`,
        backgroundColor: sorted ? `rgba(${ACCENT_RGB},0.08)` : hov ? `rgba(${ACCENT_RGB},0.04)` : "transparent",
      }}
    >
      <ArrowUpDown
        size={11}
        style={{
          transition: "color 0.2s ease",
          color: sorted ? ACCENT : hov ? `rgba(${ACCENT_RGB},0.85)` : `rgba(${ACCENT_RGB},0.4)`,
        }}
      />
      {sorted ? "Pages reordered" : "Sort by standard practices"}
    </motion.button>
  );
}

function DeletePageBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-center w-7 h-7 transition-all duration-150"
      style={{
        color: hov ? "rgba(220,80,80,0.8)" : "rgba(255,255,255,0.22)",
        backgroundColor: hov ? "rgba(220,80,80,0.08)" : "transparent",
      }}
    >
      <X size={14} />
    </button>
  );
}

function BreakdownToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3 mb-8 px-5 py-2.5 border transition-all duration-200"
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "11px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        borderColor: open
          ? ACCENT
          : hov
          ? `rgba(${ACCENT_RGB},0.7)`
          : `rgba(${ACCENT_RGB},0.35)`,
        color: open
          ? ACCENT
          : hov
          ? ACCENT
          : `rgba(${ACCENT_RGB},0.6)`,
        backgroundColor: open
          ? `rgba(${ACCENT_RGB},0.08)`
          : hov
          ? `rgba(${ACCENT_RGB},0.06)`
          : "transparent",
        boxShadow: open
          ? `0 0 18px rgba(${ACCENT_RGB},0.18), inset 0 0 12px rgba(${ACCENT_RGB},0.06)`
          : hov
          ? `0 0 12px rgba(${ACCENT_RGB},0.12)`
          : "none",
      }}
    >
      {open ? "Hide" : "Show"} Full Breakdown
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <ChevronDown size={13} />
      </motion.div>
    </button>
  );
}

function SubmitButton({ accent, accentRgb }: { accent:string; accentRgb:string }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3 px-10 py-5 border tracking-[0.25em] uppercase transition-all duration-300"
      style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px",
        borderColor:accent, color:hov?"#0a0a0a":accent,
        backgroundColor:hov?accent:"transparent",
        boxShadow:hov?`0 0 24px rgba(${accentRgb},0.4)`:"none" }}>
      Submit Brief
      <ArrowRight size={16} />
    </button>
  );
}
