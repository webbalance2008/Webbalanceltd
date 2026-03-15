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
        },
        {
          icon: CreditCard,
          title: "Recurring Billing",
          body: "Stripe-powered subscriptions with monthly and annual billing, free trial periods, promotional pricing, and automatic renewal with failed payment recovery.",
        },
        {
          icon: Crown,
          title: "Member Tiers & Perks",
          body: "Create multiple membership levels with distinct benefits — exclusive content, early access, discounts, or physical perks — configurable without developer involvement.",
        },
        {
          icon: Rss,
          title: "Content Management",
          body: "A full CMS for articles, videos, podcasts, downloadable resources, and live events — all gateable by membership tier and publishable by your team.",
        },
        {
          icon: Users,
          title: "Community Features",
          body: "Member directories, discussion forums, comment threads, direct messaging, and event RSVPs to create genuine connection between your members.",
        },
        {
          icon: Gift,
          title: "Loyalty & Rewards",
          body: "Points systems, referral programmes, anniversary rewards, and milestone recognition that keep members engaged and actively recruiting new subscribers.",
        },
      ]}
      industries={[
        {
          name: "Media & Publishing",
          description: "Paywalled editorial content, premium newsletters, podcast archives, and subscriber-only events for media brands and independent publishers.",
        },
        {
          name: "Professional Associations",
          description: "Membership management, CPD tracking, resource libraries, directory listings, and event management for trade bodies and professional networks.",
        },
        {
          name: "Fitness & Wellness",
          description: "Online class libraries, programme access, nutrition tracking, and coach-member communication for fitness brands scaling beyond in-person delivery.",
        },
        {
          name: "Education & Courses",
          description: "Cohort-based learning programmes, drip-released course content, student communities, and progress tracking for educators and training providers.",
        },
        {
          name: "Hospitality & Lifestyle",
          description: "VIP dining clubs, hotel loyalty programmes, exclusive experience access, and concierge services for premium hospitality brands.",
        },
        {
          name: "B2B & Professional Services",
          description: "Knowledge communities, peer networking platforms, industry research access, and peer benchmarking tools for B2B audiences.",
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