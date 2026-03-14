import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { projectImages } from "../data/projectImages";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/work/${project.slug}`)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {/* Image */}
        <motion.img
          src={projectImages[project.slug] ?? project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Colour tint — lightens on hover */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: project.color }}
          animate={{ opacity: hovered ? 0.72 : 0.28 }}
          transition={{ duration: 0.45 }}
        />

        {/* Persistent bottom gradient — disappears on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* ── DEFAULT: bottom info ──────────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#00A9A5] text-[10px] tracking-[0.3em] uppercase mb-1.5"
          >
            {project.category} — {project.year}
          </p>
          <h3
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-2xl md:text-3xl leading-tight font-light"
          >
            {project.title}
          </h3>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/50 text-xs tracking-widest uppercase mt-1"
          >
            {project.subtitle}
          </p>
        </motion.div>

        {/* ── HOVER: full card content ──────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
        >
          {/* Top row: tags + arrow */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/25 text-white/70 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex-shrink-0 w-10 h-10 border border-[#00A9A5] flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <ArrowUpRight size={16} className="text-[#00A9A5]" />
            </div>
          </div>

          {/* Bottom: description only — no title duplication */}
          <div>
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/75 text-sm leading-relaxed max-w-sm"
            >
              {project.description}
            </p>
            <p
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00A9A5]/70 text-[10px] tracking-[0.25em] uppercase mt-3 flex items-center gap-2"
            >
              View Case Study
              <span className="w-4 h-px bg-[#00A9A5]/70" />
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const navigate = useNavigate();

  const displayed = projects.slice(0, 6);

  return (
    <section id="work" className="bg-black py-32">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div ref={ref} className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00A9A5] text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#00A9A5]" />
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl font-light"
            >
              Recent Projects
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm max-w-[280px] leading-relaxed"
          >
            Every project is a unique collaboration — built to reflect the brand and convert its audience.
          </motion.p>
        </div>

        {/* Grid — first 6 only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Show More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => navigate("/web-design/portfolio")}
            className="group flex items-center gap-4 border border-white/20 px-10 py-4 text-white/60 hover:text-white hover:border-[#00d4e8] transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-xs tracking-[0.3em] uppercase">Show More Projects</span>
            <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
            <ArrowUpRight size={14} className="text-[#00d4e8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}