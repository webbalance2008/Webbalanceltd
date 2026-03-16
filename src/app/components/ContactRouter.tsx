import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  ArrowLeft,
  Send,
  Mail,
  LifeBuoy,
  Rocket,
  Layout,
  Code2,
  TrendingUp,
  Server,
  Palette,
  Check,
  MessageCircle,
  Loader2,
  HelpCircle,
  Handshake,
  Briefcase,
  PenLine,
} from "lucide-react";
import { sendEmail } from "../utils/sendEmail";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Mode = "choose" | "project" | "enquiry" | "support" | "whatsapp";

// ─── Department data ──────────────────────────────────────────────────────────
const departments = [
  {
    key: "web-design",
    label: "Web Design",
    description: "Websites that convert visitors into customers",
    color: "#5ec4d4",
    bg: "rgba(94,196,212,0.08)",
    border: "rgba(94,196,212,0.25)",
    icon: Layout,
    href: "/web-design/start",
  },
  {
    key: "web-apps",
    label: "Web Apps",
    description: "Bespoke applications & custom platforms",
    color: "#b89fd4",
    bg: "rgba(184,159,212,0.08)",
    border: "rgba(184,159,212,0.25)",
    icon: Code2,
    href: "/web-apps/start",
  },
  {
    key: "seo",
    label: "SEO",
    description: "Dominate search & drive organic growth",
    color: "#3dd68c",
    bg: "rgba(61,214,140,0.08)",
    border: "rgba(61,214,140,0.25)",
    icon: TrendingUp,
    href: "/seo/start",
  },
  {
    key: "hosting",
    label: "Hosting",
    description: "Fast, secure, fully managed hosting",
    color: "#f59e6a",
    bg: "rgba(245,158,106,0.08)",
    border: "rgba(245,158,106,0.25)",
    icon: Server,
    href: "/hosting/start",
  },
  {
    key: "branding",
    label: "Branding",
    description: "Identity design that makes you unforgettable",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.25)",
    icon: Palette,
    href: "/branding/start",
  },
];

