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
        },
        {
          icon: FileText,
          title: "Document & Invoice Access",
          body: "Customers can download invoices, contracts, reports, or any document you choose to share — reducing inbound admin requests significantly.",
        },
        {
          icon: LayoutDashboard,
          title: "Real-Time Status Tracking",
          body: "Let customers track orders, projects, or service requests in real time, with status updates pushed automatically as things progress.",
        },
        {
          icon: MessageSquare,
          title: "In-Portal Messaging",
          body: "A built-in messaging thread keeps all client communication contextual and searchable — no more digging through email chains.",
        },
        {
          icon: Bell,
          title: "Notifications & Alerts",
          body: "Automated email and in-portal notifications keep customers informed of status changes, upcoming renewals, or required actions without manual effort from your team.",
        },
        {
          icon: Shield,
          title: "Role-Based Access Control",
          body: "Fine-grained permissions so different users within the same client account see only what's relevant to them — from admin contacts to end users.",
        },
      ]}
      industries={[
        {
          name: "Professional Services",
          description: "Law firms, accountants, and consultancies giving clients access to case progress, document sharing, billing, and secure messaging.",
        },
        {
          name: "Creative & Digital Agencies",
          description: "Project portals where clients track campaign performance, approve creative work, and access deliverables and reports.",
        },
        {
          name: "E-Commerce & Retail",
          description: "Account dashboards for order history, returns management, loyalty points, and personalised product recommendations.",
        },
        {
          name: "Property & Real Estate",
          description: "Landlord and tenant portals for maintenance requests, rental statements, document signing, and lease management.",
        },
        {
          name: "Finance & Insurance",
          description: "Policy management portals, claims tracking, document uploads, and personalised financial summaries in a secure environment.",
        },
        {
          name: "Healthcare & Wellness",
          description: "Patient portals for appointment management, test results, prescription tracking, and secure practitioner communication.",
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