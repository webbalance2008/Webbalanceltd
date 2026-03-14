import { ServicePageLayout } from "../components/ServicePageLayout";
import { Zap, Lock, HardDrive, Activity, RefreshCw, Settings2 } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBob3N0aW5nJTIwZGF0YSUyMGNlbnRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMjU5NTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

export function HostingPage() {
  return (
    <ServicePageLayout
      serviceType="hosting"
      label="Managed Hosting"
      title="Hosting You Can Rely On"
      subtitle="Fast, secure, managed hosting — so you can focus on your business"
      heroImage={heroImage}
      intro="We take the complexity out of hosting. Our managed hosting plans keep your website fast, secure, and online 24/7. With daily backups, SSL certificates, and proactive monitoring included as standard, you're in safe hands — and you'll never need to think about servers again."
      stats={[
        { value: "99.9%", label: "Uptime SLA" },
        { value: "24/7", label: "Server Monitoring" },
        { value: "<1s", label: "Global Load Times" },
        { value: "Daily", label: "Automated Backups" },
      ]}
      features={[
        {
          icon: Zap,
          title: "Edge-Cached Delivery",
          description:
            "Your site is served from data centres closest to your visitors worldwide, ensuring lightning-fast load times wherever your audience is located.",
          modal: {
            heading: "Global Speed, Wherever Your Audience Is",
            body: "Cheap shared hosting serves your site from a single location. Our infrastructure uses edge networks to cache and deliver your content from data centres closest to each visitor — cutting latency dramatically and ensuring consistently fast load times across the UK, Europe, and beyond.",
            bullets: [
              "Cloudflare edge network with 300+ global PoPs (Points of Presence)",
              "Intelligent caching rules tailored to your CMS and content type",
              "HTTP/3 and QUIC protocol support for maximum connection efficiency",
              "Average global TTFB (Time to First Byte) under 200ms",
              "Performance reports with per-region load time data",
            ],
          },
        },
        {
          icon: Lock,
          title: "SSL & Security",
          description:
            "Free SSL certificates, firewall protection, malware scanning, and DDoS mitigation included on every hosting plan.",
          modal: {
            heading: "Multi-Layer Security as Standard",
            body: "Every hosting plan includes a comprehensive security stack — not as a paid add-on, but as a baseline requirement. Your site is protected at the network, application, and data layers from the moment it goes live.",
            bullets: [
              "Free auto-renewing SSL certificates via Let's Encrypt",
              "Web Application Firewall (WAF) blocking common attack vectors",
              "Daily automated malware scanning with immediate alert and remediation",
              "DDoS mitigation with traffic filtering at the edge",
              "IP allowlisting for admin areas on request",
              "Security headers: HSTS, CSP, X-Frame-Options configured correctly",
            ],
          },
        },
        {
          icon: HardDrive,
          title: "Daily Backups",
          description:
            "Automated daily backups with 30-day retention. We can restore your site to any point in time in minutes.",
          modal: {
            heading: "Your Data, Always Safe and Restorable",
            body: "Backups are only valuable if they actually work when you need them. Our backup system runs automated daily snapshots of both your files and database, stores them in geographically separate locations, and tests restorability on a regular schedule.",
            bullets: [
              "Automated daily backups running at off-peak hours",
              "30-day backup retention on Professional plans (14-day on Starter)",
              "Off-site backup storage in a geographically separate data centre",
              "One-click restore to any backup point via your client dashboard",
              "Manual backup trigger available before any major update",
              "Backup integrity testing performed weekly",
            ],
          },
        },
        {
          icon: Activity,
          title: "Performance Monitoring",
          description:
            "Real-time uptime monitoring with instant alerts. If anything goes wrong, we'll know before you do and act immediately.",
          modal: {
            heading: "We See Issues Before You Do",
            body: "Our monitoring stack watches your site around the clock — tracking uptime, response times, and error rates in real time. When something goes wrong, our team receives an alert within minutes and acts immediately. Most issues are resolved before our clients are even aware of them.",
            bullets: [
              "60-second uptime check intervals from multiple global locations",
              "Immediate incident alerts to our on-call team via PagerDuty",
              "Response time monitoring with alerts on performance degradation",
              "Monthly uptime report with SLA compliance data",
              "Status page available for your team to check current system health",
              "Post-incident reports for any downtime exceeding 15 minutes",
            ],
          },
        },
        {
          icon: RefreshCw,
          title: "Auto-Scaling",
          description:
            "Our infrastructure scales automatically to handle traffic spikes — whether it's a marketing campaign or a viral moment.",
          modal: {
            heading: "Traffic Spikes Won't Take You Down",
            body: "Shared hosting collapses under traffic spikes — and that's exactly when you can't afford your site to be down. Our infrastructure scales automatically to handle sudden surges in visitors, whether they're caused by a PR campaign, a social media moment, or a seasonal peak.",
            bullets: [
              "Horizontal auto-scaling triggered by CPU and traffic thresholds",
              "Load balancing across multiple instances during high-traffic periods",
              "Stress testing available pre-launch for high-stakes campaigns",
              "No additional charges for traffic spikes within plan limits",
              "Enterprise plans include burst capacity for unpredictable viral events",
            ],
          },
        },
        {
          icon: Settings2,
          title: "Managed Updates",
          description:
            "We keep your CMS, plugins, and dependencies updated and patched, so you're always protected against the latest vulnerabilities.",
          modal: {
            heading: "Updates Handled, Vulnerabilities Closed",
            body: "Outdated plugins and CMS versions are the most common entry point for website attacks. Our managed update service keeps your entire stack current — from your CMS core to every plugin and dependency — with changes tested in a staging environment before being deployed to your live site.",
            bullets: [
              "Weekly CMS core and plugin updates on Professional and Enterprise plans",
              "Pre-update staging environment testing to catch conflicts before they go live",
              "Immediate security patch deployment for critical vulnerabilities",
              "Plugin compatibility verification before every update cycle",
              "Update log provided monthly showing all changes made",
              "Rollback capability within 24 hours of any update",
            ],
          },
        },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "£25",
          period: "/mo",
          description: "Reliable managed hosting for small business websites with standard traffic.",
          features: [
            "5GB Storage",
            "100GB Bandwidth",
            "Free SSL Certificate",
            "Daily Backups (14-day retention)",
            "Uptime Monitoring",
            "Email Support",
          ],
        },
        {
          name: "Professional",
          price: "£65",
          period: "/mo",
          description: "High-performance hosting for growing businesses with more traffic and storage needs.",
          features: [
            "25GB Storage",
            "Unlimited Bandwidth",
            "Free SSL Certificate",
            "Daily Backups (30-day retention)",
            "CDN Included",
            "Priority Support",
            "Staging Environment",
          ],
          highlight: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "Dedicated infrastructure and bespoke SLAs for high-traffic and mission-critical applications.",
          features: [
            "Dedicated Server Options",
            "Custom Storage & Bandwidth",
            "Advanced DDoS Protection",
            "99.99% Uptime SLA",
            "Dedicated Account Manager",
            "24/7 Phone Support",
            "Custom Backup Policies",
          ],
        },
      ]}
      ctaTitle="Move to hosting you can trust."
      ctaPath="/hosting/start"
      ctaLabel="Get a Hosting Quote"
    />
  );
}