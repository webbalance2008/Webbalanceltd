/**
 * Canonical content block definitions per page path.
 * These IDs must match the blockId props used by EditableText in each component.
 * The text field is the default/fallback — overrides are stored in Supabase content_blocks.
 */
import type { ContentBlock } from "../hooks/useContentBlocks";

export const PAGE_BLOCK_DEFAULTS: Record<string, ContentBlock[]> = {
  "/": [
    // ── Hero ─────────────────────────────────────────────────────────
    { id: "h1_0", type: "h1", text: "Digital" },
    { id: "h1_1", type: "h1", text: "Experiences" },
    { id: "h1_2", type: "h1", text: "That Convert" },
    {
      id: "p_0",
      type: "p",
      text: "For over 15 years, we have been providing professional, results-driven digital solutions — from web apps and websites to SEO, branding and strategy-led marketing.",
    },

    // ── How Can We Help ───────────────────────────────────────────────
    { id: "howcanwehelp_h2", type: "h2", text: "How Can We Help?" },
    {
      id: "howcanwehelp_desc",
      type: "p",
      text: "Whether you're ready to start a project, have a quick question, or need support — we're here. Pick the option that suits you best.",
    },

    // ── Core Services ─────────────────────────────────────────────────
    { id: "coreservices_h2", type: "h2", text: "Core Services" },
    {
      id: "coreservices_desc",
      type: "p",
      text: "End-to-end digital solutions designed to elevate your brand and drive measurable results",
    },

    // ── Projects ──────────────────────────────────────────────────────
    { id: "projects_h2", type: "h2", text: "Recent Projects" },
    {
      id: "projects_desc",
      type: "p",
      text: "Every project is a unique collaboration — built to reflect the brand and convert its audience.",
    },

    // ── Services / Process ────────────────────────────────────────────
    { id: "services_h2", type: "h2", text: "Full-Service Digital Studio" },
    { id: "service_01_title", type: "h3", text: "Strategy & Discovery" },
    {
      id: "service_01_desc",
      type: "p",
      text: "We begin every project with a deep dive — understanding your audience, competitors, and goals before a single pixel is designed.",
    },
    { id: "service_02_title", type: "h3", text: "Design & Visual Identity" },
    {
      id: "service_02_desc",
      type: "p",
      text: "Bespoke design that feels native to your brand. From moodboards to polished UI, we craft visuals that command attention.",
    },
    { id: "service_03_title", type: "h3", text: "Development" },
    {
      id: "service_03_desc",
      type: "p",
      text: "Hand-coded, performant websites built on modern frameworks. Fast load times, flawless on every device.",
    },
    { id: "service_04_title", type: "h3", text: "Growth & Support" },
    {
      id: "service_04_desc",
      type: "p",
      text: "We don't disappear after launch. Ongoing support, SEO optimisation, and analytics keep your site performing.",
    },

    // ── Insights ──────────────────────────────────────────────────────
    { id: "insights_h2", type: "h2", text: "Insights" },
    {
      id: "insights_desc",
      type: "p",
      text: "Practical strategies and industry knowledge to help your digital presence thrive",
    },

    // ── Contact ───────────────────────────────────────────────────────
    {
      id: "contact_h2",
      type: "h2",
      text: "Let's build something extraordinary together.",
    },
    {
      id: "contact_desc",
      type: "p",
      text: "Ready to elevate your online presence? Tell us about your project and we'll get back to you within 24 hours.",
    },
  ],
};
