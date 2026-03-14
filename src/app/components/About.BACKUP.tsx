import { useRef } from "react";
import { motion, useInView } from "motion/react";

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
    <section id="about" className="bg-[#0a0a0a] py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#c9a96e]" />
              The Studio
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl leading-[1.05] mb-8 font-light"
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
                className="text-white/50 text-sm leading-relaxed"
              >
                Web Balance is a boutique digital studio based in the UK, specialising in high-end website design and development for the hospitality, retail, and professional services sectors.
              </p>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/50 text-sm leading-relaxed"
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
                  <div className="w-1 h-1 rounded-full bg-[#c9a96e]" />
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 text-xs tracking-[0.15em] uppercase"
                  >
                    {q}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — image with accent frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-[#c9a96e]/20 pointer-events-none" />

            <img
              src="https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ25lciUyMGRhcmslMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzMyNTY0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Studio workspace"
              className="w-full object-cover aspect-[4/5] grayscale"
            />

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#0d0d0d] border border-white/10 p-6">
              <div
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-4xl mb-1"
              >
                7+
              </div>
              <div
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/30 text-xs tracking-[0.2em] uppercase"
              >
                Years Experience
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
