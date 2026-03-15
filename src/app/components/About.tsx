import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Office/team photo — Unsplash (replaces figma:asset which is Figma-Make-only)
const officeImg = "https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const qualities = [
    "Design-led approach",
    "Transparent process",
    "UK-based team",
    "Fast turnaround",
    "Post-launch support",
    "No templates",
  ];

  return (
    <section
      id="about"
      className="relative py-16 md:py-32 border-t border-white/5 overflow-hidden md:min-h-[calc(100vh-96px)] flex items-center bg-black"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${officeImg})` }}
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16">
        <div ref={ref} className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#00d4e8]" />
            The Studio
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-4xl md:text-5xl leading-[1.15] mb-8 font-light"
          >
            Designed for Impact.<br />Built to Last.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/60 text-sm leading-relaxed"
            >
              Web Balance is a boutique digital studio based in the UK, specialising in high-end website design and development for the hospitality, retail, and professional services sectors.
            </p>
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/60 text-sm leading-relaxed"
            >
              We believe great design is about more than aesthetics — it's about communicating value, building trust, and driving real business outcomes. Every project is crafted from scratch, with no templates, no shortcuts.
            </p>
          </motion.div>

          {/* Qualities */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-x-6 gap-y-4 mt-10"
          >
            {qualities.map((q, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-[#00d4e8]" />
                <span
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/50 text-sm tracking-[0.15em] uppercase"
                >
                  {q}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}