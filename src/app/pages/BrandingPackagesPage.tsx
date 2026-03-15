import { DepartmentPackagePage } from "../components/DepartmentPackagePage";

export function BrandingPackagesPage() {
  return (
    <DepartmentPackagePage
      deptKey="branding"
      seo={{
        title: "Branding Packages & Pricing — Web Balance",
        description:
          "Professional branding packages from Identity to Premium. Logo design, brand strategy, visual identity systems, and launch campaign assets.",
        path: "/branding/packages",
        keywords:
          "branding packages UK, brand identity pricing, logo design cost, branding agency pricing",
      }}
      startPath="/branding/start"
      startLabel="Start Your Brand Project"
    />
  );
}

export default BrandingPackagesPage;
