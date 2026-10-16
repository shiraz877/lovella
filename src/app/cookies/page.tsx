"use client";

import React, { useState, useEffect } from "react";
import { Check, Shield, Cookie, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics";

export default function CookieSettingsPage() {
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConsent(hasAnalyticsConsent());
  }, []);

  const handleSave = (val: boolean) => {
    setConsent(val);
    setAnalyticsConsent(val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container py-12 sm:py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3">
          <Cookie className="w-6 h-6" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Cookie &amp; Privacy Preferences
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Manage how we process anonymous usage data on your device.
        </p>
      </div>

      <div className="card-base p-6 sm:p-8 space-y-6">
        {/* Essential */}
        <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-pink-500" />
              <h2 className="font-display font-bold text-sm text-[var(--color-text-primary)]">
                Strictly Necessary Cookies &amp; Storage
              </h2>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Required for core website functionality (saving your in-progress quiz answers, navigation, and security). These cannot be disabled.
            </p>
          </div>
          <span className="text-xs font-bold text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full whitespace-nowrap">
            Always Active
          </span>
        </div>

        {/* Analytics */}
        <div className="p-4 rounded-2xl border border-[var(--color-border)] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cookie className="w-4 h-4 text-purple-500" />
              <h2 className="font-display font-bold text-sm text-[var(--color-text-primary)]">
                Analytics &amp; Performance Telemetry
              </h2>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Allows us to measure site traffic and find out which relationship games are most popular so we can create more of what you love.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave(!consent)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                consent ? "bg-pink-500" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={consent}
              aria-label="Toggle analytics cookies"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  consent ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-green-50 text-green-700 text-xs font-semibold flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Preferences updated successfully!
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => handleSave(false)}
            className="text-xs text-gray-500 hover:text-pink-600 transition-colors"
          >
            Reject All Non-Essential
          </button>
          <Button variant="primary" size="sm" onClick={() => handleSave(true)}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
