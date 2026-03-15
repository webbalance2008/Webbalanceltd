import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { getServiceColors } from "../utils/serviceColors";
import { SEOHead } from "../components/SEOHead";
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from "../components/StructuredData";
import { DepartmentHero } from "../components/DepartmentHero";

const plans = [
  {
    name: "Basic Care",
    price: "£49",
    period: "/mo",
    description: "Essential peace of mind for small business websites.",
    features: [
      "Monthly plugin & CMS updates",
      "Weekly uptime monitoring",
      "Monthly security scan",
      "2 hours content updates/mo",
      "Email support (48hr response)",
    ],
  },
  {
    name: "Priority Care",
    price: "£149",
    period: "/mo",
    description: "For growing businesses that need more hands-on support.",
    features: [
      "Weekly plugin & CMS updates",
      "Daily uptime monitoring",
      "Weekly security scan",
      "5 hours content updates/mo",
      "Performance optimisation",
      "Email support (24hr response)",
      "Monthly performance report",
    ],
    highlight: true,
  },
  {
    name: "Premium Care",
    price: "£299",
    period: "/mo",
    description: "Full-service managed support for mission-critical websites.",
    features: [
      "Continuous monitoring & updates",
      "Real-time uptime monitoring",
      "Daily security scan",
      "10 hours development/mo",
      "Priority phone & email support",
      "4hr emergency response SLA",
      "Weekly performance reports",
      "Dedicated account manager",
    ],
  },
];

const faqs = [
  {
    q: "What counts as a 'content update'?",
    a: "Anything that doesn't require new development — changing text, swapping images, adding products, updating prices, publishing blog posts, etc. Development work like new features or structural page changes is handled separately.",
  },
  {
    q: "What happens if my site goes down?",
    a: "We monitor all client sites 24/7. On Basic Care, we'll notify you and begin investigating within 4 hours. Priority and Premium Care clients receive an immediate response, and we aim to have sites back online within 1 hour on Premium.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes — you can change your plan at any time with 30 days' notice. There are no lock-in contracts.",
  },
  {
    q: "Do you support websites you didn't build?",
    a: "Yes, in most cases. We'll conduct an initial audit of your site before onboarding to ensure we can support it effectively and flag any pre-existing issues.",
  },
  {
    q: "What platforms do you support?",
    a: "We support all major CMS platforms including WordPress, Sanity, Webflow, Shopify, and custom-built sites. Contact us if you're unsure about your platform.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "No. Our support plans are rolling monthly — you can cancel with 30 days' notice at any time. We earn your continued business every month.",
  },
];

export function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const plansRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true });
  
  const colors = getServiceColors("support");

  return (
    <>
      <SEOHead
        title="Website Support & Maintenance Plans"
        description="Keep your website fast, secure, and always evolving with a Web Balance support plan. Monthly care packages from £49/mo including updates, backups, and priority help."
        path="/support"
        keywords="website support plan, web maintenance, website care plan, website management UK"
      />
      <ServiceSchema
        name="Website Support & Maintenance"
        description="Keep your website fast, secure, and always evolving. Monthly care packages including updates, backups, and priority help."
        path="/support"
      />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Support", path: "/support" }]} />
      <FAQSchema faqs={faqs} />
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1a2840 0%, #16212e 60%, #0f0a1e 100%)" }}>
        {/* Hero */}
        <DepartmentHero
          label="Ongoing Support"
          heading={
            <>
              We're here long{" "}
              after <span style={{ color: "#00d4e8" }}>launch</span>.
            </>
          }
          subtitle="Websites are never truly finished. We offer flexible support plans to keep your site secure, fast, and evolving with your business."
          accent="#00d4e8"
          patternId="sup"
        />

        {/* Plans */}
        <section className="py-24 border-b border-white/5">
          <div ref={plansRef} className="max-w-[1440px] mx-auto px-8 md:px-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={plansInView ? { opacity: 1 } : {}}
              style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
              className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
              Support Plans
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={plansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl mb-12 font-light"
            >
              Managed Care Packages
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={plansInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border relative"
                  style={{
                    borderColor: plan.highlight ? `rgba(${colors.rgb}, 0.5)` : "rgba(255, 255, 255, 0.05)",
                    backgroundColor: plan.highlight ? `rgba(${colors.rgb}, 0.05)` : "transparent",
                  }}
                >
                  {plan.highlight && (
                    <div
                      style={{ fontFamily: "'DM Mono', monospace", backgroundColor: colors.primary }}
                      className="absolute -top-3 left-8 text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase px-3 py-1"
                    >
                      Most Popular
                    </div>
                  )}
                  <p
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4"
                  >
                    {plan.name}
                  </p>
                  <div
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-white text-4xl mb-1"
                  >
                    {plan.price}
                    <span className="text-lg text-white/30 ml-1">{plan.period}</span>
                  </div>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/40 text-sm mb-8 mt-3 leading-relaxed"
                  >
                    {plan.description}
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-white/50"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span style={{ color: colors.primary }} className="mt-0.5 flex-shrink-0">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-8 flex items-center justify-center gap-2 py-3 border text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                      plan.highlight
                        ? ""
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                    }`}
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      ...(plan.highlight ? {
                        borderColor: colors.primary,
                        color: colors.primary,
                      } : {})
                    }}
                    onMouseEnter={(e) => {
                      if (plan.highlight) {
                        e.currentTarget.style.backgroundColor = colors.primary;
                        e.currentTarget.style.color = "#0a0a0a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.highlight) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = colors.primary;
                      }
                    }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 border-b border-white/5">
          <div ref={faqRef} className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={faqInView ? { opacity: 1 } : {}}
                style={{ fontFamily: "'DM Mono', monospace", color: colors.primary }}
                className="text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
              >
                <span className="w-6 h-px" style={{ backgroundColor: colors.primary }} />
                FAQs
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-white text-3xl font-light"
              >
                Common Questions
              </motion.h2>
            </div>
            <div className="md:col-span-8 space-y-0">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  className="border-b border-white/5"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/70 group-hover:text-white transition-colors text-sm pr-8"
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className="text-white/30 flex-shrink-0 transition-transform duration-200"
                      style={{
                        ...(openFaq === i ? { transform: 'rotate(180deg)', color: colors.primary } : {})
                      }}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-white/40 text-sm leading-relaxed pb-6"
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
            <h2
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl mb-8 font-light"
            >
              Not sure which plan is right for you?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border text-sm tracking-[0.25em] uppercase transition-all duration-300"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Talk to Us
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}