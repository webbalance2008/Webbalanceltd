-- ─── Pricing Rates ────────────────────────────────────────────────────────────
-- Flat key/value store for all configurable rates used in the quote builders.
-- category.key -> value (numeric, e.g. 75 for hourly rate)

create table if not exists pricing_rates (
  id          uuid primary key default gen_random_uuid(),
  category    text not null,
  key         text not null,
  label       text not null,
  value       numeric not null,
  unit        text not null default '',
  updated_at  timestamptz default now(),
  unique(category, key)
);

alter table pricing_rates enable row level security;

create policy "Public read pricing rates"
  on pricing_rates for select using (true);

create policy "Authenticated manage pricing rates"
  on pricing_rates for all using (auth.role() = 'authenticated');

-- ─── Seed ─────────────────────────────────────────────────────────────────────
insert into pricing_rates (category, key, label, value, unit) values

  -- Global
  ('global', 'hourly_rate',          'Hourly Rate',                75,   '/hr'),
  ('global', 'vat_rate',             'VAT Rate',                   20,   '%'),
  ('global', 'domain_registration',  'Domain Registration',        50,   'one-off'),

  -- Web Apps — base prices by app type
  ('web-apps', 'base_booking',    'Booking System (base)',       2500, 'one-off'),
  ('web-apps', 'base_portal',     'Customer Portal (base)',      3000, 'one-off'),
  ('web-apps', 'base_saas',       'SaaS Platform (base)',        5000, 'one-off'),
  ('web-apps', 'base_ecommerce',  'E-Commerce Store (base)',     3500, 'one-off'),
  ('web-apps', 'base_membership', 'Membership Platform (base)',  3500, 'one-off'),
  ('web-apps', 'base_internal',   'Internal Tool (base)',        2000, 'one-off'),
  ('web-apps', 'base_other',      'Other/Custom (base)',         3000, 'one-off'),

  -- Web Apps — core feature add-ons
  ('web-apps', 'feat_auth',       'User Accounts & Auth',        500,  'one-off'),
  ('web-apps', 'feat_admin',      'Admin Dashboard',             600,  'one-off'),
  ('web-apps', 'feat_payments',   'Payments (Stripe)',           750,  'one-off'),
  ('web-apps', 'feat_notify',     'Email/SMS Notifications',     350,  'one-off'),
  ('web-apps', 'feat_uploads',    'File Uploads & Storage',      400,  'one-off'),
  ('web-apps', 'feat_analytics',  'Reporting & Analytics',       600,  'one-off'),
  ('web-apps', 'feat_api',        'Third-party Integrations',    500,  'one-off'),
  ('web-apps', 'feat_pwa',        'Mobile-responsive (PWA)',     300,  'one-off'),
  ('web-apps', 'feat_native',     'Native Mobile App',           2500, 'one-off'),
  ('web-apps', 'feat_ai_feature', 'AI / Automation Features',    600,  'one-off'),
  ('web-apps', 'feat_i18n',       'Multi-language',              450,  'one-off'),

  -- Web Apps — AI feature add-ons
  ('web-apps', 'ai_content',   'AI Content Generation',          600,  'one-off'),
  ('web-apps', 'ai_search',    'Smart Search / Recommendations', 800,  'one-off'),
  ('web-apps', 'ai_docs',      'Document Processing',            1000, 'one-off'),
  ('web-apps', 'ai_chatbot',   'Chatbot / AI Assistant',         1200, 'one-off'),
  ('web-apps', 'ai_workflow',  'Workflow Automation',            900,  'one-off'),
  ('web-apps', 'ai_insights',  'Predictive Insights',            800,  'one-off'),

  -- Web Apps — hosting setup (one-off)
  ('web-apps', 'hosting_managed',    'Managed Cloud Hosting Setup',    350, 'one-off'),
  ('web-apps', 'hosting_cloudflare', 'Cloudflare + Edge Setup',        250, 'one-off'),
  ('web-apps', 'hosting_vps',        'VPS / Dedicated Server Setup',   450, 'one-off'),

  -- Web Design — per-page / per-unit add-ons
  ('web-design', 'image_unit',           'Per Image (flat rate)',         35,  'per image'),
  ('web-design', 'video_unit',           'Per Video (flat rate)',         65,  'per video'),
  ('web-design', 'animation_page',       'Animation (per page)',          95,  'per page'),

  -- Web Design — hosting setup (one-off)
  ('web-design', 'hosting_managed',    'Managed Hosting Setup',          250, 'one-off'),
  ('web-design', 'hosting_wordpress',  'WordPress Hosting Setup',        250, 'one-off'),
  ('web-design', 'hosting_cloudflare', 'Cloudflare Setup',               150, 'one-off'),
  ('web-design', 'hosting_vps',        'VPS Setup',                      350, 'one-off'),

  -- SEO — retainer prices
  ('seo', 'essentials_monthly',   'Essentials Plan (monthly)',    399,  '/mo'),
  ('seo', 'essentials_setup',     'Essentials Plan (setup)',      299,  'one-off'),
  ('seo', 'growth_monthly',       'Growth Plan (monthly)',        699,  '/mo'),
  ('seo', 'growth_setup',         'Growth Plan (setup)',          499,  'one-off'),
  ('seo', 'accelerator_monthly',  'Accelerator Plan (monthly)',   1299, '/mo'),
  ('seo', 'accelerator_setup',    'Accelerator Plan (setup)',     799,  'one-off'),

  -- SEO — add-ons
  ('seo', 'addon_google_ads',    'Google Ads Management',         199,  '/mo'),
  ('seo', 'addon_content',       'Extra Content Writing',         149,  '/mo'),
  ('seo', 'addon_links',         'Link-building Campaign',        199,  '/mo'),
  ('seo', 'addon_audit',         'Technical SEO Audit (one-off)', 499,  'one-off'),
  ('seo', 'addon_reporting',     'Enhanced Monthly Reporting',    99,   '/mo'),

  -- Hosting — plan prices
  ('hosting', 'starter_monthly',       'Starter Plan (monthly)',        25,  '/mo'),
  ('hosting', 'starter_setup',         'Starter Plan (setup)',          150, 'one-off'),
  ('hosting', 'professional_monthly',  'Professional Plan (monthly)',   65,  '/mo'),
  ('hosting', 'professional_setup',    'Professional Plan (setup)',     250, 'one-off'),

  -- Branding — base service prices
  ('branding', 'base_full_brand',   'Full Brand Identity (base)',       3500, 'one-off'),
  ('branding', 'base_logo',         'Logo Design (base)',               800,  'one-off'),
  ('branding', 'base_refresh',      'Brand Refresh (base)',             1800, 'one-off'),
  ('branding', 'base_social',       'Social Media Brand Pack (base)',   600,  'one-off'),
  ('branding', 'base_print',        'Print & Collateral (base)',        500,  'one-off'),
  ('branding', 'base_marketing',    'Digital Marketing Campaign (base)',900,  'one-off'),
  ('branding', 'base_guidelines',   'Brand Guidelines Document (base)', 700,  'one-off'),
  ('branding', 'base_bundle',       'Brand + Marketing Bundle (base)',  5000, 'one-off'),

  -- Branding — deliverable add-ons
  ('branding', 'del_strategy',        'Brand Strategy Document',             900, 'one-off'),
  ('branding', 'del_logo_suite',      'Logo Suite',                          600, 'one-off'),
  ('branding', 'del_colour',          'Colour Palette System',               250, 'one-off'),
  ('branding', 'del_typography',      'Typography System',                   200, 'one-off'),
  ('branding', 'del_guidelines',      'Brand Guidelines PDF',                550, 'one-off'),
  ('branding', 'del_iconography',     'Custom Icon Set',                     400, 'one-off'),
  ('branding', 'del_social_pack',     'Social Media Template Pack',          450, 'one-off'),
  ('branding', 'del_social_profiles', 'Profile & Cover Images',              200, 'one-off'),
  ('branding', 'del_biz_card',        'Business Card Design',                200, 'one-off'),
  ('branding', 'del_letterhead',      'Letterhead & Email Signature',        150, 'one-off'),
  ('branding', 'del_brochure',        'Brochure / Capability Document',      600, 'one-off'),
  ('branding', 'del_packaging',       'Packaging & Label Design',            750, 'one-off'),
  ('branding', 'del_signage',         'Signage & Display Graphics',          500, 'one-off'),
  ('branding', 'del_social_ads',      'Social Media Ad Creative',            300, 'one-off'),
  ('branding', 'del_google_ads',      'Google Ads Creative',                 350, 'one-off'),
  ('branding', 'del_email_campaign',  'Email Campaign Design',               300, 'one-off'),
  ('branding', 'del_photo_art',       'Photography Art Direction Brief',     250, 'one-off')

on conflict (category, key) do nothing;
