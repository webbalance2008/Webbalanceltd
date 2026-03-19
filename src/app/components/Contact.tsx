import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useIsMobile } from "../hooks/useIsMobile";
import { ContactRouter } from "./ContactRouter";
import { useContentBlocks } from "../hooks/useContentBlocks";
import { EditableText } from "./admin/EditableText";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();
  const contentBlocks = useContentBlocks("/");

  return (
    <section id="contact" className="bg-[#16212e] border-t border-white/5 flex flex-col" style={{ minHeight: "calc(100vh - 96px)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-12 md:py-16 flex-1 flex items-center">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center w-full">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[#00d4e8] text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
            >
              <span className="w-6 h-px bg-[#00d4e8]" />
              Get In Touch
            </motion.p>

            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-white text-4xl md:text-5xl leading-[1.15] mb-8 font-light"
            >
              <EditableText
                blockId="contact_h2"
                resolved={contentBlocks?.get("contact_h2") ?? "Let's build something extraordinary together."}
                multiline
              />
            </motion.h2>

            <motion.p
              initial={isMobile ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-white text-sm leading-relaxed max-w-xs"
            >
              <EditableText
                blockId="contact_desc"
                resolved={contentBlocks?.get("contact_desc") ?? "Ready to elevate your online presence? Tell us about your project and we'll get back to you within 24 hours."}
                multiline
              />
            </motion.p>
          </div>

          {/* Right — Smart Router */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mt-auto">
              <ContactRouter />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}