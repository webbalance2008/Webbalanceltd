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
        { icon: Target, title: "Conversion-Focused Design", body: "Every element placed with intent — headlines that hook, CTAs that convert, and layouts that guide the eye to the action.",
          detail: "A landing page has no navigation, no sidebar, no footer links — nothing to distract from the single action you want visitors to take. Every design decision flows from that principle. Headlines are written and positioned to be the first thing read, instantly communicating what's on offer and why it matters. The visual hierarchy guides the eye in a deliberate sequence: attention → interest → desire → action. Social proof appears at the exact moment doubt might enter. The CTA is placed where momentum is highest. Nothing is there by accident." },
        { icon: MousePointerClick, title: "Clear Calls to Action", body: "Strategic CTA placement with contrasting design, benefit-driven copy, and minimal friction to complete the desired action.",
          detail: "The CTA button copy 'Submit' converts at roughly half the rate of 'Get My Free Audit'. The difference between a button that blends in and one that demands attention is often 20–30% in conversion rate. We write CTA copy that frames the action as a benefit, not a transaction. We design buttons with sufficient contrast to be unmissable without being garish. We place them at every natural decision point — above the fold, after the case for action has been made, and again at the bottom for visitors who scrolled the full page. Multiple exposure, consistent framing, minimum friction." },
        { icon: TestTube, title: "A/B Test Ready", body: "Built to support variant testing — swap headlines, images, and CTAs to continuously improve conversion rates.",
          detail: "The first version of a landing page is always a hypothesis. The data from real visitor behaviour tells you what to test next. We build every landing page with A/B testing infrastructure in place: Google Optimize, VWO, or Optimizely integration, clean component structure that makes swapping headlines or hero images straightforward, and event tracking that records which variant drove each conversion. The result is a landing page that improves continuously over its lifetime — compounding small conversion gains into significant revenue differences over time." },
        { icon: Rocket, title: "Blazing Fast Load", body: "Sub-second load times with optimised assets and minimal dependencies — because every second of delay loses conversions.",
          detail: "Load speed is directly correlated with conversion rate — Google's own data shows a 7% conversion drop for every additional second of load time. For paid traffic where you're spending money on every visitor, a slow page is burning budget. We optimise landing pages to the millisecond: images in WebP format at the exact dimensions needed, critical CSS inlined so the above-fold content renders immediately, third-party scripts loaded asynchronously so they can't block the page, and minimal dependencies that keep the page weight lean. Core Web Vitals scores are tested and green before launch." },
        { icon: BarChart3, title: "Conversion Tracking", body: "Full analytics setup with event tracking, goal completions, heatmap integration, and funnel visualisation.",
          detail: "Without proper tracking, you're optimising blind. Every landing page we build includes a complete measurement setup: GA4 conversion events for every form submission and goal completion, paid ad conversion pixels (Google Ads, Meta, LinkedIn) configured correctly so your attribution data is accurate, heatmap tracking via Hotjar or Microsoft Clarity to see where visitors click, scroll, and drop off, and session recording for qualitative insight into user behaviour. You know exactly how many visitors are converting, from which sources, and where the page is losing people." },
        { icon: Layers, title: "Campaign Consistency", body: "Design that matches your ad creative, email campaigns, and social content for a seamless user journey.",
          detail: "Message match — the alignment between the ad someone clicked and the page they land on — is one of the most powerful conversion factors and one of the most commonly neglected. When a visitor's expectations formed by the ad are immediately confirmed by the landing page headline, image, and offer, they relax and engage. When they're mismatched, they bounce. We design landing pages that align precisely with your campaign creative: same headline language, same visual style, same offer framing — creating a seamless handover from awareness to consideration to action." },
      ]}
      industries={[
        { name: "SaaS & Tech Startups", description: "Product launch pages, feature announcements, free trial sign-up flows, and demo request funnels.",
          detail: "SaaS landing pages serve a specific conversion goal at every stage of the funnel: a free trial sign-up page needs to establish value quickly and remove the friction of committing without experiencing the product; a demo request page needs to make the meeting feel worth the time; a feature announcement needs to upsell existing users. We design each type of SaaS landing page for its specific psychological moment — leading with the right proof, the right copy, and the right CTA for where the visitor is in their decision journey." },
        { name: "Professional Services", description: "Lead generation pages for consultations, audits, and discovery calls with social proof and credentials.",
          detail: "For professionals selling their time and expertise — consultants, coaches, advisers, accountants — the landing page is often the first contact a prospect has with the person, not just the firm. The page needs to simultaneously establish credibility (credentials, track record, client outcomes) and create urgency (limited availability, specific offer deadline). We design lead generation pages for professional services that feel warm and trustworthy rather than salesy — because the relationship begins with the first click, and high-value clients are perceptive about whether the experience matches the quality being promised." },
        { name: "E-Commerce Campaigns", description: "Product launch countdowns, seasonal sale pages, and limited-edition drop announcements.",
          detail: "E-commerce campaigns need dedicated landing pages that focus visitor attention entirely on the offer — away from the rest of the store's navigation, away from competing products, and onto a single conversion action. Product launch countdowns build anticipation and capture early sign-ups. Seasonal sale pages consolidate the offer with urgency mechanics (countdown timers, stock levels). Limited-edition drops create genuine scarcity that drives fast purchase decisions. Each campaign page is built and deployed quickly — speed to market is part of the value." },
        { name: "Events & Conferences", description: "Registration pages with speaker lineups, agenda previews, early-bird pricing, and countdown timers.",
          detail: "Event registration pages have a specific challenge: they need to sell an experience that hasn't happened yet to people who are busy and sceptical of their own time. The design addresses this through specificity — a detailed agenda that makes the day feel real and worthwhile, speaker profiles that establish the calibre of the room, past attendee testimonials that answer 'was it worth it?', early-bird pricing that rewards decisive action, and a countdown timer that makes the deadline viscerally present. The registration form itself is minimal — we only ask for what we genuinely need." },
        { name: "Real Estate & Property", description: "Development launch microsites with floorplans, virtual tours, registration of interest forms.",
          detail: "Property launches live or die in their first 72 hours — and the microsite is the primary vehicle for building anticipation and capturing registrations before and during that window. A development launch microsite presents the project with the visual quality and detail that high-value property deserves: architectural CGIs and aerial photography, interactive floorplans, specification details, location information, and a clear registration of interest form that captures leads for the sales team. For live developments, a sold/available status overlay on the floorplan creates real-time urgency." },
        { name: "Education & Courses", description: "Course enrolment pages with curriculum previews, instructor bios, student testimonials, and pricing.",
          detail: "Course enrolment pages face a specific objection that most other landing pages don't: 'Will this actually deliver what it promises?' The page must answer this question definitively. Detailed curriculum previews that demonstrate depth and structure. Instructor credentials and teaching philosophy that build trust in the facilitator. Specific student outcome testimonials — not 'great course!' but 'I went from X to Y, got Z result, in W months'. Clear pricing with a rationale for the investment. And a money-back guarantee that removes the perceived risk of the first enrolment." },
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