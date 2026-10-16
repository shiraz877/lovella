// ── Quiz Domain Types ─────────────────────────────────────────

export type QuizCategory =
  | "couples"
  | "friends"
  | "personality"
  | "party"
  | "games"
  | "love";

export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuestionType = "single" | "multi" | "slider" | "text-choice";

export interface AnswerOption {
  id: string;
  text: string;
  emoji?: string;
  /** Used by scored quizzes */
  score?: number;
  /** Used for personality mapping */
  tag?: string;
}

export interface Question {
  id: string;
  text: string;
  emoji?: string;
  type: QuestionType;
  options: AnswerOption[];
  /** For multi-select: minimum required selections */
  minSelections?: number;
  /** For multi-select: maximum allowed selections */
  maxSelections?: number;
  /** Correct option id(s) for knowledge-based quizzes */
  correctIds?: string[];
  /** Points awarded for correct answer */
  points?: number;
}

export interface QuizResult {
  id: string;
  /** Score range: min is inclusive, max is inclusive (percentage 0-100) */
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty?: QuizDifficulty;
  emoji: string;
  coverGradient: string;
  /** Estimated minutes */
  estimatedMinutes: number;
  playCount: number;
  questions: Question[];
  results: QuizResult[];
  tags: string[];
  publishedAt: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  disclaimer?: string;
}

// ── Game-Specific Types ──────────────────────────────────────

export interface WouldYouRatherQuestion {
  id: string;
  optionA: string;
  optionB: string;
  category: string;
}

export interface TruthOrDareItem {
  id: string;
  type: "truth" | "dare";
  text: string;
  intensity: "mild" | "medium" | "spicy";
}

export interface ThisOrThatItem {
  id: string;
  optionA: string;
  optionB: string;
  emojiA: string;
  emojiB: string;
  category: string;
}

export interface WhoIsMoreLikelyItem {
  id: string;
  prompt: string;
  emoji: string;
}

// ── Quiz Session Types ───────────────────────────────────────

export interface QuizAnswer {
  questionId: string;
  selectedIds: string[];
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface QuizSession {
  quizId: string;
  quizSlug: string;
  answers: QuizAnswer[];
  currentQuestionIndex: number;
  startedAt: number;
  completedAt?: number;
  score: number;
  maxScore: number;
  percentage: number;
  result?: QuizResult;
}

// ── Shared Quiz Types ────────────────────────────────────────

export interface SharedQuizQuestion {
  id: string;
  text: string;
  emoji?: string;
  type: QuestionType;
  options: AnswerOption[];
  minSelections?: number;
  maxSelections?: number;
}

export interface SharedQuiz {
  id: string;
  shareId: string;
  title: string;
  description?: string;
  creatorName?: string;
  questions: SharedQuizQuestion[];
  expiresAt?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface SharedQuizResponse {
  id: string;
  shareId: string;
  responderName?: string;
  answers: QuizAnswer[];
  submittedAt: string;
}
