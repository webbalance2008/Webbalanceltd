# Web Balance — Agent Style & Architecture Guide

This document is the **single source of truth** for any AI agent or developer adding to or modifying the Web Balance portfolio site. Every rule here must be followed exactly. Do not deviate.

---

## 1. Tech Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Routing | `react-router` (Data mode — `createBrowserRouter` + `RouterProvider`) |
| Styling | Tailwind CSS v4 + inline styles (no `tailwind.config.js`) |
| Animation | `motion/react` (from the `motion` package — never "framer-motion") |
| Icons | `lucide-react` only |
| SEO | `react-helmet-async` via `<SEOHead>` component |
| Fonts | Google Fonts via `/src/styles/fonts.css` |
| Build | Vite |

---

## 2. Colour System

### 2a. Global Background Stack

These are the **only** background colours used for page surfaces, cards, and overlays. Never invent a new dark background colour.

| Token | Hex | Usage |
|---|---|---|
| `bgDarkest` | `#0f0a1e` | Footer, deep overlays |
| `bgBase` | `#16212e` | **Default page background** — used site-wide |
| `bgSurface` | `#1d2d3e` | Cards, raised surfaces, nav dropdowns |
| `bgElevated` | `#243245` | Hover states, modals |

- The root `<div>` in `Root.tsx` sets `bg-[#16212e]`. Every page inherits this.
- `PageSkeleton` (lazy-load fallback) also uses `#16212e`.

### 2b. Brand Cyan

```
#00d4e8
```

- Used on the homepage, shared/utility pages, and the `support` department.
- **Never** bleed the brand cyan into another department's colour zone.

### 2c. Six Department Accent Colours

Defined in `/src/app/utils/serviceColors.ts` — **always import from there**. Do not hardcode department colours inline on new pages.

| Department | Key | Primary Accent | Background |
|---|---|---|---|
| Web Apps | `web-apps` | `#b89fd4` (lavender) | `#1e1040` |
| Web Design | `web-design` | `#5ec4d4` (soft teal-cyan) | `#162535` |
| SEO | `seo` | `#3dd68c` (green) | `#102830` |
| Hosting | `hosting` | `#f59e6a` (warm orange) | `#2a1a4e` |
| Branding | `branding` | `#f472b6` (pink-magenta) | `#1a1a2e` |
| Support | `support` | `#00d4e8` (brand cyan) | `#1a2840` |

Import pattern:
```ts
import { getServiceColors, type ServiceKey } from "../utils/serviceColors";
const colors = getServiceColors("web-design"); // colors.primary, colors.bg, etc.
```

Each colour object also exposes: `primaryHover`, `border`, `rgb` (for `rgba()` construction), `secondary`, `dark`.

---

## 3. Typography

### 3a. Font Families

Three fonts are loaded. Never add a fourth. Import declarations live **only** in `/src/styles/fonts.css`.

| Font | Weights Loaded | Use |
|---|---|---|
| **Montserrat** | 300, 400, 500, 600 (+ italic 300/400) | All headings, pill badges, nav labels, section numbers |
| **Inter** | 300, 400, 500 | Body copy, descriptions, form labels, footer text |
| **DM Mono** | 300, 400 | Code, monospace accents, stat counters, technical labels |

Always apply fonts via inline `style={{ fontFamily: "'Montserrat', sans-serif" }}` **or** Tailwind's `font-[Montserrat]` where available. Never use the theme's `--font-*` CSS variables for font-family — they are not set.

### 3b. Minimum Text Sizes — STRICT RULES

| Context | Minimum size |
|---|---|
| **Any body/label text** | `14px` / `text-sm` |
| **Chip / badge / tag text** | `14px` / `text-sm` |
| **Card description text** | `15px` |
| **Card label / title text** | `18px` |
| **Primary goal / feature chip text** | `16px` |
| **Hero headline (mobile)** | `2.25rem` (36px) — use `clamp` |

**Never use `text-xs` or `fontSize: "12px"` anywhere on the site.** This is a site-wide rule that has been systematically enforced. Any new addition must meet these minimums.

### 3c. Hero Headline Sizing

All hero headlines (on the homepage `Hero` and every `DepartmentHero`) use:
```css
font-size: clamp(2.25rem, 5.5vw, 6rem)
```
or the Tailwind equivalent `text-[clamp(2.25rem,5.5vw,6rem)]`. The `2.25rem` (36px) floor is mandatory on mobile.

### 3d. Text Colour on Dark Backgrounds

All pages have dark backgrounds. Text must always be white or near-white:

| Usage | Value |
|---|---|
| Primary headings | `#ffffff` or `color: "white"` |
| Body / descriptions | `rgba(255,255,255,0.85)` |
| Secondary / muted | `rgba(255,255,255,0.55)` — minimum; never go lower |
| Disabled / meta | `rgba(255,255,255,0.35)` — only for truly supplementary text |

