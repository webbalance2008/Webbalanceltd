import { AppTypePage } from "../../components/AppTypePage";
import {
  CloudCog, Users, CreditCard, BarChart3, Layers, ShieldCheck,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwY2xvdWQlMjBzb2Z0d2FyZSUyMHBsYXRmb3JtJTIwZGFya3xlbnwxfHx8fDE3NzMyNjIwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function SaaSPage() {
  return (
    <AppTypePage
      label="Web App Type — SaaS Platforms"
      title="SaaS & Multi-Tenant Platforms"
      subtitle="From idea to scalable software product"
      heroImage={heroImage}
      heroColor="#1f0f3a"
      seoPath="/web-apps/saas-platforms"
      seoKeywords="SaaS development, multi-tenant platform, software as a service, cloud app development, UK SaaS builder"
      overview="A SaaS platform is a software product that you sell as a subscription — serving many customers simultaneously from a single, scalable application."
      overviewDetail="SaaS (Software as a Service) is one of the most powerful business models available — recurring revenue, low marginal cost of adding new customers, and a product that improves with every iteration. We build SaaS platforms from scratch: multi-tenant architectures where each customer organisation has its own isolated data and configuration, subscription billing that handles upgrades, downgrades, and cancellations automatically, and the infrastructure to scale from your first paying customer to your ten-thousandth without a rewrite. We've built SaaS products across industries — from workforce management tools to property platforms and professional service applications."
      features={[
        {
          icon: Layers,
          title: "Multi-Tenant Architecture",
          body: "A single codebase serves all customers, with complete data isolation between organisations. Each tenant gets their own secure, configurable workspace.",
          detail: "Multi-tenancy is the architectural decision that makes SaaS economically viable — one codebase, one infrastructure, serving hundreds or thousands of customers simultaneously. But it must be implemented correctly from the start. Each customer organisation lives in a completely isolated data environment: there is no possibility of one tenant accessing another's data, even through edge cases or API queries. Customers can configure their own workspace — settings, branding, user permissions, integrations — without affecting anyone else. And when you deploy an update, every customer benefits simultaneously.",
        },
        {
          icon: CreditCard,
          title: "Subscription Billing",
          body: "Stripe-powered billing handles plan tiers, usage-based pricing, free trials, proration, and automatic renewals — without manual intervention.",
          detail: "Stripe Billing is the most powerful subscription infrastructure available, and we implement it in full. Plan tiers with monthly and annual pricing, usage-based components (per seat, per API call, per GB), free trial periods that convert automatically without requiring a card upfront, prorated charges when customers upgrade mid-cycle, and coupon codes for promotional campaigns. Failed payment recovery operates through an intelligent dunning sequence — retry cadences, customer notifications, and grace periods — recovering revenue that would otherwise be lost to card declines. The entire billing lifecycle runs without manual intervention.",
        },
        {
          icon: Users,
          title: "Team & Permissions System",
          body: "Role-based access control lets customers manage their own team members, invite collaborators, and assign granular permissions within their account.",
          detail: "SaaS products are rarely used by a single person — most customers are organisations that need to manage their own team access. A robust permissions system lets account owners invite team members by email, assign them roles (admin, editor, viewer, or custom), and adjust or revoke access without contacting support. Granular permission controls mean different team members see different parts of the application based on their role. Large enterprise customers may need to map your permission system to their own SSO groups — we build for that requirement from day one.",
        },
        {
          icon: CloudCog,
          title: "Scalable Infrastructure",
          body: "Built on cloud infrastructure that scales horizontally as your user base grows. Auto-scaling, queuing, and caching mean you'll never outgrow your stack.",
          detail: "The infrastructure choices made at the start of a SaaS product determine how expensive and painful growth will be. We architect for horizontal scalability from the beginning: stateless application servers that can be replicated as load increases, database architectures that handle read scaling, background job queues that process workloads asynchronously rather than blocking user requests, and caching layers that reduce database load for frequently accessed data. When you go from 100 to 10,000 customers, the infrastructure scales with you — not against you.",
        },
        {
          icon: BarChart3,
          title: "Admin & Analytics",
          body: "A comprehensive operator dashboard gives you visibility into MRR, churn, active users, feature adoption, and any metric that matters to your business.",
          detail: "As the SaaS operator, you need to see your business clearly: which customers are active, which are at risk of churning, which features are driving engagement, and what your revenue trajectory looks like. The operator dashboard surfaces all of this: MRR and ARR with growth trends, churn rate with cohort analysis, daily/weekly/monthly active user counts, feature adoption heat maps, trial-to-paid conversion rates, and customer health scores that flag accounts showing declining engagement. When a customer is at risk, you know before they cancel.",
        },
        {
          icon: ShieldCheck,
          title: "Enterprise-Grade Security",
          body: "SOC 2-aligned security practices, GDPR compliance, SSO integration, API key management, and audit logging — built in from day one.",
          detail: "Security is not a feature to add later — it's a foundation to build on from day one. Enterprise customers will ask about your security posture before signing, and the answers need to be comprehensive. We build with SOC 2-aligned practices: encrypted data at rest and in transit, SSO via SAML and OIDC for enterprise customers, API key management with scopes and rotation, comprehensive audit logging of all user actions, GDPR-compliant data handling with export and deletion tools, and penetration testing as part of the build process. Security posture that can withstand enterprise procurement scrutiny from launch.",
        },
      ]}
      industries={[
        {
          name: "HR & Workforce Management",
          description: "Rota scheduling, timesheet management, compliance tracking, and employee self-service platforms for multi-site businesses.",
          detail: "HR and workforce management software is one of the most consistently successful SaaS verticals because the pain it replaces — manual rotas, paper timesheets, scattered compliance records — is universal and deeply felt. A well-built platform handles rota creation with availability rules and skill matching, timesheet submission and approval, holiday and absence management, compliance tracking (right to work, training certificates), and employee self-service for payslips and HR requests. Multi-site businesses in hospitality, care, retail, and facilities management are the sweet spot: high staff volumes, complex scheduling, and operations that can't afford administrative errors.",
        },
        {
          name: "Property & Real Estate",
          description: "Landlord management portals, letting agent CRMs, property inspection tools, and maintenance management platforms.",
          detail: "Property management software serves a market with enormous complexity and a clear willingness to pay for tools that reduce it. A letting agent CRM manages the full lifecycle of a tenancy — from applicant tracking through to end-of-tenancy deposit reconciliation. Landlord portals give portfolio owners visibility of income, expenditure, maintenance, and compliance across all properties. Inspection tools with mobile-optimised property report capture and photo documentation replace paper forms entirely. The regulatory requirements of the property sector (EPC certificates, gas safety, deposit protection) create clear, automatable compliance workflows.",
        },
        {
          name: "Legal & Professional Services",
          description: "Matter management, time tracking, client billing, and document automation tools for law firms and professional practices.",
          detail: "Law firms and professional practices have been chronically underserved by software that understands how they actually work. A well-designed practice management SaaS handles matter or engagement setup with team assignment and budget tracking, time recording at task level with automatic billing calculation, document generation from templates with variable data, client billing with disbursement capture, and utilisation and recovery reporting that tells partners exactly how profitably each matter is running. White-label options let you offer this as a product to firms in your network.",
        },
        {
          name: "Hospitality & Events",
          description: "Venue management software, event planning tools, catering management platforms, and group booking coordination systems.",
          detail: "Hospitality and events management is operationally complex and data-intensive: venues managing multiple spaces, events teams coordinating dozens of suppliers, catering businesses tracking dietary requirements for hundreds of guests. SaaS products in this space handle venue booking and availability calendars, event project management with timeline and supplier coordination, catering pack management with dietary flags and allergen tracking, and post-event financial reconciliation. The market is large and the incumbent solutions are often legacy desktop software ripe for displacement.",
        },
        {
          name: "Marketing & Agency Tools",
          description: "Client reporting dashboards, campaign management platforms, SEO tracking tools, and agency white-label software products.",
          detail: "Marketing agencies and consultancies often build internal tools to solve their own operational problems — and realise those tools have value for peers and clients in the wider market. Client reporting dashboards that aggregate data from Google Analytics, paid search, social, and email into a single branded view are a classic example: solving a universal agency pain point, with a natural white-label model. Campaign management platforms, SEO rank tracking tools, and social scheduling platforms have each been built by agencies for agencies — often growing into significant standalone businesses.",
        },
        {
          name: "Health & Fitness",
          description: "Studio management software, personal training platforms, class scheduling SaaS, and wellbeing programme management tools.",
          detail: "The health and fitness industry runs on scheduling, memberships, and coach-client relationships — all of which demand software built for the specific workflows of the sector. Studio management SaaS handles class timetabling, instructor assignment, membership billing, and attendance tracking in one place. Personal training platforms connect coaches with their clients digitally — programme delivery, progress tracking, check-in messaging, and nutrition guidance. Corporate wellbeing platforms deliver structured employee health programmes at enterprise scale. Each of these is a distinct product opportunity with a clear, underserved market.",
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
      concepts={[
        { title: "Multi-Tenant Dashboard", description: "Each customer gets their own workspace with data isolation, team management, and usage metrics — from a single codebase.", layout: "dashboard" },
        { title: "Onboarding & Auth", description: "Guided signup flow with organisation creation, team invites, role assignment, and plan selection.", layout: "login" },
        { title: "Platform Analytics", description: "MRR tracking, customer health scores, feature adoption rates, and churn signals — the metrics that drive SaaS growth.", layout: "analytics" },
      ]}
    />
  );
}