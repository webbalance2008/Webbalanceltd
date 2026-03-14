import { Phone, MessageCircle, MapPin } from "lucide-react";

const cards = [
  {
    key: "phone",
    Icon: Phone,
    label: "Phone",
    value: "01224 452095",
    sub: "Mon–Fri, 8:30am–5:30pm",
    cta: "Call Us",
    href: "tel:01224452095",
    color: "#00d4e8",
    bg: "rgba(0,212,232,0.07)",
    border: "rgba(0,212,232,0.18)",
    featured: false,
  },
  {
    key: "whatsapp",
    Icon: MessageCircle,
    label: "WhatsApp Business",
    value: "",
    sub: "Quick replies — message us directly",
    cta: "Message",
    href: "https://wa.me/447834616386",
    color: "#25d366",
    bg: "rgba(37,211,102,0.07)",
    border: "rgba(37,211,102,0.45)",
    featured: true,
  },
  {
    key: "address",
    Icon: MapPin,
    label: "Address",
    value: "Web Balance Ltd\nNeospace, Riverside Drive\nAberdeen, AB11 7LH",
    sub: null,
    cta: "Directions",
    href: "https://maps.google.com/?q=Neospace,+Riverside+Drive,+Aberdeen,+AB11+7LH",
    color: "#00d4e8",
    bg: "rgba(0,212,232,0.07)",
    border: "rgba(0,212,232,0.18)",
    featured: false,
  },
];

export function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.Icon;
        return (
          <div
            key={card.key}
            className="relative flex flex-col gap-4 p-6 transition-all duration-300"
            style={{
              borderWidth: card.featured ? 2 : 1,
              borderStyle: "solid",
              borderColor: card.border,
              background: card.bg,
            }}
          >
            {/* Featured glow */}
            {card.featured && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `0 0 32px rgba(37,211,102,0.12)`,
                }}
              />
            )}

            {/* Icon box */}
            <div
              className="w-10 h-10 flex items-center justify-center flex-shrink-0"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: card.border,
                background: `${card.bg}`,
                color: card.color,
              }}
            >
              <Icon size={18} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <p
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2"
              >
                {card.label}
              </p>
              {card.value && (
                <p
                  style={{ fontFamily: "'Montserrat', sans-serif", color: card.color }}
                  className="text-sm font-light mb-1 whitespace-pre-line leading-relaxed"
                >
                  {card.value}
                </p>
              )}
              {card.sub && (
                <p
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-white text-xs leading-relaxed"
                >
                  {card.sub}
                </p>
              )}
            </div>

            {/* CTA button */}
            <a
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-200 mt-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: card.color,
                color: card.featured ? "#16212e" : card.color,
                background: card.featured ? card.color : "transparent",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = card.color;
                el.style.color = "#16212e";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = card.featured ? card.color : "transparent";
                el.style.color = card.featured ? "#16212e" : card.color;
              }}
            >
              <Icon size={12} />
              {card.cta}
            </a>
          </div>
        );
      })}
    </div>
  );
}