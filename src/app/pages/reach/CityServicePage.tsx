import { useState, useRef } from "react";
import { getServiceColors } from "../../utils/serviceColors";
import { SEOHead } from "../../components/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "../../components/StructuredData";
import { useParams, Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { cities, reachServices, WHY_US_POINTS } from "../../data/ourReach";
import { useIsMobile } from "../../hooks/useIsMobile";

export function CityServicePage() {
  const { city: citySlug, service: serviceSlug } = useParams<{ city: string; service: string }>();

  const city    = cities.find(c => c.slug === citySlug);
  const service = reachServices.find(s => s.slug === serviceSlug);
  const isMobile = useIsMobile();

  const includesRef = useRef(null);
  const whyRef      = useRef(null);
  const faqRef      = useRef(null);
  const includesInView = useInView(includesRef, { once: true, margin: "-5%" });
  const whyInView      = useInView(whyRef,      { once: true, margin: "-5%" });
  const faqInView      = useInView(faqRef,      { once: true, margin: "-5%" });

  if (!city || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#16212e" }}>
        <div className="text-center">
          <p style={{ fontFamily: "'DM Mono', monospace", color: "#00d4e8" }} className="text-[10px] tracking-[0.3em] uppercase mb-4">404 — Not Found</p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", color: "white" }} className="text-4xl mb-6">Page not found</h1>
          <Link to="/our-reach" style={{ fontFamily: "'DM Mono', monospace", color: "#00d4e8" }} className="text-sm tracking-[0.2em] uppercase flex items-center gap-2 justify-center">
            <ArrowRight size={12} className="rotate-180" /> Back to Our Reach
          </Link>
        </div>
      </div>
    );
  }

  const colours   = getServiceColors(service.serviceKey);
  const ACCENT     = colours.primary;
  const ACCENT_RGB = colours.rgb;
  const Icon       = service.Icon;

  // Generate overview text
  const overview = `${service.description} Web Balance delivers ${service.name} services to businesses in ${city.name} and across ${city.region}, helping you compete online and grow with confidence.`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#16212e" }}>
      <SEOHead
        title={`${service.name} in ${city.name}`}
        description={`Professional ${service.name.toLowerCase()} services in ${city.name}. Web Balance delivers tailored ${service.name.toLowerCase()} solutions for ${city.name} businesses across ${city.region}.`}
        path={`/our-reach/${city.slug}/${service.slug}`}
        keywords={`${service.name.toLowerCase()} ${city.name}, ${service.name.toLowerCase()} agency ${city.name}, digital services ${city.name}`}
      />
      <ServiceSchema
        name={`${service.name} in ${city.name}`}
        description={`Professional ${service.name.toLowerCase()} services for ${city.name} businesses across ${city.region}.`}
        path={`/our-reach/${city.slug}/${service.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Reach", path: "/our-reach" },
          { name: city.name, path: `/our-reach/${city.slug}` },
          { name: service.name, path: `/our-reach/${city.slug}/${service.slug}` },
        ]}
      />

      {/* ── Hero ── */}
      <section
        className="pt-40 pb-20 border-b relative overflow-hidden"
        style={{ borderColor: `rgba(${ACCENT_RGB},0.12)` }}
      >
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 55% 60% at 75% 50%, rgba(${ACCENT_RGB},0.07) 0%, transparent 70%)`,
        }} />

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${ACCENT_RGB},0.45)`, fontSize: "10px", letterSpacing: "0.2em" }}
            className="uppercase flex items-center gap-2 mb-10 flex-wrap"
          >
            <Link to="/our-reach" className="hover:!opacity-100 opacity-60 transition-opacity duration-200">Our Reach</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to={`/our-reach/${city.slug}`} className="hover:!opacity-100 opacity-60 transition-opacity duration-200">{city.name}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: ACCENT }}>{service.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              {/* Dept label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-5"
              >
                <Icon size={12} strokeWidth={1.5} /> {city.region}
              </motion.p>

              {/* Heading */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-white text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] font-light"
                >
                  {service.name} in {city.name}
                </motion.h1>
              </div>

              {/* Overview */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}
                className="text-base leading-relaxed max-w-2xl"
              >
                {overview}
              </motion.p>
            </div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-4"
            >
              <div className="border p-6" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, backgroundColor: `rgba(${ACCENT_RGB},0.05)` }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${ACCENT},transparent)` }} />
                <Icon size={20} strokeWidth={1.25} style={{ color: ACCENT, marginBottom: "12px" }} />
                <p style={{ fontFamily: "'Montserrat', sans-serif", color: "white", fontSize: "18px" }} className="mb-2">{service.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.5 }} className="mb-6">{service.tagline}</p>
                <Link
                  to={service.ctaPath}
                  className="flex items-center justify-center gap-2 px-5 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-200"
                  style={{ fontFamily: "'DM Mono', monospace", backgroundColor: ACCENT, color: "#0a0a0a" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = colours.primaryHover; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT; }}
                >
                  {service.ctaLabel} <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 border-b" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)` }}>
        <div ref={includesRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.p
            initial={isMobile ? false : { opacity: 0 }}
            animate={includesInView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
          >
            <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} /> What's Included
          </motion.p>
          <motion.h2
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-3xl font-light mb-10"
          >
            {service.name} — Core Deliverables
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: `rgba(${ACCENT_RGB},0.06)` }}>
            {service.includes.map((item, i) => (
              <motion.div
                key={item}
                initial={isMobile ? false : { opacity: 0, y: 16 }}
                animate={includesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-7 group hover:bg-[#243245] transition-colors duration-200"
                style={{ backgroundColor: "#1a2840" }}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border mt-0.5" style={{ borderColor: `rgba(${ACCENT_RGB},0.25)` }}>
                  <Check size={12} style={{ color: ACCENT }} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.5 }} className="group-hover:!text-white transition-colors duration-200">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Web Balance ── */}
      <section className="py-24 border-b" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)` }}>
        <div ref={whyRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <motion.p
                initial={isMobile ? false : { opacity: 0 }}
                animate={whyInView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} /> Why Web Balance
              </motion.p>
              <motion.h2
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-3xl font-light mb-5 leading-snug"
              >
                Why Choose Web Balance for {service.name} in {city.name}?
              </motion.h2>
              <motion.p
                initial={isMobile ? false : { opacity: 0 }}
                animate={whyInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.7 }}
              >
                We're a Scottish digital agency that understands the local market and delivers results that matter.
              </motion.p>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-px" style={{ backgroundColor: `rgba(${ACCENT_RGB},0.04)` }}>
                {WHY_US_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={isMobile ? false : { opacity: 0, x: 20 }}
                    animate={whyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 px-6 py-4 border-l-2 bg-[#1a2840] hover:bg-[#243245] transition-colors duration-200 group"
                    style={{ borderColor: `rgba(${ACCENT_RGB},0.35)` }}
                  >
                    <Check size={13} style={{ color: ACCENT, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "14px" }} className="group-hover:!text-white transition-colors duration-200">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 border-b" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)` }}>
        <div ref={faqRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <motion.p
                initial={isMobile ? false : { opacity: 0 }}
                animate={faqInView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} /> FAQs
              </motion.p>
              <motion.h2
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-3xl font-light leading-snug"
              >
                {service.name} in {city.name} — Common Questions
              </motion.h2>
            </div>
            <div className="md:col-span-8">
              <FaqAccordion faqs={city.faqs} inView={faqInView} accent={ACCENT} accentRgb={ACCENT_RGB} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-16 border-b" style={{ borderColor: `rgba(${ACCENT_RGB},0.08)` }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <p style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${ACCENT_RGB},0.5)`, fontSize: "10px", letterSpacing: "0.25em" }} className="uppercase mb-5">
            Other Services in {city.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {reachServices
              .filter(s => s.slug !== service.slug)
              .map(s => {
                const c = getServiceColors(s.serviceKey);
                return (
                  <Link
                    key={s.slug}
                    to={`/our-reach/${city.slug}/${s.slug}`}
                    className="flex items-center gap-2 px-4 py-2 border text-sm tracking-[0.1em] uppercase transition-all duration-200"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      borderColor: `rgba(${c.rgb},0.2)`,
                      color: `rgba(${c.rgb},0.6)`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = c.primary;
                      (e.currentTarget as HTMLElement).style.color = c.primary;
                      (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${c.rgb},0.06)`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `rgba(${c.rgb},0.2)`;
                      (e.currentTarget as HTMLElement).style.color = `rgba(${c.rgb},0.6)`;
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }}
                  >
                    <s.Icon size={11} strokeWidth={1.5} />
                    {s.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="border p-12 md:p-16 relative overflow-hidden" style={{ borderColor: `rgba(${ACCENT_RGB},0.2)`, backgroundColor: `rgba(${ACCENT_RGB},0.04)` }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${ACCENT},transparent)` }} />
            <p style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }} className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} /> Ready to Start?
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl md:text-4xl font-light mb-4">
              {service.name} for your {city.name} business.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed mb-8 max-w-lg">
              Get a tailored proposal or find out more about how we can help your {city.name} business with {service.name.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={service.ctaPath}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-200"
                style={{ fontFamily: "'DM Mono', monospace", backgroundColor: ACCENT, color: "#0a0a0a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = colours.primaryHover; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT; }}
              >
                {service.ctaLabel} <ArrowRight size={13} />
              </Link>
              <Link
                to={`/our-reach/${city.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-200 hover:bg-white/5"
                style={{ fontFamily: "'DM Mono', monospace", border: `1px solid rgba(${ACCENT_RGB},0.25)`, color: `rgba(${ACCENT_RGB},0.7)` }}
              >
                All {city.name} Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FaqAccordion({ faqs, inView, accent, accentRgb }: {
  faqs: { q: string; a: string }[];
  inView: boolean;
  accent: string;
  accentRgb: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();
  return (
    <div className="space-y-px" style={{ backgroundColor: `rgba(${accentRgb},0.04)` }}>
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={isMobile ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08 }}
          className="bg-[#1a2840] overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left group transition-colors duration-200"
            style={{ backgroundColor: open === i ? `rgba(${accentRgb},0.06)` : "transparent" }}
          >
            <span
              style={{ fontFamily: "'Inter', sans-serif", color: open === i ? "white" : "rgba(255,255,255,0.7)", fontSize: "14px", transition: "color 0.2s" }}
              className="group-hover:!text-white pr-4"
            >
              {faq.q}
            </span>
            <ChevronDown
              size={16}
              style={{
                color: open === i ? accent : `rgba(${accentRgb},0.4)`,
                flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s, color 0.2s",
              }}
            />
          </button>
          <div style={{ maxHeight: open === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7 }} className="px-6 pb-5">
              {faq.a}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}