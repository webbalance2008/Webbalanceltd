import { ServicePageLayout } from "../components/ServicePageLayout";
import { Settings, Target, FileText, Link2, LineChart, MonitorCheck, BarChart2 } from "lucide-react";
import type { Feature } from "../components/ServicePageLayout";
import { SEOHead } from "../components/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "../components/StructuredData";
import { DepartmentHero } from "../components/DepartmentHero";

const ACCENT = "#3dd68c";

function SeoHero() {
  return (
    <DepartmentHero
      label="Search Engine Optimisation"
      heading={
        <>
          We listen. We think.{" "}
          We <span style={{ color: ACCENT }}>deliver</span>.
        </>
      }
      subtitle="Ranking on Google has never been more competitive — or more important. Strategy-led SEO that drives measurable, lasting growth."
      accent={ACCENT}
      primaryCta={{ label: "View Packages", to: "/seo/packages" }}
      secondaryCta={{ label: "Start a Project", to: "/seo/start" }}
      patternId="seo"
    />
  );
}

const features: Feature[] = [
  {
    icon: Target,
    title: "Our Approach to SEO",
    description:
      "We take a hands-on, strategy-led approach to SEO. No cookie-cutter solutions — just a clear plan built around your business goals, your audience, and where you want to grow.",
    modal: {
      heading: "Strategy-Led. No Shortcuts.",
      body: "We take a hands-on, strategy-led approach to SEO. No cookie-cutter solutions — just a clear plan built around your business goals, your audience, and where you want to grow. Every engagement starts with understanding your market, your competitors, and the opportunities that will deliver the greatest impact.",
      bullets: [
        "In-depth discovery and business goal alignment",
        "Competitor landscape analysis",
        "Custom SEO roadmap with measurable milestones",
        "Ongoing strategy refinement as results evolve",
      ],
    },
  },
  {
    icon: MonitorCheck,
    title: "Website Analysis & Technical SEO",
    description:
      "A successful SEO strategy starts with understanding where you stand. We conduct a comprehensive audit covering technical performance, content quality, site structure, mobile experience, page speed, and Core Web Vitals.",
    modal: {
      heading: "Getting the Foundations Right",
      body: "Google's algorithm evolves constantly — and so do we. We conduct a comprehensive audit of your website covering technical performance, content quality, site structure, mobile experience, page speed, and Core Web Vitals. With AI-driven search results and Google's E-E-A-T framework (Experience, Expertise, Authoritativeness, and Trustworthiness) now shaping rankings more than ever, getting the foundations right is critical. We make sure your site meets Google's evolving standards — and stays ahead of them.",
      bullets: [
        "Full technical site audit and health report",
        "Core Web Vitals and page speed optimisation",
        "Mobile experience and crawlability review",
        "E-E-A-T compliance and trust signal assessment",
        "Site architecture and internal linking analysis",
      ],
    },
  },
  {
    icon: FileText,
    title: "On-Page & Content Optimisation",
    description:
      "We identify the keywords and search intent that matter most to your audience, then work with you to create and optimise content that ranks, engages, and converts.",
    modal: {
      heading: "Content That Ranks and Converts",
      body: "Great SEO starts with great content. We identify the keywords and search intent that matter most to your audience, then work with you to create and optimise content that ranks, engages, and converts. From meta data and heading structure to internal linking and schema markup, we ensure every element of your site is working hard for your visibility.",
      bullets: [
        "Keyword research and search intent mapping",
        "Meta titles, descriptions and heading optimisation",
        "Schema markup and structured data implementation",
        "Internal linking strategy",
        "Content gap analysis and creation support",
      ],
    },
  },
  {
    icon: Link2,
    title: "Off-Page SEO & Authority Building",
    description:
      "Ranking well requires trust — and Google measures trust through the quality and relevance of sites that link to yours. We develop considered link-building and digital PR strategies that grow your domain authority organically.",
    modal: {
      heading: "Building Authority That Lasts",
      body: "Ranking well requires trust — and Google measures trust through the quality and relevance of sites that link to yours. We develop considered link-building and digital PR strategies that grow your domain authority organically and sustainably — no spammy links, no shortcuts, just genuine authority built the right way.",
      bullets: [
        "Competitor backlink analysis",
        "High-quality, relevant link acquisition",
        "Digital PR and outreach campaigns",
        "Brand mention monitoring and reclamation",
        "Domain authority growth tracking",
      ],
    },
  },
  {
    icon: BarChart2,
    title: "Google Ads & PPC",
    description:
      "Want immediate visibility while your organic rankings grow? We plan, build and manage pay-per-click campaigns aligned with your objectives and budget — every penny tracked, measured and reported.",
    modal: {
      heading: "Immediate Visibility, Maximum ROI",
      body: "Want immediate visibility while your organic rankings grow? Our Google Ads management ensures your business appears at the top of search results for the terms that matter most. We plan, build and manage pay-per-click campaigns aligned with your objectives and budget — monitoring performance continuously to maximise your return on investment. Every penny of spend is tracked, measured and reported.",
      bullets: [
        "Google Ads campaign strategy and setup",
        "Keyword bidding and ad copy optimisation",
        "Landing page alignment for conversion",
        "Continuous performance monitoring",
        "Full spend transparency and ROI reporting",
      ],
    },
  },
  {
    icon: LineChart,
    title: "Transparent Reporting",
    description:
      "SEO without data is guesswork. We provide clear, regular reporting on rankings, traffic, conversions and ROI — so you always know exactly what's working and why.",
    modal: {
      heading: "Data You Can Act On",
      body: "SEO without data is guesswork. We provide clear, regular reporting on rankings, traffic, conversions and ROI — so you always know exactly what's working and why. No jargon, no vanity metrics — just honest, actionable insight delivered consistently throughout our engagement.",
      bullets: [
        "Monthly ranking and traffic reports",
        "Conversion tracking and goal monitoring",
        "ROI and cost-per-acquisition analysis",
        "Google Search Console and Analytics integration",
        "Quarterly strategy review calls",
      ],
    },
  },
];

