"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  User,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SharedQuiz, QuizAnswer } from "@/types/quiz";
import confetti from "canvas-confetti";

interface PlayPageProps {
  params: Promise<{ shareId: string }>;
}

export default function PlaySharedQuizPage({ params }: PlayPageProps) {
  const resolvedParams = use(params);
  const shareId = resolvedParams.shareId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [quiz, setQuiz] = useState<SharedQuiz | null>(null);

  // Gameplay state
  const [participantName, setParticipantName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    maxScore: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`/api/quizzes/${shareId}`);
        const data = await res.json();

        if (!res.ok) {
          if (data.isExpired) {
            setIsExpired(true);
          } else {
            setError(data.error || "Quiz not found");
          }
          return;
        }

        setQuiz(data.quiz);
      } catch {
        setError("Failed to load this quiz. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [shareId]);

  // Handle celebration on result
  useEffect(() => {
    if (result && result.percentage >= 60) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#8b5cf6", "#f43f5e", "#fbbf24"],
      });
    }
  }, [result]);

  if (loading) {
    return (
      <div className="container py-24 text-center">
        <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--color-text-secondary)] font-medium">Loading quiz...</p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="container py-20 max-w-md mx-auto text-center">
        <div className="card-base p-8">
          <div className="text-5xl mb-4">⌛</div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Quiz Expired
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">
            This quiz link has expired and is no longer accepting new submissions.
          </p>
          <Button variant="primary" asChild>
            <Link href="/create">Create Your Own Quiz</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container py-20 max-w-md mx-auto text-center">
        <div className="card-base p-8">
          <div className="text-5xl mb-4">💔</div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Quiz Not Found
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">
            The link you opened might be broken or was removed by its creator.
          </p>
          <Button variant="primary" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // 1. Result screen
  if (result) {
    return (
      <div className="container py-12 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-base p-8 sm:p-10"
        >
          <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 text-3xl">
            {result.percentage >= 80 ? "🏆" : result.percentage >= 50 ? "💖" : "🌱"}
          </div>

          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            {participantName}, Your Result!
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">
            {quiz.creatorName
              ? `You took ${quiz.creatorName}'s quiz: "${quiz.title}"`
              : `You completed "${quiz.title}"`}
          </p>

          {/* Score counter */}
          <div className="mb-6 p-6 rounded-2xl bg-pink-50/60 border border-pink-100 inline-block w-full">
            <span className="text-5xl font-display font-bold text-pink-600">
              {result.percentage}%
            </span>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">
              {result.score} out of {result.maxScore} correct
            </p>
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
            {result.percentage >= 80
              ? "Incredible! You know them better than almost anyone else! True connection. ✨"
              : result.percentage >= 50
              ? "Good score! You know the big things, but there are always new fun details to discover together."
              : "Looks like you have plenty of fun conversations and hangouts ahead to learn more about each other!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" asChild>
              <Link href="/create">
                <Sparkles className="w-4 h-4" />
                Make Your Own Quiz for Them
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/quizzes">Play More Quizzes</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Welcome / Name prompt screen
  if (!hasStarted) {
    return (
      <div className="container py-12 max-w-lg mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card-base p-6 sm:p-10 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            💌
          </div>

          <Badge variant="pink" size="sm" className="mb-3">
            Shared Quiz
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            {quiz.title}
          </h1>

          {quiz.creatorName && (
            <p className="text-sm font-semibold text-pink-600 mb-2">
              Created with love by {quiz.creatorName}
            </p>
          )}

          {quiz.description && (
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] italic mb-6">
              &quot;{quiz.description}&quot;
            </p>
          )}

          <div className="text-left mb-6">
            <label className="block text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-2">
              Enter your name to begin
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="e.g. Jordan"
                maxLength={50}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && participantName.trim()) {
                    setHasStarted(true);
                  }
                }}
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!participantName.trim()}
            onClick={() => setHasStarted(true)}
          >
            Start Quiz ({quiz.questions.length} questions)
          </Button>
        </motion.div>
      </div>
    );
  }

  // 3. Question active player
  const currentQ = quiz.questions[currentIndex];
  const currentSelected = answers[currentQ.id] || [];
  const isLast = currentIndex === quiz.questions.length - 1;

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: [optId],
    }));
  };

  const handleNext = async () => {
    if (currentSelected.length === 0) return;

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    // Submit answers
    setIsSubmitting(true);
    try {
      const submissionAnswers: QuizAnswer[] = Object.entries(answers).map(
        ([questionId, selectedIds]) => ({
          questionId,
          selectedIds,
        })
      );

      const res = await fetch(`/api/quizzes/${shareId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: participantName.trim(),
          answers: submissionAnswers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setResult({
        score: data.score,
        maxScore: data.maxScore,
        percentage: data.percentage,
      });
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 sm:py-12 max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>
          Question {currentIndex + 1} of {quiz.questions.length}
        </span>
        <span className="font-semibold text-pink-600">{participantName}</span>
      </div>

      <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-pink-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question Card */}
      <div className="card-base p-6 sm:p-8">
        <div className="text-3xl mb-3 text-center" role="img" aria-hidden="true">
          {currentQ.emoji || "💖"}
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] text-center mb-6">
          {currentQ.text}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt) => {
            const isSelected = currentSelected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? "border-pink-500 bg-pink-50/70 text-pink-900 shadow-sm"
                    : "border-[var(--color-border)] hover:border-pink-200 text-[var(--color-text-primary)]"
                }`}
              >
                <span>{opt.text}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={currentSelected.length === 0 || isSubmitting}
          loading={isSubmitting}
          onClick={handleNext}
        >
          {isLast ? "Complete Quiz & View Score" : "Next Question"}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
