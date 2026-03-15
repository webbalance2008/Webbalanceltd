import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  Target, MousePointerClick, TestTube, Rocket, BarChart3, Layers,
} from "lucide-react";

export function LandingPagesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — Landing Pages"
      title="Landing Pages & Microsites"
      subtitle="High-converting single-purpose pages built for results"
      heroImage=""
      seoPath="/web-design/landing-pages"
      seoKeywords="landing page design, microsite, conversion optimisation, lead generation page, campaign landing page UK"
      overview="A landing page has one job — convert visitors into leads, sign-ups, or customers. Every word, image, and interaction must earn its place."
      overviewDetail="We design landing pages that strip away distraction and focus relentlessly on your conversion goal. Whether you're running paid ads, launching a product, promoting an event, or capturing leads, we create pages engineered around proven conversion principles — clear value propositions, social proof, urgency, and frictionless calls to action. No fluff. No distractions. Just results."
      features={[
        { icon: Target, title: "Conversion-Focused Design", body: "Every element placed with intent — headlines that hook, CTAs that convert, and layouts that guide the eye to the action." },
        { icon: MousePointerClick, title: "Clear Calls to Action", body: "Strategic CTA placement with contrasting design, benefit-driven copy, and minimal friction to complete the desired action." },
        { icon: TestTube, title: "A/B Test Ready", body: "Built to support variant testing — swap headlines, images, and CTAs to continuously improve conversion rates." },
        { icon: Rocket, title: "Blazing Fast Load", body: "Sub-second load times with optimised assets and minimal dependencies — because every second of delay loses conversions." },
        { icon: BarChart3, title: "Conversion Tracking", body: "Full analytics setup with event tracking, goal completions, heatmap integration, and funnel visualisation." },
        { icon: Layers, title: "Campaign Consistency", body: "Design that matches your ad creative, email campaigns, and social content for a seamless user journey." },
      ]}
      industries={[
        { name: "SaaS & Tech Startups", description: "Product launch pages, feature announcements, free trial sign-up flows, and demo request funnels." },
        { name: "Professional Services", description: "Lead generation pages for consultations, audits, and discovery calls with social proof and credentials." },
        { name: "E-Commerce Campaigns", description: "Product launch countdowns, seasonal sale pages, and limited-edition drop announcements." },
        { name: "Events & Conferences", description: "Registration pages with speaker lineups, agenda previews, early-bird pricing, and countdown timers." },
        { name: "Real Estate & Property", description: "Development launch microsites with floorplans, virtual tours, registration of interest forms." },
        { name: "Education & Courses", description: "Course enrolment pages with curriculum previews, instructor bios, student testimonials, and pricing." },
      ]}
      included={[
        "Bespoke conversion-focused design",
        "Mobile-first responsive layout",
        "Lead capture form with CRM integration",
        "Social proof sections (testimonials, logos)",
        "Countdown timers and urgency elements",
        "Video embedding with lazy loading",
        "Analytics and conversion pixel setup",
        "A/B testing infrastructure",
        "Performance optimisation (Core Web Vitals)",
        "Custom thank-you / confirmation page",
        "Email notification on form submission",
        "Heatmap tracking integration (Hotjar/MS Clarity)",
      ]}
      process={[
        { step: "01", title: "Campaign Briefing", description: "We understand your offer, audience, traffic source, and conversion goal. We define the page structure, messaging hierarchy, and success metrics." },
        { step: "02", title: "Persuasion Design", description: "A single, focused page design using proven conversion frameworks — social proof, objection handling, and clear CTAs." },
        { step: "03", title: "Build & Connect", description: "Rapid development with form integration, CRM connection, analytics setup, and tracking pixel implementation." },
        { step: "04", title: "Launch & Optimise", description: "Go live with full tracking in place, then iterate based on real data — A/B testing headlines, CTAs, and layouts for continuous improvement." },
      ]}
      related={[
        { label: "Website Type", title: "Corporate Websites", description: "When your campaign needs a full website to back it up, not just a landing page.", path: "/web-design/corporate-websites" },
        { label: "Website Type", title: "E-Commerce Websites", description: "Drive landing page traffic into a full shopping experience.", path: "/web-design/ecommerce-websites" },
        { label: "Website Type", title: "Blog & Content Websites", description: "Content-driven pages that attract organic traffic alongside paid campaigns.", path: "/web-design/blog-websites" },
      ]}
      ctaTitle="Let's build a page that turns clicks into customers."
      concepts={[
        { title: "Hero & Value Proposition", description: "Bold headline, clear benefit statement, hero visual, and a single prominent CTA — the critical first impression above the fold.", layout: "chat" },
        { title: "Lead Capture Form", description: "Minimal-friction form with clear labels, inline validation, and benefit-driven submit button — designed to maximise completions.", layout: "form" },
        { title: "Social Proof Section", description: "Client logos, testimonials, stats, and trust badges arranged for maximum credibility impact.", layout: "dashboard" },
      ]}
    />
  );
}