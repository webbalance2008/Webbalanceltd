import { useState } from "react";
import { Link } from "react-router";
import {
  Check,
  Minus,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { SEOHead } from "./SEOHead";
import {
  departmentPackages,
  type PackageTier,
  type DepartmentPackages,
} from "../data/packages";
import { getServiceColors, type ServiceKey } from "../utils/serviceColors";
import { DepartmentHero } from "./DepartmentHero";

interface DepartmentPackagePageProps {
  deptKey: string;
  seo: {
    title: string;
    description: string;
    path: string;
    keywords: string;
  };
  startPath: string;
  startLabel?: string;
}

export function DepartmentPackagePage({
  deptKey,
  seo,
  startPath,
  startLabel = "Start Your Project",
}: DepartmentPackagePageProps) {
  const dept = departmentPackages.find((d) => d.key === deptKey);
  if (!dept) return null;

  const serviceKey = deptKey as ServiceKey;
  const colors = getServiceColors(serviceKey);

  const [viewMode, setViewMode] = useState<"cards" | "compare">("cards");

  // Build merged feature list for comparison
  const allFeatures: string[] = [];
  const tierFeatureSet: Record<string, Set<string>> = {};
  for (const tier of dept.tiers) {
    tierFeatureSet[tier.id] = new Set(tier.features);
    for (const f of tier.features) {
      if (!allFeatures.includes(f)) allFeatures.push(f);
    }
  }

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
        keywords={seo.keywords}
      />
      <div style={{ backgroundColor: "#16212e", minHeight: "100vh" }}>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <DepartmentHero
          label={`${dept.label} Packages`}
          heading={
            <>
              {dept.label}
              <br />
              <span style={{ color: colors.primary }}>packages & pricing</span>.
            </>
          }
          subtitle={`${dept.tagline}. Choose the tier that fits your ambition — or mix & match across services in our package builder.`}
          accent={colors.primary}
          primaryCta={{ label: "Mix & Match Builder", to: "/packages", description: "Combine services across departments and build a custom bundle" }}
          secondaryCta={{ label: startLabel, to: startPath, description: "Jump straight in with a focused project in this department" }}
          patternId={`dp-${deptKey}`}
        />

        {/* ── View toggle ──────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 pt-2 sm:pt-4 pb-6">
          <div className="flex items-center justify-between">
            <p
              className="hidden sm:block"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {viewMode === "cards"
                ? "Choose your tier"
                : "Compare all tiers side-by-side"}
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
                onClick={() => setViewMode("cards")}
                className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:
                    viewMode === "cards"
                      ? colors.primary
                      : "rgba(255,255,255,0.75)",
                  background:
                    viewMode === "cards"
                      ? `rgba(${colors.rgb}, 0.08)`
                      : "transparent",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <List size={13} />
                Cards
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
                  color:
                    viewMode === "compare"
                      ? colors.primary
                      : "rgba(255,255,255,0.75)",
                  background:
                    viewMode === "compare"
                      ? `rgba(${colors.rgb}, 0.08)`
                      : "transparent",
                }}
              >
                <LayoutGrid size={13} />
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 pb-20">
          {viewMode === "cards" ? (
            /* ════ CARD VIEW ════ */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {dept.tiers.map((tier) => (
                <TierDetailCard
                  key={tier.id}
                  tier={tier}
                  dept={dept}
                  colors={colors}
                  startPath={startPath}
                  startLabel={startLabel}
                />
              ))}
            </div>
          ) : (
            /* ════ COMPARE VIEW ════ */
            <div
              className="overflow-x-auto"
              style={{
                border: `1px solid rgba(${colors.rgb}, 0.15)`,
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
                        color: "#ffffff",
                        borderBottom: `1px solid rgba(${colors.rgb}, 0.1)`,
                        width: "40%",
                      }}
                    >
                      Features
                    </th>
                    {dept.tiers.map((tier) => (
                      <th
                        key={tier.id}
                        className="text-center p-4"
                        style={{
                          borderBottom: `1px solid rgba(${colors.rgb}, 0.1)`,
                          borderLeft: `1px solid rgba(${colors.rgb}, 0.06)`,
                          width: `${60 / dept.tiers.length}%`,
                        }}
                      >
                        {tier.highlight && (
                          <span
                            className="inline-flex items-center gap-1 mb-2 px-2 py-0.5"
                            style={{
                              background: colors.primary,
                              color: "#16212e",
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "0.45rem",
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
                            color: colors.primary,
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
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "0.75rem",
                                marginLeft: "0.2rem",
                              }}
                            >
                              /mo
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr key={i}>
                      <td
                        className="p-3 pl-4"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#ffffff",
                          fontSize: "1rem",
                          lineHeight: 1.5,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {feature}
                      </td>
                      {dept.tiers.map((tier) => (
                        <td
                          key={tier.id}
                          className="text-center p-3"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            borderLeft: `1px solid rgba(${colors.rgb}, 0.06)`,
                          }}
                        >
                          {tierFeatureSet[tier.id].has(feature) ? (
                            <Check
                              size={14}
                              strokeWidth={2}
                              style={{ color: colors.primary, display: "inline" }}
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
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="p-4"
                      style={{
                        borderTop: `1px solid rgba(${colors.rgb}, 0.12)`,
                      }}
                    />
                    {dept.tiers.map((tier) => (
                      <td
                        key={tier.id}
                        className="p-4 text-center"
                        style={{
                          borderTop: `1px solid rgba(${colors.rgb}, 0.12)`,
                          borderLeft: `1px solid rgba(${colors.rgb}, 0.06)`,
                        }}
                      >
                        <Link
                          to={startPath}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 transition-all duration-200"
                          style={{
                            border: `1px solid rgba(${colors.rgb}, 0.3)`,
                            background: `rgba(${colors.rgb}, 0.06)`,
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.6875rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: colors.primary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.primary;
                            e.currentTarget.style.color = "#16212e";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `rgba(${colors.rgb}, 0.06)`;
                            e.currentTarget.style.color = colors.primary;
                          }}
                        >
                          Get Started
                          <ArrowRight size={10} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Tier Detail Card ─────────────────────────────────────────────────────────
function TierDetailCard({
  tier,
  dept,
  colors,
  startPath,
  startLabel,
}: {
  tier: PackageTier;
  dept: DepartmentPackages;
  colors: ReturnType<typeof getServiceColors>;
  startPath: string;
  startLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col p-6 transition-all duration-300"
      style={{
        border: `1px solid rgba(${colors.rgb}, ${hovered ? "0.35" : tier.highlight ? "0.25" : "0.12"})`,
        background: hovered
          ? "rgba(29,45,62,0.8)"
          : tier.highlight
          ? `rgba(${colors.rgb}, 0.04)`
          : "rgba(22,33,46,0.6)",
        boxShadow: tier.highlight
          ? `0 0 0 1px rgba(${colors.rgb}, 0.08), 0 8px 30px rgba(0,0,0,0.15)`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Popular badge */}
      {tier.highlight && (
        <div
          className="absolute top-0 right-0 flex items-center gap-1 px-2.5 py-1"
          style={{ background: colors.primary, color: "#16212e" }}
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

      {/* Tier name */}
      <div className="mb-2">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: colors.primary,
          }}
        >
          {tier.name}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#fff",
            fontWeight: 300,
            fontSize: "2.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          {tier.priceLabel.split(" ")[0]}
        </span>
        {tier.pricingType === "monthly" && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.8125rem",
              marginLeft: "0.3rem",
            }}
          >
            /mo
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#ffffff",
          fontSize: "1rem",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}
      >
        {tier.description}
      </p>

      {/* Divider */}
      <div
        className="mb-4"
        style={{
          height: 1,
          background: `rgba(${colors.rgb}, 0.12)`,
        }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1 mb-6">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              size={13}
              strokeWidth={2}
              className="mt-0.5 flex-shrink-0"
              style={{ color: colors.primary }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
                fontSize: "1rem",
                lineHeight: 1.5,
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={startPath}
        className="flex items-center justify-center gap-2 py-3.5 transition-all duration-200"
        style={{
          border: `1px solid rgba(${colors.rgb}, ${hovered ? "0.5" : "0.25"})`,
          background: hovered
            ? `rgba(${colors.rgb}, 0.12)`
            : `rgba(${colors.rgb}, 0.05)`,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: hovered ? colors.primary : "#ffffff",
        }}
      >
        {startLabel}
        <ArrowRight size={11} />
      </Link>
    </div>
  );
}