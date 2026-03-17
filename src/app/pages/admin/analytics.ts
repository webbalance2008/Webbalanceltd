import { supabase } from '../../utils/supabaseClient';

// ─── Event types ──────────────────────────────────────────────────────────────
export const EVENT_TYPES = {
  PAGE_VIEW:     'page_view',
  ARTICLE_READ:  'article_read',
  GALLERY_CLICK: 'gallery_click',
  POPUP_OPEN:    'popup_open',
  POPUP_CLICK:   'popup_click',
  POPUP_CLOSE:   'popup_close',
  FORM_SUBMIT:   'form_submit',
  QUOTE_SUBMIT:  'quote_submit',
  PROJECT_VIEW:  'project_view',
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

// ─── Session management ───────────────────────────────────────────────────────
const SESSION_KEY = 'wb_session_id';
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_TS_KEY = 'wb_session_ts';

function getSessionId(): string {
  const stored = sessionStorage.getItem(SESSION_KEY);
  const ts     = Number(sessionStorage.getItem(SESSION_TS_KEY) ?? 0);

  if (stored && Date.now() - ts < SESSION_TTL_MS) {
    sessionStorage.setItem(SESSION_TS_KEY, String(Date.now()));
    return stored;
  }

  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  sessionStorage.setItem(SESSION_TS_KEY, String(Date.now()));
  return id;
}

// ─── Track event ─────────────────────────────────────────────────────────────
export async function trackEvent(
  event_type: EventType,
  options: {
    page_id?: string;
    page_type?: string;
    metadata?: Record<string, unknown>;
  } = {}
): Promise<void> {
  try {
    const session_id = getSessionId();
    const page_url   = window.location.pathname;
    const referrer   = document.referrer || null;

    await supabase.from('analytics_events').insert({
      event_type,
      page_url:   options.page_id ?? page_url,
      session_id,
      referrer,
      metadata: {
        page_type: options.page_type,
        ...options.metadata,
      },
      created_at: new Date().toISOString(),
    });
  } catch {
    // Silently ignore tracking errors — never break the UI
  }
}

// ─── Auto page view tracker ───────────────────────────────────────────────────
/** Call once in App.tsx to auto-track page views on route changes */
export function autoTrackPageViews(): () => void {
  let lastPath = '';

  const track = () => {
    const path = window.location.pathname;
    if (path !== lastPath) {
      lastPath = path;
      trackEvent(EVENT_TYPES.PAGE_VIEW, { page_id: path });
    }
  };

  // Initial track
  track();

  // Track on history changes
  const origPushState    = history.pushState.bind(history);
  const origReplaceState = history.replaceState.bind(history);

  history.pushState = (...args) => { origPushState(...args); track(); };
  history.replaceState = (...args) => { origReplaceState(...args); track(); };
  window.addEventListener('popstate', track);

  return () => {
    history.pushState    = origPushState;
    history.replaceState = origReplaceState;
    window.removeEventListener('popstate', track);
  };
}

// ─── Aggregation helper (run from admin) ─────────────────────────────────────
/**
 * Aggregate raw events into page_metrics_daily for a given date.
 * Call this daily from admin, or trigger via Supabase Edge Function.
 */
export async function aggregateDailyMetrics(date: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const start = `${date}T00:00:00.000Z`;
    const end   = `${date}T23:59:59.999Z`;

    const { data: events, error: fetchErr } = await supabase
      .from('analytics_events')
      .select('page_url, session_id, event_type')
      .gte('created_at', start)
      .lte('created_at', end);

    if (fetchErr) throw fetchErr;
    if (!events || events.length === 0) return { ok: true };

    // Group by page
    const byPage: Record<string, { sessions: Set<string>; conversions: number; events: number }> = {};
    for (const e of events) {
      const page = e.page_url || '/';
      if (!byPage[page]) byPage[page] = { sessions: new Set(), conversions: 0, events: 0 };
      byPage[page].sessions.add(e.session_id);
      byPage[page].events++;
      if (e.event_type === 'form_submit' || e.event_type === 'quote_submit') {
        byPage[page].conversions++;
      }
    }

    // Total page views per page (page_view events only)
    const viewCounts: Record<string, number> = {};
    for (const e of events) {
      if (e.event_type === 'page_view') {
        viewCounts[e.page_url] = (viewCounts[e.page_url] ?? 0) + 1;
      }
    }

    const upserts = Object.entries(byPage).map(([page, stats]) => ({
      page_id:          page,
      date,
      views:            viewCounts[page] ?? stats.events,
      unique_visitors:  stats.sessions.size,
      conversions:      stats.conversions,
      engagement_score: Math.min(100, Math.round((stats.events / Math.max(1, stats.sessions.size)) * 20)),
    }));

    const { error: upsertErr } = await supabase
      .from('page_metrics_daily')
      .upsert(upserts, { onConflict: 'page_id,date' });

    if (upsertErr) throw upsertErr;
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
