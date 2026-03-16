import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "../utils/supabaseClient";

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

interface SeoOverride {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  og_image?: string | null;
  no_index?: boolean | null;
}

const cache: Record<string, SeoOverride> = {};

export function SEOHead({
  title: propTitle,
  description: propDescription,
  path = "/",
  ogImage: propOgImage = DEFAULT_IMAGE,
  type = "website",
  keywords: propKeywords,
  noIndex: propNoIndex = false,
}: SEOHeadProps) {
  const location = useLocation();
  const [override, setOverride] = useState<SeoOverride | null>(cache[path] ?? null);

  useEffect(() => {
    if (cache[path] !== undefined) {
      setOverride(cache[path]);
      return;
    }
    supabase
      .from("seo_settings")
      .select("title,description,keywords,og_image,no_index")
      .eq("page_path", path)
      .maybeSingle()
      .then(({ data }) => {
        const result = data ?? {};
        cache[path] = result;
        setOverride(result);
      })
      .catch(() => {
        cache[path] = {};
        setOverride({});
      });
  }, [path, location.pathname]);

  // DB values take precedence over hardcoded props
  const title       = override?.title       || propTitle;
  const description = override?.description || propDescription;
  const keywords    = override?.keywords    || propKeywords;
  const ogImage     = override?.og_image    || propOgImage;
  const noIndex     = override?.no_index    ?? propNoIndex;

  const canonical  = `${BASE_URL}${path}`;
  const fullTitle  = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

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
