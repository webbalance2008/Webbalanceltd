import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { EditableText } from "./admin/EditableText";
import { sendEmail } from "../utils/sendEmail";
import { useIsMobile } from "../hooks/useIsMobile";
import {
  Rocket,
  MessageSquare,
  ArrowUpRight,
  ArrowLeft,
  Send,
  Check,
  Layout,
  Code2,
  TrendingUp,
  Server,
  Palette,
  X,
  ChevronRight,
  FileText,
  BadgePoundSterling,
  CreditCard,
  MessagesSquare,
  UserCheck,
  Zap,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Panel = "project" | "enquiry" | "packages" | null;
type MobileExpanded = string | null;

// ─── Department data ─────────────────────────────────────────────────────────
const departments = [
  { key: "web-design", label: "Web Design",  description: "Websites that convert visitors into customers", color: "#00d4e8", bg: "rgba(0,212,232,0.07)", border: "rgba(0,212,232,0.22)", icon: Layout,    href: "/web-design/start" },
  { key: "web-apps",   label: "Web Apps",    description: "Bespoke applications & custom platforms",       color: "#b89fd4", bg: "rgba(184,159,212,0.07)", border: "rgba(184,159,212,0.22)", icon: Code2,     href: "/web-apps/start" },
  { key: "seo",        label: "SEO",         description: "Dominate search & drive organic growth",        color: "#3dd68c", bg: "rgba(61,214,140,0.07)", border: "rgba(61,214,140,0.22)", icon: TrendingUp, href: "/seo/start" },
  { key: "hosting",    label: "Hosting",     description: "Fast, secure, fully managed hosting",           color: "#f59e6a", bg: "rgba(245,158,106,0.07)", border: "rgba(245,158,106,0.22)", icon: Server,    href: "/hosting/start" },
  { key: "branding",   label: "Branding",    description: "Identity design that makes you unforgettable", color: "#f472b6", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.22)", icon: Palette,   href: "/branding/start" },
];

// ─── Card meta ───────────────────────────────────────────────────────────────
const CARDS: {
  id: Panel & string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  label: string;
  description: string;
  bullets: { Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; text: string }[];
  cta: string;
  iconBg: string;
  iconBgHover: string;
  accentColor: string;
  accentRgb: string;
}[] = [
  {
    id: "project",
    Icon: Rocket,
    label: "Build Your Quote",
    description: "Walk through a tailored brief and we'll scope your project precisely.",
    bullets: [
      { Icon: FileText,            text: "Build a brief" },
      { Icon: BadgePoundSterling,  text: "Get a quote" },
      { Icon: CreditCard,          text: "Review payment options" },
    ],
    cta: "Choose a Service",
    iconBg: "linear-gradient(135deg, #1e1040 0%, #2a1a4e 100%)",
    iconBgHover: "linear-gradient(135deg, #3b1278 0%, #8b5cf6 100%)",
    accentColor: "#8b5cf6",
    accentRgb: "139, 92, 246",
  },
  {
    id: "packages",
    Icon: Package,
    label: "Packages",
    description: "Mix and match services from every service area — get instant pricing.",
    bullets: [
      { Icon: Layers,   text: "Choose from 5 services" },
      { Icon: Sparkles, text: "Mix & match freely" },
      { Icon: BadgePoundSterling, text: "See your total instantly" },
    ],
    cta: "Browse Packages",
    iconBg: "linear-gradient(135deg, #0a2820 0%, #102e24 100%)",
    iconBgHover: "linear-gradient(135deg, #0b4d35 0%, #3dd68c 100%)",
    accentColor: "#3dd68c",
    accentRgb: "61, 214, 140",
  },
  {
    id: "enquiry",
    Icon: MessageSquare,
    label: "Talk to Us",
    description: "Have a question or want to explore what's possible before committing?",
    bullets: [
      { Icon: MessagesSquare, text: "No obligation conversation" },
      { Icon: UserCheck,      text: "Discuss your requirements" },
      { Icon: Zap,            text: "Arrange a F2F Meeting" },
    ],
    cta: "Send a Message",
    iconBg: "linear-gradient(135deg, #0a2535 0%, #0f3545 100%)",
    iconBgHover: "linear-gradient(135deg, #0a5a68 0%, #00d4e8 100%)",
    accentColor: "#00d4e8",
    accentRgb: "0, 212, 232",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function HowCanWeHelp() {
  const contentBlocks = useContentBlocks("/");
  const [active, setActive] = useState<Panel>(null);
  const [sent, setSent] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<MobileExpanded>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const toggle = (id: Panel) => {
    // "Packages" navigates directly to the packages page
    if (id === "packages") {
      navigate("/packages");
      return;
    }
    if (active === id) {
      setActive(null);
      setSent(false);
    } else {
      setActive(id);
      setSent(false);
    }
  };

  const toggleMobile = (id: string) => {
    if (id === "packages") {
      navigate("/packages");
      return;
    }
    setMobileExpanded(mobileExpanded === id ? null : id);
  };

  const handleCardClick = (card: typeof CARDS[number]) => {
    // Check if we're on mobile
    if (isMobile) {
      toggleMobile(card.id);
    } else {
      toggle(card.id);
    }
  };

  const close = () => {
    setActive(null);
    setSent(false);
  };

  return (
    <section
      className="relative w-full md:min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "#1d2d3e" }}
    >
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(22,33,46,0.55) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-14 py-12 md:py-24">

        {/* ── Departments strip ──────────────────────────────────────── */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 16 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p
            className="flex items-center gap-3 mb-5"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "1.25rem", height: "1px", backgroundColor: "rgba(255,255,255,0.2)", flexShrink: 0, display: "inline-block" }} />
            Our Services
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.a
                  key={dept.key}
                  href={`/${dept.key}`}
                  initial={isMobile ? false : { opacity: 0, y: 10 }}
                  whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="group flex items-center gap-2.5 px-5 py-3 border transition-all duration-500 cursor-pointer"
                  style={{
                    borderColor: `${dept.color}55`,
                    background: `${dept.color}14`,
                    borderRadius: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${dept.color}88`;
                    (e.currentTarget as HTMLElement).style.background = `${dept.color}28`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${dept.color}55`;
                    (e.currentTarget as HTMLElement).style.background = `${dept.color}14`;
                  }}
                >
                  <Icon size={16} strokeWidth={1.5} style={{ color: dept.color, flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.92)",
                      letterSpacing: "0.01em",
                      transition: "color 0.5s",
                    }}
                    className="group-hover:text-white"
                  >
                    {dept.label}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Subtle divider */}
        <div
          className="mb-14"
          style={{ height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.06), rgba(255,255,255,0.03), transparent)" }}
        />

        {/* ── Section header ─────────────────────────────────────────── */}
        <div className="mb-14">
          <p
            className="flex items-center gap-3 mb-5"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#00d4e8",
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "1.25rem", height: "1px", backgroundColor: "#00d4e8", flexShrink: 0, display: "inline-block" }} />
            Get in Touch
          </p>

          <h2
            className="text-4xl md:text-5xl mb-5"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#ffffff",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            <EditableText blockId="howcanwehelp_h2" resolved={contentBlocks?.get("howcanwehelp_h2") ?? "How Can We Help?"} />
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "42rem",
            }}
          >
            <EditableText blockId="howcanwehelp_desc" resolved={contentBlocks?.get("howcanwehelp_desc") ?? "Whether you're ready to start a project, have a quick question, or need support — we're here. Pick the option that suits you best."} multiline />
          </p>
        </div>

        {/* ── 3-column cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card) => {
            const isActive = active === card.id;
            const isMobileOpen = mobileExpanded === card.id;
            const Icon = card.Icon;
            return (
              <div key={card.id}>
                <button
                  type="button"
                  onClick={() => handleCardClick(card)}
                  className="group relative flex flex-col text-left transition-all duration-300 w-full"
                  style={{
                    padding: "2.5rem",
                    minHeight: isMobileOpen ? undefined : undefined,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: isActive
                      ? `${card.accentColor}66`
                      : "rgba(255,255,255,0.08)",
                    background: isActive
                      ? `rgba(22,33,46,0.95)`
                      : "rgba(22,33,46,0.85)",
                    boxShadow: isActive
                      ? `0 0 0 1px ${card.accentColor}22, 0 20px 60px rgba(0,0,0,0.35)`
                      : "none",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = `${card.accentColor}44`;
                      e.currentTarget.style.background = "rgba(29,42,58,0.95)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(22,33,46,0.85)";
                    }
                  }}
                >
                  {/* Mobile: compact header row */}
                  <div className="flex md:hidden items-center gap-4 w-full">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: isActive ? card.iconBgHover : card.iconBg,
                        border: `1px solid rgba(${card.accentRgb}, ${isActive ? "0.5" : "0.25"})`,
                        boxShadow: `0 0 14px rgba(${card.accentRgb}, 0.12)`,
                      }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{ color: isActive ? "#ffffff" : card.accentColor }}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          color: "#ffffff",
                          fontSize: "1.25rem",
                          fontWeight: 300,
                          lineHeight: 1.2,
                        }}
                      >
                        {card.label}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.75rem",
                          lineHeight: 1.5,
                          marginTop: "0.25rem",
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: card.accentColor,
                        transform: isMobileOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronRight size={18} />
                    </div>
                  </div>

                  {/* Desktop: full card layout */}
                  <div className="hidden md:flex md:flex-col md:h-full w-full" style={{ minHeight: 320 }}>
                    {/* Icon box */}
                    <div
                      className="mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-105"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 16,
                        background: isActive ? card.iconBgHover : card.iconBg,
                        border: `1px solid rgba(${card.accentRgb}, ${isActive ? "0.5" : "0.25"})`,
                        boxShadow: `0 0 ${isActive ? "28px" : "18px"} rgba(${card.accentRgb}, ${isActive ? "0.25" : "0.12"})`,
                        flexShrink: 0,
                        transition: "all 0.4s ease",
                      }}
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        style={{ color: isActive ? "#ffffff" : card.accentColor, transition: "color 0.4s ease" }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#ffffff",
                        fontSize: "1.6rem",
                        fontWeight: 300,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                      className="mb-3"
                    >
                      {card.label}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                      }}
                      className="mb-6"
                    >
                      {card.description}
                    </p>

                    {/* ── Bullet points ── */}
                    <ul className="flex flex-col gap-3 flex-1">
                      {card.bullets.map((bullet, i) => {
                        const BulletIcon = bullet.Icon;
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: `rgba(${card.accentRgb}, 0.12)`,
                                border: `1px solid rgba(${card.accentRgb}, 0.3)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <BulletIcon
                                size={13}
                                strokeWidth={1.5}
                                style={{ color: card.accentColor } as React.CSSProperties}
                              />
                            </div>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                color: "#ffffff",
                                fontSize: "0.8125rem",
                              }}
                            >
                              {bullet.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* ── CTA pill ── */}
                    <div className="mt-8">
                      <div
                        style={{
                          height: 1,
                          background: `rgba(${card.accentRgb}, 0.25)`,
                          marginBottom: "1.25rem",
                        }}
                      />
                      <div
                        className="flex items-center justify-between"
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: isActive
                            ? `rgba(${card.accentRgb}, 0.55)`
                            : `rgba(${card.accentRgb}, 0.3)`,
                          background: isActive
                            ? `rgba(${card.accentRgb}, 0.14)`
                            : `rgba(${card.accentRgb}, 0.07)`,
                          padding: "0.65rem 1rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            color: card.accentColor,
                            fontSize: "0.625rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                          }}
                        >
                          {isActive ? "Collapse" : card.cta}
                        </span>
                        <div style={{ color: card.accentColor }}>
                          {isActive ? <X size={13} /> : <ChevronRight size={13} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Mobile: collapsible content */}
                <AnimatePresence>
                  {isMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden md:hidden"
                      style={{
                        borderWidth: "0 1px 1px 1px",
                        borderStyle: "solid",
                        borderColor: `rgba(${card.accentRgb}, 0.2)`,
                        background: "rgba(22,33,46,0.9)",
                      }}
                    >
                      <div className="px-6 py-5">
                        {/* Bullets */}
                        <ul className="flex flex-col gap-3 mb-5">
                          {card.bullets.map((bullet, i) => {
                            const BulletIcon = bullet.Icon;
                            return (
                              <li key={i} className="flex items-center gap-3">
                                <div
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 7,
                                    background: `rgba(${card.accentRgb}, 0.12)`,
                                    border: `1px solid rgba(${card.accentRgb}, 0.3)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <BulletIcon size={12} strokeWidth={1.5} style={{ color: card.accentColor } as React.CSSProperties} />
                                </div>
                                <span style={{ fontFamily: "'Inter', sans-serif", color: "#ffffff", fontSize: "0.8125rem" }}>
                                  {bullet.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                        {/* CTA */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(card.id);
                          }}
                          className="flex items-center justify-between w-full"
                          style={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: `rgba(${card.accentRgb}, 0.35)`,
                            background: `rgba(${card.accentRgb}, 0.1)`,
                            padding: "0.6rem 1rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              color: card.accentColor,
                              fontSize: "0.6rem",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                            }}
                          >
                            {card.cta}
                          </span>
                          <ChevronRight size={12} style={{ color: card.accentColor }} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Expanding panel ─────────────────────────────────────────── */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                style={{
                  marginTop: "2rem",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(0,212,232,0.2)",
                  background: "rgba(22,33,46,0.5)",
                  padding: "2.5rem",
                }}
              >
                {/* Panel header row */}
                <div className="flex items-center justify-between mb-8">
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: "#00d4e8",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                    }}
                    className="flex items-center gap-3"
                  >
                    <span style={{ width: "1rem", height: "1px", backgroundColor: "#00d4e8", display: "inline-block" }} />
                    {active === "project" ? "Choose a Service" : "Send a Message"}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="flex items-center gap-2 transition-colors"
                    style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4e8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                  >
                    <ArrowLeft size={10} />
                    Close
                  </button>
                </div>

                {/* ── Project: department grid ──────────────────────── */}
                {active === "project" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {departments.map((dept) => {
                      const Icon = dept.icon;
                      return (
                        <button
                          key={dept.key}
                          type="button"
                          onClick={() => navigate(dept.href)}
                          className="group relative flex flex-col items-start gap-3 p-5 text-left transition-all duration-300"
                          style={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: dept.border,
                            background: dept.bg,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = dept.bg.replace("0.07", "0.14");
                            e.currentTarget.style.borderColor = dept.border.replace("0.22", "0.5");
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = dept.bg;
                            e.currentTarget.style.borderColor = dept.border;
                          }}
                        >
                          <div style={{ color: dept.color }}>
                            <Icon size={17} />
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Montserrat', sans-serif", color: dept.color, fontWeight: 300, fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                              {dept.label}
                            </p>
                            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", lineHeight: 1.5 }}>
                              {dept.description}
                            </p>
                          </div>
                          <ArrowUpRight
                            size={12}
                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ color: dept.color }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Enquiry form ──────────────────────────────────── */}
                {active === "enquiry" && (
                  sent
                    ? <SuccessState title="Message Received" subtitle="We'll be in touch within 24 hours." />
                    : <EnquiryForm onSubmit={() => setSent(true)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(22,33,46,0.4) 0%, transparent 100%)" }}
      />
    </section>
  );
}

// ─── Enquiry form ─────────────────────────────────────────────────────────────
function EnquiryForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const budgets = ["< £3k", "£3k – £8k", "£8k – £20k", "£20k+"];

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const result = await sendEmail("enquiry", { name, email, message, budget });
    setSending(false);
    if (result.success) {
      onSubmit();
    } else {
      setError(result.error || "Failed to send — please try again.");
    }
  };

  return (
    <form onSubmit={handle} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name" placeholder="Your name" value={name} onChange={setName} required />
        <Field label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />
      </div>

      <div>
        <MonoLabel>Budget Range</MonoLabel>
        <div className="flex flex-wrap gap-2 mt-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.625rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: budget === b ? "#00d4e8" : "rgba(255,255,255,0.2)",
                color: budget === b ? "#00d4e8" : "rgba(255,255,255,0.55)",
                background: budget === b ? "rgba(0,212,232,0.08)" : "transparent",
                padding: "0.5rem 1.25rem",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (budget !== b) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; } }}
              onMouseLeave={(e) => { if (budget !== b) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <MonoLabel>Message</MonoLabel>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project or question..."
          className="w-full bg-transparent text-white placeholder-white/30 text-sm px-4 py-3 outline-none resize-none transition-colors"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(255,255,255,0.18)",
            marginTop: "0.5rem",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,232,0.5)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
        />
      </div>

      {error && (
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#f87171", fontSize: "0.75rem" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="flex items-center justify-between px-7 py-4 bg-[#00d4e8] hover:bg-[#33e8fa] transition-colors group disabled:opacity-60"
        style={{ minWidth: 220 }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", color: "#16212e", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
          {sending ? "Sending..." : "Send Message"}
        </span>
        <Send size={13} className="text-[#16212e] ml-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 border border-[#00d4e8] flex items-center justify-center mb-5">
        <Check size={18} className="text-[#00d4e8]" />
      </div>
      <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "#fff", fontWeight: 300, fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        {title}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem" }}>
        {subtitle}
      </p>
    </div>
  );
}

// ─── Shared field ─────────────────────────────────────────────────────────────
function Field({
  label, type = "text", placeholder, value, onChange, required,
}: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <MonoLabel>{label}</MonoLabel>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-white placeholder-white/30 px-4 py-3 outline-none transition-colors"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8125rem",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(255,255,255,0.18)",
          marginTop: "0.5rem",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,232,0.5)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
      />
    </div>
  );
}

// ─── Mono label ───────────────────────────────────────────────────────────────
function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace",
      color: "rgba(0,212,232,0.7)",
      fontSize: "0.6rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
    }}>
      {children}
    </p>
  );
}