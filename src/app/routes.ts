import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";
import { WebAppsPage } from "./pages/WebAppsPage";
import { WebDesignPage } from "./pages/WebDesignPage";
import { WebDesignPackagesPage } from "./pages/WebDesignPackagesPage";
import { WebDesignStartPage } from "./pages/WebDesignStartPage";
import { StartProjectPage } from "./pages/StartProjectPage";
import { WebAppStartPage } from "./pages/WebAppStartPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { SeoPage } from "./pages/SeoPage";
import { SeoStartPage } from "./pages/SeoStartPage";
import { HostingPage } from "./pages/HostingPage";
import { HostingStartPage } from "./pages/HostingStartPage";
import { BrandingPage } from "./pages/BrandingPage";
import { BrandingStartPage } from "./pages/BrandingStartPage";
import { InsightsPage } from "./pages/InsightsPage";
import { InsightArticlePage } from "./pages/InsightArticlePage";
import { OurReachPage } from "./pages/OurReachPage";
import { CityPage } from "./pages/reach/CityPage";
import { CityServicePage } from "./pages/reach/CityServicePage";
import { SupportPage } from "./pages/SupportPage";
import { ContactPage } from "./pages/ContactPage";
import TestimonialsPage from "./pages/TestimonialsPage";

// Web App sub-pages
import { BookingSystemsPage } from "./pages/webapps/BookingSystemsPage";
import { CustomerPortalsPage } from "./pages/webapps/CustomerPortalsPage";
import { SaaSPage } from "./pages/webapps/SaaSPage";
import { EcommerceStorePage } from "./pages/webapps/EcommerceStorePage";
import { MembershipPage } from "./pages/webapps/MembershipPage";
import { InternalToolsPage } from "./pages/webapps/InternalToolsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work/:slug", Component: ProjectPage },

      // Web Apps
      { path: "web-apps", Component: WebAppsPage },
      { path: "web-apps/start", Component: WebAppStartPage },
      { path: "web-apps/booking-systems", Component: BookingSystemsPage },
      { path: "web-apps/customer-portals", Component: CustomerPortalsPage },
      { path: "web-apps/saas-platforms", Component: SaaSPage },
      { path: "web-apps/ecommerce-stores", Component: EcommerceStorePage },
      { path: "web-apps/membership-platforms", Component: MembershipPage },
      { path: "web-apps/internal-tools", Component: InternalToolsPage },

      // Web Design
      { path: "web-design", Component: WebDesignPage },
      { path: "web-design/start", Component: WebDesignStartPage },
      { path: "web-design/portfolio", Component: PortfolioPage },
      { path: "web-design/packages", Component: WebDesignPackagesPage },

      // SEO
      { path: "seo", Component: SeoPage },
      { path: "seo/start", Component: SeoStartPage },

      // Hosting
      { path: "hosting", Component: HostingPage },
      { path: "hosting/start", Component: HostingStartPage },

      // Branding
      { path: "branding", Component: BrandingPage },
      { path: "branding/start", Component: BrandingStartPage },

      // Company
      { path: "insights", Component: InsightsPage },
      { path: "insights/:slug", Component: InsightArticlePage },
      { path: "our-reach", Component: OurReachPage },
      { path: "our-reach/:city", Component: CityPage },
      { path: "our-reach/:city/:service", Component: CityServicePage },
      { path: "support", Component: SupportPage },
      { path: "contact", Component: ContactPage },
      { path: "testimonials", Component: TestimonialsPage },
    ],
  },
]);