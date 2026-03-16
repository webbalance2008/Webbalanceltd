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
          detail: "Off-the-shelf dashboards show you what the software vendor thinks is important. Custom dashboards show you what your business actually needs to run. We build operational dashboards around the specific KPIs that drive your decisions: live revenue against target, occupancy rates, staff utilisation, outstanding tasks by priority, SLA status across active accounts, or any metric unique to your operation. Data is pulled in real time from your existing systems — no manual refresh, no export-and-import, no lag between reality and what you're looking at.",
        },
        {
          icon: Workflow,
          title: "Process Automation",
          body: "Automate repetitive workflows — approvals, notifications, data entry, report generation — so your team focuses on work that requires human judgement.",
          detail: "Every business has processes that happen on repeat: a new customer triggers a welcome sequence, a purchase order over a certain value needs two-tier approval, an overdue task escalates to a manager after 48 hours, a weekly report compiles automatically and lands in the right inboxes. These workflows are the invisible plumbing of your operation, and right now they depend on someone remembering to do them. Process automation codifies those rules into the system — they execute reliably, without human intervention, every single time.",
        },
        {
          icon: FileSpreadsheet,
          title: "Spreadsheet Replacement",
          body: "Turn your most complex, business-critical spreadsheets into robust web applications — with validation, history, multi-user access, and no risk of accidental deletion.",
          detail: "The spreadsheet that runs your business is both your most critical tool and your biggest operational risk. When only one person understands the formulas, when two people edit simultaneously and overwrite each other, when a cell is accidentally deleted and no one notices for a week — these aren't hypothetical problems. They've already happened, or they will. Converting business-critical spreadsheets into proper web applications introduces data validation, concurrent access without conflicts, a complete edit history, and role-based views that give each user exactly what they need.",
        },
        {
          icon: Bell,
          title: "Alerting & Notifications",
          body: "Configurable alerts that notify the right person at the right time — low stock, overdue tasks, SLA breaches, anomalous data, or any threshold your business cares about.",
          detail: "The best internal tools are proactive, not reactive. Rather than requiring your team to check dashboards constantly, configurable alerting pushes the right information to the right person the moment it matters. Stock below reorder threshold? The purchasing manager gets a notification. A client hasn't been contacted in 30 days? The account manager is prompted. Revenue 15% below weekly run rate by Wednesday? The GM is alerted before Thursday's team meeting. Every alert threshold is configurable by your team without developer involvement.",
        },
        {
          icon: Users,
          title: "Multi-Team Access",
          body: "Role-based access gives each team member exactly the views and actions relevant to their role — from senior management to front-line staff.",
          detail: "A tool that tries to show everything to everyone is a tool that frustrates everyone. Role-based access means the front-of-house team sees reservations and tables, the kitchen sees orders and prep lists, managers see performance data, and directors see P&L and trend analysis — all within the same platform, all showing precisely what each role needs. New starters are onboarded with the right access level from day one. Leavers are deactivated immediately. Sensitive financial or HR data is restricted to those who need it.",
        },
        {
          icon: Lock,
          title: "Secure & Auditable",
          body: "Every action logged, every data change tracked. Full audit trail for compliance, accountability, and operational insight — critical for regulated industries.",
          detail: "In regulated industries — and increasingly in all businesses — the ability to demonstrate that a process was followed correctly, by whom, and when is not optional. Every action taken in the tool is logged with a timestamp and the user responsible: records created, data modified, approvals given, documents downloaded. The audit trail is searchable and exportable for compliance reporting, client audits, or internal investigations. When something goes wrong, you can trace exactly what happened, in what order, and who was responsible.",
        },
      ]}
      industries={[
        {
          name: "Hospitality Operations",
          description: "Rota management, stock control, supplier ordering, daily revenue reconciliation, and multi-site performance dashboards for restaurant and hotel groups.",
          detail: "Running a multi-site hospitality business on spreadsheets and WhatsApp groups is a recipe for errors, inconsistency, and burnout. Custom operations tools bring everything into one system: weekly rota building with availability management and shift swapping, stock counts and par levels with automatic supplier ordering, daily cover and revenue tracking against targets, and a dashboard that lets you compare performance across every site at a glance. Management spends less time chasing information and more time making decisions.",
        },
        {
          name: "Construction & Property",
          description: "Project tracking, contractor management, site inspection reporting, document control, and budget vs. actual dashboards for property developers.",
          detail: "Construction projects involve dozens of contractors, thousands of documents, and financial tracking across multiple cost codes — all of which need to stay connected. Custom project management tools for developers track programme milestones in real time, manage contractor sign-off and defect lists, store all drawings and specifications with version control, and show budget vs. actual at the click of a button. Site inspection reports are completed on tablet in the field and automatically filed to the right project, reducing the administrative burden on site managers significantly.",
        },
        {
          name: "Logistics & Distribution",
          description: "Route planning, driver management, delivery tracking, vehicle maintenance scheduling, and customer communication tools for logistics businesses.",
          detail: "Logistics operations run on precision timing and clear communication — and the administrative overhead of managing these manually grows exponentially with scale. Custom tools for logistics businesses handle route optimisation and driver assignment, real-time delivery status tracking with automatic customer notifications, vehicle maintenance scheduling with MOT and service reminders, and performance reporting on driver metrics, on-time delivery rates, and cost per delivery. Dispatchers have a live operational picture; drivers have a clear run sheet on their phone.",
        },
        {
          name: "Healthcare Administration",
          description: "Patient intake systems, staff scheduling, compliance tracking, equipment maintenance logs, and reporting tools for healthcare providers.",
          detail: "Healthcare administration carries high stakes: compliance must be demonstrable, patient data must be secure, and staff scheduling gaps have direct impact on patient care. Custom tools for healthcare providers handle digital patient intake with structured form capture, staff scheduling with qualification and registration checks, mandatory training compliance tracking, equipment maintenance logs with upcoming service alerts, and CQC-ready reporting. Everything is built to NHS Data Security standards and fully auditable for regulatory inspection.",
        },
        {
          name: "Manufacturing & Production",
          description: "Production scheduling, quality control recording, machine maintenance tracking, supplier management, and output reporting for manufacturers.",
          detail: "Manufacturing efficiency is measured in seconds and millimetres, but the administrative processes that support production — scheduling, quality recording, maintenance tracking — often run on clipboards and email. Custom production tools replace these with structured digital workflows: production orders with real-time output recording, quality control checksheets with automatic non-conformance escalation, machine maintenance logs with predictive scheduling, and supplier performance tracking. OEE, yield rates, and defect trends are visible in real time rather than calculated in a weekly spreadsheet.",
        },
        {
          name: "Professional Services",
          description: "Matter management, time recording, utilisation reporting, capacity planning, and billing reconciliation tools for agencies and professional practices.",
          detail: "In professional services, time is the product — and managing it well is the difference between a profitable month and a difficult conversation about write-offs. Custom practice management tools handle matter or project setup with budget and timeline tracking, daily time recording with automatic billing calculation, utilisation reports that show how effectively each team member's time is being deployed, capacity planning for new business decisions, and billing reconciliation that flags discrepancies before invoices go out. Revenue per partner, recovery rates, and WIP visibility are all available on demand.",
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