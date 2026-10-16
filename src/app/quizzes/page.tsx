import type { Metadata } from "next";
import { QuizzesPageClient } from "./quizzes-client";
import { quizzes, CATEGORIES } from "@/data/quizzes";

export const metadata: Metadata = {
  title: "Explore Quizzes",
  description:
    "Browse our collection of relationship quizzes, couple games, friendship tests, and personality quizzes. Find the perfect quiz to share with your partner or best friend.",
  alternates: { canonical: "/quizzes" },
};

export default function QuizzesPage() {
  return (
    <div className="container py-8 sm:py-12">
      <QuizzesPageClient quizzes={quizzes} categories={CATEGORIES} />
    </div>
  );
}
