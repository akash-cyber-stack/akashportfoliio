import { NextResponse } from "next/server";
import { buildContactEmailHtml, sendNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !email) {
      return NextResponse.json({ ok: false, error: "Name, phone, and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    const plainText = [
      `New contact from your portfolio`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      message || "(no message)",
    ].join("\n");

    const result = await sendNotificationEmail({
      subject: `Portfolio contact: ${name}`,
      html: buildContactEmailHtml({ name, phone, email, message }),
      replyTo: email,
      extra: { from_name: name, phone, message: plainText },
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
