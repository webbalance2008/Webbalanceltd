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
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Mode = "choose" | "project" | "enquiry" | "support";

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
      className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
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

  const goBack = () => {
    setMode("choose");
    setSent(false);
  };

  return (
    <div className="w-full relative z-10">

      {/* ── CHOOSE ───────────────────────────────────────────────────────────── */}
      {mode === "choose" && (
        <div className="space-y-3">
          {[
            {
              mode: "project" as Mode,
              Icon: Rocket,
              label: "Start a Project",
              description: "Pick a department and kick off your tailored project wizard",
            },
            {
              mode: "enquiry" as Mode,
              Icon: Mail,
              label: "General Enquiry",
              description: "Have a question or want to explore what's possible?",
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
              onClick={() => setMode(m)}
            />
          ))}
        </div>
      )}

      {/* ── START A PROJECT ──────────────────────────────────────────────────── */}
      {mode === "project" && (
        <div>
          <BackBtn onClick={goBack} />
          <SectionLabel>Choose a Department</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.key}
                  type="button"
                  onClick={() => navigate(dept.href)}
                  className="group relative flex flex-col items-start gap-3 p-5 text-left transition-all duration-300 overflow-hidden"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: dept.border,
                    background: dept.bg,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = hexAlpha(dept.color, 0.15);
                    e.currentTarget.style.borderColor = hexAlpha(dept.color, 0.6);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = dept.bg;
                    e.currentTarget.style.borderColor = dept.border;
                  }}
                >
                  <div style={{ color: dept.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p
                      style={{ fontFamily: "'Montserrat', sans-serif", color: dept.color }}
                      className="text-sm font-light mb-1"
                    >
                      {dept.label}
                    </p>
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/60 text-xs leading-relaxed"
                    >
                      {dept.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: dept.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── GENERAL ENQUIRY ──────────────────────────────────────────────────── */}
      {mode === "enquiry" && (
        <div>
          <BackBtn onClick={goBack} />
          {sent ? (
            <SuccessState
              title="Message Received"
              subtitle="We'll be in touch within 24 hours."
            />
          ) : (
            <EnquiryForm onSubmit={() => setSent(true)} />
          )}
        </div>
      )}

      {/* ── SUPPORT ──────────────────────────────────────────────────────────── */}
      {mode === "support" && (
        <div>
          <BackBtn onClick={goBack} />
          {sent ? (
            <SuccessState
              title="Support Request Received"
              subtitle="Our team will reach out within 4 business hours."
            />
          ) : (
            <SupportPanel
              onSubmit={() => setSent(true)}
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
}: {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  description: string;
  onClick: () => void;
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
        style={{ backgroundColor: "#00d4e8" }}
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
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/60 text-xs leading-relaxed">
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

// ─── Enquiry form ──────────────────────────────────────────────────────────────
function EnquiryForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const budgets = ["< £3k", "£3k – £8k", "£8k – £20k", "£20k+"];

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handle} className="space-y-5 mt-2">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" placeholder="Your name" value={name} onChange={setName} required />
        <Field label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />
      </div>

      {/* Budget chips */}
      <div>
        <SectionLabel>Budget</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              style={{
                fontFamily: "'DM Mono', monospace",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: budget === b ? "#00d4e8" : "rgba(255,255,255,0.25)",
                color: budget === b ? "#00d4e8" : "rgba(255,255,255,0.75)",
                background: budget === b ? "rgba(0,212,232,0.1)" : "transparent",
              }}
              className="py-2.5 text-[10px] tracking-widest uppercase transition-all duration-200"
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
      </div>

      {/* Message */}
      <div>
        <SectionLabel>Message</SectionLabel>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project or question..."
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
        className="w-full flex items-center justify-between px-6 py-4 bg-[#00d4e8] hover:bg-[#33e8fa] transition-colors group"
      >
        <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#16212e] text-xs tracking-[0.2em] uppercase font-medium">
          Send Enquiry
        </span>
        <Send size={14} className="text-[#16212e] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}

// ─── Support panel ────────────────────────────────────────────────────────────
function SupportPanel({ onSubmit, onNavigate }: { onSubmit: () => void; onNavigate: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
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
          <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/60 text-xs">
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
          className="w-full flex items-center justify-between px-6 py-4 transition-all duration-300 group"
          style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#00d4e8", color: "#00d4e8" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#00d4e8"; e.currentTarget.style.color = "#16212e"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00d4e8"; }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-xs tracking-[0.2em] uppercase font-medium">
            Submit Support Request
          </span>
          <LifeBuoy size={14} className="group-hover:rotate-12 transition-transform" />
        </button>
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
        className="w-full bg-transparent text-white placeholder-white/40 text-sm px-4 py-3 outline-none transition-colors focus:border-[#00d4e8]"
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