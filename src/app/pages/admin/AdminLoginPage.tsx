import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Mail, Lock, ArrowRight, Check, Zap } from "lucide-react";

const isDev = !!import.meta.env.VITE_DEV_LOGIN;

const MONO = "'DM Mono', monospace";
const SANS = "'Montserrat', sans-serif";
const BODY = "'Inter', sans-serif";
const TEAL = "#00d4e8";
const BG = "#0e1822";

export default function AdminLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // Handle magic link / password callback
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        window.location.replace("/admin");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isDev) {
      // Dev mode: sign in with password — no email, no rate limits
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (err) setError(err.message);
      // onAuthStateChange handles redirect on success
      return;
    }

    // Production: magic link
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (err) setError(err.message);
    else setSent(true);
  };

  const inputBase = {
    fontFamily: BODY,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "#fff",
    fontSize: "0.9375rem",
  } as const;

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: BG }}>
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,232,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Brand */}
        <div className="mb-10 text-center">
          <p style={{ fontFamily: MONO, color: TEAL, fontSize: "0.625rem", letterSpacing: "0.35em", textTransform: "uppercase" }} className="mb-1">
            Web Balance
          </p>
          <h1 style={{ fontFamily: SANS, color: "#fff", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
            Admin Dashboard
          </h1>
        </div>

        {/* Production: sent state */}
        {sent && !isDev ? (
          <div className="p-8 text-center" style={{ border: `1px solid rgba(0,212,232,0.25)`, background: "rgba(0,212,232,0.05)" }}>
            <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center" style={{ border: `1px solid ${TEAL}`, background: "rgba(0,212,232,0.1)" }}>
              <Check size={20} style={{ color: TEAL }} />
            </div>
            <p style={{ fontFamily: SANS, color: "#fff", fontWeight: 300, fontSize: "1.1rem" }} className="mb-2">Check your email</p>
            <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7 }}>
              We sent a magic link to <span style={{ color: "rgba(255,255,255,0.8)" }}>{email}</span>. Click the link to sign in.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ fontFamily: MONO, color: TEAL, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
              className="mt-6 opacity-60 hover:opacity-100 transition-opacity"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" style={{ border: `1px solid rgba(255,255,255,0.08)`, background: "rgba(255,255,255,0.02)", padding: "2rem" }}>
            {isDev && (
              <p style={{ fontFamily: MONO, color: TEAL, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>
                Dev mode — password sign in
              </p>
            )}

            {/* Email */}
            <div>
              <label style={{ fontFamily: MONO, color: TEAL, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase" }} className="flex items-center gap-2 mb-3">
                <span className="w-4 h-px" style={{ background: TEAL }} />
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" style={inputBase}
                  className="w-full pl-10 pr-4 py-3.5 outline-none transition-colors placeholder-white/30 focus:border-[#00d4e8]"
                />
              </div>
            </div>

            {/* Password — dev only */}
            {isDev && (
              <div>
                <label style={{ fontFamily: MONO, color: TEAL, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase" }} className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-px" style={{ background: TEAL }} />
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input
                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" style={inputBase}
                    className="w-full pl-10 pr-4 py-3.5 outline-none transition-colors placeholder-white/30 focus:border-[#00d4e8]"
                  />
                </div>
              </div>
            )}

            {error && <p style={{ fontFamily: BODY, color: "#f87171", fontSize: "0.8125rem" }}>{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-between px-6 py-4 transition-all disabled:opacity-50"
              style={{ background: TEAL }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#33e8fa"; }}
              onMouseLeave={e => { e.currentTarget.style.background = TEAL; }}
            >
              <span style={{ fontFamily: SANS, color: "#0e1822", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {loading ? "Signing in…" : isDev ? "Sign In" : "Send Magic Link"}
              </span>
              {isDev ? <Zap size={15} style={{ color: "#0e1822" }} /> : <ArrowRight size={15} style={{ color: "#0e1822" }} />}
            </button>
          </form>
        )}

        <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", textAlign: "center" }} className="mt-6">
          Admin access only. User management via Supabase dashboard.
        </p>
      </div>
    </div>
  );
}
