import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { Root } from "./components/Root";

// ── Eagerly load the homepage (critical path) ──────────────────────────────
import { Home } from "./pages/Home";

// ── Lazy-load every other route (code-split per page) ─────────────────────
const ProjectPage         = lazy(() => import("./pages/ProjectPage").then(m => ({ default: m.ProjectPage })));

// Web Apps
const WebAppsPage         = lazy(() => import("./pages/WebAppsPage").then(m => ({ default: m.WebAppsPage })));
const WebAppStartPage     = lazy(() => import("./pages/WebAppStartPage").then(m => ({ default: m.WebAppStartPage })));
const WebAppsPackagesPage = lazy(() => import("./pages/WebAppsPackagesPage").then(m => ({ default: m.WebAppsPackagesPage })));
const BookingSystemsPage  = lazy(() => import("./pages/webapps/BookingSystemsPage").then(m => ({ default: m.BookingSystemsPage })));
const CustomerPortalsPage = lazy(() => import("./pages/webapps/CustomerPortalsPage").then(m => ({ default: m.CustomerPortalsPage })));
const SaaSPage            = lazy(() => import("./pages/webapps/SaaSPage").then(m => ({ default: m.SaaSPage })));
const EcommerceStorePage  = lazy(() => import("./pages/webapps/EcommerceStorePage").then(m => ({ default: m.EcommerceStorePage })));
const MembershipPage      = lazy(() => import("./pages/webapps/MembershipPage").then(m => ({ default: m.MembershipPage })));
const InternalToolsPage   = lazy(() => import("./pages/webapps/InternalToolsPage").then(m => ({ default: m.InternalToolsPage })));

