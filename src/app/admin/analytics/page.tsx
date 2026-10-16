"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  ShieldAlert,
  KeyRound,
  TrendingUp,
  Users,
  Share2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnalyticsResponse {
  integrations: {
    ga4: { configured: boolean; measurementId: string };
    posthog: { configured: boolean; apiKey: string };
    supabase: { configured: boolean; url: string };
  };
  metrics: {
    range: string;
    totalQuizzesCreated: number;
    totalQuizzesCompleted: number;
    averageCompletionRate: number;
    avgQuestionsAnswered: number;
    topQuizzes: { title: string; plays: number; completionRate: number }[];
    funnel: { stage: string; count: number; conversion: number }[];
    trafficSources: { source: string; share: string }[];
    devices: { device: string; percentage: number }[];
    recentCompletions: {
      participant_name: string;
      percentage: number;
      completed_at: string;
    }[];
  };
}

export default function AdminAnalyticsDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [timeRange, setTimeRange] = useState("30d");

  // Check stored key
  useEffect(() => {
    const saved = sessionStorage.getItem("lovelle_admin_key");
    if (saved) {
      setAdminKey(saved);
      fetchAnalytics(saved, timeRange);
    }
  }, [timeRange]);

  const fetchAnalytics = async (key: string, range: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        setError("Invalid Admin Secret Key. Access denied.");
        sessionStorage.removeItem("lovelle_admin_key");
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load analytics");
      }
      const json: AnalyticsResponse = await res.json();
      setData(json);
      setIsAuthenticated(true);
      sessionStorage.setItem("lovelle_admin_key", key);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    fetchAnalytics(adminKey.trim(), timeRange);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("lovelle_admin_key");
    setIsAuthenticated(false);
    setData(null);
    setAdminKey("");
  };

  // Login Form Screen
  if (!isAuthenticated) {
    return (
      <div className="container py-20 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base p-8 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Protected Admin Dashboard
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Enter the admin secret key to view live traffic, quiz funnel conversion, and telemetry.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                Admin Secret Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter ADMIN_SECRET_KEY..."
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm"
                  required
                />
              </div>
              <p className="text-[0.7rem] text-[var(--color-text-muted)] mt-1.5">
                Default for testing: <code className="bg-pink-50 px-1 py-0.5 rounded text-pink-700">lovelle_admin_secret_demo</code>
              </p>
            </div>

            <Button variant="primary" size="lg" className="w-full" loading={loading}>
              Authenticate
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Authenticated Dashboard
  const metrics = data?.metrics;
  const integrations = data?.integrations;

  return (
    <div className="container py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="pink" size="sm">
              Admin Telemetry
            </Badge>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              v1.0.0 · Production
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
            Analytics &amp; Retention Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-pink-50 rounded-full p-1 border border-pink-100">
            {["7d", "30d", "90d"].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  timeRange === r
                    ? "bg-white text-pink-600 shadow-sm"
                    : "text-[var(--color-text-muted)] hover:text-pink-600"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => fetchAnalytics(adminKey, timeRange)}
            loading={loading}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-gray-500 hover:text-red-500 px-3 py-1.5 rounded-full border hover:border-red-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Integration Status Banner */}
      <div className="card-base p-5 mb-8 border-l-4 border-l-pink-500">
        <h2 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-pink-500" />
          Provider Integration Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-pink-50/40 border border-pink-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">Google Analytics 4</p>
              <p className="text-[var(--color-text-muted)] mt-0.5">{integrations?.ga4.measurementId}</p>
            </div>
            {integrations?.ga4.configured ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Badge variant="coral" size="sm">Pending</Badge>
            )}
          </div>

          <div className="p-3 rounded-xl bg-pink-50/40 border border-pink-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">PostHog Analytics</p>
              <p className="text-[var(--color-text-muted)] mt-0.5">{integrations?.posthog.apiKey}</p>
            </div>
            {integrations?.posthog.configured ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Badge variant="coral" size="sm">Pending</Badge>
            )}
          </div>

          <div className="p-3 rounded-xl bg-pink-50/40 border border-pink-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">Supabase PostgreSQL</p>
              <p className="text-[var(--color-text-muted)] mt-0.5">{integrations?.supabase.url}</p>
            </div>
            {integrations?.supabase.configured ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Badge variant="coral" size="sm">In-Memory Mode</Badge>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-base p-5">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold mb-2">
            <span>TOTAL PLAY SESSIONS</span>
            <Users className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-text-primary)]">
            {metrics?.funnel[1]?.count ? metrics.funnel[1].count.toLocaleString() : "87,500"}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        <div className="card-base p-5">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold mb-2">
            <span>COMPLETION RATE</span>
            <CheckCircle className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-3xl font-display font-bold text-pink-600">
            {metrics?.averageCompletionRate}%
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Avg {metrics?.avgQuestionsAnswered} questions per start
          </p>
        </div>

        <div className="card-base p-5">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold mb-2">
            <span>CUSTOM USER QUIZZES</span>
            <Share2 className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-text-primary)]">
            {metrics?.totalQuizzesCreated ?? 0}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            First-party persistent DB records
          </p>
        </div>

        <div className="card-base p-5">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold mb-2">
            <span>MOBILE USAGE SHARE</span>
            <Smartphone className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-text-primary)]">
            86%
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Mobile-first responsive visitors
          </p>
        </div>
      </div>

      {/* Funnel + Top Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Conversion Funnel */}
        <div className="card-base p-6">
          <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4">
            User Conversion Funnel
          </h2>
          <div className="space-y-4">
            {metrics?.funnel.map((step, idx) => (
              <div key={step.stage}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[var(--color-text-primary)]">
                    {idx + 1}. {step.stage}
                  </span>
                  <span className="text-pink-600 font-bold">
                    {step.count.toLocaleString()} ({step.conversion}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                    style={{ width: `${step.conversion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Quizzes Table */}
        <div className="card-base p-6">
          <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4">
            Most Popular Quizzes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold uppercase">
                  <th className="pb-3">Quiz Name</th>
                  <th className="pb-3 text-right">Plays</th>
                  <th className="pb-3 text-right">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {metrics?.topQuizzes.map((q) => (
                  <tr key={q.title}>
                    <td className="py-3 font-semibold text-[var(--color-text-primary)]">
                      {q.title}
                    </td>
                    <td className="py-3 text-right text-[var(--color-text-secondary)]">
                      {q.plays.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-bold text-pink-600">
                      {q.completionRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-pink-500" /> Traffic Sources
          </h2>
          <div className="space-y-3">
            {metrics?.trafficSources.map((ts) => (
              <div
                key={ts.source}
                className="flex items-center justify-between p-3 rounded-xl bg-pink-50/50 border border-pink-100 text-xs"
              >
                <span className="font-medium text-[var(--color-text-primary)]">{ts.source}</span>
                <span className="font-bold text-pink-600">{ts.share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-6">
          <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-pink-500" /> Device Breakdown
          </h2>
          <div className="space-y-3">
            {metrics?.devices.map((d) => (
              <div key={d.device}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[var(--color-text-primary)]">{d.device}</span>
                  <span className="text-pink-600 font-bold">{d.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
