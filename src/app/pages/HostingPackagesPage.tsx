import { DepartmentPackagePage } from "../components/DepartmentPackagePage";

export function HostingPackagesPage() {
  return (
    <DepartmentPackagePage
      deptKey="hosting"
      seo={{
        title: "Hosting & Support Packages — Web Balance",
        description:
          "Managed cloud hosting plans from Starter to Enterprise. SSL, daily backups, CDN, staging environments, and dedicated UK support included.",
        path: "/hosting/packages",
        keywords:
          "managed hosting UK, website hosting plans, cloud hosting pricing, web hosting packages",
      }}
      startPath="/hosting/start"
      startLabel="Get a Hosting Quote"
    />
  );
}

export default HostingPackagesPage;
