"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, Users, Clock, Play, Share2, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { QuizResults } from "@/components/quiz/quiz-results";
import type { Quiz, QuizSession } from "@/types/quiz";
import { formatCount } from "@/lib/utils";

type Phase = "intro" | "playing" | "results";

interface QuizDetailClientProps {
  quiz: Quiz;
  estimatedMinutes: number;
}

export function QuizDetailClient({ quiz, estimatedMinutes }: QuizDetailClientProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [session, setSession] = useState<QuizSession | null>(null);

  const handleStart = () => setPhase("playing");

  const handleComplete = (s: QuizSession) => {
    setSession(s);
    setPhase("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setSession(null);
    setPhase("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (phase === "playing") {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-pink-500 transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to quiz info
        </button>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
          {quiz.title}
        </h1>
        <QuizPlayer quiz={quiz} onComplete={handleComplete} />
      </div>
    );
  }

  if (phase === "results" && session) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-pink-500 transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to quiz info
        </button>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
          Your Results
        </h1>
        <QuizResults session={session} onRestart={handleRestart} />
      </div>
    );
  }

  // Intro phase
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <li><Link href="/" className="hover:text-pink-500 transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/quizzes" className="hover:text-pink-500 transition-colors">Quizzes</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px]" aria-current="page">
            {quiz.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`h-44 sm:h-56 lg:h-64 rounded-3xl bg-gradient-to-br ${quiz.coverGradient} flex items-center justify-center mb-6 relative overflow-hidden`}
          >
            <div className="text-7xl sm:text-8xl" role="img" aria-label={quiz.title}>
              {quiz.emoji}
            </div>
            {quiz.isTrending && (
              <div className="absolute top-4 left-4">
                <Badge variant="dark">
                  <Zap className="h-3 w-3" /> Trending
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Title & meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="pink">{quiz.category}</Badge>
              {quiz.difficulty && (
                <Badge variant="lavender">{quiz.difficulty}</Badge>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-3 leading-tight">
              {quiz.title}
            </h1>

            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-4">
              {quiz.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-6">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-pink-400" />
                {formatCount(quiz.playCount)} plays
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-pink-400" />
                ~{estimatedMinutes} minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-pink-400 fill-pink-200" />
                {quiz.questions.length} questions
              </span>
            </div>

            {/* What to expect */}
            <div className="card-base p-4 sm:p-5 mb-6">
              <h2 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-3">
                What to Expect
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-pink-400 mt-0.5">✓</span>
                  {quiz.questions.length} carefully crafted questions
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-pink-400 mt-0.5">✓</span>
                  Personalized result based on your answers
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-pink-400 mt-0.5">✓</span>
                  Shareable result — challenge your partner or friends!
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-pink-400 mt-0.5">✓</span>
                  No account required, completely free
                </li>
              </ul>
            </div>

            {quiz.disclaimer && (
              <p className="text-xs text-[var(--color-text-muted)] italic mb-6">
                {quiz.disclaimer}
              </p>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="card-base p-5 sm:p-6 sticky top-24">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3" aria-hidden="true">{quiz.emoji}</div>
              <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                Ready to Play?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                ~{estimatedMinutes} min · {quiz.questions.length} questions
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mb-3"
              onClick={handleStart}
            >
              <Play className="h-5 w-5 fill-white" />
              Start Quiz
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              asChild
            >
              <Link href={`/quizzes/${quiz.slug}`}>
                <Share2 className="h-4 w-4" />
                Share Quiz
              </Link>
            </Button>

            {/* Tags */}
            {quiz.tags.length > 0 && (
              <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2.5">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quiz.tags.map((tag) => (
                    <Badge key={tag} variant="cream" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