const stats = [
  {
    value: "2008",
    label: "Established",
    modal: {
      heading: "Over 17 Years in the Industry",
      body: "Web Balance was founded in 2008 — before Google launched Penguin or Panda, before mobile-first indexing, and before the era of AI-generated content. We've navigated every major algorithm shift and emerged stronger each time. That longevity isn't a footnote; it's the foundation of everything we do.",
      bullets: [
        "Pre-dating Google's Penguin & Panda updates — we adapted, not scrambled",
        "Witnessed the rise of mobile search, featured snippets, and AI-driven results",
        "Continuous investment in training, tools, and industry partnerships",
        "A client retention rate that reflects trust built over years, not months",
      ],
    },
  },
  {
    value: "15+",
    label: "Years of SEO Experience",
    modal: {
      heading: "Experience That Can't Be Shortcut",
      body: "Our SEO team has over 15 years of hands-on experience spanning local SEO, national campaigns, e-commerce, and B2B lead generation. We've run campaigns in competitive industries — from legal and finance to hospitality and retail — and we understand the nuance required to win in each.",
      bullets: [
        "Local, national, and international SEO campaigns",
        "Experience across legal, hospitality, retail, finance, and trade sectors",
        "Deep knowledge of Google Search Console, GA4, Ahrefs, and SEMrush",
        "Proven track record in both organic SEO and paid search (PPC)",
        "In-house expertise — no outsourcing, no guesswork",
      ],
    },
  },
  {
    value: "100%",
    label: "Transparent Reporting",
    modal: {
      heading: "You Always Know Where You Stand",
      body: "We believe in radical transparency. Every client receives clear, jargon-free reporting on the metrics that matter — rankings, traffic, conversions, and ROI. No smoke and mirrors. No vanity stats. Just honest data, presented consistently, so you can make informed decisions about your marketing investment.",
      bullets: [
        "Monthly ranking and organic traffic reports",
        "Conversion tracking and goal completion analysis",
        "Google Search Console and GA4 integration",
        "ROI and cost-per-acquisition breakdowns for PPC",
        "Quarterly strategy review calls included as standard",
      ],
    },
  },
  {
    value: "UK-Wide",
    label: "Client Reach",
    modal: {
      heading: "Serving Businesses Across the UK",
      body: "While we're headquartered in Scotland, our client base spans the length and breadth of the UK — from Edinburgh and Glasgow to London, Manchester, and beyond. We work with businesses of all sizes, from ambitious independents to established regional brands, delivering SEO strategies tailored to their specific markets.",
      bullets: [
        "Clients in Scotland, England, and Wales",
        "Expertise in local SEO for multi-location businesses",
        "National campaign management for UK-wide brands",
        "Remote-first collaboration — seamless regardless of location",
        "Industry knowledge spanning both urban and regional markets",
      ],
    },
  },
];

