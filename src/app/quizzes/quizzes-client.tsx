"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Users, Clock, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Quiz } from "@/types/quiz";
import { CATEGORIES } from "@/data/quizzes";
import { formatCount, estimateTime, cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type SortOption = "popular" | "newest";

interface QuizzesPageClientProps {
  quizzes: Quiz[];
  categories: typeof CATEGORIES;
}

export function QuizzesPageClient({ quizzes, categories }: QuizzesPageClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let list = [...quizzes];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q) ||
          quiz.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      list = list.filter((quiz) => quiz.category === category);
    }

    if (sort === "popular") {
      list.sort((a, b) => b.playCount - a.playCount);
    } else {
      list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return list;
  }, [quizzes, search, category, sort]);

  return (
    <>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-10"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
          Explore Quizzes
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Find the perfect quiz to share with your partner or best friend
        </p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-7 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10 pr-10 rounded-2xl border-2 border-[var(--color-border)] bg-white text-sm transition-all focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 placeholder:text-[var(--color-text-muted)]"
            aria-label="Search quizzes"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full hover:bg-pink-50 text-[var(--color-text-muted)]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
          role="group"
          aria-label="Filter by category"
        >
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "flex-shrink-0 h-9 px-4 rounded-full text-sm font-semibold border-2 transition-all",
              category === "all"
                ? "border-pink-400 bg-pink-50 text-pink-600"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-pink-200"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "flex-shrink-0 h-9 px-4 rounded-full text-sm font-semibold border-2 transition-all flex items-center gap-1.5",
                category === cat.id
                  ? "border-pink-400 bg-pink-50 text-pink-600"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-pink-200"
              )}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-muted)]">
            {filtered.length} {filtered.length === 1 ? "quiz" : "quizzes"}
          </p>
          <div className="flex gap-1 bg-pink-50 rounded-full p-1" role="group" aria-label="Sort by">
            {(["popular", "newest"] as SortOption[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold transition-all capitalize",
                  sort === s
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-[var(--color-text-muted)] hover:text-pink-500"
                )}
                aria-pressed={sort === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quiz grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4" role="img" aria-label="No results">🔍</div>
            <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">
              No quizzes found
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="text-pink-500 font-semibold hover:text-pink-600 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          >
            {filtered.map((quiz, i) => (
              <motion.div key={quiz.id} variants={fadeInUp} custom={i}>
                <Link
                  href={`/quizzes/${quiz.slug}`}
                  className="group block card-base card-hover p-0 overflow-hidden h-full"
                  aria-label={`Play ${quiz.title}`}
                >
                  <div className={`h-28 bg-gradient-to-br ${quiz.coverGradient} flex items-center justify-center relative`}>
                    <span className="text-5xl" role="img" aria-hidden="true">{quiz.emoji}</span>
                    {quiz.isTrending && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="dark" size="sm">🔥 Trending</Badge>
                      </div>
                    )}
                    {quiz.isNew && !quiz.isTrending && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="lavender" size="sm">
                          <Sparkles className="h-3 w-3" /> New
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-display font-bold text-base text-[var(--color-text-primary)] group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight mb-1.5">
                      {quiz.title}
                    </h2>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-3">
                      {quiz.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {formatCount(quiz.playCount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ~{estimateTime(quiz.questions.length)} min
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
