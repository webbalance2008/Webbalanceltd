import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export type RatesMap = Record<string, number>;

/** Static fallback defaults — mirrors 002_pricing_rates.sql seed data */
export const RATE_DEFAULTS: RatesMap = {
  // Global
  "global.hourly_rate":         75,
  "global.vat_rate":            20,
  "global.domain_registration": 50,

  // Web Apps — base prices
  "web-apps.base_booking":    2500,
  "web-apps.base_portal":     3000,
  "web-apps.base_saas":       5000,
  "web-apps.base_ecommerce":  3500,
  "web-apps.base_membership": 3500,
  "web-apps.base_internal":   2000,
  "web-apps.base_other":      3000,

  // Web Apps — core features
  "web-apps.feat_auth":       500,
  "web-apps.feat_admin":      600,
  "web-apps.feat_payments":   750,
  "web-apps.feat_notify":     350,
  "web-apps.feat_uploads":    400,
  "web-apps.feat_analytics":  600,
  "web-apps.feat_api":        500,
  "web-apps.feat_pwa":        300,
  "web-apps.feat_native":     2500,
  "web-apps.feat_ai_feature": 600,
  "web-apps.feat_i18n":       450,

  // Web Apps — AI features
  "web-apps.ai_content":   600,
  "web-apps.ai_search":    800,
  "web-apps.ai_docs":      1000,
  "web-apps.ai_chatbot":   1200,
  "web-apps.ai_workflow":  900,
  "web-apps.ai_insights":  800,

  // Web Apps — hosting setup
  "web-apps.hosting_managed":    350,
  "web-apps.hosting_cloudflare": 250,
  "web-apps.hosting_vps":        450,

  // Web Design — per-unit
  "web-design.image_unit":       35,
  "web-design.video_unit":       65,
  "web-design.animation_page":   95,

  // Web Design — hosting setup
  "web-design.hosting_managed":    250,
  "web-design.hosting_wordpress":  250,
  "web-design.hosting_cloudflare": 150,
  "web-design.hosting_vps":        350,

  // SEO — retainers
  "seo.essentials_monthly":   399,
  "seo.essentials_setup":     299,
  "seo.growth_monthly":       699,
  "seo.growth_setup":         499,
  "seo.accelerator_monthly":  1299,
  "seo.accelerator_setup":    799,

  // SEO — add-ons
  "seo.addon_google_ads": 199,
  "seo.addon_content":    149,
  "seo.addon_links":      199,
  "seo.addon_audit":      499,
  "seo.addon_reporting":  99,

  // Hosting — plans
  "hosting.starter_monthly":      25,
  "hosting.starter_setup":        150,
  "hosting.professional_monthly": 65,
  "hosting.professional_setup":   250,

  // Branding — base service prices
  "branding.base_full_brand":  3500,
  "branding.base_logo":        800,
  "branding.base_refresh":     1800,
  "branding.base_social":      600,
  "branding.base_print":       500,
  "branding.base_marketing":   900,
  "branding.base_guidelines":  700,
  "branding.base_bundle":      5000,

  // Branding — deliverables
  "branding.del_strategy":        900,
  "branding.del_logo_suite":      600,
  "branding.del_colour":          250,
  "branding.del_typography":      200,
  "branding.del_guidelines":      550,
  "branding.del_iconography":     400,
  "branding.del_social_pack":     450,
  "branding.del_social_profiles": 200,
  "branding.del_biz_card":        200,
  "branding.del_letterhead":      150,
  "branding.del_brochure":        600,
  "branding.del_packaging":       750,
  "branding.del_signage":         500,
  "branding.del_social_ads":      300,
  "branding.del_google_ads":      350,
  "branding.del_email_campaign":  300,
  "branding.del_photo_art":       250,
};

/**
 * Fetches live rates from Supabase, falling back to RATE_DEFAULTS.
 * Returns a flat map keyed by "category.key".
 */
export function usePricingRates(): RatesMap {
  const [rates, setRates] = useState<RatesMap>(RATE_DEFAULTS);

  useEffect(() => {
    supabase
      .from("pricing_rates")
      .select("category, key, value")
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const merged = { ...RATE_DEFAULTS };
        for (const row of data) {
          merged[`${row.category}.${row.key}`] = Number(row.value);
        }
        setRates(merged);
      });
  }, []);

  return rates;
}