**Never use Tailwind's `text-muted-foreground`, `text-gray-*`, or `text-white/30` on page-level text.** These classes resolve to colours too dim for the dark background. Use explicit `rgba` values instead.

---

## 4. Layout & Spacing

### 4a. Max-width & Padding

```html
<div class="max-w-[1440px] mx-auto px-8 md:px-16">
```

- **Max content width:** `1440px`
- **Mobile padding:** `px-8` (32px each side)
- **Desktop padding:** `md:px-16` (64px each side)

Use this wrapper on every full-width section. Do not use `container` or `max-w-7xl`.

### 4b. Section Spacing

- Between major page sections: `py-24` (96px top/bottom)
- Tighter internal spacing: `py-16`
- Hero sections: no top padding — they butt against the nav

---

## 5. Core Reusable Components

### 5a. `<DepartmentHero>`

**Every** department introduction page (`/web-apps`, `/web-design`, `/seo`, `/hosting`, `/branding`, `/support`) and their sub-pages **must** use this component as their hero. Do not write a custom hero for a department page.

Location: `/src/app/components/DepartmentHero.tsx`

```tsx
import { DepartmentHero } from "../components/DepartmentHero";

<DepartmentHero
  label="Web Design"                          // pill badge text
  heading={<>Websites that <span style={{ color: colors.primary }}>convert</span></>}
  subtitle="BESPOKE · HIGH-PERFORMANCE · UK-BASED"
  accent={colors.primary}                     // from getServiceColors()
  primaryCta={{ label: "View Packages", to: "/web-design/packages" }}
  secondaryCta={{ label: "Start a Project", to: "/web-design/start" }}
  patternId="wd"                              // unique short ID per page
/>
```

Props:
- `label` — pill badge text
- `heading` — `ReactNode`; accent-coloured words must use `<span style={{ color: accent }}>…</span>`
- `subtitle` — short uppercase tagline (use `·` separators)
- `accent` — department primary colour hex
- `primaryCta` / `secondaryCta` — both optional `{ label, to, description? }`
- `patternId` — short unique string to namespace SVG patterns (avoid collisions)

### 5b. `<DepartmentPackagePage>`

All six `/[dept]/packages` routes use this component. Do not build a bespoke packages page for a department.

Location: `/src/app/components/DepartmentPackagePage.tsx`

```tsx
<DepartmentPackagePage
  deptKey="web-design"
  seo={{ title, description, path, keywords }}
  startPath="/web-design/start"
/>
```

Package data lives in `/src/app/data/packages.ts`.

### 5c. `<WebsiteTypePage>`

The six "Types We Design" pages under `/web-design/` all use this template component. Any new "types" page must use it.

Location: `/src/app/components/WebsiteTypePage.tsx`

The Web Design accent for this component is `#5ec4d4`.

### 5d. `<AppTypePage>`

The six "What We Build" pages under `/web-apps/` use this template.

Location: `/src/app/components/AppTypePage.tsx`

The Web Apps accent for this component is `#b89fd4`.

### 5e. `<SEOHead>`

**Every page must include `<SEOHead>`** as its first child. No exceptions.

```tsx
import { SEOHead } from "../components/SEOHead";

<SEOHead
  title="Page Title"           // " | Web Balance" is appended automatically if absent
  description="…"             // 150–160 characters
  path="/exact-route"          // canonical path — no trailing slash
  keywords="…"                 // comma-separated
  // noIndex — only for /404 and thank-you confirmation pages
/>
```

- `BASE_URL` is `https://web-balance.co.uk` (hardcoded in `SEOHead.tsx`)
- `noIndex` defaults to `false`. Only set it to `true` for pages that genuinely must not rank (e.g. 404, form confirmations).

### 5f. `<StructuredData>`

Imported in `Root.tsx` — `OrganizationSchema`, `LocalBusinessSchema`, and `WebSiteSchema` are injected globally. Page-specific schema (Article, Product, Service, FAQ, BreadcrumbList, VideoObject) must be added per-page using the exported helpers from `/src/app/components/StructuredData.tsx`.

---

## 6. Animation

- Library: `motion/react` (import as `{ motion, AnimatePresence, MotionConfig }` from `"motion/react"`)
- **Never** import from `framer-motion` — it is not installed.
- `MotionConfig reducedMotion="never"` is set globally in `Root.tsx`. Do not override this.
- Use `motion.div`, `motion.section`, etc. for animated elements.
- Standard entrance: `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5 }}`.
- Staggered lists: use `transition={{ delay: index * 0.08 }}`.
- The CSS in `theme.css` disables all CSS transitions and keyframe animations on desktop (`transition-duration: 0.001ms !important`). All animation must therefore be done via Motion, not CSS `transition` or `@keyframes`.

---

