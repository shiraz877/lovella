// ── Centralized Typed Analytics Event Definitions ───────────────────

export type AnalyticsEventName =
  // Acquisition
  | "page_view"
  | "landing_page_view"
  | "campaign_attribution"
  // Discovery
  | "category_view"
  | "quiz_search"
  | "quiz_filter"
  | "quiz_card_click"
  | "quiz_start"
  // Engagement
  | "question_answered"
  | "quiz_progress"
  | "quiz_completed"
  | "quiz_abandoned"
  | "result_view"
  | "replay_clicked"
  // Sharing
  | "quiz_created"
  | "quiz_published"
  | "share_link_copied"
  | "share_clicked"
  | "shared_quiz_opened"
  | "shared_quiz_completed"
  // Retention
  | "returning_session"
  | "favorite_added"
  // Monetization
  | "ad_slot_viewable";

export interface AnalyticsEventProps {
  quiz_id?: string;
  quiz_slug?: string;
  category?: string;
  question_index?: number;
  total_questions?: number;
  percentage?: number;
  score?: number;
  search_query?: string;
  filter_name?: string;
  share_channel?: "whatsapp" | "native" | "copy" | "other";
  share_id?: string;
  slot_id?: string;
  source?: string;
  [key: string]: unknown;
}
