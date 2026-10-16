"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  Heart,
  Sparkles,
  Users,
  Zap,
  ChevronRight,
  Star,
  ArrowRight,
  Share2,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedQuizzes, getTrendingQuizzes, CATEGORIES } from "@/data/quizzes";
import { formatCount, estimateTime } from "@/lib/utils";
import { fadeInUp, staggerContainer, springTransition } from "@/lib/animations";

// ─── Floating decorative shapes ─────────────────────────────
function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Quiz Card ───────────────────────────────────────────────
function QuizCard({ quiz, index }: { quiz: ReturnType<typeof getFeaturedQuizzes>[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/quizzes/${quiz.slug}`}
        className="group block card-base card-hover p-0 overflow-hidden h-full"
        aria-label={`Play ${quiz.title}`}
      >
        {/* Cover */}
        <div className={`h-28 sm:h-32 bg-gradient-to-br ${quiz.coverGradient} flex items-center justify-center relative overflow-hidden`}>
          <span className="text-5xl" role="img" aria-hidden="true">{quiz.emoji}</span>
          {quiz.isTrending && (
            <div className="absolute top-3 left-3">
              <Badge variant="dark" size="sm">
                <Zap className="h-3 w-3" /> Trending
              </Badge>
            </div>
          )}
          {quiz.isNew && (
            <div className="absolute top-3 left-3">
              <Badge variant="lavender" size="sm">
                <Sparkles className="h-3 w-3" /> New
              </Badge>
            </div>
          )}
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-display font-bold text-base sm:text-lg text-[var(--color-text-primary)] leading-tight group-hover:text-pink-600 transition-colors line-clamp-2">
            {quiz.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
            {quiz.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {formatCount(quiz.playCount)}
              </span>
              <span>~{estimateTime(quiz.questions.length)} min</span>
            </div>
            <span className="text-xs font-semibold text-pink-500 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
              Play <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Category Card ───────────────────────────────────────────
function CategoryCard({
  category,
  index,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
}) {
  const colors = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-rose-400 to-pink-500",
    "from-emerald-400 to-teal-500",
  ];

  return (
    <motion.div variants={fadeInUp} custom={index} whileTap={{ scale: 0.96 }}>
      <Link
        href={`/quizzes?category=${category.id}`}
        className="group flex flex-col items-center p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-pink-200 hover:shadow-md transition-all duration-200"
      >
        <div
          className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-2xl sm:text-3xl shadow-md mb-3 group-hover:scale-110 transition-transform duration-200`}
          role="img"
          aria-hidden="true"
        >
          {category.emoji}
        </div>
        <span className="text-sm font-bold text-[var(--color-text-primary)] text-center group-hover:text-pink-600 transition-colors">
          {category.label}
        </span>
        <span className="text-[0.7rem] text-[var(--color-text-muted)] text-center mt-0.5">
          {category.description}
        </span>
      </Link>
    </motion.div>
  );
}

