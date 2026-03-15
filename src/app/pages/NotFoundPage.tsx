import { Link } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { SEOHead } from "../components/SEOHead";

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noIndex
      />

      <section className="min-h-[80vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          {/* Large 404 */}
          <p
            className="text-[clamp(5rem,15vw,10rem)] font-bold leading-none tracking-tighter"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: "linear-gradient(135deg, #00d4e8, #0ea5e9, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </p>

          <h1
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white mt-4 mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Page not found
          </h1>

          <p
            className="text-white/60 text-lg mb-10 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#16212e] transition-all hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, #00d4e8, #0ea5e9)",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-all hover:scale-105"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Search className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
