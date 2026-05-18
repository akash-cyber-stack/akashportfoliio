const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "pandeyakash85296@gmail.com";

export type EmailResult = { ok: true } | { ok: false; error: string };

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(subject: string, html: string, replyTo?: string): Promise<EmailResult | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_EMAIL],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err || "Resend failed" };
  }
  return { ok: true };
}

async function sendViaWeb3Forms(
  subject: string,
  html: string,
  replyTo?: string,
  extra?: Record<string, string>
): Promise<EmailResult | null> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return null;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: extra?.from_name ?? "Portfolio Visitor",
      email: replyTo ?? "visitor@portfolio.local",
      message: extra?.message ?? html.replace(/<[^>]+>/g, " "),
      phone: extra?.phone,
      botcheck: "",
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!data.success) {
    return { ok: false, error: data.message ?? "Web3Forms failed" };
  }
  return { ok: true };
}

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
  extra,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  extra?: Record<string, string>;
}): Promise<EmailResult> {
  const providers = [
    () => sendViaWeb3Forms(subject, html, replyTo, extra),
    () => sendViaResend(subject, html, replyTo),
  ];

  for (const provider of providers) {
    const result = await provider();
    if (result?.ok) return result;
    if (result && !result.ok) return result;
  }

  return {
    ok: false,
    error:
      "Email not configured. Add WEB3FORMS_ACCESS_KEY or RESEND_API_KEY to .env.local (see .env.example).",
  };
}

export function buildContactEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  return `
    <h2>New portfolio contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message || "(no message)")}</p>
    <hr />
    <p style="color:#666;font-size:12px;">Sent from akashportfolio contact form</p>
  `;
}

export function buildAIChatEmailHtml(data: { message: string; pageUrl?: string }) {
  return `
    <h2>New AI chat message on your portfolio</h2>
    <p><strong>Visitor asked:</strong></p>
    <blockquote style="border-left:4px solid #22d3ee;padding-left:12px;margin:12px 0;">
      ${escapeHtml(data.message)}
    </blockquote>
    ${data.pageUrl ? `<p><strong>Page:</strong> ${escapeHtml(data.pageUrl)}</p>` : ""}
    <hr />
    <p style="color:#666;font-size:12px;">Open Gmail on your phone for instant notification.</p>
  `;
}
