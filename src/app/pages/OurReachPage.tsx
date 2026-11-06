import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { cities, reachServices } from "../data/ourReach";
import { getServiceColors } from "../utils/serviceColors";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { useIsMobile } from "../hooks/useIsMobile";

const CYAN = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

const heroImage = "https://images.unsplash.com/photo-1673707379112-34cd88f512ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTY290bGFuZCUyMGFlcmlhbCUyMGNpdHklMjBza3lsaW5lJTIwZHJhbWF0aWN8ZW58MXx8fHwxNzczNDMxOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const scotlandStats = [
  { value: "10",    label: "Cities Across Scotland" },
  { value: "60+",   label: "Local Service Pages" },
  { value: "2008",  label: "Established in Aberdeen" },
  { value: "6",     label: "Services Available Nationwide" },
];

const regionGroups = [
  { region: "North East Scotland", cities: ["aberdeen"] },
  { region: "Central Scotland",    cities: ["edinburgh", "perth", "stirling"] },
  { region: "West Scotland",       cities: ["glasgow"] },
  { region: "East Scotland",       cities: ["dundee"] },
  { region: "Fife",                cities: ["st-andrews"] },
  { region: "Highlands",           cities: ["inverness", "fort-william"] },
  { region: "Cairngorms",          cities: ["aviemore"] },
];

