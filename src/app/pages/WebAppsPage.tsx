import { ServicePageLayout } from "../components/ServicePageLayout";
import { Zap, ShieldCheck, Smartphone, Plug, BarChart3, Wrench, ArrowRight, CalendarCheck, UserCircle, CloudCog, ShoppingBag, Crown, Settings2 } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { getServiceColors } from "../utils/serviceColors";

const WA_PRIMARY   = "#b89fd4";
const WA_PRIMARY_DIM = "rgba(180,150,220,0.55)";
const WA_ACCENT_40  = "rgba(180,150,220,0.4)";
const WA_ACCENT_20  = "rgba(180,150,220,0.2)";
const WA_ACCENT_10  = "rgba(180,150,220,0.1)";
const WA_ACCENT_06  = "rgba(180,150,220,0.06)";

const heroImage =
  "https://images.unsplash.com/photo-1767817099805-d79e31fb968c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBkYXJrJTIwc2NyZWVufGVufDF8fHx8MTc3MzI1OTU1OXww&ixlib=rb-4.1.0&q=80&w=1080";

export function WebAppsPage() {
  return (
    <ServicePageLayout
      serviceType="web-apps"
      label="Web Applications"
      title="Custom Web Apps Built to Perform"
      subtitle="Scalable, bespoke digital tools engineered for your business"
      heroImage={heroImage}
      intro="We design and engineer powerful web applications that go far beyond a standard website. From SaaS platforms and customer portals to booking engines and internal tools — we build scalable, performant applications that solve real business problems and create measurable results."
      stats={[
        { value: "120+", label: "Apps Delivered" },
        { value: "99.9%", label: "Uptime Guaranteed" },
        { value: "0.8s", label: "Avg. Load Time" },
        { value: "5★", label: "Client Satisfaction" },
      ]}
      features={[
        {
          icon: Zap,
          title: "Performance First",
          description:
            "Every application we build is optimised for speed. Sub-second load times, lazy loading, and edge delivery as standard.",
          modal: {
            heading: "Engineering for Sub-Second Load Times",
            body: "Speed isn't a feature — it's a foundation. Every architectural decision we make is filtered through a performance lens, from the frameworks we choose to the way we structure data fetching and rendering. A fast application doesn't just feel better; it converts better, ranks better, and retains users longer.",
            bullets: [
              "Edge delivery via Cloudflare and Vercel global CDN networks",
              "Code splitting and lazy loading to reduce initial bundle size",
              "Image optimisation pipeline with next-gen formats (WebP, AVIF)",
              "Server-side rendering and static generation where appropriate",
              "Core Web Vitals monitoring with automated alerts on regression",
            ],
          },
        },
        {
          icon: ShieldCheck,
          title: "Secure by Design",
          description:
            "Authentication, authorisation, data encryption, and regular security audits built into every project from day one.",
          modal: {
            heading: "Security Built In, Not Bolted On",
            body: "Security is not an afterthought in our development process — it is embedded at the architecture stage. We follow OWASP best practices throughout, ensuring your application is protected against the most common and the most sophisticated threats from day one.",
            bullets: [
              "JWT and OAuth 2.0 authentication with refresh token rotation",
              "Role-based access control (RBAC) with granular permission models",
              "AES-256 encryption for data at rest; TLS 1.3 for data in transit",
              "SQL injection, XSS, and CSRF protection as standard",
              "Penetration testing available pre-launch and on a scheduled basis",
              "GDPR and data privacy compliance baked into data architecture",
            ],
          },
        },
        {
          icon: Smartphone,
          title: "Mobile Ready",
          description:
            "Fully responsive and progressive web app capabilities, so your users get a native-feeling experience on any device.",
          modal: {
            heading: "Native-Quality Experiences on Every Device",
            body: "Modern users expect applications that work beautifully on mobile — not just function adequately. We build mobile-first, testing across real devices at every stage. For applications that require offline capability or device integration, we implement Progressive Web App (PWA) standards.",
            bullets: [
              "Mobile-first component architecture and responsive layouts",
              "Touch gesture support and mobile-optimised interaction patterns",
              "Progressive Web App (PWA) with offline capability where required",
              "Push notification support for re-engagement",
              "Tested across iOS Safari, Android Chrome, and all major browsers",
            ],
          },
        },
        {
          icon: Plug,
          title: "API Integration",
          description:
            "Seamlessly connect to third-party services — payment gateways, CRMs, ERPs, or custom APIs built by our team.",
          modal: {
            heading: "Connecting Your Stack Seamlessly",
            body: "Modern applications rarely operate in isolation. Whether you need to connect to Stripe for payments, Salesforce for CRM, a bespoke ERP system, or a custom API we build ourselves — we handle integration with precision, ensuring data flows reliably and securely between systems.",
            bullets: [
              "RESTful and GraphQL API design and consumption",
              "Webhook handling and real-time event processing",
              "Payment gateway integration: Stripe, PayPal, GoCardless",
              "CRM and ERP connectors: Salesforce, HubSpot, SAP, and more",
              "Rate limiting, error handling, and retry logic as standard",
              "API documentation provided for every custom endpoint we build",
            ],
          },
        },
        {
          icon: BarChart3,
          title: "Analytics & Insights",
          description:
            "Built-in dashboards, reporting, and analytics so you have complete visibility over how your application is performing.",
          modal: {
            heading: "Data Visibility Across Your Entire Application",
            body: "You can't improve what you can't measure. We build custom analytics and reporting into applications from the ground up, giving you and your team real-time visibility into the metrics that matter — from user behaviour and conversion funnels to system health and business KPIs.",
            bullets: [
              "Custom admin dashboards with real-time data visualisation",
              "User behaviour tracking: funnel analysis, session recording, heatmaps",
              "Business intelligence reporting: revenue, retention, churn",
              "Automated scheduled reports delivered to your inbox",
              "Integration with Google Analytics 4, Mixpanel, or Amplitude",
              "Event-driven tracking architecture for granular data capture",
            ],
          },
        },
        {
          icon: Wrench,
          title: "Ongoing Support",
          description:
            "Post-launch care packages to keep your app running smoothly, updated, and scaling as your business grows.",
          modal: {
            heading: "Care That Extends Well Beyond Launch",
            body: "Launching your application is the beginning of the relationship, not the end. Our support packages are designed to keep your application performing at its best — handling updates, monitoring for issues proactively, and evolving the product as your business needs change.",
            bullets: [
              "24/7 uptime monitoring with sub-5-minute incident response",
              "Scheduled dependency updates and security patching",
              "Dedicated Slack channel for direct communication with your team",
              "Monthly performance and usage reports",
              "Ongoing feature development at agreed sprint cadence",
              "Rollback capability and disaster recovery procedures",
            ],
          },
        },
      ]}
      process={[
        {
          step: "01",
          title: "Discovery & Strategy",
          description:
            "We start with a deep-dive workshop to map your business requirements, user journeys, and technical architecture. We define scope, priorities, and a delivery roadmap before a single line of code is written.",
          modal: {
            heading: "Mapping Your Requirements Before a Line of Code Is Written",
            body: "Skipping discovery is the single most common reason web app projects fail. Our structured discovery process extracts the real requirements — not just the stated ones — and translates them into a clear technical scope, delivery roadmap, and architectural blueprint that the entire team works from. This phase de-risks everything that follows.",
            bullets: [
              "Stakeholder workshops to surface business goals, constraints, and success metrics",
              "User journey mapping across all key persona types and use cases",
              "Technical architecture decisions: stack, infrastructure, third-party services",
              "Scope prioritisation using MoSCoW method to define MVP vs future phases",
              "Delivery roadmap with milestones, sprint plan, and projected launch date",
              "Discovery deliverables signed off before any design or development begins",
            ],
          },
        },
        {
          step: "02",
          title: "UI/UX Design",
          description:
            "Our designers translate strategy into pixel-perfect wireframes and interactive prototypes. User testing validates the experience before development begins.",
          modal: {
            heading: "Designing for Users, Not Just Aesthetics",
            body: "Application design is a discipline distinct from website design. We apply UX research, interaction design principles, and user psychology to create interfaces that feel intuitive from the first session — reducing training time, support burden, and churn. Prototypes are tested with real users before a single component is built.",
            bullets: [
              "Low-fidelity wireframes for all key screens and user flows",
              "Interactive Figma prototypes simulating real application behaviour",
              "Usability testing with representative users before design sign-off",
              "Component library and design system built for consistency at scale",
              "Accessibility review to WCAG 2.1 AA standard throughout",
              "Responsive design for desktop, tablet, and mobile breakpoints",
            ],
          },
        },
        {
          step: "03",
          title: "Agile Development",
          description:
            "Working in fortnightly sprints, our engineers build your application iteratively. You receive regular demos and can provide feedback throughout the process.",
          modal: {
            heading: "Iterative Builds With Full Visibility at Every Sprint",
            body: "We build in fortnightly sprints with a demo at the end of each — giving you something real to interact with and react to throughout the process, not just at the end. This agile approach means priorities can be refined as the product takes shape, and you're never left in the dark about what's being built. Transparency is built into the process.",
            bullets: [
              "Fortnightly sprint cycles with a live demo and review session",
              "Dedicated project Slack channel for direct access to your delivery team",
              "Full sprint backlog shared and prioritised collaboratively in Jira or Linear",
              "Code written to agreed standards with peer review and automated testing",
              "CI/CD pipeline configured from sprint one for smooth, frequent deployments",
              "Staging environment maintained throughout for ongoing client review",
            ],
          },
        },
        {
          step: "04",
          title: "QA, Launch & Support",
          description:
            "Rigorous testing across devices and browsers, followed by a managed launch. We provide handover training and ongoing support packages post-launch.",
          modal: {
            heading: "A Zero-Surprise Go-Live and Long-Term Care",
            body: "Our QA process is thorough and systematic — covering functional testing, device and browser compatibility, performance benchmarks, and security validation before anything goes near production. Launch is managed and monitored, with a rollback plan in place. And because applications evolve, our post-launch support packages ensure your product keeps improving.",
            bullets: [
              "Functional QA testing against agreed acceptance criteria for every user story",
              "Cross-browser and device testing matrix covering all major platforms",
              "Load testing and performance validation under expected peak traffic",
              "Security audit and penetration testing prior to go-live",
              "Managed DNS migration and zero-downtime deployment to production",
              "Post-launch support packages from £149/mo with dedicated SLA",
            ],
          },
        },
      ]}
      ctaTitle="Have an app idea? Let's build it."
      ctaPath="/web-apps/start"
      ctaLabel="Start Your Project"
    >
      <AppTypesSection />
    </ServicePageLayout>
  );
}

