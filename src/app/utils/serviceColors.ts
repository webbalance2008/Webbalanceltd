// ─── Web Balance — Complete Site Colour System ────────────────────────────────
//
// Global background stack (used for cards, surfaces, modals — never dept-specific):
//   bgDarkest  #0f0a1e  (footer, overlays)
//   bgBase     #16212e  (default page background)
//   bgSurface  #1d2d3e  (cards, raised surfaces)
//   bgElevated #243245  (hover states, modals)
//
// Global brand cyan #00d4e8 — homepage / shared pages ONLY.
// Each department has its own accent that never bleeds into other sections.

export const serviceColors = {
  "web-apps": {
    bg:          "#1e1040",
    primary:     "#b89fd4",            // lavender
    primaryHover:"#c9b3e0",
    border:      "rgba(180,150,220,0.2)",
    rgb:         "180, 150, 220",
    secondary:   "#1d2d3e",            // bgSurface — nav dropdowns
    dark:        "#1e1040",            // dept hero top
  },
  "web-design": {
    bg:          "#162535",
    primary:     "#5ec4d4",            // soft teal-cyan
    primaryHover:"#7dd8e6",
    border:      "rgba(94,196,212,0.2)",
    rgb:         "94, 196, 212",
    secondary:   "#1d2d3e",
    dark:        "#162535",
  },
  "seo": {
    bg:          "#102830",
    primary:     "#3dd68c",            // green
    primaryHover:"#6de8aa",
    border:      "rgba(61,214,140,0.2)",
    rgb:         "61, 214, 140",
    secondary:   "#1d2d3e",
    dark:        "#102830",
  },
  "hosting": {
    bg:          "#2a1a4e",
    primary:     "#f59e6a",            // warm orange
    primaryHover:"#fbb98a",
    border:      "rgba(245,158,106,0.2)",
    rgb:         "245, 158, 106",
    secondary:   "#1d2d3e",
    dark:        "#2a1a4e",
  },
  "branding": {
    bg:          "#1a1a2e",
    primary:     "#f472b6",            // pink-magenta
    primaryHover:"#f9a8d4",
    border:      "rgba(244,114,182,0.2)",
    rgb:         "244, 114, 182",
    secondary:   "#1d2d3e",
    dark:        "#1a1a2e",
  },
  "support": {
    bg:          "#1a2840",
    primary:     "#00d4e8",            // brand cyan (shared pages)
    primaryHover:"#33e8fa",
    border:      "rgba(0,212,232,0.2)",
    rgb:         "0, 212, 232",
    secondary:   "#1d2d3e",
    dark:        "#1a2840",
  },
} as const;

export type ServiceKey = keyof typeof serviceColors;

export function getServiceColors(service: ServiceKey) {
  return serviceColors[service];
}

export function getServiceFromPath(pathname: string): ServiceKey | null {
  if (pathname.includes("/web-apps") || pathname.includes("/webapps")) return "web-apps";
  if (pathname.includes("/web-design")) return "web-design";
  if (pathname.includes("/seo")) return "seo";
  if (pathname.includes("/hosting")) return "hosting";
  if (pathname.includes("/branding")) return "branding";
  if (pathname.includes("/support")) return "support";
  return null;
}
