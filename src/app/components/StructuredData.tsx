import { Helmet } from "react-helmet-async";

const BASE_URL = "https://web-balance.co.uk";

/* ═══════════════════════════════════════════════════════════════════════════
   Reusable JSON-LD injector
   ═══════════════════════════════════════════════════════════════════════════ */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. Organization — appears on every page via Root
   ═══════════════════════════════════════════════════════════════════════════ */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Web Balance",
    legalName: "Web Balance Ltd",
    url: BASE_URL,
    logo: `${BASE_URL}/og-default.svg`,
    description:
      "Aberdeen-based web design, web application development, SEO, hosting, branding, and digital support agency serving businesses across Scotland and the UK.",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Neospace, Riverside Drive",
      addressLocality: "Aberdeen",
      addressRegion: "Aberdeenshire",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "Scotland" },
    ],
    sameAs: [
      "https://twitter.com/webbalanceltd",
      // Add LinkedIn, Facebook, Instagram URLs when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${BASE_URL}/contact`,
      availableLanguage: "English",
    },
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. LocalBusiness — for the homepage / about
   ═══════════════════════════════════════════════════════════════════════════ */
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Web Balance",
    url: BASE_URL,
    image: `${BASE_URL}/og-default.svg`,
    description:
      "Professional web design, web apps, SEO, hosting, branding, and digital support for businesses in Aberdeen and across Scotland.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Neospace, Riverside Drive",
      addressLocality: "Aberdeen",
      addressRegion: "Aberdeenshire",
      postalCode: "AB11 7LH",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 57.1437,
      longitude: -2.0985,
    },
    areaServed: "Scotland",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. WebSite + SearchAction — sitelinks searchbox eligibility
   ═══════════════════════════════════════════════════════════════════════════ */
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Web Balance",
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-GB",
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. BreadcrumbList — pass an array of { name, path } items
   ═══════════════════════════════════════════════════════════════════════════ */
interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. FAQPage — pass an array of { q, a }
   ═══════════════════════════════════════════════════════════════════════════ */
interface FAQItem {
  q: string;
  a: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs.length) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. Article — for insight/blog pages
   ═══════════════════════════════════════════════════════════════════════════ */
interface ArticleSchemaProps {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  authorName: string;
}

export function ArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  authorName,
}: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${path}`,
    image,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Web Balance",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-default.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${path}`,
    },
  };

  return <JsonLd data={data} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. Service — for service landing pages
   ═══════════════════════════════════════════════════════════════════════════ */
interface ServiceSchemaProps {
  name: string;
  description: string;
  path: string;
}

export function ServiceSchema({ name, description, path }: ServiceSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${path}`,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

  return <JsonLd data={data} />;
}