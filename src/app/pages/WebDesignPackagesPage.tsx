import { DepartmentPackagePage } from "../components/DepartmentPackagePage";

export function WebDesignPackagesPage() {
  return (
    <DepartmentPackagePage
      deptKey="web-design"
      seo={{
        title: "Web Design Packages & Pricing — Web Balance",
        description:
          "Transparent web design packages for businesses of every size — from starter brochure sites to bespoke enterprise builds. No hidden fees.",
        path: "/web-design/packages",
        keywords:
          "web design pricing, website packages, web design cost UK, affordable web design",
      }}
      startPath="/web-design/start"
      startLabel="Start Your Project"
    />
  );
}

export default WebDesignPackagesPage;
