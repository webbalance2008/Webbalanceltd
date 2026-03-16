import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { articles, type Article } from "../data/articles";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { useIsMobile } from "../hooks/useIsMobile";

const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(articles.map(a => a.category))).sort()];

export function InsightsPage() {
  const gridRef   = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-5%" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovCat, setHovCat] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const featured  = articles[0];
  const rest      = articles.slice(1);
  const filtered  = activeCategory === "All" ? rest : rest.filter(a => a.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Insights — Web Design &amp; Digital Marketing Blog"
        description="Practical articles on web design, SEO, branding, and digital strategy from the Web Balance team. Stay ahead of the curve."
        path="/insights"
        keywords="web design blog, digital marketing insights, SEO articles, website tips, UX design"
      />
      <div className="min-h-screen" style={{ background: "#16212e" }}>

        {/* ── Hero ── */}
        <DepartmentHero
          label="Knowledge & Insights"
          heading={
            <>
              Insights &{" "}
              <span style={{ color: CYAN }}>articles</span>.
            </>
          }
          subtitle="Practical articles across web design, SEO, branding, marketing, performance, and technology."
          accent={CYAN}
          patternId="ins"
        />

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
    </>
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
          loading="lazy"
          decoding="async"
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
        <div className="flex items-center gap-2 text-[#00d4e8] text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>
          <span className="tracking-[0.15em]">Read Article</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────

function ArticleCard({ article, index, inView }: { article: Article; index: number; inView: boolean }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * 0.06, 0.5) }}
    >
      <Link to={`/insights/${article.slug}`} className="group block">
        <div className="overflow-hidden aspect-[16/9] mb-5" style={{ background: "#1d2d3e" }}>
          <img
            src={article.image}
            alt=""
            loading="lazy"
            decoding="async"
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
          className="flex items-center gap-2 text-white/25 group-hover:text-[#00d4e8] transition-colors text-sm"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span className="tracking-[0.15em]">{article.readTime}</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}