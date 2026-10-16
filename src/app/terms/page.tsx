import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read Lovelle's Terms of Service for quiz usage and entertainment games.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 sm:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Terms of Service
      </h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-8">
        Last updated: October 2026
      </p>

      <div className="card-base p-6 sm:p-10 space-y-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            1. Entertainment Purpose Only
          </h2>
          <p>
            All quizzes, calculations, compatibility scores, and icebreakers provided on Lovelle are strictly for recreational and entertainment purposes. None of our games constitute licensed psychological, marital, counseling, or medical advice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            2. Acceptable Use Policy
          </h2>
          <p>
            When creating custom quizzes on our platform, you agree not to submit content that is defamatory, abusive, harassing, obscene, hateful, or that violates any third party&apos;s intellectual property rights or privacy. We reserve the right to remove any quiz found in violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind. We do not guarantee that the site will always be uninterrupted or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            4. Applicable Law &amp; Jurisdiction
          </h2>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <p className="font-semibold text-gray-900 mb-1">Governing Law</p>
            <p>[OWNER INPUT REQUIRED: Governing country / state jurisdiction and arbitration clause]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
