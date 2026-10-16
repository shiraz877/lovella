"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type FlamesResult = "Friends" | "Love" | "Affection" | "Marriage" | "Enemy" | "Siblings";

const FLAMES_MEANINGS: Record<FlamesResult, { desc: string; emoji: string; color: string }> = {
  Friends:  { desc: "You two are destined to be great friends!", emoji: "👫", color: "from-sky-400 to-blue-500" },
  Love:     { desc: "Love is in the air between you two! ❤️", emoji: "💕", color: "from-rose-400 to-pink-500" },
  Affection:{ desc: "There's a warm, genuine affection between you.", emoji: "💗", color: "from-pink-400 to-rose-500" },
  Marriage: { desc: "Wedding bells are ringing for you both! 💍", emoji: "💍", color: "from-amber-400 to-yellow-500" },
  Enemy:    { desc: "Rivals make the best stories — stay interesting!", emoji: "😤", color: "from-orange-400 to-red-500" },
  Siblings: { desc: "You bicker like siblings but care just as much.", emoji: "🤝", color: "from-emerald-400 to-teal-500" },
};

const FLAMES_LABELS: FlamesResult[] = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];

function calculateFlames(name1: string, name2: string): FlamesResult {
  const n1 = name1.toLowerCase().replace(/\s/g, "");
  const n2 = name2.toLowerCase().replace(/\s/g, "");

  // Count common letters
  let common = 0;
  const a = n1.split("");
  const b = n2.split("");
  for (let i = 0; i < a.length; i++) {
    const idx = b.indexOf(a[i]);
    if (idx !== -1) {
      common++;
      b.splice(idx, 1);
    }
  }
  const remaining = n1.length + n2.length - 2 * common;
  const count = remaining === 0 ? 1 : remaining;

  // FLAMES elimination
  let flames = [...FLAMES_LABELS];
  let elimIdx = 0;
  while (flames.length > 1) {
    elimIdx = (elimIdx + count - 1) % flames.length;
    flames.splice(elimIdx, 1);
    if (elimIdx >= flames.length) elimIdx = 0;
  }
  return flames[0];
}

export default function FlamesPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    setAnimating(true);
    setTimeout(() => {
      setResult(calculateFlames(name1.trim(), name2.trim()));
      setAnimating(false);
    }, 800);
  };

  const handleReset = () => {
    setResult(null);
    setName1("");
    setName2("");
    setAnimating(false);
  };

  const info = result ? FLAMES_MEANINGS[result] : null;

  return (
    <div className="container py-8 sm:py-12 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3" role="img" aria-label="Fire">🔥</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          FLAMES Game
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Find out your relationship status!
        </p>
      </div>

      <div className="card-base p-6 sm:p-8 mb-6">
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name1" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
              Your Name
            </label>
            <input
              id="name1"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value.slice(0, 50))}
              placeholder="Enter your name..."
              className="w-full h-12 px-4 rounded-2xl border-2 border-[var(--color-border)] text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              maxLength={50}
            />
          </div>
          <div>
            <label htmlFor="name2" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
              Their Name
            </label>
            <input
              id="name2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value.slice(0, 50))}
              placeholder="Enter their name..."
              className="w-full h-12 px-4 rounded-2xl border-2 border-[var(--color-border)] text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              maxLength={50}
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
          🔥 Calculate FLAMES
        </Button>
      </div>

      <AnimatePresence>
        {result && info && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="card-base p-6 sm:p-8 text-center"
          >
            <div
              className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${info.color} flex items-center justify-center text-4xl shadow-lg mx-auto mb-4`}
              role="img"
              aria-label={info.emoji}
            >
              {info.emoji}
            </div>
            <p className="text-[var(--color-text-muted)] text-sm mb-1">
              {name1} &amp; {name2}
            </p>
            <h2 className="font-display text-3xl font-bold text-gradient-brand mb-3">
              {result}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">{info.desc}</p>
            <p className="text-xs text-[var(--color-text-muted)] italic mb-6">
              For entertainment purposes only! 😄
            </p>
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLAMES legend */}
      <div className="mt-8">
        <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)] mb-3">
          What does FLAMES stand for?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {FLAMES_LABELS.map((l) => (
            <div
              key={l}
              className={`p-3 rounded-xl border border-[var(--color-border)] text-center text-sm font-semibold ${result === l ? "bg-pink-50 border-pink-200 text-pink-700" : "bg-white text-[var(--color-text-secondary)]"}`}
            >
              <span className="block text-lg mb-0.5">{FLAMES_MEANINGS[l].emoji}</span>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