## 7. Navigation & Routing

### 7a. Router

- Package: `react-router` (not `react-router-dom`)
- Pattern: `createBrowserRouter` + `RouterProvider` in `App.tsx`, routes defined in `/src/app/routes.ts`
- Root layout: `/src/app/components/Root.tsx` (wraps all pages with `<Nav>`, `<Footer>`, preloader, structured data)

### 7b. Lazy Loading

Every route **except** the homepage must be lazy-loaded:

```ts
const MyPage = lazy(() => import("./pages/MyPage").then(m => ({ default: m.MyPage })));
```

Add the lazy import to `/src/app/routes.ts` and add the route to the `children` array of the root route.

### 7c. Links

Use `<Link to="…">` from `react-router` for all internal links. Never use `<a href>` for internal navigation.

### 7d. Mega Menu

The nav (`/src/app/components/Nav.tsx`) has a mega-menu with department dropdowns. Each dropdown has:
- A **primary** (accent-coloured top section) for the main department pages
- A **secondary** section for sub-pages, labelled by `secondaryLabel`

When adding new routes that should appear in the nav, edit the `navItems` array in `Nav.tsx` following the existing pattern.

---

## 8. File & Component Conventions

- Pages live in `/src/app/pages/` (top-level) or `/src/app/pages/[dept]/` (sub-pages)
- Shared components live in `/src/app/components/`
- Data files live in `/src/app/data/`
- Utility functions live in `/src/app/utils/`
- Only create `.tsx` files (never `.jsx` or `.js`)
- Named exports for all components (no default exports except `App.tsx` and lazy-imported page modules)
- Component filenames: `PascalCase.tsx`
- One component per file (unless it's a small private helper)

---

## 9. Page Structure Template

Every new page should follow this structure:

```tsx
import { SEOHead } from "../components/SEOHead";
import { DepartmentHero } from "../components/DepartmentHero";
import { getServiceColors } from "../utils/serviceColors";

export function MyPage() {
  const colors = getServiceColors("web-design"); // use the correct dept key

  return (
    <div className="min-h-screen" style={{ background: "#16212e" }}>
      <SEOHead
        title="Page Title"
        description="150-160 char description."
        path="/exact-path"
        keywords="keyword1, keyword2"
      />

      <DepartmentHero
        label="Department Name"
        heading={<>Heading with <span style={{ color: colors.primary }}>accent</span></>}
        subtitle="TAGLINE · UPPERCASE"
        accent={colors.primary}
        primaryCta={{ label: "Primary CTA", to: "/path" }}
        secondaryCta={{ label: "Secondary CTA", to: "/path" }}
        patternId="unique-id"
      />

      {/* Page sections */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          {/* content */}
        </div>
      </section>
    </div>
  );
}
```

---

## 10. Cards & Surface Styling

```tsx
// Standard card
<div
  className="rounded-xl p-6 border"
  style={{
    background: "#1d2d3e",         // bgSurface
    borderColor: "rgba(255,255,255,0.06)",
  }}
>
```

- Card backgrounds: always `#1d2d3e` (bgSurface) or `#1a2840` (slightly lighter variant)
- Card borders: `rgba(255,255,255,0.06)` (default) up to `rgba(255,255,255,0.12)` (emphasis)
- Accent borders (department-specific): use `colors.border` from `serviceColors`
- Border radius: `rounded-xl` (12px) as the default; `rounded-2xl` for larger hero cards
- Hover state background: `#243245` (bgElevated)

---

## 11. Buttons & CTAs

### Primary CTA (accent colour)
```tsx
<Link
  to="/path"
  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
  style={{
    background: colors.primary,
    color: "#0a0a0a",
    fontFamily: "'Montserrat', sans-serif",
  }}
>
  Label <ArrowRight size={16} />
</Link>
```

### Secondary CTA (outline)
```tsx
<Link
  to="/path"
  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border"
  style={{
    borderColor: "rgba(255,255,255,0.25)",
    color: "white",
    fontFamily: "'Montserrat', sans-serif",
  }}
>
  Label <ArrowRight size={16} />
</Link>
```

- CTAs are always `rounded-full` pill shape
- Primary CTAs use a dark text colour (`#0a0a0a`) on the accent background for contrast
- Icon: `<ArrowRight size={16} />` from `lucide-react` — always on the right

---

## 12. Section Headers

Pattern used throughout the site:

```tsx
{/* Eyebrow label */}
<p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: colors.primary, letterSpacing: "0.15em" }}>
  — SECTION LABEL
</p>

{/* Main heading */}
<h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", color: "white", fontWeight: 600 }}>
  Heading text with <span style={{ color: colors.primary }}>accent word</span>
</h2>

{/* Body */}
<p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.7)", maxWidth: "640px" }}>
  Supporting description text.
</p>
```

---

## 13. SEO Requirements for Every New Page

1. `<SEOHead>` with `title`, `description` (150–160 chars), `path`, and `keywords`
2. A unique canonical path matching the route defined in `routes.ts`
3. The `sitemap.xml` at `/public/sitemap.xml` must be updated to include any new URL
4. `robots.txt` at `/public/robots.txt` already points to `https://web-balance.co.uk/sitemap.xml`
5. Add page-specific JSON-LD schema using helpers from `StructuredData.tsx` where appropriate (Service, FAQ, BreadcrumbList)

---

## 14. What NOT to Do

- **Do not** use `text-xs` or `fontSize: "12px"` anywhere — minimum is `text-sm` / `14px`
- **Do not** use `text-muted-foreground`, `text-gray-400`, `text-white/30` for page-level text — use explicit `rgba(255,255,255,0.55+)` values
- **Do not** use `framer-motion` — use `motion/react` only
- **Do not** use `react-router-dom` — use `react-router` only
- **Do not** use `<a href>` for internal links — use `<Link to>` from `react-router`
- **Do not** import from `react-router-dom`
- **Do not** add font `@import` statements anywhere except `/src/styles/fonts.css`
- **Do not** create a `tailwind.config.js` — Tailwind v4 is configured via CSS
- **Do not** modify `/src/styles/theme.css` CSS variables for brand changes — use inline styles or Tailwind classes
- **Do not** use `max-w-7xl` or Tailwind's `container` — use `max-w-[1440px]`
- **Do not** hardcode department accent colours inline — always use `getServiceColors()`
- **Do not** use `rgba(255,255,255,0.3)` or lower for body text — this is too dim
- **Do not** set `noIndex` on any page except `/404` and form confirmation pages
- **Do not** create default exports in component files (except `App.tsx`)
- **Do not** use CSS `transition` or `@keyframes` for animations — use Motion only
- **Do not** use `figma:asset/` imports — see §17 below

---

## 15. Adding a New Route — Checklist

1. Create the page component in `/src/app/pages/` (or appropriate sub-folder)
2. Add a named export (e.g. `export function MyPage()`)
3. Add a lazy import in `/src/app/routes.ts`
4. Add the route to the `children` array in `routes.ts`
5. Add the URL to `/public/sitemap.xml`
6. If it belongs in the nav mega-menu, add it to `navItems` in `Nav.tsx`
7. Include `<SEOHead>` as the first child of the page
8. Use `<DepartmentHero>` if it's a department or sub-service page
9. Follow the page structure template in §9 above

---

## 16. Colour Quick-Reference Card

```
Brand cyan (shared/homepage):  #00d4e8
Page background (all pages):   #16212e
Card surface:                   #1d2d3e
Card hover:                     #243245
Footer / deep overlays:         #0f0a1e

Web Apps accent:    #b89fd4  bg: #1e1040
Web Design accent:  #5ec4d4  bg: #162535
SEO accent:         #3dd68c  bg: #102830
Hosting accent:     #f59e6a  bg: #2a1a4e
Branding accent:    #f472b6  bg: #1a1a2e
Support accent:     #00d4e8  bg: #1a2840
```

---

## 17. `figma:asset/` Imports — Critical Deployment Rule

The `figma:asset/<hash>.png` import scheme is **Figma Make-specific**. It is resolved by a private Vite plugin that only runs inside Figma Make's build environment. It **does not exist** in any external build (Cloudflare Pages, Vercel, Netlify, etc.) and will cause Rollup to crash with:

```
Rollup failed to resolve import "figma:asset/…" from "…"
```

### What was done

A fallback Vite plugin was added to `vite.config.ts` (`figmaAssetPlugin`) that intercepts any remaining `figma:asset/` import and returns an empty-string module so the build never crashes. This is a safety net only.

### What you must do when adding images

**Never use `figma:asset/` imports in new code.** Always use one of:

1. **Unsplash URLs** — for generic/stock imagery. Always fetch via the `unsplash_tool`, never guess a URL.
2. **Absolute URLs** — for hosted client images (e.g. a CDN or Supabase Storage URL).
3. **`/public/` static assets** — place the file in `/public/images/` and reference as `/images/filename.png`.

### Replacing existing `figma:asset` references

All `figma:asset` imports have been replaced with Unsplash URLs in:
- `HeroDevices.tsx` — 14 device image imports → `IMAGE_PAIRS` array of URLs
- `About.tsx` — office background image → Unsplash URL constant
- `DeviceMockups.tsx` — laptop frame image → Unsplash URL constant
- `projectImages.ts` — 13 portfolio hero images → Unsplash URL map
- `ProjectPage.tsx` — 28+ per-project gallery/detail images → `IMG` constant object

To swap in real client screenshots later, simply update the URL string in the relevant `IMG.*` key or `projectImages` map entry — no import changes needed.