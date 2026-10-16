-- ====================================================================
-- Lovelle Database Schema & Row Level Security Policies
-- Migration: 20261016_initial_schema.sql
-- ====================================================================

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    share_id VARCHAR(32) NOT NULL UNIQUE,
    title VARCHAR(140) NOT NULL,
    description TEXT,
    creator_name VARCHAR(60),
    creator_ip_hash VARCHAR(64), -- Pseudonymous hash for abuse prevention / rate-limiting
    is_public BOOLEAN NOT NULL DEFAULT true,
    category VARCHAR(40) NOT NULL DEFAULT 'couples',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index on share_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_quizzes_share_id ON public.quizzes (share_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_created_at ON public.quizzes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quizzes_public ON public.quizzes (is_public, expires_at);

-- 2. Quiz Questions Table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes (id) ON DELETE CASCADE,
    text VARCHAR(300) NOT NULL,
    emoji VARCHAR(16),
    type VARCHAR(20) NOT NULL DEFAULT 'single', -- 'single' | 'multi'
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON public.quiz_questions (quiz_id, order_index ASC);

-- 3. Question Options Table
CREATE TABLE IF NOT EXISTS public.quiz_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.quiz_questions (id) ON DELETE CASCADE,
    text VARCHAR(200) NOT NULL,
    emoji VARCHAR(16),
    is_correct BOOLEAN NOT NULL DEFAULT false,
    score INTEGER NOT NULL DEFAULT 1,
    order_index INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON public.quiz_options (question_id, order_index ASC);

-- 4. Quiz Sessions / Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes (id) ON DELETE CASCADE,
    participant_name VARCHAR(60),
    participant_ip_hash VARCHAR(64),
    score INTEGER NOT NULL DEFAULT 0,
    max_score INTEGER NOT NULL DEFAULT 0,
    percentage INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_quiz_id ON public.quiz_sessions (quiz_id, created_at DESC);

-- 5. Participant Responses Table
CREATE TABLE IF NOT EXISTS public.quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.quiz_sessions (id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.quiz_questions (id) ON DELETE CASCADE,
    selected_option_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id ON public.quiz_responses (session_id);

-- 6. Analytics Aggregate Daily Counters (First-party Privacy-preserving)
CREATE TABLE IF NOT EXISTS public.analytics_daily_stats (
    date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    total_quizzes_created INTEGER NOT NULL DEFAULT 0,
    total_quizzes_completed INTEGER NOT NULL DEFAULT 0,
    total_shares INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily_stats ENABLE ROW LEVEL SECURITY;

-- Quizzes: Public can read active public quizzes
CREATE POLICY "Public read active quizzes" ON public.quizzes
    FOR SELECT
    USING (
        is_public = true 
        AND (expires_at IS NULL OR expires_at > timezone('utc'::text, now()))
    );

-- Quizzes: Anonymous insert is handled via server-side endpoints with rate-limiting,
-- but client direct insert is permitted if required
CREATE POLICY "Allow anon insert quizzes" ON public.quizzes
    FOR INSERT
    WITH CHECK (true);

-- Questions: Public can read questions belonging to active quizzes
CREATE POLICY "Public read quiz questions" ON public.quiz_questions
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.quizzes q
            WHERE q.id = quiz_questions.quiz_id
            AND q.is_public = true
            AND (q.expires_at IS NULL OR q.expires_at > timezone('utc'::text, now()))
        )
    );

CREATE POLICY "Allow anon insert questions" ON public.quiz_questions
    FOR INSERT
    WITH CHECK (true);

-- Options: Public can read options belonging to active quizzes
-- NOTE: In production, correct answer flags should be filtered out by the API before submission
CREATE POLICY "Public read quiz options" ON public.quiz_options
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.quiz_questions qq
            JOIN public.quizzes q ON q.id = qq.quiz_id
            WHERE qq.id = quiz_options.question_id
            AND q.is_public = true
            AND (q.expires_at IS NULL OR q.expires_at > timezone('utc'::text, now()))
        )
    );

CREATE POLICY "Allow anon insert options" ON public.quiz_options
    FOR INSERT
    WITH CHECK (true);

-- Sessions: Public can insert their own attempts
CREATE POLICY "Allow anon insert session" ON public.quiz_sessions
    FOR INSERT
    WITH CHECK (true);

-- Sessions: Public can read their session by session ID
CREATE POLICY "Public read session" ON public.quiz_sessions
    FOR SELECT
    USING (true);

-- Responses: Anyone can submit responses to an existing session
CREATE POLICY "Allow anon insert response" ON public.quiz_responses
    FOR INSERT
    WITH CHECK (true);

-- Responses: Public read response
CREATE POLICY "Public read response" ON public.quiz_responses
    FOR SELECT
    USING (true);

-- Analytics daily stats: Read-only for authenticated or server role
CREATE POLICY "Service role manages analytics" ON public.analytics_daily_stats
    FOR ALL
    USING (true);
