import { WebsiteTypePage } from "../../components/WebsiteTypePage";
import {
  UtensilsCrossed, MapPin, CalendarCheck, Camera, Clock, Star,
} from "lucide-react";

export function RestaurantWebsitesPage() {
  return (
    <WebsiteTypePage
      label="Website Type — Restaurant & Hospitality"
      title="Restaurant & Hospitality Websites"
      subtitle="Make mouths water before guests walk through the door"
      heroImage=""
      seoPath="/web-design/restaurant-websites"
      seoKeywords="restaurant website design, hospitality web design, cafe website, hotel website, UK restaurant websites"
      overview="Your website is the first taste of your venue — it should create appetite, communicate atmosphere, and make booking irresistible."
      overviewDetail="Most restaurant websites are afterthoughts — a PDF menu on a template, buried behind slow-loading stock photography. We design hospitality websites that capture the energy of your venue, present your food and drink beautifully, and make it effortless for guests to book a table, order takeaway, or find your latest events. From independent cafés to multi-site restaurant groups, we build sites that fill seats."
      features={[
        { icon: UtensilsCrossed, title: "Menu Presentation", body: "Beautiful, mobile-friendly menu displays — not PDF downloads — with dietary filters, seasonal highlights, and pricing.",
          detail: "A PDF menu is a missed opportunity. Digital menus built into your website are searchable by Google, filterable by dietary requirement, updated instantly when dishes change, and readable on any screen without pinching and zooming. Seasonal menu sections signal freshness and quality. Wine and drinks lists sit alongside food with the same visual care. The menu is often the deciding factor in a table booking — it deserves presentation that matches the quality of the food behind it." },
        { icon: MapPin, title: "Location & Directions", body: "Interactive maps, transport links, parking information, and multi-location support for restaurant groups.",
          detail: "Getting to your venue should feel effortless before guests arrive — and the location section of your website is part of the hospitality experience. An embedded map with walking routes from nearby transport links, clear parking instructions, and directions from major landmarks all reduce the friction of a first visit. For restaurant groups with multiple venues, a locations page with filtering and individual venue pages that preserve the group's brand consistency is built as standard." },
        { icon: CalendarCheck, title: "Reservation Integration", body: "Online booking via your preferred system — OpenTable, ResDiary, or a custom solution — embedded seamlessly.",
          detail: "The booking widget is the highest-converting element of any restaurant website — and it needs to be prominent, frictionless, and on-brand. We integrate with your existing reservation platform (OpenTable, ResDiary, Resy, SevenRooms) or build a custom booking flow for venues with specific requirements. The widget matches your site's visual language rather than looking like a third-party tool dropped in as an afterthought. For private dining and events, separate enquiry flows capture the information needed to convert a lead into a confirmed group booking." },
        { icon: Camera, title: "Food Photography Focus", body: "Layouts designed around full-bleed food photography that makes scrolling feel like browsing a tasting menu.",
          detail: "In hospitality, the photography is the atmosphere — and the design must get out of its way. We build restaurant websites around the photography: full-bleed hero images that demand attention, gallery sections that scroll like a visual tasting menu, and colour palette choices that complement your food's natural palette rather than competing with it. For venues whose photography library is limited, we advise on shoot direction to ensure the assets needed for the site are captured before build begins." },
        { icon: Clock, title: "Opening Hours & Events", body: "Dynamic opening times, special event listings, and seasonal menu announcements that stay up to date.",
          detail: "Nothing frustrates a potential guest more than arriving to find a venue closed because the website showed outdated hours. Opening times that account for seasonal variations, holiday closures, and special event nights are managed through a simple admin interface — no developer required. Event listings for wine dinners, live music, seasonal menus, and private dining showcase the venue's full offer. Pop-up banners can be activated for temporary announcements: a new seasonal menu, a closure, or a limited-time offer." },
        { icon: Star, title: "Reviews & Awards", body: "Integration with Google Reviews, TripAdvisor, and industry awards to build credibility and social proof.",
          detail: "Social proof is the deciding factor for first-time visitors choosing between your venue and a competitor. Review aggregation pulls your latest Google and TripAdvisor ratings and selected review excerpts directly into the website — always current, never requiring manual updates. Industry awards, Michelin recognition, press mentions, and critic quotes are displayed with the prominence they deserve. For venues with high review volumes, automated selection of the most recent and highest-rated reviews ensures social proof stays fresh without manual curation." },
      ]}
      industries={[
        { name: "Restaurants & Fine Dining", description: "Tasting menus, wine lists, chef profiles, and reservation systems that match the standard of your food.",
          detail: "A fine dining website must earn the confidence of guests who are investing a significant amount in their evening before they've walked through the door. Chef profiles with background and philosophy, tasting menu previews that build anticipation, wine list access for enthusiasts who research in advance, press and award recognition presented with authority, and a reservation experience that feels as considered as the service itself — all contribute to a digital first impression that matches the quality of the table." },
        { name: "Cafés & Coffee Shops", description: "Menus, loyalty programme information, opening hours, and event listings for community-focused venues.",
          detail: "Independent cafés and coffee shops build their businesses on community loyalty — and the website should reinforce that relationship. A warm, characterful design that captures the atmosphere of the space, food and drink menus that read like they were written by someone who genuinely loves the product, opening hours that are always accurate, and event listings for open mic nights, coffee cuppings, or seasonal collaborations. For venues with a loyalty programme, clear information on how it works encourages sign-ups from website visitors." },
        { name: "Bars & Cocktail Lounges", description: "Drinks menus, event calendars, private hire information, and atmosphere-driven visual design.",
          detail: "A bar's website needs to do one thing above all others: make people want to be there. The design is atmosphere-first — dark, moody, cinematic if that's the venue, or bright and social if it's not. Cocktail menus that read as considerately as a restaurant menu, an events calendar for themed nights and guest bartenders, private hire information with capacity and catering details, and a gallery of the space and the drinks that convinces the group chat this is where they're going next." },
        { name: "Hotels & Boutique Stays", description: "Room galleries, rate information, amenity showcases, and booking engine integration.",
          detail: "A boutique hotel website is, in many ways, a sales tool for a feeling — the feeling of what it's like to stay there. Room galleries that make each space look inviting and distinct, amenity showcases that go beyond a bullet point list, location and local area information that contextualises the experience, and a booking engine that reflects the brand rather than interrupting it. For independent properties competing with OTAs, a well-designed direct booking experience with a 'book direct' incentive can meaningfully shift the commission-to-direct ratio over time." },
        { name: "Pubs & Gastropubs", description: "Food and drink menus, live sport schedules, function room hire, and dog-friendly credentials.",
          detail: "The British pub website has to serve a surprising variety of audiences simultaneously: the lunch crowd searching for food menus, the sport viewer checking what's being shown this weekend, the function planner researching private hire, and the dog owner checking whether four-legged visitors are welcome. We design pub websites that answer all of these questions clearly without feeling cluttered — with a visual personality that captures what makes your particular pub worth the journey rather than looking like every other venue on the high street." },
        { name: "Catering & Private Events", description: "Menu packages, event galleries, enquiry forms, and testimonials from past clients.",
          detail: "Catering and private events businesses sell trust before they sell food. Prospective clients are considering handing over one of the most important days of their year — a wedding, a milestone birthday, a corporate dinner — and the website must communicate that they're in safe, experienced hands. Menu packages presented attractively with clear pricing where appropriate, an event gallery that demonstrates range and quality, detailed testimonials from recognisable event types, and an enquiry form that captures enough detail to enable a genuinely useful first conversation rather than a generic call." },
      ]}
      included={[
        "Bespoke visual design — atmosphere-led",
        "Interactive digital menu (not PDF)",
        "Online reservation integration",
        "Mobile-first responsive design",
        "Food photography gallery",
        "Opening hours with holiday overrides",
        "Events and specials listing",
        "Google Maps and directions",
        "Review aggregation display",
        "Social media feed integration",
        "SEO for local search visibility",
        "Google Business Profile optimisation",
      ]}
      process={[
        { step: "01", title: "Venue Immersion", description: "We visit (or virtually tour) your venue, understand your brand, cuisine, and clientele. We define the visual direction and key user journeys." },
        { step: "02", title: "Visual Design", description: "Full-page designs led by your food photography and venue aesthetic — capturing the atmosphere guests experience in person." },
        { step: "03", title: "Build & Connect", description: "Development with booking system integration, menu management, Google Business Profile, and review feed setup." },
        { step: "04", title: "Test & Launch", description: "Cross-device testing, local SEO verification, and a managed go-live — with training so your team can update menus and events independently." },
      ]}
      related={[
        { label: "Website Type", title: "Landing Pages", description: "Promote seasonal menus, special events, or new openings with dedicated campaign pages.", path: "/web-design/landing-pages" },
        { label: "Website Type", title: "E-Commerce Websites", description: "Sell gift vouchers, merchandise, or hampers alongside your hospitality website.", path: "/web-design/ecommerce-websites" },
        { label: "Website Type", title: "Corporate Websites", description: "For restaurant groups needing a parent brand site alongside individual venue sites.", path: "/web-design/corporate-websites" },
      ]}
      ctaTitle="Let's build a website that fills tables and creates cravings."
      concepts={[
        { title: "Menu & Booking", description: "Digital menu with category tabs, dietary icons, and pricing alongside an integrated reservation widget — the two things guests need most.", layout: "analytics" },
        { title: "Venue Showcase", description: "Full-bleed photography with atmosphere-driven design, opening hours, location map, and review highlights.", layout: "chat" },
        { title: "Events & Specials", description: "Upcoming events listing with featured specials, seasonal menus, and private hire enquiry form.", layout: "list" },
      ]}
    />
  );
}