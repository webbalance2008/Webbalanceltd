-- ─── Analytics Events ─────────────────────────────────────────────────────────
-- Public INSERT (anyone can log events), authenticated SELECT only.

create table if not exists analytics_events (
  id          uuid        primary key default gen_random_uuid(),
  event_type  text        not null,
  page_url    text,
  session_id  text,
  referrer    text,
  metadata    jsonb,
  created_at  timestamptz default now()
);

alter table analytics_events enable row level security;

create policy "Public insert analytics events"
  on analytics_events for insert
  with check (true);

create policy "Authenticated read analytics events"
  on analytics_events for select
  using (auth.role() = 'authenticated');

-- ─── SEO Settings ─────────────────────────────────────────────────────────────
-- Per-page SEO overrides editable from the admin dashboard.

create table if not exists seo_settings (
  id          uuid        primary key default gen_random_uuid(),
  page_path   text        unique not null,
  title       text,
  description text,
  keywords    text,
  og_image    text,
  no_index    boolean     default false,
  updated_at  timestamptz default now()
);

alter table seo_settings enable row level security;

create policy "Authenticated manage seo settings"
  on seo_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─── Pricing Packages ─────────────────────────────────────────────────────────
-- Tier-level packages (MVP / Professional / Enterprise) per department.

create table if not exists pricing_packages (
  id            uuid        primary key default gen_random_uuid(),
  department    text        not null,
  tier_key      text        not null,
  name          text        not null,
  price         numeric     not null,
  price_type    text        not null,
  features      jsonb       not null,
  highlight     boolean     default false,
  display_order int         default 0,
  updated_at    timestamptz default now(),
  unique(department, tier_key)
);

alter table pricing_packages enable row level security;

create policy "Public read pricing packages"
  on pricing_packages for select
  using (true);

create policy "Authenticated manage pricing packages"
  on pricing_packages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
