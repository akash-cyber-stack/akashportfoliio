import { NextResponse } from "next/server";
import { buildAIChatEmailHtml, sendNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? "").trim();
    const pageUrl = body.pageUrl ? String(body.pageUrl) : undefined;

    if (!message || message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Invalid message." }, { status: 400 });
    }

    const preview = message.length > 80 ? `${message.slice(0, 80)}…` : message;
    const result = await sendNotificationEmail({
      subject: `AI chat on portfolio: ${preview}`,
      html: buildAIChatEmailHtml({ message, pageUrl }),
      extra: {
        from_name: "AI Chat Visitor",
        message: `Visitor message:\n\n${message}${pageUrl ? `\n\nPage: ${pageUrl}` : ""}`,
      },
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
