import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, X, Plus } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { EditableText } from "./admin/EditableText";

const CYAN = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

interface ServiceModal {
  heading: string;
  body: string;
  bullets: string[];
  ctaLabel?: string;
  ctaPath?: string;
}

interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  modal: ServiceModal;
}

const services: Service[] = [
  {
    number: "01",
    title: "Strategy & Discovery",
    description:
      "We begin every project with a deep dive — understanding your audience, competitors, and goals before a single pixel is designed.",
    deliverables: ["Brand Workshops", "Competitive Analysis", "Sitemap & UX Flow"],
    modal: {
      heading: "Research-Led Strategy That De-Risks Your Project",
      body: "Every successful website starts long before design opens. Our discovery phase is a structured process of research, questioning, and planning that ensures the work we produce is built on solid strategic foundations — not assumptions. We study your market, your users, and your competitors to define a direction that gives your project the best possible chance of succeeding.",
      bullets: [
        "In-depth stakeholder interviews to extract real business goals",
        "Competitor landscape mapping across design, messaging, and UX",
        "Target audience persona development with behavioural insights",
        "Information architecture defined before design begins",
        "User journey flows mapped end-to-end across all key scenarios",
        "Discovery deliverables presented in a strategy document for sign-off",
      ],
      ctaLabel: "Start Your Discovery",
      ctaPath: "/contact",
    },
  },
  {
    number: "02",
    title: "Design & Visual Identity",
    description:
      "Bespoke design that feels native to your brand. From moodboards to polished UI, we craft visuals that command attention.",
    deliverables: ["UI/UX Design", "Brand Identity", "Motion Design"],
    modal: {
      heading: "Visuals That Stop the Scroll and Hold Attention",
      body: "Design is not decoration — it is the first and most powerful signal your brand sends to potential customers. We craft bespoke visual identities and user interfaces that are specific to your brand, your industry, and your audience. No templates, no recycled layouts. Every project begins from a blank canvas with your brief as the only starting point.",
      bullets: [
        "Full UI/UX design from wireframes to high-fidelity Figma prototypes",
        "Custom typography pairing and colour system development",
        "Motion and interaction design principles defined for each project",
        "Responsive design variants for desktop, tablet, and mobile",
        "Multiple initial creative directions presented for client selection",
        "Unlimited revisions within agreed project milestones",
      ],
      ctaLabel: "See Our Design Work",
      ctaPath: "/web-design/portfolio",
    },
  },
  {
    number: "03",
    title: "Development",
    description:
      "Hand-coded, performant websites built on modern frameworks. Fast load times, flawless on every device.",
    deliverables: ["React / Next.js", "CMS Integration", "E-Commerce"],
    modal: {
      heading: "Code That Performs as Beautifully as It Looks",
      body: "Beautiful design is only half of the equation. Our development team builds every site to pixel-perfect precision using modern, performant frameworks. We write clean, maintainable code — not patched-together WordPress themes. Every site we build passes Core Web Vitals targets, is tested across every major browser and device, and is handed over with full documentation.",
      bullets: [
        "Hand-coded in React, Next.js, or appropriate modern stack",
        "Headless CMS integration: Sanity, Contentful, WordPress REST API",
        "Core Web Vitals targets met before launch: LCP, FID, CLS",
        "Cross-browser testing: Chrome, Safari, Firefox, Edge",
        "E-commerce builds on Shopify, WooCommerce, or custom solutions",
        "Full codebase documentation and CMS training on handover",
      ],
      ctaLabel: "Discuss Your Build",
      ctaPath: "/contact",
    },
  },
  {
    number: "04",
    title: "Growth & Support",
    description:
      "We don't disappear after launch. Ongoing support, SEO optimisation, and analytics keep your site performing.",
    deliverables: ["SEO & Analytics", "A/B Testing", "Monthly Retainer"],
    modal: {
      heading: "A Long-Term Partner, Not a One-Off Supplier",
      body: "The launch of your website is not the end — it is the beginning. We offer structured, rolling support plans that keep your site secure, fast, and evolving with your business. From monthly content updates and plugin management to ongoing SEO campaigns and A/B testing programmes, we remain a hands-on partner in your digital growth long after go-live.",
      bullets: [
        "Rolling monthly support plans from £49/mo — no lock-in contracts",
        "Weekly plugin, CMS, and security updates as standard",
        "SEO monitoring, content strategy, and keyword tracking",
        "A/B testing frameworks deployed post-launch for conversion optimisation",
        "Monthly performance reports with actionable recommendations",
        "Dedicated account manager on Priority and Premium plans",
      ],
      ctaLabel: "View Support Plans",
      ctaPath: "/support",
    },
  },
];

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-[201] flex items-center justify-center px-4 md:px-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#1d2d3e] border border-white/10 w-full max-w-xl pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent line */}
          <div
            className="h-[1px] w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${CYAN}, transparent)`,
            }}
          />

          <div className="p-8 md:p-12">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border border-white/10 text-white/30 hover:text-white transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${CYAN_RGB}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {/* Step number */}
            <div
              style={{ fontFamily: "'Montserrat', sans-serif", color: CYAN }}
              className="text-6xl mb-1 font-light"
            >
              {service.number}
            </div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                color: `rgba(${CYAN_RGB}, 0.6)`,
              }}
              className="text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2"
            >
              <span
                className="w-4 h-px"
                style={{ backgroundColor: `rgba(${CYAN_RGB}, 0.6)` }}
              />
              {service.title}
            </p>

            <h2
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-2xl md:text-3xl mb-5 leading-tight font-light"
            >
              {service.modal.heading}
            </h2>

            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/75 text-sm leading-relaxed mb-6"
            >
              {service.modal.body}
            </p>

            <ul className="space-y-2.5 mb-8">
              {service.modal.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    style={{ color: CYAN }}
                    className="text-[10px] mt-1.5 flex-shrink-0"
                  >
                    ✦
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/75 text-sm leading-relaxed"
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to={service.modal.ctaPath ?? "/contact"}
              onClick={onClose}
              className="inline-flex items-center gap-3 px-6 py-3 border text-sm tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: CYAN,
                color: CYAN,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CYAN;
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = CYAN;
              }}
            >
              {service.modal.ctaLabel ?? "Get in Touch"}
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}

