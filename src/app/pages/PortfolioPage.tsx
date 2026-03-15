import { projects } from "../data/projects";
import { projectImages } from "../data/projectImages";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";

// Web Design department colour
const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

const categories = ["All", "Hospitality", "Health & Fitness", "Automotive", "Construction"];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovCat, setHovCat] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Web Design Portfolio"
        description="Explore our portfolio of bespoke web design projects — from hospitality and healthcare to industrial and technology businesses across the UK."
        path="/web-design/portfolio"
        keywords="web design portfolio, website examples, bespoke websites, UK web design work"
      />
      <div
        className="min-h-screen"
        style={{ background: "#16212e" }}
      >
        {/* ── Hero ── */}
        <DepartmentHero
          label="Our Work"
          heading={
            <>
              Design{" "}
              <span style={{ color: CYAN }}>portfolio</span>.
            </>
          }
          subtitle="A curated selection of our recent web design work across industries — each project a unique collaboration built to perform."
          accent={CYAN}
          patternId="port"
        />

        {/* ── Category Filter ── */}
        <section
          className="py-8 border-b border-white/5 sticky top-24 backdrop-blur-sm z-10"
          style={{ background: "rgba(22,33,46,0.97)" }}
        >
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              const isHov    = cat === hovCat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setHovCat(cat)}
                  onMouseLeave={() => setHovCat(null)}
                  className="px-4 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-200 border"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    borderColor:     isActive ? CYAN : isHov ? `rgba(${CYAN_RGB},0.4)` : "rgba(255,255,255,0.1)",
                    color:           isActive ? CYAN : isHov ? "white" : "rgba(255,255,255,0.4)",
                    backgroundColor: isActive ? `rgba(${CYAN_RGB},0.08)` : "transparent",
                    boxShadow:       isActive ? `0 0 12px rgba(${CYAN_RGB},0.15)` : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="py-16">
          <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">

            {/* Count label */}
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
              className="text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 mb-10"
            >
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
              {activeCategory === "All" ? `All Projects (${projects.length})` : `${activeCategory} (${filtered.length})`}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.45) }}
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/work/${project.slug}`)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#1d2d3e" }}>
                      {/* Image */}
                      <img
                        src={projectImages[project.slug] ?? project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />

                      {/* Project colour tint */}
                      <div
                        className="absolute inset-0 opacity-[0.22] group-hover:opacity-[0.62] transition-opacity duration-[400ms]"
                        style={{ backgroundColor: project.color }}
                      />

                      {/* Bottom gradient — rest state */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16212e]/90 via-[#1a2840]/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

                      {/* ── REST: bottom metadata ── */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-300">
                        <p
                          style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                          className="text-[10px] tracking-[0.25em] uppercase mb-1"
                        >
                          {project.category} — {project.year}
                        </p>
                        <h3
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                          className="text-white text-2xl leading-tight font-light"
                        >
                          {project.title}
                        </h3>
                        <p
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="text-white/40 text-sm tracking-widest uppercase mt-1"
                        >
                          {project.subtitle}
                        </p>
                      </div>

                      {/* ── HOVER: description + arrow ── */}
                      <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                        {/* Top-right arrow */}
                        <div className="flex justify-end">
                          <div
                            className="w-10 h-10 border flex items-center justify-center bg-black/20 backdrop-blur-sm"
                            style={{ borderColor: CYAN }}
                          >
                            <ArrowUpRight size={16} style={{ color: CYAN }} />
                          </div>
                        </div>

                        {/* Bottom: description + CTA */}
                        <div>
                          <p
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="text-white/80 text-sm leading-relaxed mb-3"
                          >
                            {project.description}
                          </p>
                          <p
                            style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                            className="text-[10px] tracking-[0.25em] uppercase flex items-center gap-2"
                          >
                            View Case Study
                            <span className="w-4 h-px" style={{ backgroundColor: CYAN }} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/20 text-center py-20"
              >
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}