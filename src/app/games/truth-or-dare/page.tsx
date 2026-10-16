"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, ChevronRight, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { truthOrDareItems } from "@/data/games";
import { shuffle, cn } from "@/lib/utils";

type Mode = "truth" | "dare" | null;
type Intensity = "mild" | "medium" | "spicy";

export default function TruthOrDarePage() {
  const [items] = useState(() => shuffle(truthOrDareItems));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [intensity, setIntensity] = useState<Intensity>("mild");

  const filtered = items.filter((item) => item.intensity === intensity || intensity === "mild");
  const current = filtered[index % Math.max(filtered.length, 1)];

  const handleReveal = (mode: Mode) => {
    if (!mode) return;
    setRevealed(true);
  };

  const handleNext = useCallback(() => {
    setRevealed(false);
    setIndex((i) => i + 1);
  }, []);

  const handleRestart = () => {
    setIndex(0);
    setRevealed(false);
  };

  const intensityConfig: Record<Intensity, { label: string; color: string }> = {
    mild: { label: "Mild 😊", color: "from-emerald-400 to-teal-500" },
    medium: { label: "Medium 🌶️", color: "from-amber-400 to-orange-500" },
    spicy: { label: "Spicy 🔥", color: "from-rose-400 to-red-500" },
  };

  return (
    <div className="container py-8 sm:py-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3" role="img" aria-label="Dice">🎲</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Truth or Dare
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Take turns picking truth or dare!
        </p>
      </div>

      {/* Intensity selector */}
      <div className="flex justify-center gap-2 mb-8" role="group" aria-label="Select intensity">
        {(Object.entries(intensityConfig) as [Intensity, (typeof intensityConfig)[Intensity]][]).map(
          ([key, cfg]) => (
            <button
              key={key}
              onClick={() => { setIntensity(key); handleRestart(); }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-all border-2",
                intensity === key
                  ? `bg-gradient-to-r ${cfg.color} text-white border-transparent shadow-md`
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-pink-200"
              )}
              aria-pressed={intensity === key}
            >
              {cfg.label}
            </button>
          )
        )}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="choose"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="card-base p-6 sm:p-10 text-center mb-6"
          >
            <p className="text-[var(--color-text-secondary)] text-base mb-8">
              {current ? "Pick your challenge:" : "No questions for this intensity."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleReveal("truth")}
                className="p-6 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white font-display font-bold text-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-2"
                aria-label="Choose Truth"
              >
                <Lock className="h-8 w-8" />
                Truth
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleReveal("dare")}
                className="p-6 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white font-display font-bold text-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-2"
                aria-label="Choose Dare"
              >
                <Zap className="h-8 w-8" />
                Dare
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ scale: 0.85, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="card-base p-6 sm:p-10 text-center mb-6"
          >
            <Badge
              variant={current?.type === "truth" ? "lavender" : "coral"}
              size="lg"
              className="mb-5 capitalize"
            >
              {current?.type === "truth" ? "🔒 Truth" : "⚡ Dare"}
            </Badge>
            <p className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] leading-snug mb-8">
              {current?.text ?? "Pick another challenge!"}
            </p>
            <Button variant="primary" onClick={handleNext}>
              Next Challenge <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
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
