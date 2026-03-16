import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause, MoveVertical } from "lucide-react";
const laptopImg = "/device-laptop-frame-new.svg";

const CYAN     = "#00d4e8";
const CYAN_RGB = "0, 212, 232";
const DEVICE_BG = "transparent";

// Screen area from SVG viewBox 355×213.8: rect x=46.1 y=23.8 w=259.8 h=162.4
const LS = { left: "12.98%", top: "11.13%", right: "13.83%", bottom: "12.91%" };

/* ─── Drag-to-scroll hook with momentum ───────────────────────────────────────
   Attaches global document listeners so dragging outside the element still
   works. Returns a `ref` to attach to the scrollable container + drag handlers.
   After release, applies momentum with exponential decay.
─────────────────────────────────────────────────────────────────────────────── */
function useDragScroll() {
  const ref      = useRef<HTMLDivElement>(null);
  const state    = useRef({ dragging: false, startY: 0, startTop: 0, vel: 0, lastY: 0 });
  const rafId    = useRef<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const stopRaf = () => { if (rafId.current) cancelAnimationFrame(rafId.current); };

  const applyMomentum = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    state.current.vel *= 0.91;                        // friction coefficient
    if (Math.abs(state.current.vel) < 0.3) return;   // stop when slow enough
    el.scrollTop -= state.current.vel;
    rafId.current = requestAnimationFrame(applyMomentum);
  }, []);

  const onStart = useCallback((clientY: number) => {
    const el = ref.current;
    if (!el) return;
    stopRaf();
    state.current = { dragging: true, startY: clientY, startTop: el.scrollTop, vel: 0, lastY: clientY };
    setGrabbing(true);
  }, []);

  const onMove = useCallback((clientY: number) => {
    const s = state.current;
    if (!s.dragging || !ref.current) return;
    s.vel    = clientY - s.lastY;
    s.lastY  = clientY;
    ref.current.scrollTop = s.startTop - (clientY - s.startY);
  }, []);

  const onEnd = useCallback(() => {
    if (!state.current.dragging) return;
    state.current.dragging = false;
    setGrabbing(false);
    rafId.current = requestAnimationFrame(applyMomentum);
  }, [applyMomentum]);

  /* Global listeners capture drag even when mouse leaves the element */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => onMove(e.clientY);
    const handleUp   = () => onEnd();
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup",   handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup",   handleUp);
      stopRaf();
    };
  }, [onMove, onEnd]);

  const handlers = {
    onMouseDown:  (e: React.MouseEvent)  => { e.preventDefault(); onStart(e.clientY); },
    onTouchStart: (e: React.TouchEvent)  => onStart(e.touches[0].clientY),
    onTouchMove:  (e: React.TouchEvent)  => { e.preventDefault(); onMove(e.touches[0].clientY); },
    onTouchEnd:   ()                     => onEnd(),
  };

  return { ref, grabbing, handlers };
}

interface DeviceMockupsProps {
  screenshots: string[];
  mobileImages: string[];
  projectTitle: string;
}

