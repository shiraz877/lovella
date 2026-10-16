import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Lovelle's Privacy Policy and data handling practices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 sm:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
        Privacy Policy
      </h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-8">
        Last updated: October 2026 · Effective immediately
      </p>

      <div className="card-base p-6 sm:p-10 space-y-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            1. Introduction
          </h2>
          <p>
            Welcome to Lovelle (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to protecting the data of everyone who plays our quizzes and games. This Privacy Policy explains what information we collect, how it is used, and your rights.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            2. Information We Do Not Collect
          </h2>
          <p>
            We do not require user registration or account creation to enjoy our public quizzes. We do not sell your personal data. We do not ask for or collect sensitive personal data such as government IDs, credit cards, or physical addresses for free gameplay.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            3. Information Collected During Gameplay
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>
              <strong>Custom Quizzes:</strong> When you create a quiz, we store the question prompts, answer choices, and an optional creator display name.
            </li>
            <li>
              <strong>Quiz Submissions:</strong> When a participant takes a shared quiz, their entered display name and selected answer IDs are stored to calculate and show the score.
            </li>
            <li>
              <strong>Pseudonymous Abuse Prevention:</strong> For rate limiting and preventing spam, temporary cryptographically hashed IP addresses may be recorded in volatile memory.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            4. Analytics &amp; Cookies
          </h2>
          <p>
            With your consent, we use privacy-conscious analytics tools (such as Google Analytics 4 and PostHog) to understand site traffic and quiz popularity. We configure Google Consent Mode and respect Do Not Track signals. You can revoke consent at any time via our Cookie Settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
            5. Legal Entity &amp; Inquiries
          </h2>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <p className="font-semibold text-gray-900 mb-1">Data Controller Information</p>
            <p>[OWNER INPUT REQUIRED: Legal entity name, Registered address, Data Protection Officer contact email]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
