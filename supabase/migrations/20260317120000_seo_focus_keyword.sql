-- Add focus_keyword column to seo_settings
-- Separate from meta keywords — used by the SEO scoring engine only.

alter table seo_settings
  add column if not exists focus_keyword text default '';
