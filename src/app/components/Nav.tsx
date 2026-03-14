import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router";
import { WebBalanceLogo } from "./WebBalanceLogo";
import { getServiceColors, type ServiceKey } from "../utils/serviceColors";

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string; description?: string }[];
  serviceKey?: ServiceKey;
}

// Map navigation items to service colors
const navItems: NavItem[] = [
  {
    label: "Web Apps",
    serviceKey: "web-apps",
    children: [
      { label: "Introduction", path: "/web-apps", description: "Custom web application development" },
      { label: "Booking Systems", path: "/web-apps/booking-systems", description: "Take reservations 24/7" },
      { label: "Customer Portals", path: "/web-apps/customer-portals", description: "Branded account dashboards" },
      { label: "SaaS Platforms", path: "/web-apps/saas-platforms", description: "Multi-tenant software products" },
      { label: "E-Commerce Stores", path: "/web-apps/ecommerce-stores", description: "Sell online on your terms" },
      { label: "Membership Platforms", path: "/web-apps/membership-platforms", description: "Recurring revenue & loyalty" },
      { label: "Internal Tools", path: "/web-apps/internal-tools", description: "Replace spreadsheets with software" },
      { label: "Start Your Project", path: "/web-apps/start", description: "Get a tailored quote" },
    ],
  },
  {
    label: "Web Design",
    serviceKey: "web-design",
    children: [
      { label: "Introduction", path: "/web-design", description: "Bespoke website design" },
      { label: "Start Your Project", path: "/web-design/start", description: "Begin your journey" },
      { label: "Portfolio", path: "/web-design/portfolio", description: "Our recent work" },
      { label: "Packages", path: "/web-design/packages", description: "Transparent pricing" },
    ],
  },
  { label: "SEO", serviceKey: "seo",
    children: [
      { label: "Introduction", path: "/seo", description: "Search engine optimisation services" },
      { label: "Start Your SEO Campaign", path: "/seo/start", description: "Get a tailored SEO proposal" },
    ],
  },
  { label: "Hosting", serviceKey: "hosting",
    children: [
      { label: "Introduction", path: "/hosting", description: "Managed hosting plans & infrastructure" },
      { label: "Get a Hosting Quote", path: "/hosting/start", description: "Find the right plan for your site" },
    ],
  },
  { label: "Branding & Marketing", serviceKey: "branding",
    children: [
      { label: "Introduction", path: "/branding", description: "Brand identity & marketing services" },
      { label: "Start Your Brand Project", path: "/branding/start", description: "Brief us on your branding needs" },
    ],
  },
  { label: "Insights", path: "/insights" },
  {
    label: "Our Reach",
    children: [
      { label: "Introduction", path: "/our-reach", description: "Digital services across Scotland" },
      { label: "Aberdeen", path: "/our-reach/aberdeen", description: "North East Scotland — Our HQ" },
      { label: "Edinburgh", path: "/our-reach/edinburgh", description: "Central Scotland" },
      { label: "Glasgow", path: "/our-reach/glasgow", description: "West Scotland" },
      { label: "Dundee", path: "/our-reach/dundee", description: "East Scotland" },
      { label: "Inverness", path: "/our-reach/inverness", description: "Highlands" },
      { label: "Perth", path: "/our-reach/perth", description: "Central Scotland" },
      { label: "Stirling", path: "/our-reach/stirling", description: "Central Scotland" },
      { label: "St Andrews", path: "/our-reach/st-andrews", description: "Fife" },
      { label: "Fort William", path: "/our-reach/fort-william", description: "Highlands" },
      { label: "Aviemore", path: "/our-reach/aviemore", description: "Cairngorms" },
    ],
  },
  { label: "Support", path: "/support", serviceKey: "support" },
  { label: "Contact", path: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        initial={{ y: -80, opacity: 0 }}
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

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const itemColors = item.serviceKey ? getServiceColors(item.serviceKey) : null;
              
              return item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-200"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      color: openDropdown === item.label && itemColors ? itemColors.primary : openDropdown === item.label ? "#00d4e8" : "rgba(255, 255, 255, 0.6)"
                    }}
                    onMouseEnter={(e) => {
                      if (itemColors) {
                        e.currentTarget.style.color = itemColors.primary;
                      } else {
                        e.currentTarget.style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openDropdown !== item.label) {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{
                        transform: openDropdown === item.label ? "rotate(180deg)" : "none",
                        color: openDropdown === item.label && itemColors ? itemColors.primary : openDropdown === item.label ? "#00d4e8" : undefined
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
                        className="absolute top-full left-0 mt-1 w-64 border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
                        style={{
                          background: itemColors ? itemColors.secondary : "#1d2d3e"
                        }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Top gradient bar */}
                        <div 
                          className="h-px"
                          style={{
                            background: itemColors 
                              ? `linear-gradient(to right, ${itemColors.primary}, transparent)`
                              : "linear-gradient(to right, #00d4e8, transparent)"
                          }}
                        />
                        <div className="py-3">
                          {item.children.map((child, i) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-5 py-3.5 group hover:bg-white/5 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <div
                                  className="text-white/80 group-hover:text-white text-sm transition-colors"
                                  style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div
                                    className="text-white/25 text-[11px] mt-0.5 group-hover:text-white/40 transition-colors"
                                    style={{ fontFamily: "'DM Mono', monospace" }}
                                  >
                                    {child.description}
                                  </div>
                                )}
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className="relative px-3 py-2 text-white/60 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors duration-200 group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                  <span 
                    className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{
                      backgroundColor: itemColors ? itemColors.primary : "#00A9A5"
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

      {/* ── Mobile Menu ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#16212e] overflow-y-auto"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-24 border-b border-white/5">
              <WebBalanceLogo className="h-16 w-auto" />
              <button className="text-white p-2" onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-1">
              {navItems.map((item, i) => {
                const itemColors = item.serviceKey ? getServiceColors(item.serviceKey) : null;
                
                return item.children ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
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
                          transform: mobileExpanded === item.label ? "rotate(180deg)" : "none",
                          color: mobileExpanded === item.label && itemColors ? itemColors.primary : mobileExpanded === item.label ? "#00d4e8" : undefined
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
                          <div 
                            className="pl-4 py-2 space-y-1 border-l ml-2 mb-2"
                            style={{
                              borderColor: itemColors ? `${itemColors.primary}40` : "rgba(0, 169, 165, 0.3)"
                            }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2.5 text-white/50 transition-colors text-sm"
                                style={{ 
                                  fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={(e) => {
                                  if (itemColors) {
                                    e.currentTarget.style.color = itemColors.primary;
                                  } else {
                                    e.currentTarget.style.color = "#00d4e8";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
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