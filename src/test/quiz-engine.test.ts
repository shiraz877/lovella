import { describe, it, expect } from "vitest";
import {
  calculateScore,
  getResultByScore,
  gradeAnswers,
  buildSession,
} from "@/lib/quiz-engine";
import { quizzes } from "@/data/quizzes";

describe("Quiz Engine Scoring & Results", () => {
  const compatibilityQuiz = quizzes.find((q) => q.slug === "couple-compatibility")!;

  it("should calculate zero score when no answers are provided", () => {
    const { score, maxScore, percentage } = calculateScore(compatibilityQuiz, []);
    expect(score).toBe(0);
    expect(maxScore).toBeGreaterThan(0);
    expect(percentage).toBe(0);
  });

  it("should calculate correct percentage score when answering highest value options", () => {
    const answers = compatibilityQuiz.questions.map((q) => {
      // Pick highest score option
      const sorted = [...q.options].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      return {
        questionId: q.id,
        selectedIds: [sorted[0].id],
      };
    });

    const { score, maxScore, percentage } = calculateScore(compatibilityQuiz, answers);
    expect(score).toBe(maxScore);
    expect(percentage).toBe(100);

    const result = getResultByScore(compatibilityQuiz, percentage);
    expect(result).toBeDefined();
    expect(result?.minScore).toBeLessThanOrEqual(100);
    expect(result?.maxScore).toBeGreaterThanOrEqual(100);
  });

  it("should build a valid session object with timestamp and score", () => {
    const startTime = Date.now() - 5000;
    const session = buildSession(compatibilityQuiz, [], startTime);

    expect(session.quizId).toBe(compatibilityQuiz.id);
    expect(session.quizSlug).toBe(compatibilityQuiz.slug);
    expect(session.startedAt).toBe(startTime);
    expect(session.completedAt).toBeGreaterThanOrEqual(startTime);
    expect(session.score).toBe(0);
  });

  it("should correctly grade knowledge answers based on correctIds", () => {
    const knowledgeQuiz = quizzes.find((q) => q.slug === "how-well-do-you-know-me")!;
    const firstQ = knowledgeQuiz.questions[0];
    const correctId = firstQ.correctIds![0];

    const answers = [
      {
        questionId: firstQ.id,
        selectedIds: [correctId],
      },
    ];

    const graded = gradeAnswers(knowledgeQuiz, answers);
    expect(graded[0].isCorrect).toBe(true);
    expect(graded[0].pointsEarned).toBe(1);
  });
});
