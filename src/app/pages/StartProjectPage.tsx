import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useLocation } from "react-router";
import { getServiceFromPath, getServiceColors } from "../utils/serviceColors";
import { sendEmail } from "../utils/sendEmail";
import { DepartmentHero } from "../components/DepartmentHero";
import { SEOHead } from "../components/SEOHead";

const services = [
  "Web App Development",
  "Web Design",
  "SEO",
  "Hosting",
  "Branding & Marketing",
  "E-Commerce",
  "CMS Setup",
  "Ongoing Support",
];

const budgets = [
  "Under £1,000",
  "£1,000 – £3,000",
  "£3,000 – £7,500",
  "£7,500 – £15,000",
  "£15,000 – £30,000",
  "£30,000+",
];

const timelines = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible",
];

export function StartProjectPage() {
  const location = useLocation();
  const isWebApp = location.pathname.startsWith("/web-apps");

  const serviceKey = getServiceFromPath(location.pathname) ?? "web-design";
  const colors = getServiceColors(serviceKey);
  const accent = colors.primary;
  const accentRgb = colors.rgb;

  const [selectedServices, setSelectedServices] = useState<string[]>(
    isWebApp ? ["Web App Development"] : ["Web Design"]
  );
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Group hover states
  const [servicesHovered, setServicesHovered] = useState(false);
  const [budgetHovered, setBudgetHovered] = useState(false);
  const [timelineHovered, setTimelineHovered] = useState(false);
  const [briefHovered, setBriefHovered] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setSubmitted(true);
    await sendEmail("start-project", {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      website: formData.get("website") as string,
      services: selectedServices.join(", "),
      budget,
      timeline,
      brief: formData.get("brief") as string,
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#16212e",
      }}
    >
      <SEOHead
        title="Start Your Project"
        description="Tell us about your project and get a tailored proposal within 24 hours. Web design, web apps, SEO, branding, and hosting — all under one roof."
        path={location.pathname}
        keywords="start a project, web design brief, project enquiry, get a quote, UK web agency"
      />
      {/* Hero */}
      <DepartmentHero
        label={isWebApp ? "Web App Project" : serviceKey === "seo" ? "SEO Project" : serviceKey === "hosting" ? "Hosting Project" : serviceKey === "branding" ? "Branding Project" : "Web Design Project"}
        heading={
          <>
            Let's build something{" "}
            <span style={{ color: accent }}>extraordinary</span> together.
          </>
        }
        subtitle="Fill in the brief below and we'll be in touch within 24 hours with a tailored proposal. All enquiries are treated with complete confidentiality."
        accent={accent}
        patternId={`sp-${serviceKey}`}
      />

      {/* Form */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-8 md:px-16">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div
                className="w-16 h-16 border flex items-center justify-center mx-auto mb-8"
                style={{ borderColor: accent }}
              >
                <Check size={24} style={{ color: accent }} />
              </div>
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-4xl mb-4 font-light"
              >
                Brief received. Thank you.
              </h2>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/40 text-sm leading-relaxed"
              >
                We'll review your project and come back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
              className="space-y-12"
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Your Name" name="name" placeholder="Jane Smith" required accent={accent} accentRgb={accentRgb} />
                <FormField label="Email Address" name="email" type="email" placeholder="jane@company.com" required accent={accent} accentRgb={accentRgb} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Company / Brand" name="company" placeholder="Acme Ltd." accent={accent} accentRgb={accentRgb} />
                <FormField label="Website (if existing)" name="website" placeholder="https://yoursite.com" accent={accent} accentRgb={accentRgb} />
              </div>

              {/* Services */}
              <div
                onMouseEnter={() => setServicesHovered(true)}
                onMouseLeave={() => setServicesHovered(false)}
              >
                <label
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: servicesHovered ? "white" : accent,
                    transition: "color 0.2s",
                  }}
                  className="block text-[10px] tracking-[0.3em] uppercase mb-5"
                >
                  Services Required
                </label>
                <div className="flex flex-wrap gap-3">
                  {services.map((s) => {
                    const isSelected = selectedServices.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className="px-4 py-2.5 border text-sm tracking-[0.1em] uppercase transition-all duration-200"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          borderColor: isSelected
                            ? accent
                            : servicesHovered
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.1)",
                          backgroundColor: isSelected
                            ? `rgba(${accentRgb}, 0.1)`
                            : "transparent",
                          color: isSelected
                            ? accent
                            : servicesHovered
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div
                onMouseEnter={() => setBudgetHovered(true)}
                onMouseLeave={() => setBudgetHovered(false)}
              >
                <label
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: budgetHovered ? "white" : accent,
                    transition: "color 0.2s",
                  }}
                  className="block text-[10px] tracking-[0.3em] uppercase mb-5"
                >
                  Estimated Budget
                </label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((b) => {
                    const isSelected = budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className="px-4 py-2.5 border text-sm tracking-[0.1em] transition-all duration-200"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          borderColor: isSelected
                            ? accent
                            : budgetHovered
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.1)",
                          backgroundColor: isSelected
                            ? `rgba(${accentRgb}, 0.1)`
                            : "transparent",
                          color: isSelected
                            ? accent
                            : budgetHovered
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div
                onMouseEnter={() => setTimelineHovered(true)}
                onMouseLeave={() => setTimelineHovered(false)}
              >
                <label
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: timelineHovered ? "white" : accent,
                    transition: "color 0.2s",
                  }}
                  className="block text-[10px] tracking-[0.3em] uppercase mb-5"
                >
                  Desired Timeline
                </label>
                <div className="flex flex-wrap gap-3">
                  {timelines.map((t) => {
                    const isSelected = timeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className="px-4 py-2.5 border text-sm tracking-[0.1em] transition-all duration-200"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          borderColor: isSelected
                            ? accent
                            : timelineHovered
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.1)",
                          backgroundColor: isSelected
                            ? `rgba(${accentRgb}, 0.1)`
                            : "transparent",
                          color: isSelected
                            ? accent
                            : timelineHovered
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief */}
              <div
                onMouseEnter={() => setBriefHovered(true)}
                onMouseLeave={() => setBriefHovered(false)}
              >
                <label
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: briefHovered ? "white" : accent,
                    transition: "color 0.2s",
                  }}
                  className="block text-[10px] tracking-[0.3em] uppercase mb-4"
                >
                  Project Brief
                </label>
                <textarea
                  name="brief"
                  rows={6}
                  placeholder="Tell us about your project, goals, and anything else that's relevant..."
                  className="w-full bg-transparent border text-sm leading-relaxed focus:outline-none resize-none transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    borderColor: briefHovered
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.1)",
                    color: briefHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
                    padding: "1.25rem",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.6)`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = briefHovered
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.1)";
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-3 px-8 py-4 border text-sm tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  borderColor: accent,
                  color: accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accent;
                  e.currentTarget.style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = accent;
                }}
              >
                Submit Brief
                <ArrowRight size={14} />
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  accent,
  accentRgb,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  accent: string;
  accentRgb: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused
    ? accent
    : isHovered
    ? "rgba(255,255,255,0.8)"
    : "rgba(255,255,255,0.1)";

  const labelColor = isHovered || isFocused ? "white" : accent;
  const textColor = isHovered || isFocused ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        htmlFor={name}
        style={{
          fontFamily: "'DM Mono', monospace",
          color: labelColor,
          transition: "color 0.2s",
        }}
        className="block text-[10px] tracking-[0.3em] uppercase mb-3"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b py-3 text-sm focus:outline-none transition-all duration-200"
        style={{
          fontFamily: "'Inter', sans-serif",
          borderColor,
          color: textColor,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}