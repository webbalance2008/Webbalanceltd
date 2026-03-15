import { DepartmentPackagePage } from "../components/DepartmentPackagePage";

export function WebAppsPackagesPage() {
  return (
    <DepartmentPackagePage
      deptKey="web-apps"
      seo={{
        title: "Web App Packages & Pricing — Web Balance",
        description:
          "Custom web application packages from MVP to Enterprise. Booking systems, portals, SaaS platforms, and more — transparent pricing with no hidden fees.",
        path: "/web-apps/packages",
        keywords:
          "web app pricing, custom software packages, web application cost UK, SaaS development pricing",
      }}
      startPath="/web-apps/start"
      startLabel="Start Your Project"
    />
  );
}

export default WebAppsPackagesPage;
