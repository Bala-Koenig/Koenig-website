import { NextRequest, NextResponse } from "next/server";

type FeedbackBody = {
  courseId?: string;
  courseName?: string;
  action?: "like" | "unlike" | "dislike";
  reasons?: string[];
  comment?: string;
  contact?: string;
  mode?: string;
  batchId?: number | string | null;
  device?: string;
  pageUrl?: string;
  timestamp?: string;
};

const ALLOWED_ACTIONS = new Set(["like", "unlike", "dislike"]);
const MAX_COMMENT_LEN = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// In-memory, per-instance rate limiting. Resets on redeploy/restart and isn't
// shared across serverless instances — fine for abuse-deterrence on a low-
// traffic feedback endpoint, not a substitute for a durable store (e.g.
// Redis/Upstash) if this needs to scale.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(input: unknown, maxLen: number): string {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim().slice(0, maxLen);
}

function isValidContact(contact: string): boolean {
  if (!contact) return true;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /^[+\d][\d\s-]{6,19}$/;
  return email.test(contact) || phone.test(contact);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests, please try again shortly." }, { status: 429 });
  }

  let body: FeedbackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.action || !ALLOWED_ACTIONS.has(body.action)) {
    return NextResponse.json({ ok: false, error: "Invalid or missing action." }, { status: 400 });
  }

  const contact = sanitize(body.contact, 120);
  if (!isValidContact(contact)) {
    return NextResponse.json({ ok: false, error: "Contact must be a valid email or phone number." }, { status: 400 });
  }

  const payload = {
    courseId: sanitize(body.courseId, 60),
    courseName: sanitize(body.courseName, 200),
    action: body.action,
    reasons: Array.isArray(body.reasons) ? body.reasons.map((r) => sanitize(r, 80)).slice(0, 10) : [],
    comment: sanitize(body.comment, MAX_COMMENT_LEN),
    contact,
    mode: sanitize(body.mode, 30),
    batchId: body.batchId ?? null,
    device: sanitize(body.device, 20),
    pageUrl: sanitize(body.pageUrl, 500),
    timestamp: body.timestamp || new Date().toISOString(),
    ip,
  };

  // No feedback datastore wired up yet — log server-side so submissions are
  // at least visible until one is. The client separately falls back to
  // localStorage if this endpoint is unreachable.
  console.log("[course-feedback]", payload);

  return NextResponse.json({ ok: true });
}
