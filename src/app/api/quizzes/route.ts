import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createQuiz } from "@/lib/db/quiz-store";
import { checkRateLimit } from "@/lib/security/rate-limit";

const createQuizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(140, "Title cannot exceed 140 characters"),
  description: z.string().max(500).optional(),
  creatorName: z.string().max(60).optional(),
  isPublic: z.boolean().default(true),
  expiresInDays: z.number().int().min(1).max(365).optional(),
  questions: z
    .array(
      z.object({
        text: z.string().min(2, "Question cannot be empty").max(300),
        emoji: z.string().max(8).optional(),
        type: z.enum(["single", "multi"]).default("single"),
        options: z
          .array(
            z.object({
              text: z.string().min(1, "Option cannot be empty").max(200),
              emoji: z.string().max(8).optional(),
              isCorrect: z.boolean().optional(),
              score: z.number().int().min(0).max(10).optional(),
            })
          )
          .min(2, "Each question must have at least 2 options")
          .max(6, "Maximum 6 options per question"),
      })
    )
    .min(1, "Quiz must contain at least 1 question")
    .max(30, "Maximum 30 questions allowed"),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limit by client IP or header
    const ip = req.headers.get("x-forwarded-for") || "anon";
    const limit = checkRateLimit(`quiz_create_${ip}`, { windowMs: 60 * 1000, maxRequests: 10 });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before creating another quiz." },
        { status: 429, headers: { "Retry-After": String(limit.resetInSec) } }
      );
    }

    const body = await req.json();
    const validated = createQuizSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid quiz data", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const result = await createQuiz(validated.data);

    return NextResponse.json(
      {
        success: true,
        shareId: result.shareId,
        id: result.id,
        shareUrl: `/play/${result.shareId}`,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
