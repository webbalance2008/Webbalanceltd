// Gallery images for Waverley Cutting Tools
import waverleyHero from "figma:asset/839721e195d1220f6edc07451159f2a7649eb5e2.png";
import waverlyCuttingTools from "figma:asset/8e63e0389a809b1b970fa86082fe3860d342fc9c.png";
import waverleyServices from "figma:asset/b5e1f47ca2e6cddcfa05aa30b5715146efc6f5ca.png";
import waverleySectors from "figma:asset/c7ca592a158ec319d4d639e521a8c4ec4b060c80.png";

// Gallery images for TAC Healthcare
import tacHealthcareLaptop from "figma:asset/f2e5488299934b3cde6947d52c00b7fb91fdbd54.png";
import tacHealthcareMobile from "figma:asset/6badd6d96255792657cc4db1b2395452b74ba6b7.png";
import tacHealthcareTablet from "figma:asset/3b65f1d68b447f33bdc16334120049a03880968d.png";
import tacHealthcareResponsive from "figma:asset/529b0dc926fef48b081e439fa8f42c0bb56a7771.png";

// Gallery images for Saltire Energy
import saltireDevices from "figma:asset/e9ad5ef4c49748391f40b7c671ac985806aa126d.png";
import saltireMobile from "figma:asset/acb2f9b7a0fa70706debe24e9df95b86261ffdf3.png";
import saltireHand from "figma:asset/62ce67166981db32a522b9b93ba304b86cfa534d.png";
import saltireLaptop from "figma:asset/e129f58681c6ee9fb2cbd21feeddd4f76dfaf55f.png";

// Gallery images for GT Diagnostics
import gtDiagnosticsBrochure1 from "figma:asset/ab001186cfc9624db17c78882cbcb275c7b3f728.png";
import gtDiagnosticsBrochure2 from "figma:asset/4e7c12b185271f209fdf637f5ef36ab9eee9aeb5.png";
import gtDiagnosticsExhibition from "figma:asset/1b3377d54e6d179e68b5cd5d8444f1abebc28b2c.png";
import gtDiagnosticsFlyers from "figma:asset/f6f055b93cdf3e832ee000779b3dbef8695267e2.png";
import gtDiagnosticsBanner from "figma:asset/3745657768fc505067a425753cc71eeeffce7963.png";
import gtDiagnosticsCards from "figma:asset/7d7ec6f12dd0653b6f13fcaf2a19bcd2ca22394b.png";
import gtDiagnosticsBrochureStack from "figma:asset/574b63ff2c81bbad612762506114ae99749a3772.png";
import gtDiagnosticsStationery from "figma:asset/60283e2efd5b1faa957164ab3595b6e0767ab8f0.png";
import gtDiagnosticsEmailSignatures from "figma:asset/916bea056653f730a3dba3ca91e6c1c81cbd3f7d.png";
import gtDiagnosticsBrochureSpread from "figma:asset/06bad9a992e6409b4b9900d9abed580c35e76f40.png";
import gtDiagnosticsWebsiteScreens from "figma:asset/c48cc6817d1aa40b7e3fb3f411edc3e00e317188.png";

// Gallery images for Granite Elite
import graniteEliteMobile from "figma:asset/52992da585a2ebf816504013ac91ae9e7beed9d3.png";
import graniteEliteDesktop from "figma:asset/046014c6d95c38df2ea4c18eb570472db295568c.png";

// Gallery images for Early Bird Vending
import earlyBirdLaptop from "figma:asset/3873a94972031eefbcc8e1e665c1bc241175c20a.png";
import earlyBirdTablet from "figma:asset/9930da3cfb7a10474a6fc0cf057b8181ed52dba8.png";
import earlyBirdPhones from "figma:asset/99008ecffbead56a4e151c1c8ca9497738af79ee.png";
import earlyBirdDevices from "figma:asset/52ffa55af67c5dca0c505b3aa30c536467ea75ee.png";