// ─── How it works step ──────────────────────────────────────
function HowItWorksStep({
  step,
  icon,
  title,
  description,
  index,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div variants={fadeInUp} custom={index} className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 flex items-center justify-center">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 text-white text-[0.65rem] font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────
function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Homepage ────────────────────────────────────────────────
export default function HomePage() {
  const featuredQuizzes = getFeaturedQuizzes();
  const trendingQuizzes = getTrendingQuizzes();

  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative bg-hero-pattern min-h-[calc(100vh-4rem)] flex items-center pb-8" aria-label="Hero">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <FloatingShape
            className="absolute top-20 left-[8%] h-8 w-8 rounded-full bg-pink-200/60"
            delay={0}
          />
          <FloatingShape
            className="absolute top-32 right-[12%] h-5 w-5 rounded-full bg-lavender-200/70"
            delay={1}
          />
          <FloatingShape
            className="absolute bottom-24 left-[15%] h-6 w-6 rounded-full bg-pink-300/50"
            delay={2}
          />
          <FloatingShape
            className="absolute top-1/2 right-[5%] h-10 w-10 rounded-full bg-lavender-100/80"
            delay={0.5}
          />
          <FloatingShape
            className="absolute bottom-16 right-[20%] text-2xl"
            delay={1.5}
          />

          {/* Large decorative hearts */}
          <motion.div
            className="absolute -right-16 top-1/4 text-[160px] text-pink-100 select-none"
            animate={{ rotate: [0, 5, -3, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.div>
          <motion.div
            className="absolute -left-12 bottom-1/4 text-[120px] text-lavender-100 select-none"
            animate={{ rotate: [0, -5, 3, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            💜
          </motion.div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-600 text-sm font-semibold mb-6"
            >
              <Star className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
              1M+ quizzes played this month
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ...springTransition }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.15] mb-5"
            >
              Fun Quizzes &amp; Games{" "}
              <span className="text-gradient-brand">for Couples</span>
              {" "}&amp; Friends
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-lg mx-auto"
            >
              Discover how well you really know each other. Share quizzes, compare answers,
              and create unforgettable memories.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/quizzes">
                  <Play className="h-5 w-5 fill-white" />
                  Play a Quiz
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/create">
                  <Sparkles className="h-5 w-5" />
                  Create Your Own
                </Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]"
            >
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-pink-400 fill-pink-400" /> Free to play
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-pink-400" /> No sign-up needed
              </span>
              <span className="flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-pink-400" /> Easy to share
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-14 sm:py-20" aria-labelledby="categories-heading">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-10">
              <h2
                id="categories-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]"
              >
                Explore by Category
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-2">
                Find the perfect quiz for every kind of relationship
              </p>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Featured Quizzes ── */}
      <section className="py-10 sm:py-16 bg-[var(--color-bg-subtle)]" aria-labelledby="featured-heading">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
              <div>
                <h2
                  id="featured-heading"
                  className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]"
                >
                  Featured Quizzes
                </h2>
                <p className="text-[var(--color-text-secondary)] mt-1 text-sm">
                  Hand-picked for you
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/quizzes" className="flex items-center gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {featuredQuizzes.map((quiz, i) => (
                <QuizCard key={quiz.id} quiz={quiz} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Trending ── */}
      <section className="py-10 sm:py-16" aria-labelledby="trending-heading">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
              <div>
                <h2
                  id="trending-heading"
                  className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-2"
                >
                  <Zap className="h-6 w-6 text-pink-500 fill-pink-100" />
                  Trending Now
                </h2>
                <p className="text-[var(--color-text-secondary)] mt-1 text-sm">
                  Most played today
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {trendingQuizzes.map((quiz, i) => (
                <QuizCard key={quiz.id} quiz={quiz} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Games Section ── */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-pink-50 to-lavender-50" aria-labelledby="games-heading">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-10">
              <h2
                id="games-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]"
              >
                Interactive Games
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-2">
                More than just quizzes — real games to play together
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                { href: "/games/would-you-rather", emoji: "🤔", title: "Would You Rather?", color: "from-blue-400 to-cyan-500" },
                { href: "/games/truth-or-dare", emoji: "🎲", title: "Truth or Dare", color: "from-orange-400 to-red-500" },
                { href: "/games/this-or-that", emoji: "⚡", title: "This or That", color: "from-emerald-400 to-teal-500" },
                { href: "/games/likely-to", emoji: "👉", title: "Who's More Likely?", color: "from-violet-400 to-purple-500" },
                { href: "/games/flames", emoji: "🔥", title: "FLAMES Game", color: "from-rose-400 to-pink-500" },
              ].map((game, i) => (
                <motion.div key={game.href} variants={fadeInUp} custom={i} whileTap={{ scale: 0.96 }}>
                  <Link
                    href={game.href}
                    className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-pink-200 hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl sm:text-3xl shadow-md mb-3 group-hover:scale-110 transition-transform duration-200`}
                    >
                      {game.emoji}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] group-hover:text-pink-600 transition-colors leading-tight">
                      {game.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 sm:py-20" aria-labelledby="how-it-works-heading">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <h2
                id="how-it-works-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]"
              >
                Share the Fun
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
                Create a quiz about yourself, share the link, and discover who knows you best
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-3xl mx-auto">
              <HowItWorksStep
                step="1"
                icon={<Sparkles className="h-6 w-6 text-pink-500" />}
                title="Create Your Quiz"
                description="Answer questions about yourself or create custom ones for your partner or friends."
                index={0}
              />
              <HowItWorksStep
                step="2"
                icon={<Share2 className="h-6 w-6 text-pink-500" />}
                title="Share the Link"
                description="Get a unique link and share it via WhatsApp, text, or any platform."
                index={1}
              />
              <HowItWorksStep
                step="3"
                icon={<Heart className="h-6 w-6 text-pink-500 fill-pink-200" />}
                title="See the Results"
                description="Compare answers and discover how well you really know each other!"
                index={2}
              />
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Button variant="primary" size="lg" asChild>
                <Link href="/create">
                  <Sparkles className="h-5 w-5" />
                  Create Your Quiz Now
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 sm:py-20" aria-label="Call to action">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-pink-600 p-8 sm:p-12 text-center text-white"
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-pink-400/30 blur-2xl" aria-hidden="true" />

            <div className="relative z-10">
              <div className="text-4xl mb-4" role="img" aria-label="Love">💕</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Out How Well You Know Each Other?
              </h2>
              <p className="text-pink-100 mb-8 max-w-md mx-auto text-base sm:text-lg">
                Play our most popular quizzes and games — completely free, no account required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-pink-600 border-white hover:bg-pink-50"
                  asChild
                >
                  <Link href="/quizzes">
                    <Play className="h-5 w-5 fill-pink-500 text-pink-500" />
                    Start Playing
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/20 border-2 border-white/40"
                  asChild
                >
                  <Link href="/create">Create a Quiz</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
