import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { WebBalanceLogo } from "./WebBalanceLogo";

export function Footer() {
  const services = [
    { label: "Web Apps", to: "/web-apps" },
    { label: "Web Design", to: "/web-design" },
    { label: "SEO", to: "/seo" },
    { label: "Hosting", to: "/hosting" },
    { label: "Branding & Marketing", to: "/branding" },
    { label: "Support", to: "/support" },
  ];

  const company = [
    { label: "Portfolio", to: "/web-design/portfolio" },
    { label: "Insights", to: "/insights" },
    { label: "Our Reach", to: "/our-reach" },
    { label: "Contact", to: "/contact" },
  ];

  const connect = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/web-balance-ltd" },
    { label: "Facebook", href: "https://www.facebook.com/webbalanceltd" },
    { label: "X (Twitter)", href: "https://x.com/webbalanceltd" },
  ];

  return (
    <footer className="bg-[#16212e] border-t border-white/5 pt-16 pb-10">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-5">
              <Link to="/">
                <WebBalanceLogo className="h-20 w-auto" />
              </Link>
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white/40 text-sm leading-relaxed"
            >
              A boutique digital studio crafting bespoke websites and web
              applications for brands that mean business.
            </p>
            <div className="mt-5 space-y-4">
              <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/25 text-sm leading-relaxed">
                Web Balance Ltd<br />
                Neospace, Riverside Drive<br />
                Aberdeen, AB11 7LH
              </p>
              <div>
                <a
                  href="tel:01224452095"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-[#00d4e8]/70 hover:text-[#00d4e8] text-sm transition-colors"
                >
                  01224 452095
                </a>
                <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/25 text-sm mt-1">
                  Mon–Fri, 8:30am–5:30pm
                </p>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">

            {/* Services */}
            <div>
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[#00d4e8]/60 text-[10px] tracking-[0.3em] uppercase mb-5"
              >
                Services
              </p>
              <div className="flex flex-col gap-3">
                {services.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 hover:text-[#00d4e8] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[#00d4e8]/60 text-[10px] tracking-[0.3em] uppercase mb-5"
              >
                Company
              </p>
              <div className="flex flex-col gap-3">
                {company.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 hover:text-[#00d4e8] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[#00d4e8]/60 text-[10px] tracking-[0.3em] uppercase mb-5"
              >
                Connect
              </p>
              <div className="flex flex-col gap-3">
                {connect.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 hover:text-[#00d4e8] text-sm flex items-center gap-1.5 group transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
          <p
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-white/20 text-[10px] tracking-[0.2em] uppercase"
          >
            © {new Date().getFullYear()} Web Balance Studio. All rights reserved.
          </p>
          <p
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-white/20 text-[10px] tracking-[0.2em] uppercase"
          >
            Designed &amp; Developed in the UK
          </p>
        </div>

      </div>
    </footer>
  );
}