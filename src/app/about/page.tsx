import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Sparkles, Shield, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Lovelle – Our Mission",
  description:
    "Learn about Lovelle: modern, playful, and thoughtful relationship games and quizzes designed to connect couples and best friends.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container py-12 sm:py-16 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl mx-auto mb-4">
          💕
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-3">
          About Lovelle
        </h1>
        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
          Helping couples and best friends connect through playful, meaningful moments.
        </p>
      </div>

      <div className="card-base p-6 sm:p-10 space-y-6 text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed mb-8">
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
          Why We Built Lovelle
        </h2>
        <p>
          In a world dominated by endless social feeds and quick swipes, deep connection can sometimes get lost in the noise. Lovelle was created with a simple purpose: to bring playful romance, hearty laughter, and genuine conversations back into every relationship.
        </p>
        <p>
          Whether you have been together for two weeks or two decades, or you want to challenge your closest friends to see who knows you best, our games are crafted to spark smiles and storytelling.
        </p>

        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] pt-4">
          Our Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)] mb-1">
              <Smile className="w-4 h-4 text-pink-500" /> Entertainment First
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-normal">
              Our quizzes are fun, uplifting games. We never pretend entertainment scores are scientific psychological diagnoses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)] mb-1">
              <Shield className="w-4 h-4 text-pink-500" /> Respect for Privacy
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-normal">
              You do not need to register an account or give us your phone number to play. Your answers belong to you and your partner.
            </p>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] pt-4">
          Publishing Information &amp; Contact
        </h2>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">Publisher &amp; Editorial Details</p>
          <p className="mb-2">
            [OWNER INPUT REQUIRED: Legal entity name, Registered business address, Contact representative]
          </p>
          <p>
            Have feedback or quiz ideas? Email our editorial team at{" "}
            <span className="font-mono text-pink-600">[OWNER INPUT REQUIRED: hello@example.com]</span>.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg" asChild>
          <Link href="/quizzes">Explore Our Quizzes</Link>
        </Button>
      </div>
    </div>
  );
}
