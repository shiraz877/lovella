"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  Sparkles,
  Share2,
  Copy,
  Check,
  Eye,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/utils";

interface QuestionDraft {
  id: string;
  text: string;
  emoji: string;
  options: { id: string; text: string; isCorrect: boolean }[];
}

const DEFAULT_EMOJIS = ["❤️", "💭", "🍕", "✈️", "☕", "🎉", "🎬", "🌟"];

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [expiresInDays, setExpiresInDays] = useState<number>(30);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      id: "q1",
      text: "What is my absolute favourite comfort food?",
      emoji: "🍕",
      options: [
        { id: "o1", text: "Cheesy Pizza", isCorrect: true },
        { id: "o2", text: "Warm Ramen", isCorrect: false },
        { id: "o3", text: "Crispy Tacos", isCorrect: false },
        { id: "o4", text: "Sweet Pancakes", isCorrect: false },
      ],
    },
    {
      id: "q2",
      text: "If we had an entire free Sunday together, what would I want to do?",
      emoji: "☕",
      options: [
        { id: "o1", text: "Stay cozy in bed with movies & coffee", isCorrect: true },
        { id: "o2", text: "Go exploring a new town or hiking", isCorrect: false },
        { id: "o3", text: "Try a new fancy restaurant", isCorrect: false },
      ],
    },
  ]);

  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdShareId, setCreatedShareId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Question manipulation
  const addQuestion = () => {
    if (questions.length >= 20) return;
    const newId = `q${Date.now()}`;
    setQuestions((prev) => [
      ...prev,
      {
        id: newId,
        text: "",
        emoji: DEFAULT_EMOJIS[Math.floor(Math.random() * DEFAULT_EMOJIS.length)],
        options: [
          { id: `o1_${newId}`, text: "", isCorrect: true },
          { id: `o2_${newId}`, text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (qId: string) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  const updateQuestionText = (qId: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, text } : q))
    );
  };

  const updateQuestionEmoji = (qId: string, emoji: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, emoji } : q))
    );
  };

  const addOption = (qId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId || q.options.length >= 6) return q;
        return {
          ...q,
          options: [
            ...q.options,
            { id: `o_${Date.now()}`, text: "", isCorrect: false },
          ],
        };
      })
    );
  };

  const removeOption = (qId: string, optId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId || q.options.length <= 2) return q;
        const newOpts = q.options.filter((o) => o.id !== optId);
        // If we removed the correct option, mark the first one as correct
        if (!newOpts.some((o) => o.isCorrect) && newOpts.length > 0) {
          newOpts[0].isCorrect = true;
        }
        return { ...q, options: newOpts };
      })
    );
  };

  const updateOptionText = (qId: string, optId: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return {
          ...q,
          options: q.options.map((o) => (o.id === optId ? { ...o, text } : o)),
        };
      })
    );
  };

  const setCorrectOption = (qId: string, optId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return {
          ...q,
          options: q.options.map((o) => ({
            ...o,
            isCorrect: o.id === optId,
          })),
        };
      })
    );
  };

  // Submit quiz
  const handlePublish = async () => {
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg("Please give your quiz a title.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        setErrorMsg(`Question ${i + 1} is empty. Please enter your question.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].text.trim()) {
          setErrorMsg(
            `Question ${i + 1}, option ${j + 1} is empty. Please fill it in or remove it.`
          );
          return;
        }
      }
      if (!q.options.some((o) => o.isCorrect)) {
        setErrorMsg(`Question ${i + 1} needs a marked correct answer.`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          creatorName: creatorName.trim() || undefined,
          expiresInDays,
          questions: questions.map((q) => ({
            text: q.text.trim(),
            emoji: q.emoji || undefined,
            type: "single",
            options: q.options.map((o) => ({
              text: o.text.trim(),
              isCorrect: o.isCorrect,
            })),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create quiz");
      }

      setCreatedShareId(data.shareId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = createdShareId ? absoluteUrl(`/play/${createdShareId}`) : "";

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  // Success screen
  if (createdShareId) {
    const waText = encodeURIComponent(
      `Hey! I created a quiz about me on Lovelle. How well do you really know me? Take the quiz: ${shareUrl}`
    );

    return (
      <div className="container py-12 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-base p-8 sm:p-10"
        >
          <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 text-3xl">
            🎉
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Your Quiz is Live!
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base mb-6">
            Share this link with your partner, best friends, or group chat.
          </p>

          <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-center justify-between gap-2 mb-6">
            <span className="text-xs sm:text-sm font-mono text-pink-900 truncate">
              {shareUrl}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopyLink}
              className="flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a
              href={`https://wa.me/?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              Send on WhatsApp
            </a>
            <Button variant="primary" asChild>
              <Link href={`/play/${createdShareId}`}>
                <Eye className="w-4 h-4" />
                Play Your Quiz
              </Link>
            </Button>
          </div>

          <button
            onClick={() => {
              setCreatedShareId(null);
              setTitle("");
              setDescription("");
            }}
            className="text-xs text-[var(--color-text-muted)] hover:text-pink-600 transition-colors"
          >
            Create Another Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="pink" size="md" className="mb-2">
          No sign up required
        </Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
          Create Your Relationship Quiz
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Make a custom quiz about yourself, share the link, and see who gets the highest score!
        </p>
      </div>

      {/* Error alert */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      {/* Quiz Details Card */}
      <div className="card-base p-6 sm:p-8 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Quiz Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How Well Does Alex Know Me?"
            maxLength={140}
            className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="e.g. Alex"
              maxLength={60}
              className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              Link Expiration
            </label>
            <select
              value={expiresInDays}
              onChange={(e) => setExpiresInDays(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm bg-white"
            >
              <option value={7}>Expires in 7 days</option>
              <option value={30}>Expires in 30 days</option>
              <option value={90}>Expires in 90 days</option>
              <option value={365}>Never expires (1 year)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Short Description / Note (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Let's see if you really pay attention to me! No cheating 💕"
            maxLength={300}
            rows={2}
            className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none text-sm resize-none transition-all"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
            Questions ({questions.length}/20)
          </h2>
          <Button variant="secondary" size="sm" onClick={addQuestion}>
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
        </div>

        <AnimatePresence>
          {questions.map((q, qIndex) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-base p-5 sm:p-6 rounded-3xl border border-[var(--color-border)]"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {qIndex + 1}
                  </span>
                  <input
                    type="text"
                    value={q.emoji}
                    onChange={(e) => updateQuestionEmoji(q.id, e.target.value.slice(0, 4))}
                    className="w-10 h-10 text-xl text-center rounded-xl border border-[var(--color-border)] focus:border-pink-400 focus:outline-none"
                    title="Change emoji"
                  />
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestionText(q.id, e.target.value)}
                    placeholder="Enter your question here..."
                    className="flex-1 h-10 px-3 rounded-xl border border-[var(--color-border)] text-sm font-semibold focus:border-pink-400 focus:outline-none"
                  />
                </div>

                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Options */}
              <div className="pl-9 space-y-2.5">
                <span className="text-xs text-[var(--color-text-muted)] block mb-1">
                  Answer choices — click the checkmark to set your correct answer:
                </span>
                {q.options.map((opt, optIndex) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCorrectOption(q.id, opt.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        opt.isCorrect
                          ? "bg-pink-500 text-white shadow-sm"
                          : "border-2 border-[var(--color-border)] text-gray-300 hover:border-pink-300"
                      }`}
                      title={opt.isCorrect ? "Correct answer" : "Mark as correct"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                      className={`flex-1 h-9 px-3 rounded-xl border text-sm transition-all focus:outline-none ${
                        opt.isCorrect
                          ? "border-pink-400 bg-pink-50/30 text-pink-900 font-medium"
                          : "border-[var(--color-border)] focus:border-pink-300"
                      }`}
                    />

                    {q.options.length > 2 && (
                      <button
                        onClick={() => removeOption(q.id, opt.id)}
                        className="text-gray-300 hover:text-red-500 p-1"
                        title="Remove option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {q.options.length < 6 && (
                  <button
                    type="button"
                    onClick={() => addOption(q.id)}
                    className="text-xs font-semibold text-pink-600 hover:text-pink-700 pt-1 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add choice
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-[var(--color-border)]">
        <Button
          variant="primary"
          size="lg"
          onClick={handlePublish}
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" />
          Publish &amp; Get Share Link
        </Button>
      </div>
    </div>
  );
}
