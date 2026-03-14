import { ServicePageLayout } from "../components/ServicePageLayout";
import { PhoneCall, CreditCard, FileCheck } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1603804449683-25636751db96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmljaW5nJTIwcGFja2FnZXMlMjBidXNpbmVzcyUyMHBsYW4lMjBzdHJhdGVneXxlbnwxfHx8fDE3NzMyNTk1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function WebDesignPackagesPage() {
  return (
    <ServicePageLayout
      serviceType="web-design"
      label="Packages & Pricing"
      title="Transparent Web Design Pricing"
      subtitle="No hidden fees. No surprises. Just great work at a fair price."
      heroImage={heroImage}
      intro="We believe great design should be accessible and transparent. Each package is carefully structured to deliver maximum value at every level — from ambitious startups to established enterprises. All projects begin with a free discovery call."
      pricing={[
        {
          name: "Essentials",
          price: "£2,500",
          description:
            "The perfect starting point for small businesses and sole traders who need a professional online presence fast.",
          features: [
            "Up to 5 pages",
            "Custom design (no templates)",
            "Mobile responsive",
            "Contact form",
            "Basic on-page SEO",
            "Google Analytics setup",
            "2 rounds of revisions",
            "30 days post-launch support",
          ],
        },
        {
          name: "Growth",
          price: "£5,500",
          description:
            "Ideal for growing businesses that need a powerful, fully-featured site with CMS and conversion strategy.",
          features: [
            "Up to 15 pages",
            "Custom design system",
            "CMS integration (Sanity/WP)",
            "Blog or news section",
            "Advanced SEO setup",
            "Speed optimisation",
            "Social media integration",
            "3 rounds of revisions",
            "60 days post-launch support",
          ],
          highlight: true,
        },
        {
          name: "Premium",
          price: "Custom",
          description:
            "For established brands that demand a bespoke, world-class digital experience with full strategic support.",
          features: [
            "Unlimited pages",
            "Full brand strategy included",
            "Custom animations & interactions",
            "E-commerce or booking engine",
            "Multi-language support",
            "Performance & A/B testing",
            "Dedicated project manager",
            "Unlimited revisions",
            "12 months priority support",
          ],
        },
      ]}
      features={[
        {
          icon: PhoneCall,
          title: "Free Discovery Call",
          description:
            "Every project starts with a no-obligation discovery call to understand your goals, timeline, and budget.",
          modal: {
            heading: "No Commitment. Just a Conversation.",
            body: "Before you commit to anything, we want to understand your project. Our free discovery call is a 30-minute conversation with a senior member of our team — no sales script, no hard sell, just an honest discussion about what you need and whether we're the right fit to deliver it.",
            bullets: [
              "30-minute call with a senior designer or strategist",
              "We'll ask about your goals, timeline, audience, and existing brand",
              "You'll leave with a clear sense of what your project would involve",
              "We'll follow up with a written proposal within 48 hours if there's a fit",
              "No obligation to proceed — ever",
            ],
          },
        },
        {
          icon: CreditCard,
          title: "Staged Payments",
          description:
            "We split payments into milestones — so you only pay as we deliver. Typically 30% upfront, 40% mid-project, 30% on launch.",
          modal: {
            heading: "Pay as We Deliver, Not All Upfront",
            body: "We understand that a website is a significant investment. Our staged payment structure is designed to give you confidence at every step — you only release funds when we've delivered what we promised. This aligns our incentives with yours: we're motivated to keep the project moving forward to the highest standard.",
            bullets: [
              "30% deposit on project commencement to secure your start date",
              "40% at design sign-off — when you're happy with how it looks",
              "30% on launch — the final payment only when you're delighted with the result",
              "All payments by bank transfer or card",
              "Flexible payment schedules available for larger projects on request",
            ],
          },
        },
        {
          icon: FileCheck,
          title: "No Lock-in Contracts",
          description:
            "Once your site is live, it's yours. We don't charge ongoing fees unless you choose a support package.",
          modal: {
            heading: "Your Website Belongs to You. Completely.",
            body: "Some agencies hold your website hostage with proprietary platforms or contracts that make it difficult to leave. We don't believe in that. Once your project is complete and paid for, you own everything — the code, the design files, the content. If you ever want to move to another agency or manage it yourself, there are no barriers.",
            bullets: [
              "Full ownership of all source code and design assets on project completion",
              "Figma design files delivered as part of handover package",
              "CMS training session included so your team can manage content independently",
              "Hosting is separate and always in your name — never locked to us",
              "Support packages are optional month-to-month — cancel anytime",
            ],
          },
        },
      ]}
      ctaTitle="Not sure which package is right for you?"
      ctaPath="/contact"
      ctaLabel="Book a Free Call"
    />
  );
}