import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "../../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const isDev = !!import.meta.env.VITE_DEV_LOGIN;

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Dev mode: bypass auth entirely
  if (isDev) return <>{children}</>;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Still loading
  if (session === undefined) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0e1822" }}
      >
        <div
          className="w-8 h-8 border-2 animate-spin"
          style={{ borderColor: "#00d4e8", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