// Gallery images for Puls8 Piping Solutions
import puls8Video from "figma:asset/868bcf966774ac6b826588c631ee16271c0ce744.png";
import puls8Tablet from "figma:asset/56c18ef7d22d376c58da9509a8718d0861ed0272.png";
import puls8Devices from "figma:asset/11b77ecb4e65b36145a4a9f0920a6ef8407df54a.png";
import puls8DualMac from "figma:asset/f5472d0f9c87d16a16edeb6148fc21dd77456b46.png";

// Gallery images for Drumaber
import drumaberDualPhone from "figma:asset/d82991a5128e0ddd81015a84c3569632441171a4.png";
import drumaberLaptop from "figma:asset/575ef514cf7f88ee11c356a7e13aab9582a027e2.png";
import drumaberDevices from "figma:asset/7775e8b70f8871a7a5eb585ecb2d28b6282401ab.png";
import drumaberBrand from "figma:asset/fed2fbb329c8e679000f699738ced8a4adef77a5.png";

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  image: string;
  color: string;
  size: "large" | "small";
  externalUrl?: string;
  overview: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  gallery: string[];
  services: string[];
  client: string;
  duration: string;
  nextSlug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "waverley-cutting-tools",
    title: "Waverley Cutting Tools",
    subtitle: "Precision Tooling & Manufacturing",
    category: "Manufacturing",
    year: "2024",
    tags: ["B2B", "E-Commerce", "Catalogue"],
    description:
      "A responsive website for a superior one-stop-shop for all your cutting tools, measuring equipment, abrasives, oils and coolants.",
    image: "",
    color: "#1a2535",
    size: "large",
    externalUrl: "https://waverleytools.co.uk",
    client: "Waverley Cutting Tools Ltd.",
    duration: "9 Weeks",
    services: ["Web Design", "B2B E-Commerce", "Product Catalogue", "SEO"],
    overview:
      "Waverley Cutting Tools is a superior one-stop-shop for all your cutting tools, measuring equipment, abrasives, oils and coolants. Serving the engineering, manufacturing and industrial sectors, they needed a professional digital platform to showcase their extensive product range and support their B2B customer base.",
    challenge:
      "An ageing website with a disorganised product listing and no online ordering was costing the sales team hours of manual enquiry handling each week. Industrial buyers were choosing competitors with cleaner digital catalogues and faster response loops.",
    solution:
      "We designed a brand new responsive website for Waverley Cutting Tools that clearly presents their comprehensive product range across cutting tools, measuring equipment, abrasives, oils and coolants. The intuitive structure and professional presentation helps customers find exactly what they need, while the modern platform positions Waverley as the superior one-stop-shop they truly are.",
    results: [
      { label: "Trade Enquiries (Month 1)", value: "+290%" },
      { label: "Catalogue Browsing Time",   value: "+4m avg" },
      { label: "Sales Team Hours Saved",    value: "12 hrs/wk" },
      { label: "Organic Traffic Growth",    value: "+340%" },
    ],
    gallery: [waverleyHero, waverlyCuttingTools, waverleyServices, waverleySectors],
    nextSlug: "tac-healthcare",
  },
  {
    id: 2,
    slug: "tac-healthcare",
    title: "TAC Healthcare",
    subtitle: "Occupational Health & Wellbeing",
    category: "Healthcare",
    year: "2024",
    tags: ["Healthcare", "Lead Gen", "Brand"],
    description:
      "A clean, trust-led digital presence for a specialist occupational health provider — communicating clinical credibility, service breadth and a clear pathway from awareness to appointment.",
    image: "",
    color: "#0d2030",
    size: "small",
    client: "TAC Healthcare",
    duration: "8 Weeks",
    services: ["Brand-Led Web Design", "Responsive Development", "Lead Generation", "SEO"],
    overview:
      "TAC Healthcare delivers occupational health and employee wellbeing services to businesses across Scotland. They needed a website that communicated clinical authority and helped HR teams and business owners quickly understand their offering and make contact.",
    challenge:
      "An outdated website with cluttered content and no clear call-to-action was generating minimal inbound enquiries. The brand looked inconsistent across touchpoints and did not inspire the trust that clinical services demand.",
    solution:
      "We redesigned the site from the ground up — clean layouts, confident typography and restrained use of colour all reinforced the clinical credibility. Service pages were structured around buyer intent, and a simple multi-step contact form reduced friction and improved lead quality.",
    results: [
      { label: "Inbound Enquiries",      value: "+380%" },
      { label: "Bounce Rate Reduction",  value: "−44%" },
      { label: "Avg. Session Duration",  value: "2m 58s" },
      { label: "Organic Ranking Gain",   value: "+210%" },
    ],
    gallery: [tacHealthcareLaptop, tacHealthcareMobile, tacHealthcareTablet, tacHealthcareResponsive],
    nextSlug: "saltire-energy",
  },
  {
    id: 3,
    slug: "saltire-energy",
    title: "Saltire Energy",
    subtitle: "Energy Services & Solutions",
    category: "Energy",
    year: "2024",
    tags: ["Energy", "Corporate", "B2B"],
    description:
      "A corporate digital platform for an energy services specialist — conveying technical capability, global reach and a sharp, sector-confident brand identity.",
    image: "",
    color: "#0a1f1a",
    size: "small",
    client: "Saltire Energy Ltd.",
    duration: "10 Weeks",
    services: ["Web Design", "Responsive Development", "Brand Direction", "CMS"],
    overview:
      "Saltire Energy provides specialist energy services to operators across the North Sea and beyond. Operating in a sector where credibility and capability must be immediately apparent, they required a website that communicated their depth of expertise and positioned them confidently against larger competitors.",
    challenge:
      "The existing site was outdated and static — failing to communicate the scale of Saltire's capabilities or support their international business development activity. Prospective clients were landing on the site and finding no reason to engage.",
    solution:
      "We designed a bold, sector-appropriate platform with structured capability sections, a clean project archive and a clear BD enquiry flow. Rich use of imagery, strong typography and measured animation gave the brand the weight it deserved.",
    results: [
      { label: "BD Enquiries (Qtr 1)",   value: "+420%" },
      { label: "Pages Per Session",      value: "4.8 avg" },
      { label: "Organic Visibility",     value: "+280%" },
      { label: "Avg. Session Duration",  value: "3m 20s" },
    ],
    gallery: [saltireDevices, saltireLaptop, saltireHand, saltireMobile],
    nextSlug: "romar-abrado",
  },
  {
    id: 4,
    slug: "romar-abrado",
    title: "Romar Abrado",
    subtitle: "Downhole Tools & Energy Services",
    category: "Energy",
    year: "2023",
    tags: ["Energy", "Oil & Gas", "B2B"],
    description:
      "A technically precise, credibility-first website for a specialist downhole tools and engineering firm — built to support global business development and communicate deep sector expertise.",
    image: "",
    color: "#1e1a10",
    size: "large",
    client: "Romar Abrado Ltd.",
    duration: "9 Weeks",
    services: ["Web Design", "Technical Copywriting", "Responsive Development", "SEO"],
    overview:
      "Romar Abrado designs and manufactures specialist downhole tools for the global oil and gas sector. Operating in a demanding, high-stakes market, their website needed to convey engineering precision, operational reliability and a track record that earns trust before a conversation even begins.",
    challenge:
      "A basic, unbranded web presence was underselling the company's genuine technical capability and international reach. Prospective clients in Houston, Aberdeen and Singapore were forming impressions from a site that didn't reflect the quality of the product.",
    solution:
      "We built a clean, authoritative platform structured around their product families and service capabilities. Technical content was refined and restructured for clarity without sacrificing depth. A confident, restrained visual language — dark tones, precise grid, precise typography — matched the engineering culture of the brand.",
    results: [
      { label: "International Enquiries", value: "+360%" },
      { label: "Product Page Depth",      value: "+5.2 pages" },
      { label: "Organic Traffic",         value: "+310%" },
      { label: "Avg. Session Duration",   value: "4m 05s" },
    ],
    gallery: [],
    nextSlug: "puls8-piping-solutions",
  },
  {
    id: 5,
    slug: "puls8-piping-solutions",
    title: "Puls8 Piping Solutions",
    subtitle: "Specialist Piping & Fabrication",
    category: "Engineering",
    year: "2024",
    tags: ["Piping", "Technical", "Lead Gen"],
    description:
      "A sharp, lead-focused website for a specialist piping solutions provider — showcasing fabrication capabilities, sector experience and a structured project enquiry system.",
    image: "",
    color: "#152030",
    size: "small",
    client: "Puls8 Piping Solutions Ltd.",
    duration: "7 Weeks",
    services: ["Web Design", "Responsive Development", "Lead Generation", "CMS"],
    overview:
      "Puls8 Piping Solutions provides specialist piping design, fabrication and installation services across the energy, industrial and infrastructure sectors. They needed a website that clearly communicated their capabilities to procurement teams and project managers in a sector where trust is everything.",
    challenge:
      "With no meaningful online presence, Puls8 was invisible in search and dependent entirely on referral work. Competitors with professional digital platforms were winning tender processes before Puls8 even had a chance to pitch.",
    solution:
      "We built a capabilities-first website that organised their offer into clear service areas and sector applications. A structured project enquiry form guided prospects through their requirements before submitting — improving lead quality significantly from day one.",
    results: [
      { label: "Project Enquiries (Qtr 1)", value: "34" },
      { label: "Google Ranking (Sector)",   value: "#2" },
      { label: "Organic Traffic Growth",    value: "+490%" },
      { label: "Bounce Rate Reduction",     value: "−41%" },
    ],
    gallery: [puls8Video, puls8Tablet, puls8Devices, puls8DualMac],
    nextSlug: "omalleys-irish-bar",
  },
  {
    id: 6,
    slug: "omalleys-irish-bar",
    title: "O'Malley's Irish Bar & Kitchen",
    subtitle: "Bar & Kitchen",
    category: "Hospitality",
    year: "2024",
    tags: ["Branding", "CMS", "Booking"],
    description:
      "A cinematic digital experience for a beloved Irish bar, featuring atmospheric visuals, online table reservations, and a fully managed food & drink menu.",
    image:
      "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwYmFyJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMyNTY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#8B4513",
    size: "large",
    externalUrl: "https://web-balance.co.uk/omalleys-irish-bar-kitchen/",
    client: "O'Malley's Hospitality Group",
    duration: "8 Weeks",
    services: ["UI/UX Design", "CMS Development", "Table Booking Integration", "SEO"],
    overview:
      "O'Malley's Irish Bar & Kitchen needed a digital presence that matched the warmth and character of their physical venue — a place where locals gather, live music plays and good food flows. We built a full-service hospitality website from the ground up.",
    challenge:
      "The client had no existing digital presence and relied entirely on word of mouth. They needed a website that could handle table reservations, showcase their food and drinks menus, and reflect the unique soul of the venue — all without a large ongoing management burden.",
    solution:
      "We designed a dark, atmospheric site with rich photography and cinematic typography. A headless CMS lets the team update menus in minutes. The integrated reservation system reduced no-shows by 30% in the first month through automated confirmation emails.",
    results: [
      { label: "Increase in Reservations", value: "+340%" },
      { label: "Bounce Rate Reduction",    value: "−52%" },
      { label: "Monthly Organic Visits",   value: "8,400" },
      { label: "Google Rating",            value: "4.9 ★" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1700323525751-931335e7c932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcmlzaCUyMHB1YiUyMGRhcmslMjB3b29kJTIwaW50ZXJpb3IlMjB3YXJtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMjU5MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1710871131994-b309b3d871a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcmlzaCUyMGJhciUyMGJlZXIlMjBwaW50cyUyMGZvb2QlMjBtZW51fGVufDF8fHx8MTc3MzI1OTAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwYmFyJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMyNTY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    nextSlug: "gt-diagnostics",
  },
  {
    id: 7,
    slug: "gt-diagnostics",
    title: "GT Diagnostics",
    subtitle: "Life Sciences & Diagnostics",
    category: "Life Sciences",
    year: "2024",
    tags: ["Life Sciences", "Healthcare", "Local SEO"],
    description:
      "A comprehensive brand new responsive website and marketing collateral suite for an innovative diagnostic centre — including brochures, flyers, stationery and display banners designed to communicate cutting-edge life sciences expertise.",
    image: "",
    color: "#1a1a2a",
    size: "small",
    externalUrl: "https://gtdiag.com",
    client: "Genting TauRx Diagnostic Centre",
    duration: "6 Weeks",
    services: ["Web Design", "Brand Identity", "Print Design", "Marketing Collateral"],
    overview:
      "GT Diagnostics is part of the Genting TauRx Diagnostic Centre Sdn Bhd, founded as a joint venture between Genting Bhd and TauRx Therapeutics Limited. Their mission is to disrupt the current diagnostic market, addressing the massive mismatch between what is needed and demanded versus what currently available systems can provide at an affordable price.",
    challenge:
      "Entering a crowded and established diagnostic market required a confident, credible brand presence from day one. With no existing digital footprint or marketing materials, GT Diagnostics needed a complete brand system that could communicate innovation, clinical authority and accessibility simultaneously — both online and across physical touchpoints.",
    solution:
      "We designed a brand new responsive website alongside a comprehensive suite of marketing materials including brochures, flyers, stationery and display banners. The cohesive visual identity positions GT Diagnostics as a forward-thinking disruptor while maintaining the clinical credibility essential to the life sciences sector.",
    results: [
      { label: "Brand Touchpoints Created", value: "12+" },
      { label: "Website Launch Timeline",   value: "6 weeks" },
      { label: "Marketing Collateral",      value: "Complete suite" },
      { label: "Digital Presence",          value: "Live" },
    ],
    gallery: [gtDiagnosticsBrochure1, gtDiagnosticsBrochure2, gtDiagnosticsExhibition, gtDiagnosticsFlyers, gtDiagnosticsBanner, gtDiagnosticsCards, gtDiagnosticsBrochureStack, gtDiagnosticsStationery, gtDiagnosticsEmailSignatures, gtDiagnosticsBrochureSpread, gtDiagnosticsWebsiteScreens],
    nextSlug: "granite-elite",
  },
  {
    id: 8,
    slug: "granite-elite",
    title: "Granite Elite",
    subtitle: "Premium Stone Surfaces & Worktops",
    category: "Interiors",
    year: "2024",
    tags: ["Granite", "Interiors", "Lead Gen"],
    description:
      "An aspirational, conversion-focused website for a premium granite and stone surface supplier — showcasing natural stone collections, bespoke fabrication and a streamlined quote request journey.",
    image: "",
    color: "#252020",
    size: "large",
    client: "Granite Elite Ltd.",
    duration: "8 Weeks",
    services: ["Web Design", "Responsive Development", "Lead Generation", "Photography Direction"],
    overview:
      "Granite Elite supplies and fits premium granite, quartz and marble surfaces for residential and commercial clients across Scotland. Their product is visually stunning and their craftsmanship exceptional — they needed a website that did justice to both.",
    challenge:
      "A plain, underperforming website failed to showcase the beauty of their stone collections or instil confidence in high-value customers making significant investment decisions. Lead volume was low and lead quality was inconsistent.",
    solution:
      "We built an aspirational, photography-led site with a rich material gallery, structured product collections and a guided quote request journey. Careful attention to typography, spacing and image art direction made the site feel as premium as the product.",
    results: [
      { label: "Quote Requests (Month 1)", value: "+370%" },
      { label: "Avg. Order Value",        value: "+28%" },
      { label: "Bounce Rate Reduction",   value: "−49%" },
      { label: "Organic Traffic",         value: "+290%" },
    ],
    gallery: [graniteEliteMobile, graniteEliteDesktop],
    nextSlug: "early-bird-vending",
  },
  {
    id: 9,
    slug: "early-bird-vending",
    title: "Early Bird Vending",
    subtitle: "Smart Vending Solutions",
    category: "Food & Beverage",
    year: "2023",
    tags: ["Vending", "B2B", "Lead Gen"],
    description:
      "A fresh, professional website for a modern vending solutions provider — generating B2B leads, communicating service flexibility and showcasing a wide product range for workplace and commercial clients.",
    image: "",
    color: "#1a1500",
    size: "small",
    client: "Early Bird Vending Ltd.",
    duration: "6 Weeks",
    services: ["Web Design", "Responsive Development", "Lead Generation", "CMS"],
    overview:
      "Early Bird Vending provides smart vending machine solutions to businesses, schools, gyms and public venues across Scotland. They offer a wide product range, flexible service agreements and a fully managed operation — and needed a website that communicated this to busy facilities managers and procurement teams.",
    challenge:
      "With no effective online presence, Early Bird were missing significant inbound enquiry opportunities. Facilities managers searching for vending solutions were landing on competitor sites with clearer propositions and better-designed contact flows.",
    solution:
      "We created a clean, professional B2B website structured around client types and use cases. Clear service summaries, an easy product catalogue and a simple enquiry form gave prospective clients everything they needed to make a confident decision.",
    results: [
      { label: "B2B Enquiries (Qtr 1)",  value: "+440%" },
      { label: "Google Ranking (Local)", value: "#1" },
      { label: "Organic Traffic",        value: "+380%" },
      { label: "Bounce Rate Reduction",  value: "−38%" },
    ],
    gallery: [earlyBirdLaptop, earlyBirdTablet, earlyBirdPhones, earlyBirdDevices],
    nextSlug: "drumaber",
  },
  {
    id: 10,
    slug: "drumaber",
    title: "Drumaber",
    subtitle: "Construction & Civil Engineering",
    category: "Construction",
    year: "2023",
    tags: ["Construction", "Civil Engineering", "B2B"],
    description:
      "A refined, immersive website for a Scottish rural estate — capturing the character of the landscape, communicating exclusive experiences and driving premium event and let enquiries.",
    image: "",
    color: "#1a2010",
    size: "small",
    client: "Drumaber Estate",
    duration: "9 Weeks",
    services: ["Web Design", "Photography Direction", "Responsive Development", "CMS"],
    overview:
      "Drumaber is a luxury rural estate in Scotland offering exclusive lets, corporate events and private celebrations. With a truly exceptional setting and a product that sells through imagery and atmosphere, they needed a website that could translate the in-person experience into a compelling digital one.",
    challenge:
      "The estate had no online presence worthy of its quality. Prospective clients — typically high-net-worth individuals and corporate event planners — were forming their first impressions from a generic, templated site that undersold everything Drumaber had to offer.",
    solution:
      "We built a cinematic, photography-first website with expansive imagery, restrained editorial typography and a carefully paced user journey. Enquiry pathways for different use cases — private hire, corporate events, seasonal lets — were clearly delineated and conversion-optimised.",
    results: [
      { label: "Premium Enquiries",       value: "+490%" },
      { label: "Avg. Enquiry Value",      value: "+£3,200" },
      { label: "Organic Search Growth",   value: "+320%" },
      { label: "Bounce Rate Reduction",   value: "−55%" },
    ],
    gallery: [drumaberDualPhone, drumaberLaptop, drumaberDevices, drumaberBrand],
    nextSlug: "custom-tuning",
  },
  {
    id: 11,
    slug: "custom-tuning",
    title: "Custom Tuning",
    subtitle: "Performance Remapping & Tuning",
    category: "Automotive",
    year: "2024",
    tags: ["Automotive", "Tuning", "Remapping"],
    description:
      "A bold, performance-first website for a specialist remapping and tuning garage — putting technical credibility front and centre and converting enthusiast visitors into booked appointments.",
    image: "",
    color: "#0f0f1e",
    size: "large",
    client: "Custom Tuning Scotland",
    duration: "7 Weeks",
    services: ["Web Design", "Online Booking", "Local SEO", "Brand Direction"],
    overview:
      "Custom Tuning is a performance remapping and vehicle tuning specialist with a reputation built through results on the road. Their customer base ranges from daily drivers looking for economy gains to serious enthusiasts chasing every last bhp — and they needed a website that spoke authentically to both.",
    challenge:
      "An amateurish website was damaging the credibility of a genuinely expert business. Customers searching for ECU remapping and performance tuning were choosing competitors with better-presented digital offers — despite Custom Tuning's technical superiority.",
    solution:
      "We designed a dark, high-energy site rooted in the brand's performance identity. Service pages were structured around vehicle types and tuning stages, with clear technical descriptions that built confidence. An integrated booking flow and results showcase converted visiting enthusiasts into paying customers.",
    results: [
      { label: "Bookings (Month 1)",    value: "+380%" },
      { label: "Organic Traffic",       value: "+460%" },
      { label: "Avg. Review Score",     value: "4.9 ★" },
      { label: "Bounce Rate Reduction", value: "−43%" },
    ],
    gallery: [],
    nextSlug: "banks-o-dee-fitness",
  },
  {
    id: 12,
    slug: "banks-o-dee-fitness",
    title: "Banks O' Dee",
    subtitle: "Sports & Fitness",
    category: "Health & Fitness",
    year: "2023",
    tags: ["Gym", "Class Booking", "On-Demand"],
    description:
      "A bold, energy-charged website for Banks O' Dee Sports & Fitness — bringing their gym, group exercise classes, personal training and myWellness app together under one high-impact digital platform.",
    image: "",
    color: "#2a2200",
    size: "small",
    externalUrl: "https://banksodee.co.uk",
    client: "Banks O' Dee Sports & Fitness",
    duration: "8 Weeks",
    services: ["Web Design", "Responsive Development", "CMS Integration", "Brand-Led UI"],
    overview:
      "Banks O' Dee Sports & Fitness is an Aberdeen institution — a full-service gym and sports club offering group exercise, personal training, a massive variety of live and on-demand classes, and the myWellness app. They needed a website that matched the energy of their brand and made it effortless for members and prospects to explore, book and connect.",
    challenge:
      "An ageing website was struggling to showcase the sheer breadth of what Banks O' Dee offers. Prospective members couldn't easily navigate between the gym, classes, sports and virtual offerings — and the site failed to communicate the club's vibrant, results-driven identity.",
    solution:
      "We built a high-impact, responsive website rooted in the club's bold black-and-yellow brand identity. Clear section architecture across Gym, Group Exercise, Sports and Live & On-Demand Classes means every member finds what they need fast. Integration with the myWellness app and a prominent class timetable drives consistent engagement beyond the website.",
    results: [
      { label: "Online Enquiries (Month 1)", value: "+310%" },
      { label: "Class Timetable Views",      value: "+420%" },
      { label: "Bounce Rate Reduction",      value: "−45%" },
      { label: "myWellness App Sign-Ups",    value: "+185%" },
    ],
    gallery: [],
    nextSlug: "aberdeen-northern-hotel",
  },
  {
    id: 13,
    slug: "aberdeen-northern-hotel",
    title: "Aberdeen Northern Hotel",
    subtitle: "Hospitality & Accommodation",
    category: "Hospitality",
    year: "2023",
    tags: ["Responsive Design", "Art Deco", "Hotel"],
    description:
      "A responsive digital identity for one of Aberdeen's most storied independent hotels — honouring its rich Art Deco heritage while setting a confident course for its future.",
    image: "",
    color: "#1a3a3a",
    size: "large",
    externalUrl: "https://aberdeennorthernhotel.com",
    client: "Aberdeen Northern Hotel",
    duration: "7 Weeks",
    services: ["Brand-Led Web Design", "Responsive Development", "CMS Integration", "SEO Foundation"],
    overview:
      "Aberdeen Northern Hotel is a proud independent institution that has warmly welcomed guests from near and far for generations. Rooted in the city's architectural heritage — with stunning original Art Deco interiors — the hotel needed a website that honoured its past while signalling a confident and modern vision for its future.",
    challenge:
      "An outdated web presence was underselling a genuinely special property. The site failed to communicate the hotel's history, warmth, or the breadth of its offer — from beautifully appointed rooms and a restaurant to meetings, functions and celebrations. Prospective guests were choosing competitors with stronger digital first impressions.",
    solution:
      "We built a fully responsive, brand-led website rooted in the hotel's Art Deco identity — using refined typography, rich photography and measured animation to convey character and quality. Clear navigation across Stay, Celebrate, Meet, Dine and Book reduced friction at every stage of the guest journey, and a lightweight CMS gave the team full control over content.",
    results: [
      { label: "Direct Booking Increase", value: "+260%" },
      { label: "Bounce Rate Reduction",   value: "−48%" },
      { label: "Organic Search Growth",   value: "+195%" },
      { label: "Avg. Session Duration",   value: "3m 40s" },
    ],
    gallery: [],
    nextSlug: "waverley-cutting-tools",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}