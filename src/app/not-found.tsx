import Link from "next/link";
import { HeartCrack, Home, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 sm:py-32 max-w-md mx-auto text-center">
      <div className="w-20 h-20 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
        💔
      </div>
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600">
        Error 404
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mt-1 mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed">
        We couldn&apos;t find the quiz or page you were looking for. It might have been moved or doesn&apos;t exist yet.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" asChild>
          <Link href="/">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/quizzes">
            <Play className="w-4 h-4" /> Explore Quizzes
          </Link>
        </Button>
      </div>
    </div>
  );
}
