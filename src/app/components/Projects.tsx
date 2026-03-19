import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { projectImages } from "../data/projectImages";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useRef, useCallback, useEffect } from "react";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { EditableText } from "./admin/EditableText";

/** True on mobile viewports — evaluated once per component mount */
function useIsMobile() {
  const [v, setV] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const h = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return v;
}

function ProjectCard({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // On mobile: plain static card — no Motion, no hover state
  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden group cursor-pointer ${className}`}
        onClick={() => navigate(`/work/${project.slug}`)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={projectImages[project.slug] ?? project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ backgroundColor: project.color, opacity: 0.28 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[#00A9A5] text-[10px] tracking-[0.3em] uppercase mb-1.5">
              {project.category} — {project.year}
            </p>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-2xl leading-tight font-light">
              {project.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/50 text-sm tracking-widest uppercase mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
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
            className="text-white/50 text-sm tracking-widest uppercase mt-1"
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const navigate = useNavigate();
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const isMobile = useIsMobile();
  const contentBlocks = useContentBlocks("/");

  const displayed = projects;
  const totalPages = Math.ceil(displayed.length / 2);

  const goToPage = useCallback((page: number) => {
    setDirection(page > desktopPage ? 1 : -1);
    setDesktopPage(page);
  }, [desktopPage]);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement;
      if (child) {
        scrollRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
        setMobileIndex(index);
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      setMobileIndex(Math.min(newIndex, displayed.length - 1));
    }
  }, [displayed.length]);

  const pageProjects = displayed.slice(desktopPage * 2, desktopPage * 2 + 2);

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section id="work" className="py-16 md:py-32" style={{ background: "linear-gradient(180deg, #16212e 0%, #1a2840 50%, #16212e 100%)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <div ref={ref} className="flex items-end justify-between mb-10 md:mb-16 flex-wrap gap-6">
          <div>
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00A9A5] text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#00A9A5]" />
              Selected Work
            </motion.p>
            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl font-light"
            >
              <EditableText
                blockId="projects_h2"
                resolved={contentBlocks?.get("projects_h2") ?? "Recent Projects"}
              />
            </motion.h2>
          </div>
          <motion.p
            initial={isMobile ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm max-w-[280px] leading-relaxed hidden md:block"
          >
            <EditableText
              blockId="projects_desc"
              resolved={contentBlocks?.get("projects_desc") ?? "Every project is a unique collaboration — built to reflect the brand and convert its audience."}
              multiline
            />
          </motion.p>
        </div>

        {/* Desktop: Carousel — 2 projects per slide */}
        <div className="hidden md:block">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={desktopPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-4"
              >
                {pageProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goToPage(Math.max(0, desktopPage - 1))}
              disabled={desktopPage === 0}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                desktopPage === 0
                  ? "border-white/10 text-white/20"
                  : "border-[#00A9A5]/50 text-[#00A9A5] hover:border-[#00A9A5] hover:bg-[#00A9A5]/10"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`transition-all duration-300 ${
                    i === desktopPage
                      ? "w-8 h-1.5 bg-[#00A9A5]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => goToPage(Math.min(totalPages - 1, desktopPage + 1))}
              disabled={desktopPage === totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                desktopPage === totalPages - 1
                  ? "border-white/10 text-white/20"
                  : "border-[#00A9A5]/50 text-[#00A9A5] hover:border-[#00A9A5] hover:bg-[#00A9A5]/10"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mobile: Horizontal scroll — 1 project visible */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayed.map((project, i) => (
              <div
                key={project.id}
                className="flex-shrink-0 snap-center"
                style={{ width: "100%" }}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scrollToIndex(Math.max(0, mobileIndex - 1))}
              disabled={mobileIndex === 0}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                mobileIndex === 0
                  ? "border-white/10 text-white/20"
                  : "border-[#00A9A5]/50 text-[#00A9A5]"
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {displayed.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`transition-all duration-300 ${
                    i === mobileIndex
                      ? "w-8 h-1.5 bg-[#00A9A5]"
                      : "w-1.5 h-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToIndex(Math.min(displayed.length - 1, mobileIndex + 1))}
              disabled={mobileIndex === displayed.length - 1}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                mobileIndex === displayed.length - 1
                  ? "border-white/10 text-white/20"
                  : "border-[#00A9A5]/50 text-[#00A9A5]"
              }`}
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Show More */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-10 md:mt-16"
        >
          <button
            onClick={() => navigate("/web-design/portfolio")}
            className="group flex items-center gap-4 border border-white/20 px-10 py-4 text-white/60 hover:text-white hover:border-[#00d4e8] transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-sm tracking-[0.3em] uppercase">Show More Projects</span>
            <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
            <ArrowUpRight size={14} className="text-[#00d4e8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}