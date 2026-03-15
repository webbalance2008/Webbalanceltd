import { Helmet } from "react-helmet-async";

const BASE_URL = "https://web-balance.co.uk";
const DEFAULT_IMAGE = `${BASE_URL}/og-default.svg`;
const SITE_NAME = "Web Balance";

interface SEOHeadProps {
  title: string;
  description: string;
  /** canonical path, e.g. "/web-design" — base URL is prepended automatically */
  path?: string;
  /** absolute URL to override the default OG image */
  ogImage?: string;
  /** "website" | "article" — defaults to "website" */
  type?: string;
  /** Additional keywords */
  keywords?: string;
  /** Set to true for thank-you / form confirmation pages that shouldn't rank */
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_IMAGE,
  type = "website",
  keywords,
  noIndex = false,
}: SEOHeadProps) {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* ── Primary ────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* ── Open Graph ─────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />

      {/* ── Twitter Card ───────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@webbalanceltd" />
    </Helmet>
  );
}