function ServiceItem({
  service,
  index,
  onOpen,
  contentBlocks,
}: {
  service: Service;
  index: number;
  onOpen: () => void;
  contentBlocks?: Map<string, string> | null;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();

  // Shared inner content — identical markup for both paths
  const inner = (
    <>
      <div className="md:col-span-1 flex items-start">
        <span
          data-num
          style={{ fontFamily: "'DM Mono', monospace", color: CYAN, transition: "color 0.3s" }}
          className="text-sm tracking-widest"
        >
          {service.number}
        </span>
      </div>
      <div className="md:col-span-4 flex flex-col justify-center gap-3">
        <h3
          style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
          className="text-2xl md:text-3xl font-light"
        >
          <EditableText
            blockId={`service_${service.number}_title`}
            resolved={contentBlocks?.get(`service_${service.number}_title`) ?? service.title}
          />
        </h3>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.2em] uppercase">
            Learn more
          </span>
          <Plus size={11} style={{ color: CYAN }} />
        </div>
      </div>
      <div className="md:col-span-4 flex items-center">
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/75 text-sm leading-relaxed">
          <EditableText
            blockId={`service_${service.number}_desc`}
            resolved={contentBlocks?.get(`service_${service.number}_desc`) ?? service.description}
            multiline
          />
        </p>
      </div>
      <div className="md:col-span-3 flex flex-col gap-2 justify-center">
        {service.deliverables.map((d) => (
          <span key={d} style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/60 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-3 h-px bg-[#00d4e8]/50" />
            {d}
          </span>
        ))}
      </div>
    </>
  );

  const sharedClass = "grid grid-cols-1 md:grid-cols-12 gap-6 py-10 cursor-pointer group transition-all duration-300 relative";
  const sharedStyle = { borderLeft: "2px solid transparent" };
  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.borderLeftColor = CYAN;
      e.currentTarget.style.backgroundColor = `rgba(${CYAN_RGB}, 0.04)`;
      e.currentTarget.style.paddingLeft = "1.5rem";
      const h3 = e.currentTarget.querySelector("h3");
      if (h3) (h3 as HTMLElement).style.color = CYAN;
      const num = e.currentTarget.querySelector("[data-num]");
      if (num) (num as HTMLElement).style.color = CYAN;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.borderLeftColor = "transparent";
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.paddingLeft = "";
      const h3 = e.currentTarget.querySelector("h3");
      if (h3) (h3 as HTMLElement).style.color = "white";
      const num = e.currentTarget.querySelector("[data-num]");
      if (num) (num as HTMLElement).style.color = "rgba(255,255,255,0.2)";
    },
  };

  if (isMobile) {
    return (
      <div ref={ref} onClick={onOpen} className={sharedClass} style={sharedStyle} {...hoverHandlers}>
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={onOpen}
      className={sharedClass}
      style={sharedStyle}
      {...hoverHandlers}
    >
      {inner}
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeService, setActiveService] = useState<Service | null>(null);
  const isMobile = useIsMobile();
  const contentBlocks = useContentBlocks("/");

  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeService]);

  return (
    <>
      <section
        id="services"
        className="relative bg-gradient-to-b from-[#16212e] via-[#1a2840] to-[#16212e] py-16 md:py-32 border-t border-white/5"
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          {/* Header */}
          <div ref={ref} className="mb-10 md:mb-20">
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#00d4e8]" />
              What We Do
            </motion.p>
            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl max-w-lg font-light"
            >
              <EditableText
                blockId="services_h2"
                resolved={contentBlocks?.get("services_h2") ?? "Full-Service Digital Studio"}
              />
            </motion.h2>
          </div>

          {/* Services list */}
          <div className="divide-y divide-white/[0.06]">
            {services.map((service, i) => (
              <ServiceItem
                key={service.number}
                service={service}
                index={i}
                onOpen={() => setActiveService(service)}
                contentBlocks={contentBlocks}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}