// Web Design
const WebDesignPage         = lazy(() => import("./pages/WebDesignPage").then(m => ({ default: m.WebDesignPage })));
const WebDesignStartPage    = lazy(() => import("./pages/WebDesignStartPage").then(m => ({ default: m.WebDesignStartPage })));
const WebDesignPackagesPage = lazy(() => import("./pages/WebDesignPackagesPage").then(m => ({ default: m.WebDesignPackagesPage })));
const PortfolioPage         = lazy(() => import("./pages/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const StartProjectPage      = lazy(() => import("./pages/StartProjectPage").then(m => ({ default: m.StartProjectPage })));
const CorporateWebsitesPage = lazy(() => import("./pages/webdesign/CorporateWebsitesPage").then(m => ({ default: m.CorporateWebsitesPage })));
const EcommerceWebsitesPage = lazy(() => import("./pages/webdesign/EcommerceWebsitesPage").then(m => ({ default: m.EcommerceWebsitesPage })));
const PortfolioWebsitesPage = lazy(() => import("./pages/webdesign/PortfolioWebsitesPage").then(m => ({ default: m.PortfolioWebsitesPage })));
const LandingPagesPage      = lazy(() => import("./pages/webdesign/LandingPagesPage").then(m => ({ default: m.LandingPagesPage })));
const BlogWebsitesPage      = lazy(() => import("./pages/webdesign/BlogWebsitesPage").then(m => ({ default: m.BlogWebsitesPage })));
const RestaurantWebsitesPage = lazy(() => import("./pages/webdesign/RestaurantWebsitesPage").then(m => ({ default: m.RestaurantWebsitesPage })));

// SEO
const SeoPage      = lazy(() => import("./pages/SeoPage").then(m => ({ default: m.SeoPage })));
const SeoStartPage = lazy(() => import("./pages/SeoStartPage").then(m => ({ default: m.SeoStartPage })));
const SeoPackagesPage = lazy(() => import("./pages/SeoPackagesPage").then(m => ({ default: m.SeoPackagesPage })));

// Hosting
const HostingPage      = lazy(() => import("./pages/HostingPage").then(m => ({ default: m.HostingPage })));
const HostingStartPage = lazy(() => import("./pages/HostingStartPage").then(m => ({ default: m.HostingStartPage })));
const HostingPackagesPage = lazy(() => import("./pages/HostingPackagesPage").then(m => ({ default: m.HostingPackagesPage })));

// Branding
const BrandingPage      = lazy(() => import("./pages/BrandingPage").then(m => ({ default: m.BrandingPage })));
const BrandingStartPage = lazy(() => import("./pages/BrandingStartPage").then(m => ({ default: m.BrandingStartPage })));
const BrandingPackagesPage = lazy(() => import("./pages/BrandingPackagesPage").then(m => ({ default: m.BrandingPackagesPage })));

// Company
const InsightsPage       = lazy(() => import("./pages/InsightsPage").then(m => ({ default: m.InsightsPage })));
const InsightArticlePage = lazy(() => import("./pages/InsightArticlePage").then(m => ({ default: m.InsightArticlePage })));
const OurReachPage       = lazy(() => import("./pages/OurReachPage").then(m => ({ default: m.OurReachPage })));
const CityPage           = lazy(() => import("./pages/reach/CityPage").then(m => ({ default: m.CityPage })));
const CityServicePage    = lazy(() => import("./pages/reach/CityServicePage").then(m => ({ default: m.CityServicePage })));
const SupportPage        = lazy(() => import("./pages/SupportPage").then(m => ({ default: m.SupportPage })));
const ContactPage        = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const TestimonialsPage   = lazy(() => import("./pages/TestimonialsPage"));

const BuildYourQuotePage = lazy(() => import("./pages/BuildYourQuotePage").then(m => ({ default: m.BuildYourQuotePage })));

const PackagesPage = lazy(() => import("./pages/PackagesPage").then(m => ({ default: m.PackagesPage })));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work/:slug", Component: ProjectPage },

      // Web Apps
      { path: "web-apps",                         Component: WebAppsPage },
      { path: "web-apps/start",                   Component: WebAppStartPage },
      { path: "web-apps/packages",                Component: WebAppsPackagesPage },
      { path: "web-apps/booking-systems",         Component: BookingSystemsPage },
      { path: "web-apps/customer-portals",        Component: CustomerPortalsPage },
      { path: "web-apps/saas-platforms",          Component: SaaSPage },
      { path: "web-apps/ecommerce-stores",        Component: EcommerceStorePage },
      { path: "web-apps/membership-platforms",    Component: MembershipPage },
      { path: "web-apps/internal-tools",          Component: InternalToolsPage },

      // Web Design
      { path: "web-design",           Component: WebDesignPage },
      { path: "web-design/start",     Component: WebDesignStartPage },
      { path: "web-design/portfolio", Component: PortfolioPage },
      { path: "web-design/packages",  Component: WebDesignPackagesPage },
      { path: "web-design/corporate-websites",   Component: CorporateWebsitesPage },
      { path: "web-design/ecommerce-websites",    Component: EcommerceWebsitesPage },
      { path: "web-design/portfolio-websites",    Component: PortfolioWebsitesPage },
      { path: "web-design/landing-pages",         Component: LandingPagesPage },
      { path: "web-design/blog-websites",         Component: BlogWebsitesPage },
      { path: "web-design/restaurant-websites",   Component: RestaurantWebsitesPage },

      // SEO
      { path: "seo",          Component: SeoPage },
      { path: "seo/start",    Component: SeoStartPage },
      { path: "seo/packages", Component: SeoPackagesPage },

      // Hosting
      { path: "hosting",          Component: HostingPage },
      { path: "hosting/start",    Component: HostingStartPage },
      { path: "hosting/packages", Component: HostingPackagesPage },

      // Branding
      { path: "branding",          Component: BrandingPage },
      { path: "branding/start",    Component: BrandingStartPage },
      { path: "branding/packages", Component: BrandingPackagesPage },

      // Company
      { path: "insights",                   Component: InsightsPage },
      { path: "insights/:slug",             Component: InsightArticlePage },
      { path: "our-reach",                  Component: OurReachPage },
      { path: "our-reach/:city",            Component: CityPage },
      { path: "our-reach/:city/:service",   Component: CityServicePage },
      { path: "support",                    Component: SupportPage },
      { path: "contact",                    Component: ContactPage },
      { path: "testimonials",               Component: TestimonialsPage },
      { path: "build-your-quote",           Component: BuildYourQuotePage },
      { path: "packages",                   Component: PackagesPage },

      // Catch-all 404
      { path: "*", Component: NotFoundPage },
    ],
  },
]);