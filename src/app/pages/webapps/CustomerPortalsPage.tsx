import { AppTypePage } from "../../components/AppTypePage";
import {
  UserCircle, FileText, Bell, Shield, LayoutDashboard, MessageSquare,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1578070581071-d9b52bf80993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwbW9uaXRvciUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzczMjYyMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function CustomerPortalsPage() {
  return (
    <AppTypePage
      label="Web App Type — Customer Portals"
      title="Customer Portals & Account Dashboards"
      subtitle="Give every customer a private, branded home"
      heroImage={heroImage}
      heroColor="#2a1545"
      seoPath="/web-apps/customer-portals"
      seoKeywords="customer portal, client dashboard, account management app, branded portal, UK custom development"
      overview="A customer portal transforms one-off transactions into ongoing relationships — giving your clients a branded space to manage everything, on their schedule."
      overviewDetail="A customer portal is a secure, personalised online space where your clients can access their account, view order history, manage subscriptions, track project progress, access documents, and communicate with your team — all without picking up the phone or sending an email. Portals reduce your administrative overhead dramatically while simultaneously improving the customer experience. Every interaction feels considered, branded, and professional. We build portals that integrate seamlessly with your existing systems and are designed with your specific customer workflows in mind."
      features={[
        {
          icon: UserCircle,
          title: "Personalised Account View",
          body: "Each user logs in to a dashboard tailored to their account — showing their specific orders, bookings, documents, or project status at a glance.",
          detail: "No two customers see the same portal. The moment a user logs in, they see a dashboard populated entirely with their own account data — their orders, their documents, their ongoing projects, their support history. Nothing irrelevant, nothing missing. This isn't just a cosmetic personalisation: the underlying data model is built around your specific customer relationships, so the portal reflects exactly how your business works with each client, not a generic CRM layout bolted onto your brand.",
        },
        {
          icon: FileText,
          title: "Document & Invoice Access",
          body: "Customers can download invoices, contracts, reports, or any document you choose to share — reducing inbound admin requests significantly.",
          detail: "One of the single highest-volume support requests in any service business is 'can you resend my invoice?' — and a customer portal eliminates it entirely. Every document you choose to share lives in the customer's account permanently: invoices, contracts, statements, reports, technical documents, certificates. They download what they need, when they need it. You control what each customer can see, and you can push new documents to their account at any time. Most businesses see a dramatic reduction in admin calls and emails within weeks of launch.",
        },
        {
          icon: LayoutDashboard,
          title: "Real-Time Status Tracking",
          body: "Let customers track orders, projects, or service requests in real time, with status updates pushed automatically as things progress.",
          detail: "Customers hate uncertainty. 'Where is my order?' and 'What stage is my project at?' are questions that erode trust when left unanswered. Status tracking gives customers complete visibility — automatically updated as your team progresses work, ships orders, or completes milestones. Status changes trigger notifications so customers are informed without needing to log in and check. The result is a relationship built on transparency, not chasing. Your team spends less time updating clients manually and more time doing the actual work.",
        },
        {
          icon: MessageSquare,
          title: "In-Portal Messaging",
          body: "A built-in messaging thread keeps all client communication contextual and searchable — no more digging through email chains.",
          detail: "Email is a terrible tool for managing client communication — threads get forwarded, people go on leave, context gets lost. In-portal messaging keeps every conversation attached to the right account, the right project, and the right person. Both sides can attach files, reference documents, and see the full history of every exchange. Your team manages all client communications from a single admin interface. Customers never need to CC the right person or wonder which inbox to check. Everything is in one place, forever searchable.",
        },
        {
          icon: Bell,
          title: "Notifications & Alerts",
          body: "Automated email and in-portal notifications keep customers informed of status changes, upcoming renewals, or required actions without manual effort from your team.",
          detail: "The portal works proactively, not just reactively. Status changes, document uploads, upcoming renewals, overdue actions, and payment confirmations all trigger intelligent notifications — delivered by email, within the portal, or both. You define the rules: what events trigger notifications, who receives them, and what the messages say. Customers who feel informed and looked after are customers who stay. Automated notifications mean your team never has to remember to send a chaser, an update, or a renewal reminder.",
        },
        {
          icon: Shield,
          title: "Role-Based Access Control",
          body: "Fine-grained permissions so different users within the same client account see only what's relevant to them — from admin contacts to end users.",
          detail: "Enterprise clients rarely have a single point of contact. A portal account might have a finance manager who needs invoices, a project manager who needs status updates, and an executive who needs summary reporting — but none of them should see each other's sensitive data or access areas irrelevant to their role. Role-based access lets you define exactly what each user type within a client organisation can see and do. New team members can be added, old ones removed, and permissions adjusted without any development work.",
        },
      ]}
      industries={[
        {
          name: "Professional Services",
          description: "Law firms, accountants, and consultancies giving clients access to case progress, document sharing, billing, and secure messaging.",
          detail: "For law firms, accountancies, and consultancies, client relationships live and die on communication and trust. A client portal transforms the client experience: matters and engagements are tracked visually, bills and time entries are transparent, documents can be shared and signed digitally, and all communication is logged and searchable. Clients feel informed and in control rather than waiting for updates. Your team spends less time on status calls and more time on billable work.",
        },
        {
          name: "Creative & Digital Agencies",
          description: "Project portals where clients track campaign performance, approve creative work, and access deliverables and reports.",
          detail: "Agency client management is notoriously high-touch. A client portal changes that dynamic: campaign performance data updates in real time, creative work is presented for approval within the portal with annotation and sign-off functionality, deliverables are stored and downloadable forever, and monthly reports are pushed automatically rather than emailed. Clients feel involved without needing constant briefing calls. Approval trails are documented. And the portal itself becomes a demonstration of the quality and professionalism clients are paying for.",
        },
        {
          name: "E-Commerce & Retail",
          description: "Account dashboards for order history, returns management, loyalty points, and personalised product recommendations.",
          detail: "A great customer account turns one-time buyers into loyal customers. Beyond basic order history, a well-designed e-commerce portal gives customers easy returns initiation, loyalty point balances and how to redeem them, subscription management, personalised reorder prompts, and a clear view of upcoming deliveries. B2B retailers can add trade pricing tiers, bulk order tools, and account credit management. Every touchpoint reinforces the relationship and increases the probability of the next purchase.",
        },
        {
          name: "Property & Real Estate",
          description: "Landlord and tenant portals for maintenance requests, rental statements, document signing, and lease management.",
          detail: "Property management generates enormous amounts of administration — rent collection, maintenance coordination, tenancy documents, compliance certificates, and communication across multiple parties. A property portal brings all of this into one place: tenants report maintenance issues with photographs, landlords approve works with a single click, rent statements are downloadable on demand, and all tenancy documents live in one secure location. Both tenants and landlords have a permanent, clear record of every interaction.",
        },
        {
          name: "Finance & Insurance",
          description: "Policy management portals, claims tracking, document uploads, and personalised financial summaries in a secure environment.",
          detail: "Financial services clients expect security, clarity, and self-service. Portals for financial services provide policy or account summaries in plain language, claims status tracking with clear milestone updates, secure document upload for supporting evidence, and communication threads with advisers that maintain a full audit trail. Everything is built to GDPR standards with enterprise-grade authentication. Clients who can manage their finances on their own schedule are more satisfied and generate fewer support interactions.",
        },
        {
          name: "Healthcare & Wellness",
          description: "Patient portals for appointment management, test results, prescription tracking, and secure practitioner communication.",
          detail: "Healthcare portal requirements are specific and high-stakes: security is paramount, communication must be clear and compassionate, and the interface must be accessible to people who may be anxious or unwell. Patient portals we build provide appointment management, test result access with contextual explanations, repeat prescription requests, secure messaging with their care team, and a health summary view. Administrative overhead for reception teams drops sharply as patients self-serve for routine requests.",
        },
      ]}
      included={[
        "Secure authentication with email/password and SSO options",
        "Personalised dashboard per customer account",
        "Document storage and download centre",
        "Order, project, or service status tracking",
        "In-portal messaging or support ticket system",
        "Automated email notifications for key events",
        "Role-based access for multi-user accounts",
        "Mobile-responsive design for all screen sizes",
        "Admin panel to manage all customer accounts centrally",
        "Integration with your CRM, billing, or ERP systems",
        "Audit trail and activity log per account",
        "GDPR-compliant data storage and processing",
      ]}
      process={[
        {
          step: "01",
          title: "Customer Journey Mapping",
          description: "We document every touchpoint your customers currently have with your business — support emails, phone calls, manual reports — and identify which should be automated through the portal.",
        },
        {
          step: "02",
          title: "Architecture & Access Design",
          description: "We design the data architecture, user roles, and permission model before any front-end design begins. Getting this right is critical to long-term scalability.",
        },
        {
          step: "03",
          title: "Build & Integrate",
          description: "Development of the portal with full integration into your existing systems — pulling in live data from your CRM, billing platform, or project management tools.",
        },
        {
          step: "04",
          title: "Onboarding & Launch",
          description: "We help you migrate existing customers into the portal, run staff training sessions, and provide communication templates to introduce the portal to your client base.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "SaaS Platforms",
          description: "Build a software product that serves many customers from a single multi-tenant application.",
          path: "/web-apps/saas-platforms",
        },
        {
          label: "Web App Type",
          title: "Booking Systems",
          description: "Embed booking functionality directly into your customer portal.",
          path: "/web-apps/booking-systems",
        },
        {
          label: "Web App Type",
          title: "Internal Business Tools",
          description: "The admin side of your customer portal — powerful tools for your team to manage accounts.",
          path: "/web-apps/internal-tools",
        },
      ]}
      ctaTitle="Your customers deserve better than a reply-all email chain."
      concepts={[
        { title: "Account Portal", description: "Branded dashboard where customers view orders, manage their profile, and access documents — all behind a secure login.", layout: "portal" },
        { title: "Messaging & Support", description: "Built-in messaging thread between your team and each customer, with file sharing and notification alerts.", layout: "chat" },
        { title: "Activity & History", description: "Chronological timeline of orders, invoices, support tickets, and account changes — everything in one place.", layout: "list" },
      ]}
    />
  );
}