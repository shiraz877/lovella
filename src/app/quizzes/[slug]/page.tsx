import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizDetailClient } from "./quiz-detail-client";
import { getQuizBySlug, quizzes } from "@/data/quizzes";
import { absoluteUrl, estimateTime } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return {};

  const title = `${quiz.title} – Lovelle`;
  const description = quiz.description;
  const url = absoluteUrl(`/quizzes/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();

  return (
    <div className="container py-8 sm:py-12">
      <QuizDetailClient quiz={quiz} estimatedMinutes={estimateTime(quiz.questions.length)} />
    </div>
  );
}
