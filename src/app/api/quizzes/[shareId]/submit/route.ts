import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitQuizResponse } from "@/lib/db/quiz-store";
import { checkRateLimit } from "@/lib/security/rate-limit";

interface RouteParams {
  params: Promise<{ shareId: string }>;
}

const submitSchema = z.object({
  participantName: z.string().min(1, "Name is required").max(60, "Name too long"),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedIds: z.array(z.string()).min(1, "Select at least one option"),
    })
  ),
});

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { shareId } = await params;
    const ip = req.headers.get("x-forwarded-for") || "anon";

    const limit = checkRateLimit(`quiz_submit_${shareId}_${ip}`, {
      windowMs: 60 * 1000,
      maxRequests: 15,
    });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please slow down." },
        { status: 429, headers: { "Retry-After": String(limit.resetInSec) } }
      );
    }

    const body = await req.json();
    const validated = submitSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid submission data", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const result = await submitQuizResponse(
      shareId,
      validated.data.participantName,
      validated.data.answers
    );

    return NextResponse.json({ success: true, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
