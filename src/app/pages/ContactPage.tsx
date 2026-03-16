import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Clock, Check, Mail } from "lucide-react";
import { ContactCards } from "../components/ContactCards";
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { EnquiryForm } from "../components/ContactRouter";
import { useIsMobile } from "../hooks/useIsMobile";

const CYAN = "#00d4e8";

export function ContactPage() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true });
  const [sent, setSent] = useState(false);
  const [hasTypeSelected, setHasTypeSelected] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen" style={{ background: "#16212e" }}>
      <SEOHead
        title="Contact Us"
        description="Get in touch with the Web Balance team. Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you."
        path="/contact"
        keywords="contact web design agency, get a website quote, web design enquiry UK"
      />
      {/* Hero */}
      <DepartmentHero
        label="Get in Touch"
        heading={
          <>
            Let's <span style={{ color: CYAN }}>talk</span>.
          </>
        }
        subtitle="Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you."
        accent={CYAN}
        primaryCta={{ label: "Start a Project", to: "/build-your-quote" }}
        patternId="contact"
      />

      {/* Contact Cards — full width strip */}
      <section className="py-12 border-b border-white/5" ref={contentRef}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ContactCards />
          </motion.div>
        </div>
      </section>

      {/* Main two-column layout */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

            {/* LEFT — Contact info */}
            <div className="lg:col-span-4">
              <motion.div
                initial={isMobile ? false : { opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 }}
              >
                <p
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
                >
                  <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
                  Get in touch
                </p>

                <p
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white/60 text-lg leading-relaxed mb-10"
                >
                  Whether you have a specific project in mind or just want to explore what's possible — we'd love to hear from you.
                </p>

                <div className="space-y-8">
                  <ContactDetail icon={<MapPin size={16} />} label="Location" value="UK & Remote" />
                  <ContactDetail icon={<Clock size={16} />} label="Response Time" value="Within 24 hours" />
                  <ContactDetail icon={<Mail size={16} />} label="Email" value="hello@webbalance.co.uk" />
                </div>

                <div className="mt-12 pt-12 border-t border-white/5">
                  <p
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-4"
                  >
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {[
                      { label: "LinkedIn", href: "https://www.linkedin.com/company/web-balance-ltd" },
                      { label: "Facebook", href: "https://www.facebook.com/webbalanceltd" },
                      { label: "X (Twitter)", href: "https://x.com/webbalanceltd" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                        className="text-white/30 text-[10px] tracking-[0.15em] uppercase hover:text-[#00d4e8] transition-colors"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Office hours */}
                <div className="mt-12 pt-12 border-t border-white/5">
                  <p
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-5"
                  >
                    Office Hours
                  </p>
                  <div className="space-y-2">
                    {[
                      { day: "Monday – Friday", hours: "8:30am – 5:30pm" },
                      { day: "Saturday – Sunday", hours: "Closed" },
                    ].map((item) => (
                      <div key={item.day} className="flex items-center justify-between">
                        <span
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="text-white/40 text-sm"
                        >
                          {item.day}
                        </span>
                        <span
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          className="text-white/60 text-sm"
                        >
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Enquiry form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={isMobile ? false : { opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 }}
              >
                <div
                  className="p-8 md:p-10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Form header — hidden once user picks an enquiry type */}
                  {!hasTypeSelected && !sent && (
                    <>
                      <p
                        style={{ fontFamily: "'DM Mono', monospace" }}
                        className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-3"
                      >
                        <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
                        Send us a message
                      </p>
                      <h2
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-white text-2xl md:text-3xl font-light mb-8"
                      >
                        General Enquiry
                      </h2>
                    </>
                  )}

                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-14 h-14 border border-[#00d4e8] flex items-center justify-center mb-6">
                        <Check size={20} className="text-[#00d4e8]" />
                      </div>
                      <h3
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-white text-2xl mb-2 font-light"
                      >
                        Message Received
                      </h3>
                      <p
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="text-white/50 text-sm"
                      >
                        We'll be in touch within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <EnquiryForm
                      onSubmit={() => setSent(true)}
                      onTypeChange={(has) => setHasTypeSelected(has)}
                    />
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contact detail ────────────────────────────────────────────────────────────
function ContactDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#00d4e8] flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-1"
        >
          {label}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/60 text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}