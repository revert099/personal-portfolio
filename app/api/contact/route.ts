// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Resend client (server-side only).
 * Uses RESEND_API_KEY from environment variables.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Very small, basic in-memory rate limiter.
 * NOTE: On serverless platforms, this resets on cold starts and won’t be perfect.
 * For “real” rate limiting, use Upstash Redis / Vercel KV later.
 */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 submissions per minute per IP

type RateEntry = { count: number; windowStart: number };
const rateMap: Map<string, RateEntry> =
  // @ts-expect-error - keep in global scope across hot reloads in dev
  globalThis.__contactRateMap ?? new Map();

 // @ts-expect-error
globalThis.__contactRateMap = rateMap;

/**
 * Extract IP for best-effort rate limiting behind proxies (Vercel etc).
 */
function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

/**
 * Basic email format check (not perfect, but good enough for a contact form).
 */
function looksLikeEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sanitise strings for email content (keep it simple).
 */
function clean(s: unknown, max = 2000): string {
  const str = typeof s === "string" ? s : "";
  return str.replace(/\r/g, "").trim().slice(0, max);
}

export async function POST(req: Request): Promise<Response> {
  try {
    // --- Env checks (fail fast, clearer errors) ---
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }
    if (!process.env.CONTACT_TO_EMAIL) {
      return NextResponse.json({ ok: false, error: "Missing CONTACT_TO_EMAIL" }, { status: 500 });
    }
    if (!process.env.CONTACT_FROM_EMAIL) {
      return NextResponse.json({ ok: false, error: "Missing CONTACT_FROM_EMAIL" }, { status: 500 });
    }

    // --- Rate limiting (best-effort) ---
    const ip = getClientIp(req);
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateMap.set(ip, { count: 1, windowStart: now });
    } else {
      if (entry.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { ok: false, error: "Too many requests. Please try again shortly." },
          { status: 429 }
        );
      }
      entry.count += 1;
      rateMap.set(ip, entry);
    }

    // --- Read body ---
    const body = await req.json();

    // Honeypot: bots often fill this, humans won’t
    const honey = clean(body.company ?? body.website ?? body.hp ?? "", 200);
    if (honey.length > 0) {
      // Pretend success to avoid teaching bots
      return NextResponse.json({ ok: true });
    }

    // --- Validate fields ---
    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const message = clean(body.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in name, email, and message." },
        { status: 400 }
      );
    }

    if (!looksLikeEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    // --- Send email via Resend ---
    const subject = `Portfolio message from ${name}`;

    const text = [
      `New portfolio contact form submission`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `IP: ${ip}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email, // so hitting "Reply" goes to the sender
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Don’t leak internals to the client
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}