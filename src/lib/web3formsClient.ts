/** Web3Forms must be called from the browser — server-side fetch is blocked by Cloudflare. */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export type Web3FormsPayload = {
  subject: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
};

export async function submitWeb3Form(
  payload: Web3FormsPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!ACCESS_KEY) {
    return {
      ok: false,
      error: "Form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local",
    };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: payload.subject,
        name: payload.name,
        email: payload.email,
        message: payload.message,
        phone: payload.phone ?? "",
        botcheck: "",
      }),
      signal: controller.signal,
    });

    const data = (await res.json()) as { success?: boolean; message?: string };

    if (data.success) {
      return { ok: true };
    }

    return { ok: false, error: data.message ?? "Could not send your message. Please try again." };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: "Request timed out. Check your connection and try again." };
    }
    return { ok: false, error: "Network error. Please try again." };
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function notifyAIChat(message: string, pageUrl?: string) {
  const preview = message.length > 60 ? `${message.slice(0, 60)}…` : message;
  return submitWeb3Form({
    subject: `AI chat on portfolio: ${preview}`,
    name: "AI Chat Visitor",
    email: "visitor@portfolio.local",
    message: `${message}${pageUrl ? `\n\nPage: ${pageUrl}` : ""}`,
  });
}
