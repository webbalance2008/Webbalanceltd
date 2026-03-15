import { DepartmentPackagePage } from "../components/DepartmentPackagePage";

export function SeoPackagesPage() {
  return (
    <DepartmentPackagePage
      deptKey="seo"
      seo={{
        title: "SEO Packages & Pricing — Web Balance",
        description:
          "Results-driven SEO packages from Foundation to Domination. Monthly plans with keyword research, content strategy, link building, and transparent reporting.",
        path: "/seo/packages",
        keywords:
          "SEO packages UK, SEO pricing, monthly SEO plans, search engine optimisation cost",
      }}
      startPath="/seo/start"
      startLabel="Start Your Campaign"
    />
  );
}

export default SeoPackagesPage;
