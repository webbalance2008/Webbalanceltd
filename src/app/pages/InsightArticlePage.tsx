import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getArticleBySlug, articles, type ArticleSection } from "../data/articles";
import { SEOHead } from "../components/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "../components/StructuredData";

export function InsightArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug ?? "");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#16212e] flex items-center justify-center">
        <div className="text-center">
          <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[#00A9A5] text-sm tracking-widest uppercase mb-4">404</p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-5xl mb-6 font-light">Article Not Found</h1>
          <button onClick={() => navigate("/insights")} className="text-white/40 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={14} /> Back to Insights
          </button>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => article.relatedSlugs.includes(a.slug)).slice(0, 3);

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        ogImage={article.image}
        type="article"
        keywords={article.category}
      />
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        image={article.image}
        datePublished={article.date}
        authorName={article.author.name}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <div className="bg-[#16212e] min-h-screen">

        {/* ── Reading progress bar ──────────────────────────── */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#00d4e8] origin-left z-[60]"
          style={{ scaleX }}
        />

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <motion.img
            src={article.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16212e] via-black/60 to-black/30" />

          {/* Content — same flow as DepartmentHero */}
          <div className="relative w-full max-w-[1440px] mx-auto px-8 md:px-16 pt-40 md:pt-48 pb-20 md:pb-28">
            {/* Back link */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate("/insights")}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group mb-10"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-sm tracking-[0.2em] uppercase">
                All Insights
              </span>
            </motion.button>

            {/* Category pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <span
                className="inline-block px-4 py-1.5 border border-[#00d4e8]/40 rounded-full text-[10px] tracking-[0.35em] uppercase text-[#00d4e8]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {article.category}
              </span>
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden pb-[0.15em] mb-2">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-[clamp(2rem,5vw,5rem)] leading-[1.15] tracking-[-0.02em] font-light max-w-4xl"
              >
                {article.title}
              </motion.h1>
            </div>

            {/* Meta info (read time + date) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 md:gap-8 mt-8"
            >
              <MetaPill icon={<Clock size={12} />} text={article.readTime} />
              <MetaPill icon={<Calendar size={12} />} text={article.date} />
            </motion.div>
          </div>
        </section>

        {/* ── ARTICLE BODY ─────────────────────────────────── */}
        <article className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
          {/* Stand-first / excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/60 text-xl md:text-2xl leading-relaxed mb-14 pb-14 border-b border-white/5"
          >
            {article.excerpt}
          </motion.p>

          {/* Body sections */}
          <div className="space-y-0">
            {article.body.map((section, i) => (
              <ArticleBlock key={i} section={section} index={i} />
            ))}
          </div>
        </article>

        {/* ── SHARE / TAGS ─────────────────────────────────── */}
        <div className="border-t border-white/5">
          <div className="max-w-[900px] mx-auto px-8 md:px-12 py-8 flex flex-wrap items-center justify-between gap-4">
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-sm tracking-[0.3em] uppercase px-3 py-1.5 border border-white/10 text-white/30"
            >
              {article.category}
            </span>
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/20 text-[10px] tracking-[0.2em] uppercase">Share:</span>
              {["LinkedIn", "Twitter", "Copy Link"].map((s) => (
                <button key={s} style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/30 hover:text-[#00d4e8] text-[10px] tracking-[0.15em] uppercase transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED ARTICLES ─────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="py-20 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-8 md:px-16">
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 mb-10"
              >
                <span className="w-6 h-px bg-[#00d4e8]" />
                Continue Reading
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related, i) => (
                  <RelatedCard key={related.id} article={related} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-[900px] mx-auto px-8 md:px-12 text-center">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-6">
              Ready to act on this?
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-4xl md:text-5xl mb-8 font-light">
              Let's talk about your project.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#00d4e8] text-[#00d4e8] text-sm tracking-[0.25em] uppercase hover:bg-[#00d4e8] hover:text-[#16212e] transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get in Touch
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* ── Article block renderer ─────────────────────────────── */

function ArticleBlock({ section, index }: { section: ArticleSection; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const base = { ref, initial: { opacity: 0, y: 16 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.6, delay: 0.05 } };

  switch (section.type) {
    case "heading":
      return (
        <motion.h2
          {...base}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white text-3xl md:text-4xl mt-14 mb-6 leading-tight font-light"
        >
          {section.content}
        </motion.h2>
      );

    case "subheading":
      return (
        <motion.h3
          {...base}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white/80 text-xl md:text-2xl mt-8 mb-4 font-light"
        >
          {section.content}
        </motion.h3>
      );

    case "paragraph":
      return (
        <motion.p
          {...base}
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-white/50 text-base leading-[1.9] mb-6"
        >
          {section.content}
        </motion.p>
      );

    case "pullquote":
      return (
        <motion.blockquote
          {...base}
          className="my-12 pl-6 border-l-2 border-[#00A9A5]"
        >
          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white text-2xl md:text-3xl leading-relaxed italic font-light"
          >
            "{section.content}"
          </p>
        </motion.blockquote>
      );

    case "list":
      return (
        <motion.ul {...base} className="my-6 space-y-3">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="text-[#00A9A5] mt-1.5 flex-shrink-0 text-[10px]">✦</span>
              <span className="text-white/50 text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </motion.ul>
      );

    case "image":
      return (
        <motion.figure {...base} className="my-12">
          <div className="overflow-hidden" style={{ background: "#1d2d3e" }}>
            <img
              src={section.src}
              alt=""
              className="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          {section.caption && (
            <figcaption
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-white/25 text-[10px] tracking-[0.15em] uppercase mt-3 text-center"
            >
              {section.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case "divider":
      return (
        <motion.div {...base} className="my-12 flex items-center gap-4">
          <span className="flex-1 h-px bg-white/5" />
          <span className="text-[#00A9A5] text-[8px] tracking-[0.4em]">✦ ✦ ✦</span>
          <span className="flex-1 h-px bg-white/5" />
        </motion.div>
      );

    default:
      return null;
  }
}

/* ── Helpers ────────────────────────────────────────────── */

function MetaPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/30">
      <span className="text-[#00d4e8]/50">{icon}</span>
      <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.2em] uppercase">
        {text}
      </span>
    </div>
  );
}

function RelatedCard({ article, index }: { article: ReturnType<typeof getArticleBySlug> & object; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (!article) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/insights/${article.slug}`} className="group block">
        <div className="overflow-hidden aspect-[16/9] mb-4" style={{ background: "#1d2d3e" }}>
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[#00A9A5] text-[10px] tracking-[0.25em] uppercase">
            {article.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/25 text-[10px]">
            {article.readTime}
          </span>
        </div>
        <h3
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          className="text-white/80 text-lg group-hover:text-[#00d4e8] transition-colors leading-snug mb-3 font-light"
        >
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-white/20 group-hover:text-[#00d4e8] transition-colors text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>
          <span className="tracking-[0.15em]">Read Article</span>
          <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}