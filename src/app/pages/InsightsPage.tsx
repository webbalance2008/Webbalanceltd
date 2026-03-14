import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { articles, type Article } from "../data/articles";

const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

const heroImage =
  "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwYXJ0aWNsZXMlMjBlZGl0b3JpYWwlMjBjb250ZW50JTIwd3JpdGluZ3xlbnwxfHx8fDE3NzMyNTk1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(articles.map(a => a.category))).sort()];

export function InsightsPage() {
  const gridRef   = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-5%" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovCat, setHovCat] = useState<string | null>(null);

  const featured  = articles[0];
  const rest      = articles.slice(1);
  const filtered  = activeCategory === "All" ? rest : rest.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#16212e" }}>

      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Insights"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#1a2840]" />
        <div className="relative h-full flex flex-col justify-end max-w-[1440px] mx-auto px-8 md:px-16 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
            className="text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
            Knowledge & Insights
          </motion.p>
          <div className="overflow-hidden pb-[0.2em]">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-[clamp(3rem,6vw,5rem)] leading-[0.95] font-light"
            >
              Insights & Articles
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }}
            className="text-sm mt-3 max-w-lg leading-relaxed"
          >
            34 articles across web design, SEO, branding, marketing, performance, and technology.
          </motion.p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section className="border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16">
          <p
            style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
            className="text-[10px] tracking-[0.3em] uppercase mb-8 flex items-center gap-3"
          >
            <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
            Featured
          </p>
          <FeaturedCard article={featured} />
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-6">
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(cat => {
              const isActive = cat === activeCategory;
              const isHov    = cat === hovCat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setHovCat(cat)}
                  onMouseLeave={() => setHovCat(null)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    borderColor:     isActive ? CYAN : isHov ? `rgba(${CYAN_RGB},0.5)` : `rgba(${CYAN_RGB},0.15)`,
                    backgroundColor: isActive ? `rgba(${CYAN_RGB},0.12)` : isHov ? `rgba(${CYAN_RGB},0.05)` : "transparent",
                    color:           isActive ? CYAN : isHov ? "white" : "rgba(255,255,255,0.45)",
                    boxShadow:       isActive ? `0 0 12px rgba(${CYAN_RGB},0.2)` : "none",
                    transition: "all 0.18s ease",
                  }}
                  className="px-4 py-2 border uppercase"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="py-20">
        <div ref={gridRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between mb-10">
            <p
              style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
              className="text-[10px] tracking-[0.3em] uppercase flex items-center gap-3"
            >
              <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
              {activeCategory === "All" ? `All Articles (${rest.length})` : `${activeCategory} (${filtered.length})`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} inView={gridInView} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.25)" }} className="text-sm">
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── Featured Card ─────────────────────────────────────────────────────────────

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link to={`/insights/${article.slug}`} className="grid grid-cols-1 md:grid-cols-2 gap-10 group">
      <div className="overflow-hidden aspect-[16/9]" style={{ background: "#1d2d3e" }}>
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-5">
          <span style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.25em] uppercase">
            {article.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/25 text-[10px] tracking-[0.15em]">
            {article.date}
          </span>
        </div>
        <h2
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-3xl md:text-4xl mb-5 group-hover:text-[#00d4e8] transition-colors leading-tight font-light"
        >
          {article.title}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm leading-relaxed mb-6">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[#00d4e8] text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
          <span className="tracking-[0.15em]">Read Article</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────

function ArticleCard({ article, index, inView }: { article: Article; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * 0.06, 0.5) }}
    >
      <Link to={`/insights/${article.slug}`} className="group block">
        <div className="overflow-hidden aspect-[16/9] mb-5" style={{ background: "#1d2d3e" }}>
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-[10px] tracking-[0.25em] uppercase">
            {article.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/25 text-[10px] tracking-[0.15em]">
            {article.date}
          </span>
        </div>
        <h3
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-xl mb-3 group-hover:text-[#00d4e8] transition-colors leading-snug font-light"
        >
          {article.title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/30 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div
          className="flex items-center gap-2 text-white/25 group-hover:text-[#00d4e8] transition-colors text-xs"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span className="tracking-[0.15em]">{article.readTime}</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}