import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/security/rate-limit";

describe("Rate Limiting Security Guard", () => {
  it("should allow requests under the limit", () => {
    const testId = `test_user_${Date.now()}`;
    const res = checkRateLimit(testId, { maxRequests: 5, windowMs: 10000 });

    expect(res.allowed).toBe(true);
    expect(res.remaining).toBe(4);
  });

  it("should block requests when exceeding maximum allowed threshold", () => {
    const testId = `test_abuser_${Date.now()}`;

    // Exhaust limit
    for (let i = 0; i < 3; i++) {
      checkRateLimit(testId, { maxRequests: 3, windowMs: 10000 });
    }

    // 4th request must be denied
    const blocked = checkRateLimit(testId, { maxRequests: 3, windowMs: 10000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSec).toBeGreaterThan(0);
  });
});
