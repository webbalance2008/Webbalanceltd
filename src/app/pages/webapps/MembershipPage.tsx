import { AppTypePage } from "../../components/AppTypePage";
import {
  Crown, Lock, CreditCard, Users, Rss, Gift,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1762330471687-a05c0f99a046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW1iZXJzaGlwJTIwY29tbXVuaXR5JTIwcGxhdGZvcm0lMjBleGNsdXNpdmUlMjBhY2Nlc3N8ZW58MXx8fHwxNzczMjYyMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function MembershipPage() {
  return (
    <AppTypePage
      label="Web App Type — Membership Platforms"
      title="Membership & Subscription Platforms"
      subtitle="Build recurring revenue and lasting loyalty"
      heroImage={heroImage}
      heroColor="#250f45"
      seoPath="/web-apps/membership-platforms"
      seoKeywords="membership platform, subscription app, gated content, recurring revenue, UK membership website"
      overview="A membership platform turns your audience into a recurring revenue stream — giving members exclusive access, a sense of belonging, and a reason to stay."
      overviewDetail="Membership and subscription models are among the most powerful in modern business. Whether you're offering premium content, exclusive community access, professional development resources, or subscriber-only products and discounts — a bespoke membership platform lets you monetise your audience without relying on advertising or one-off transactions. We build platforms that handle everything: gated content by membership tier, recurring billing with automatic renewals, member onboarding flows, community features, and the administrative tools your team needs to manage thousands of members without losing control. The result is a membership experience that feels premium, exclusive, and worth the subscription."
      features={[
        {
          icon: Lock,
          title: "Gated Content by Tier",
          body: "Restrict access to any content, feature, or section by membership level — from free tiers to premium and enterprise — with automatic enforcement.",
          detail: "Content gating is the commercial engine of any membership platform, and it needs to work without gaps or friction. Every piece of content — article, video, download, event, community thread, or feature — can be assigned to one or more membership tiers. When a non-member or lower-tier subscriber encounters gated content, they see a tasteful upsell prompt designed to convert them. When they upgrade, access is granted instantly. The gating logic is enforced at the server level, not just in the UI — meaning technically savvy users can't bypass restrictions.",
        },
        {
          icon: CreditCard,
          title: "Recurring Billing",
          body: "Stripe-powered subscriptions with monthly and annual billing, free trial periods, promotional pricing, and automatic renewal with failed payment recovery.",
          detail: "Stripe is the gold standard for subscription billing, and we implement its full feature set: monthly and annual plans (with annual pricing incentives to improve cash flow), free trial periods that convert automatically, coupon and promotional pricing for acquisition campaigns, and prorated billing when members upgrade mid-cycle. Failed payment recovery is sophisticated — rather than cancelling immediately, the system retries intelligently over several days and sends progressively firmer dunning emails, recovering a significant portion of payments that would otherwise be lost to card failures.",
        },
        {
          icon: Crown,
          title: "Member Tiers & Perks",
          body: "Create multiple membership levels with distinct benefits — exclusive content, early access, discounts, or physical perks — configurable without developer involvement.",
          detail: "The right tier structure is one of the most important commercial decisions in building a membership. Too many tiers and the proposition becomes confusing; too few and you leave revenue on the table. We help you design a tier architecture that guides members upward naturally, with a free or low-cost entry tier that demonstrates value, a core paid tier with the primary proposition, and a premium tier with additional benefits that justify the price step. Benefits are managed through the admin interface — no development required to add early access periods, change discount percentages, or introduce new perks.",
        },
        {
          icon: Rss,
          title: "Content Management",
          body: "A full CMS for articles, videos, podcasts, downloadable resources, and live events — all gateable by membership tier and publishable by your team.",
          detail: "Your team publishes content on their own schedule without depending on developers. The CMS supports every content format your membership needs: long-form articles with rich text editing, video content hosted or embedded from Vimeo, podcast episodes with audio players, PDF and file downloads, live event listings with RSVP functionality, and serialised content that unlocks progressively. Content scheduling means you can prepare weeks of content in advance. Tier assignment is a single dropdown — no technical configuration required.",
        },
        {
          icon: Users,
          title: "Community Features",
          body: "Member directories, discussion forums, comment threads, direct messaging, and event RSVPs to create genuine connection between your members.",
          detail: "The most powerful retention mechanic in any membership isn't content — it's community. Members who have made meaningful connections within your platform don't cancel, because they'd be leaving people, not just content. We build community features that create real engagement: threaded discussion forums by topic, member directories with profile pages and direct messaging, comment sections on every piece of content, and event RSVPs that let members see who else is attending. Moderation tools give your team control without requiring them to police every conversation.",
        },
        {
          icon: Gift,
          title: "Loyalty & Rewards",
          body: "Points systems, referral programmes, anniversary rewards, and milestone recognition that keep members engaged and actively recruiting new subscribers.",
          detail: "Keeping members engaged beyond their initial enthusiasm is the core challenge of every membership business. Loyalty and reward mechanics create positive reinforcement loops: points earned for content engagement, community participation, and referrals; milestone recognition at subscription anniversaries; early access privileges for the most active members; and a referral programme that turns your happiest subscribers into your most effective acquisition channel. These aren't gimmicks — they measurably improve retention and net revenue retention over time.",
        },
      ]}
      industries={[
        {
          name: "Media & Publishing",
          description: "Paywalled editorial content, premium newsletters, podcast archives, and subscriber-only events for media brands and independent publishers.",
          detail: "The shift from advertising-supported to reader-supported media is one of the defining commercial transformations of the past decade. A membership platform for media gives you direct, unmediated relationships with your most valuable readers — revenue that doesn't depend on algorithms or advertiser sentiment. Paywalled articles with teaser previews, premium newsletters delivered on schedule, a full archive of past content, subscriber-only live events with Q&A access, and a community forum where your readership debates the ideas you publish — all in one platform.",
        },
        {
          name: "Professional Associations",
          description: "Membership management, CPD tracking, resource libraries, directory listings, and event management for trade bodies and professional networks.",
          detail: "Professional associations have complex membership needs that generic platforms handle poorly: tiered membership grades, CPD tracking with certificate issuance, a resource library by practice area, a member directory with search and filter, event registration and attendance tracking, and communications tailored to membership type. A bespoke platform handles all of this while presenting the gravitas and trustworthiness your members expect from their professional body. Renewal reminders reduce lapse rates, and automated CPD reporting saves your team hours of manual administration.",
        },
        {
          name: "Fitness & Wellness",
          description: "Online class libraries, programme access, nutrition tracking, and coach-member communication for fitness brands scaling beyond in-person delivery.",
          detail: "The fitness and wellness industry discovered during 2020 that its most scalable product is digital — and the businesses that built proper platforms came out far stronger. A fitness membership platform hosts your on-demand class library (video, audio, PDF), structured training programmes with scheduled unlock mechanics, live class booking integrated with the membership, nutritional guidance and tracking tools, and direct messaging between coaches and members. Members who track progress and feel connected to a community are members who renew. Coaches who can communicate at scale can serve far more members than their in-person capacity allows.",
        },
        {
          name: "Education & Courses",
          description: "Cohort-based learning programmes, drip-released course content, student communities, and progress tracking for educators and training providers.",
          detail: "The best online education doesn't just deliver information — it creates an experience that mirrors the engagement and accountability of in-person learning. Cohort-based programmes where students progress together, drip-released content that prevents overwhelm and maintains pacing, progress tracking with completion certificates, assignment submission and instructor feedback tools, and a cohort community where students support each other — these are the features that differentiate a professional learning platform from a collection of uploaded slides.",
        },
        {
          name: "Hospitality & Lifestyle",
          description: "VIP dining clubs, hotel loyalty programmes, exclusive experience access, and concierge services for premium hospitality brands.",
          detail: "Premium hospitality brands have an opportunity that most ignore: turning their most loyal guests into a paying membership community. A VIP dining club gives members priority reservations, access to chef's table events, and early release of seasonal menus. A hotel loyalty programme rewards frequency with suite upgrades, early check-in, and exclusive resident events. The platform manages the full experience: membership purchase, benefit delivery, booking priority access, and the communication that makes members feel genuinely known and valued.",
        },
        {
          name: "B2B & Professional Services",
          description: "Knowledge communities, peer networking platforms, industry research access, and peer benchmarking tools for B2B audiences.",
          detail: "The most successful B2B memberships sell access to information and people that can't be found anywhere else. Industry research and data accessible only to members, peer networking forums where practitioners at similar levels share challenges and solutions, benchmarking tools that let members compare their performance against the anonymised cohort, and in-person or virtual events that facilitate the connections members are really paying for. The platform becomes the central hub for professional development and peer relationship in a specific field — extraordinarily valuable and extremely high retention.",
        },
      ]}
      included={[
        "Gated content architecture by membership tier",
        "Stripe recurring billing with free trial support",
        "Member onboarding flow with welcome email sequences",
        "Member portal with profile, billing, and content access",
        "Content management system for all gated assets",
        "Community discussion and member directory",
        "Referral and loyalty programme functionality",
        "Admin dashboard for member management and reporting",
        "Churn prevention: failed payment recovery, cancellation flows",
        "Email marketing integration for member communications",
        "Mobile-responsive for access on any device",
        "GDPR-compliant data management and export tools",
      ]}
      process={[
        {
          step: "01",
          title: "Membership Model Design",
          description: "We define your tier structure, benefits architecture, pricing strategy, and content roadmap. The right model is the foundation of a membership platform that retains as well as acquires.",
        },
        {
          step: "02",
          title: "Platform Architecture",
          description: "We design the content gating model, user role system, billing architecture, and community features — ensuring everything scales cleanly as your membership grows.",
        },
        {
          step: "03",
          title: "Build & Content Migration",
          description: "Development of the full platform, migration of any existing content, and integration with your email marketing, analytics, and community tools.",
        },
        {
          step: "04",
          title: "Launch & Growth",
          description: "A managed launch to your founding member cohort, followed by ongoing development of features — new content types, community tools, and retention mechanics — as your membership scales.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "E-Commerce Stores",
          description: "Add a members-only shop or subscriber discount programme to your membership platform.",
          path: "/web-apps/ecommerce-stores",
        },
        {
          label: "Web App Type",
          title: "Customer Portals",
          description: "Give each member a personalised dashboard beyond just content access.",
          path: "/web-apps/customer-portals",
        },
        {
          label: "Web App Type",
          title: "Booking Systems",
          description: "Let members book exclusive events, sessions, or experiences as part of their membership.",
          path: "/web-apps/booking-systems",
        },
      ]}
      ctaTitle="Build the membership platform your audience will pay to be part of."
      concepts={[
        { title: "Member Login", description: "Branded authentication with email/password, social login, and magic link options — frictionless access to your gated content.", layout: "login" },
        { title: "Member Portal", description: "Personalised dashboard showing subscription status, content library, community feed, and account management.", layout: "portal" },
        { title: "Admin Overview", description: "Subscriber metrics, churn rates, revenue trends, and content engagement — the data you need to grow retention.", layout: "analytics" },
      ]}
    />
  );
}