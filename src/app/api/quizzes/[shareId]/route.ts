import { NextRequest, NextResponse } from "next/server";
import { getQuizByShareId } from "@/lib/db/quiz-store";

interface RouteParams {
  params: Promise<{ shareId: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { shareId } = await params;
    const { quiz, isExpired } = await getQuizByShareId(shareId);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if (isExpired) {
      return NextResponse.json({ error: "This quiz link has expired", isExpired: true }, { status: 410 });
    }

    return NextResponse.json({ quiz });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
