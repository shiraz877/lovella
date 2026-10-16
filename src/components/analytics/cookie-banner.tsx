"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAnalyticsConsent } from "@/lib/analytics";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("lovelle_analytics_consent");
      if (!consent) {
        // Show after a brief delay so it doesn't block immediate initial render
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-pink-200 shadow-2xl shadow-pink-500/10"
          role="dialog"
          aria-label="Cookie consent banner"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-[var(--color-text-primary)]">
                Privacy &amp; Cookies
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                We use privacy-friendly analytics to learn which quizzes you love most. No sensitive personal quiz answers are ever sold or shared.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--color-border)]">
            <Link
              href="/privacy"
              className="text-xs text-[var(--color-text-muted)] hover:text-pink-600 transition-colors"
            >
              Privacy Policy
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDecline}
                className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-pink-600 px-3 py-1.5 rounded-full hover:bg-pink-50 transition-colors"
              >
                Decline
              </button>
              <Button variant="primary" size="xs" onClick={handleAccept}>
                <ShieldCheck className="w-3.5 h-3.5" />
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
