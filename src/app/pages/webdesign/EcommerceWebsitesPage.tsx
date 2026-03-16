import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  ShoppingBag, CreditCard, Search, BarChart3, Truck, Star,
} from "lucide-react";

export function EcommerceWebsitesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — E-Commerce"
      title="E-Commerce Websites"
      subtitle="Beautiful online stores that turn browsers into buyers"
      heroImage=""
      seoPath="/web-design/ecommerce-websites"
      seoKeywords="ecommerce website design, online store, Shopify, WooCommerce, UK ecommerce development"
      overview="An e-commerce website isn't just a shop — it's your highest-performing salesperson, working 24/7 to move product and delight customers."
      overviewDetail="We design e-commerce experiences that make buying effortless. From product discovery to checkout, every interaction is optimised for conversion. Whether you're selling ten handmade items or ten thousand SKUs, we build stores on platforms like Shopify, WooCommerce, and custom headless solutions — choosing the right technology for your scale, margin, and ambition."
      features={[
        { icon: ShoppingBag, title: "Conversion-Optimised Design", body: "Product pages, category layouts, and checkout flows designed around proven e-commerce UX patterns that maximise sales.",
          detail: "E-commerce design is applied psychology: every element on a product page exists to reduce hesitation and build the confidence that triggers a purchase decision. We design product pages that lead with the image quality your products deserve, present variants clearly without cognitive overload, surface the social proof and trust signals at the exact moment doubt enters the customer's mind, and guide the eye deliberately toward the add-to-cart action. Category pages are structured for browsability, with filter systems that match how your customers actually think about your products." },
        { icon: CreditCard, title: "Seamless Checkout", body: "Frictionless checkout with multiple payment options, guest checkout, and abandoned cart recovery strategies.",
          detail: "The checkout is where most e-commerce revenue is lost, and every unnecessary step is a drop-off risk. We design checkout flows that prioritise completion above all else: address autocomplete, one-click payment via Apple Pay and Google Pay for returning customers, guest checkout as the default option with optional account creation after purchase, and clear progress indicators that reduce abandonment anxiety. Abandoned cart sequences automatically follow up with compelling recovery emails, capturing revenue from the significant proportion of customers who get close but don't complete." },
        { icon: Search, title: "Smart Product Discovery", body: "Filtering, search, and recommendation systems that help customers find exactly what they're looking for.",
          detail: "A customer who can't find what they're looking for doesn't buy — they leave. Smart product discovery design makes finding the right product fast and satisfying. Faceted filtering that updates results in real time, intelligent search that handles misspellings and synonyms, and recommendation engines that surface 'you might also like' suggestions based on browsing and purchase behaviour all work together to keep customers engaged with your catalogue for longer and guide them toward purchases they might not have found independently." },
        { icon: BarChart3, title: "Analytics & Insights", body: "Revenue tracking, conversion funnel analysis, and customer behaviour data to inform your growth strategy.",
          detail: "The data layer of an e-commerce site is as important as the design layer — and we treat them with equal seriousness. Full GA4 e-commerce tracking captures every step of the conversion funnel: product impressions, product clicks, add-to-cart events, checkout initiations, and purchases — all with product-level detail. Revenue attribution by traffic source tells you which marketing channels are genuinely driving sales. Heatmap integration reveals where customers hesitate. The analytics setup we deliver answers the questions that drive growth decisions." },
        { icon: Truck, title: "Shipping & Fulfilment", body: "Integrated shipping calculators, label generation, and fulfilment workflow automation.",
          detail: "The moment a customer clicks 'place order' is the beginning of the fulfilment experience, and it needs to be as smooth as the purchase itself. We integrate shipping carriers — Royal Mail, DPD, DHL, Evri — with real-time rate calculation at checkout, automatic label generation on order confirmation, and tracking information pushed to customers without manual intervention. For larger operations, 3PL integration connects the store to warehouse management systems, automating the pick-pack-despatch workflow entirely. Delivery expectations are set clearly at checkout to reduce inbound enquiries." },
        { icon: Star, title: "Reviews & Social Proof", body: "Product reviews, ratings, and social proof elements that build trust and increase average order value.",
          detail: "Reviews are the most persuasive content on any product page — more persuasive than your own copy, and more trusted than your brand claims. Post-purchase review request emails go out automatically at the optimal moment after delivery, with photo and video review prompts that generate rich UGC. Verified purchase badges establish authenticity. Review summaries and highlighted reviews are positioned strategically on product pages to address the most common purchase hesitations. Q&A sections allow prospective buyers to get answers from your team or existing customers — reducing returns and increasing confidence." },
      ]}
      industries={[
        { name: "Fashion & Apparel", description: "Lookbooks, size guides, colour variants, and visual merchandising that reflects your brand aesthetic.",
          detail: "Fashion retail demands visual excellence and seamless variant management. Editorial-quality imagery sits alongside intuitive colour and size selection, size guides that genuinely reduce return rates, and outfit and look recommendation systems that increase basket size. Returns are handled through a self-service portal that turns a frustrating experience into a brand touchpoint. Mobile experience is given as much design attention as desktop — because the majority of fashion browsing happens on phones, even when purchase completes on desktop." },
        { name: "Food & Drink", description: "Subscription boxes, perishable goods logistics, and appetite-inducing product photography presentation.",
          detail: "Food e-commerce presents logistical complexity that the design must accommodate elegantly: delivery date selection for fresh products, temperature and freshness window information, minimum order values for economically viable delivery, and age verification for alcohol — all built into the purchase flow without friction. Subscription models for regular grocery orders, wine clubs, or coffee subscriptions create reliable recurring revenue. And the product photography and description writing must make visitors hungry before they've read the ingredients list." },
        { name: "Health & Beauty", description: "Ingredient information, skin type quizzes, subscription replenishment, and loyalty programme integration.",
          detail: "Health and beauty customers are among the most research-intensive in any category — they read ingredient lists, cross-reference INCI names, and actively seek clinical evidence. Product pages need to meet that standard: full ingredient transparency with benefit explanations, dermatologist endorsements prominently displayed, skin type and concern filtering, and before/after photography that shows real results. Subscription replenishment for skincare routines reduces churn while increasing lifetime value. A loyalty programme rewards the advocacy that drives word-of-mouth in this community-driven sector." },
        { name: "Home & Interiors", description: "Room scene imagery, swatch selectors, configurators, and delivery scheduling for large items.",
          detail: "High-consideration home purchases require richer product information than almost any other category. Room scene lifestyle photography helps customers visualise the product in their own space. Physical swatch ordering lets them test materials before committing. Configurable products — furniture in multiple finishes, made-to-order items with custom dimensions — require a buying experience that handles complexity without overwhelming. Delivery scheduling for large items, with communication throughout the lead time, sets expectations correctly and reduces anxious inbound enquiries." },
        { name: "Artisan & Handmade", description: "Storytelling-focused layouts that celebrate craft, provenance, and the maker behind the product.",
          detail: "The story behind an artisan product is part of what customers are buying — the maker's face, the workshop, the process, the provenance. We design stores for independent makers and artisan brands that lead with narrative: the about page that makes you fall in love with the person behind the work, the product descriptions that explain the technique and the materials, the photography that shows hands at work rather than products on white backgrounds. Scarcity messaging for limited editions and commissions enquiry forms for bespoke work complement the core shop." },
        { name: "B2B & Wholesale", description: "Trade pricing, minimum order quantities, bulk discounts, and account-based purchasing.",
          detail: "B2B e-commerce has fundamentally different requirements from consumer retail: approved trade accounts with custom pricing tiers, minimum order quantities enforced by product or category, bulk pricing that rewards larger orders, and purchase orders rather than card payments for established accounts. The buying experience must accommodate purchasing managers who are placing large repeat orders efficiently, not casual browsers. CSV order upload, saved order templates, and account credit management are as important in B2B as hero imagery and editorial content are in consumer DTC." },
      ]}
      included={[
        "Custom e-commerce design — not a theme",
        "Product catalogue with variants and options",
        "Secure payment gateway integration",
        "Shipping rate calculation and management",
        "Order management and fulfilment workflow",
        "Customer account areas",
        "Mobile-optimised shopping experience",
        "SEO-friendly product URLs and markup",
        "Email notifications (order, shipping, review)",
        "Inventory management",
        "Discount codes and promotions engine",
        "Analytics and conversion tracking setup",
      ]}
      process={[
        { step: "01", title: "Commerce Strategy", description: "We analyse your product range, target audience, competitors, and sales goals. We define the platform, product architecture, and user journeys." },
        { step: "02", title: "Store Design", description: "Category pages, product detail pages, cart, checkout — every screen designed for conversion, then prototyped for your review." },
        { step: "03", title: "Build & Integrate", description: "Development of the full store with payment processing, shipping, inventory, email automation, and any third-party integrations." },
        { step: "04", title: "Test, Stock & Launch", description: "Thorough checkout testing, product data migration, staff training, and a managed go-live with performance monitoring." },
      ]}
      related={[
        { label: "Website Type", title: "Corporate Websites", description: "If your brand needs more than a shop — a full corporate presence alongside your store.", path: "/web-design/corporate-websites" },
        { label: "Website Type", title: "Landing Pages", description: "Campaign-specific landing pages to drive traffic into your store.", path: "/web-design/landing-pages" },
        { label: "Website Type", title: "Blog & Content Websites", description: "Content marketing that drives organic traffic to your products.", path: "/web-design/blog-websites" },
      ]}
      ctaTitle="Let's build a store that sells as beautifully as your products deserve."
      concepts={[
        { title: "Product Catalogue", description: "Filterable product grid with high-quality imagery, quick-view, price sorting, and category navigation — designed to help customers find and buy faster.", layout: "store" },
        { title: "Product Detail Page", description: "Immersive product page with gallery, variant selectors, trust badges, reviews, and related products — every element optimised for conversion.", layout: "kanban" },
        { title: "Sales Dashboard", description: "Admin view with revenue trends, top sellers, conversion rates, and inventory alerts — the data you need to grow.", layout: "analytics" },
      ]}
    />
  );
}