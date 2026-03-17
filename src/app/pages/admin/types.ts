// ─── Admin platform types ────────────────────────────────────────────────────

/** Row from seo_settings table (already exists) */
export interface SeoRow {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  focus_keyword?: string;
  keywords: string;
  og_image: string;
  no_index: boolean;
  isNew?: boolean;
  isDirty?: boolean;
}

/** Row from pages table — stores actual page content */
export interface PageRow {
  id?: string;
  page_path: string;
  page_title?: string;       // display H1 title
  meta_title?: string;       // same as seo_settings.title (kept in sync on save)
  meta_description?: string; // same as seo_settings.description
  body_content?: string;     // plain text or HTML
  updated_at?: string;
  created_at?: string;
}

/** Row from page_metrics_daily table */
export interface PageMetricDaily {
  id?: string;
  page_id: string;   // page_path used as ID
  date: string;      // ISO date string YYYY-MM-DD
  views: number;
  unique_visitors: number;
  conversions: number;
  engagement_score: number;
}

/** Row from seo_audits table */
export interface SeoAudit {
  id?: string;
  page_path: string;
  score: number;
  basics_score: number;
  content_score: number;
  readability_score: number;
  basics_possible: number;
  content_possible: number;
  readability_possible: number;
  label: string;
  audited_at?: string;
}

/** Row from seo_audit_checks table */
export interface SeoAuditCheck {
  id?: string;
  audit_id: string;
  category: 'basics' | 'content' | 'readability';
  check_key: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  points_earned: number;
  points_possible: number;
}

/** Raw analytics event (existing analytics_events table) */
export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_url: string;
  session_id: string;
  referrer: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/** Input to the SEO scoring engine */
export interface SeoInput {
  page_path: string;
  title: string;
  description: string;
  focus_keyword: string;
  keywords: string;
  og_image: string;
  no_index: boolean;
  body_content?: string;
}

/** Single check result from the scoring engine */
export interface SeoCheckResult {
  key: string;
  category: 'basics' | 'content' | 'readability';
  label: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  points_earned: number;
  points_possible: number;
}

/** Full output of the scoring engine */
export interface SeoScoreResult {
  total_score: number;
  basics_score: number;
  content_score: number;
  readability_score: number;
  basics_possible: number;
  content_possible: number;
  readability_possible: number;
  total_possible: number;
  label: 'Good' | 'Needs Improvement' | 'Poor' | 'Incomplete';
  color: string;
  checks: SeoCheckResult[];
  priority_fixes: SeoCheckResult[];
  improvements: SeoCheckResult[];
  good_signals: SeoCheckResult[];
}

/** Page classification for performance tab */
export type PageClass = 'star' | 'opportunity' | 'hidden-gem' | 'needs-work';

export interface PagePerformanceRow {
  page_path: string;
  seo_score: number;
  seo_label: string;
  views_30d: number;
  unique_visitors_30d: number;
  conversions_30d: number;
  classification: PageClass;
}
