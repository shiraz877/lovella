"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function loveCalculate(n1: string, n2: string): number {
  // Deterministic "fun" calculation
  const combined = (n1 + n2).toLowerCase().replace(/\s/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }
  const pct = Math.abs(hash) % 101;
  return pct;
}

function getCompatibilityMessage(score: number): { title: string; desc: string; color: string } {
  if (score >= 90) return { title: "Soulmates! 💍", desc: "The universe conspired to bring you together. This connection is something rare and beautiful!", color: "#ec4899" };
  if (score >= 75) return { title: "Great Match! 💕", desc: "You have wonderful chemistry and complementing qualities. A beautiful relationship awaits!", color: "#f472b6" };
  if (score >= 60) return { title: "Strong Connection! 💗", desc: "There's genuine warmth between you. With a little nurturing, this could become something special.", color: "#fb7185" };
  if (score >= 45) return { title: "Promising! 💛", desc: "You have real potential together. Explore your connection and see where it leads!", color: "#fbbf24" };
  if (score >= 30) return { title: "Opposites Attract! 🌸", desc: "Your differences could be your strength! Sometimes contrast creates the most interesting stories.", color: "#a78bfa" };
  return { title: "Adventure Ahead! ✨", desc: "Sometimes the most unexpected connections lead to the greatest stories. Give it time!", color: "#06b6d4" };
}

export default function LoveCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    setAnimating(true);
    setScore(null);
    setTimeout(() => {
      setScore(loveCalculate(name1.trim(), name2.trim()));
      setAnimating(false);
    }, 1200);
  };

  const handleReset = () => {
    setScore(null);
    setName1("");
    setName2("");
  };

  const result = score !== null ? getCompatibilityMessage(score) : null;

  return (
    <div className="container py-8 sm:py-12 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-3"
          role="img"
          aria-label="Heart"
        >
          ❤️
        </motion.div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Love Calculator
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          How compatible are you? Find out for fun!
        </p>
      </div>

      <div className="card-base p-6 sm:p-8 mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label htmlFor="love-name1" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
              Your Name
            </label>
            <input
              id="love-name1"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value.slice(0, 50))}
              placeholder="Enter your name..."
              className="w-full h-12 px-4 rounded-2xl border-2 border-[var(--color-border)] text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>

          {/* Hearts connector */}
          <div className="flex items-center justify-center gap-2 text-pink-400">
            <Heart className="h-5 w-5 fill-pink-200" />
            <span className="text-sm font-semibold text-[var(--color-text-muted)]">+</span>
            <Heart className="h-5 w-5 fill-pink-200" />
          </div>

          <div>
            <label htmlFor="love-name2" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
              Their Name
            </label>
            <input
              id="love-name2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value.slice(0, 50))}
              placeholder="Enter their name..."
              className="w-full h-12 px-4 rounded-2xl border-2 border-[var(--color-border)] text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleCalculate}
          loading={animating}
          disabled={!name1.trim() || !name2.trim() || animating}
        >
          <Heart className="h-5 w-5 fill-white" />
          Calculate Love Score
        </Button>
      </div>

      <AnimatePresence>
        {score !== null && result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="card-base p-6 sm:p-8 text-center"
          >
            {/* Names */}
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              {name1} &amp; {name2}
            </p>

            {/* Score */}
            <div className="relative h-32 w-32 mx-auto mb-5">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#ffd6e8" strokeWidth="10" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={result.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="font-display text-3xl font-bold" style={{ color: result.color }}>
                  {score}%
                </span>
                <span className="text-[0.65rem] text-[var(--color-text-muted)]">match</span>
              </div>
            </div>

            <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              {result.title}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">{result.desc}</p>
            <p className="text-xs text-[var(--color-text-muted)] italic mb-6">
              Just for fun — real love takes real effort! 💪
            </p>
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
