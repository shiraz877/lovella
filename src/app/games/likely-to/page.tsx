"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whoIsMoreLikelyItems } from "@/data/games";
import { shuffle } from "@/lib/utils";

const PLAYERS = ["Player 1", "Player 2"];

export default function LikelyToPage() {
  const [items] = useState(() => shuffle(whoIsMoreLikelyItems));
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({ "Player 1": 0, "Player 2": 0 });
  const [players, setPlayers] = useState(PLAYERS);
  const [editingPlayers, setEditingPlayers] = useState(false);

  const current = items[index % items.length];
  const isDone = index >= items.length;

  const handleChoice = (player: string) => {
    if (choice) return;
    setChoice(player);
    setScores((s) => ({ ...s, [player]: (s[player] ?? 0) + 1 }));
  };

  const handleNext = () => {
    setChoice(null);
    setIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setChoice(null);
    setIndex(0);
    setScores(Object.fromEntries(players.map((p) => [p, 0])));
  };

  if (isDone) {
    const winner = players.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b);
    return (
      <div className="container py-8 sm:py-12 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="card-base p-8"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Results!
          </h1>
          {players.map((p) => (
            <p key={p} className="text-[var(--color-text-secondary)] mb-1">
              <strong>{p}</strong>: {scores[p] ?? 0} votes
            </p>
          ))}
          <p className="font-display text-xl font-bold text-pink-600 mt-4 mb-8">
            Most Likely: {winner} 👑
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
        <div className="text-5xl mb-3" role="img" aria-label="Point">👉</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Who Is More Likely To?
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Point at whoever fits best!
        </p>
      </div>

      {/* Player names */}
      {!editingPlayers ? (
        <div className="flex justify-center gap-3 mb-8">
          {players.map((p) => (
            <span key={p} className="px-4 py-1.5 rounded-full bg-pink-50 text-pink-700 font-semibold text-sm">
              {p}: {scores[p] ?? 0}
            </span>
          ))}
          <button
            onClick={() => setEditingPlayers(true)}
            className="text-xs text-[var(--color-text-muted)] hover:text-pink-500 transition-colors underline"
          >
            Edit names
          </button>
        </div>
      ) : (
        <div className="card-base p-4 mb-8 flex flex-col gap-3">
          {players.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-muted)] w-16">Player {i + 1}</span>
              <input
                value={p}
                onChange={(e) => {
                  const next = [...players];
                  next[i] = e.target.value;
                  setPlayers(next);
                }}
                className="flex-1 h-9 px-3 rounded-xl border-2 border-[var(--color-border)] text-sm focus:border-pink-300 focus:outline-none"
                placeholder={`Player ${i + 1}`}
              />
            </div>
          ))}
          <Button variant="secondary" size="sm" onClick={() => { setEditingPlayers(false); handleRestart(); }}>
            Save & Restart
          </Button>
        </div>
      )}

      <p className="text-center text-sm text-[var(--color-text-muted)] mb-6">
        {index + 1} of {items.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="card-base p-6 sm:p-8 text-center mb-6">
            <div className="text-5xl mb-4" role="img" aria-hidden="true">{current.emoji}</div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-8">
              Who is more likely to {current.prompt}?
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {players.map((player, i) => (
                <motion.button
                  key={player}
                  whileHover={{ scale: choice ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoice(player)}
                  disabled={!!choice}
                  className={[
                    "p-5 rounded-2xl border-2 font-bold text-base transition-all duration-200 cursor-pointer min-h-[80px]",
                    choice === player
                      ? i === 0
                        ? "border-pink-500 bg-pink-50 text-pink-700"
                        : "border-lavender-500 bg-lavender-50 text-lavender-700"
                      : choice
                      ? "border-[var(--color-border)] bg-white opacity-50"
                      : i === 0
                      ? "border-[var(--color-border)] bg-white hover:border-pink-300 hover:bg-pink-50/40"
                      : "border-[var(--color-border)] bg-white hover:border-lavender-300 hover:bg-lavender-50/40",
                  ].join(" ")}
                  aria-pressed={choice === player}
                >
                  {player}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {choice && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    <strong className="text-pink-600">{choice}</strong> gets the vote!
                  </p>
                  <Button variant="primary" onClick={handleNext}>
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
