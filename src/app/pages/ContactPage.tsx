import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactRouter } from "../components/ContactRouter";
import { ContactCards } from "../components/ContactCards";

const heroImage =
  "https://images.unsplash.com/photo-1746021535489-00edc5efb203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwZm9ybSUyMG9mZmljZSUyMGRlc2slMjBtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzI1OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080";

export function ContactPage() {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true });

  return (
    <div className="min-h-screen" style={{ background: "#16212e" }}>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#1a2840]" />
        <div className="relative h-full flex flex-col justify-end max-w-[1440px] mx-auto px-8 md:px-16 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#00d4e8] text-xs tracking-[0.35em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#00d4e8]" />
            Get in Touch
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-[clamp(3rem,6vw,5rem)] leading-[0.95] font-light"
            >
              Let's Talk
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Contact Cards — full width strip */}
      <section className="py-12 border-b border-white/5" ref={contentRef}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ContactCards />
          </motion.div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info — left column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25 }}
            >
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/60 text-xl leading-relaxed mb-10"
              >
                Whether you have a specific project in mind or just want to explore what's possible — we'd love to hear from you.
              </p>

              <div className="space-y-8">
                <ContactDetail icon={<MapPin size={16} />} label="Location" value="UK & Remote" />
                <ContactDetail icon={<Clock size={16} />} label="Response Time" value="Within 24 hours" />
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
                      style={{ fontFamily: "'DM Mono', monospace" }}
                      className="text-white/30 text-[10px] tracking-[0.15em] uppercase hover:text-[#00d4e8] transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Department quick-links */}
              <div className="mt-12 pt-12 border-t border-white/5">
                <p
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-5"
                >
                  Departments
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Web Design", color: "#5ec4d4", href: "/web-design" },
                    { label: "Web Apps",   color: "#b89fd4", href: "/web-apps" },
                    { label: "SEO",        color: "#3dd68c", href: "/seo" },
                    { label: "Hosting",    color: "#f59e6a", href: "/hosting" },
                    { label: "Branding",   color: "#f472b6", href: "/branding" },
                  ].map((dept) => (
                    <a
                      key={dept.label}
                      href={dept.href}
                      className="flex items-center gap-3 group"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span
                        className="w-1 h-4 flex-shrink-0 transition-all duration-200 opacity-40 group-hover:opacity-100"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-white/40 text-sm group-hover:text-white/70 transition-colors">
                        {dept.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Smart Contact Router — right column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[#00d4e8] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
              >
                <span className="w-5 h-px bg-[#00d4e8] flex-shrink-0" />
                How can we help?
              </p>
              <ContactRouter />
            </motion.div>
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