// ─── Shared label style ────────────────────────────────────────────────────────
// Cyan dash + cyan text, matching the "GET IN TOUCH" site pattern
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
    >
      <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
      {children}
    </p>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function ContactRouter() {
  const [mode, setMode] = useState<Mode>("choose");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const goBack = () => {
    setMode("choose");
    setSent(false);
  };

  const handleModeChange = (m: Mode) => {
    setMode(m);
    trackEvent("contact_open", { mode: m });
  };

  return (
    <div className="w-full relative z-10">

      {/* ── CHOOSE ───────────────────────────────────────────────────────────── */}
      {mode === "choose" && (
        <div className="space-y-3">
          <p
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-5 flex items-center gap-3"
          >
            <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
            How can we help?
          </p>
          {[
            {
              mode: "project" as Mode,
              Icon: Rocket,
              label: "Start a Project",
              description: "Pick a service and kick off your tailored project wizard",
            },
            {
              mode: "enquiry" as Mode,
              Icon: Mail,
              label: "General Enquiry",
              description: "Have a question or want to explore what's possible?",
            },
            {
              mode: "whatsapp" as Mode,
              Icon: MessageCircle,
              label: "WhatsApp Business",
              description: "Quick replies — message us directly",
            },
            {
              mode: "support" as Mode,
              Icon: LifeBuoy,
              label: "Support",
              description: "Existing client? Get dedicated help from our team",
            },
          ].map(({ mode: m, Icon, label, description }) => (
            <ChoiceRow
              key={m}
              Icon={Icon}
              label={label}
              description={description}
              onClick={() => handleModeChange(m)}
              accent={m === "whatsapp" ? "#25D366" : undefined}
            />
          ))}
        </div>
      )}

      {/* ── START A PROJECT ──────────────────────────────────────────────────── */}
      {mode === "project" && (
        <div>
          <InlineHeader onBack={goBack} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {departments.map((dept) => (
              <DeptCard key={dept.key} dept={dept} onClick={() => navigate(dept.href)} />
            ))}
          </div>
        </div>
      )}

      {/* ── GENERAL ENQUIRY ──────────────────────────────────────────────────── */}
      {mode === "enquiry" && (
        <div>
          <InlineHeader onBack={goBack} />
          {sent ? (
            <SuccessState
              title="Message Received"
              subtitle="We'll be in touch within 24 hours."
            />
          ) : (
            <EnquiryForm onSubmit={() => { setSent(true); trackEvent("form_submit", { formType: "enquiry" }); }} />
          )}
        </div>
      )}

      {/* ── WHATSAPP ─────────────────────────────────────────────────────────── */}
      {mode === "whatsapp" && (
        <div>
          <InlineHeader onBack={goBack} />
          <WhatsAppPanel />
        </div>
      )}

      {/* ── SUPPORT ──────────────────────────────────────────────────────────── */}
      {mode === "support" && (
        <div>
          <InlineHeader onBack={goBack} />
          {sent ? (
            <SuccessState
              title="Support Request Received"
              subtitle="Our team will reach out within 4 business hours."
            />
          ) : (
            <SupportPanel
              onSubmit={() => { setSent(true); trackEvent("form_submit", { formType: "support" }); }}
              onNavigate={() => navigate("/support")}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Choice row ────────────────────────────────────────────────────────────────
function ChoiceRow({
  Icon,
  label,
  description,
  onClick,
  accent,
}: {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  description: string;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full group flex items-center gap-5 p-5 text-left transition-all duration-300"
      style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.12)", background: "transparent" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,232,0.35)";
        e.currentTarget.style.background = "rgba(0,212,232,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Left accent bar */}
      <div
        className="w-0.5 self-stretch flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accent || "#00d4e8" }}
      />
      {/* Icon box */}
      <div
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
        style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.18)", color: "#00d4e8" }}
      >
        <Icon size={18} />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-sm font-light mb-0.5">
          {label}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/60 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {/* Arrow */}
      <ArrowUpRight
        size={16}
        className="flex-shrink-0 text-[#00d4e8] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </button>
  );
}

// ─── Back button ───────────────────────────────────────────────────────────────
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-white hover:text-[#00d4e8] transition-colors group mt-1 mb-5"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
      <span className="text-[10px] tracking-[0.2em] uppercase">Back</span>
    </button>
  );
}

// ─── Inline header (label + back on one line) ─────────────────────────────────
function InlineHeader({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center justify-between mb-5 mt-1">
      <p
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase flex items-center gap-3"
      >
        <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
        How can we help?
      </p>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-[#00d4e8] transition-colors group"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
        <span className="text-[10px] tracking-[0.2em] uppercase">Back</span>
      </button>
    </div>
  );
}

// ─── Success state ─────────────────────────────────────────────────────────────
function SuccessState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 border border-[#00d4e8] flex items-center justify-center mb-6">
        <Check size={20} className="text-[#00d4e8]" />
      </div>
      <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl mb-2 font-light">
        {title}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/50 text-sm">
        {subtitle}
      </p>
    </div>
  );
}

// ─── Enquiry type data ─────────────────────────────────────────────────────────
type EnquiryType = "project-idea" | "general-question" | "partnership" | "feedback";

const enquiryTypes: { id: EnquiryType; Icon: typeof Briefcase; label: string; description: string }[] = [
  { id: "project-idea",     Icon: Briefcase,  label: "I have a project in mind",     description: "Tell us about your idea — we'll advise on scope & budget" },
  { id: "general-question", Icon: HelpCircle,  label: "Just a question",              description: "Ask us anything — no commitment required" },
  { id: "partnership",      Icon: Handshake,   label: "Partnership or collaboration", description: "Agencies, freelancers, or referral enquiries" },
  { id: "feedback",         Icon: PenLine,     label: "Feedback or something else",   description: "Anything that doesn't fit the categories above" },
];

const serviceInterests = [
  { id: "web-design", label: "Web Design",     color: "#5ec4d4" },
  { id: "web-apps",   label: "Web Apps",       color: "#b89fd4" },
  { id: "seo",        label: "SEO",            color: "#3dd68c" },
  { id: "hosting",    label: "Hosting",        color: "#f59e6a" },
  { id: "branding",   label: "Branding",       color: "#f472b6" },
];

// ─── Enquiry form ──────────────────────────────────────────────────────────────
export function EnquiryForm({ onSubmit, onTypeChange }: { onSubmit: () => void; onTypeChange?: (hasType: boolean) => void }) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const budgets = ["< £3k", "£3k – £8k", "£8k – £20k", "£20k+"];

  const toggleService = (id: string) =>
    setServices(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const showBudget   = enquiryType === "project-idea";
  const showServices = enquiryType === "project-idea";
  const showCompany  = enquiryType === "partnership";

  const hasSelection = enquiryType !== "";

  const messagePlaceholders: Record<string, string> = {
    "project-idea":     "Tell us about your project idea — what are you building and who is it for?",
    "general-question": "What would you like to know?",
    "partnership":      "Tell us about your company and the collaboration you have in mind...",
    "feedback":         "We'd love to hear from you — what's on your mind?",
  };

  const handleTypeChange = (type: EnquiryType | "") => {
    setEnquiryType(type);
    onTypeChange?.(type !== "");
  };

  const selectedType = enquiryTypes.find(t => t.id === enquiryType);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const result = await sendEmail("enquiry", {
      name, email, message,
      budget: showBudget ? budget : "",
      enquiryType,
      services: showServices ? services.join(", ") : "",
      company: showCompany ? company : "",
    });
    setSending(false);
    if (result.success) {
      onSubmit();
    } else {
      setError(result.error || "Failed to send — please try again.");
    }
  };

  return (
    <form onSubmit={handle} className="space-y-8">
      {/* Enquiry type selector */}
      <div>
        {!hasSelection && <SectionLabel>What's this about?</SectionLabel>}

        {/* Full grid — only when nothing is selected */}
        {!hasSelection && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {enquiryTypes.map(({ id, Icon, label, description }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTypeChange(id)}
                className="relative flex items-start gap-3 p-4 text-left transition-all duration-200"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,212,232,0.35)";
                  e.currentTarget.style.background = "rgba(0,212,232,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center mt-0.5"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.75)" }}
                    className="text-sm font-light mb-0.5"
                  >
                    {label}
                  </p>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "11px", lineHeight: 1.5 }}
                  >
                    {description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Compact selected pill — once a choice is made */}
        {hasSelection && selectedType && (
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#00d4e8",
                background: "rgba(0,212,232,0.08)",
              }}
            >
              <selectedType.Icon size={15} style={{ color: "#00d4e8" }} />
              <span
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-base font-light"
              >
                {selectedType.label}
              </span>
              <Check size={13} style={{ color: "#00d4e8" }} />
            </div>
            <button
              type="button"
              onClick={() => handleTypeChange("")}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="flex items-center gap-2.5 px-5 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-200 border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
            >
              <ArrowLeft size={13} />
              Back
            </button>
          </div>
        )}
      </div>

      {/* Fields — only show once a type is selected */}
      {enquiryType && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name" placeholder="Your name" value={name} onChange={setName} required />
            <Field label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />
          </div>

          {/* Company — only for partnership */}
          {showCompany && (
            <Field label="Company / Agency" placeholder="Your company name" value={company} onChange={setCompany} />
          )}

          {/* Services interested in — only for project idea */}
          {showServices && (
            <div>
              <SectionLabel>Services you're interested in</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {serviceInterests.map((svc) => {
                  const active = services.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className="px-5 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-200"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: active ? svc.color : "rgba(255,255,255,0.2)",
                        color: active ? svc.color : "rgba(255,255,255,0.6)",
                        background: active ? `${svc.color}18` : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.borderColor = `${svc.color}80`;
                          e.currentTarget.style.color = svc.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        }
                      }}
                    >
                      {svc.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Budget chips — only for project idea */}
          {showBudget && (
            <div>
              <SectionLabel>Approximate budget</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(budget === b ? "" : b)}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: budget === b ? "#00d4e8" : "rgba(255,255,255,0.25)",
                      color: budget === b ? "#00d4e8" : "rgba(255,255,255,0.75)",
                      background: budget === b ? "rgba(0,212,232,0.1)" : "transparent",
                    }}
                    className="py-3 text-sm tracking-widest uppercase transition-all duration-200"
                    onMouseEnter={(e) => {
                      if (budget !== b) {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (budget !== b) {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                      }
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/25 text-sm mt-2.5">
                Optional — helps us tailor our response.
              </p>
            </div>
          )}

          {/* Message */}
          <div>
            <SectionLabel>Message</SectionLabel>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messagePlaceholders[enquiryType] || "Tell us more..."}
              style={{
                fontFamily: "'Inter', sans-serif",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,0.2)",
              }}
              className="w-full bg-transparent text-white placeholder-white/40 text-base px-5 py-3.5 outline-none resize-none transition-colors focus:border-[#00d4e8]"
            />
          </div>

          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-between px-7 py-5 bg-[#00d4e8] hover:bg-[#33e8fa] transition-colors group disabled:opacity-60"
          >
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#16212e] text-sm tracking-[0.2em] uppercase font-medium">
              {sending ? "Sending..." : "Send Enquiry"}
            </span>
            {sending ? (
              <Loader2 size={14} className="text-[#16212e] animate-spin" />
            ) : (
              <Send size={14} className="text-[#16212e] group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        </>
      )}
    </form>
  );
}

