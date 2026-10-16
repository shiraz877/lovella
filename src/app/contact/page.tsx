import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contact Lovelle – Feedback & Support",
  description: "Get in touch with the Lovelle team for feedback, partner inquiries, and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container py-12 sm:py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <Badge variant="pink" size="md" className="mb-2">
          Get in Touch
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Contact Us
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          We would love to hear your feedback, new quiz suggestions, or partnership ideas.
        </p>
      </div>

      <div className="card-base p-6 sm:p-8 space-y-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-[var(--color-text-primary)]">
              Email Support
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 mb-1">
              For general questions, bug reports, and editorial submissions:
            </p>
            <p className="font-mono text-sm text-pink-600 font-semibold">
              [OWNER INPUT REQUIRED: contact@lovelle.app]
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-[var(--color-text-primary)]">
              Response Time
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Our small creative team usually responds within 1 to 2 business days.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-[var(--color-text-primary)]">
              Mailing Address &amp; Corporate Identity
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              [OWNER INPUT REQUIRED: Company legal name, registered business street address, country, tax / VAT ID]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
