import { ServicePageLayout } from "../components/ServicePageLayout";
import { Palette, TrendingUp, Layers, Database, Search, Eye } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1741119482290-bf0566a6d404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwJTIwbGFwdG9wJTIwZGVza3xlbnwxfHx8fDE3NzMyNTk1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function WebDesignPage() {
  return (
    <ServicePageLayout
      serviceType="web-design"
      label="Web Design"
      title="Websites That Stop the Scroll"
      subtitle="Bespoke, conversion-focused design for ambitious brands"
      heroImage={heroImage}
      intro="We create bespoke websites that are as beautiful as they are effective. Every project starts with your brand story and ends with a digital experience that turns visitors into loyal customers. No templates. No shortcuts. Just exceptional design, engineered to convert."
      stats={[
        {
          value: "200+",
          label: "Sites Launched",
          modal: {
            heading: "Two Decades of Websites Delivered",
            body: "Over 200 websites launched across industries ranging from hospitality and retail to professional services and tech. Each project is bespoke — no recycled layouts, no off-the-shelf themes. Our portfolio spans startups finding their digital feet to established brands refreshing their online presence for a new era.",
            bullets: [
              "Clients across hospitality, retail, legal, property, and trades",
              "Sites ranging from brochure sites to complex multi-location platforms",
              "Every project delivered on time and within scope",
              "Long-term relationships — many clients return for their second and third sites",
              "UK-based team, hands-on at every stage",
            ],
          },
        },
        {
          value: "+340%",
          label: "Avg. Enquiry Growth",
          modal: {
            heading: "Design That Drives Real Business Results",
            body: "A 340% average increase in enquiries post-launch isn't a marketing figure — it's the measured outcome of strategic, conversion-focused design. When you combine a compelling user experience with clear calls to action and a site that actually loads quickly, the results speak for themselves.",
            bullets: [
              "Measured across clients tracked for 12 months post-launch",
              "Uplift driven by improved UX, clearer CTAs, and faster load times",
              "Results validated through Google Analytics goal tracking",
              "Enquiry growth sustained over time, not just post-launch spikes",
              "Accompanied by average session duration increases of 2–4 minutes",
            ],
          },
        },
        {
          value: "48hr",
          label: "Initial Concepts",
          modal: {
            heading: "From Brief to First Look in 48 Hours",
            body: "We don't believe in long pre-design limbo periods. Within 48 hours of a signed brief, our design team presents initial concepts — giving you something tangible to react to, fast. This speed isn't at the expense of quality; it's the result of a refined process and an experienced team who know how to move decisively.",
            bullets: [
              "Initial creative concepts presented within 48 business hours of brief sign-off",
              "Concepts presented via interactive Figma prototypes",
              "Multiple creative directions explored in the first round",
              "Rapid feedback loop to lock in direction before full design begins",
              "No long waiting rooms — you're always moving forward",
            ],
          },
        },
        {
          value: "100%",
          label: "Custom Designs",
          modal: {
            heading: "Every Design Built From a Blank Canvas",
            body: "We don't use templates. Not partially, not under the hood — not at all. Every website we design begins from scratch, with your brand, your audience, and your goals as the only starting point. This is how we ensure your website looks and feels like nothing else in your market.",
            bullets: [
              "Zero template usage — every layout is original",
              "Custom component libraries built per project",
              "Typography, colour, and motion systems developed from scratch",
              "No off-the-shelf themes or page builders",
              "Ownable design that competitors cannot easily replicate",
            ],
          },
        },
      ]}
      features={[
        {
          icon: Palette,
          title: "Bespoke Design",
          description:
            "Every website is designed from scratch around your brand. We never use templates — your site will be as unique as your business.",
          modal: {
            heading: "No Templates. No Shortcuts. Just Your Brand.",
            body: "Every business is different — and your website should reflect that. We begin every project from a blank canvas, designing a visual language that is specific to your brand, your audience, and your market. Our process combines strategic thinking with world-class craft to produce websites that don't just look exceptional, but feel right.",
            bullets: [
              "Bespoke layout and visual hierarchy crafted around your content",
              "Custom typography pairing and colour system development",
              "Original illustration, iconography, and motion design where needed",
              "Figma prototypes for client review before development begins",
              "Multiple initial concepts presented to explore creative directions",
              "Unlimited revisions within agreed project milestones",
            ],
          },
        },
        {
          icon: TrendingUp,
          title: "Conversion Strategy",
          description:
            "Design decisions are guided by user psychology and data. Every layout, colour choice, and CTA is crafted to drive the actions you want.",
          modal: {
            heading: "Design Decisions Driven by Conversion Science",
            body: "Beautiful design that doesn't convert is just decoration. We apply user psychology, behavioural data, and conversion rate optimisation principles to every design decision — from the hierarchy of information above the fold to the placement and wording of every call to action.",
            bullets: [
              "User journey mapping before a single design element is placed",
              "F-pattern and Z-pattern layout optimisation for visual scanning",
              "Psychological pricing and social proof placement strategies",
              "A/B testing frameworks built in for post-launch optimisation",
              "Heat mapping and session recording setup for ongoing learning",
              "Conversion rate benchmarks established and tracked post-launch",
            ],
          },
        },
        {
          icon: Layers,
          title: "Brand Consistency",
          description:
            "We ensure your website perfectly expresses your brand identity — from typography and colour to tone of voice and imagery style.",
          modal: {
            heading: "Every Pixel Aligned With Your Brand",
            body: "Your website is the most visible expression of your brand identity. We ensure absolute consistency between your offline brand and your digital presence — and where that brand needs strengthening, we'll tell you and propose how to evolve it.",
            bullets: [
              "Full brand audit before design begins to understand existing assets",
              "Typography and colour system codified into a reusable design system",
              "Photography direction and art direction guidelines provided",
              "Consistent application across all page templates and components",
              "Design system documentation for your in-house team or suppliers",
            ],
          },
        },
        {
          icon: Database,
          title: "CMS Integration",
          description:
            "Empower your team to update content with ease. We build on Sanity, WordPress, or custom headless CMS solutions.",
          modal: {
            heading: "Total Content Control for Your Team",
            body: "A website your team can't update is a website that stagnates. We build on best-in-class content management systems that give non-technical users complete control over their content — without ever touching code. We recommend the right CMS for your specific needs, not the one easiest for us to build on.",
            bullets: [
              "Sanity.io for complex, structured content with custom schemas",
              "WordPress with ACF for familiar, flexible content management",
              "Contentful and Prismic for enterprise headless CMS requirements",
              "Custom admin interfaces where standard CMS options fall short",
              "Full training session and video guides for your team on handover",
              "Ongoing CMS support included in all support packages",
            ],
          },
        },
        {
          icon: Search,
          title: "SEO Foundation",
          description:
            "Every site launches with technical SEO best practices in place — semantic HTML, fast load times, structured data, and meta optimisation.",
          modal: {
            heading: "Built to Rank From Day One",
            body: "We build websites on an SEO foundation that gives your organic search performance the best possible start. Technical SEO isn't something we add at the end — it's embedded into how we build. Every site launches with a strong technical baseline that your SEO team or ours can build upon.",
            bullets: [
              "Semantic HTML5 structure with correct heading hierarchy",
              "Schema markup for business type, products, articles, and FAQs",
              "Optimised meta titles, descriptions, and Open Graph tags",
              "XML sitemap and robots.txt configuration",
              "Core Web Vitals compliance: LCP, FID, and CLS targets met",
              "301 redirect strategy for site migrations to protect existing rankings",
            ],
          },
        },
        {
          icon: Eye,
          title: "Accessibility",
          description:
            "WCAG-compliant design and development so your website is usable by everyone, and meets legal accessibility requirements.",
          modal: {
            heading: "Inclusive Design for Every User",
            body: "Accessibility is both a legal obligation and a commercial opportunity. An accessible website reaches more people, performs better in search engines, and demonstrates that your brand genuinely cares about all of its customers. We design and build to WCAG 2.1 AA standards as a minimum.",
            bullets: [
              "WCAG 2.1 AA compliance as standard on all projects",
              "Colour contrast ratios checked across all design states",
              "Keyboard navigation support for all interactive elements",
              "ARIA labels and roles for screen reader compatibility",
              "Focus management and skip-navigation for assistive technology users",
              "Accessibility audit report provided on project completion",
            ],
          },
        },
      ]}
      process={[
        {
          step: "01",
          title: "Brand & Strategy",
          description:
            "We research your market, analyse competitors, and define your brand positioning. This strategy informs every design decision that follows.",
          modal: {
            heading: "Strategy Before a Single Pixel Is Placed",
            body: "Great design without strategy is just decoration. Before we open a design tool, we spend time deeply understanding your market, your competitors, and your audience. This discovery phase shapes every decision that follows — from the tone of your copy to the layout of your homepage.",
            bullets: [
              "Competitor landscape analysis across design, messaging, and positioning",
              "Target audience persona development with behavioural insights",
              "Brand tone of voice and visual direction agreed and documented",
              "Content hierarchy defined — what matters most to your users",
              "Project goals and KPIs established before design begins",
              "Discovery findings presented in a strategy document for sign-off",
            ],
          },
        },
        {
          step: "02",
          title: "Wireframing",
          description:
            "Before design begins, we map out the user journey with detailed wireframes. This ensures the structure is correct before aesthetics are applied.",
          modal: {
            heading: "Structure First. Style Second.",
            body: "Wireframes are the architectural blueprints of your website. We map every key page in greyscale to validate the user journey, information hierarchy, and content flow — before a single colour, font, or image is chosen. This means fewer revisions and faster design sign-off.",
            bullets: [
              "Low-fidelity wireframes for all key page types",
              "User flow diagrams showing how visitors navigate between sections",
              "Content blocks defined with real copy where possible",
              "CTA placement and conversion pathway mapped in advance",
              "Presented via Figma for collaborative feedback and annotation",
              "Client sign-off required before visual design begins",
            ],
          },
        },
        {
          step: "03",
          title: "Visual Design",
          description:
            "Our designers craft your visual identity — presenting concepts and iterating based on your feedback until every detail is perfect.",
          modal: {
            heading: "Where Your Brand Comes to Life",
            body: "This is the stage most clients get excited about — and rightly so. Our designers apply your brand strategy to create stunning visual concepts that bring your website to life. We present multiple creative directions and iterate until every detail is exactly right.",
            bullets: [
              "Initial concepts presented within 48 business hours of wireframe sign-off",
              "Multiple creative directions explored for key pages",
              "Full colour palette, typography system, and component library developed",
              "Motion and interaction design principles defined",
              "Responsive design variants for mobile, tablet, and desktop",
              "High-fidelity Figma prototype for realistic client preview",
            ],
          },
        },
        {
          step: "04",
          title: "Development & Launch",
          description:
            "Your designs are built with clean, performant code. Thorough testing across devices is followed by a smooth, managed launch.",
          modal: {
            heading: "Pixel-Perfect Build. Seamless Go-Live.",
            body: "Design is only as good as its execution. Our development team builds every site to pixel-perfect precision, with clean, maintainable code that performs under real-world conditions. We test across every major device and browser before a managed, zero-downtime launch.",
            bullets: [
              "Pixel-perfect HTML/CSS/JS build from approved Figma designs",
              "Cross-browser testing: Chrome, Safari, Firefox, Edge",
              "Device testing: desktop, tablet, iPhone, Android",
              "Core Web Vitals performance targets met before launch",
              "CMS training session and documentation on handover",
              "Managed launch with DNS migration support and rollback plan",
            ],
          },
        },
      ]}
      ctaTitle="Your website should work as hard as you do."
      ctaPath="/web-design/start"
      ctaLabel="Start Your Project"
    />
  );
}