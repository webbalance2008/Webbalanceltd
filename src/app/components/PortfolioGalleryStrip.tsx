import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { projects } from "../data/projects";
import { projectImages } from "../data/projectImages";
import { useAnalytics } from "../hooks/useAnalytics";

// ── Collect ONE gallery image per project, then shuffle ─────────────────
interface GalleryItem {
  src: string;
  projectTitle: string;
  projectSlug: string;
  projectColor: string;
}

function getGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const project of projects) {
    // Pick one representative image per project
    const heroImg = projectImages[project.slug];
    const src = heroImg || project.gallery[0] || project.image;
    if (src) {
      items.push({
        src,
        projectTitle: project.title,
        projectSlug: project.slug,
        projectColor: project.color,
      });
    }
  }

  // Fisher-Yates shuffle for random order
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

const allGallery = getGalleryItems();

// Colours
const TEAL = "#5ec4d4";
const TEAL_RGB = "94, 196, 212";

export function PortfolioGalleryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { trackEvent } = useAnalytics();
  const handleGalleryClick = useCallback((projectSlug: string, projectTitle: string) => {
    trackEvent("gallery_click", { projectSlug, projectTitle });
  }, [trackEvent]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.65;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (allGallery.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#16212e" }}
    >
      {/* ── Header row ──────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p
            className="flex items-center gap-3 mb-4"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: TEAL,
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "1.25rem",
                height: "1px",
                backgroundColor: TEAL,
                display: "inline-block",
              }}
            />
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#ffffff",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            From Our Portfolio
          </h2>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              maxWidth: "28rem",
            }}
          >
            A curated selection from our recent web design projects.
          </p>
        </div>

        {/* Navigation arrows + portfolio link */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: canScrollLeft
                ? `rgba(${TEAL_RGB}, 0.4)`
                : "rgba(255,255,255,0.08)",
              color: canScrollLeft ? TEAL : "rgba(255,255,255,0.15)",
              background: canScrollLeft
                ? `rgba(${TEAL_RGB}, 0.06)`
                : "transparent",
              cursor: canScrollLeft ? "pointer" : "default",
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: canScrollRight
                ? `rgba(${TEAL_RGB}, 0.4)`
                : "rgba(255,255,255,0.08)",
              color: canScrollRight ? TEAL : "rgba(255,255,255,0.15)",
              background: canScrollRight
                ? `rgba(${TEAL_RGB}, 0.06)`
                : "transparent",
              cursor: canScrollRight ? "pointer" : "default",
            }}
          >
            <ChevronRight size={16} />
          </button>
          <Link
            to="/web-design/portfolio"
            className="hidden md:inline-flex items-center gap-2 ml-3 px-5 py-2.5 border transition-all duration-200"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.5625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: TEAL,
              borderColor: `rgba(${TEAL_RGB}, 0.3)`,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = TEAL;
              e.currentTarget.style.color = "#16212e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = TEAL;
            }}
          >
            View Full Portfolio
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── Scrollable gallery strip ────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-20 px-8 md:px-16 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {allGallery.map((item, i) => (
          <Link
            key={`${item.projectSlug}-${i}`}
            to={`/work/${item.projectSlug}`}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{
              scrollSnapAlign: "start",
              width: "clamp(280px, 30vw, 380px)",
              aspectRatio: "4 / 3",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleGalleryClick(item.projectSlug, item.projectTitle)}
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.projectTitle}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ background: "#1d2d3e" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Colour tint on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                backgroundColor: item.projectColor,
                opacity: hoveredIdx === i ? 0.55 : 0.15,
              }}
            />

            {/* Bottom gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(22,33,46,0.9) 0%, rgba(22,33,46,0.2) 40%, transparent 100%)",
                opacity: hoveredIdx === i ? 1 : 0.7,
              }}
            />

            {/* Label */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300"
              style={{
                transform:
                  hoveredIdx === i ? "translateY(0)" : "translateY(4px)",
                opacity: hoveredIdx === i ? 1 : 0.8,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: TEAL,
                  fontSize: "0.5rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Case Study
              </p>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#fff",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: 1.3,
                }}
              >
                {item.projectTitle}
              </h3>
            </div>

            {/* Top-right arrow on hover */}
            <div
              className="absolute top-3 right-3 transition-all duration-300"
              style={{
                opacity: hoveredIdx === i ? 1 : 0,
                transform:
                  hoveredIdx === i
                    ? "translate(0, 0)"
                    : "translate(4px, -4px)",
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center border backdrop-blur-sm"
                style={{
                  borderColor: `rgba(${TEAL_RGB}, 0.5)`,
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                <ArrowRight size={12} style={{ color: TEAL }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden px-8 pb-16 -mt-8">
        <Link
          to="/web-design/portfolio"
          className="flex items-center justify-center gap-2 py-3.5 border transition-colors"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.5625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TEAL,
            borderColor: `rgba(${TEAL_RGB}, 0.3)`,
          }}
        >
          View Full Portfolio
          <ArrowRight size={11} />
        </Link>
      </div>
    </section>
  );
}