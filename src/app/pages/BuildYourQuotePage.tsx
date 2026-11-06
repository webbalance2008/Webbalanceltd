import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Layout,
  Code2,
  TrendingUp,
  Server,
  Palette,
} from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Department data ──────────────────────────────────────────────────────────
const departments = [
  { key: "web-design", label: "Web Design",  description: "Websites that convert visitors into customers", color: "#00d4e8", bg: "rgba(0,212,232,0.07)",   border: "rgba(0,212,232,0.45)",   icon: Layout,     href: "/web-design/start" },
  { key: "web-apps",   label: "Web Apps",    description: "Bespoke applications & custom platforms",       color: "#b89fd4", bg: "rgba(184,159,212,0.07)", border: "rgba(184,159,212,0.45)", icon: Code2,      href: "/web-apps/start" },
  { key: "seo",        label: "SEO",         description: "Dominate search & drive organic growth",        color: "#3dd68c", bg: "rgba(61,214,140,0.07)",  border: "rgba(61,214,140,0.45)",  icon: TrendingUp, href: "/seo/start" },
  { key: "hosting",    label: "Hosting",     description: "Fast, secure, fully managed hosting",           color: "#f59e6a", bg: "rgba(245,158,106,0.07)", border: "rgba(245,158,106,0.45)", icon: Server,     href: "/hosting/start" },
  { key: "branding",   label: "Branding",    description: "Identity design that makes you unforgettable", color: "#f472b6", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.45)", icon: Palette,    href: "/branding/start" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1668713239048-0746aac1fec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvamVjdCUyMHBsYW5uaW5nJTIwd29ya3NwYWNlJTIwZGFya3xlbnwxfHx8fDE3NzM1MTk0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Page ─────────────────────────────────────────────────────────────────────
export function BuildYourQuotePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <>
      <SEOHead
        title="Build Your Website Quote | Web Balance"
        description="Walk through a tailored brief, get an accurate website quote and review payment options — all in minutes. Start your project with Web Balance today."
        path="/build-your-quote"
        keywords="website quote, web design cost, project brief, get a quote, web development pricing"
      />

      <div className="min-h-screen" style={{ background: "#16212e" }}>

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <DepartmentHero
          label="Get Started"
          heading={
            <>
              Build your{" "}
              <span style={{ color: "#00d4e8" }}>quote</span>.
            </>
          }
          subtitle="Walk through a tailored brief and we'll scope your project precisely."
          accent="#00d4e8"
          patternId="byq"
        />

        {/* ─── DEPARTMENT SELECTOR ──────────────────────────────────── */}
        <div className="relative" style={{ backgroundColor: "#1d2d3e" }}>
          <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, #16212e, transparent)" }} />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-14 pt-20 pb-24">
            <motion.div
              initial={isMobile ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {/* Section label */}
              <p
                className="flex items-center gap-3 mb-10"
                style={{ fontFamily: "'DM Mono', monospace", color: "#00d4e8", fontSize: "0.6875rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                <span style={{ width: "1rem", height: "1px", backgroundColor: "#00d4e8", display: "inline-block" }} />
                Choose a Department
              </p>

              {/* Department grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.key}
                      type="button"
                      onClick={() => navigate(dept.href)}
                      className="group relative flex flex-col items-start gap-5 p-8 text-left transition-all duration-300"
                      style={{ borderWidth: 1, borderStyle: "solid", borderColor: dept.border, background: dept.bg }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = dept.bg.replace("0.07", "0.14");
                        e.currentTarget.style.borderColor = dept.border.replace("0.45", "0.7");
                        const icon = e.currentTarget.querySelector<HTMLElement>(".dept-icon");
                        const label = e.currentTarget.querySelector<HTMLElement>(".dept-label");
                        if (icon) icon.style.color = "#fff";
                        if (label) label.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = dept.bg;
                        e.currentTarget.style.borderColor = dept.border;
                        const icon = e.currentTarget.querySelector<HTMLElement>(".dept-icon");
                        const label = e.currentTarget.querySelector<HTMLElement>(".dept-label");
                        if (icon) icon.style.color = dept.color;
                        if (label) label.style.color = dept.color;
                      }}
                    >
                      <div className="dept-icon" style={{ color: dept.color, transition: "color 0.2s" }}>
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="dept-label" style={{ fontFamily: "'Montserrat', sans-serif", color: dept.color, fontWeight: 300, fontSize: "1.125rem", marginBottom: "0.4rem", transition: "color 0.2s" }}>
                          {dept.label}
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                          {dept.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: dept.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(22,33,46,0.4) 0%, transparent 100%)" }} />
        </div>
      </div>
    </>
  );
}