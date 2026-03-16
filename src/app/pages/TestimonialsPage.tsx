import { motion, useInView } from "motion/react";
import { testimonials } from "../data/testimonials";
import { useRef } from "react";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { useIsMobile } from "../hooks/useIsMobile";

const CYAN = "#00d4e8";

const CARD_ACCENTS = [
  { color: "#5ec4d4", rgb: "94, 196, 212",  iconBg: "linear-gradient(135deg, rgba(94,196,212,0.18), rgba(94,196,212,0.06))"  },
  { color: "#3dd68c", rgb: "61, 214, 140",  iconBg: "linear-gradient(135deg, rgba(61,214,140,0.18), rgba(61,214,140,0.06))"  },
  { color: "#f472b6", rgb: "244, 114, 182", iconBg: "linear-gradient(135deg, rgba(244,114,182,0.18), rgba(244,114,182,0.06))"},
  { color: "#b89fd4", rgb: "184, 159, 212", iconBg: "linear-gradient(135deg, rgba(184,159,212,0.18), rgba(184,159,212,0.06))"},
  { color: "#f59e6a", rgb: "245, 158, 106", iconBg: "linear-gradient(135deg, rgba(245,158,106,0.18), rgba(245,158,106,0.06))"},
  { color: "#00d4e8", rgb: "0, 212, 232",   iconBg: "linear-gradient(135deg, rgba(0,212,232,0.18), rgba(0,212,232,0.06))"   },
  { color: "#5ec4d4", rgb: "94, 196, 212",  iconBg: "linear-gradient(135deg, rgba(94,196,212,0.18), rgba(94,196,212,0.06))"  },
];

export default function TestimonialsPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <SEOHead
        title="Client Testimonials"
        description="Hear from the businesses Web Balance has helped grow online. Real results, real relationships — from Aberdeen to Edinburgh and beyond."
        path="/testimonials"
        keywords="web design testimonials, client reviews, web agency reviews UK"
      />
      <div className="min-h-screen" style={{ background: "#16212e" }}>
        {/* Hero */}
        <DepartmentHero
          label="Client Success"
          heading={
            <>
              Client{" "}
              <span style={{ color: CYAN }}>testimonials</span>.
            </>
          }
          subtitle="Real feedback from businesses we've partnered with across design, development, and digital strategy."
          accent={CYAN}
          patternId="test"
        />

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16">
            <motion.p
              initial={isMobile ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
              className="text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 mb-12"
            >
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
              All Testimonials ({testimonials.length})
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={i}
                  accent={CARD_ACCENTS[i % CARD_ACCENTS.length]}
                  cardNumber={i + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
            <motion.div
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-4xl md:text-5xl leading-tight font-light mb-6"
              >
                Ready to work together?
              </h2>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/40 text-lg mb-10 max-w-2xl mx-auto"
              >
                Let's discuss your project and how we can help you achieve your goals.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: CYAN,
                  border: `1px solid ${CYAN}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(0,212,232,0.08)`;
                  e.currentTarget.style.boxShadow = `0 0 12px rgba(0,212,232,0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

interface AccentConfig {
  color: string;
  rgb: string;
  iconBg: string;
}

function TestimonialCard({
  testimonial,
  index,
  accent,
  cardNumber,
}: {
  testimonial: typeof testimonials[0];
  index: number;
  accent: AccentConfig;
  cardNumber: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const numStr = String(cardNumber).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4) }}
      className="group relative overflow-hidden h-full"
      style={{
        background: "#1d2d3e",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `rgba(${accent.rgb}, 0.35)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
      }}
    >
      {/* Animated top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
        style={{ background: `linear-gradient(to right, transparent, ${accent.color}, transparent)` }}
      />

      {/* Faint card number */}
      <span
        className="absolute top-5 right-6 text-[4.5rem] leading-none select-none pointer-events-none"
        style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.03)" }}
      >
        {numStr}
      </span>

      <div className="p-8 md:p-10 h-full flex flex-col relative">
        {/* Icon box */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shrink-0"
          style={{
            background: accent.iconBg,
            border: `1px solid rgba(${accent.rgb}, 0.25)`,
            boxShadow: `0 0 20px rgba(${accent.rgb}, 0.12)`,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 22 16" fill="none">
            <path
              d="M0 16V9.6C0 4.267 2.667 1.067 8 0l1.2 1.92C6.4 2.72 4.933 4.427 4.8 7.2H9.6V16H0zm12.4 0V9.6C12.4 4.267 15.067 1.067 20.4 0l1.2 1.92c-2.8.8-4.267 2.507-4.4 5.28H22V16H12.4z"
              fill={accent.color}
            />
          </svg>
        </div>

        {/* Quote text */}
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-white/65 text-base leading-relaxed flex-grow group-hover:text-white/80 transition-colors duration-300"
        >
          {testimonial.quote}
        </p>

        {/* Author */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className="w-[2px] h-10 shrink-0"
              style={{ backgroundColor: accent.color, opacity: 0.7 }}
            />
            <div className="flex-1 min-w-0">
              <p
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-sm mb-0.5 truncate"
              >
                {testimonial.name}
              </p>
              <p
                style={{ fontFamily: "'DM Mono', monospace", color: accent.color }}
                className="text-[10px] tracking-[0.12em] uppercase opacity-60 truncate"
              >
                {testimonial.title} — {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}