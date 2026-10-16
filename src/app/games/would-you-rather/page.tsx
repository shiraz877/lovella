"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { wouldYouRatherQuestions } from "@/data/games";
import { shuffle } from "@/lib/utils";

type Choice = "A" | "B" | null;

export default function WouldYouRatherPage() {
  const [questions] = useState(() => shuffle(wouldYouRatherQuestions));
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<Choice>(null);
  const [direction, setDirection] = useState(1);

  const current = questions[index];
  const total = questions.length;

  const handleChoice = useCallback(
    (c: "A" | "B") => {
      if (choice) return;
      setChoice(c);
    },
    [choice]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setChoice(null);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const handleRestart = useCallback(() => {
    setChoice(null);
    setIndex(0);
    setDirection(1);
  }, []);

  if (!current) return null;

  return (
    <div className="container py-8 sm:py-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3" role="img" aria-label="Thinking">🤔</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Would You Rather?
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Choose your answer — there&apos;s no right or wrong!
        </p>
      </div>

      {/* Progress */}
      <div className="text-center text-sm text-[var(--color-text-muted)] mb-6">
        Question {index + 1} of {total}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="card-base p-5 sm:p-8 mb-5">
            {/* Badge */}
            <div className="text-center mb-6">
              <Badge variant="pink" size="sm" className="capitalize">{current.category}</Badge>
            </div>

            {/* The VS layout */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
              {/* Option A */}
              <motion.button
                onClick={() => handleChoice("A")}
                whileTap={{ scale: 0.97 }}
                disabled={!!choice}
                className={[
                  "p-5 sm:p-6 rounded-2xl border-2 text-left transition-all duration-200 text-base font-semibold leading-snug min-h-[100px] flex items-center cursor-pointer",
                  choice === "A"
                    ? "border-pink-500 bg-pink-50 text-pink-700 shadow-[0_0_0_3px_rgba(236,72,153,0.15)]"
                    : choice === "B"
                    ? "border-pink-100 bg-pink-50/30 text-[var(--color-text-muted)] opacity-60"
                    : "border-[var(--color-border)] bg-white hover:border-pink-300 hover:bg-pink-50/40 text-[var(--color-text-primary)]",
                ].join(" ")}
                aria-label={`Choose: ${current.optionA}`}
                aria-pressed={choice === "A"}
              >
                <span>{current.optionA}</span>
              </motion.button>

              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-md">
                  OR
                </div>
              </div>

              {/* Option B */}
              <motion.button
                onClick={() => handleChoice("B")}
                whileTap={{ scale: 0.97 }}
                disabled={!!choice}
                className={[
                  "p-5 sm:p-6 rounded-2xl border-2 text-left transition-all duration-200 text-base font-semibold leading-snug min-h-[100px] flex items-center cursor-pointer",
                  choice === "B"
                    ? "border-lavender-500 bg-lavender-50 text-lavender-700 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                    : choice === "A"
                    ? "border-lavender-100 bg-lavender-50/30 text-[var(--color-text-muted)] opacity-60"
                    : "border-[var(--color-border)] bg-white hover:border-lavender-300 hover:bg-lavender-50/40 text-[var(--color-text-primary)]",
                ].join(" ")}
                aria-label={`Choose: ${current.optionB}`}
                aria-pressed={choice === "B"}
              >
                <span>{current.optionB}</span>
              </motion.button>
            </div>

            {/* After choice reveal */}
            <AnimatePresence>
              {choice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-6 pt-6 border-t border-[var(--color-border)]"
                >
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    You chose:{" "}
                    <strong className={choice === "A" ? "text-pink-600" : "text-lavender-600"}>
                      {choice === "A" ? current.optionA : current.optionB}
                    </strong>
                  </p>
                  <Button variant="primary" size="md" onClick={handleNext}>
                    Next Question <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Restart */}
      <div className="text-center">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-pink-500 transition-colors mx-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Start over
        </button>
      </div>
    </div>
  );
}
