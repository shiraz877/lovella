import { describe, it, expect } from "vitest";
import {
  createQuiz,
  getQuizByShareId,
  submitQuizResponse,
} from "@/lib/db/quiz-store";

describe("Shared Quiz Store and Privacy Guard", () => {
  it("should create a quiz and retrieve it by shareId without leaking answer keys", async () => {
    const created = await createQuiz({
      title: "Test Friendship Quiz",
      description: "Testing our bond",
      creatorName: "Sam",
      questions: [
        {
          text: "What is my favourite color?",
          emoji: "🎨",
          options: [
            { text: "Pink", isCorrect: true },
            { text: "Blue", isCorrect: false },
          ],
        },
      ],
    });

    expect(created.shareId).toBeDefined();
    expect(created.shareId.length).toBeGreaterThanOrEqual(8);

    // Retrieve quiz
    const { quiz, isExpired } = await getQuizByShareId(created.shareId);
    expect(isExpired).toBe(false);
    expect(quiz).toBeDefined();
    expect(quiz?.title).toBe("Test Friendship Quiz");
    expect(quiz?.questions.length).toBe(1);

    // Check that `isCorrect` or answers are NOT exposed on public options
    const firstOption = quiz?.questions[0].options[0] as unknown as Record<string, unknown>;
    expect(firstOption.isCorrect).toBeUndefined();
  });

  it("should calculate score correctly when recipient submits answers", async () => {
    const created = await createQuiz({
      title: "Trivia Match",
      questions: [
        {
          text: "Question 1",
          options: [
            { text: "Correct Option", isCorrect: true },
            { text: "Wrong Option", isCorrect: false },
          ],
        },
      ],
    });

    const { quiz } = await getQuizByShareId(created.shareId);
    const q = quiz!.questions[0];
    const correctOpt = q.options.find((o) => o.text === "Correct Option")!;

    // Submit correct answer
    const submission = await submitQuizResponse(created.shareId, "Taylor", [
      {
        questionId: q.id,
        selectedIds: [correctOpt.id],
      },
    ]);

    expect(submission.score).toBe(1);
    expect(submission.maxScore).toBe(1);
    expect(submission.percentage).toBe(100);
  });
});