const appTypes = [
  {
    icon: CalendarCheck,
    label: "Booking Systems",
    title: "Booking & Reservation Systems",
    description: "Custom booking engines for restaurants, hotels, salons, and professional services — with payments, reminders, and full admin control.",
    path: "/web-apps/booking-systems",
  },
  {
    icon: UserCircle,
    label: "Customer Portals",
    title: "Customer Portals & Account Dashboards",
    description: "Branded, secure account spaces where your customers manage orders, documents, messages, and project status — reducing admin overhead dramatically.",
    path: "/web-apps/customer-portals",
  },
  {
    icon: CloudCog,
    label: "SaaS Platforms",
    title: "SaaS & Multi-Tenant Platforms",
    description: "Multi-tenant software products with subscription billing, team management, and the scalable architecture to grow from your first customer to your thousandth.",
    path: "/web-apps/saas-platforms",
  },
  {
    icon: ShoppingBag,
    label: "E-Commerce",
    title: "E-Commerce & Online Stores",
    description: "Bespoke online stores designed around your brand and built for conversion — from DTC fashion brands to complex configure-to-order product experiences.",
    path: "/web-apps/ecommerce-stores",
  },
  {
    icon: Crown,
    label: "Membership Platforms",
    title: "Membership & Subscription Platforms",
    description: "Gated content, recurring billing, member communities, and loyalty programmes — turn your audience into predictable, recurring revenue.",
    path: "/web-apps/membership-platforms",
  },
  {
    icon: Settings2,
    label: "Internal Tools",
    title: "Internal Business Tools & Dashboards",
    description: "Replace the spreadsheets and disconnected software with a single, purpose-built tool designed around exactly how your business operates.",
    path: "/web-apps/internal-tools",
  },
];

function AppTypesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="py-24 border-b" style={{ borderColor: "rgba(180,150,220,0.08)" }}>
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: "'DM Mono', monospace", color: WA_PRIMARY }}
              className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px" style={{ backgroundColor: WA_PRIMARY }} />
              What We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl max-w-xl font-light"
            >
              Six Types of Application We Specialise In
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/web-apps/start"
              style={{ fontFamily: "'DM Mono', monospace", color: WA_ACCENT_40 }}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#b89fd4]"
            >
              Start a project <ArrowRight size={11} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(180,150,220,0.08)" }}>
          {appTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.path}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                style={{ backgroundColor: "#1a2840" }}
              >
                <Link
                  to={type.path}
                  className="block p-8 group h-full transition-colors duration-300"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(180,150,220,0.06)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  {/* Icon */}
                  <div
                    className="mb-5 inline-flex items-center justify-center w-11 h-11 border transition-colors duration-300"
                    style={{ borderColor: WA_ACCENT_20 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = WA_ACCENT_40; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = WA_ACCENT_20; }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.25}
                      style={{ color: WA_PRIMARY_DIM, transition: "color 0.3s" }}
                      className="group-hover:!opacity-100 transition-opacity duration-300 opacity-70"
                    />
                  </div>

                  <p
                    style={{ fontFamily: "'DM Mono', monospace", color: WA_ACCENT_40 }}
                    className="text-[10px] tracking-[0.25em] uppercase mb-2"
                  >
                    {type.label}
                  </p>
                  <h3
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "white", transition: "color 0.3s" }}
                    className="text-xl mb-3 group-hover:!text-[#b89fd4] leading-snug"
                  >
                    {type.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/35 text-sm leading-relaxed mb-6"
                  >
                    {type.description}
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs transition-colors duration-300"
                    style={{ fontFamily: "'DM Mono', monospace", color: "rgba(180,150,220,0.25)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = WA_PRIMARY; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(180,150,220,0.25)"; }}
                  >
                    <span className="tracking-[0.15em] uppercase group-hover:text-[#b89fd4] transition-colors duration-300">Explore</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}