import { AppTypePage } from "../../components/AppTypePage";
import {
  CalendarCheck, Clock, CreditCard, Bell, BarChart3, Users,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1769596722510-b92780d03424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBib29raW5nJTIwcmVzZXJ2YXRpb24lMjBjYWxlbmRhciUyMHNvZnR3YXJlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MzI2MjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080";

export function BookingSystemsPage() {
  return (
    <AppTypePage
      label="Web App Type — Booking Systems"
      title="Booking & Reservation Systems"
      subtitle="Take bookings 24/7 — without the phone calls"
      heroImage={heroImage}
      seoPath="/web-apps/booking-systems"
      seoKeywords="booking system, reservation software, online scheduling, appointment booking app, UK"
      heroColor="#1a0f2e"
      overview="A bespoke booking system turns your availability into revenue around the clock, without a phone call or email exchange."
      overviewDetail="Whether you run a restaurant, hotel, salon, fitness studio, or professional services practice, your customers expect to book online — immediately, at any hour. Off-the-shelf booking tools are generic, often ugly, and charge per-booking fees that compound over time. We build bespoke booking and reservation systems that match your brand, fit your workflow exactly, and put you in complete control of your availability, pricing, and customer data. No monthly subscription per seat. No third-party branding. Just a system that works precisely the way your business works."
      features={[
        {
          icon: CalendarCheck,
          title: "Real-Time Availability",
          body: "Live calendar management with instant confirmation. Customers see exactly what's available and receive automated booking confirmations the moment they reserve.",
          detail: "Your availability is always accurate and always live. The moment a booking is made, it's reflected everywhere — your calendar, your admin dashboard, and the customer-facing booking widget. No double-bookings. No lag. Customers receive an instant confirmation email the moment they complete their reservation, with all the details they need: date, time, location, what to bring, and who to contact. Buffer times between appointments are enforced automatically, so you never end up running into the next booking unprepared.",
        },
        {
          icon: CreditCard,
          title: "Integrated Payments",
          body: "Take deposits or full payment at time of booking via Stripe. Reduce no-shows with card-on-file pre-authorisation and configurable cancellation policies.",
          detail: "Stripe powers the entire payment experience — seamlessly embedded into your booking flow with no redirects to third-party checkout pages. You decide whether to take a deposit, full payment, or simply hold a card on file to enforce cancellation fees. Cancellation and refund policies are configurable per service type, so a no-show for a restaurant booking and a missed dental appointment are handled completely differently. Pre-authorisation means you protect your revenue without asking customers for money upfront when it isn't appropriate.",
        },
        {
          icon: Bell,
          title: "Automated Reminders",
          body: "Reduce no-shows by up to 60% with automated SMS and email reminders sent at configurable intervals before each booking.",
          detail: "No-shows are one of the most costly problems in any appointment-based business. Our reminder system sends automated email and SMS messages at intervals you define — 48 hours before, 24 hours before, 2 hours before — each one personalised with the customer's booking details, your branding, and a one-click cancellation or rescheduling link. Customers who reschedule rather than simply not showing up are far better for your business than those who vanish, and the reminder flow is designed to make rescheduling as easy as possible. Businesses typically see no-show rates fall by 50–65% within the first month.",
        },
        {
          icon: Users,
          title: "Staff & Resource Management",
          body: "Assign bookings to specific team members, rooms, tables, or equipment. Manage multiple staff calendars from a single admin view.",
          detail: "Whether you have two therapists or twenty, the booking system manages individual schedules, skills, and availability for each. Customers can choose a specific team member if you want them to, or the system can assign the next available person automatically. Resources — treatment rooms, courts, studios, or equipment — are managed as their own bookable entities, so you can prevent conflicts across both staff and space simultaneously. Managers see a single unified view of every calendar, while individual team members only see their own bookings.",
        },
        {
          icon: Clock,
          title: "Flexible Scheduling Rules",
          body: "Set buffer times, minimum notice periods, maximum advance booking windows, and blackout dates — all configurable without touching code.",
          detail: "Every business has different scheduling needs, and the system bends to yours. Set a 15-minute preparation buffer between back-to-back appointments. Require 24 hours' minimum notice for bookings so you're never caught unprepared. Limit how far in advance customers can book to prevent your diary filling up for three months with low-priority slots. Block out dates for holidays, staff training, or maintenance periods. All of this is controlled through a simple admin interface — no developer involvement required, ever.",
        },
        {
          icon: BarChart3,
          title: "Reporting & Analytics",
          body: "Revenue reports, booking trend analysis, cancellation tracking, and customer retention data — all in a clean, real-time admin dashboard.",
          detail: "Your booking system is also a business intelligence tool. The analytics dashboard surfaces the metrics that matter: total revenue by period, revenue per service, your busiest hours and days, average lead time between booking and visit, cancellation rates by service type, and customer return frequency. You can identify which services drive the highest value, which staff members are most in demand, and which time slots are consistently underperforming — then act on that data. Export any report to CSV for accounting or business reviews.",
        },
      ]}
      industries={[
        {
          name: "Restaurants & Bars",
          description: "Table reservations with covers management, pre-orders, dietary requirements capture, and waitlist functionality for peak periods.",
          detail: "A restaurant booking system needs to handle the full complexity of hospitality service — not just put names in a diary. We build systems that manage covers per sitting, allocate tables intelligently based on party size, capture dietary requirements and special occasions, allow guests to pre-order from a set menu, and maintain a live waitlist during peak periods. Service staff see the full picture for each booking before guests arrive, so every table feels expected and prepared for.",
        },
        {
          name: "Hotels & Boutique Stays",
          description: "Room booking with rate management, availability sync, and pre-arrival guest communication — all fully branded to your property.",
          detail: "Hotel and accommodation booking is complex: room types, rate plans, seasonal pricing, minimum stays, and the need for elegant pre-arrival communication all need to work together seamlessly. We build property booking systems that reflect the quality and character of your stay, with a booking journey that feels as considered as the property itself. Rate management, multi-room availability, and two-way calendar sync with OTAs (if required) keep your occupancy accurate across every channel.",
        },
        {
          name: "Salons & Spas",
          description: "Appointment booking by service type and specific staff member, with product upsells, patch test tracking, and rebooking prompts.",
          detail: "Beauty and wellness businesses have nuanced scheduling requirements — different services have different durations, some require patch tests 48 hours before, and clients often want to book with a specific stylist or therapist. We build salon and spa booking systems that handle all of this: service menus with pricing, therapist selection, patch test requirement flags, automated rebooking prompts to encourage retention, and retail product suggestions at time of booking. The result is a client experience that feels premium from the moment they choose their appointment.",
        },
        {
          name: "Fitness & Wellness Studios",
          description: "Class schedules, instructor assignment, membership-restricted booking, waiting lists, and class capacity management.",
          detail: "Studios run on schedules, not individual appointments — and that demands a different kind of booking logic. Class-based booking systems manage timetables, class capacities, instructor assignments, and membership-gated access (so non-members can't book member-only classes). When a class fills up, waitlist functionality kicks in automatically. Late cancellations are managed through configurable penalty rules. Studio owners get a real-time view of class utilisation across the week to inform scheduling decisions.",
        },
        {
          name: "Professional Services",
          description: "Consultation booking for lawyers, accountants, coaches, and consultants — with intake forms, time zone handling, and video call integration.",
          detail: "For professionals who sell their time, a booking system does more than fill a calendar — it shapes first impressions and streamlines the intake process. Clients book the consultation type they need, complete a pre-session intake form capturing all the relevant context, receive a video call link automatically if the meeting is remote, and get a reminder with all the materials they need to prepare. You arrive at every consultation already informed. Time zone handling means international clients book correctly without confusion.",
        },
        {
          name: "Events & Experiences",
          description: "Ticketed event booking, group reservation management, and experience packages with upsells and add-on selections.",
          detail: "Experiences and ticketed events have their own booking challenges — group sizes, add-on selections, deposit structures, and the need to communicate clearly about what guests need to bring or prepare. We build booking systems for escape rooms, tasting experiences, activity providers, cookery schools, and guided tours that handle group bookings elegantly, suggest relevant add-ons (prosecco package, private hire, printed certificates), and send detailed pre-event communications that get guests excited before they arrive.",
        },
      ]}
      included={[
        "Custom branded booking widget or full-page experience",
        "Real-time availability calendar with admin management",
        "Automated confirmation, reminder, and follow-up emails/SMS",
        "Stripe payment integration with deposit or full payment options",
        "Cancellation and rescheduling policy enforcement",
        "Mobile-optimised for guests booking on any device",
        "Admin dashboard with daily booking overview",
        "Customer database with booking history",
        "Reporting suite: revenue, occupancy, and no-show rates",
        "Google Calendar / iCal sync for staff",
        "Custom intake forms per service or booking type",
        "Multi-location support where required",
      ]}
      process={[
        {
          step: "01",
          title: "Workflow Discovery",
          description: "We map your current booking process end-to-end — how you receive bookings, confirm them, handle changes, and manage your calendar. We identify every inefficiency the system will solve.",
        },
        {
          step: "02",
          title: "System Design",
          description: "We design the booking flow for both the customer-facing experience and the admin interface, ensuring every screen feels intuitive and on-brand.",
        },
        {
          step: "03",
          title: "Build & Integrate",
          description: "Development of the full system, including payment integration, email/SMS automation, and any third-party connections (Google Calendar, POS systems, CRM).",
        },
        {
          step: "04",
          title: "Test, Train & Launch",
          description: "Thorough testing with real booking scenarios, followed by a full training session for your team and a managed go-live — with support throughout the transition.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "Customer Portals",
          description: "Give your customers a branded account area to manage their bookings, orders, and profile.",
          path: "/web-apps/customer-portals",
        },
        {
          label: "Web App Type",
          title: "Membership Platforms",
          description: "Build recurring revenue with a gated membership area, subscriber perks, and content control.",
          path: "/web-apps/membership-platforms",
        },
        {
          label: "Web App Type",
          title: "Internal Business Tools",
          description: "Custom admin systems that replace spreadsheets and disconnected software.",
          path: "/web-apps/internal-tools",
        },
      ]}
      ctaTitle="Let's replace your booking process with something that works."
      concepts={[
        { title: "Availability Calendar", description: "Real-time calendar showing open slots, booked periods, and buffer times — customers pick and confirm instantly.", layout: "calendar" },
        { title: "Admin Dashboard", description: "Centralised view of today's bookings, upcoming reservations, revenue stats, and customer details.", layout: "dashboard" },
        { title: "Booking Form", description: "Guided intake form capturing service type, preferred time, contact details, and special requirements.", layout: "form" },
      ]}
    />
  );
}