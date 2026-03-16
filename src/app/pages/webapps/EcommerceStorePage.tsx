import { AppTypePage } from "../../components/AppTypePage";
import {
  ShoppingBag, CreditCard, PackageSearch, Repeat, Star, BarChart3,
} from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzdG9yZSUyMHByb2R1Y3QlMjBjaGVja291dCUyMHNjcmVlbnxlbnwxfHx8fDE3NzMyNjIwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function EcommerceStorePage() {
  return (
    <AppTypePage
      label="Web App Type — E-Commerce"
      title="E-Commerce & Online Stores"
      subtitle="Sell online beautifully — on your terms"
      heroImage={heroImage}
      heroColor="#1e0f3a"
      seoPath="/web-apps/ecommerce"
      seoKeywords="custom ecommerce app, online store development, bespoke shopping platform, UK ecommerce developer"
      overview="A bespoke e-commerce store that matches the quality of your product, converts browsers into buyers, and scales with your ambition."
      overviewDetail="Your products deserve better than a generic template. Whether you're launching a direct-to-consumer brand, building a multi-brand marketplace, or creating a complex configure-to-order experience, we build e-commerce platforms that reflect the true quality of what you're selling. We work with both custom-built architectures and best-in-class platforms like Shopify — recommending the right approach based on your product complexity, order volume, and long-term commercial ambitions. The result is an online store that feels like an extension of your brand, not a bolt-on afterthought."
      features={[
        {
          icon: ShoppingBag,
          title: "Product & Catalogue Management",
          body: "Flexible product structures for simple SKUs, complex variants, bundles, configurable products, and digital downloads — all manageable without developer involvement.",
          detail: "Your product catalogue is the engine of your store, and it needs to be as flexible as your product range. Simple single-SKU products sit alongside items with dozens of variant combinations — size, colour, material, fit — all managed from an intuitive admin interface that your team can operate without technical training. Bundles, gift sets, configurable products, and digital downloads each have their own product type with the right fields and options. Bulk product updates, CSV imports, and inventory adjustments at scale mean you're never blocked by the system.",
        },
        {
          icon: CreditCard,
          title: "Optimised Checkout",
          body: "Frictionless, conversion-optimised checkout flows supporting Stripe, Apple Pay, Google Pay, PayPal, Klarna, and buy-now-pay-later options.",
          detail: "Every unnecessary step in your checkout is costing you sales. We design checkout flows around the principle of minimum friction: address autocomplete, one-click payment via Apple Pay and Google Pay for returning customers, guest checkout as the default option, and progress indicators that reduce abandonment. Buy-now-pay-later options like Klarna increase average order value by making larger purchases feel accessible. Abandoned cart recovery sequences automatically follow up with customers who got close but didn't complete — recovering revenue that would otherwise be lost.",
        },
        {
          icon: PackageSearch,
          title: "Inventory & Fulfilment",
          body: "Real-time stock management with low-stock alerts, multi-warehouse support, and integrations with fulfilment partners, couriers, and 3PL providers.",
          detail: "Stock accuracy is the foundation of a trustworthy store — nothing damages brand reputation faster than selling out-of-stock items. Real-time inventory management updates stock levels instantly across every sales channel, triggers low-stock alerts before you run out, and reserves stock during checkout to prevent overselling. Multi-location inventory handles stock across warehouses, retail locations, and 3PL partners in a unified view. Integrations with Linnworks, ShipStation, Royal Mail, DPD, and other fulfilment partners automate the picking, packing, and despatch workflow.",
        },
        {
          icon: Repeat,
          title: "Subscriptions & Recurring Orders",
          body: "Build recurring revenue with subscription products — configurable frequencies, pause/skip options, and prorated billing handled automatically.",
          detail: "Subscription products transform one-off purchases into predictable recurring revenue — the most valuable kind. Customers choose their frequency (weekly, monthly, bimonthly), and the system handles everything: recurring billing via Stripe, automatic renewal reminders, and the ability for customers to pause, skip, or modify their subscription without contacting your team. Failed payment recovery sequences attempt charges at intelligent intervals and send friendly prompts before cancelling. Subscription analytics show you MRR, churn rate, and average subscription lifespan — the metrics that drive DTC growth.",
        },
        {
          icon: Star,
          title: "Reviews & Social Proof",
          body: "Automated post-purchase review requests, verified review display, Q&A functionality, and UGC (user-generated content) integration to build trust at scale.",
          detail: "Social proof is your most powerful conversion tool, and it should be working for you automatically. Post-purchase review request emails go out at the optimal moment — after the product has been received and had time to be used. Verified purchase badges ensure authenticity. Photo and video reviews from customers are displayed prominently on product pages, turning real customer experiences into persuasive marketing content. Q&A sections allow prospective buyers to ask questions answered by your team or existing customers, addressing objections before they prevent a sale.",
        },
        {
          icon: BarChart3,
          title: "Conversion & Analytics",
          body: "Full e-commerce analytics: revenue, conversion rate, average order value, abandoned cart recovery, customer lifetime value, and cohort retention analysis.",
          detail: "Data without context is noise. Your analytics dashboard surfaces the metrics that actually drive decisions: conversion rate by traffic source (so you know which marketing channels are worth investing in), average order value by product category, abandoned cart rate by checkout step (pinpointing exactly where you're losing customers), customer lifetime value by acquisition cohort (understanding whether your customers are worth what you paid to acquire them), and product-level performance across all key metrics. Every report is actionable, not decorative.",
        },
      ]}
      industries={[
        {
          name: "Fashion & Apparel",
          description: "Size and colour variant management, lookbook editorial, outfit builders, and returns management built for fashion-forward DTC brands.",
          detail: "Fashion e-commerce lives or dies on visual experience and the ease of navigating variants. We build stores where editorial photography takes centre stage, size guides reduce return rates, and colour and size variant selection is frictionless across mobile and desktop. Lookbook-style product pages, outfit builder functionality, and 'complete the look' suggestions increase basket sizes. A streamlined returns portal reduces the cost of post-purchase service while maintaining the premium feel your brand requires.",
        },
        {
          name: "Food & Drink",
          description: "Delivery scheduling, click-and-collect, product freshness windows, age verification, and multi-region fulfilment for food and beverage brands.",
          detail: "Food and drink e-commerce has constraints that other product categories don't: perishability, delivery scheduling windows, alcohol age verification, temperature requirements, and freshness windows that vary by product. We build platforms that handle all of this: date-slot delivery booking so customers choose when to receive fresh produce, click-and-collect for local orders, age verification gates for alcohol, and subscription models for coffee, wine, or grocery brands building recurring revenue.",
        },
        {
          name: "Health, Beauty & Wellness",
          description: "Subscription boxes, personalised product recommendations, ingredient transparency, and professional-grade product management for beauty brands.",
          detail: "Beauty and wellness customers are informed and ingredient-conscious — your product pages need to meet that standard. Full ingredient lists with INCI names and benefit explanations, skin type and concern filtering, before/after photography, and dermatologist endorsement display build the trust that converts first-time buyers. Subscription replenishment for skincare routines reduces churn. Personalisation quizzes guide customers to the right products. The result is a store that feels like a premium brand destination, not a generic shop.",
        },
        {
          name: "Home & Interiors",
          description: "Room visualisers, made-to-order product configurators, trade account pricing, and long lead-time order management for interiors businesses.",
          detail: "Home and interiors purchases are high-consideration decisions — customers need more information and more reassurance than most product categories provide. Room scene imagery, swatches and material samples, configurable product options (dimensions, finishes, fabrics), and delivery scheduling for large items are all built into the buying experience. Trade account pricing with separate catalogues and minimum order values serves B2B buyers alongside consumers. Long lead-time order management keeps customers informed throughout the wait.",
        },
        {
          name: "Sports & Outdoor",
          description: "Equipment configurators, sizing guides, trade and club pricing tiers, and sponsorship management for sports brands and retailers.",
          detail: "Sports retail is technical and community-driven. Equipment configurators allow customers to build exactly the kit they need — bike builds, racket stringing specifications, ski setup — with the system validating compatibility. Detailed sizing guides with measurement tools reduce returns significantly. Club and team accounts allow coaches and managers to place bulk orders at institutional pricing. Sponsorship and pro deal programmes can be managed through the platform, and ambassador content integrates naturally into the product discovery experience.",
        },
        {
          name: "Luxury & Premium Goods",
          description: "White-glove e-commerce experiences — editorial-led shopping, gift messaging, bespoke packaging options, and concierge checkout flows.",
          detail: "Luxury e-commerce demands a standard of experience that matches the product. Every interaction — from the first product page view to the unboxing — must feel considered and premium. Editorial-led product presentation with brand storytelling, gift messaging and bespoke packaging options at checkout, concierge order confirmation, and delivery experience management are all part of the platform. Scarcity and exclusivity can be managed through limited releases, private sale access, and registered interest lists for waitlisted products.",
        },
      ]}
      included={[
        "Bespoke storefront design — never a template",
        "Product catalogue with full variant and bundle support",
        "Optimised checkout with 10+ payment methods",
        "Abandoned cart recovery email sequences",
        "Inventory management with multi-location support",
        "Order management and fulfilment workflows",
        "Customer account area with order history and returns",
        "Discount codes, gift cards, and loyalty programme",
        "Post-purchase review and UGC collection",
        "SEO-optimised product and category pages",
        "Google Shopping and Meta catalogue feed",
        "Advanced analytics and reporting dashboard",
      ]}
      process={[
        {
          step: "01",
          title: "Commerce Strategy",
          description: "We begin by understanding your product range, pricing model, fulfilment process, and growth targets. We recommend the right platform and architecture based on where your business is now and where it's going.",
        },
        {
          step: "02",
          title: "UX & Design",
          description: "Conversion-focused store design built around your brand — from the homepage editorial to the product detail page and checkout flow — with every decision justified by user behaviour data.",
        },
        {
          step: "03",
          title: "Build & Integrate",
          description: "Development of the full store, including payment gateways, inventory systems, email marketing integrations, and any custom functionality your product range requires.",
        },
        {
          step: "04",
          title: "Launch & Optimise",
          description: "Managed launch followed by a 90-day optimisation period — analysing real customer behaviour to improve conversion, reduce abandonment, and increase average order value.",
        },
      ]}
      related={[
        {
          label: "Web App Type",
          title: "Customer Portals",
          description: "A trade account portal for B2B customers with bespoke pricing and order history.",
          path: "/web-apps/customer-portals",
        },
        {
          label: "Web App Type",
          title: "Membership Platforms",
          description: "Reward your best customers with a members-only shopping experience and exclusive access.",
          path: "/web-apps/membership-platforms",
        },
        {
          label: "Web App Type",
          title: "SaaS Platforms",
          description: "Turn your e-commerce expertise into a software product for other retailers.",
          path: "/web-apps/saas-platforms",
        },
      ]}
      ctaTitle="Your products deserve a store that sells them at their best."
      concepts={[
        { title: "Product Catalogue", description: "Filterable product grid with imagery, pricing, variants, and quick-add — designed to convert browsers into buyers.", layout: "store" },
        { title: "Order Management", description: "Admin dashboard tracking orders, fulfillment status, returns, and revenue — all in real time.", layout: "dashboard" },
        { title: "Performance Analytics", description: "Sales trends, conversion rates, top products, and customer lifetime value — data that drives decisions.", layout: "analytics" },
      ]}
    />
  );
}