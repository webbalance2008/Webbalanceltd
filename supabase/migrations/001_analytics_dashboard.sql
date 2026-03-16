-- ═══════════════════════════════════════════════════════════════════
--  Web Balance – Analytics Dashboard Migration
--  Run this in the Supabase SQL Editor at:
--  https://supabase.com/dashboard/project/tgkosrlmrtoofykkuhgo/sql
-- ═══════════════════════════════════════════════════════════════════

-- 1. Analytics events ─────────────────────────────────────────────
create table if not exists analytics_events (
  id          uuid primary key default gen_random_uuid(),
  event_type  text not null,
  page_url    text,
  session_id  text,
  referrer    text,
  metadata    jsonb,
  created_at  timestamptz default now()
);

-- Public can INSERT (tracking), only authenticated can SELECT
alter table analytics_events enable row level security;

create policy "anon_insert_events" on analytics_events
  for insert to anon with check (true);

create policy "auth_select_events" on analytics_events
  for select to authenticated using (true);

-- Index for dashboard queries
create index if not exists idx_events_type       on analytics_events (event_type);
create index if not exists idx_events_created_at on analytics_events (created_at);
create index if not exists idx_events_page_url   on analytics_events (page_url);
create index if not exists idx_events_session    on analytics_events (session_id);


-- 2. SEO settings ─────────────────────────────────────────────────
create table if not exists seo_settings (
  id          uuid primary key default gen_random_uuid(),
  page_path   text unique not null,
  title       text,
  description text,
  keywords    text,
  og_image    text,
  no_index    boolean default false,
  updated_at  timestamptz default now()
);

alter table seo_settings enable row level security;

create policy "auth_all_seo" on seo_settings
  for all to authenticated using (true) with check (true);

-- Public can read SEO settings (needed for live overrides on page render)
create policy "anon_select_seo" on seo_settings
  for select to anon using (true);


-- 3. Pricing packages ─────────────────────────────────────────────
create table if not exists pricing_packages (
  id            uuid primary key default gen_random_uuid(),
  department    text not null,
  tier_key      text not null,
  name          text not null,
  price         numeric not null,
  price_type    text not null check (price_type in ('one-time', 'monthly')),
  features      jsonb not null default '[]',
  highlight     boolean default false,
  display_order int default 0,
  updated_at    timestamptz default now(),
  unique (department, tier_key)
);

alter table pricing_packages enable row level security;

-- Public can SELECT (needed for live pricing on site)
create policy "anon_select_pricing" on pricing_packages
  for select to anon using (true);

create policy "auth_all_pricing" on pricing_packages
  for all to authenticated using (true) with check (true);


-- 4. Seed pricing from current packages.ts data ───────────────────
insert into pricing_packages (department, tier_key, name, price, price_type, features, highlight, display_order) values
  -- Web Apps
  ('web-apps', 'wa-mvp',          'MVP',          5000,  'one-time', '["Core feature set (up to 3 modules)","User authentication & roles","1 third-party integration","Responsive dashboard UI","Basic analytics","Deployment & hosting setup","30 days bug-fix support"]',   false, 1),
  ('web-apps', 'wa-professional', 'Professional', 12000, 'one-time', '["Full feature set (up to 8 modules)","Admin dashboard & user management","Up to 3 API integrations","Automated testing suite","Email notification system","Performance optimisation","90 days post-launch support"]', true,  2),
  ('web-apps', 'wa-enterprise',   'Enterprise',   25000, 'one-time', '["Unlimited modules & features","Multi-tenant architecture","CI/CD pipeline setup","Advanced security & compliance","Custom reporting engine","Dedicated technical lead","12 months priority support & SLA"]',false, 3),

  -- Web Design
  ('web-design', 'wd-essentials', 'Essentials', 2500,  'one-time', '["Up to 5 custom pages","Mobile-first responsive design","Contact form integration","Basic on-page SEO","Google Analytics setup","2 rounds of revisions","30 days post-launch support"]',        false, 1),
  ('web-design', 'wd-growth',     'Growth',     5500,  'one-time', '["Up to 15 custom pages","CMS integration (Sanity / WordPress)","Blog or news section","Advanced SEO setup & sitemap","Speed optimisation & Core Web Vitals","Social media integration","3 rounds of revisions","60 days post-launch support"]', true,  2),
  ('web-design', 'wd-premium',    'Premium',    12000, 'one-time', '["Unlimited pages","Full brand strategy included","Custom animations & micro-interactions","E-commerce or booking integration","Multi-language support","Performance & A/B testing","Dedicated project manager","Unlimited revisions","12 months priority support"]', false, 3),

  -- SEO
  ('seo', 'seo-foundation',  'Foundation',  500,  'monthly', '["Keyword research & strategy","On-page audit & optimisation","Google Business Profile setup","Local SEO targeting","Monthly performance report","Dedicated account manager"]',                                        false, 1),
  ('seo', 'seo-growth',      'Growth',      1200, 'monthly', '["Everything in Foundation","Content strategy & calendar","Monthly blog content (2 articles)","Link building campaign","Competitor analysis","Bi-weekly performance reporting","Technical SEO audits"]',            true,  2),
  ('seo', 'seo-domination',  'Domination',  2500, 'monthly', '["Everything in Growth","Weekly content creation (4+ articles)","Advanced link acquisition","Conversion rate optimisation","Schema markup & rich snippets","Weekly reporting & strategy calls","Priority support"]', false, 3),

  -- Hosting
  ('hosting', 'host-starter',   'Starter',    30,  'monthly', '["Managed cloud hosting","Free SSL certificate","Daily automated backups","99.9% uptime guarantee","Email support (next business day)","Monthly security patches"]',                                               false, 1),
  ('hosting', 'host-business',  'Business',   75,  'monthly', '["Everything in Starter","Dedicated resources","CDN & edge caching","Staging environment","Priority support (4-hour response)","Weekly backups & restore","Uptime monitoring & alerts"]',                          true,  2),
  ('hosting', 'host-enterprise','Enterprise', 150, 'monthly', '["Everything in Business","Auto-scaling infrastructure","Load balancing","24/7 monitoring & incident response","Custom SLA agreement","Dedicated server environment","Quarterly performance reviews"]',            false, 3),

  -- Branding
  ('branding', 'br-identity', 'Identity', 1500, 'one-time', '["Logo design (3 concepts)","Colour palette & typography","Brand guidelines PDF","Social media avatar set","2 rounds of revisions","Source files delivered"]',                                                     false, 1),
  ('branding', 'br-complete', 'Complete', 4000, 'one-time', '["Everything in Identity","Stationery suite (cards, letterhead)","Social media template kit","Brand photography direction","Comprehensive brand book","3 rounds of revisions"]',                                   true,  2),
  ('branding', 'br-premium',  'Premium',  8000, 'one-time', '["Everything in Complete","Brand strategy workshop","Messaging framework & tone of voice","Competitor positioning analysis","Launch campaign assets","Unlimited revisions","Brand guardian support (6 months)"]',  false, 3)

on conflict (department, tier_key) do nothing;
