"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Share2,
  RotateCcw,
  Copy,
  Check,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizSession } from "@/types/quiz";
import { quizzes } from "@/data/quizzes";
import { absoluteUrl } from "@/lib/utils";
import confetti from "canvas-confetti";

interface QuizResultsProps {
  session: QuizSession;
  onRestart: () => void;
}

function CountUpNumber({
  target,
  duration = 1500,
}: {
  target: number;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <>{current}</>;
}

export function QuizResults({ session, onRestart }: QuizResultsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = absoluteUrl(`/quizzes/${session.quizSlug}`);
  const quiz = quizzes.find((q) => q.slug === session.quizSlug);
  const result = session.result;

  // Confetti for great scores
  useEffect(() => {
    const shouldCelebrate = session.percentage >= 70;
    if (!shouldCelebrate) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f472b6", "#c084fc", "#a78bfa", "#fbbf24"],
    });
  }, [session.percentage]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback */
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `I scored ${session.percentage}% on the Lovelle quiz!`,
        text: result
          ? `I got "${result.title}" on the ${quiz?.title ?? "Lovelle"} quiz! Try it yourself!`
          : "I just completed a Lovelle quiz! Try it yourself!",
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const whatsappText = encodeURIComponent(
    `I scored ${session.percentage}% on "${quiz?.title ?? "a Lovelle quiz"}"! Try it: ${shareUrl}`
  );

  // Related quizzes (not the current one)
  const relatedQuizzes = quizzes
    .filter((q) => q.slug !== session.quizSlug && q.category === (quiz?.category ?? "couples"))
    .slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Result card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="card-base p-6 sm:p-8 text-center mb-6"
        role="region"
        aria-label="Quiz results"
      >
        {/* Result emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl sm:text-7xl mb-4"
          role="img"
          aria-label={result?.emoji ?? "🎉"}
        >
          {result?.emoji ?? "🎉"}
        </motion.div>

        {/* Result title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3 leading-tight"
        >
          {result?.title ?? "You did it!"}
        </motion.h1>

        {/* Score */}
        {session.maxScore > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-1 mb-4"
          >
            <div
              className="text-5xl font-display font-bold"
              style={{ color: result?.color ?? "#ec4899" }}
            >
              <CountUpNumber target={session.percentage} />
              %
            </div>
          </motion.div>
        )}

        {/* Score bar */}
        {session.maxScore > 0 && (
          <div className="h-3 bg-pink-100 rounded-full overflow-hidden mb-5 mx-auto max-w-xs">
            <motion.div
              className="h-full rounded-full"
              style={{ background: result?.color ?? "#ec4899" }}
              initial={{ width: "0%" }}
              animate={{ width: `${session.percentage}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Description */}
        {result?.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6"
          >
            {result.description}
          </motion.p>
        )}

        {/* Disclaimer */}
        {quiz?.disclaimer && (
          <p className="text-xs text-[var(--color-text-muted)] italic mb-6 max-w-sm mx-auto">
            {quiz.disclaimer}
          </p>
        )}

        {/* Share actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button variant="primary" onClick={handleNativeShare} size="md">
            <Share2 className="h-4 w-4" />
            Share Result
          </Button>

          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 text-sm"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="h-4 w-4 text-green-500" />
            WhatsApp
          </a>

          <button
            onClick={handleCopyLink}
            className="btn-secondary flex items-center gap-2 text-sm"
            aria-label={copied ? "Link copied!" : "Copy quiz link"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Play again */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center mb-8"
      >
        <Button variant="secondary" size="md" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          Play Again
        </Button>
      </motion.div>

      {/* Related quizzes */}
      {relatedQuizzes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedQuizzes.map((q) => (
              <Link
                key={q.id}
                href={`/quizzes/${q.slug}`}
                className="group flex items-center gap-3 p-3.5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-pink-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl" aria-hidden="true">{q.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-pink-600 transition-colors line-clamp-1">
                    {q.title}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-pink-300 flex-shrink-0 group-hover:text-pink-500 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
