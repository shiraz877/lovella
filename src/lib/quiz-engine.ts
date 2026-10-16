import type { Quiz, QuizAnswer, QuizResult, QuizSession } from "@/types/quiz";

/**
 * Calculate raw score from answers for a scored quiz.
 * For single/multi select: sums the `score` property of selected options.
 * Returns { score, maxScore, percentage }
 */
export function calculateScore(
  quiz: Quiz,
  answers: QuizAnswer[]
): { score: number; maxScore: number; percentage: number } {
  let score = 0;
  let maxScore = 0;

  for (const question of quiz.questions) {
    // Max possible for this question
    const optionScores = question.options.map((o) => o.score ?? 0);
    const qMax = question.type === "multi"
      ? optionScores.reduce((a, b) => a + b, 0)
      : Math.max(...optionScores, 0);

    maxScore += qMax;

    // Find answer for this question
    const answer = answers.find((a) => a.questionId === question.id);
    if (!answer) continue;

    for (const id of answer.selectedIds) {
      const option = question.options.find((o) => o.id === id);
      score += option?.score ?? 0;
    }
  }

  const percentage = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
  return { score, maxScore, percentage };
}

/**
 * Determine the result for a scored quiz based on percentage.
 */
export function getResultByScore(quiz: Quiz, percentage: number): QuizResult | undefined {
  return quiz.results.find(
    (r) => percentage >= r.minScore && percentage <= r.maxScore
  );
}

/**
 * Determine result for a tag-based quiz (like love language).
 * Tallies tag votes and returns the winning result id.
 */
export function getResultByTag(quiz: Quiz, answers: QuizAnswer[]): QuizResult | undefined {
  const tagCounts: Record<string, number> = {};

  for (const question of quiz.questions) {
    const answer = answers.find((a) => a.questionId === question.id);
    if (!answer) continue;
    for (const id of answer.selectedIds) {
      const option = question.options.find((o) => o.id === id);
      if (option?.tag) {
        tagCounts[option.tag] = (tagCounts[option.tag] ?? 0) + 1;
      }
    }
  }

  const topTag = Object.entries(tagCounts).sort(([, a], [, b]) => b - a)[0]?.[0];
  if (!topTag) return quiz.results[0];
  return quiz.results.find((r) => r.id === topTag) ?? quiz.results[0];
}

/**
 * Calculate correctness for knowledge-based quizzes.
 */
export function gradeAnswers(quiz: Quiz, answers: QuizAnswer[]): QuizAnswer[] {
  return answers.map((answer) => {
    const question = quiz.questions.find((q) => q.id === answer.questionId);
    if (!question?.correctIds) return { ...answer };

    const correct = question.correctIds;
    const selected = answer.selectedIds;
    const isCorrect =
      correct.length === selected.length &&
      correct.every((id) => selected.includes(id)) &&
      selected.every((id) => correct.includes(id));

    return {
      ...answer,
      isCorrect,
      pointsEarned: isCorrect ? (question.points ?? 1) : 0,
    };
  });
}

/**
 * Build a complete session from answers.
 */
export function buildSession(
  quiz: Quiz,
  answers: QuizAnswer[],
  startedAt: number
): QuizSession {
  const hasTagResults = quiz.results.some((r) => r.id.length < 20 && !/r\d+/.test(r.id));
  let result: QuizResult | undefined;
  let score = 0;
  let maxScore = 0;
  let percentage = 0;

  if (hasTagResults) {
    result = getResultByTag(quiz, answers);
    percentage = 100;
  } else {
    const calc = calculateScore(quiz, answers);
    score = calc.score;
    maxScore = calc.maxScore;
    percentage = calc.percentage;
    result = getResultByScore(quiz, percentage);
  }

  return {
    quizId: quiz.id,
    quizSlug: quiz.slug,
    answers,
    currentQuestionIndex: quiz.questions.length,
    startedAt,
    completedAt: Date.now(),
    score,
    maxScore,
    percentage,
    result,
  };
}

/**
 * Get percentage of questions answered correctly (for knowledge quizzes).
 */
export function getKnowledgeScore(answers: QuizAnswer[]): number {
  const graded = answers.filter((a) => a.isCorrect !== undefined);
  if (graded.length === 0) return 0;
  const correct = graded.filter((a) => a.isCorrect).length;
  return Math.round((correct / graded.length) * 100);
}
