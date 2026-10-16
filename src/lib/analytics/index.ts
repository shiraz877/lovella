import type { AnalyticsEventName, AnalyticsEventProps } from "./events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
      identify?: (distinctId: string) => void;
    };
    dataLayer?: unknown[];
  }
}

// Memory cache to deduplicate events caused by React StrictMode re-renders
const recentEvents = new Map<string, number>();
const DEDUP_WINDOW_MS = 1500;

/**
 * Checks user consent for analytics from localStorage
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("lovelle_analytics_consent");
    return consent === "granted";
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("lovelle_analytics_consent", granted ? "granted" : "denied");
  } catch {
    /* ignore */
  }
}

/**
 * Strips PII like emails, real names, or freeform sensitive text
 */
function sanitizeProperties(props?: AnalyticsEventProps): Record<string, unknown> {
  if (!props) return {};
  const cleaned: Record<string, unknown> = {};

  const forbiddenKeys = new Set(["email", "name", "phone", "participant_name", "creator_name", "password"]);

  for (const [key, val] of Object.entries(props)) {
    if (forbiddenKeys.has(key.toLowerCase())) continue;
    // Don't send string values exceeding 120 chars to prevent accidental leaking of freeform answers
    if (typeof val === "string" && val.length > 120) {
      cleaned[key] = val.slice(0, 120) + "...";
    } else {
      cleaned[key] = val;
    }
  }

  return cleaned;
}

/**
 * Central tracking method
 */
export function trackEvent(name: AnalyticsEventName, properties?: AnalyticsEventProps): void {
  if (typeof window === "undefined") return;

  // Check consent - if denied or not yet provided, do not track analytics
  if (!hasAnalyticsConsent()) {
    return;
  }

  // Deduplicate
  const payloadKey = `${name}_${JSON.stringify(properties || {})}`;
  const now = Date.now();
  const lastTime = recentEvents.get(payloadKey);

  if (lastTime && now - lastTime < DEDUP_WINDOW_MS) {
    return; // Duplicate within window
  }
  recentEvents.set(payloadKey, now);

  const sanitized = sanitizeProperties(properties);

  // 1. Google Analytics 4 dispatch
  if (typeof window.gtag === "function") {
    window.gtag("event", name, sanitized);
  }

  // 2. PostHog dispatch
  if (window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(name, sanitized);
  }
}
