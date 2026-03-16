import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router";
import { WebBalanceLogo } from "./WebBalanceLogo";
import { getServiceColors, type ServiceKey } from "../utils/serviceColors";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavChild {
  label: string;
  path: string;
  description?: string;
  primary?: boolean; // renders in the coloured top section
}

interface NavItem {
  label: string;
  path?: string;
  children?: NavChild[];
  serviceKey?: ServiceKey;
  secondaryLabel?: string; // section label for the secondary group
}

// ─── Nav data ────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  {
    label: "Web Apps",
    serviceKey: "web-apps",
    secondaryLabel: "What We Build",
    children: [
      { label: "Introduction", path: "/web-apps", description: "Custom web application development", primary: true },
      { label: "Packages", path: "/web-apps/packages", description: "Transparent pricing & tiers", primary: true },
      { label: "Start Your Project", path: "/web-apps/start", description: "Get a tailored quote", primary: true },
      { label: "Booking Systems", path: "/web-apps/booking-systems", description: "Take reservations 24/7" },
      { label: "Customer Portals", path: "/web-apps/customer-portals", description: "Branded account dashboards" },
      { label: "SaaS Platforms", path: "/web-apps/saas-platforms", description: "Multi-tenant software products" },
      { label: "E-Commerce Stores", path: "/web-apps/ecommerce-stores", description: "Sell online on your terms" },
      { label: "Membership Platforms", path: "/web-apps/membership-platforms", description: "Recurring revenue & loyalty" },
      { label: "Internal Tools", path: "/web-apps/internal-tools", description: "Replace spreadsheets with software" },
    ],
  },
  {
    label: "Web Design",
    serviceKey: "web-design",
    secondaryLabel: "Types We Design",
    children: [
      { label: "Introduction", path: "/web-design", description: "Bespoke website design", primary: true },
      { label: "Packages", path: "/web-design/packages", description: "Transparent pricing & tiers", primary: true },
      { label: "Start Your Project", path: "/web-design/start", description: "Begin your journey", primary: true },
      { label: "Portfolio", path: "/web-design/portfolio", description: "Our recent work", primary: true },
      { label: "Corporate & Business", path: "/web-design/corporate-websites", description: "Professional business websites" },
      { label: "E-Commerce", path: "/web-design/ecommerce-websites", description: "Online stores that convert" },
      { label: "Portfolio & Creative", path: "/web-design/portfolio-websites", description: "Showcase your best work" },
      { label: "Landing Pages", path: "/web-design/landing-pages", description: "High-converting campaign pages" },
      { label: "Blog & Content", path: "/web-design/blog-websites", description: "Content-driven websites" },
      { label: "Restaurant & Hospitality", path: "/web-design/restaurant-websites", description: "Venues that fill seats" },
    ],
  },
  {
    label: "SEO",
    serviceKey: "seo",
    children: [
      { label: "Introduction", path: "/seo", description: "Search engine optimisation services", primary: true },
      { label: "Packages", path: "/seo/packages", description: "Monthly SEO plans & pricing", primary: true },
      { label: "Start Your SEO Campaign", path: "/seo/start", description: "Get a tailored SEO proposal", primary: true },
    ],
  },
  {
    label: "Hosting",
    serviceKey: "hosting",
    children: [
      { label: "Introduction", path: "/hosting", description: "Managed hosting plans & infrastructure", primary: true },
      { label: "Packages", path: "/hosting/packages", description: "Hosting tiers & pricing", primary: true },
      { label: "Get a Hosting Quote", path: "/hosting/start", description: "Find the right plan for your site", primary: true },
    ],
  },
  {
    label: "Branding & Marketing",
    serviceKey: "branding",
    children: [
      { label: "Introduction", path: "/branding", description: "Brand identity & marketing services", primary: true },
      { label: "Packages", path: "/branding/packages", description: "Branding tiers & pricing", primary: true },
      { label: "Start Your Brand Project", path: "/branding/start", description: "Brief us on your branding needs", primary: true },
    ],
  },
  { label: "Packages", path: "/packages" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Insights", path: "/insights" },
  {
    label: "Contact",
    children: [
      { label: "Get in Touch", path: "/contact", description: "Send us a message" },
      { label: "Build Your Quote", path: "/build-your-quote", description: "Scope & price your project" },
      { label: "Our Reach", path: "/our-reach", description: "Digital services across Scotland" },
      { label: "Support", path: "/support", description: "Help & account support" },
    ],
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const goHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={isMobile ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/20 backdrop-blur-md border-b border-white/10"
            : "bg-transparent backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          {/* Logo */}
          <button onClick={goHome} className="flex items-center flex-shrink-0">
            <WebBalanceLogo className="h-16 w-auto" />
          </button>

          {/* ══════ Desktop Nav ══════ */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const itemColors = item.serviceKey
                ? getServiceColors(item.serviceKey)
                : null;
              const isRightAligned = item.label === "Contact";
              const isContact = item.label === "Contact";

              return item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1.5 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-300${isContact ? " rounded-xl px-5 py-2.5" : " px-2.5"}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      ...(isContact ? {
                        background: "linear-gradient(145deg, rgba(22,33,46,0.95) 0%, rgba(16,24,34,0.98) 100%)",
                        border: "1px solid rgba(0,212,232,0.15)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                        color: openDropdown === item.label ? "#00d4e8" : "rgba(0,212,232,0.7)",
                      } : {
                        color:
                          openDropdown === item.label && itemColors
                            ? itemColors.primary
                            : openDropdown === item.label
                            ? "#00d4e8"
                            : "rgba(255, 255, 255, 0.6)",
                      }),
                    }}
                    onMouseEnter={(e) => {
                      if (isContact) {
                        e.currentTarget.style.background = "linear-gradient(145deg, rgba(22,33,46,1) 0%, rgba(18,28,40,1) 100%)";
                        e.currentTarget.style.borderColor = "rgba(0,212,232,0.3)";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = "#00d4e8";
                      } else {
                        e.currentTarget.style.color = itemColors
                          ? itemColors.primary
                          : "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isContact) {
                        e.currentTarget.style.background = "linear-gradient(145deg, rgba(22,33,46,0.95) 0%, rgba(16,24,34,0.98) 100%)";
                        e.currentTarget.style.borderColor = "rgba(0,212,232,0.15)";
                        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
                        if (openDropdown !== item.label) {
                          e.currentTarget.style.color = "rgba(0,212,232,0.7)";
                        }
                      } else if (openDropdown !== item.label) {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{
                        transform:
                          openDropdown === item.label
                            ? "rotate(180deg)"
                            : "none",
                        color:
                          openDropdown === item.label && itemColors
                            ? itemColors.primary
                            : openDropdown === item.label
                            ? "#00d4e8"
                            : undefined,
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={`absolute top-full mt-1 min-w-[16rem] w-max border border-white/10 shadow-2xl shadow-black/60 overflow-hidden ${isRightAligned ? 'right-0' : 'left-0'}`}
                        style={{
                          background: itemColors
                            ? itemColors.secondary
                            : "#1d2d3e",
                        }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                      >
                        {/* Top gradient bar */}
                        <div
                          className="h-px"
                          style={{
                            background: itemColors
                              ? `linear-gradient(to right, ${itemColors.primary}, transparent)`
                              : "linear-gradient(to right, #00d4e8, transparent)",
                          }}
                        />

                        {/* ── Render sectioned dropdown for service departments ── */}
                        {renderDropdownContent(item, itemColors, setOpenDropdown)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className="relative px-3 py-2 text-white/60 hover:text-white text-xs tracking-[0.1em] uppercase transition-colors duration-200 group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{
                      backgroundColor: itemColors
                        ? itemColors.primary
                        : "#00A9A5",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* ══════ Mobile Menu ══════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#16212e] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 h-24 border-b border-white/5">
              <WebBalanceLogo className="h-16 w-auto" />
              <button
                className="text-white p-2"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-1">
              {navItems.map((item, i) => {
                const itemColors = item.serviceKey
                  ? getServiceColors(item.serviceKey)
                  : null;

                return item.children ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between py-4 border-b border-white/5 text-white/70 hover:text-white transition-colors"
                    >
                      <span
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-2xl"
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-200"
                        style={{
                          transform:
                            mobileExpanded === item.label
                              ? "rotate(180deg)"
                              : "none",
                          color:
                            mobileExpanded === item.label && itemColors
                              ? itemColors.primary
                              : mobileExpanded === item.label
                              ? "#00d4e8"
                              : undefined,
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {renderMobileDropdownContent(
                            item,
                            itemColors,
                            () => setMenuOpen(false)
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path!}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 border-b border-white/5 text-white/70 hover:text-white transition-colors"
                    >
                      <span
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-2xl"
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Desktop dropdown renderer ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function renderDropdownContent(
  item: NavItem,
  itemColors: ReturnType<typeof getServiceColors> | null,
  setOpenDropdown: (v: string | null) => void
) {
  const children = item.children!;
  const primaryItems = children.filter((c) => c.primary);
  const secondaryItems = children.filter((c) => !c.primary);
  const hasSections = primaryItems.length > 0 && secondaryItems.length > 0;
  const isContact = item.label === "Contact";

  // ── Contact dropdown — keep existing divider logic ──
  if (isContact) {
    return (
      <div className="py-3">
        {children.map((child, i) => {
          const showReachDivider = child.path === "/our-reach";
          const showSupportDivider = child.path === "/support";
          return (
            <div key={child.path}>
              {showReachDivider && (
                <div className="px-5 pt-3 pb-1">
                  <div
                    className="h-px mb-3"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.75rem",
                      letterSpacing: "0.25em",
                      color: "rgba(0,212,232,0.5)",
                      textTransform: "uppercase",
                    }}
                  >
                    Our Reach
                  </p>
                </div>
              )}
              {showSupportDivider && (
                <div className="px-5 pt-3 pb-1">
                  <div
                    className="h-px mb-3"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                </div>
              )}
              <DropdownLink
                child={child}
                index={i}
                onClose={() => setOpenDropdown(null)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // ── Service department dropdowns — primary section + optional secondary ──
  if (hasSections) {
    let animIndex = 0;
    return (
      <>
        {/* Primary section — coloured background */}
        <div
          style={{
            background: itemColors
              ? `rgba(${itemColors.rgb}, 0.06)`
              : "transparent",
          }}
        >
          <div className="py-2.5">
            {primaryItems.map((child) => {
              const idx = animIndex++;
              return (
                <DropdownLink
                  key={child.path}
                  child={child}
                  index={idx}
                  onClose={() => setOpenDropdown(null)}
                  accentColor={itemColors?.primary}
                />
              );
            })}
          </div>
        </div>

        {/* Divider + section label */}
        <div className="px-5 pt-3 pb-1.5">
          <div
            className="h-px mb-3"
            style={{
              background: itemColors
                ? `rgba(${itemColors.rgb}, 0.12)`
                : "rgba(255,255,255,0.07)",
            }}
          />
          {item.secondaryLabel && (
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                color: itemColors
                  ? `${itemColors.primary}80`
                  : "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}
            >
              {item.secondaryLabel}
            </p>
          )}
        </div>

        {/* Secondary items */}
        <div className="pb-3">
          {secondaryItems.map((child) => {
            const idx = animIndex++;
            return (
              <DropdownLink
                key={child.path}
                child={child}
                index={idx}
                onClose={() => setOpenDropdown(null)}
                accentColor={itemColors?.primary}
              />
            );
          })}
        </div>
      </>
    );
  }

  // ── All-primary (SEO, Hosting, Branding) — entire dropdown is coloured ──
  return (
    <div
      style={{
        background: itemColors
          ? `rgba(${itemColors.rgb}, 0.06)`
          : "transparent",
      }}
    >
      <div className="py-2.5">
        {children.map((child, i) => (
          <DropdownLink
            key={child.path}
            child={child}
            index={i}
            onClose={() => setOpenDropdown(null)}
            accentColor={itemColors?.primary}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Individual dropdown link ─────────────────────────────────────────────────
function DropdownLink({
  child,
  index,
  onClose,
  accentColor,
}: {
  child: NavChild;
  index: number;
  onClose: () => void;
  accentColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const fallbackAccent = "#00d4e8";
  const accent = accentColor || fallbackAccent;

  return (
    <Link
      to={child.path}
      className="relative block transition-all duration-700 ease-in-out"
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "0.75rem 1.25rem 0.75rem 1.5rem",
        background: hovered ? "rgba(255,255,255,0.035)" : "transparent",
      }}
    >
      {/* ── Animated left accent bar ── */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px]"
        style={{
          height: hovered ? "60%" : "0%",
          opacity: hovered ? 1 : 0,
          backgroundColor: accent,
          boxShadow: hovered ? `0 0 8px ${accent}40` : "none",
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {/* Label */}
        <div
          className="text-[0.9375rem] whitespace-nowrap"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {child.label}
        </div>

        {/* Description — always takes space, fades/slides in on hover */}
        {child.description && (
          <div
            className="text-[11.5px] mt-1 whitespace-nowrap"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: `${accent}cc`,
              transform: hovered
                ? "translateY(0)"
                : "translateY(3px)",
              opacity: hovered ? 1 : 0,
              lineHeight: 1.4,
              height: "1.1em",
              transition: "opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s",
            }}
          >
            {child.description}
          </div>
        )}
      </motion.div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Mobile dropdown renderer ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function renderMobileDropdownContent(
  item: NavItem,
  itemColors: ReturnType<typeof getServiceColors> | null,
  onClose: () => void
) {
  const children = item.children!;
  const primaryItems = children.filter((c) => c.primary);
  const secondaryItems = children.filter((c) => !c.primary);
  const hasSections = primaryItems.length > 0 && secondaryItems.length > 0;

  const linkStyle = (accent?: boolean) => ({
    fontFamily: "'Inter', sans-serif" as const,
  });

  const renderLink = (child: NavChild, accent?: boolean) => (
    <Link
      key={child.path}
      to={child.path}
      onClick={onClose}
      className="block py-2.5 transition-colors text-lg"
      style={{
        ...linkStyle(accent),
        color: accent
          ? "rgba(255,255,255,0.7)"
          : "rgba(255,255,255,0.5)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = itemColors
          ? itemColors.primary
          : "#00d4e8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = accent
          ? "rgba(255,255,255,0.7)"
          : "rgba(255,255,255,0.5)";
      }}
    >
      {child.label}
    </Link>
  );

  if (hasSections) {
    return (
      <div className="ml-2 mb-2">
        {/* Primary section with colored left border */}
        <div
          className="pl-4 py-2 space-y-0 border-l-2"
          style={{
            borderColor: itemColors
              ? itemColors.primary
              : "rgba(0,212,232,0.9)",
            background: itemColors
              ? `rgba(${itemColors.rgb}, 0.06)`
              : "transparent",
          }}
        >
          {primaryItems.map((child) => renderLink(child, true))}
        </div>

        {/* Section label */}
        {item.secondaryLabel && (
          <div className="pl-4 pt-3 pb-1">
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: itemColors
                  ? `${itemColors.primary}70`
                  : "rgba(255,255,255,0.25)",
              }}
            >
              {item.secondaryLabel}
            </p>
          </div>
        )}

        {/* Secondary items */}
        <div
          className="pl-4 py-1 space-y-0 border-l-2"
          style={{
            borderColor: itemColors
              ? `${itemColors.primary}bb`
              : "rgba(0,169,165,0.75)",
          }}
        >
          {secondaryItems.map((child) => renderLink(child))}
        </div>
      </div>
    );
  }

  // All-primary or no primary distinction (Contact, all-primary depts)
  return (
    <div
      className="pl-4 py-2 space-y-0 border-l-2 ml-2 mb-2"
      style={{
        borderColor: itemColors
          ? itemColors.primary
          : "rgba(0,212,232,0.9)",
      }}
    >
      {children.map((child) => renderLink(child))}
    </div>
  );
}