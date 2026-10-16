import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackEvent, setAnalyticsConsent, hasAnalyticsConsent } from "@/lib/analytics";

describe("Analytics Instrumentation & Deduplication", () => {
  beforeEach(() => {
    localStorage.clear();
    window.gtag = vi.fn();
    window.posthog = { capture: vi.fn() };
  });

  it("should not track events when analytics consent has not been granted", () => {
    trackEvent("quiz_start", { quiz_slug: "test-quiz" });

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.posthog?.capture).not.toHaveBeenCalled();
  });

  it("should track events when analytics consent is granted", () => {
    setAnalyticsConsent(true);
    expect(hasAnalyticsConsent()).toBe(true);

    trackEvent("quiz_start", { quiz_slug: "couple-compatibility" });

    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "quiz_start",
      expect.objectContaining({ quiz_slug: "couple-compatibility" })
    );
    expect(window.posthog?.capture).toHaveBeenCalledWith(
      "quiz_start",
      expect.objectContaining({ quiz_slug: "couple-compatibility" })
    );
  });

  it("should sanitize and strip forbidden personal fields like emails and names", () => {
    setAnalyticsConsent(true);

    trackEvent("quiz_completed", {
      quiz_slug: "love-language",
      score: 100,
      email: "user@example.com", // should be stripped
      name: "Private Name", // should be stripped
    } as unknown as Record<string, unknown>);

    const lastCall = (window.gtag as unknown as { mock: { calls: unknown[][] } }).mock.calls[0];
    const payload = lastCall[2] as Record<string, unknown>;

    expect(payload.email).toBeUndefined();
    expect(payload.name).toBeUndefined();
    expect(payload.score).toBe(100);
  });
});
