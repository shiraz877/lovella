"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Quiz, QuizAnswer, QuizSession } from "@/types/quiz";
import { buildSession } from "@/lib/quiz-engine";
import { cn } from "@/lib/utils";

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (session: QuizSession) => void;
}

type SelectionState = Record<string, string[]>;

const questionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export function QuizPlayer({ quiz, onComplete }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<SelectionState>({});
  const [direction, setDirection] = useState(1);
  const [startedAt] = useState(() => Date.now());
  const [isCompleting, setIsCompleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;
  const currentSelections = selections[currentQuestion?.id] ?? [];
  const hasAnswer = currentSelections.length > 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && hasAnswer) handleNext();
      if (e.key === "ArrowLeft" && currentIndex > 0) handleBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnswer, currentIndex]);

  const handleSelect = useCallback(
    (optionId: string) => {
      setSelections((prev) => {
        const current = prev[currentQuestion.id] ?? [];
        const isSingle = currentQuestion.type === "single";
        const maxSelections = currentQuestion.maxSelections ?? Infinity;

        if (isSingle) {
          return { ...prev, [currentQuestion.id]: [optionId] };
        }

        if (current.includes(optionId)) {
          return { ...prev, [currentQuestion.id]: current.filter((id) => id !== optionId) };
        }

        if (current.length >= maxSelections) return prev;
        return { ...prev, [currentQuestion.id]: [...current, optionId] };
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (!hasAnswer) return;
    if (isLastQuestion) {
      handleComplete();
      return;
    }
    setDirection(1);
    setCurrentIndex((i) => i + 1);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hasAnswer, isLastQuestion]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex]);

  const handleComplete = useCallback(() => {
    setIsCompleting(true);
    const answers: QuizAnswer[] = quiz.questions.map((q) => ({
      questionId: q.id,
      selectedIds: selections[q.id] ?? [],
    }));
    const session = buildSession(quiz, answers, startedAt);
    setTimeout(() => onComplete(session), 400);
  }, [quiz, selections, startedAt, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelections({});
    setDirection(1);
    setIsCompleting(false);
  }, []);

  if (!currentQuestion) return null;

  return (
    <div
      ref={containerRef}
      className="card-base p-5 sm:p-8 max-w-2xl mx-auto"
      role="main"
      aria-label={`Quiz: ${quiz.title}`}
    >
      {/* Progress */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mb-2.5">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-pink-500 transition-colors"
            aria-label="Restart quiz"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
        </div>
        <div
          className="h-2 bg-pink-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
          aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full origin-left"
            animate={{ scaleX: (currentIndex) / totalQuestions || 0.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Step dots */}
        <div className="flex gap-1.5 mt-3 justify-center" aria-hidden="true">
          {quiz.questions.map((q, i) => (
            <div
              key={q.id}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i < currentIndex
                  ? "bg-pink-400 w-4"
                  : i === currentIndex
                  ? "bg-pink-500 w-6"
                  : "bg-pink-100 w-1.5"
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestion.id}
          custom={direction}
          variants={questionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Question text */}
          <div className="mb-6 sm:mb-8">
            {currentQuestion.emoji && (
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4" role="img" aria-hidden="true">
                {currentQuestion.emoji}
              </div>
            )}
            <h2
              id={`question-${currentQuestion.id}`}
              className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] leading-snug"
            >
              {currentQuestion.text}
            </h2>
            {currentQuestion.type === "multi" && (
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                Select all that apply
                {currentQuestion.maxSelections ? ` (up to ${currentQuestion.maxSelections})` : ""}
              </p>
            )}
          </div>

          {/* Options */}
          <fieldset aria-labelledby={`question-${currentQuestion.id}`}>
            <legend className="sr-only">{currentQuestion.text}</legend>
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = currentSelections.includes(option.id);
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option.id)}
                    role={currentQuestion.type === "multi" ? "checkbox" : "radio"}
                    aria-checked={isSelected}
                    className={cn(
                      "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500",
                      "min-h-[44px]",
                      isSelected
                        ? "border-pink-400 bg-pink-50 shadow-[0_0_0_2px_rgba(236,72,153,0.2)]"
                        : "border-[var(--color-border)] bg-white hover:border-pink-200 hover:bg-pink-50/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Selection indicator */}
                      <div
                        className={cn(
                          "flex-shrink-0 h-5 w-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                          currentQuestion.type === "multi" ? "rounded-lg" : "rounded-full",
                          isSelected
                            ? "border-pink-500 bg-pink-500"
                            : "border-[var(--color-border-strong)] bg-white"
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Option text */}
                      <span
                        className={cn(
                          "text-sm sm:text-base font-medium leading-snug flex-1",
                          isSelected ? "text-pink-700" : "text-[var(--color-text-primary)]"
                        )}
                      >
                        {option.emoji && (
                          <span className="mr-2" role="img" aria-hidden="true">
                            {option.emoji}
                          </span>
                        )}
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-[var(--color-border)]">
        <Button
          variant="ghost"
          size="md"
          onClick={handleBack}
          disabled={currentIndex === 0}
          aria-label="Previous question"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          disabled={!hasAnswer || isCompleting}
          loading={isCompleting && isLastQuestion}
          aria-label={isLastQuestion ? "Submit quiz" : "Next question"}
        >
          {isLastQuestion ? "See Results" : "Next"}
          {!isLastQuestion && <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
