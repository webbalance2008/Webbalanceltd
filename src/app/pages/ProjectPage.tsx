import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { getProjectBySlug, projects } from "../data/projects";
import { projectImages } from "../data/projectImages";
import grandMeridianHero from "figma:asset/0c22f8467ac4d1e0aeb2f657367085dd0d601328.png";
import omalleysHero      from "figma:asset/76980031e465901dbe9effca6e7bb53e38a025c8.png";
import omalleysFullPage  from "figma:asset/23dd6b5ffeb917c8edef1b2d6d804973168104ac.png";
import omalleysGallery1  from "figma:asset/ca31457574153df5bb492b383d3d881dac33bce1.png";
import omalleysGallery2  from "figma:asset/2f30aee01c376604141cf010f6d7fa6fb7cd30df.png";
import omalleysGallery3  from "figma:asset/ab589e8fafd6aefbf3e4a23af871b07eff8ddc1f.png";
import omalleysGallery4  from "figma:asset/a7cfad25ff17d46dad7c914f163d7e3ffb68ba6e.png";
import omalleysMobile    from "figma:asset/6f015b587d1a774f9c708c57e895474041db5fae.png";

// Aberdeen Northern Hotel assets
import aberdeenPhone    from "figma:asset/039906d38103753ff9c15f2a91ffbbe17ccaf941.png";
import aberdeenLaptop   from "figma:asset/e28c9f6e1425ca366fbba021f5c0d6a55f7a014f.png";
import aberdeenTablets  from "figma:asset/bda355f131c818192afdcbc00910d2438b756240.png";
import aberdeenDesktop  from "figma:asset/0ea1b1a73d4946a50062f9be86b014c274174475.png";
import aberdeenLogo     from "figma:asset/4365289a546d2665f328ef5640f3e852ffc908e2.png";
import aberdeenRoom     from "figma:asset/b32d2237279d567cf9de9c6ad1ac288d62c299a0.png";

// Banks O' Dee Sports & Fitness assets
import banksPhonesHero  from "figma:asset/beb8a3b14cc753068b76ed2041a86d6cc3f6a676.png";
import banksLaptop      from "figma:asset/38c7ff17b096c648434c58285d42b2256c7032df.png";
import banksDesktop     from "figma:asset/4a4448c727ce87c52d5111c532f6f7b8331e7976.png";
import banksMember      from "figma:asset/2605096395be4431eb3170cb07986251a42474c9.png";
import banksGym         from "figma:asset/f1f32c882f2143b5d171ec65cf629a236a633872.png";

import { DeviceMockups } from "../components/DeviceMockups";

// Romar Abrado gallery assets
import romarGallery1 from "figma:asset/5521fbf80e92ab43066a4372147cfa7dd90475f8.png";
import romarGallery2 from "figma:asset/e8602033f02697622efb8f955d5cee89cc7c4048.png";
import romarGallery3 from "figma:asset/13148c95d1ec2cafd7110511a9fcba637e86fd3a.png";
import romarGallery4 from "figma:asset/b51729c35426c81023ef6af4f21480c467b26853.png";

