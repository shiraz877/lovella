import { nanoid } from "nanoid";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { SharedQuiz, SharedQuizResponse, QuizAnswer } from "@/types/quiz";

export interface CreateQuizInput {
  title: string;
  description?: string;
  creatorName?: string;
  isPublic?: boolean;
  expiresInDays?: number;
  questions: {
    text: string;
    emoji?: string;
    type?: "single" | "multi";
    options: {
      text: string;
      emoji?: string;
      isCorrect?: boolean;
      score?: number;
    }[];
  }[];
}

// In-memory fallback repository when live Supabase DB is not connected
const memoryQuizzes = new Map<string, SharedQuiz & { answersMap?: Record<string, string[]> }>();
const memoryResponses = new Map<string, SharedQuizResponse[]>();

/**
 * Creates a new shareable quiz either in Supabase or memory store.
 */
export async function createQuiz(input: CreateQuizInput): Promise<{ shareId: string; id: string }> {
  const shareId = nanoid(10);
  const now = new Date();
  const expiresAt = input.expiresInDays
    ? new Date(now.getTime() + input.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
    : undefined;

  const supabase = createServerClient();

  if (isSupabaseConfigured() && supabase) {
    // Insert into Supabase
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        share_id: shareId,
        title: input.title,
        description: input.description || null,
        creator_name: input.creatorName || null,
        is_public: input.isPublic ?? true,
        expires_at: expiresAt || null,
      })
      .select("id")
      .single();

    if (quizError || !quizData) {
      throw new Error(`Failed to create quiz: ${quizError?.message}`);
    }

    const quizId = quizData.id;

    // Insert questions and options
    for (let qIdx = 0; qIdx < input.questions.length; qIdx++) {
      const q = input.questions[qIdx];
      const { data: questionData, error: qError } = await supabase
        .from("quiz_questions")
        .insert({
          quiz_id: quizId,
          text: q.text,
          emoji: q.emoji || null,
          type: q.type || "single",
          order_index: qIdx,
        })
        .select("id")
        .single();

      if (qError || !questionData) {
        throw new Error(`Failed to create question: ${qError?.message}`);
      }

      const questionId = questionData.id;
      const optionsToInsert = q.options.map((opt, oIdx) => ({
        question_id: questionId,
        text: opt.text,
        emoji: opt.emoji || null,
        is_correct: opt.isCorrect ?? false,
        score: opt.score ?? 1,
        order_index: oIdx,
      }));

      const { error: optError } = await supabase
        .from("quiz_options")
        .insert(optionsToInsert);

      if (optError) {
        throw new Error(`Failed to insert options: ${optError.message}`);
      }
    }

    return { shareId, id: quizId };
  }

  // Memory fallback
  const id = `quiz_${nanoid(12)}`;
  const answersMap: Record<string, string[]> = {};

  const mappedQuestions = input.questions.map((q, qIdx) => {
    const qId = `q_${qIdx}_${nanoid(6)}`;
    const correctIds: string[] = [];
    const options = q.options.map((opt, oIdx) => {
      const optId = `opt_${oIdx}_${nanoid(6)}`;
      if (opt.isCorrect) {
        correctIds.push(optId);
      }
      return {
        id: optId,
        text: opt.text,
        emoji: opt.emoji,
        score: opt.score ?? 1,
      };
    });

    answersMap[qId] = correctIds;

    return {
      id: qId,
      text: q.text,
      emoji: q.emoji,
      type: q.type || "single",
      options,
    };
  });

  const sharedQuiz: SharedQuiz & { answersMap: Record<string, string[]> } = {
    id,
    shareId,
    title: input.title,
    description: input.description,
    creatorName: input.creatorName,
    questions: mappedQuestions,
    expiresAt,
    isPublic: input.isPublic ?? true,
    createdAt: now.toISOString(),
    answersMap,
  };

  memoryQuizzes.set(shareId, sharedQuiz);
  return { shareId, id };
}

/**
 * Get quiz by shareId without revealing correct answer flags.
 */
