import { useState, useRef } from "react";
import { getServiceColors } from "../../utils/serviceColors";
import { SEOHead } from "../../components/SEOHead";
import { FAQSchema, BreadcrumbSchema } from "../../components/StructuredData";
import { useParams, Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check, ChevronDown, MapPin } from "lucide-react";
import { cities, reachServices } from "../../data/ourReach";
import { useIsMobile } from "../../hooks/useIsMobile";

const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

export function CityPage() {
  const { city: citySlug } = useParams<{ city: string }>();
  const city = cities.find(c => c.slug === citySlug);
  const isMobile = useIsMobile();

  const servicesRef = useRef(null);
  const glanceRef   = useRef(null);
  const faqRef      = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-5%" });
  const glanceInView   = useInView(glanceRef,   { once: true, margin: "-5%" });
  const faqInView      = useInView(faqRef,       { once: true, margin: "-5%" });

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#16212e" }}>
        <div className="text-center">
          <p style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.3em] uppercase mb-4">404 — Not Found</p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", color: "white" }} className="text-4xl mb-6">City not found</h1>
          <Link to="/our-reach" style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-sm tracking-[0.2em] uppercase flex items-center gap-2 justify-center">
            <ArrowRight size={12} className="rotate-180" /> Back to Our Reach
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#16212e" }}>
      <SEOHead
        title={`Web Design & Digital Services in ${city.name}`}
        description={`Professional web design, SEO, branding, and hosting services in ${city.name}. Web Balance delivers high-performance digital solutions for ${city.name} businesses.`}
        path={`/our-reach/${city.slug}`}
        keywords={`web design ${city.name}, SEO ${city.name}, digital agency ${city.name}, website development ${city.name}`}
      />
      <FAQSchema faqs={city.faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Reach", path: "/our-reach" },
          { name: city.name, path: `/our-reach/${city.slug}` },
        ]}
      />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background mesh */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 50%, rgba(${CYAN_RGB},0.04) 0%, transparent 70%)`,
        }} />

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${CYAN_RGB},0.45)`, fontSize: "10px", letterSpacing: "0.2em" }}
            className="uppercase flex items-center gap-2 mb-8"
          >
            <Link to="/our-reach" className="hover:!text-[#00d4e8] transition-colors duration-200">Our Reach</Link>
            <span>/</span>
            <span style={{ color: CYAN }}>{city.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-5"
              >
                <MapPin size={12} /> {city.region}
                {city.isHQ && (
                  <span style={{ backgroundColor: CYAN, color: "#0a0a0a", padding: "2px 8px", fontSize: "9px", letterSpacing: "0.15em" }} className="uppercase">HQ</span>
                )}
              </motion.p>

              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.15] font-light"
                >
                  {city.heading}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}
                className="text-base leading-relaxed"
              >
                {city.intro}
              </motion.p>
            </div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="border p-6" style={{ borderColor: `rgba(${CYAN_RGB},0.12)`, backgroundColor: `rgba(${CYAN_RGB},0.03)` }}>
                <p style={{ fontFamily: "'DM Mono', monospace", color: CYAN, fontSize: "10px", letterSpacing: "0.3em" }} className="uppercase mb-5">Services in {city.name}</p>
                <div className="space-y-1">
                  {reachServices.map(svc => {
                    const colours = getServiceColors(svc.serviceKey);
                    const Icon = svc.Icon;
                    return (
                      <Link
                        key={svc.slug}
                        to={`/our-reach/${city.slug}/${svc.slug}`}
                        className="flex items-center justify-between px-4 py-3 border-b group transition-colors duration-200 last:border-b-0"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${colours.rgb},0.06)`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={14} strokeWidth={1.5} style={{ color: colours.primary, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "13px" }} className="group-hover:!text-white transition-colors duration-200">
                            {svc.name}
                          </span>
                        </div>
                        <ArrowRight size={12} style={{ color: `rgba(${colours.rgb},0.4)` }} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 border-b border-white/5">
        <div ref={servicesRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.p
            initial={isMobile ? false : { opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
          >
            <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> Digital Services
          </motion.p>
          <motion.h2
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-4xl font-light mb-12"
          >
            Six Services Available in {city.name}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            {reachServices.map((svc, i) => {
              const colours = getServiceColors(svc.serviceKey);
              const Icon = svc.Icon;
              return (
                <motion.div
                  key={svc.slug}
                  initial={isMobile ? false : { opacity: 0, y: 24 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  className="bg-[#1d2d3e]"
                >
                  <Link
                    to={`/our-reach/${city.slug}/${svc.slug}`}
                    className="block p-8 h-full group relative overflow-hidden transition-colors duration-300"
                    style={{ backgroundColor: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${colours.rgb},0.06)`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg,transparent,${colours.primary},transparent)` }} />

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-10 h-10 border mb-5 transition-colors duration-300" style={{ borderColor: `rgba(${colours.rgb},0.2)` }}>
                      <Icon size={17} strokeWidth={1.25} style={{ color: colours.primary, opacity: 0.75 }} />
                    </div>

                    <h3
                      style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s", fontSize: "18px" }}
                      className="mb-3 group-hover:!text-white"
                    >
                      {svc.name}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.6 }} className="mb-5">
                      {svc.description}
                    </p>
                    <span
                      style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${colours.rgb},0.45)`, fontSize: "10px", letterSpacing: "0.2em", transition: "color 0.3s" }}
                      className="uppercase flex items-center gap-2 group-hover:!text-current"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = colours.primary; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `rgba(${colours.rgb},0.45)`; }}
                    >
                      Learn more <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── At a Glance ── */}
      <section className="py-24 border-b border-white/5">
        <div ref={glanceRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <motion.p
                initial={isMobile ? false : { opacity: 0, y: 10 }}
                animate={glanceInView ? { opacity: 1, y: 0 } : {}}
                style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> At a Glance
              </motion.p>
              <motion.h2
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                animate={glanceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-3xl font-light leading-snug"
              >
                How We Help {city.name} Businesses
              </motion.h2>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                {city.glance.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={isMobile ? false : { opacity: 0, x: 20 }}
                    animate={glanceInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 px-6 py-5 bg-[#1a2840] border-l-2 transition-all duration-300 group hover:bg-[#243245]"
                    style={{ borderColor: `rgba(${CYAN_RGB},0.3)` }}
                  >
                    <Check size={14} style={{ color: CYAN, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "14px" }} className="group-hover:!text-white transition-colors duration-200">
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
      <section className="py-24 border-b border-white/5">
        <div ref={faqRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <motion.p
                initial={isMobile ? false : { opacity: 0 }}
                animate={faqInView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> FAQs
              </motion.p>
              <motion.h2
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-3xl font-light"
              >
                Common Questions About {city.name}
              </motion.h2>
            </div>
            <div className="md:col-span-8">
              <FaqAccordion faqs={city.faqs} inView={faqInView} accent={CYAN} accentRgb={CYAN_RGB} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="border p-12 md:p-16 relative overflow-hidden" style={{ borderColor: `rgba(${CYAN_RGB},0.15)`, backgroundColor: `rgba(${CYAN_RGB},0.03)` }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${CYAN},transparent)` }} />
            <p style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> Ready to Start?
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl md:text-4xl font-light mb-4">
              Let's grow your {city.name} business online.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed mb-8 max-w-lg">
              Choose a service above to see what's included and get a tailored quote, or contact us directly to discuss your project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#00d4e8] hover:text-[#16212e]"
              style={{ fontFamily: "'DM Mono', monospace", border: `1px solid ${CYAN}`, color: CYAN }}
            >
              Get in Touch <ArrowRight size={13} />
            </Link>
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
    <div className="space-y-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
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
            style={{ backgroundColor: open === i ? `rgba(${accentRgb},0.05)` : "transparent" }}
          >
            <span
              style={{ fontFamily: "'Inter', sans-serif", color: open === i ? "white" : "rgba(255,255,255,0.7)", fontSize: "14px", transition: "color 0.2s" }}
              className="group-hover:!text-white"
            >
              {faq.q}
            </span>
            <ChevronDown
              size={16}
              style={{ color: open === i ? accent : `rgba(${accentRgb},0.4)`, flexShrink: 0, marginLeft: "16px", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s, color 0.2s" }}
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