export function DeviceMockups({ screenshots, mobileImages, projectTitle }: DeviceMockupsProps) {
  const scrollMode = screenshots.length === 1;

  /* ── Laptop slideshow (multi-image mode) ──────────────── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying,   setIsPlaying]   = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setActiveIndex(0); setIsPlaying(true); }, [screenshots]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (scrollMode || !isPlaying || screenshots.length <= 1) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % screenshots.length);
    }, 4000);
    return clearTimer;
  }, [isPlaying, screenshots.length, clearTimer, scrollMode]);

  const goTo = (i: number) => { setActiveIndex(i); setIsPlaying(false); };
  const prev = () => goTo((activeIndex - 1 + screenshots.length) % screenshots.length);
  const next = () => goTo((activeIndex + 1) % screenshots.length);

  /* ── Preload next slide ───────────────────────────────── */
  useEffect(() => {
    if (scrollMode) return;
    const nextIdx = (activeIndex + 1) % screenshots.length;
    const img = new Image();
    img.src = screenshots[nextIdx];
  }, [activeIndex, screenshots, scrollMode]);

  /* ── Drag-scroll hooks ────────────────────────────────── */
  const laptopDrag = useDragScroll();
  const mobileDrag = useDragScroll();

  /* ── Icon button ──────────────────────────────────────── */
  const Btn = ({ onClick, title, children }: { onClick:()=>void; title:string; children:React.ReactNode }) => (
    <button type="button" onClick={onClick} title={title}
      className="w-8 h-8 flex items-center justify-center border transition-all duration-200 flex-shrink-0"
      style={{ borderColor:`rgba(${CYAN_RGB},0.3)`, color:`rgba(${CYAN_RGB},0.55)` }}
      onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=CYAN; el.style.color=CYAN; el.style.boxShadow=`0 0 10px rgba(${CYAN_RGB},0.25)`; }}
      onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=`rgba(${CYAN_RGB},0.3)`; el.style.color=`rgba(${CYAN_RGB},0.55)`; el.style.boxShadow="none"; }}
    >{children}</button>
  );

  return (
    <section className="border-b border-white/5 px-[0px] py-[100px]" style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #05080d 0%, #08111c 35%, #0d1a28 52%, #071019 55%, #0a1520 100%)',
    }}>

      {/* ── Horizon glow — subtle warm-cyan bloom at the table edge ── */}
      <div style={{
        position: 'absolute', top: '30px', bottom: '30px', left: 0, right: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 75% 100px at 50% 61%, rgba(0,212,232,0.055) 0%, transparent 100%)',
      }} />

      {/* ── Horizon line ── */}
      <div style={{
        position: 'absolute', left: '3%', right: '3%', top: '61%', height: '1px', pointerEvents: 'none',
        background: 'linear-gradient(to right, transparent 0%, rgba(160,210,235,0.12) 20%, rgba(210,235,255,0.22) 50%, rgba(160,210,235,0.12) 80%, transparent 100%)',
      }} />

      {/* ── Table surface — subtle gradient below horizon ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '61%', bottom: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(15,40,65,0.18) 0%, rgba(10,25,45,0.08) 50%, transparent 100%)',
      }} />

      <div className="max-w-[1440px] mx-auto px-8 md:px-16" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="mb-8">
          <p style={{ fontFamily:"'DM Mono', monospace", color:CYAN }}
            className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3">
            <span className="w-6 h-px" style={{ backgroundColor:CYAN }} />
            Live Preview
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-center gap-12 lg:gap-16">

          {/* ── LAPTOP ─────────────────────────────────────── */}
          <div className="flex flex-col items-center" style={{ width:"760px", maxWidth:"100%" }}>
            {/* Hidden clip-path definition: outer box minus screen rectangle (even-odd = hole) */}
            {/* SVG viewBox 355×213.8 → screen rect x=46.1 y=23.8 w=259.8 h=162.4 */}
            <svg aria-hidden style={{ position:'absolute', width:0, height:0, overflow:'hidden' }}>
              <defs>
                <clipPath id="laptop-frame-clip" clipPathUnits="objectBoundingBox">
                  {/* Outer CW + inner CCW = nonzero winding punches a hole at the screen */}
                  <path d="M0,0 H1 V1 H0 Z M0.1298,0.1113 V0.8709 H0.8617 V0.1113 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="relative w-full"
              style={{
                aspectRatio:"355/213.8",
                isolation:"isolate",
                background:DEVICE_BG,
              }}
            >

              {/* Screenshot layer — behind SVG frame */}
              <div className="absolute overflow-hidden bg-black"
                style={{ left:LS.left, top:LS.top, right:LS.right, bottom:LS.bottom, zIndex:1, borderRadius:"2px" }}>

                {scrollMode ? (
                  /* ── Single tall screenshot: drag to scroll ── */
                  <div
                    ref={laptopDrag.ref}
                    {...laptopDrag.handlers}
                    style={{
                      width:"100%", height:"100%",
                      overflowY:"scroll", overflowX:"hidden",
                      scrollbarWidth:"none",
                      cursor: laptopDrag.grabbing ? "grabbing" : "grab",
                      userSelect:"none",
                    }}
                  >
                    <img
                      src={screenshots[0]}
                      alt={`${projectTitle} full-page screenshot`}
                      style={{ width:"100%", height:"auto", display:"block", pointerEvents:"none" }}
                      draggable={false}
                    />
                  </div>
                ) : (
                  /* ── Multi-image crossfade slideshow ─────── */
                  <AnimatePresence mode="sync">
                    <motion.img key={activeIndex} src={screenshots[activeIndex]}
                      alt={`${projectTitle} desktop screenshot ${activeIndex+1}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} />
                  </AnimatePresence>
                )}
              </div>

              {/* Laptop SVG frame — clip-path punches out screen rectangle, content shows through */}
              <img src={laptopImg} alt="Laptop frame" draggable={false}
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{ zIndex:2, clipPath:'url(#laptop-frame-clip)' }} />
            </div>

            {/* ── Laptop reflection ──────────────────────────────── */}
            <div style={{
              width: '100%', height: '16px', overflow: 'hidden', marginTop: '1px', flexShrink: 0,
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
              maskImage:       'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
            }}>
              <img src={laptopImg} alt="" draggable={false} style={{
                width: '100%', display: 'block',
                transform: 'scaleY(-1)', transformOrigin: 'top center',
                opacity: 0.32, filter: 'blur(0.8px)',
              }} />
            </div>

            {/* Controls — slideshow only; scroll mode gets a drag hint */}
            {scrollMode ? (
              <div className="flex items-center gap-2"
                style={{ color:`rgba(${CYAN_RGB},0.4)`, fontFamily:"'DM Mono', monospace", fontSize:"10px", letterSpacing:"0.25em", marginTop:"6px", position:"relative", zIndex:2 }}>
                <MoveVertical size={11} style={{ color:`rgba(${CYAN_RGB},0.5)` }} />
                <span className="uppercase tracking-[0.25em]">Drag to scroll</span>
              </div>
            ) : (
              <div className="flex items-center gap-3"
                style={{ marginTop:"6px", position:"relative", zIndex:2 }}>
                <Btn onClick={prev} title="Previous"><ChevronLeft size={13} /></Btn>
                <div className="flex items-center gap-2 px-2">
                  {screenshots.map((_,i) => (
                    <button key={i} type="button" onClick={() => goTo(i)}
                      aria-label={`Screenshot ${i+1}`}
                      className="transition-all duration-300 rounded-sm"
                      style={{ width:i===activeIndex?"22px":"6px", height:"3px",
                        backgroundColor:i===activeIndex?CYAN:`rgba(${CYAN_RGB},0.25)` }} />
                  ))}
                </div>
                <Btn onClick={() => setIsPlaying(p=>!p)} title={isPlaying?"Pause":"Play"}>
                  {isPlaying ? <Pause size={11}/> : <Play size={11}/>}
                </Btn>
                <Btn onClick={next} title="Next"><ChevronRight size={13}/></Btn>
              </div>
            )}

            <p className="mt-1 text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily:"'DM Mono', monospace", color:`rgba(${CYAN_RGB},0.35)` }}>
              {scrollMode ? "Desktop View — Drag to explore" : `Desktop View — ${activeIndex+1} / ${screenshots.length}`}
            </p>
          </div>

          {/* ── PHONE ──────────────────────────────────────── */}
          <div
            className="flex flex-col items-center flex-shrink-0"
            style={{ width:"224px", marginBottom:"0px", isolation:"isolate", background:DEVICE_BG, borderRadius:12 }}
          >
            <PhoneSVG>
              <div
                ref={mobileDrag.ref}
                {...mobileDrag.handlers}
                style={{
                  width:"100%", height:"100%",
                  overflowY:"auto", overflowX:"hidden",
                  scrollbarWidth:"none",
                  background:"#111",
                  cursor: mobileDrag.grabbing ? "grabbing" : "grab",
                  userSelect:"none",
                  fontFamily:"'Inter', sans-serif",
                }}
              >
                {mobileImages.length === 1 ? (
                  <img
                    src={mobileImages[0]}
                    alt={`${projectTitle} mobile screenshot`}
                    style={{ width:"100%", height:"auto", display:"block", pointerEvents:"none", imageRendering:"-webkit-optimize-contrast" }}
                    draggable={false}
                  />
                ) : (
                  <MobilePage images={mobileImages} title={projectTitle} />
                )}
              </div>
            </PhoneSVG>

            {/* ── Phone reflection ──────────────────────────────── */}
            <div style={{
              width: '100%', height: '36px', overflow: 'hidden', marginTop: '1px', flexShrink: 0,
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
              maskImage:       'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
            }}>
              <div style={{ transform: 'scaleY(-1)', transformOrigin: 'top center', opacity: 0.32, filter: 'blur(1px)' }}>
                <PhoneSVG>
                  <div style={{ width: '100%', height: '100%', background: '#0a1422' }} />
                </PhoneSVG>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2"
              style={{ color:`rgba(${CYAN_RGB},0.4)`, fontFamily:"'DM Mono', monospace", fontSize:"9px", letterSpacing:"0.2em" }}>
              <MoveVertical size={10} style={{ color:`rgba(${CYAN_RGB},0.5)` }} />
              <span className="uppercase tracking-[0.2em]">Drag to scroll</span>
            </div>

            <p className="mt-1 text-[10px] tracking-[0.25em] uppercase text-center"
              style={{ fontFamily:"'DM Mono', monospace", color:`rgba(${CYAN_RGB},0.35)` }}>
              Mobile View
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Inline phone SVG ───────────────────────────────────────────────────────
   ViewBox 331.4 × 593.9.
   Screen clip: M40.6,529.8V63.3c0-16.6,13.5-30,30-30h187.8
                c16.6,0,30,13.5,30,30v466.5c0,16.6-13.5,30-30,30H70.6
                C54,559.8,40.6,546.4,40.6,529.8z

   Key z-order fix:
     1. Side buttons (back)
     2. Outer body gradient (opaque shell)
     3. Inner body gradient (bezel)
     4. Edge highlights
     5. Screen clip group with <foreignObject>  ← must be LAST / on top
─────────────────────────────────────────────────────────────────────────────── */
function PhoneSVG({ children }: { children: React.ReactNode }) {
  const VW = 331.4, VH = 593.9;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <linearGradient id="ph_rb" gradientUnits="userSpaceOnUse" x1="300.4" y1="179" x2="303.9" y2="179">
          <stop offset="0" stopColor="#0F0F0F"/><stop offset="1" stopColor="#4E4E4E"/>
        </linearGradient>
        <linearGradient id="ph_lvu" gradientUnits="userSpaceOnUse" x1="25.1" y1="152.5" x2="28.6" y2="152.5">
          <stop offset="0" stopColor="#4E4E4E"/><stop offset="1" stopColor="#0F0F0F"/>
        </linearGradient>
        <linearGradient id="ph_ls" gradientUnits="userSpaceOnUse" x1="28.6" y1="100.2" x2="25.2" y2="100.2">
          <stop offset="0" stopColor="#0F0F0F"/><stop offset="1" stopColor="#4E4E4E"/>
        </linearGradient>
        <linearGradient id="ph_lvd" gradientUnits="userSpaceOnUse" x1="25.1" y1="200" x2="28.6" y2="200">
          <stop offset="0" stopColor="#4E4E4E"/><stop offset="1" stopColor="#0F0F0F"/>
        </linearGradient>
        <linearGradient id="ph_ob" gradientUnits="userSpaceOnUse" x1="27.9" y1="296.6" x2="301.1" y2="296.6">
          <stop offset="0" stopColor="#4A494A"/><stop offset="0.5" stopColor="#767676"/><stop offset="1" stopColor="#4A494A"/>
        </linearGradient>
        <linearGradient id="ph_ib" gradientUnits="userSpaceOnUse" x1="37.1" y1="296.6" x2="292" y2="296.6">
          <stop offset="0" stopColor="#1B1C1C"/><stop offset="0.5" stopColor="#3B3B3B"/><stop offset="1" stopColor="#1B1C1C"/>
        </linearGradient>
        <linearGradient id="ph_re" gradientUnits="userSpaceOnUse" x1="292" y1="63.9" x2="292" y2="533.9">
          <stop offset="0" stopColor="#000"/><stop offset="0.226" stopColor="#303031"/>
          <stop offset="0.763" stopColor="#303031"/><stop offset="1" stopColor="#000"/>
        </linearGradient>
        <linearGradient id="ph_le" gradientUnits="userSpaceOnUse" x1="37" y1="533" x2="37" y2="58.8">
          <stop offset="0" stopColor="#000"/><stop offset="0.226" stopColor="#303031"/>
          <stop offset="0.763" stopColor="#303031"/><stop offset="1" stopColor="#000"/>
        </linearGradient>
        <linearGradient id="ph_te" gradientUnits="userSpaceOnUse" x1="66.9" y1="28.7" x2="259" y2="28.7">
          <stop offset="0" stopColor="#000"/><stop offset="0.226" stopColor="#232324"/>
          <stop offset="0.763" stopColor="#232324"/><stop offset="1" stopColor="#000"/>
        </linearGradient>
        <linearGradient id="ph_be" gradientUnits="userSpaceOnUse" x1="66.9" y1="564.5" x2="259" y2="564.5">
          <stop offset="0" stopColor="#000"/><stop offset="0.226" stopColor="#303031"/>
          <stop offset="0.763" stopColor="#303031"/><stop offset="1" stopColor="#000"/>
        </linearGradient>
        <clipPath id="ph_clip">
          <path d="M40.6,529.8V63.3c0-16.6,13.5-30,30-30h187.8c16.6,0,30,13.5,30,30v466.5c0,16.6-13.5,30-30,30H70.6C54,559.8,40.6,546.4,40.6,529.8z"/>
        </clipPath>
      </defs>

      {/* 1 ── Side buttons (drawn first / lowest layer) */}
      <path fill="url(#ph_rb)"  d="M301.9,211.7h-1.5v-65.4h1.5c1.1,0,2,0.9,2,2v61.4C303.9,210.8,303,211.7,301.9,211.7z"/>
      <path fill="url(#ph_lvu)" d="M27.1,172.8h1.5v-40.6h-1.5c-1.1,0-2,0.9-2,2v36.5C25.1,171.9,26,172.8,27.1,172.8z"/>
      <path fill="url(#ph_ls)"  d="M27.1,112h1.5V88.4h-1.5c-1.1,0-2,0.9-2,2V110C25.1,111.1,26,112,27.1,112z"/>
      <path fill="url(#ph_lvd)" d="M27.1,220.3h1.5v-40.6h-1.5c-1.1,0-2,0.9-2,2v36.5C25.1,219.4,26,220.3,27.1,220.3z"/>

      {/* 2 ── Outer phone body */}
      <path fill="url(#ph_ob)" d="M260.6,571H68.4c-22.3,0-40.5-18.1-40.5-40.5V62.7c0-22.3,18.1-40.5,40.5-40.5h192.2c22.3,0,40.5,18.1,40.5,40.5v467.8C301.1,552.9,283,571,260.6,571z"/>

      {/* 3 ── Inner body / bezel */}
      <path fill="url(#ph_ib)" d="M256.6,564.5H72.4c-19.5,0-35.3-15.8-35.3-35.3V64.1c0-19.5,15.8-35.3,35.3-35.3h184.2c19.5,0,35.3,15.8,35.3,35.3v465.1C292,548.6,276.1,564.5,256.6,564.5z"/>

      {/* 4 ── Edge highlights */}
      <path fill="url(#ph_re)" d="M292,534.8c0,0-0.1-1.8-0.2-5.3c-0.1-3.5-0.4-8.6-0.5-15c-0.3-12.9-1-31.4-1.4-53.6c-0.2-11.1-0.5-23.1-0.6-35.8c-0.2-12.7-0.3-26.1-0.5-40c-0.1-13.9-0.3-28.2-0.3-42.8c0-14.6-0.1-29.4-0.1-44.2c0-14.8,0.1-29.6,0.1-44.2c0-14.6,0.2-28.9,0.3-42.8c0.1-13.9,0.3-27.3,0.5-40c0.2-12.7,0.4-24.7,0.6-35.8c0.2-11.1,0.5-21.3,0.7-30.3c0.2-9,0.5-16.9,0.6-23.4c0.2-6.5,0.4-11.6,0.5-15c0.1-3.5,0.2-5.3,0.2-5.3s0.1,1.8,0.2,5.3c0.1,3.5,0.4,8.6,0.5,15c0.2,6.5,0.4,14.3,0.6,23.4c0.3,9,0.5,19.2,0.7,30.3c0.2,11.1,0.5,23.1,0.6,35.8c0.2,12.7,0.4,26.1,0.5,40c0.1,13.9,0.3,28.2,0.3,42.8c0,14.6,0.1,29.4,0.1,44.2c0,14.8-0.1,29.6-0.1,44.2c0,14.6-0.2,28.9-0.3,42.8c-0.2,13.9-0.3,27.3-0.5,40c-0.2,12.7-0.4,24.7-0.6,35.8c-0.4,22.2-1.1,40.7-1.4,53.6c-0.2,6.5-0.4,11.6-0.5,15C292.1,533,292,534.8,292,534.8z"/>
      <path fill="url(#ph_le)" d="M37,534.8c0,0-0.1-1.8-0.2-5.3c-0.1-3.5-0.4-8.6-0.5-15c-0.3-12.9-1-31.4-1.4-53.6c-0.2-11.1-0.5-23.1-0.6-35.8c-0.2-12.7-0.3-26.1-0.5-40c-0.1-13.9-0.3-28.2-0.3-42.8c0-14.6-0.1-29.4-0.1-44.2c0-14.8,0.1-29.6,0.1-44.2c0-14.6,0.2-28.9,0.3-42.8c0.1-13.9,0.3-27.3,0.5-40c0.2-12.7,0.4-24.7,0.6-35.8c0.2-11.1,0.5-21.3,0.7-30.3c0.2-9,0.5-16.9,0.6-23.4c0.2-6.5,0.4-11.6,0.5-15c0.1-3.5,0.2-5.3,0.2-5.3s0.1,1.8,0.2,5.3c0.1,3.5,0.4,8.6,0.5,15c0.2,6.5,0.4,14.3,0.6,23.4c0.3,9,0.5,19.2,0.7,30.3c0.2,11.1,0.5,23.1,0.6,35.8c0.2,12.7,0.4,26.1,0.5,40c0.1,13.9,0.3,28.2,0.3,42.8c0,14.6,0.1,29.4,0.1,44.2c0,14.8-0.1,29.6-0.1,44.2c0,14.6-0.2,28.9-0.3,42.8c-0.2,13.9-0.3,27.3-0.5,40c-0.2,12.7-0.4,24.7-0.6,35.8c-0.4,22.2-1.1,40.7-1.4,53.6c-0.2,6.5-0.4,11.6-0.5,15C37.1,533,37,534.8,37,534.8z"/>
      <path fill="url(#ph_te)" d="M67.5,28.7c0,0,3-0.2,8.2-0.4c5.2-0.2,12.6-0.5,21.6-0.7c8.9-0.2,19.3-0.4,30.5-0.6c5.6-0.1,11.3-0.1,17.2-0.2c5.9,0,11.8,0,17.7-0.1c5.9,0,11.9,0,17.7,0.1c5.9,0.1,11.6,0.1,17.2,0.2c11.2,0.1,21.6,0.3,30.5,0.6c8.9,0.2,16.4,0.5,21.6,0.7c5.2,0.2,8.2,0.4,8.2,0.4s-3,0.2-8.2,0.4c-5.2,0.2-12.6,0.5-21.6,0.7c-8.9,0.2-19.3,0.4-30.5,0.6c-5.6,0-11.3,0.1-17.2,0.2c-5.9,0-11.8,0-17.7,0.1c-5.9,0-11.9,0-17.7-0.1c-5.9-0.1-11.6-0.1-17.2-0.2c-11.2-0.1-21.6-0.3-30.5-0.6c-8.9-0.2-16.4-0.5-21.6-0.7C70.5,28.9,67.5,28.7,67.5,28.7z"/>
      <path fill="url(#ph_be)" d="M67.5,564.5c0,0,3-0.2,8.2-0.4c5.2-0.2,12.6-0.5,21.6-0.7c8.9-0.2,19.3-0.4,30.5-0.6c5.6-0.1,11.3-0.1,17.2-0.2c5.9,0,11.8,0,17.7-0.1c5.9,0,11.9,0,17.7,0.1c5.9,0.1,11.6,0.1,17.2,0.2c11.2,0.1,21.6,0.3,30.5,0.6c8.9,0.2,16.4,0.5,21.6,0.7c5.2,0.2,8.2,0.4,8.2,0.4s-3,0.2-8.2,0.4c-5.2,0.2-12.6,0.5-21.6,0.7c-8.9,0.2-19.3,0.4-30.5,0.6c-5.6,0-11.3,0.1-17.2,0.2c-5.9,0-11.8,0-17.7,0.1c-5.9,0-11.9,0-17.7-0.1c-5.9-0.1-11.6-0.1-17.2-0.2c-11.2-0.1-21.6-0.3-30.5-0.6c-8.9-0.2-16.4-0.5-21.6-0.7C70.5,564.6,67.5,564.5,67.5,564.5z"/>

      {/* 5 ── Screen content — LAST so it renders on top of the phone body */}
      {/*
        Screen glass bounding box (derived from clipPath):
          left x=40.6  top y=33.3  right x=288.4  bottom y=559.8
          → width=247.8  height=526.5
        foreignObject is positioned exactly here so the scroll container
        fills the screen glass area and nowhere else.
      */}
      <g clipPath="url(#ph_clip)">
        <foreignObject x="40.6" y="33.3" width="247.8" height="526.5">
          {/* @ts-ignore */}
          <div xmlns="http://www.w3.org/1999/xhtml"
            style={{ width:"100%", height:"100%", overflow:"hidden" }}>
            {children}
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}

/* ── Simulated mobile webpage ───────────────────────────────────────────────── */
function MobilePage({ images, title }: { images:string[]; title:string }) {
  return (
    <div style={{ minHeight:"200%", fontFamily:"'Inter', sans-serif" }}>

      {/* Sticky nav */}
      <div style={{ position:"sticky", top:0, zIndex:5, background:"#0d0d0d",
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px" }}>
        <span style={{ color:CYAN, fontFamily:"'Montserrat', sans-serif",
          fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase" }}>{title}</span>
        <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
          {[0,1,2].map(i=><span key={i} style={{ display:"block", width:"14px", height:"1px", background:"rgba(255,255,255,0.5)" }}/>)}
        </div>
      </div>

      {/* Hero */}
      {images[0] && (
        <div style={{ aspectRatio:"4/3", width:"100%" }}>
          <img src={images[0]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
      )}

      {/* Text block */}
      <div style={{ padding:"16px 12px", background:"#191919" }}>
        <div style={{ width:"24px", height:"2px", background:CYAN, marginBottom:"8px" }}/>
        <div style={{ width:"75%", height:"9px", borderRadius:"2px", background:"rgba(255,255,255,0.28)", marginBottom:"6px" }}/>
        <div style={{ width:"100%", height:"6px", borderRadius:"2px", background:"rgba(255,255,255,0.13)", marginBottom:"4px" }}/>
        <div style={{ width:"85%",  height:"6px", borderRadius:"2px", background:"rgba(255,255,255,0.13)", marginBottom:"12px" }}/>
        <div style={{ display:"inline-block", padding:"5px 12px", background:CYAN,
          color:"#111", fontSize:"7px", letterSpacing:"0.2em",
          textTransform:"uppercase", fontFamily:"'DM Mono', monospace" }}>Explore</div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", background:"#111" }}>
        {["+340%","4.9★","8.4k"].map((v,i)=>(
          <div key={i} style={{ flex:1, padding:"12px 8px", textAlign:"center",
            borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none" }}>
            <div style={{ color:CYAN, fontSize:"11px", fontFamily:"'Montserrat', sans-serif", marginBottom:"3px" }}>{v}</div>
            <div style={{ width:"80%", height:"5px", borderRadius:"2px",
              background:"rgba(255,255,255,0.15)", margin:"0 auto" }}/>
          </div>
        ))}
      </div>

      {/* Image 2 */}
      {images[1] && (
        <div style={{ aspectRatio:"4/3", width:"100%" }}>
          <img src={images[1]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
      )}

      {/* Feature grid */}
      <div style={{ padding:"14px 10px", background:"#1a1a1a",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
        <div style={{ color:CYAN, fontSize:"7px", letterSpacing:"0.25em",
          textTransform:"uppercase", fontFamily:"'DM Mono', monospace",
          gridColumn:"1/-1", marginBottom:"4px" }}>What we do</div>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{ padding:"10px 8px", background:"rgba(255,255,255,0.04)",
            border:`1px solid rgba(${CYAN_RGB},0.15)` }}>
            <div style={{ width:"12px", height:"12px", background:`rgba(${CYAN_RGB},0.25)`,
              marginBottom:"6px", borderRadius:"2px" }}/>
            <div style={{ height:"6px", borderRadius:"2px", background:"rgba(255,255,255,0.22)", marginBottom:"4px" }}/>
            <div style={{ height:"5px", borderRadius:"2px", width:"70%", background:"rgba(255,255,255,0.1)" }}/>
          </div>
        ))}
      </div>

      {/* Image 3 */}
      {images[2] && (
        <div style={{ aspectRatio:"4/3", width:"100%" }}>
          <img src={images[2]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(0.85)" }}/>
        </div>
      )}

      {/* Testimonial */}
      <div style={{ padding:"16px 12px", background:"#141414" }}>
        <div style={{ color:CYAN, fontSize:"7px", letterSpacing:"0.25em",
          textTransform:"uppercase", fontFamily:"'DM Mono', monospace", marginBottom:"8px" }}>Client stories</div>
        <div style={{ borderLeft:`2px solid ${CYAN}`, paddingLeft:"8px" }}>
          <div style={{ height:"6px", borderRadius:"2px", background:"rgba(255,255,255,0.2)", marginBottom:"4px" }}/>
          <div style={{ height:"6px", borderRadius:"2px", width:"90%", background:"rgba(255,255,255,0.15)", marginBottom:"4px" }}/>
          <div style={{ height:"6px", borderRadius:"2px", width:"75%", background:"rgba(255,255,255,0.13)" }}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"10px" }}>
          <div style={{ width:"20px", height:"20px", borderRadius:"50%",
            background:`rgba(${CYAN_RGB},0.2)`, flexShrink:0 }}/>
          <div>
            <div style={{ height:"5px", width:"50px", borderRadius:"2px", background:"rgba(255,255,255,0.25)", marginBottom:"3px" }}/>
            <div style={{ height:"4px", width:"35px", borderRadius:"2px", background:"rgba(255,255,255,0.12)" }}/>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:"20px 12px", background:"#0d0d0d", textAlign:"center" }}>
        <div style={{ width:"24px", height:"1px", background:CYAN, margin:"0 auto 8px" }}/>
        <div style={{ height:"9px", width:"80%", borderRadius:"2px",
          background:"rgba(255,255,255,0.25)", margin:"0 auto 6px" }}/>
        <div style={{ height:"6px", width:"65%", borderRadius:"2px",
          background:"rgba(255,255,255,0.13)", margin:"0 auto 14px" }}/>
        <div style={{ display:"inline-block", padding:"6px 16px", background:CYAN,
          color:"#111", fontSize:"7px", letterSpacing:"0.2em",
          textTransform:"uppercase", fontFamily:"'DM Mono', monospace" }}>Get in Touch</div>
      </div>

      {/* Footer */}
      <div style={{ padding:"12px", background:"#080808" }}>
        <div style={{ color:CYAN, fontFamily:"'Montserrat', sans-serif",
          fontSize:"7px", letterSpacing:"0.2em", marginBottom:"6px" }}>{title}</div>
        <div style={{ display:"flex", gap:"10px" }}>
          {["Home","Work","Contact"].map(l=>(
            <span key={l} style={{ fontSize:"6px", letterSpacing:"0.15em",
              textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}