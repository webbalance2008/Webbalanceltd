-- ============================================================
-- Web Balance Admin Platform — Supabase Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- ─── pages ─────────────────────────────────────────────────
-- Stores actual page content (editable from admin)
CREATE TABLE IF NOT EXISTS pages (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path        text UNIQUE NOT NULL,
  page_title       text,          -- H1 display title
  meta_title       text,          -- kept in sync with seo_settings.title
  meta_description text,          -- kept in sync with seo_settings.description
  body_content     text,          -- plain text or HTML
  updated_at       timestamptz DEFAULT now(),
  created_at       timestamptz DEFAULT now()
);

-- Index for fast path lookups
CREATE INDEX IF NOT EXISTS pages_page_path_idx ON pages(page_path);

-- ─── seo_audits ────────────────────────────────────────────
-- Snapshot of each SEO scoring run (stored for history)
CREATE TABLE IF NOT EXISTS seo_audits (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path            text NOT NULL,
  score                integer NOT NULL,
  basics_score         integer NOT NULL DEFAULT 0,
  content_score        integer NOT NULL DEFAULT 0,
  readability_score    integer NOT NULL DEFAULT 0,
  basics_possible      integer NOT NULL DEFAULT 0,
  content_possible     integer NOT NULL DEFAULT 0,
  readability_possible integer NOT NULL DEFAULT 0,
  label                text NOT NULL,   -- 'Good' | 'Needs Improvement' | 'Poor' | 'Incomplete'
  audited_at           timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS seo_audits_page_path_idx ON seo_audits(page_path);
CREATE INDEX IF NOT EXISTS seo_audits_audited_at_idx ON seo_audits(audited_at DESC);

-- ─── seo_audit_checks ──────────────────────────────────────
-- Individual check results per audit run
CREATE TABLE IF NOT EXISTS seo_audit_checks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id        uuid NOT NULL REFERENCES seo_audits(id) ON DELETE CASCADE,
  category        text NOT NULL CHECK (category IN ('basics', 'content', 'readability')),
  check_key       text NOT NULL,
  label           text NOT NULL,
  status          text NOT NULL CHECK (status IN ('pass', 'warn', 'fail')),
  message         text,
  points_earned   integer NOT NULL DEFAULT 0,
  points_possible integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS seo_audit_checks_audit_id_idx ON seo_audit_checks(audit_id);

-- ─── page_metrics_daily ────────────────────────────────────
-- Aggregated daily metrics — dashboards MUST use this, not raw events
CREATE TABLE IF NOT EXISTS page_metrics_daily (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id          text NOT NULL,  -- page_path used as identifier
  date             date NOT NULL,
  views            integer NOT NULL DEFAULT 0,
  unique_visitors  integer NOT NULL DEFAULT 0,
  conversions      integer NOT NULL DEFAULT 0,
  engagement_score numeric(5,2)   NOT NULL DEFAULT 0,
  UNIQUE(page_id, date)
);

CREATE INDEX IF NOT EXISTS page_metrics_daily_page_id_idx ON page_metrics_daily(page_id);
CREATE INDEX IF NOT EXISTS page_metrics_daily_date_idx ON page_metrics_daily(date DESC);

-- ─── analytics_events ──────────────────────────────────────
-- Raw events table (may already exist — CREATE IF NOT EXISTS is safe)
CREATE TABLE IF NOT EXISTS analytics_events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  page_url   text,
  session_id text,
  referrer   text,
  metadata   jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add page_type column if it doesn't exist (safe migration)
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS page_type text;

-- Add structured content blocks to pages table
ALTER TABLE pages ADD COLUMN IF NOT EXISTS content_blocks jsonb;

CREATE INDEX IF NOT EXISTS analytics_events_event_type_idx ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS analytics_events_session_id_idx ON analytics_events(session_id);

-- ─── Row Level Security ─────────────────────────────────────
-- Enable RLS — all writes require anon key (your Supabase anon key is public-safe for inserts)
ALTER TABLE analytics_events     ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metrics_daily   ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages                ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audits           ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audit_checks     ENABLE ROW LEVEL SECURITY;

-- analytics_events: anyone can insert (event tracking), only authed can read
CREATE POLICY IF NOT EXISTS "anon_insert_events"
  ON analytics_events FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "authed_read_events"
  ON analytics_events FOR SELECT TO authenticated USING (true);

-- pages: only authenticated users can read/write
CREATE POLICY IF NOT EXISTS "authed_all_pages"
  ON pages FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "authed_all_seo_audits"
  ON seo_audits FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "authed_all_seo_audit_checks"
  ON seo_audit_checks FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "authed_all_page_metrics"
  ON page_metrics_daily FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─── Handy views ────────────────────────────────────────────

-- Latest SEO audit per page
CREATE OR REPLACE VIEW latest_seo_audits AS
SELECT DISTINCT ON (page_path)
  id, page_path, score, basics_score, content_score, readability_score,
  basics_possible, content_possible, readability_possible, label, audited_at
FROM seo_audits
ORDER BY page_path, audited_at DESC;

-- 30-day page performance summary
CREATE OR REPLACE VIEW page_performance_30d AS
SELECT
  page_id,
  SUM(views)           AS views_30d,
  SUM(unique_visitors) AS unique_visitors_30d,
  SUM(conversions)     AS conversions_30d,
  AVG(engagement_score)::numeric(5,2) AS avg_engagement
FROM page_metrics_daily
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY page_id;

-- ─── Example: daily aggregation query ──────────────────────
-- Run this from admin UI or scheduled via pg_cron / Edge Function
-- INSERT INTO page_metrics_daily (page_id, date, views, unique_visitors, conversions, engagement_score)
-- SELECT
--   page_url                                   AS page_id,
--   DATE(created_at)                           AS date,
--   COUNT(*) FILTER (WHERE event_type = 'page_view')   AS views,
--   COUNT(DISTINCT session_id)                 AS unique_visitors,
--   COUNT(*) FILTER (WHERE event_type IN ('form_submit','quote_submit')) AS conversions,
--   LEAST(100, ROUND((COUNT(*)::numeric / NULLIF(COUNT(DISTINCT session_id),0)) * 20, 2)) AS engagement_score
-- FROM analytics_events
-- WHERE DATE(created_at) = CURRENT_DATE - 1
-- GROUP BY page_url, DATE(created_at)
-- ON CONFLICT (page_id, date) DO UPDATE SET
--   views            = EXCLUDED.views,
--   unique_visitors  = EXCLUDED.unique_visitors,
--   conversions      = EXCLUDED.conversions,
--   engagement_score = EXCLUDED.engagement_score;
