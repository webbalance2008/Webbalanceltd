import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  LayoutGrid, Palette, Smartphone, Search, ShieldCheck, Zap,
} from "lucide-react";

export function CorporateWebsitesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — Corporate & Business"
      title="Corporate & Business Websites"
      subtitle="Your digital front door — designed to build trust and drive enquiries"
      heroImage=""
      seoPath="/web-design/corporate-websites"
      seoKeywords="corporate website design, business website, professional web design, UK company websites, bespoke corporate sites"
      overview="A corporate website is the centrepiece of your digital presence — your always-on salesperson, brand ambassador, and first impression rolled into one."
      overviewDetail="Most businesses settle for a template. The result? A site that looks like everyone else's, loads slowly, and fails to convert visitors into customers. We design and build bespoke corporate websites from scratch — no themes, no page builders — so every pixel serves your brand, your story, and your commercial goals. Whether you're a five-person consultancy or a 200-strong enterprise, your website should feel like yours."
      features={[
        { icon: LayoutGrid, title: "Bespoke Page Design", body: "Every page designed from scratch around your content, goals, and brand — no generic templates or cookie-cutter layouts.",
          detail: "Template websites have a tell — a certain sameness in the spacing, the font choices, the way sections stack. Visitors feel it, even if they can't name it. We design every page from a blank canvas: the homepage is structured around your specific value proposition and conversion goals, the about page tells your story in a way that builds genuine trust, service pages are crafted to address the real questions your customers are asking. The result is a website that feels unmistakably yours — not a theme you've filled in." },
        { icon: Palette, title: "Brand-Led Aesthetics", body: "Typography, colour, spacing, and motion that reinforce your brand identity across every interaction.",
          detail: "A great brand identity deserves a website that expresses it fully. We translate your brand guidelines — or help you develop them if they don't exist yet — into a precise digital design system: a typographic scale that establishes hierarchy and personality, a colour palette applied with intention, spacing and proportion that creates breathing room and focus, and motion design that adds life without distraction. Every micro-interaction, hover state, and page transition is considered as part of the whole, creating a coherent experience that deepens brand perception at every touchpoint." },
        { icon: Smartphone, title: "Responsive on Every Device", body: "Desktop, tablet, and mobile experiences designed individually — not just scaled down.",
          detail: "Responsive design is not simply shrinking a desktop layout to fit a phone screen — that approach produces layouts that feel wrong on every device. We design mobile, tablet, and desktop breakpoints as separate compositions: navigation patterns that make sense for touch, image crops that prioritise the subject on smaller screens, typography hierarchies that work at smaller sizes, and CTAs positioned for thumb reach. Over 60% of your visitors will arrive on a mobile device. That experience deserves as much design attention as the version seen on a widescreen monitor." },
        { icon: Search, title: "SEO-Ready Architecture", body: "Clean semantic markup, performance-optimised code, and an information architecture built for search engines.",
          detail: "Technical SEO is invisible when it's done right and costly when it isn't. We build every site with search engine visibility as a core requirement: clean semantic HTML5 markup that communicates content hierarchy, page structures that place your target keywords in the right elements, internal linking that distributes authority intelligently across your content, XML sitemaps, canonical tags, and structured data markup for rich results. Core Web Vitals performance scores — Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint — are measured and optimised before launch." },
        { icon: ShieldCheck, title: "Accessibility & Compliance", body: "WCAG-compliant design ensuring your site is usable by everyone, meeting legal and ethical standards.",
          detail: "Web accessibility isn't just an ethical obligation — it's increasingly a legal one, and it improves the experience for everyone. We design and build to WCAG 2.1 AA standards: sufficient colour contrast ratios, keyboard navigability for all interactive elements, screen reader compatible markup, descriptive alt text for images, focus indicators that are clearly visible, and forms with properly associated labels. For public sector clients or organisations that handle sensitive services, we provide an accessibility statement and maintain an audit trail of compliance testing." },
        { icon: Zap, title: "Lightning-Fast Performance", body: "Optimised images, lazy loading, and clean code delivering sub-2-second load times.",
          detail: "Every additional second of load time reduces conversion rate by approximately 7%. Performance is not a nice-to-have — it directly affects your bottom line and your search rankings. We optimise at every level: images served in WebP and AVIF formats at the correct size for each breakpoint, critical CSS inlined to eliminate render-blocking, JavaScript deferred or loaded asynchronously, third-party scripts loaded with appropriate strategies, and caching headers configured correctly for static assets. The result is a site that feels instant — because speed is part of the user experience." },
      ]}
      industries={[
        { name: "Professional Services", description: "Law firms, accountancies, consultancies, and agencies that need to project authority and expertise online.",
          detail: "In professional services, your website is often the first filter in a buying decision that takes months. Prospective clients research firms extensively before making contact — and a website that fails to communicate authority, specialism, and trustworthiness will never trigger that first conversation. We design professional services websites that establish credentials immediately: clear service structure, team profiles that convey depth and personality, client case studies that tell outcome stories, and thought leadership that signals genuine expertise in your specific field." },
        { name: "Financial Services", description: "Banks, insurers, fintechs, and wealth managers requiring compliance-aware, trust-building design.",
          detail: "Financial services websites carry a heavier burden of trust-building than almost any other sector. Visitors are evaluating whether to hand over their savings, their insurance, or their financial future — and every design decision signals trustworthiness or erodes it. We design for clarity, security, and compliance: clean information architecture that helps users find what they need quickly, regulatory disclosures integrated without ugliness, secure enquiry and application flows, and a visual language that communicates stability and professional rigour." },
        { name: "Technology Companies", description: "SaaS providers, IT firms, and tech startups showcasing complex products with clarity.",
          detail: "Technology companies face a specific design challenge: making complex products feel approachable without dumbing down the substance that sophisticated buyers require. We design tech websites that speak clearly to the right audience at the right level: homepage value propositions that land in one sentence, feature pages that explain capability without jargon, pricing structures that remove friction from the buying decision, and case studies that translate technical outcomes into business value. The design itself signals quality — scrappy startups and enterprise-grade software look different, and we know how to position each." },
        { name: "Manufacturing & Engineering", description: "Industrial companies presenting capabilities, case studies, and technical specifications to B2B buyers.",
          detail: "Industrial and engineering businesses are often brilliant at what they do and poor at presenting it digitally. A well-designed corporate website for a manufacturer communicates capability at the right level: detailed product or service specifications for technical buyers, case studies that demonstrate real-world application and outcomes, certifications and quality standards prominently displayed, and a content structure that guides both the procurement manager and the engineer to the information they need. We've helped industrial businesses win contracts they'd never have been considered for with their previous web presence." },
        { name: "Healthcare & Medical", description: "Private practices, clinics, and healthtech companies communicating trust and professionalism.",
          detail: "Healthcare websites carry a particular responsibility: the people reading them may be anxious, unwell, or making consequential decisions about treatment. Design must communicate warmth and trustworthiness alongside clinical professionalism. We build healthcare websites that present services clearly, support the patient decision-making journey without overwhelming, and reflect the quality of care delivered in person. For private practices and clinics, online booking integration, insurance information, and practitioner profiles are core; for healthtech, the design must credibly bridge consumer accessibility and clinical rigour." },
        { name: "Charities & Non-Profits", description: "Organisations that need to tell their story compellingly and drive donations or volunteer sign-ups.",
          detail: "Charity and non-profit websites have a job that commercial sites don't: persuading people to give without receiving something tangible in return. Storytelling is everything. We design charity websites that lead with human impact, use photography and case study narratives to connect donors emotionally with beneficiaries, and make the act of donating or volunteering feel simple and meaningful. Donation flows are optimised for completion, Gift Aid capture is built in, and recurring donation options are presented as the natural choice." },
      ]}
      included={[
        "Fully bespoke design — no templates",
        "Responsive design for all devices",
        "SEO-ready semantic markup",
        "WCAG accessibility compliance",
        "Contact forms with email notifications",
        "Google Analytics & Search Console setup",
        "Social media integration",
        "SSL certificate & security headers",
        "Performance optimisation (Core Web Vitals)",
        "Content management system (CMS)",
        "Staff training & documentation",
        "30-day post-launch support",
      ]}
      process={[
        { step: "01", title: "Discovery & Strategy", description: "We learn your business, audience, competitors, and goals. We map out the site architecture, define key user journeys, and establish the design direction." },
        { step: "02", title: "Design & Prototyping", description: "High-fidelity page designs delivered for your review — desktop and mobile — with interactive prototypes so you can experience the site before it's built." },
        { step: "03", title: "Development & Integration", description: "Clean, hand-coded front-end build with CMS integration, form handling, analytics, and any third-party connections your business requires." },
        { step: "04", title: "Test, Train & Launch", description: "Comprehensive cross-browser and device testing, performance auditing, team training, and a managed go-live with post-launch support." },
      ]}
      related={[
        { label: "Website Type", title: "Landing Pages & Microsites", description: "High-converting single-purpose pages for campaigns, product launches, and lead generation.", path: "/web-design/landing-pages" },
        { label: "Website Type", title: "E-Commerce Websites", description: "Beautiful online stores that turn browsers into buyers.", path: "/web-design/ecommerce-websites" },
        { label: "Website Type", title: "Portfolio & Creative Websites", description: "Showcase your work with a site as distinctive as your portfolio.", path: "/web-design/portfolio-websites" },
      ]}
      ctaTitle="Your business deserves a website that works as hard as you do."
      concepts={[
        { title: "Corporate Homepage", description: "Hero section with clear value proposition, service cards, testimonials, and a strong call-to-action — designed to convert visitors into enquiries.", layout: "dashboard" },
        { title: "About & Team Pages", description: "People-first layouts with team profiles, company history, values, and culture — building trust before the first meeting.", layout: "kanban" },
        { title: "Contact & Enquiry", description: "Structured contact page with form, map integration, office details, and clear next-step guidance.", layout: "form" },
      ]}
    />
  );
}