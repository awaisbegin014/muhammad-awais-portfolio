import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; expires: number }>();
const recipient = "awaisshaikhcs786@gmail.com";

export async function GET() {
  return NextResponse.json({ directDelivery: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Please send your message from the contact form." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "The message must be submitted as JSON." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > 16000) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  }

  let input: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 16000) return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid message");
    input = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please check your message and try again." }, { status: 400 });
  }

  const fields = ["name", "email", "subject", "message"] as const;
  if (fields.some(field => typeof input[field] !== "string") || (input.website !== undefined && input.website !== "")) {
    return NextResponse.json({ error: "Please complete the contact form." }, { status: 400 });
  }
  const name = (input.name as string).trim();
  const email = (input.email as string).trim();
  const subject = (input.subject as string).trim();
  const message = (input.message as string).trim();
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name) ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      subject.length < 2 || subject.length > 160 || /[\r\n]/.test(subject) ||
      message.length < 10 || message.length > 4000) {
    return NextResponse.json({ error: "Please check your name, email, subject, and message length." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Direct delivery is unavailable. Please continue in Gmail instead." }, { status: 503 });
  }

  // Best-effort per-instance throttling. A distributed limiter can be added for high traffic.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = attempts.get(address);
  if (limit && limit.count >= 4) {
    return NextResponse.json({ error: "Please wait a few minutes before sending another message." }, { status: 429, headers: { "Retry-After": "600" } });
  }
  if (!limit && attempts.size >= 2000) {
    return NextResponse.json({ error: "The contact form is busy. Please try again shortly." }, { status: 429 });
  }
  attempts.set(address, { count: (limit?.count ?? 0) + 1, expires: limit?.expires ?? now + 600000 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string") {
      return NextResponse.json({ error: "Your message could not be sent. Try again or continue in Gmail instead." }, { status: 502 });
    }
    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please continue in Gmail instead." }, { status: 502 });
  }
}