// Web Design department colour
const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");
  const nextProject = projects.find((p) => p.slug === project?.nextSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center">
        <div className="text-center">
          <p style={{ fontFamily: "'DM Mono', monospace", color: CYAN }} className="text-xs tracking-widest uppercase mb-4">
            404
          </p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-5xl mb-6 font-light">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-white/40 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Use the figma asset for Grand Meridian hero, otherwise use project image
  const heroImage =
    project.slug === "the-grand-meridian"
      ? grandMeridianHero
      : project.slug === "omalleys-irish-bar"
      ? omalleysHero
      : project.slug === "aberdeen-northern-hotel"
      ? aberdeenLaptop
      : project.slug === "banks-o-dee-fitness"
      ? banksLaptop
      : projectImages[project.slug] ?? project.image;

  // For O'Malley's, use the full-page screenshot in scroll mode
  const screenshots =
    project.slug === "omalleys-irish-bar"
      ? [omalleysFullPage]
      : project.slug === "aberdeen-northern-hotel"
      ? [aberdeenTablets, aberdeenDesktop]
      : project.slug === "banks-o-dee-fitness"
      ? [banksPhonesHero, banksDesktop]
      : project.gallery.length > 0 ? project.gallery : [];

  // Gallery images per project
  const galleryImages =
    project.slug === "omalleys-irish-bar"
      ? [omalleysGallery1, omalleysGallery2, omalleysGallery3, omalleysGallery4]
      : project.slug === "aberdeen-northern-hotel"
      ? [aberdeenLaptop, aberdeenPhone, aberdeenTablets, aberdeenDesktop, aberdeenRoom]
      : project.slug === "banks-o-dee-fitness"
      ? [banksLaptop, banksPhonesHero, banksDesktop, banksMember, banksGym]
      : project.slug === "romar-abrado"
      ? [romarGallery1, romarGallery2, romarGallery3, romarGallery4]
      : project.gallery;

  return (
    <div className="bg-[#16212e] min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
          src={heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={project.slug === "omalleys-irish-bar" ? { objectPosition: "center 30%" } : undefined}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              project.slug === "omalleys-irish-bar"
                ? `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)`
                : `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)`,
          }}
        />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate(-1)}
          className="absolute top-28 left-8 md:left-16 flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs tracking-[0.2em] uppercase">
            Back to Work
          </span>
        </motion.button>

        {/* External link */}
        {project.externalUrl && (
          <motion.a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-28 right-8 md:right-16 w-12 h-12 border flex items-center justify-center transition-colors"
            style={{ borderColor: CYAN }}
          >
            <ArrowUpRight size={16} style={{ color: CYAN }} />
          </motion.a>
        )}

        {/* ── Bottom hero block — stacked in a single column, no overlap ── */}
        <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16">
          {/* Category + year */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
            className="text-xs tracking-[0.3em] uppercase mb-4"
          >
            {project.category} — {project.year}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-white/20 text-white/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden pb-[0.15em]">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] tracking-[-0.02em] font-light"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm tracking-[0.2em] uppercase mt-4"
          >
            {project.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ─── META ROW ─────────────────────────────────────── */}
      <section className="border-b border-white/5" style={{ background: "#1a2840" }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Client", value: project.client },
            { label: "Category", value: project.category },
            { label: "Year", value: project.year },
            { label: "Duration", value: project.duration },
          ].map((meta) => (
            <div key={meta.label}>
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-2"
              >
                {meta.label}
              </p>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/70 text-sm"
              >
                {meta.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEVICE MOCKUPS ───────────────────────────────────── */}
      {project.slug === "omalleys-irish-bar" && (
        <DeviceMockups
          screenshots={screenshots}
          mobileImages={[omalleysMobile]}
          projectTitle={project.title}
        />
      )}

      {/* ─── O'MALLEY'S CLIENT BRIEF ──────────────────────────── */}
      {project.slug === "omalleys-irish-bar" && (
        <section className="py-20 border-b border-white/5" style={{ background: "#1a2840" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

              {/* Left — label + badge */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <SectionLabel>About the Client</SectionLabel>

                {/* "Designed by" badge */}
                <div className="inline-flex items-center gap-3 self-start px-4 py-2.5 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#00d4e8" }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#00d4e8" }}
                    className="text-[10px] tracking-[0.25em] uppercase">
                    Web Balance Ltd — Responsive Website
                  </span>
                </div>
              </div>

              {/* Right — description */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <p style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-white/75 text-xl md:text-2xl leading-relaxed font-light">
                  O'Malley's Irish Bar and Kitchen is a family-owned establishment that brings the spirit of Ireland to the heart of Aberdeen.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/45 text-base leading-relaxed">
                  Our mission is to provide a cosy and friendly atmosphere where everyone feels welcome. With live music 4 days a week, live sports, and an extensive range of food &amp; drinks we offer something for everyone.
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ─── ABERDEEN NORTHERN HOTEL CLIENT BRIEF ─────────────── */}
      {project.slug === "aberdeen-northern-hotel" && (
        <section className="py-20 border-b border-white/5" style={{ background: "#1a2840" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

              {/* Left — label + logo */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <SectionLabel>About the Client</SectionLabel>
                <div className="flex flex-col items-start gap-4">
                  <img
                    src={aberdeenLogo}
                    alt="Aberdeen Northern Hotel logo"
                    className="h-32 w-auto object-contain opacity-90"
                  />
                  <div className="inline-flex items-center gap-3 px-4 py-2.5 border border-white/10"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CYAN }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                      className="text-[10px] tracking-[0.25em] uppercase">
                      Web Balance Ltd — Responsive Website
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — description */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <p style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-white/75 text-xl md:text-2xl leading-relaxed font-light">
                  An Aberdeen institution with an eye for the past and a vision for the future.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/45 text-base leading-relaxed">
                  Aberdeen Northern Hotel is a proud independent hotel that has for generations been warmly welcoming guests from near and far to enjoy their unique Art Deco spaces and comfortable accommodation. We had the pleasure of working with them to deliver a brand new, fully responsive website that honours that heritage while setting a confident course for the future.
                </p>
                <a
                  href="https://aberdeennorthernhotel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                  className="text-[11px] tracking-[0.25em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity self-start"
                >
                  Visit Site
                  <ArrowUpRight size={13} />
                </a>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ─── OVERVIEW ─────────────────────────────────────── */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <SectionLabel>Overview</SectionLabel>
          </div>
          <div className="md:col-span-8">
            <p
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white/80 text-2xl md:text-3xl leading-relaxed font-light"
            >
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ─── CHALLENGE & SOLUTION ─────────────────────────── */}
      <section className="py-24 border-b border-white/5" style={{ background: "#1a2840" }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <CaseBlock label="The Challenge" text={project.challenge} index={0} />
          <CaseBlock label="The Solution" text={project.solution} index={1} />
        </div>
      </section>

      {/* ─── GALLERY ──────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <SectionLabel>Project Gallery</SectionLabel>
          {project.slug === "omalleys-irish-bar" ? (
            /* O'Malley's: uniform 2-per-row grid */
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {galleryImages.map((img, i) => (
                <UniformGalleryImage key={i} src={img} index={i} title={project.title} />
              ))}
            </div>
          ) : (
            /* Default: asymmetric 3-column grid */
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <GalleryImage key={i} src={img} index={i} isLarge={i === 0} title={project.title} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── RESULTS ──────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/5" style={{ background: "#1a2840" }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <SectionLabel>Results</SectionLabel>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.results.map((result, i) => (
              <ResultCard key={result.label} result={result} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES USED ────────────────────────────────── */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <SectionLabel>Services Delivered</SectionLabel>
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-3">
            {project.services.map((s) => (
              <span
                key={s}
                style={{ fontFamily: "'DM Mono', monospace", borderColor: `rgba(${CYAN_RGB},0.2)`, color: `rgba(${CYAN_RGB},0.6)` }}
                className="px-5 py-3 border text-[11px] tracking-[0.2em] uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEXT PROJECT ─────────────────────────────────── */}
      {nextProject && (
        <section
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => navigate(`/work/${nextProject.slug}`)}
        >
          <div className="relative h-[50vh] overflow-hidden">
            <motion.img
              src={nextProject.image}
              alt={nextProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.55))`,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p
                style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
                className="text-[10px] tracking-[0.4em] uppercase mb-4"
              >
                Next Project
              </p>
              <h2
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-5xl md:text-7xl mb-4 font-light"
              >
                {nextProject.title}
              </h2>
              <div className="flex items-center gap-3 text-white/40 group-hover:text-[#00d4e8] transition-colors mt-4">
                <span style={{ fontFamily: "'Inter', sans-serif" }} className="text-xs tracking-[0.2em] uppercase">
                  View Case Study
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
      className="text-xs tracking-[0.3em] uppercase flex items-center gap-3"
    >
      <span className="w-6 h-px" style={{ backgroundColor: CYAN }} />
      {children}
    </motion.p>
  );
}

function CaseBlock({ label, text, index }: { label: string; text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <p
        style={{ fontFamily: "'DM Mono', monospace", color: CYAN }}
        className="text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
      >
        <span className="w-4 h-px" style={{ backgroundColor: CYAN }} />
        {label}
      </p>
      <p
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="text-white/50 text-sm leading-relaxed"
      >
        {text}
      </p>
    </motion.div>
  );
}

function GalleryImage({
  src,
  index,
  isLarge,
  title,
}: {
  src: string;
  index: number;
  isLarge: boolean;
  title: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`overflow-hidden ${isLarge ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
      style={{ background: "#1d2d3e" }}
    >
      <img
        src={src}
        alt={`${title} gallery ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </motion.div>
  );
}

function UniformGalleryImage({
  src,
  index,
  title,
}: {
  src: string;
  index: number;
  title: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="overflow-hidden aspect-[4/3]"
      style={{ background: "#1d2d3e" }}
    >
      <img
        src={src}
        alt={`${title} gallery ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    </motion.div>
  );
}

function ResultCard({
  result,
  index,
}: {
  result: { label: string; value: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border border-white/5 p-6"
      style={{ background: `rgba(${CYAN_RGB}, 0.03)` }}
    >
      <div
        style={{ fontFamily: "'Montserrat', sans-serif", color: CYAN }}
        className="text-4xl mb-3 font-light"
      >
        {result.value}
      </div>
      <div
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="text-white/30 text-xs tracking-[0.15em] uppercase"
      >
        {result.label}
      </div>
    </motion.div>
  );
}