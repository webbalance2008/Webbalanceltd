import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import * as Tabs from "@radix-ui/react-tabs";
import {
  BarChart2, Globe, DollarSign, LogOut, RefreshCw, Check, X,
  Plus, Trash2, Save, Eye, EyeOff, TrendingUp, Users, FileText, MousePointer,
} from "lucide-react";
import { supabase } from "../../utils/supabaseClient";
import { ProtectedRoute } from "../../components/admin/ProtectedRoute";
import { departmentPackages } from "../../data/packages";

// ─── Style constants ─────────────────────────────────────────────────────────
const MONO  = "'DM Mono', monospace";
const SANS  = "'Montserrat', sans-serif";
const BODY  = "'Inter', sans-serif";
const TEAL  = "#00d4e8";
const BG    = "#0e1822";
const CARD  = "#131f2c";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_url: string;
  session_id: string;
  referrer: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface SeoRow {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
  no_index: boolean;
  isNew?: boolean;
  isDirty?: boolean;
}

interface PricingRow {
  id: string;
  department: string;
  tier_key: string;
  name: string;
  price: number;
  price_type: "one-time" | "monthly";
  features: string[];
  highlight: boolean;
  display_order: number;
  isDirty?: boolean;
}

// ─── Site SEO defaults (hardcoded fallbacks for all known pages) ──────────────
const SITE_SEO_DEFAULTS: Omit<SeoRow, "id" | "isNew" | "isDirty">[] = [
  { page_path: "/",                    title: "Web Balance",                                       description: "Award-Winning Web Design & Development Agency",                                                                                                   keywords: "web design UK, bespoke website design, web development agency, SEO services, custom web apps, hosting, branding", og_image: "", no_index: false },
  { page_path: "/web-design",          title: "Web Design Services",                               description: "Bespoke, conversion-focused website design for ambitious UK brands. We craft beautiful, high-performance websites tailored to your business.",         keywords: "bespoke web design, website design UK, conversion-focused design, custom website, web design agency",              og_image: "", no_index: false },
  { page_path: "/web-design/start",    title: "Web Design Quote Builder",                          description: "Walk through our 7-step web design wizard to build a tailored quote for your bespoke website. Get a personalised estimate in minutes.",              keywords: "web design quote, website cost estimator, bespoke website wizard, UK web design pricing",                         og_image: "", no_index: false },
  { page_path: "/web-design/packages", title: "Web Design Packages & Pricing — Web Balance",      description: "Transparent web design packages for businesses of every size — from starter brochure sites to bespoke enterprise builds. No hidden fees.",            keywords: "web design pricing, website packages, web design cost UK, affordable web design",                                  og_image: "", no_index: false },
  { page_path: "/web-design/portfolio",title: "Web Design Portfolio",                              description: "Explore our portfolio of bespoke web design projects — from hospitality and healthcare to industrial and technology businesses across the UK.",        keywords: "web design portfolio, website examples, bespoke websites, UK web design work",                                     og_image: "", no_index: false },
  { page_path: "/web-apps",            title: "Custom Web App Development",                        description: "We build powerful, scalable custom web applications — from booking systems and SaaS platforms to customer portals and internal tools.",                keywords: "custom web app development, SaaS platform, booking system, customer portal, web application UK",                   og_image: "", no_index: false },
  { page_path: "/web-apps/start",      title: "Web App Quote Builder",                             description: "Walk through our 8-step web app wizard to scope your custom application and get a tailored estimate. Booking systems, portals, SaaS, and more.",     keywords: "web app quote, custom app cost, bespoke web application, UK web app development pricing",                         og_image: "", no_index: false },
  { page_path: "/web-apps/packages",   title: "Web App Packages & Pricing — Web Balance",         description: "Custom web application packages from MVP to Enterprise. Booking systems, portals, SaaS platforms — transparent pricing with no hidden fees.",         keywords: "web app pricing, custom software packages, web application cost UK, SaaS development pricing",                    og_image: "", no_index: false },
  { page_path: "/seo",                 title: "SEO Services",                                      description: "Strategy-led SEO that gets your business found on Google. Technical SEO, content strategy, link building, and local SEO — all built around measurable growth.", keywords: "SEO services UK, search engine optimisation, technical SEO, local SEO, content strategy, link building",          og_image: "", no_index: false },
  { page_path: "/seo/start",           title: "SEO Quote Builder",                                 description: "Walk through our SEO wizard to scope your search engine optimisation campaign. Get a tailored strategy estimate in minutes.",                         keywords: "SEO quote, search engine optimisation pricing, SEO cost estimator, UK SEO services",                               og_image: "", no_index: false },
  { page_path: "/seo/packages",        title: "SEO Packages & Pricing — Web Balance",              description: "Results-driven SEO packages from Foundation to Domination. Monthly plans with keyword research, content strategy, link building, and transparent reporting.", keywords: "SEO packages UK, SEO pricing, monthly SEO plans, search engine optimisation cost",                                og_image: "", no_index: false },
  { page_path: "/hosting",             title: "Managed Web Hosting",                               description: "Fast, secure, UK-based managed hosting for business websites. 99.9% uptime guarantee, daily backups, SSL, and expert support included.",               keywords: "managed web hosting UK, business website hosting, WordPress hosting, fast hosting, secure hosting",                og_image: "", no_index: false },
  { page_path: "/hosting/start",       title: "Hosting Quote Builder",                             description: "Configure your managed hosting plan with our step-by-step wizard. UK-based servers, daily backups, SSL, and expert support — get a tailored estimate.", keywords: "managed hosting quote, UK web hosting, hosting pricing, business hosting plan",                                    og_image: "", no_index: false },
  { page_path: "/hosting/packages",    title: "Hosting & Support Packages — Web Balance",         description: "Managed cloud hosting plans from Starter to Enterprise. SSL, daily backups, CDN, staging environments, and dedicated UK support included.",             keywords: "managed hosting UK, website hosting plans, cloud hosting pricing, web hosting packages",                          og_image: "", no_index: false },
  { page_path: "/branding",            title: "Branding & Identity Design",                        description: "We create distinctive brand identities for ambitious businesses — from logo design and visual systems to brand guidelines, print, and digital collateral.", keywords: "brand identity design, logo design UK, branding agency, visual identity, brand guidelines",                       og_image: "", no_index: false },
  { page_path: "/branding/start",      title: "Branding Quote Builder",                            description: "Walk through our branding wizard to scope your brand identity project. Logo design, brand guidelines, print, and more — get a tailored estimate.",      keywords: "branding quote, logo design pricing, brand identity cost, UK branding agency",                                     og_image: "", no_index: false },
  { page_path: "/branding/packages",   title: "Branding Packages & Pricing — Web Balance",        description: "Professional branding packages from Identity to Premium. Logo design, brand strategy, visual identity systems, and launch campaign assets.",             keywords: "branding packages UK, brand identity pricing, logo design cost, branding agency pricing",                         og_image: "", no_index: false },
  { page_path: "/packages",            title: "Packages — Mix & Match Services | Web Balance",    description: "Build your perfect digital package. Mix and match Web Design, Web Apps, SEO, Hosting, and Branding services — see your total instantly.",               keywords: "web design packages, digital services pricing, mix and match web services, website pricing UK",                   og_image: "", no_index: false },
  { page_path: "/build-your-quote",    title: "Build Your Quote | Web Balance",                    description: "Walk through a tailored brief, get an accurate project quote, and review payment options — all in minutes.",                                           keywords: "web design quote, website cost, project brief, get a quote, web development pricing",                              og_image: "", no_index: false },
  { page_path: "/contact",             title: "Contact Us",                                        description: "Get in touch with the Web Balance team. Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you.",       keywords: "contact web design agency, get a website quote, web design enquiry UK",                                           og_image: "", no_index: false },
  { page_path: "/support",             title: "Website Support & Maintenance Plans",               description: "Keep your website fast, secure, and always evolving with a Web Balance support plan. Monthly care packages from £49/mo.",                              keywords: "website support plan, web maintenance, website care plan, website management UK",                                  og_image: "", no_index: false },
  { page_path: "/insights",            title: "Insights — Web Design & Digital Marketing Blog",   description: "Practical articles on web design, SEO, branding, and digital strategy from the Web Balance team. Stay ahead of the curve.",                            keywords: "web design blog, digital marketing insights, SEO articles, website tips, UX design",                               og_image: "", no_index: false },
  { page_path: "/testimonials",        title: "Client Testimonials",                               description: "Hear from the businesses Web Balance has helped grow online. Real results, real relationships — from Aberdeen to Edinburgh and beyond.",                 keywords: "web design testimonials, client reviews, web agency reviews UK",                                                   og_image: "", no_index: false },
  { page_path: "/our-reach",           title: "Web Design & Digital Services Across the UK",      description: "Web Balance serves businesses across Scotland and the UK — from Edinburgh and Glasgow to London and Manchester. Local expertise, national reach.",         keywords: "web design Scotland, web design Glasgow, web design Edinburgh, UK web agency, local web design",                  og_image: "", no_index: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("en-GB");
}

function daysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const EVENT_COLORS: Record<string, string> = {
  page_view:    TEAL,
  form_submit:  "#3dd68c",
  gallery_click:"#b89fd4",
  contact_open: "#f59e6a",
  quote_submit: "#f472b6",
};

const DEPT_COLORS: Record<string, string> = {
  "web-apps":   "#b89fd4",
  "web-design": "#5ec4d4",
  "seo":        "#3dd68c",
  "hosting":    "#f59e6a",
  "branding":   "#f472b6",
};

// ─── Metric card ──────────────────────────────────────────────────────────────
function MetricCard({
  icon: Icon, label, value, sub, color = TEAL,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div
      className="flex items-start gap-4 p-5"
      style={{ background: CARD, border: `1px solid ${BORDER}` }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.65)", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {label}
        </p>
        <p style={{ fontFamily: SANS, color: "#fff", fontWeight: 300, fontSize: "1.75rem", lineHeight: 1.1 }} className="mt-1">
          {value}
        </p>
        {sub && <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.55)", fontSize: "0.8125rem" }} className="mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Analytics tab ───────────────────────────────────────────────────────────
function AnalyticsTab() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", daysAgo(30))
      .order("created_at", { ascending: false })
      .limit(2000);
    setEvents(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Aggregations ──
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7); weekAgo.setHours(0,0,0,0);
  const monthAgo = new Date(); monthAgo.setDate(monthAgo.getDate() - 30); monthAgo.setHours(0,0,0,0);

  const pageViews  = events.filter(e => e.event_type === "page_view");
  const sessions   = new Set(events.map(e => e.session_id)).size;
  const formSubmits = events.filter(e => e.event_type === "form_submit").length;
  const quoteSubmits = events.filter(e => e.event_type === "quote_submit").length;

  const todaySessions = new Set(
    events.filter(e => new Date(e.created_at) >= today).map(e => e.session_id)
  ).size;

  const weekSessions = new Set(
    events.filter(e => new Date(e.created_at) >= weekAgo).map(e => e.session_id)
  ).size;

  // ── Daily chart data (last 30 days) ──
  const dailyMap: Record<string, { page_view: number; form_submit: number; gallery_click: number; quote_submit: number }> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0,0,0,0);
    const key = d.toISOString().slice(0, 10);
    dailyMap[key] = { page_view: 0, form_submit: 0, gallery_click: 0, quote_submit: 0 };
  }
  for (const e of events) {
    const key = e.created_at.slice(0, 10);
    if (dailyMap[key] && (e.event_type in dailyMap[key])) {
      (dailyMap[key] as Record<string, number>)[e.event_type]++;
    }
  }
  const dailyData = Object.entries(dailyMap).map(([date, counts]) => ({
    date: formatDate(date + "T00:00:00"),
    ...counts,
  }));

  // ── Event type breakdown ──
  const typeCounts: Record<string, number> = {};
  for (const e of events) {
    typeCounts[e.event_type] = (typeCounts[e.event_type] ?? 0) + 1;
  }
  const typeData = Object.entries(typeCounts).map(([name, count]) => ({ name, count }));

  // ── Top pages ──
  const pageCounts: Record<string, number> = {};
  for (const e of pageViews) {
    pageCounts[e.page_url] = (pageCounts[e.page_url] ?? 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // ── Recent form submissions ──
  const recentForms = events
    .filter(e => e.event_type === "form_submit" || e.event_type === "quote_submit")
    .slice(0, 20);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users}      label="Visitors Today"   value={todaySessions}  sub={`${weekSessions} this week`} />
        <MetricCard icon={TrendingUp} label="Total Sessions"   value={sessions}        sub="last 30 days" color="#3dd68c" />
        <MetricCard icon={FileText}   label="Form Submissions" value={formSubmits}     sub="last 30 days" color="#f59e6a" />
        <MetricCard icon={MousePointer} label="Quote Requests" value={quoteSubmits}    sub="last 30 days" color="#f472b6" />
      </div>

      {/* Visitor trend line chart */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="p-6">
        <p style={{ fontFamily: MONO, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-5">
          Daily Activity — Last 30 Days
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={dailyData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tick={{ fontFamily: MONO, fontSize: 9, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} interval={4} />
            <YAxis tick={{ fontFamily: MONO, fontSize: 9, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#1a2a3a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 0, fontFamily: MONO, fontSize: 11 }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Legend wrapperStyle={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.5)" }} />
            <Line type="monotone" dataKey="page_view"    name="Page Views"    stroke={TEAL}      strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="form_submit"  name="Form Submits"  stroke="#3dd68c"   strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="gallery_click" name="Gallery Clicks" stroke="#b89fd4" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event type bar chart */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="p-6">
          <p style={{ fontFamily: MONO, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-5">
            Events by Type
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={typeData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fontFamily: MONO, fontSize: 9, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontFamily: MONO, fontSize: 9, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "#1a2a3a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 0, fontFamily: MONO, fontSize: 11 }}
              />
              <Bar dataKey="count" fill={TEAL} radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top pages */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="p-6">
          <p style={{ fontFamily: MONO, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-5">
            Top Pages (last 30 days)
          </p>
          <div className="space-y-2">
            {topPages.length === 0 && (
              <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>No data yet</p>
            )}
            {topPages.map(([path, count]) => (
              <div key={path} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: MONO, color: "#fff", fontSize: "0.8125rem", letterSpacing: "0.05em" }} className="truncate">
                    {path || "/"}
                  </p>
                </div>
                <div
                  className="text-right flex-shrink-0"
                  style={{ fontFamily: MONO, color: TEAL, fontSize: "0.75rem", minWidth: "3rem" }}
                >
                  {count}
                </div>
                <div
                  className="h-1 flex-shrink-0"
                  style={{
                    width: `${Math.round((count / (topPages[0]?.[1] ?? 1)) * 80)}px`,
                    background: TEAL,
                    opacity: 0.4,
                    minWidth: "4px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent form submissions */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="p-6">
        <p style={{ fontFamily: MONO, color: "#fff", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-5">
          Recent Form Activity
        </p>
        {recentForms.length === 0 ? (
          <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.25)", fontSize: "0.875rem" }}>No submissions yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                {["Type", "Page", "Details", "Date"].map(h => (
                  <th key={h} className="pb-3 text-left" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.65)", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentForms.map(e => (
                <tr key={e.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                  <td className="py-2.5 pr-4">
                    <span
                      className="px-2 py-0.5 text-[10px] tracking-wider uppercase"
                      style={{
                        fontFamily: MONO,
                        color: EVENT_COLORS[e.event_type] ?? TEAL,
                        background: `${EVENT_COLORS[e.event_type] ?? TEAL}18`,
                        border: `1px solid ${EVENT_COLORS[e.event_type] ?? TEAL}40`,
                      }}
                    >
                      {e.event_type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span style={{ fontFamily: MONO, color: "rgba(255,255,255,0.85)", fontSize: "0.75rem" }}>
                      {e.page_url || "—"}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span style={{ fontFamily: BODY, color: "rgba(255,255,255,0.75)", fontSize: "0.8125rem" }}>
                      {e.metadata ? Object.entries(e.metadata).map(([k,v]) => `${k}: ${v}`).join(" · ") : "—"}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span style={{ fontFamily: MONO, color: "rgba(255,255,255,0.6)", fontSize: "0.6875rem" }}>
                      {new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── SEO tab ─────────────────────────────────────────────────────────────────
function SeoTab() {
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("seo_settings").select("*").order("page_path").then(({ data }) => {
      const dbRows = (data ?? []) as SeoRow[];
      const dbMap = new Map(dbRows.map(r => [r.page_path, r]));
      // Start with DB rows (authoritative), then fill in any defaults not yet in DB
      const defaults = SITE_SEO_DEFAULTS.filter(d => !dbMap.has(d.page_path))
        .map(d => ({ ...d, isNew: true, isDirty: false }));
      setRows([
        ...dbRows.map(r => ({ ...r, isDirty: false })),
        ...defaults,
      ]);
      setLoading(false);
    });
  }, []);

  const updateRow = (idx: number, field: keyof SeoRow, value: string | boolean) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value, isDirty: true } : r));
  };

  const saveRow = async (idx: number) => {
    const row = rows[idx];
    setSaving(row.page_path);
    const { id, isNew, isDirty, ...data } = row;
    const { error } = isNew || !id
      ? await supabase.from("seo_settings").upsert({ ...data, updated_at: new Date().toISOString() }, { onConflict: "page_path" }).select()
      : await supabase.from("seo_settings").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);

    if (!error) {
      setRows(prev => prev.map((r, i) => i === idx ? { ...r, isDirty: false, isNew: false } : r));
    }
    setSaving(null);
  };

  const deleteRow = async (idx: number) => {
    const row = rows[idx];
    if (row.id && !row.isNew) {
      await supabase.from("seo_settings").delete().eq("id", row.id);
    }
    setRows(prev => prev.filter((_, i) => i !== idx));
  };

  const addRow = () => {
    setRows(prev => [...prev, {
      page_path: "/",
      title: "",
      description: "",
      keywords: "",
      og_image: "",
      no_index: false,
      isNew: true,
      isDirty: true,
    }]);
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>
          Edit meta tags per page. Unsaved rows show current hardcoded defaults — save to override them live.
        </p>
        <button
          onClick={addRow}
          className="flex items-center gap-2 px-4 py-2.5 transition-all"
          style={{ fontFamily: MONO, fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, border: `1px solid rgba(0,212,232,0.35)`, background: "rgba(0,212,232,0.05)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,232,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,232,0.05)"; }}
        >
          <Plus size={12} /> Add Page
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Path", "Title", "Description", "Keywords", "No Index", ""].map(h => (
                <th key={h} className="pb-3 pr-4 text-left" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.3)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)`, opacity: row.isNew && !row.isDirty ? 0.6 : 1 }}>
                <td className="py-2 pr-3" style={{ minWidth: "120px" }}>
                  <EditableCell value={row.page_path} onChange={v => updateRow(idx, "page_path", v)} mono placeholder="/page-path" />
                </td>
                <td className="py-2 pr-3" style={{ minWidth: "200px" }}>
                  <EditableCell value={row.title} onChange={v => updateRow(idx, "title", v)} placeholder="Page title" />
                </td>
                <td className="py-2 pr-3" style={{ minWidth: "260px" }}>
                  <EditableCell value={row.description} onChange={v => updateRow(idx, "description", v)} placeholder="Meta description" />
                </td>
                <td className="py-2 pr-3" style={{ minWidth: "160px" }}>
                  <EditableCell value={row.keywords} onChange={v => updateRow(idx, "keywords", v)} placeholder="kw1, kw2" />
                </td>
                <td className="py-2 pr-3 text-center" style={{ minWidth: "70px" }}>
                  <button
                    onClick={() => updateRow(idx, "no_index", !row.no_index)}
                    className="w-8 h-8 flex items-center justify-center mx-auto transition-all"
                    style={{
                      border: `1px solid ${row.no_index ? "#f87171" : "rgba(255,255,255,0.15)"}`,
                      background: row.no_index ? "rgba(248,113,113,0.1)" : "transparent",
                    }}
                  >
                    {row.no_index
                      ? <EyeOff size={12} style={{ color: "#f87171" }} />
                      : <Eye size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                    }
                  </button>
                </td>
                <td className="py-2" style={{ minWidth: "80px" }}>
                  <div className="flex items-center gap-1">
                    {row.isDirty && (
                      <button
                        onClick={() => saveRow(idx)}
                        disabled={saving === row.page_path}
                        className="w-7 h-7 flex items-center justify-center transition-all"
                        style={{ background: TEAL, opacity: saving === row.page_path ? 0.5 : 1 }}
                        title="Save"
                      >
                        {saving === row.page_path
                          ? <RefreshCw size={11} style={{ color: "#0e1822" }} className="animate-spin" />
                          : <Save size={11} style={{ color: "#0e1822" }} />
                        }
                      </button>
                    )}
                    <button
                      onClick={() => deleteRow(idx)}
                      className="w-7 h-7 flex items-center justify-center transition-all"
                      style={{ border: `1px solid rgba(248,113,113,0.3)`, background: "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      title="Delete"
                    >
                      <Trash2 size={11} style={{ color: "#f87171" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.25)", fontSize: "0.875rem" }} className="text-center py-8">
          No SEO overrides yet. Click "Add Page" to add one.
        </p>
      )}
    </div>
  );
}

function EditableCell({
  value, onChange, placeholder, mono = false,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        fontFamily: mono ? MONO : BODY,
        fontSize: mono ? "0.6875rem" : "0.8125rem",
        color: value ? "#fff" : "rgba(255,255,255,0.35)",
        background: "transparent",
        border: "1px solid transparent",
        width: "100%",
        padding: "4px 8px",
        outline: "none",
        transition: "border-color 0.15s",
      }}
      onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,212,232,0.4)"; }}
      onBlur={e => { e.currentTarget.style.borderColor = "transparent"; }}
    />
  );
}

// ─── Pricing tab ─────────────────────────────────────────────────────────────
function PricingTab() {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [editingFeatures, setEditingFeatures] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("pricing_packages")
      .select("*")
      .order("department")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setRows(data.map(r => ({ ...r, features: Array.isArray(r.features) ? r.features : JSON.parse(r.features), isDirty: false })));
        } else {
          // DB not yet seeded — show static defaults as editable rows
          const staticRows: PricingRow[] = departmentPackages.flatMap((dept, _di) =>
            dept.tiers.map((tier, ti) => ({
              id: `static-${dept.key}-${tier.id}`,
              department: dept.key,
              tier_key: tier.id,
              name: tier.name,
              price: tier.price,
              price_type: tier.pricingType as "one-time" | "monthly",
              features: tier.features,
              highlight: tier.highlight ?? false,
              display_order: ti,
              isDirty: false,
            }))
          );
          setRows(staticRows);
        }
        setLoading(false);
      });
  }, []);

  const updateRow = (id: string, field: keyof PricingRow, value: unknown) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value, isDirty: true } : r));
  };

  const saveRow = async (row: PricingRow) => {
    setSaving(row.id);
    const isStatic = row.id.startsWith("static-");
    const { id, isDirty, ...data } = row;
    const payload = { ...data, updated_at: new Date().toISOString() };

    const { data: saved, error } = isStatic
      ? await supabase.from("pricing_packages").upsert(payload, { onConflict: "department,tier_key" }).select().single()
      : await supabase.from("pricing_packages").update(payload).eq("id", id).select().single();

    setSaving(null);
    if (!error && saved) {
      setRows(prev => prev.map(r => r.id === id ? { ...r, id: saved.id, isDirty: false } : r));
      setSaved(saved.id);
      setTimeout(() => setSaved(s => s === saved.id ? null : s), 2000);
    }
  };

  if (loading) return <Spinner />;

  // Group by department
  const grouped: Record<string, PricingRow[]> = {};
  for (const row of rows) {
    if (!grouped[row.department]) grouped[row.department] = [];
    grouped[row.department].push(row);
  }

  const deptOrder = departmentPackages.map(d => d.key);
  const sortedDepts = Object.keys(grouped).sort((a, b) => deptOrder.indexOf(a) - deptOrder.indexOf(b));

  return (
    <div className="space-y-10">
      <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>
        Edit prices here and click Save — changes take effect immediately on the live site.
      </p>

      {sortedDepts.map(dept => {
        const deptMeta = departmentPackages.find(d => d.key === dept);
        const color = deptMeta?.color ?? TEAL;

        return (
          <div key={dept}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px" style={{ background: color }} />
              <p style={{ fontFamily: MONO, color, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {deptMeta?.label ?? dept}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {grouped[dept].map(row => (
                <div
                  key={row.id}
                  className="p-5 space-y-4"
                  style={{
                    background: CARD,
                    border: `1px solid ${row.highlight ? `${color}50` : BORDER}`,
                    position: "relative",
                  }}
                >
                  {row.highlight && (
                    <div
                      className="absolute top-0 right-0 px-2.5 py-1"
                      style={{ fontFamily: MONO, fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", background: color, color: "#0e1822" }}
                    >
                      Recommended
                    </div>
                  )}

                  {/* Tier name */}
                  <div>
                    <label style={{ fontFamily: MONO, color: "rgba(255,255,255,0.7)", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Tier name
                    </label>
                    <input
                      value={row.name}
                      onChange={e => updateRow(row.id, "name", e.target.value)}
                      style={{
                        fontFamily: SANS, color: "#fff", fontWeight: 300, fontSize: "1rem",
                        background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)",
                        width: "100%", padding: "4px 0", outline: "none",
                      }}
                      onFocus={e => { e.currentTarget.style.borderBottomColor = color; }}
                      onBlur={e => { e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)"; }}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label style={{ fontFamily: MONO, color: "rgba(255,255,255,0.7)", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Price (£)
                    </label>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 flex-1">
                        <span style={{ fontFamily: SANS, color, fontSize: "1.25rem", fontWeight: 300 }}>£</span>
                        <input
                          type="number"
                          value={row.price}
                          onChange={e => updateRow(row.id, "price", Number(e.target.value))}
                          style={{
                            fontFamily: SANS, color: "#fff", fontWeight: 300, fontSize: "1.5rem",
                            background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)",
                            width: "100%", padding: "2px 0", outline: "none",
                          }}
                          onFocus={e => { e.currentTarget.style.borderBottomColor = color; }}
                          onBlur={e => { e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)"; }}
                        />
                      </div>
                      <select
                        value={row.price_type}
                        onChange={e => updateRow(row.id, "price_type", e.target.value)}
                        style={{
                          fontFamily: MONO, fontSize: "0.5625rem", letterSpacing: "0.1em",
                          color: "rgba(255,255,255,0.85)", background: "#1a2a3a",
                          border: "1px solid rgba(255,255,255,0.12)", padding: "4px 8px", outline: "none",
                        }}
                      >
                        <option value="one-time">one-time</option>
                        <option value="monthly">monthly</option>
                      </select>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label style={{ fontFamily: MONO, color: "rgba(255,255,255,0.7)", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                        Features ({row.features.length})
                      </label>
                      <button
                        onClick={() => setEditingFeatures(editingFeatures === row.id ? null : row.id)}
                        style={{ fontFamily: MONO, fontSize: "0.625rem", letterSpacing: "0.15em", color, textTransform: "uppercase" }}
                      >
                        {editingFeatures === row.id ? "Done" : "Edit"}
                      </button>
                    </div>

                    {editingFeatures === row.id ? (
                      <div className="space-y-1">
                        {row.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2">
                            <input
                              value={f}
                              onChange={e => {
                                const newF = [...row.features];
                                newF[fi] = e.target.value;
                                updateRow(row.id, "features", newF);
                              }}
                              style={{
                                fontFamily: BODY, fontSize: "0.8125rem", color: "rgba(255,255,255,0.9)",
                                background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
                                padding: "3px 8px", outline: "none", flex: 1,
                              }}
                              onFocus={e => { e.currentTarget.style.borderColor = "rgba(0,212,232,0.4)"; }}
                              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                            />
                            <button
                              onClick={() => updateRow(row.id, "features", row.features.filter((_, i) => i !== fi))}
                              style={{ color: "#f87171", opacity: 0.5, flexShrink: 0 }}
                              className="hover:opacity-100 transition-opacity"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => updateRow(row.id, "features", [...row.features, ""])}
                          className="flex items-center gap-1 mt-1 transition-opacity hover:opacity-100 opacity-50"
                          style={{ fontFamily: MONO, fontSize: "0.625rem", letterSpacing: "0.15em", color, textTransform: "uppercase" }}
                        >
                          <Plus size={10} /> Add feature
                        </button>
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {row.features.slice(0, 4).map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2">
                            <Check size={10} style={{ color, marginTop: "3px", flexShrink: 0 }} />
                            <span style={{ fontFamily: BODY, color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem" }}>{f}</span>
                          </li>
                        ))}
                        {row.features.length > 4 && (
                          <li style={{ fontFamily: MONO, color: "rgba(255,255,255,0.55)", fontSize: "0.6875rem", letterSpacing: "0.1em" }}>
                            +{row.features.length - 4} more
                          </li>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Highlight toggle */}
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: MONO, color: "rgba(255,255,255,0.7)", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Recommended tier
                    </span>
                    <button
                      onClick={() => updateRow(row.id, "highlight", !row.highlight)}
                      className="w-9 h-5 flex items-center transition-all"
                      style={{
                        background: row.highlight ? color : "rgba(255,255,255,0.1)",
                        borderRadius: "2px",
                        padding: "2px",
                        position: "relative",
                      }}
                    >
                      <span
                        className="w-4 h-4 transition-transform"
                        style={{
                          background: "#fff",
                          display: "block",
                          transform: row.highlight ? "translateX(16px)" : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>

                  {/* Save button */}
                  {row.isDirty && (
                    <button
                      onClick={() => saveRow(row)}
                      disabled={saving === row.id}
                      className="w-full flex items-center justify-center gap-2 py-2.5 transition-all"
                      style={{
                        fontFamily: MONO, fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase",
                        background: color, color: "#0e1822", opacity: saving === row.id ? 0.6 : 1,
                      }}
                    >
                      {saving === row.id ? (
                        <><RefreshCw size={11} className="animate-spin" /> Saving…</>
                      ) : saved === row.id ? (
                        <><Check size={11} /> Saved</>
                      ) : (
                        <><Save size={11} /> Save Changes</>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="w-8 h-8 border-2 animate-spin"
        style={{ borderColor: TEAL, borderTopColor: "transparent" }}
      />
    </div>
  );
}

// ─── Tab trigger ─────────────────────────────────────────────────────────────
function TabTrigger({
  value, icon: Icon, label,
}: {
  value: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className="flex items-center gap-2.5 px-5 py-3 transition-all data-[state=active]:text-[#00d4e8]"
      style={{
        fontFamily: MONO,
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.6)",
        borderBottom: "2px solid transparent",
        background: "transparent",
        cursor: "pointer",
      }}
      data-radix-tab-trigger=""
    >
      <Icon size={13} />
      {label}
    </Tabs.Trigger>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
function Dashboard() {
  const [tab, setTab] = useState("analytics");

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.replace("/admin/login");
  };

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: `1px solid ${BORDER}`, background: CARD }}
      >
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: MONO, color: "rgba(255,255,255,0.65)", fontSize: "0.625rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Web Balance
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span style={{ fontFamily: MONO, color: TEAL, fontSize: "0.625rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Admin
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 transition-all"
          style={{
            fontFamily: MONO, fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)", border: `1px solid ${BORDER}`, background: "transparent",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = BORDER; }}
        >
          <LogOut size={12} />
          Sign Out
        </button>
      </header>

      {/* Tab nav */}
      <Tabs.Root value={tab} onValueChange={setTab}>
        <div style={{ borderBottom: `1px solid ${BORDER}`, background: CARD }}>
          <div className="max-w-7xl mx-auto px-6">
            <Tabs.List className="flex" style={{ gap: 0 }}>
              <TabTrigger value="analytics" icon={BarChart2}   label="Analytics" />
              <TabTrigger value="seo"       icon={Globe}       label="SEO" />
              <TabTrigger value="pricing"   icon={DollarSign}  label="Pricing" />
            </Tabs.List>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs.Content value="analytics"><AnalyticsTab /></Tabs.Content>
          <Tabs.Content value="seo"><SeoTab /></Tabs.Content>
          <Tabs.Content value="pricing"><PricingTab /></Tabs.Content>
        </div>
      </Tabs.Root>

      {/* Global tab active styles */}
      <style>{`
        [data-radix-tab-trigger][data-state="active"] {
          color: ${TEAL} !important;
          border-bottom-color: ${TEAL} !important;
        }
      `}</style>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
