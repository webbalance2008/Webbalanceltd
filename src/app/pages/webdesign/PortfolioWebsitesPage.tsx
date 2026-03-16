import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  Image, Layers, Eye, Sparkles, Monitor, Pen,
} from "lucide-react";

export function PortfolioWebsitesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — Portfolio & Creative"
      title="Portfolio & Creative Websites"
      subtitle="Showcase your work with a site as distinctive as your portfolio"
      heroImage=""
      seoPath="/web-design/portfolio-websites"
      seoKeywords="portfolio website design, creative website, photographer website, artist website, designer portfolio UK"
      overview="Your portfolio website is your most important piece of work — the one that sells everything else."
      overviewDetail="Architects, photographers, designers, artists, agencies — your website needs to get out of the way and let your work speak. But it also needs to feel considered, intentional, and reflective of your creative sensibility. We design portfolio websites that present your projects with the respect they deserve, using layout, typography, and interaction design to create an experience that's itself a demonstration of quality."
      features={[
        { icon: Image, title: "Visual-First Layouts", body: "Full-bleed imagery, cinematic galleries, and layouts that prioritise visual impact over clutter.",
          detail: "The work is the message — and the design should amplify it, not compete with it. Full-bleed imagery that fills the viewport, grid systems that respond to the proportions of each project's photography, generous whitespace that gives each piece room to breathe, and typographic restraint that lets the work lead. Navigation is minimal and unobtrusive. The entire site creates the feeling of walking through a considered, curated exhibition — where every layout decision serves the work it presents." },
        { icon: Layers, title: "Project Case Studies", body: "Structured case study templates with before/after, process documentation, and rich media embeds.",
          detail: "A project gallery shows what you made. A case study shows how you think — which is what actually wins high-value clients. We design case study templates that guide the narrative: the brief and the challenge, the process and decisions, the resolution and outcome. Before/after comparisons, process sketches and iterations, client quotes, and measurable results where available. The case study format that wins work isn't a list of deliverables — it's a story that demonstrates problem-solving intelligence, collaborative approach, and the quality of outcome clients can expect." },
        { icon: Eye, title: "Immersive Interaction", body: "Parallax scrolling, reveal animations, and hover effects that make browsing your work an experience in itself.",
          detail: "For creative professionals, the website is itself a piece of work — and its interactivity is part of the portfolio statement. Scroll-triggered animations that reveal content progressively, parallax effects that create depth in hero imagery, hover states that preview each project before the click, and page transitions that make navigation feel intentional. These interactions are designed to enhance the work without distracting from it — and to demonstrate the level of craft clients can expect when they hire you." },
        { icon: Sparkles, title: "Art Direction Per Project", body: "Each project page can have its own colour palette, layout, and personality while maintaining site cohesion.",
          detail: "The most memorable portfolio websites treat each project page as its own editorial decision. A brand identity project for a luxury hotel has a different visual language than a campaign for a streetwear brand — and the case study page should reflect that. We build portfolio systems with flexible page templates that accommodate project-specific colour palettes, typography choices, and layout variations while maintaining enough structural consistency that the site feels like a coherent whole. The contrast between project pages becomes part of what demonstrates range." },
        { icon: Monitor, title: "Retina-Ready Everything", body: "High-resolution image delivery with lazy loading and format optimisation — sharp on every screen.",
          detail: "For visual professionals, pixel-sharp image quality is non-negotiable — blurry or compressed portfolio images actively undermine the work they're meant to show. We implement a complete image optimisation pipeline: WebP and AVIF format serving, multiple resolution variants via srcset so each device gets the right size, lazy loading that defers off-screen images to keep load times fast, and blur-up placeholders that maintain layout stability while images load. Your work looks as good on a 5K monitor as it does on a phone." },
        { icon: Pen, title: "Easy Content Updates", body: "CMS-powered so you can add new projects, reorder work, and update copy without touching code.",
          detail: "Your portfolio needs to stay current — a site you can't update becomes a liability rather than an asset. We build CMS interfaces that match how creative professionals think about their work: projects as the primary content type with rich fields for imagery, process documentation, credits, and client information; drag-to-reorder for featured projects; and media handling that accepts the large file sizes photographers and designers work with. Adding a new project should take 20 minutes, not a developer ticket." },
      ]}
      industries={[
        { name: "Architecture & Interior Design", description: "Project galleries with floor plans, before/after sliders, and location-based project filtering.",
          detail: "Architecture portfolios need to communicate scale, context, and quality simultaneously. Full-bleed project photography with zoom functionality, floor plans and section drawings presented clearly, before/after sliders for renovation projects, and project filtering by typology, location, and scale — all within a visual framework that expresses the firm's design sensibility. Client testimonials and awards lend credibility, while a clear practice overview and team profiles establish the depth of expertise behind the work." },
        { name: "Photography", description: "Full-screen galleries, lightbox viewing, client proofing areas, and print ordering integration.",
          detail: "A photographer's website must load fast, look immaculate, and present images at the scale they deserve. Full-screen gallery layouts, lightbox viewing with keyboard navigation, and category galleries by genre (wedding, commercial, editorial, fine art) give clients an immediate sense of range. Private client proofing areas — password-protected galleries where clients can view, select, and comment on their images — reduce the back-and-forth of post-shoot communication dramatically. Print ordering integration turns the gallery into a revenue stream beyond commissions." },
        { name: "Graphic Design & Branding", description: "Visual case studies showing brand systems, mockups, and the strategic thinking behind each identity.",
          detail: "Branding portfolio websites have a unique opportunity: the site itself is the most visible demonstration of what the studio can do. A site that is visually distinctive, typographically confident, and behaviourally considered tells the story before a project is clicked. Project case studies for branding work go deep: the brand strategy that preceded the visual identity, the logo development process and rationale, the full brand system in application, and the impact the brand has had for the client. This depth is what separates studios that win brand projects from those that only win logo requests." },
        { name: "Film & Video Production", description: "Showreels, embedded video players, project breakdowns, and client testimonials.",
          detail: "Film and video portfolios are defined by their showreels — and showreel presentation matters enormously. Auto-play reels that demonstrate range immediately, project pages with full-quality embedded players and behind-the-scenes documentation, genre filtering (narrative, commercial, documentary, music video), and technical credits for awards-eligibility purposes. Client testimonials from recognisable brands build the credibility that production companies need to attract both direct client work and agency collaborations." },
        { name: "Art & Illustration", description: "Gallery-driven layouts with category filtering, exhibition schedules, and commission enquiry forms.",
          detail: "Fine art and illustration websites need to present work at its best while accommodating the commercial realities of the creative practice: selling prints and originals, taking commissions, documenting exhibition history, and attracting licensing enquiries. Gallery-driven layouts with category and medium filtering let collectors and commissioners find what they're looking for. Edition management for print sales, commission enquiry forms with brief-capture fields, exhibition schedules and press coverage, and an artist statement that contextualises the work all contribute to a platform that serves both commercial and cultural audiences." },
        { name: "Creative Agencies", description: "Multi-discipline portfolios with team profiles, client logos, awards, and thought leadership content.",
          detail: "Agency portfolio sites are complex propositions: they need to showcase work across multiple disciplines, introduce a team of individuals, establish cultural fit as well as capability, and drive enquiries from the right kind of prospective client. We design agency sites that lead with the most impressive work, organise capabilities clearly without feeling corporate, and introduce the people behind the projects in a way that humanises the brand. Client logos, industry awards, and case study outcomes build the social proof that justifies a premium positioning." },
      ]}
      included={[
        "Bespoke visual-first design",
        "Project/case study template system",
        "High-res image optimisation pipeline",
        "Lightbox gallery with keyboard navigation",
        "Category and tag-based filtering",
        "Responsive image grids (masonry optional)",
        "Video embedding with lazy loading",
        "CMS for self-managed content updates",
        "SEO-optimised project pages",
        "Contact/enquiry form integration",
        "Social media and Behance/Dribbble links",
        "Google Analytics setup",
      ]}
      process={[
        { step: "01", title: "Creative Direction", description: "We review your body of work, understand your aesthetic, and define a design direction that amplifies your creative voice without competing with it." },
        { step: "02", title: "Layout & Interaction Design", description: "Page-by-page design exploring grid systems, typography, transitions, and how each project is presented — with interactive prototypes." },
        { step: "03", title: "Build & Optimise", description: "Clean front-end development with image optimisation, lazy loading, smooth animations, and CMS integration for easy updates." },
        { step: "04", title: "Curate, Test & Launch", description: "We help you select and sequence your strongest work, test across all devices, and launch with a performance-audited, pixel-perfect result." },
      ]}
      related={[
        { label: "Website Type", title: "Corporate Websites", description: "When your creative practice needs a full business presence beyond the portfolio.", path: "/web-design/corporate-websites" },
        { label: "Website Type", title: "Blog & Content Websites", description: "Add thought leadership and behind-the-scenes content alongside your project work.", path: "/web-design/blog-websites" },
        { label: "Website Type", title: "Landing Pages", description: "Single-purpose pages for exhibitions, launches, or commission enquiries.", path: "/web-design/landing-pages" },
      ]}
      ctaTitle="Your work deserves a website that does it justice."
      concepts={[
        { title: "Project Gallery", description: "Full-bleed image grid with hover previews, category filtering, and smooth transitions — letting your work take centre stage.", layout: "calendar" },
        { title: "Case Study Layout", description: "Long-form project page with hero imagery, process documentation, client brief, and outcome metrics.", layout: "kanban" },
        { title: "Creative Landing", description: "Bold typographic hero, curated project highlights, and a clear path to enquire — your portfolio's front door.", layout: "chat" },
      ]}
    />
  );
}