import { AppTypePage } from "../../components/AppTypePage";
import {
  CloudCog, Users, CreditCard, BarChart3, Layers, ShieldCheck,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwY2xvdWQlMjBzb2Z0d2FyZSUyMHBsYXRmb3JtJTIwbGFwdG9wJTIwZGFya3xlbnwxfHx8fDE3NzMyNjIwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function SaaSPage() {
  return (
    <AppTypePage
      label="Web App Type — SaaS Platforms"
      title="SaaS & Multi-Tenant Platforms"
      subtitle="From idea to scalable software product"
      heroImage={heroImage}
      heroColor="#1f0f3a"
      overview="A SaaS platform is a software product that you sell as a subscription — serving many customers simultaneously from a single, scalable application."
      overviewDetail="SaaS (Software as a Service) is one of the most powerful business models available — recurring revenue, low marginal cost of adding new customers, and a product that improves with every iteration. We build SaaS platforms from scratch: multi-tenant architectures where each customer organisation has its own isolated data and configuration, subscription billing that handles upgrades, downgrades, and cancellations automatically, and the infrastructure to scale from your first paying customer to your ten-thousandth without a rewrite. We've built SaaS products across industries — from workforce management tools to property platforms and professional service applications."
      features={[
        {
          icon: Layers,
          title: "Multi-Tenant Architecture",
          body: "A single codebase serves all customers, with complete data isolation between organisations. Each tenant gets their own secure, configurable workspace.",
        },
        {
          icon: CreditCard,
          title: "Subscription Billing",
          body: "Stripe-powered billing handles plan tiers, usage-based pricing, free trials, proration, and automatic renewals — without manual intervention.",
        },
        {
          icon: Users,
          title: "Team & Permissions System",
          body: "Role-based access control lets customers manage their own team members, invite collaborators, and assign granular permissions within their account.",
        },
        {
          icon: CloudCog,
          title: "Scalable Infrastructure",
          body: "Built on cloud infrastructure that scales horizontally as your user base grows. Auto-scaling, queuing, and caching mean you'll never outgrow your stack.",
        },
        {
          icon: BarChart3,
          title: "Admin & Analytics",
          body: "A comprehensive operator dashboard gives you visibility into MRR, churn, active users, feature adoption, and any metric that matters to your business.",
        },
        {
          icon: ShieldCheck,
          title: "Enterprise-Grade Security",
          body: "SOC 2-aligned security practices, GDPR compliance, SSO integration, API key management, and audit logging — built in from day one.",
        },
      ]}
      industries={[
        {
          name: "HR & Workforce Management",
          description: "Rota scheduling, timesheet management, compliance tracking, and employee self-service platforms for multi-site businesses.",
        },
        {
          name: "Property & Real Estate",
          description: "Landlord management portals, letting agent CRMs, property inspection tools, and maintenance management platforms.",
        },
        {
          name: "Legal & Professional Services",
          description: "Matter management, time tracking, client billing, and document automation tools for law firms and professional practices.",
        },
        {
          name: "Hospitality & Events",
          description: "Venue management software, event planning tools, catering management platforms, and group booking coordination systems.",
        },
        {
          name: "Marketing & Agency Tools",
          description: "Client reporting dashboards, campaign management platforms, SEO tracking tools, and agency white-label software products.",
        },
        {
          name: "Health & Fitness",
          description: "Studio management software, personal training platforms, class scheduling SaaS, and wellbeing programme management tools.",
        },
      ]}
      included={[
        "Multi-tenant data architecture with full isolation",
        "User authentication with SSO, MFA, and magic link support",
        "Stripe subscription billing with plan tiers and trials",
        "In-app onboarding flow and user activation tracking",
        "Role-based access control with custom permission sets",
        "REST or GraphQL API for integrations and mobile clients",
        "Automated email sequences: welcome, activation, renewal",
        "Operator admin dashboard with customer management",
        "Usage and analytics tracking per account",
        "Feature flagging for gradual rollouts",
        "In-app support ticket or chat integration",
        "GDPR-compliant data export and deletion tools",
      ]}
      process={[
        {
          step: "01",
          title: "Product Discovery",
          description: "We run structured discovery sessions to define your core use case, target customer, differentiation, and MVP feature scope. We challenge assumptions and validate the product concept before a line is written.",
        },
        {
          step: "02",
          title: "Architecture & Stack",
          description: "We design the technical architecture — multi-tenancy model, data schema, API design, infrastructure, and third-party integrations — with scalability as the primary constraint.",
        },
        {
          step: "03",
          title: "MVP Build",
          description: "We build iteratively in fortnightly sprints, prioritising the features that prove product value earliest. You see working software regularly and can shape priorities as learning emerges.",
        },
        {
          step: "04",
          title: "Launch & Scale",
          description: "Managed launch to your early access cohort, followed by ongoing product development as you grow — new features, performance improvements, and infrastructure scaling as your user base expands.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "Customer Portals",
          description: "The customer-facing side of your SaaS — a branded account space for each subscriber.",
          path: "/web-apps/customer-portals",
        },
        {
          label: "Web App Type",
          title: "Internal Business Tools",
          description: "The operator-side tools your team needs to run and support your SaaS product.",
          path: "/web-apps/internal-tools",
        },
        {
          label: "Web App Type",
          title: "E-Commerce Stores",
          description: "Combine SaaS subscriptions with physical product sales in a unified commerce platform.",
          path: "/web-apps/ecommerce-stores",
        },
      ]}
      ctaTitle="Turn your software idea into a scalable, revenue-generating product."
    />
  );
}