import { Outlet, useLocation } from "react-router";
import { useEffect, useState, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import "../../styles/fonts.css";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { PreloaderContext } from "../contexts/PreloaderContext";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
} from "./StructuredData";

/** Returns true when the viewport is ≥768 px (desktop breakpoint) */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Minimal full-screen placeholder shown while a lazy page chunk loads */
function PageSkeleton() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#16212e" }}
      aria-hidden="true"
    />
  );
}

export function Root() {
  // On mobile, skip the preloader entirely — it blocks FCP for ~2.9 s
  const [preloaderDone, setPreloaderDone] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const isDesktop = useIsDesktop();

  return (
    <MotionConfig reducedMotion={isDesktop ? "never" : "always"}>
      <PreloaderContext.Provider value={preloaderDone}>
        {/* ── Global resource hints ────────────────────────────────────── */}
        <Helmet>
          <html lang="en-GB" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://images.unsplash.com" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <link rel="dns-prefetch" href="https://images.unsplash.com" />
        </Helmet>

        {/* ── Global structured data (JSON-LD) ─────────────────────────── */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />

        <div className="bg-[#16212e] min-h-screen">
          {!preloaderDone && isDesktop && (
            <Preloader onComplete={() => setPreloaderDone(true)} />
          )}
          <ScrollToTop />
          <Nav />
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
          <Footer />
        </div>
      </PreloaderContext.Provider>
    </MotionConfig>
  );
}