export function SeoPage() {
  return (
    <>
      <SEOHead
        title="SEO Services"
        description="Strategy-led SEO that gets your business found on Google. Technical SEO, content strategy, link building, and local SEO — all built around measurable growth."
        path="/seo"
        keywords="SEO services UK, search engine optimisation, technical SEO, local SEO, content strategy, link building"
      />
      <ServiceSchema
        name="SEO Services"
        description="Strategy-led SEO that gets your business found on Google. Technical SEO, content strategy, link building, and local SEO — all built around measurable growth."
        path="/seo"
      />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "SEO", path: "/seo" }]} />
      <ServicePageLayout
        serviceType="seo"
        label="Search Engine Optimisation"
        title="We listen. We think. We deliver."
        subtitle="Ranking on Google has never been more competitive — or more important"
        customHero={<SeoHero />}
        intro="Search Engine Optimisation isn't just about keywords. It's about building sustained visibility, attracting qualified traffic, and converting that traffic into real business growth. Since 2008, Web Balance has helped businesses across Scotland and beyond develop SEO strategies that deliver measurable, lasting results."
        stats={stats}
        features={features}
        process={[
          {
            step: "01",
            title: "Discovery & Audit",
            description:
              "We begin by getting under the skin of your business — understanding your goals, your audience, and your current position in search. A full technical audit gives us the complete picture.",
            modal: {
              heading: "Understanding Where You Are Before We Move Forward",
              body: "Every effective SEO campaign begins not with keywords or link-building, but with clarity. We need to understand your business objectives, your target customers, the competitive landscape you operate in, and the current state of your website from a technical, content, and authority perspective. Our discovery and audit phase gives us the complete, honest picture — and means that every recommendation we make from that point is grounded in evidence rather than guesswork.",
              bullets: [
                "Business goals workshop: understanding what success looks like for your specific objectives",
                "Full technical site audit: crawl errors, indexation issues, page speed, Core Web Vitals, and mobile performance",
                "Content quality review: identifying thin, duplicate, or under-performing content across your site",
                "Backlink profile analysis: assessing the quality and diversity of your existing link profile",
                "Competitor SEO audit: understanding what your rivals are doing well and where the gaps are",
                "Audit findings report delivered with a prioritised action plan — no jargon, just clear direction",
              ],
            },
          },
          {
            step: "02",
            title: "Strategy & Roadmap",
            description:
              "Using the audit findings, we build a bespoke SEO strategy and rolling roadmap — prioritised by impact and aligned to your business timeline.",
            modal: {
              heading: "A Clear Plan Built Around Your Business, Not a Template",
              body: "With the audit complete, we translate findings into a concrete, prioritised SEO strategy. This isn't a generic list of best practices — it's a tailored roadmap built around your specific goals, your competitive environment, and the realistic timeline for results. We define the technical fixes, content initiatives, and authority-building activities that will have the greatest impact, sequence them intelligently, and agree milestones so you always know what's happening and why.",
              bullets: [
                "Keyword strategy: identifying the search terms that will drive qualified, high-intent traffic",
                "Search intent mapping: matching keyword targets to the right content types and pages",
                "Technical remediation plan: prioritised fixes organised by impact and implementation complexity",
                "Content strategy: identifying content gaps, new page opportunities, and existing content to optimise",
                "Link acquisition strategy: a realistic, sustainable approach to building domain authority",
                "12-month rolling roadmap with quarterly milestones — reviewed and refined as results evolve",
              ],
            },
          },
          {
            step: "03",
            title: "Implementation & Optimisation",
            description:
              "Strategy becomes action. We implement technical fixes, optimise on-page content, build authority, and continuously refine based on live performance data.",
            modal: {
              heading: "Doing the Work That Actually Moves Rankings",
              body: "SEO strategies are only as good as their implementation. This is where the real work happens — and where many agencies fall short. We don't just advise; we execute. Our team handles technical optimisation, content creation and improvement, structured data implementation, and link acquisition in a continuous, disciplined cycle. Every change is tracked so we know exactly what's having an impact and can double down on what's working.",
              bullets: [
                "Technical SEO implementation: fixing crawl issues, improving site speed, and resolving Core Web Vitals failures",
                "On-page optimisation: meta data, heading structure, internal linking, and schema markup",
                "Content creation and improvement: new pages, blog content, and optimisation of under-performing existing content",
                "Link building: high-quality, relevant link acquisition through outreach, digital PR, and partnerships",
                "Google Business Profile optimisation for local search visibility",
                "Continuous A/B testing of title tags and meta descriptions to improve click-through rates",
              ],
            },
          },
          {
            step: "04",
            title: "Reporting & Growth",
            description:
              "Clear, regular reporting keeps you informed at every stage. We track rankings, traffic, and conversions — then use that data to keep pushing your results forward.",
            modal: {
              heading: "Transparency, Accountability, and Continuous Improvement",
              body: "SEO is a long-term investment, and we believe you deserve to understand exactly how that investment is performing at every stage. Our reporting is designed to be genuinely useful — not a data dump of vanity metrics, but a clear picture of what's moving, why, and what we're doing next. Monthly reports are supplemented by quarterly strategy reviews where we assess performance against targets and evolve the roadmap based on what the data is telling us.",
              bullets: [
                "Monthly performance reports: organic traffic, keyword rankings, impressions, and conversion data",
                "Google Search Console and GA4 integration for accurate, real-time data",
                "ROI tracking: connecting SEO activity to leads, enquiries, and revenue where possible",
                "Ranking movement reports with context — understanding why positions change and what we're doing about it",
                "Quarterly strategy review calls: assessing progress against milestones and refining the roadmap",
                "Transparent communication throughout — you always know what we're working on and why",
              ],
            },
          },
        ]}
        ctaTitle="Ready to grow your online presence?"
        ctaPath="/seo/start"
        ctaLabel="Start Your SEO Campaign"
      />
    </>
  );
}