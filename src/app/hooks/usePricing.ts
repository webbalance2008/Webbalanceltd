import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { departmentPackages, type DepartmentPackages } from "../data/packages";

interface DbPricingRow {
  id: string;
  department: string;
  tier_key: string;
  name: string;
  price: number;
  price_type: "one-time" | "monthly";
  features: string[];
  highlight: boolean;
  display_order: number;
}

/** Merges live DB pricing over the static packages.ts defaults */
function mergeWithDefaults(dbRows: DbPricingRow[]): DepartmentPackages[] {
  return departmentPackages.map(dept => ({
    ...dept,
    tiers: dept.tiers.map(tier => {
      const dbRow = dbRows.find(r => r.department === dept.key && r.tier_key === tier.id);
      if (!dbRow) return tier;
      return {
        ...tier,
        name:        dbRow.name,
        price:       dbRow.price,
        priceLabel:  dbRow.price_type === "monthly"
          ? `£${dbRow.price.toLocaleString("en-GB")} /mo`
          : `£${dbRow.price.toLocaleString("en-GB")}`,
        pricingType: dbRow.price_type,
        features:    Array.isArray(dbRow.features) ? dbRow.features : JSON.parse(dbRow.features as unknown as string),
        highlight:   dbRow.highlight,
      };
    }),
  }));
}

/**
 * Returns live pricing merged from Supabase, falling back to packages.ts
 * if the fetch fails or while loading.
 */
export function usePricing(deptKeyFilter?: string) {
  const [packages, setPackages] = useState<DepartmentPackages[]>(departmentPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from("pricing_packages").select("*");
    if (deptKeyFilter) {
      query = query.eq("department", deptKeyFilter);
    }

    query.order("display_order").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setPackages(mergeWithDefaults(data));
      }
      setLoading(false);
    });
  }, [deptKeyFilter]);

  const dept = deptKeyFilter ? packages.find(d => d.key === deptKeyFilter) : undefined;

  return { packages, dept, loading };
}
