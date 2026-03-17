import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Palette, TrendingUp, Server, Megaphone, HeadphonesIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { EditableText } from "./admin/EditableText";

const services = [
  {
    icon: Smartphone,
    title: "Web Apps",
    description: "Custom web applications built to scale with your business needs",
    link: "/web-apps",
    accent: "#b89fd4",
    accentRgb: "184, 159, 212",
    iconBg: "linear-gradient(135deg, #2a1a4e 0%, #1e1040 100%)",
  },
  {
    icon: Palette,
    title: "Web Design",
    description: "Bespoke website design that captures your brand's essence",
    link: "/web-design",
    accent: "#5ec4d4",
    accentRgb: "94, 196, 212",
    iconBg: "linear-gradient(135deg, #162535 0%, #1d3545 100%)",
  },
  {
    icon: TrendingUp,
    title: "SEO",
    description: "Strategic optimization to rank higher and reach more customers",
    link: "/seo",
    accent: "#3dd68c",
    accentRgb: "61, 214, 140",
    iconBg: "linear-gradient(135deg, #102830 0%, #1a3830 100%)",
  },
  {
    icon: Server,
    title: "Hosting",
    description: "Lightning-fast, secure hosting infrastructure for your success",
    link: "/hosting",
    accent: "#f59e6a",
    accentRgb: "245, 158, 106",
    iconBg: "linear-gradient(135deg, #2a1a4e 0%, #3a2010 100%)",
  },
  {
    icon: Megaphone,
    title: "Branding & Marketing",
    description: "Cohesive brand identity and marketing strategies that convert",
    link: "/branding",
    accent: "#f472b6",
    accentRgb: "244, 114, 182",
    iconBg: "linear-gradient(135deg, #1a1a2e 0%, #2a1a2e 100%)",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    description: "Dedicated ongoing support to keep your digital presence thriving",
    link: "/support",
    accent: "#00d4e8",
    accentRgb: "0, 212, 232",
    iconBg: "linear-gradient(135deg, #1a2840 0%, #0f2535 100%)",
  },
];

export function CoreServices() {
  const contentBlocks = useContentBlocks("/");
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const toggleMobile = (title: string) => {
    setExpandedMobile(expandedMobile === title ? null : title);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#1a2840] via-[#16212e] to-[#1a2840] py-16 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="serviceGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r="1" fill="rgba(0,212,232,0.4)" />
              <circle cx="40" cy="40" r="1" fill="rgba(0,212,232,0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#serviceGrid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4e8]/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b89fd4]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="text-left mb-10 md:mb-20">
          <motion.p
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-4xl md:text-5xl mb-6"
          >
            <EditableText blockId="coreservices_h2" resolved={contentBlocks?.get("coreservices_h2") ?? "Core Services"} />
          </motion.h2>
          <motion.p
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/50 text-lg max-w-2xl"
          >
            <EditableText blockId="coreservices_desc" resolved={contentBlocks?.get("coreservices_desc") ?? "End-to-end digital solutions designed to elevate your brand and drive measurable results"} multiline />
          </motion.p>
        </div>

        {/* Services grid — desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={isMobile ? false : { opacity: 0, y: 30 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="group block relative bg-[#1d2d3e]/60 backdrop-blur-sm border border-white/5 p-6 md:p-8 transition-all duration-500 overflow-hidden h-full"
                  style={{ ["--svc-accent" as string]: service.accent }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${service.accentRgb}, 0.35)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Animated top accent line */}
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{ background: `linear-gradient(to right, transparent, ${service.accent}, transparent)` }}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-lg p-3 mb-6 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center"
                      style={{
                        background: service.iconBg,
                        border: `1px solid rgba(${service.accentRgb}, 0.25)`,
                        boxShadow: `0 0 20px rgba(${service.accentRgb}, 0.15)`,
                      }}
                    >
                      <Icon
                        className="w-full h-full transition-colors duration-300"
                        strokeWidth={1.5}
                        style={{ color: service.accent }}
                      />
                    </div>

                    {/* Content */}
                    <h3
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="text-white text-2xl mb-3 transition-colors duration-300 group-hover:opacity-90"
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300"
                    >
                      {service.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2">
                      <span
                        style={{ fontFamily: "'DM Mono', monospace", color: service.accent }}
                        className="text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Learn More
                      </span>
                      <svg
                        className="w-4 h-4 transform translate-x-0 group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ color: service.accent }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Services accordion — mobile */}
        <div className="md:hidden flex flex-col gap-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = expandedMobile === service.title;
            return (
              <motion.div
                key={service.title}
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => toggleMobile(service.title)}
                  className="w-full flex items-center gap-4 p-5 text-left transition-all duration-300"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: isOpen ? `rgba(${service.accentRgb}, 0.35)` : "rgba(255,255,255,0.05)",
                    background: isOpen ? "rgba(29,45,62,0.8)" : "rgba(29,45,62,0.4)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: service.iconBg,
                      border: `1px solid rgba(${service.accentRgb}, 0.25)`,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} style={{ color: service.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className="text-white text-lg font-light"
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: service.accent,
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronRight size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      style={{
                        borderWidth: "0 1px 1px 1px",
                        borderStyle: "solid",
                        borderColor: `rgba(${service.accentRgb}, 0.2)`,
                        background: "rgba(22,33,46,0.6)",
                      }}
                    >
                      <div className="px-5 py-4">
                        <p
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="text-white/50 text-sm leading-relaxed mb-4"
                        >
                          {service.description}
                        </p>
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-2"
                          style={{ fontFamily: "'DM Mono', monospace", color: service.accent, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                        >
                          Learn More
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/build-your-quote"
            className="inline-flex items-center gap-3 border border-[#00d4e8] text-[#00d4e8] px-8 py-4 hover:bg-[#00d4e8] hover:text-[#16212e] transition-all duration-300 group"
          >
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-sm tracking-[0.2em] uppercase">
              Start Your Project
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}