import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Heart, Users, Flame, Dice5, HelpCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Relationship Games & Icebreakers",
  description:
    "Interactive party games, couple icebreakers, and friendship challenges including Would You Rather, Truth or Dare, FLAMES, and Love Calculator.",
  alternates: { canonical: "/games" },
};

const games = [
  {
    href: "/games/compatibility",
    title: "Couple Compatibility Test",
    description: "Deep dive test into communication, intimacy, conflict styles, and long-term alignment.",
    emoji: "💑",
    icon: Heart,
    category: "Couples",
    tag: "High Chemistry",
    badgeVariant: "pink" as const,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    href: "/games/how-well",
    title: "How Well Do You Know Me?",
    description: "Take the quiz, share your link with your partner or best friend, and see their score.",
    emoji: "🧠",
    icon: Users,
    category: "Couples & Friends",
    tag: "Popular",
    badgeVariant: "lavender" as const,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    href: "/games/would-you-rather",
    title: "Would You Rather?",
    description: "Hundreds of fun, deep, and hilarious dilemmas designed for couples and close friends.",
    emoji: "🤔",
    icon: HelpCircle,
    category: "Party & Couples",
    tag: "Fast-Paced",
    badgeVariant: "coral" as const,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/games/truth-or-dare",
    title: "Truth or Dare",
    description: "Curated with three spice levels: Mild, Medium, and Spicy. Safe and romantic prompts.",
    emoji: "🎲",
    icon: Dice5,
    category: "Party & Romance",
    tag: "3 Levels",
    badgeVariant: "pink" as const,
    gradient: "from-orange-500 to-red-500",
  },
  {
    href: "/games/this-or-that",
    title: "This or That",
    description: "Rapid-fire preference matcher. Uncover surprising lifestyle and romance habits.",
    emoji: "⚡",
    icon: Sparkles,
    category: "Icebreaker",
    tag: "Quick Play",
    badgeVariant: "lavender" as const,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    href: "/games/likely-to",
    title: "Who Is More Likely To?",
    description: "Custom player names support! Vote on who is most likely to do wacky romantic things.",
    emoji: "👉",
    icon: Users,
    category: "Couples & Friends",
    tag: "Multiplayer",
    badgeVariant: "coral" as const,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    href: "/games/flames",
    title: "Classic FLAMES Game",
    description: "The timeless childhood game calculated with authentic letter elimination logic.",
    emoji: "🔥",
    icon: Flame,
    category: "Nostalgia",
    tag: "Instant Result",
    badgeVariant: "pink" as const,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    href: "/games/love-calculator",
    title: "Love Compatibility Calculator",
    description: "Deterministic name matching algorithm with delightful circular progress visualizer.",
    emoji: "💖",
    icon: Heart,
    category: "Fun & Romance",
    tag: "Casual",
    badgeVariant: "lavender" as const,
    gradient: "from-pink-400 to-rose-400",
  },
];

export default function GamesHubPage() {
  return (
    <div className="container py-8 sm:py-14">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <Badge variant="pink" size="md" className="mb-3">
          Interactive Hub
        </Badge>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-3">
          Relationship Games &amp; Icebreakers
        </h1>
        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
          Break the ice, spark romantic conversations, or challenge your partner and best friends with these interactive games.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="group relative flex flex-col justify-between card-base card-hover p-6 rounded-3xl border border-[var(--color-border)] overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}
                >
                  <span role="img" aria-hidden="true">
                    {game.emoji}
                  </span>
                </div>
                <Badge variant={game.badgeVariant} size="sm">
                  {game.tag}
                </Badge>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {game.category}
              </span>
              <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] group-hover:text-pink-600 transition-colors mt-1 mb-2">
                {game.title}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-pink-600 text-sm font-semibold">
              <span>Play Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
