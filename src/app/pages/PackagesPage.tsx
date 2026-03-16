import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAnalytics } from "../hooks/useAnalytics";
import {
  Check,
  X,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Send,
  LayoutGrid,
  List,
  Minus,
} from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { sendEmail } from "../utils/sendEmail";
import { DepartmentHero } from "../components/DepartmentHero";
import {
  departmentPackages,
  type PackageTier,
  type DepartmentPackages,
} from "../data/packages";
import { usePricing } from "../hooks/usePricing";

// ─── Constants ───────────────────────────────────────────────────────────────

type Selections = Record<string, string | null>;
type ViewMode = "builder" | "compare";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("en-GB");
}

// ─── Page ────────────────────────────────────────────────────────────────────
export function PackagesPage() {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const { packages: livePackages } = usePricing();
  const activeDepts = livePackages.length > 0 ? livePackages : departmentPackages;

  const [selections, setSelections] = useState<Selections>(() =>
    Object.fromEntries(departmentPackages.map((d) => [d.key, null]))
  );
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("builder");
  const summaryRef = useRef<HTMLDivElement>(null);

  const toggleTier = (deptKey: string, tierId: string) => {
    setSelections((prev) => ({
      ...prev,
      [deptKey]: prev[deptKey] === tierId ? null : tierId,
    }));
  };

  // ── Compute totals ──
  const selectedItems = activeDepts
    .map((dept) => {
      const tierId = selections[dept.key];
      if (!tierId) return null;
      const tier = dept.tiers.find((t) => t.id === tierId);
      if (!tier) return null;
      return { dept, tier };
    })
    .filter(Boolean) as { dept: DepartmentPackages; tier: PackageTier }[];

  const itemCount = selectedItems.length;

  const rawOneTime = selectedItems
    .filter((i) => i.tier.pricingType === "one-time")
    .reduce((s, i) => s + i.tier.price, 0);
  const rawMonthly = selectedItems
    .filter((i) => i.tier.pricingType === "monthly")
    .reduce((s, i) => s + i.tier.price, 0);

  const finalOneTime = rawOneTime;
  const finalMonthly = rawMonthly;

  useEffect(() => {
    if (showSummary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showSummary]);

  // ── Submitted confirmation ──
  if (submitted) {
    return (
      <>
        <SEOHead
          title="Package Selection Received — Web Balance"
          description="Thank you for your package selection. Our team will be in touch shortly."
          path="/packages"
        />
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{ backgroundColor: "#16212e" }}
        >
          <div className="text-center max-w-lg">
            <div
              className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
              style={{ border: "1px solid #00d4e8", background: "rgba(0,212,232,0.08)" }}
            >
              <Check size={24} style={{ color: "#00d4e8" }} />
            </div>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#fff",
                fontWeight: 300,
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              Selection Received
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Thank you for building your package. A
              member of our team will review your selections and be in touch within
              24 hours with a detailed proposal.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-4 transition-colors"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.625rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: "1px solid #00d4e8",
                color: "#00d4e8",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00d4e8";
                e.currentTarget.style.color = "#16212e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#00d4e8";
              }}
            >
              Back to Home
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── Shared summary props ──
  const summaryProps = {
    selectedItems,
    rawOneTime,
    rawMonthly,
    finalOneTime,
    finalMonthly,
    itemCount,
    onRemove: (k: string) => setSelections((p) => ({ ...p, [k]: null })),
    onSubmit: () => {
      setSubmitted(true);
      trackEvent("quote_submit", {
        departments: selectedItems.map(i => i.dept.key),
        oneTimeTotal: finalOneTime,
        monthlyTotal: finalMonthly,
      });
      sendEmail("packages", {
        selections: selectedItems.map(i => `${i.dept.label}: ${i.tier.name} (£${fmt(i.tier.price)} ${i.tier.pricingType})`),
        oneTimeTotal: `£${fmt(finalOneTime)}`,
        monthlyTotal: `£${fmt(finalMonthly)}`,
      });
    },
    onClear: () =>
      setSelections(Object.fromEntries(activeDepts.map((d) => [d.key, null]))),
  };

  return (
    <>
      <SEOHead
        title="Packages — Mix &amp; Match Services | Web Balance"
        description="Build your perfect digital package. Mix and match Web Design, Web Apps, SEO, Hosting, and Branding services — see your total instantly."
        path="/packages"
        keywords="web design packages, digital services pricing, mix and match web services, website pricing UK"
      />
      <div style={{ backgroundColor: "#16212e", minHeight: "100vh" }}>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <DepartmentHero
          label="Packages"
          heading={
            <>
              Build your{" "}
              <span style={{ color: "#00d4e8" }}>perfect package</span>.
            </>
          }
          subtitle="Pick what you need from each service. Mix and match freely — your running total updates instantly. No obligation, no hidden fees."
          accent="#00d4e8"
          patternId="pkg"
        />

        {/* ── Stat pills ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 -mt-8 hidden sm:block pb-10">
            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "5 Services",
                "15 Packages",
                "Instant Quote",
                "No Obligation",
              ].map((pill) => (
                <span
                  key={pill}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "0.45rem 1rem",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
        </div>

        {/* ── View mode toggle ─────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 pt-2 sm:pt-4 pb-6">
          <div className="flex items-center justify-between">
            <p
              className="hidden sm:block"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {viewMode === "builder" ? "Select packages below" : "Compare all tiers side-by-side"}
            </p>
            <div
              className="flex items-center"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(22,33,46,0.6)",
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode("builder")}
                className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: viewMode === "builder" ? "#00d4e8" : "rgba(255,255,255,0.35)",
                  background:
                    viewMode === "builder" ? "rgba(0,212,232,0.08)" : "transparent",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <List size={13} />
                Builder
              </button>
              <button
                type="button"
                onClick={() => setViewMode("compare")}
                className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: viewMode === "compare" ? "#00d4e8" : "rgba(255,255,255,0.35)",
                  background:
                    viewMode === "compare" ? "rgba(0,212,232,0.08)" : "transparent",
                }}
              >
                <LayoutGrid size={13} />
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 pb-32">
          {viewMode === "builder" ? (
            /* ════════ BUILDER VIEW ════════ */
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0">
                {activeDepts.map((dept) => {
                  const DeptIcon = dept.icon;
                  const isExpanded = expandedDept === dept.key;
                  const selectedTier = selections[dept.key];

                  return (
                    <div key={dept.key} className="mb-4">
                      {/* Accordion header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedDept(isExpanded ? null : dept.key)
                        }
                        className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-all duration-300"
                        style={{
                          border: `1px solid rgba(${dept.rgb}, ${isExpanded ? "0.35" : "0.15"})`,
                          background: isExpanded
                            ? `rgba(${dept.rgb}, 0.06)`
                            : "rgba(22,33,46,0.7)",
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded)
                            e.currentTarget.style.borderColor = `rgba(${dept.rgb}, 0.3)`;
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded)
                            e.currentTarget.style.borderColor = `rgba(${dept.rgb}, 0.15)`;
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 10,
                              background: `rgba(${dept.rgb}, 0.12)`,
                              border: `1px solid rgba(${dept.rgb}, 0.25)`,
                            }}
                          >
                            <DeptIcon
                              size={18}
                              strokeWidth={1.5}
                              style={{ color: dept.color }}
                            />
                          </div>
                          <div>
                            <h3
                              style={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#fff",
                                fontWeight: 300,
                                fontSize: "1.125rem",
                              }}
                            >
                              {dept.label}
                            </h3>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "0.875rem",
                                marginTop: "0.15rem",
                              }}
                            >
                              {dept.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {selectedTier && (
                            <span
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "0.6875rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: dept.color,
                                border: `1px solid rgba(${dept.rgb}, 0.4)`,
                                background: `rgba(${dept.rgb}, 0.1)`,
                                padding: "0.25rem 0.6rem",
                              }}
                            >
                              {dept.tiers.find((t) => t.id === selectedTier)?.name}
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp size={16} style={{ color: dept.color }} />
                          ) : (
                            <ChevronDown
                              size={16}
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                          {dept.tiers.map((tier) => (
                            <TierCard
                              key={tier.id}
                              tier={tier}
                              dept={dept}
                              isSelected={selectedTier === tier.id}
                              onToggle={() => toggleTier(dept.key, tier.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sticky summary (desktop) */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky" style={{ top: 120 }}>
                  <SummaryPanel {...summaryProps} />
                </div>
              </div>
            </div>
          ) : (
            /* ════════ COMPARE VIEW ════════ */
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0 space-y-8">
                {activeDepts.map((dept) => (
                  <ComparisonTable
                    key={dept.key}
                    dept={dept}
                    selectedTier={selections[dept.key]}
                    onSelect={(tierId) => toggleTier(dept.key, tierId)}
                  />
                ))}
              </div>

              {/* Sticky summary (desktop) */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky" style={{ top: 120 }}>
                  <SummaryPanel {...summaryProps} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile floating bar ─────────────────────────────────── */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{
            background: "rgba(15,10,30,0.95)",
            borderTop: "1px solid rgba(0,212,232,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          {showSummary && (
            <div
              ref={summaryRef}
              className="px-6 pt-5 pb-3 max-h-[60vh] overflow-y-auto"
            >
              <SummaryPanel {...summaryProps} compact />
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex items-center justify-between px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={18} style={{ color: "#00d4e8" }} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[9px]"
                    style={{
                      background: "#00d4e8",
                      color: "#16212e",
                      borderRadius: "50%",
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#fff",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Your Package
              </span>
            </div>
            <div className="flex items-center gap-3">
              {(finalOneTime > 0 || finalMonthly > 0) && (
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#00d4e8",
                    fontWeight: 300,
                    fontSize: "1rem",
                  }}
                >
                  {finalOneTime > 0 && `£${fmt(finalOneTime)}`}
                  {finalOneTime > 0 && finalMonthly > 0 && " + "}
                  {finalMonthly > 0 && `£${fmt(finalMonthly)}/mo`}
                </span>
              )}
              {showSummary ? (
                <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              ) : (
                <ChevronUp size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Tier Card (Builder view) ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function TierCard({
  tier,
  dept,
  isSelected,
  onToggle,
}: {
  tier: PackageTier;
  dept: DepartmentPackages;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col text-left p-5 transition-all duration-300"
      style={{
        border: `1px solid rgba(${dept.rgb}, ${isSelected ? "0.5" : hovered ? "0.3" : "0.12"})`,
        background: isSelected
          ? `rgba(${dept.rgb}, 0.08)`
          : hovered
          ? "rgba(29,45,62,0.8)"
          : "rgba(22,33,46,0.6)",
        boxShadow: isSelected
          ? `0 0 0 1px rgba(${dept.rgb}, 0.15), 0 8px 30px rgba(0,0,0,0.2)`
          : "none",
      }}
    >
      {tier.highlight && (
        <div
          className="absolute top-0 right-0 flex items-center gap-1 px-2.5 py-1"
          style={{ background: dept.color, color: "#16212e" }}
        >
          <Sparkles size={10} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Popular
          </span>
        </div>
      )}

      <div
        className="absolute top-4 left-4 w-5 h-5 flex items-center justify-center transition-all duration-200"
        style={{
          border: `1.5px solid rgba(${dept.rgb}, ${isSelected ? "1" : "0.35"})`,
          borderRadius: 4,
          background: isSelected ? dept.color : "transparent",
        }}
      >
        {isSelected && (
          <Check size={12} strokeWidth={2.5} style={{ color: "#16212e" }} />
        )}
      </div>

      <div className="mt-7 mb-1">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: dept.color,
          }}
        >
          {tier.name}
        </span>
      </div>

      <div className="mb-3">
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#fff",
            fontWeight: 300,
            fontSize: "1.875rem",
            letterSpacing: "-0.02em",
          }}
        >
          {tier.priceLabel.split(" ")[0]}
        </span>
        {tier.pricingType === "monthly" && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.875rem",
              marginLeft: "0.25rem",
            }}
          >
            /mo
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.9375rem",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {tier.description}
      </p>

      <ul className="flex flex-col gap-2 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check
              size={12}
              strokeWidth={2}
              className="mt-0.5 flex-shrink-0"
              style={{ color: dept.color }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.6)",
                fontSize: "1rem",
                lineHeight: 1.5,
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-5 flex items-center justify-center py-3 transition-all duration-200"
        style={{
          border: `1px solid rgba(${dept.rgb}, ${isSelected ? "0.5" : "0.2"})`,
          background: isSelected
            ? `rgba(${dept.rgb}, 0.12)`
            : `rgba(${dept.rgb}, 0.04)`,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: isSelected ? dept.color : "rgba(255,255,255,0.45)",
          }}
        >
          {isSelected ? "Selected \u2713" : "Add to Package"}
        </span>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Comparison Table (Compare view) ──────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function ComparisonTable({
  dept,
  selectedTier,
  onSelect,
}: {
  dept: DepartmentPackages;
  selectedTier: string | null;
  onSelect: (tierId: string) => void;
}) {
  const DeptIcon = dept.icon;

  // Build a merged feature list preserving order of appearance
  const allFeatures: string[] = [];
  const tierFeatureSet: Record<string, Set<string>> = {};
  for (const tier of dept.tiers) {
    tierFeatureSet[tier.id] = new Set(tier.features);
    for (const f of tier.features) {
      if (!allFeatures.includes(f)) allFeatures.push(f);
    }
  }

  return (
    <div>
      {/* Department header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 9,
            background: `rgba(${dept.rgb}, 0.12)`,
            border: `1px solid rgba(${dept.rgb}, 0.25)`,
          }}
        >
          <DeptIcon size={17} strokeWidth={1.5} style={{ color: dept.color }} />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#fff",
              fontWeight: 300,
              fontSize: "1.125rem",
            }}
          >
            {dept.label}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.8125rem",
            }}
          >
            {dept.tagline}
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto"
        style={{
          border: `1px solid rgba(${dept.rgb}, 0.15)`,
          background: "rgba(22,33,46,0.5)",
        }}
      >
        <table className="w-full" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              <th
                className="text-left p-4"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  borderBottom: `1px solid rgba(${dept.rgb}, 0.1)`,
                  width: "40%",
                }}
              >
                Features
              </th>
              {dept.tiers.map((tier) => {
                const isSel = selectedTier === tier.id;
                return (
                  <th
                    key={tier.id}
                    className="text-center p-4"
                    style={{
                      borderBottom: `1px solid rgba(${dept.rgb}, 0.1)`,
                      borderLeft: `1px solid rgba(${dept.rgb}, 0.06)`,
                      background: isSel ? `rgba(${dept.rgb}, 0.06)` : "transparent",
                      width: "20%",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {tier.highlight && (
                      <span
                        className="inline-flex items-center gap-1 mb-2 px-2 py-0.5"
                        style={{
                          background: dept.color,
                          color: "#16212e",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.5625rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                        }}
                      >
                        <Sparkles size={8} /> Popular
                      </span>
                    )}
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: dept.color,
                      }}
                    >
                      {tier.name}
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#fff",
                        fontWeight: 300,
                        fontSize: "1.375rem",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {tier.priceLabel.split(" ")[0]}
                      {tier.pricingType === "monthly" && (
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "rgba(255,255,255,0.3)",
                            fontSize: "0.75rem",
                            marginLeft: "0.2rem",
                          }}
                        >
                          /mo
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, i) => (
              <tr key={i}>
                <td
                  className="p-3 pl-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.5,
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {feature}
                </td>
                {dept.tiers.map((tier) => {
                  const has = tierFeatureSet[tier.id].has(feature);
                  const isSel = selectedTier === tier.id;
                  return (
                    <td
                      key={tier.id}
                      className="text-center p-3"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        borderLeft: `1px solid rgba(${dept.rgb}, 0.06)`,
                        background: isSel
                          ? `rgba(${dept.rgb}, 0.04)`
                          : "transparent",
                        transition: "background 0.3s ease",
                      }}
                    >
                      {has ? (
                        <Check
                          size={14}
                          strokeWidth={2}
                          style={{ color: dept.color, display: "inline" }}
                        />
                      ) : (
                        <Minus
                          size={12}
                          style={{
                            color: "rgba(255,255,255,0.12)",
                            display: "inline",
                          }}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="p-4"
                style={{
                  borderTop: `1px solid rgba(${dept.rgb}, 0.12)`,
                }}
              />
              {dept.tiers.map((tier) => {
                const isSel = selectedTier === tier.id;
                return (
                  <td
                    key={tier.id}
                    className="p-4 text-center"
                    style={{
                      borderTop: `1px solid rgba(${dept.rgb}, 0.12)`,
                      borderLeft: `1px solid rgba(${dept.rgb}, 0.06)`,
                      background: isSel ? `rgba(${dept.rgb}, 0.06)` : "transparent",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(tier.id)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 transition-all duration-200"
                      style={{
                        border: `1px solid rgba(${dept.rgb}, ${isSel ? "0.6" : "0.25"})`,
                        background: isSel
                          ? `rgba(${dept.rgb}, 0.15)`
                          : `rgba(${dept.rgb}, 0.04)`,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.5rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: isSel ? dept.color : "rgba(255,255,255,0.5)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSel) {
                          e.currentTarget.style.borderColor = `rgba(${dept.rgb}, 0.45)`;
                          e.currentTarget.style.color = dept.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSel) {
                          e.currentTarget.style.borderColor = `rgba(${dept.rgb}, 0.25)`;
                          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                        }
                      }}
                    >
                      {isSel ? (
                        <>
                          <Check size={10} /> Selected
                        </>
                      ) : (
                        "Select"
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Summary Panel ────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
interface SummaryPanelProps {
  selectedItems: { dept: DepartmentPackages; tier: PackageTier }[];
  rawOneTime: number;
  rawMonthly: number;
  finalOneTime: number;
  finalMonthly: number;
  itemCount: number;
  onRemove: (deptKey: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  compact?: boolean;
}

function SummaryPanel({
  selectedItems,
  rawOneTime,
  rawMonthly,
  finalOneTime,
  finalMonthly,
  itemCount,
  onRemove,
  onSubmit,
  onClear,
  compact,
}: SummaryPanelProps) {
  const isEmpty = selectedItems.length === 0;

  return (
    <div
      style={{
        border: "1px solid rgba(0,212,232,0.15)",
        background: "rgba(22,33,46,0.85)",
        padding: compact ? "1rem" : "1.5rem",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p
          className="flex items-center gap-2"
          style={{
            fontFamily: "'DM Mono', monospace",
            color: "#00d4e8",
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          <ShoppingCart size={13} />
          Your Package
        </p>
        {!isEmpty && (
          <button
            type="button"
            onClick={onClear}
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
            }
          >
            Clear All
          </button>
        )}
      </div>

      {isEmpty ? (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          Select packages from each service to build your quote.
        </p>
      ) : (
        <>
          {/* Line items */}
          <div className="flex flex-col gap-2 mb-4">
            {selectedItems.map(({ dept, tier }) => (
              <div
                key={tier.id}
                className="flex items-center justify-between p-3"
                style={{
                  border: `1px solid rgba(${dept.rgb}, 0.15)`,
                  background: `rgba(${dept.rgb}, 0.04)`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: dept.color,
                      fontSize: "0.875rem",
                    }}
                  >
                    {dept.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tier.name} — {tier.priceLabel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(dept.key)}
                  className="ml-2 flex-shrink-0 transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ff6b6b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
                  }
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* ── Totals ── */}
          <div
            className="py-4 mb-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {rawOneTime > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.875rem",
                  }}
                >
                  One-time
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#fff",
                    fontWeight: 300,
                    fontSize: "1.125rem",
                  }}
                >
                  £{fmt(finalOneTime)}
                </span>
              </div>
            )}
            {rawMonthly > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.875rem",
                  }}
                >
                  Monthly
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#fff",
                    fontWeight: 300,
                    fontSize: "1.125rem",
                  }}
                >
                  £{fmt(finalMonthly)}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {" "}/mo
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={onSubmit}
            className="w-full flex items-center justify-center gap-2 py-3.5 transition-colors"
            style={{
              background: "#00d4e8",
              color: "#16212e",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#33e8fa")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#00d4e8")
            }
          >
            <Send size={12} />
            Submit Selection
          </button>

          <p
            className="text-center mt-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.75rem",
            }}
          >
            No payment required — we'll review and be in touch.
          </p>
        </>
      )}
    </div>
  );
}

export default PackagesPage;