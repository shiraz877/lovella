"use client";

import React, { useEffect, useState, useRef } from "react";
import { hasAnalyticsConsent, trackEvent } from "@/lib/analytics";

interface AdSlotProps {
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export function AdSlot({ slotId, format = "auto", className = "" }: AdSlotProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const isProductionReady = Boolean(publisherId && publisherId.startsWith("ca-pub-"));

  useEffect(() => {
    setIsClient(true);
    setHasConsent(hasAnalyticsConsent());
  }, []);

  // Viewability observer to track `ad_slot_viewable` safely without false firing
  useEffect(() => {
    if (!containerRef.current || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            trackEvent("ad_slot_viewable", { slot_id: slotId });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [slotId]);

  // Height configurations to avoid Cumulative Layout Shift (CLS)
  const minHeightClass =
    format === "rectangle" ? "min-h-[250px]" : "min-h-[100px] sm:min-h-[120px]";

  if (!isClient) {
    return <div className={`w-full ${minHeightClass} ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className={`w-full my-8 ${minHeightClass} ${className} flex flex-col items-center justify-center`}
      role="complementary"
      aria-label="Sponsor advertisement"
    >
      <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-1 text-center">
        Advertisement
      </div>

      <div className="w-full max-w-2xl rounded-2xl border border-dashed border-pink-200 bg-pink-50/20 p-4 flex flex-col items-center justify-center text-center">
        {isProductionReady && hasConsent ? (
          // Production AdSense script container
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          // Clean compliant placeholder - never looks like a fake ad
          <div className="py-6 px-4 text-xs text-[var(--color-text-muted)]">
            <span className="font-semibold text-pink-600/70 block mb-1">
              Lovelle Ad Space
            </span>
            <span>
              Configured slot #{slotId}. Reserved for Google AdSense partners.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
