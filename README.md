# Lovelle 💕 – Premium Relationship Games & Quiz Platform

Lovelle is a mobile-first relationship quiz and games platform built with Next.js 15, TypeScript, Tailwind CSS, Motion for React, and Supabase.

Designed to attract organic traffic, encourage social sharing (WhatsApp & native Web Share API), and be monetization-ready.

---

## 🌟 Features

- **Rich Curated Quizzes:**
  - Couple Compatibility Test (scored with multi-tier relationship advice)
  - What's Your Love Language? (tag-based psychological interpretation)
  - How Well Do You Know Me? (knowledge evaluation & score reveal)
  - Ultimate Best Friend Quiz (friendship trivia)
- **Interactive Relationship Games:**
  - *Would You Rather?* with A/B choice reveals and categories
  - *Truth or Dare* with 3 intensity levels (Mild, Medium, Spicy)
  - *This or That* rapid-fire preference matcher
  - *Who Is More Likely To?* with customizable player names and live voting
  - *Classic FLAMES Game* with letter-elimination algorithm
  - *Love Calculator* with animated circular SVG gauge
- **Custom Quiz Builder (`/create`):**
  - Create custom quizzes without mandatory signup
  - Add, reorder, edit questions and options
  - Set correct answers for scored quizzes
  - Unpredictable share identifiers (via `nanoid`)
  - Recipient player (`/play/[shareId]`) with server-side answer protection
- **Privacy-First Analytics & Admin Dashboard (`/admin/analytics`):**
  - Centralized analytics dispatcher for Google Analytics 4 & PostHog
  - Google Consent Mode & GDPR cookie banner (`/cookies`)
  - Protected admin dashboard showing real conversion funnels, completion rates, and integration health
- **Monetization Readiness:**
  - Reusable CLS-safe `AdSlot` components ready for Google AdSense
- **SEO & Social Sharing:**
  - Server-rendered metadata, Open Graph cards, canonical URLs, `sitemap.xml`, and `robots.txt`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

The application includes an in-memory repository fallback for immediate offline testing. To connect your live Supabase PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Run the migration script located at:
   ```
   supabase/migrations/20261016_initial_schema.sql
   ```
4. Copy your project URL and anon public key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 🧪 Testing

### Unit Tests (Vitest)
```bash
npm run test
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

### TypeScript Verification
```bash
npm run type-check
```

---

## 🔒 Security & Privacy Notice
- Secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET_KEY`) are kept strictly server-side.
- The public API does not expose correct answer flags or private respondent emails to browsers before quiz submission.
- Sliding-window rate limiters protect quiz generation and submission endpoints.