// ─── Support panel ────────────────────────────────────────────────────────────
function SupportPanel({ onSubmit, onNavigate }: { onSubmit: () => void; onNavigate: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const result = await sendEmail("support", { name, email, issue });
    setSending(false);
    if (result.success) {
      onSubmit();
    } else {
      setError(result.error || "Failed to send — please try again.");
    }
  };

  return (
    <div className="mt-2 space-y-5">
      {/* Support centre CTA */}
      <button
        type="button"
        onClick={onNavigate}
        className="w-full flex items-center justify-between p-4 transition-all duration-300 group text-left"
        style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(0,212,232,0.3)", background: "rgba(0,212,232,0.07)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,212,232,0.14)"; e.currentTarget.style.borderColor = "rgba(0,212,232,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,212,232,0.07)"; e.currentTarget.style.borderColor = "rgba(0,212,232,0.3)"; }}
      >
        <div>
          <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-sm mb-0.5">
            Visit our full Support Centre
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/60 text-sm">
            FAQs, guides, and dedicated account support
          </p>
        </div>
        <ArrowUpRight size={16} className="text-[#00d4e8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-4" />
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
          or raise a ticket
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form onSubmit={handle} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name" placeholder="Your name" value={name} onChange={setName} required />
          <Field label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />
        </div>
        <div>
          <SectionLabel>Describe the issue</SectionLabel>
          <textarea
            required
            rows={4}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="What do you need help with?"
            style={{
              fontFamily: "'Inter', sans-serif",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(255,255,255,0.2)",
            }}
            className="w-full bg-transparent text-white placeholder-white/40 text-sm px-4 py-3 outline-none resize-none transition-colors focus:border-[#00d4e8]"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full flex items-center justify-between px-6 py-4 transition-all duration-300 group disabled:opacity-60"
          style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#00d4e8", color: "#00d4e8" }}
          onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.background = "#00d4e8"; e.currentTarget.style.color = "#16212e"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00d4e8"; }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-sm tracking-[0.2em] uppercase font-medium">
            {sending ? "Sending..." : "Submit Support Request"}
          </span>
          {sending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <LifeBuoy size={14} className="group-hover:rotate-12 transition-transform" />
          )}
        </button>
        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}