export function OurReachPage() {
  const statsRef      = useRef(null);
  const citiesRef     = useRef(null);
  const servicesRef   = useRef(null);
  const statsInView   = useInView(statsRef,    { once: true, margin: "-5%" });
  const citiesInView  = useInView(citiesRef,   { once: true, margin: "-5%" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-5%" });
  const isMobile = useIsMobile();

  return (
    <>
      <SEOHead
        title="Web Design & Digital Services Across Scotland"
        description="Web Balance delivers web design Scotland businesses trust — from Aberdeen and Edinburgh to Glasgow and Inverness. Local digital expertise, national reach."
        path="/our-reach"
        keywords="web design Scotland, web design Glasgow, web design Edinburgh, UK web agency, local web design"
      />
      <div className="min-h-screen" style={{ background: "#16212e" }}>

        {/* ── Hero ── */}
        <DepartmentHero
          label="Scotland — 10 Cities"
          heading={
            <>
              Our <span style={{ color: CYAN }}>reach</span>.
            </>
          }
          subtitle="Based in Aberdeen, we work with ambitious businesses from the Central Belt to the Highlands — delivering results-driven digital solutions tailored to your location and your market."
          accent={CYAN}
          patternId="reach"
        />

        {/* ── Scotland Stats ── */}
        <section className="border-b border-white/5">
          <div ref={statsRef} className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              {scotlandStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#1d2d3e] px-10 py-12"
                >
                  <div style={{ fontFamily: "'Montserrat', sans-serif", color: CYAN }} className="text-5xl mb-3 font-light">{s.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.3)" }} className="text-sm tracking-[0.15em] uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cities Grid ── */}
        <section className="py-24 border-b border-white/5">
          <div ref={citiesRef} className="max-w-[1440px] mx-auto px-8 md:px-16">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <motion.p
                  initial={isMobile ? false : { opacity: 0, y: 10 }}
                  animate={citiesInView ? { opacity: 1, y: 0 } : {}}
                  style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                  className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
                >
                  <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> Cities We Serve
                </motion.p>
                <motion.h2
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  animate={citiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 }}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-white text-4xl md:text-5xl font-light"
                >
                  Digital Services Across Scotland
                </motion.h2>
              </div>
              <motion.p
                initial={isMobile ? false : { opacity: 0 }}
                animate={citiesInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}
                className="text-sm max-w-xs leading-relaxed md:text-right"
              >
                Select a city to explore the full range of digital services available in your area.
              </motion.p>
            </div>

            {/* City cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              {cities.map((city, i) => (
                <CityCard key={city.slug} city={city} index={i} inView={citiesInView} />
              ))}
              {/* Filler card linking to contact */}
              <motion.div
                initial={isMobile ? false : { opacity: 0 }}
                animate={citiesInView ? { opacity: 1 } : {}}
                transition={{ delay: cities.length * 0.05 }}
                className="bg-[#1d2d3e]"
              >
                <Link
                  to="/contact"
                  className="flex flex-col justify-center items-center h-full min-h-[180px] p-8 text-center group transition-colors duration-300"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${CYAN_RGB},0.04)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  <MapPin size={24} style={{ color: `rgba(${CYAN_RGB},0.3)` }} className="mb-4 group-hover:!text-[#00d4e8] transition-colors duration-300" />
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "13px" }} className="group-hover:!text-white transition-colors duration-300 leading-relaxed">
                    Don't see your city?<br />We serve businesses across all of Scotland.
                  </p>
                  <p style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${CYAN_RGB},0.35)`, fontSize: "10px", letterSpacing: "0.2em" }} className="uppercase mt-4 group-hover:!text-[#00d4e8] transition-colors duration-300">
                    Get in touch
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services by Region ── */}
        <section className="py-24 border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <motion.p
                  style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                  className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
                >
                  <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> By Region
                </motion.p>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl font-light mb-6 leading-snug">
                  Scotland — from the Central Belt to the Cairngorms
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed">
                  Every city we serve has its own market, character, and digital opportunities. We tailor our approach to your location, not just your brief.
                </p>
              </div>
              <div className="md:col-span-8 space-y-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                {regionGroups.map(group => (
                  <div key={group.region} className="bg-[#1a2840] px-8 py-5 flex items-center justify-between group hover:bg-[#243245] transition-colors duration-300">
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }} className="text-sm group-hover:!text-white transition-colors duration-300">{group.region}</span>
                    <div className="flex items-center gap-3">
                      {group.cities.map(slug => {
                        const city = cities.find(c => c.slug === slug);
                        return city ? (
                          <Link
                            key={slug}
                            to={`/our-reach/${slug}`}
                            style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${CYAN_RGB},0.5)`, fontSize: "10px", letterSpacing: "0.15em" }}
                            className="uppercase hover:!text-[#00d4e8] transition-colors duration-200 flex items-center gap-1"
                          >
                            {city.name}
                            {city.isHQ && <span style={{ color: CYAN, fontSize: "8px" }}>★</span>}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Available ── */}
        <section className="py-24 border-b border-white/5">
          <div ref={servicesRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
            <motion.p
              initial={isMobile ? false : { opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
              className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> What We Offer
            </motion.p>
            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl font-light mb-12"
            >
              Six services. Every city.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              {reachServices.map((svc, i) => {
                const colours = getServiceColors(svc.serviceKey);
                const Icon = svc.Icon;
                return (
                  <motion.div
                    key={svc.slug}
                    initial={isMobile ? false : { opacity: 0, y: 20 }}
                    animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.07 }}
                    className="bg-[#1d2d3e]"
                  >
                    <div
                      className="p-8 h-full group cursor-default transition-colors duration-300"
                      style={{ backgroundColor: "transparent" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${colours.rgb},0.04)`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 border mb-5 transition-colors duration-300" style={{ borderColor: `rgba(${colours.rgb},0.2)` }}>
                        <Icon size={17} strokeWidth={1.25} style={{ color: colours.primary, opacity: 0.7 }} />
                      </div>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: "white" }} className="text-xl mb-3">{svc.name}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }} className="text-sm leading-relaxed mb-5">{svc.tagline}</p>
                      <Link
                        to={`/our-reach/aberdeen/${svc.slug}`}
                        style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${colours.rgb},0.5)`, fontSize: "10px", letterSpacing: "0.2em" }}
                        className="uppercase flex items-center gap-2 hover:!opacity-100 transition-opacity duration-200"
                      >
                        See example <ArrowRight size={11} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
            <p style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.35em] uppercase flex items-center justify-center gap-3 mb-6">
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} /> Ready to Start?
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-4xl md:text-5xl font-light mb-6">
              Your city. Our expertise.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed max-w-lg mx-auto mb-10">
              Select your city above to explore the services we offer in your area, or get in touch directly and we'll find the right solution for your business.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#00d4e8] hover:text-[#16212e]"
              style={{ fontFamily: "'DM Mono', monospace", border: `1px solid ${CYAN}`, color: CYAN }}
            >
              Get in Touch <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

// ── CityCard ──────────────────────────────────────────────────────────────────

function CityCard({ city, index, inView }: { city: typeof cities[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.05 }}
      className="bg-[#1d2d3e]"
    >
      <Link
        to={`/our-reach/${city.slug}`}
        className="block p-8 h-full min-h-[200px] group relative transition-colors duration-300"
        style={{ backgroundColor: hov ? `rgba(${CYAN_RGB},0.05)` : "transparent" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px transition-all duration-300" style={{
          background: hov
            ? `linear-gradient(90deg,transparent,${CYAN},transparent)`
            : `linear-gradient(90deg,transparent,rgba(${CYAN_RGB},0.12),transparent)`,
        }} />

        {/* HQ badge */}
        {city.isHQ && (
          <span
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", color: "#0a0a0a", backgroundColor: CYAN, padding: "2px 8px" }}
            className="uppercase inline-block mb-4"
          >
            HQ
          </span>
        )}

        {/* Region */}
        <p style={{ fontFamily: "'DM Mono', monospace", color: `rgba(${CYAN_RGB},0.45)`, fontSize: "10px", letterSpacing: "0.2em" }} className="uppercase mb-2">
          {city.region}
        </p>

        {/* City name */}
        <h3
          style={{ fontFamily: "'Montserrat', sans-serif", color: hov ? CYAN : "white", transition: "color 0.3s", fontSize: "22px" }}
          className="mb-3 font-light"
        >
          {city.name}
        </h3>

        {/* Short desc */}
        <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: 1.5 }} className="mb-5">
          {city.shortDesc}
        </p>

        {/* Arrow */}
        <div
          style={{ fontFamily: "'DM Mono', monospace", color: hov ? CYAN : `rgba(${CYAN_RGB},0.25)`, fontSize: "10px", letterSpacing: "0.2em", transition: "color 0.3s" }}
          className="uppercase flex items-center gap-2"
        >
          Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </Link>
    </motion.div>
  );
}