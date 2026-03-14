import { motion } from "motion/react";

const items = [
  "Web Design",
  "Development",
  "Hospitality",
  "E-Commerce",
  "Real Estate",
  "Branding",
  "CMS",
  "UX Strategy",
];

export function Marquee() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="bg-[#00A9A5] py-4 overflow-hidden">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[#374557] text-xs tracking-[0.3em] uppercase flex items-center gap-10 flex-shrink-0"
          >
            {item}
            <span className="text-[#374557]/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}