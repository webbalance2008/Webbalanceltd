import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  FileText, Rss, Search, Tag, Share2, BarChart3,
} from "lucide-react";

export function BlogWebsitesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — Blog & Content"
      title="Blog & Content Websites"
      subtitle="Turn your expertise into traffic, trust, and authority"
      heroImage=""
      seoPath="/web-design/blog-websites"
      seoKeywords="blog website design, content website, content marketing, blog platform, UK content website development"
      overview="A well-designed content website turns your knowledge into your most powerful marketing asset — attracting the right audience organically, month after month."
      overviewDetail="Content marketing works. But only when the reading experience is genuinely enjoyable, the site is fast, and the architecture is built for search engines to understand. We design content-first websites and blog platforms that make your articles, guides, and resources look exceptional — and rank for the terms your audience is actually searching for. No bloated WordPress themes. No plugin overload. Just clean, fast, beautifully readable content."
      features={[
        { icon: FileText, title: "Reading-First Design", body: "Typography, spacing, and layout optimised for long-form reading — comfortable on any device, at any screen size.",
          detail: "The reading experience is the product on a content website, and it deserves as much attention as the content itself. We obsess over the details that make long-form reading comfortable: a typeface with the right x-height for sustained reading, line lengths of 65–75 characters, generous line height that prevents visual fatigue, and spacing between sections that lets the reader breathe. On mobile, font sizes, margins, and touch targets are reconsidered entirely — not simply scaled down from the desktop layout." },
        { icon: Rss, title: "Content Management", body: "Intuitive CMS that makes publishing, scheduling, and organising content effortless for your team.",
          detail: "A CMS your team won't use is the most expensive kind. We build content management interfaces around the specific workflows of the people publishing the content: writers who need a distraction-free editing environment, editors who need a clear review and approval process, and marketing managers who need scheduling and bulk management tools. Rich text editors handle all the formatting your content requires — pull quotes, callout boxes, embedded media, code blocks — without requiring HTML knowledge. Drafts, scheduled publishing, and version history come as standard." },
        { icon: Search, title: "SEO Architecture", body: "Category structures, internal linking, schema markup, and URL patterns built for search engine visibility.",
          detail: "Content websites live and die by organic search — and the structural decisions made at build time determine how well the site performs for years. We establish the URL taxonomy, category hierarchy, and internal linking architecture before any design work begins. Article schema markup enables rich snippet eligibility. Canonical tags prevent duplicate content issues. And the site architecture is designed to concentrate authority on the pages that matter most, rather than diffusing it across thousands of unlinked posts." },
        { icon: Tag, title: "Taxonomy & Filtering", body: "Categories, tags, author pages, and custom taxonomies that help readers discover related content.",
          detail: "A growing content library without good navigation becomes harder to use the larger it gets. Taxonomy design — the categories, tags, and custom classifications that organise your content — determines whether a reader who finishes one article naturally flows to a second, third, and fourth. We design taxonomies that reflect how your readers think about your content, not how your content team files it internally. Author pages with biographical context and article archives build the personal connection that turns occasional readers into loyal subscribers." },
        { icon: Share2, title: "Social Distribution", body: "Open Graph metadata, social sharing buttons, and newsletter integration to amplify your content's reach.",
          detail: "Every article is a potential top-of-funnel touchpoint — but only if it's shareable in a way that does it justice. Open Graph meta tags ensure that when content is shared on LinkedIn, Twitter, or Facebook, the preview image and description are compelling. Email newsletter integration (Mailchimp, Beehiiv, ConvertKit, or custom) captures readers before they leave, building a direct distribution channel that doesn't depend on algorithm changes. Social sharing is placed at the optimal moments in the reading journey — not obstructively at the top, but at the natural completion points where sharing intent is highest." },
        { icon: BarChart3, title: "Content Analytics", body: "Track which articles drive traffic, engagement, and conversions — so you can double down on what works.",
          detail: "Most content teams produce without really knowing what's working. The analytics setup we build answers the questions that matter: which articles are driving the most organic traffic (and from which keywords), which pieces have the highest engagement time suggesting genuine readership, which articles are generating newsletter sign-ups or enquiries, and which content topics are performing consistently versus one-off spikes. Armed with this data, content strategy becomes data-informed rather than intuition-based." },
      ]}
      industries={[
        { name: "Marketing Agencies", description: "Thought leadership blogs that demonstrate expertise and attract inbound leads from organic search.",
          detail: "An agency's blog is its most credible new business tool — but only when the content quality and presentation match the capabilities being sold. We design agency content platforms that position strategic thinking, case study storytelling, and sector expertise in a way that attracts exactly the kind of clients agencies want to work with. A well-structured content hub that ranks for the right search terms generates qualified inbound enquiries continuously — a far more effective (and lower cost) acquisition channel than paid advertising." },
        { name: "SaaS & Technology", description: "Product documentation, feature announcements, tutorials, and technical guides that reduce support load.",
          detail: "For SaaS companies, content does multiple jobs simultaneously: attracting organic traffic from people researching problems your product solves, educating prospects through the consideration phase, reducing support volume through self-service documentation, and retaining customers by helping them get more value from the product. We build content architectures that serve all of these audiences from a single platform — separating marketing content, product updates, and technical documentation cleanly while maintaining a consistent brand experience." },
        { name: "Professional Services", description: "Expert insights, regulatory updates, and case studies that establish authority in specialist fields.",
          detail: "In specialist professional services — law, accountancy, planning, engineering — the firms that publish clear, useful insights on complex topics build extraordinary authority. Prospects searching for guidance on a specific regulatory change, tax treatment, or compliance challenge find your content, form a judgement about your expertise, and arrive at their first enquiry already convinced. The content website is the digital equivalent of being the partner everyone calls first — and it scales in a way that individual relationships never can." },
        { name: "Health & Wellness", description: "Advice articles, research summaries, and practitioner insights that attract health-conscious audiences.",
          detail: "Health and wellness content is among the highest-volume search categories — and among the most competitive. Standing out requires content that is genuinely rigorous, clearly attributed to qualified practitioners, and presented with the credibility signals (author credentials, research citations, date of review) that both readers and search engines expect from health content. We design health content platforms that meet the Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards that determine ranking in this sensitive category." },
        { name: "Education & Training", description: "Course previews, learning resources, and student success stories that drive enrolment.",
          detail: "Education content marketing works because the content itself demonstrates the quality of the teaching. A blog or resource library that solves real problems, previews curriculum thinking, and publishes student success stories builds trust with prospective students before they ever speak to an admissions team. We design education content platforms that serve both acquisition (attracting prospective students via search) and retention (supporting current students with supplementary resources), with a tone and visual identity that reflects the learning experience you deliver." },
        { name: "Media & Publishing", description: "Digital magazines, news sites, and editorial platforms with high-volume content workflows.",
          detail: "Editorial platforms at media scale have demands that differ from typical brand blogs: high publishing volumes (dozens of articles per day), multiple contributor management, complex section and category structures, advertising integration, paywall functionality, and newsletter distribution that runs automatically. We build editorial platforms that handle this complexity without compromising the reading experience — platforms that feel as considered and beautiful as the editorial standard they publish." },
      ]}
      included={[
        "Bespoke editorial design",
        "Reading-optimised typography system",
        "Category and tag architecture",
        "Author profile pages",
        "Related articles engine",
        "Full-text search functionality",
        "Newsletter signup integration",
        "Social sharing and Open Graph setup",
        "RSS feed",
        "Schema markup for rich snippets",
        "CMS with scheduling and drafts",
        "Analytics with content performance tracking",
      ]}
      process={[
        { step: "01", title: "Content Strategy", description: "We audit your existing content, define your taxonomy, and plan the information architecture that supports both readers and search engines." },
        { step: "02", title: "Editorial Design", description: "Article templates, listing pages, author profiles, and category views — all designed for readability and engagement." },
        { step: "03", title: "Build & Integrate", description: "Development with CMS integration, search functionality, newsletter connection, and analytics setup." },
        { step: "04", title: "Migrate, Test & Launch", description: "Content migration from existing platforms, redirect mapping, SEO verification, and a managed go-live." },
      ]}
      related={[
        { label: "Website Type", title: "Corporate Websites", description: "Combine your content hub with a full corporate web presence.", path: "/web-design/corporate-websites" },
        { label: "Website Type", title: "Landing Pages", description: "Campaign landing pages to capture leads from your highest-performing content.", path: "/web-design/landing-pages" },
        { label: "Website Type", title: "Portfolio Websites", description: "Pair your content strategy with visual project showcases.", path: "/web-design/portfolio-websites" },
      ]}
      ctaTitle="Let's turn your expertise into your best marketing channel."
      concepts={[
        { title: "Article Listing", description: "Clean blog index with featured posts, category filters, thumbnail previews, and pagination — making your content library browsable and inviting.", layout: "list" },
        { title: "Article Template", description: "Long-form reading layout with optimal line length, clear headings, pull quotes, inline images, and related article suggestions.", layout: "kanban" },
        { title: "Content Hub", description: "Homepage-style content hub with featured articles, category sections, newsletter signup, and trending content — your knowledge base's front door.", layout: "dashboard" },
      ]}
    />
  );
}