// ─── Reusable field ────────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          fontFamily: "'Inter', sans-serif",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(255,255,255,0.2)",
        }}
        className="w-full bg-transparent text-white placeholder-white/40 text-base px-5 py-3.5 outline-none transition-colors focus:border-[#00d4e8]"
      />
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── WhatsApp panel ────────────────────────────────────────────────────────────
function WhatsAppPanel() {
  return (
    <div
      className="flex flex-col p-8 mt-2"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(37,211,102,0.35)",
        background: "rgba(37,211,102,0.05)",
      }}
    >
      {/* Icon box */}
      <div
        className="w-12 h-12 flex items-center justify-center mb-6"
        style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(37,211,102,0.5)" }}
      >
        <MessageCircle size={20} className="text-[#25D366]" />
      </div>

      {/* Label */}
      <p
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="text-[#25D366]/60 text-[10px] tracking-[0.3em] uppercase mb-4"
      >
        WhatsApp Business
      </p>

      {/* Heading */}
      <p
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        className="text-white text-xl font-light leading-snug mb-2"
      >
        Quick replies —<br />message us directly
      </p>

      {/* Hours */}
      <p
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="text-white/40 text-sm mb-10"
      >
        Mon–Fri, 8:30am – 5:30pm
      </p>

      {/* CTA */}
      <a
        href="https://wa.me/441224452095"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 px-6 py-4 transition-colors duration-200 group"
        style={{ background: "#25D366" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
      >
        <MessageCircle size={15} className="text-[#0f1a10]" />
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[#0f1a10] text-[11px] tracking-[0.25em] uppercase"
        >
          Message
        </span>
      </a>
    </div>
  );
}

// ─── Department card ──────────────────────────────────────────────────────────
function DeptCard({ dept, onClick }: { dept: typeof departments[number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const Icon = dept.icon;
  const accentColor = hovered ? "#ffffff" : dept.color;
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-start gap-3 p-5 text-left overflow-hidden"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: hovered ? hexAlpha(dept.color, 0.6) : dept.border,
        background: hovered ? hexAlpha(dept.color, 0.15) : dept.bg,
        transition: "background 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ color: accentColor, transition: "color 0.3s" }}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p
          style={{ fontFamily: "'Montserrat', sans-serif", color: accentColor, transition: "color 0.3s" }}
          className="text-sm font-light mb-1"
        >
          {dept.label}
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-white/60 text-sm leading-relaxed"
        >
          {dept.description}
        </p>
      </div>
      <ArrowUpRight
        size={13}
        className="absolute bottom-4 right-4 transition-opacity duration-200"
        style={{ color: dept.color, opacity: hovered ? 1 : 0 }}
      />
    </button>
  );
}