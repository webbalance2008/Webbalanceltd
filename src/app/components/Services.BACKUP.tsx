import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const services = [
  {
    number: "01",
    title: "Strategy & Discovery",
    description:
      "We begin every project with a deep dive — understanding your audience, competitors, and goals before a single pixel is designed.",
    deliverables: ["Brand Workshops", "Competitive Analysis", "Sitemap & UX Flow"],
  },
  {
    number: "02",
    title: "Design & Visual Identity",
    description:
      "Bespoke design that feels native to your brand. From moodboards to polished UI, we craft visuals that command attention.",
    deliverables: ["UI/UX Design", "Brand Identity", "Motion Design"],
  },
  {
    number: "03",
    title: "Development",
    description:
      "Hand-coded, performant websites built on modern frameworks. Fast load times, flawless on every device.",
    deliverables: ["React / Next.js", "CMS Integration", "E-Commerce"],
  },
  {
    number: "04",
    title: "Growth & Support",
    description:
      "We don't disappear after launch. Ongoing support, SEO optimisation, and analytics keep your site performing.",
    deliverables: ["SEO & Analytics", "A/B Testing", "Monthly Retainer"],
  },
];

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 cursor-default group"
    >
      {/* Number */}
      <div className="md:col-span-1">
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/20 text-xs tracking-widest group-hover:text-[#c9a96e] transition-colors duration-300"
        >
          {service.number}
        </span>
      </div>

      {/* Title */}
      <div className="md:col-span-4">
        <h3
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-2xl md:text-3xl group-hover:text-[#c9a96e] transition-colors duration-300 font-light"
        >
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <div className="md:col-span-4">
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-white/40 text-sm leading-relaxed"
        >
          {service.description}
        </p>
      </div>

      {/* Deliverables */}
      <div className="md:col-span-3 flex flex-col gap-2">
        {service.deliverables.map((d) => (
          <span
            key={d}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-white/25 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"
          >
            <span className="w-3 h-px bg-[#c9a96e]/50" />
            {d}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="bg-[#0d0d0d] py-32 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={ref} className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#c9a96e]" />
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-4xl md:text-5xl max-w-lg font-light"
          >
            Full-Service Digital Studio
          </motion.h2>
        </div>

        {/* Services list */}
        <div className="divide-y divide-white/[0.06]">
          {services.map((service, i) => (
            <ServiceItem key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
