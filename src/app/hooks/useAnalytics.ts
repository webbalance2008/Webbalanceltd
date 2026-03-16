import { useCallback } from "react";
import { useLocation } from "react-router";
import { supabase } from "../utils/supabaseClient";

function getSessionId(): string {
  const key = "wb_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function useAnalytics() {
  const location = useLocation();

  const trackEvent = useCallback(
    (eventType: string, metadata?: Record<string, unknown>) => {
      // Fire-and-forget — never blocks UI
      supabase
        .from("analytics_events")
        .insert({
          event_type: eventType,
          page_url: window.location.pathname,
          session_id: getSessionId(),
          referrer: document.referrer || null,
          metadata: metadata ?? null,
        })
        .then(() => {})
        .catch(() => {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  return { trackEvent };
}
