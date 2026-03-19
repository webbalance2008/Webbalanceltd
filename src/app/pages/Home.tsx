import { Hero } from "../components/Hero";
import { HowCanWeHelp } from "../components/HowCanWeHelp";
import { CoreServices } from "../components/CoreServices";
import { Projects } from "../components/Projects";
import { Services } from "../components/Services";
import { InsightsSection } from "../components/InsightsSection";
import { Contact } from "../components/Contact";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../components/SEOHead";

const STICKY_TOP = 96; // height of the fixed nav in px

const SECTION_META = [
  { label: "Home",      Component: Hero },
  { label: "Get Help",  Component: HowCanWeHelp },
  { label: "Services",  Component: CoreServices },
  { label: "Projects",  Component: Projects },
  { label: "Expertise", Component: Services },
  { label: "Insights",  Component: InsightsSection },
  { label: "Contact",   Component: Contact },
] as const;

// ─── Home ─────────────────────────────────────────────────────────────────────
export function Home() {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [translateYs, setTranslateYs] = useState<number[]>(() =>
    new Array(SECTION_META.length).fill(0)
  );
  const [fadeOpacities, setFadeOpacities] = useState<number[]>(() =>
    new Array(SECTION_META.length).fill(0)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // At the very top of the page, nothing should be darkened yet
      if (window.scrollY === 0) {
        setFadeOpacities(new Array(SECTION_META.length).fill(0));
        setTranslateYs(new Array(SECTION_META.length).fill(0));
        setActiveIndex(0);
        return;
      }

      const vh = window.innerHeight;
      const visibleH = vh - STICKY_TOP;
      const n = SECTION_META.length;

      const nextTranslates = new Array<number>(n).fill(0);
      const nextFades = new Array<number>(n).fill(0);
      let newActive = 0;

      for (let i = 0; i < n; i++) {
        const wrapper = wrapperRefs.current[i];
        const content = contentRefs.current[i];

        if (wrapper && content) {
          const wRect = wrapper.getBoundingClientRect();
          const overflow = Math.max(content.scrollHeight - visibleH, 0);

          if (overflow > 0 && wRect.top < STICKY_TOP) {
            const scrolledIn = STICKY_TOP - wRect.top;
            nextTranslates[i] = -Math.min(scrolledIn, overflow);
          }

          if (wRect.top <= STICKY_TOP + 1) {
            newActive = i;
          }
        }

        const nextWrapper = wrapperRefs.current[i + 1];
        if (nextWrapper) {
          const { top } = nextWrapper.getBoundingClientRect();
          if (top < vh - STICKY_TOP && top > STICKY_TOP) {
            nextFades[i] = ((vh - STICKY_TOP - top) / (vh - 2 * STICKY_TOP)) * 0.85;
          } else if (top <= STICKY_TOP) {
            nextFades[i] = 0.85;
          }
        }
      }

      setTranslateYs(nextTranslates);
      setFadeOpacities(nextFades);
      setActiveIndex(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (index: number) => {
    const wrapper = wrapperRefs.current[index];
    if (!wrapper) return;
    const targetY = wrapper.getBoundingClientRect().top + window.scrollY - STICKY_TOP;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Web Balance | Award-Winning Web Design &amp; Development Agency"
        description="Web Balance builds high-performance websites, custom web apps, and digital experiences for ambitious UK businesses. Bespoke design, SEO, hosting &amp; branding — all under one roof."
        path="/"
        keywords="web design UK, bespoke website design, web development agency, SEO services, custom web apps, hosting, branding"
      />
      <div className="relative">
        {SECTION_META.map(({ Component }, i) => (
          <StickySection
            key={i}
            index={i}
            SectionComponent={Component}
            translateY={translateYs[i]}
            fadeOpacity={fadeOpacities[i]}
            isInteractive={i <= activeIndex}
            onWrapperRef={(el) => { wrapperRefs.current[i] = el; }}
            onContentRef={(el) => { contentRefs.current[i] = el; }}
          />
        ))}

        <SectionNav
          sections={SECTION_META.map((s) => s.label)}
          activeIndex={activeIndex}
          onJump={jumpTo}
        />
      </div>
    </>
  );
}

// ─── SectionNav ───────────────────────────────────────────────────────────────
function SectionNav({
  sections,
  activeIndex,
  onJump,
}: {
  sections: readonly string[];
  activeIndex: number;
  onJump: (i: number) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] hidden xl:flex flex-col items-end gap-3">
      {sections.map((label, i) => {
        const isActive = i === activeIndex;
        const isHovered = i === hoveredIndex;

        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex items-center gap-3 group"
            aria-label={`Jump to ${label}`}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="text-white/70 text-[11px] tracking-[0.15em] uppercase select-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            <div className="relative flex items-center justify-center w-5 h-5">
              <motion.div
                className="absolute rounded-full border border-[#00A9A5]"
                animate={{
                  width:   isActive ? 18 : 0,
                  height:  isActive ? 18 : 0,
                  opacity: isActive ? 1  : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <motion.div
                className="rounded-full"
                animate={{
                  width:           isActive ? 6 : isHovered ? 5 : 4,
                  height:          isActive ? 6 : isHovered ? 5 : 4,
                  backgroundColor: isActive
                    ? "#00A9A5"
                    : isHovered
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── StickySection ────────────────────────────────────────────────────────────
interface StickySectionProps {
  SectionComponent: React.ComponentType;
  index: number;
  translateY: number;
  fadeOpacity: number;
  isInteractive: boolean;
  onWrapperRef: (el: HTMLDivElement | null) => void;
  onContentRef: (el: HTMLDivElement | null) => void;
}

function StickySection({
  SectionComponent,
  index,
  translateY,
  fadeOpacity,
  isInteractive,
  onWrapperRef,
  onContentRef,
}: StickySectionProps) {
  const [spacerHeight, setSpacerHeight] = useState(0);
  const contentEl = useRef<HTMLDivElement | null>(null);
  const wrapperEl = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  // Hero (index 0) is always entered. Others enter via IntersectionObserver.
  const [hasEntered, setHasEntered] = useState(index === 0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (index === 0) return;
    const el = wrapperEl.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }  // very low threshold so it fires as soon as wrapper enters
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const measure = () => {
      if (!contentEl.current) return;
      const overflow = Math.max(
        contentEl.current.scrollHeight - (window.innerHeight - STICKY_TOP),
        0
      );
      setSpacerHeight(overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (contentEl.current) ro.observe(contentEl.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ── Mobile: no sticky magic, sections just flow naturally ──────────────
  if (isMobile) {
    return (
      <div ref={(el) => { wrapperEl.current = el; onWrapperRef(el); }}>
        <div ref={(el) => { contentEl.current = el; onContentRef(el); }}>
          <SectionComponent />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={(el) => { wrapperEl.current = el; onWrapperRef(el); }}
      className="relative"
    >
      <div
        className="sticky overflow-hidden"
        style={{
          top: STICKY_TOP,
          height: `calc(100vh - ${STICKY_TOP}px)`,
          zIndex: index + 1,
          // Sections that haven't entered yet are transparent & invisible —
          // block their pointer events so they can't intercept clicks on lower sections.
          // Once entered, z-index governs priority (higher index = on top).
          pointerEvents: hasEntered && isInteractive ? "auto" : "none",
        }}
      >
        <div
          ref={(el) => {
            contentEl.current = el;
            onContentRef(el);
          }}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <motion.div
            initial={index === 0 ? false : { opacity: 0, y: 50 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionComponent />
          </motion.div>
        </div>

        {/* Black fade overlay when next section slides over */}
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: fadeOpacity }}
        />
      </div>

      {spacerHeight > 0 && <div style={{ height: spacerHeight }} />}
    </div>
  );
}