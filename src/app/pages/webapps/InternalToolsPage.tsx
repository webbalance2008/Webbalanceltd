import { AppTypePage } from "../../components/AppTypePage";
import {
  Workflow, LayoutDashboard, FileSpreadsheet, Bell, Users, Lock,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZHVjdGl2aXR5JTIwc29mdHdhcmUlMjB3b3Jrc3BhY2UlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzMyNjIwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function InternalToolsPage() {
  return (
    <AppTypePage
      label="Web App Type — Internal Tools"
      title="Internal Business Tools & Dashboards"
      subtitle="Replace spreadsheets with software built for how you actually work"
      heroImage={heroImage}
      heroColor="#1a0f38"
      seoPath="/web-apps/internal-tools"
      seoKeywords="internal business tools, custom dashboard, bespoke admin software, workflow automation, UK"
      overview="A bespoke internal tool replaces the spreadsheets, disconnected apps, and manual processes that quietly drain your team's time and your business's efficiency."
      overviewDetail="Every business has operational complexity that off-the-shelf software can't quite handle. The workarounds accumulate — a spreadsheet here, a shared inbox there, a process that only three people understand — until inefficiency becomes the norm. We build custom internal tools that are designed around exactly how your business operates: the data you need to see, the workflows your team runs, the reports your leadership requires, and the integrations your existing systems demand. Internal tools are often the highest-ROI digital investment a business can make, because they pay back every single day."
      features={[
        {
          icon: LayoutDashboard,
          title: "Custom Admin Dashboards",
          body: "Real-time operational dashboards showing exactly the metrics your team needs — bookings, orders, staff performance, revenue, or any KPI that matters to your business.",
        },
        {
          icon: Workflow,
          title: "Process Automation",
          body: "Automate repetitive workflows — approvals, notifications, data entry, report generation — so your team focuses on work that requires human judgement.",
        },
        {
          icon: FileSpreadsheet,
          title: "Spreadsheet Replacement",
          body: "Turn your most complex, business-critical spreadsheets into robust web applications — with validation, history, multi-user access, and no risk of accidental deletion.",
        },
        {
          icon: Bell,
          title: "Alerting & Notifications",
          body: "Configurable alerts that notify the right person at the right time — low stock, overdue tasks, SLA breaches, anomalous data, or any threshold your business cares about.",
        },
        {
          icon: Users,
          title: "Multi-Team Access",
          body: "Role-based access gives each team member exactly the views and actions relevant to their role — from senior management to front-line staff.",
        },
        {
          icon: Lock,
          title: "Secure & Auditable",
          body: "Every action logged, every data change tracked. Full audit trail for compliance, accountability, and operational insight — critical for regulated industries.",
        },
      ]}
      industries={[
        {
          name: "Hospitality Operations",
          description: "Rota management, stock control, supplier ordering, daily revenue reconciliation, and multi-site performance dashboards for restaurant and hotel groups.",
        },
        {
          name: "Construction & Property",
          description: "Project tracking, contractor management, site inspection reporting, document control, and budget vs. actual dashboards for property developers.",
        },
        {
          name: "Logistics & Distribution",
          description: "Route planning, driver management, delivery tracking, vehicle maintenance scheduling, and customer communication tools for logistics businesses.",
        },
        {
          name: "Healthcare Administration",
          description: "Patient intake systems, staff scheduling, compliance tracking, equipment maintenance logs, and reporting tools for healthcare providers.",
        },
        {
          name: "Manufacturing & Production",
          description: "Production scheduling, quality control recording, machine maintenance tracking, supplier management, and output reporting for manufacturers.",
        },
        {
          name: "Professional Services",
          description: "Matter management, time recording, utilisation reporting, capacity planning, and billing reconciliation tools for agencies and professional practices.",
        },
      ]}
      included={[
        "Custom data model designed around your operations",
        "Role-based access for every level of your organisation",
        "Real-time dashboards with configurable widgets",
        "Automated workflow triggers and notifications",
        "Bulk data import and export functionality",
        "Full audit trail and change history",
        "Integration with existing systems (CRM, ERP, accounting)",
        "Custom reporting with export to PDF or Excel",
        "Mobile-responsive for field or floor-level access",
        "Search, filtering, and advanced data querying",
        "API access for third-party tool connections",
        "Ongoing development support as your needs evolve",
      ]}
      process={[
        {
          step: "01",
          title: "Process Archaeology",
          description: "We spend time with the people who actually do the work — not just leadership — to understand exactly how operations run today, where the pain is, and what a better tool would enable.",
        },
        {
          step: "02",
          title: "Data & Workflow Design",
          description: "We design the data model, user roles, and core workflows before any UI is created. The architecture must reflect your operations precisely — any mismatch here costs time and money later.",
        },
        {
          step: "03",
          title: "Build Iteratively",
          description: "We build in short cycles and put working software in front of your team early — because real users always reveal requirements that no discovery process fully captures.",
        },
        {
          step: "04",
          title: "Rollout & Adoption",
          description: "Managed rollout with training sessions, documentation, and a change management plan to ensure your team actually uses the tool — because adoption is where internal tools succeed or fail.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "Customer Portals",
          description: "The customer-facing counterpart to your internal operations tool.",
          path: "/web-apps/customer-portals",
        },
        {
          label: "Web App Type",
          title: "Booking Systems",
          description: "The admin and management side of a bespoke booking and reservation platform.",
          path: "/web-apps/booking-systems",
        },
        {
          label: "Web App Type",
          title: "SaaS Platforms",
          description: "Turn your internal tool into a product you can sell to others in your industry.",
          path: "/web-apps/saas-platforms",
        },
      ]}
      ctaTitle="Stop working around your tools. Let's build the ones you actually need."
      concepts={[
        { title: "Operations Dashboard", description: "Centralised admin view with KPIs, team activity, pipeline status, and real-time business metrics.", layout: "dashboard" },
        { title: "Task & Workflow Board", description: "Kanban-style task management with drag-and-drop, assignments, deadlines, and progress tracking.", layout: "kanban" },
        { title: "Data Management", description: "Searchable, filterable data tables replacing spreadsheets — with inline editing, exports, and role-based access.", layout: "list" },
      ]}
    />
  );
}