export async function getQuizByShareId(
  shareId: string
): Promise<{ quiz: SharedQuiz | null; isExpired: boolean }> {
  const supabase = createServerClient();

  if (isSupabaseConfigured() && supabase) {
    const { data: quiz, error } = await supabase
      .from("quizzes")
      .select("id, share_id, title, description, creator_name, is_public, expires_at, created_at")
      .eq("share_id", shareId)
      .single();

    if (error || !quiz) {
      return { quiz: null, isExpired: false };
    }

    const isExpired = quiz.expires_at ? new Date(quiz.expires_at) < new Date() : false;

    // Fetch questions
    const { data: questions } = await supabase
      .from("quiz_questions")
      .select("id, text, emoji, type, order_index")
      .eq("quiz_id", quiz.id)
      .order("order_index", { ascending: true });

    const questionIds = (questions || []).map((q) => q.id);

    // Fetch options - deliberately excluding `is_correct` so users cannot cheat!
    const { data: options } = await supabase
      .from("quiz_options")
      .select("id, question_id, text, emoji, order_index")
      .in("question_id", questionIds)
      .order("order_index", { ascending: true });

    const questionsWithOpts = (questions || []).map((q) => ({
      id: q.id,
      text: q.text,
      emoji: q.emoji || undefined,
      type: q.type as "single" | "multi",
      options: (options || [])
        .filter((o) => o.question_id === q.id)
        .map((o) => ({
          id: o.id,
          text: o.text,
          emoji: o.emoji || undefined,
        })),
    }));

    return {
      quiz: {
        id: quiz.id,
        shareId: quiz.share_id,
        title: quiz.title,
        description: quiz.description || undefined,
        creatorName: quiz.creator_name || undefined,
        questions: questionsWithOpts,
        expiresAt: quiz.expires_at || undefined,
        isPublic: quiz.is_public,
        createdAt: quiz.created_at,
      },
      isExpired,
    };
  }

  // Memory fallback
  const cached = memoryQuizzes.get(shareId);
  if (!cached) {
    return { quiz: null, isExpired: false };
  }

  const isExpired = cached.expiresAt ? new Date(cached.expiresAt) < new Date() : false;

  // Clone quiz without revealing internal answersMap
  const { answersMap: _, ...safeQuiz } = cached;
  return { quiz: safeQuiz, isExpired };
}

/**
 * Submit responses to a shared quiz and compute score.
 */
export async function submitQuizResponse(
  shareId: string,
  participantName: string,
  answers: QuizAnswer[]
): Promise<{
  score: number;
  maxScore: number;
  percentage: number;
  sessionId: string;
}> {
  const supabase = createServerClient();

  if (isSupabaseConfigured() && supabase) {
    const { data: quiz } = await supabase
      .from("quizzes")
      .select("id")
      .eq("share_id", shareId)
      .single();

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Get all options with is_correct flag to score server-side
    const { data: questions } = await supabase
      .from("quiz_questions")
      .select("id")
      .eq("quiz_id", quiz.id);

    const qIds = (questions || []).map((q) => q.id);
    const { data: options } = await supabase
      .from("quiz_options")
      .select("id, question_id, is_correct, score")
      .in("question_id", qIds);

    let score = 0;
    let maxScore = 0;

    for (const q of questions || []) {
      const qOpts = (options || []).filter((o) => o.question_id === q.id);
      const correctOpts = qOpts.filter((o) => o.is_correct);
      maxScore += 1;

      const userAns = answers.find((a) => a.questionId === q.id);
      if (userAns && correctOpts.length > 0) {
        const correctSet = new Set(correctOpts.map((o) => o.id));
        const userSet = new Set(userAns.selectedIds);
        const isMatch =
          correctSet.size === userSet.size &&
          Array.from(correctSet).every((id) => userSet.has(id));
        if (isMatch) score += 1;
      }
    }

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;

    // Record session
    const { data: sessionData, error: sErr } = await supabase
      .from("quiz_sessions")
      .insert({
        quiz_id: quiz.id,
        participant_name: participantName,
        score,
        max_score: maxScore,
        percentage,
      })
      .select("id")
      .single();

    if (sErr || !sessionData) {
      throw new Error(`Failed to record session: ${sErr?.message}`);
    }

    // Record responses
    const responsesToInsert = answers.map((a) => ({
      session_id: sessionData.id,
      question_id: a.questionId,
      selected_option_ids: a.selectedIds,
    }));

    await supabase.from("quiz_responses").insert(responsesToInsert);

    return {
      score,
      maxScore,
      percentage,
      sessionId: sessionData.id,
    };
  }

  // Memory fallback scoring
  const cached = memoryQuizzes.get(shareId);
  if (!cached) {
    throw new Error("Quiz not found");
  }

  let score = 0;
  const maxScore = cached.questions.length;

  for (const q of cached.questions) {
    const correctIds = cached.answersMap?.[q.id] || [];
    const userAns = answers.find((a) => a.questionId === q.id);
    if (userAns && correctIds.length > 0) {
      const correctSet = new Set(correctIds);
      const userSet = new Set(userAns.selectedIds);
      const isMatch =
        correctSet.size === userSet.size &&
        Array.from(correctSet).every((id) => userSet.has(id));
      if (isMatch) score += 1;
    }
  }

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;
  const sessionId = `sess_${nanoid(10)}`;

  const responseList = memoryResponses.get(shareId) || [];
  responseList.push({
    id: sessionId,
    shareId,
    responderName: participantName,
    answers,
    submittedAt: new Date().toISOString(),
  });
  memoryResponses.set(shareId, responseList);

  return {
    score,
    maxScore,
    percentage,
    sessionId,
  };
}
