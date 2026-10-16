"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { thisOrThatItems } from "@/data/games";
import { shuffle, cn } from "@/lib/utils";

export default function ThisOrThatPage() {
  const [items] = useState(() => shuffle(thisOrThatItems));
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"A" | "B" | null>(null);
  const [scores, setScores] = useState({ A: 0, B: 0 });

  const current = items[index % items.length];
  const total = items.length;
  const isDone = index >= total;

  const handleChoice = useCallback(
    (c: "A" | "B") => {
      if (choice) return;
      setChoice(c);
      setScores((s) => ({ ...s, [c]: s[c] + 1 }));
    },
    [choice]
  );

  const handleNext = useCallback(() => {
    setChoice(null);
    setIndex((i) => i + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setChoice(null);
    setIndex(0);
    setScores({ A: 0, B: 0 });
  }, []);

  if (isDone) {
    const winner = scores.A >= scores.B ? "A" : "B";
    return (
      <div className="container py-8 sm:py-12 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="card-base p-8"
        >
          <div className="text-6xl mb-4" role="img" aria-label="Party">🎉</div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            You&apos;re Done!
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-2">
            You chose <strong className="text-pink-600">Option A</strong> {scores.A} times
          </p>
          <p className="text-[var(--color-text-secondary)] mb-6">
            You chose <strong className="text-lavender-600">Option B</strong> {scores.B} times
          </p>
          <p className="font-semibold text-[var(--color-text-primary)] mb-8">
            Overall preference: <span className={winner === "A" ? "text-pink-600" : "text-lavender-600"}>Side {winner} wins!</span>
          </p>
          <Button variant="primary" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" /> Play Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3" role="img" aria-label="Lightning">⚡</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          This or That
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Quick picks — what&apos;s your vibe?
        </p>
      </div>

      <p className="text-center text-sm text-[var(--color-text-muted)] mb-6">
        {index + 1} of {total}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            {(["A", "B"] as const).map((side) => {
              const opt = side === "A" ? current.optionA : current.optionB;
              const emoji = side === "A" ? current.emojiA : current.emojiB;
              const colors =
                side === "A"
                  ? { bg: "from-pink-400 to-rose-500", selected: "border-pink-500 bg-pink-50 text-pink-700", hover: "hover:border-pink-300 hover:bg-pink-50/40" }
                  : { bg: "from-violet-400 to-purple-500", selected: "border-lavender-500 bg-lavender-50 text-lavender-700", hover: "hover:border-lavender-300 hover:bg-lavender-50/40" };

              return (
                <motion.button
                  key={side}
                  whileHover={{ scale: choice ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoice(side)}
                  disabled={!!choice}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border-2 transition-all duration-200 text-center cursor-pointer min-h-[160px] gap-3",
                    choice === side
                      ? colors.selected
                      : choice
                      ? "border-[var(--color-border)] bg-white opacity-50"
                      : `border-[var(--color-border)] bg-white ${colors.hover}`
                  )}
                  aria-pressed={choice === side}
                  aria-label={`Choose ${opt}`}
                >
                  <span className="text-4xl sm:text-5xl" role="img" aria-hidden="true">{emoji}</span>
                  <span className="font-bold text-base sm:text-lg leading-snug">{opt}</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {choice && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Button variant="primary" size="md" onClick={handleNext}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-8">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-pink-500 transition-colors mx-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </div>
    </div>
  );
}
