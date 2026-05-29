"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

// ─── Data ────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    title: "You're doing the same tasks on repeat",
    body: "Every week the same reports, the same follow-up emails, the same data entry. It's not complicated — it's just relentless.",
  },
  {
    title: "Your tools don't talk to each other",
    body: "Information lives in too many places. Something gets updated in one system and someone has to manually update everything else.",
  },
  {
    title: "The business runs on you, not systems",
    body: "If you're the only one who knows how something works, that's a problem. Especially when you're already flat out.",
  },
];

const reviewIncludes = [
  "A 60–90 minute session — on-site in Perth or via video call",
  "We map out where your time actually goes each week",
  "I show you specifically what could be automated in your business",
  "You leave with a clear picture of what's possible and what it would cost",
  "No obligation to go further — but most people do",
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function TickIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-accent ${className}`}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Booking form ─────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function BookingForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    // Honeypot — bots fill this field, legitimate users never see it
    if (fd.get("website")) {
      setStatus("success");
      return;
    }

    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      teamSize: String(fd.get("teamSize") ?? "").trim(),
      timeDrain: String(fd.get("timeDrain") ?? "").trim(),
    };

    // ─────────────────────────────────────────────────────────────────────────
    // TODO: Replace the console.log below with a real API call.
    //
    // Option A — new Next.js route (recommended):
    //   const res = await fetch("/api/automation-review", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   if (!res.ok) throw new Error("Submission failed");
    //
    // Option B — Formspree:
    //   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //     method: "POST",
    //     headers: { "Accept": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //
    // Option C — Resend (see /api/contact/route.ts for an existing example)
    // ─────────────────────────────────────────────────────────────────────────
    console.log("[AutomationReview] New booking submission:", data);

    // Simulated delay — remove once a real endpoint is wired in
    await new Promise<void>((resolve) => setTimeout(resolve, 700));

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <TickIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">
          You're booked in.
        </h3>
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-muted">
          Thanks — I'll be in touch within 1 business day to lock in a time.
          Check your inbox (and your junk folder, just in case).
        </p>
        <p className="mt-6 text-sm text-muted/70">
          Questions? Email jacob@jacobwinsor.com.au
        </p>
      </div>
    );
  }

  const inputBase =
    "h-11 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition-colors focus:border-foreground/40";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot — visually hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Row 1: name + email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Full name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputBase}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Email address</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputBase}
          />
        </label>
      </div>

      {/* Row 2: phone + team size */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="04xx xxx xxx"
            className={inputBase}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">
            How many people work in your business?
          </span>
          <select
            name="teamSize"
            required
            defaultValue=""
            className={`${inputBase} cursor-pointer`}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="just-me">Just me</option>
            <option value="2-5">2–5 people</option>
            <option value="6-15">6–15 people</option>
            <option value="16-50">16–50 people</option>
            <option value="50+">More than 50</option>
          </select>
        </label>
      </div>

      {/* Time drain */}
      <label className="grid gap-2">
        <span className="text-sm font-medium">
          What's your biggest time drain right now?
        </span>
        <textarea
          name="timeDrain"
          required
          rows={4}
          placeholder="e.g. chasing invoices, updating spreadsheets, sending the same emails..."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Book My Free Automation Review"}
        </button>

        <p className="mt-3 text-xs text-muted">
          Your details are kept private and never shared. Jacob Winsor · ABN 16 421 529 680
        </p>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Wordmark header — no nav links ─────────────────────────────────── */}
      <header className="border-b border-border/60 bg-background py-5">
        <div className="container-page">
          <span className="text-base font-semibold tracking-tight">
            Jacob Winsor
          </span>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36">
        <div className="container-page">
          <div className="max-w-3xl">
            <Reveal
              as="p"
              mode="load"
              delayMs={0}
              durationMs={380}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted"
            >
              Free for Perth small businesses · No obligation
            </Reveal>

            <Reveal
              as="h1"
              mode="load"
              delayMs={80}
              durationMs={380}
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              What would you do with 5 extra hours a week?
            </Reveal>

            <Reveal
              as="p"
              mode="load"
              delayMs={160}
              durationMs={380}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl"
            >
              Quoting, scheduling, follow-ups, reporting — the admin keeps
              piling up. I help small business owners across Western Australia
              cut the repetitive work so they can focus on the parts of the
              business that actually need them.
            </Reveal>

            <Reveal
              as="div"
              mode="load"
              delayMs={240}
              durationMs={380}
              className="mt-10"
            >
              <a
                href="#book"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
              >
                Book Your Free Automation Review
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pain points ────────────────────────────────────────────────────── */}
      <section className="bg-card py-24 lg:py-32">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {painPoints.map((card, i) => (
              <Reveal
                key={card.title}
                as="div"
                mode="view"
                delayMs={i * 80}
                durationMs={500}
              >
                <div className="h-full rounded-3xl border border-border bg-background p-8 shadow-sm">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal
              as="h2"
              mode="view"
              durationMs={500}
              className="text-3xl font-semibold tracking-tight"
            >
              Here's what the free Automation Review includes
            </Reveal>

            <Reveal as="div" mode="view" delayMs={80} durationMs={500}>
              <ul className="mt-8 space-y-5">
                {reviewIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <TickIcon className="mt-0.5 h-5 w-5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              as="p"
              mode="view"
              delayMs={160}
              durationMs={500}
              className="mt-8 text-sm leading-relaxed text-muted"
            >
              I work with small businesses across Western Australia. Trades,
              professional services, retail — if you're spending time on
              repetitive work, this session will be useful.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Social proof placeholder ────────────────────────────────────────── */}
      <section className="bg-card py-24 lg:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <Reveal as="div" mode="view" durationMs={500}>
              <figure className="rounded-3xl border border-border bg-background px-8 py-10 shadow-sm">
                <blockquote>
                  <p className="text-lg italic leading-relaxed text-muted">
                    "Client testimonial coming soon."
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div
                    className="h-11 w-11 rounded-full bg-border/60"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground/40">
                      Client name
                    </p>
                    <p className="text-xs text-muted/50">
                      Business type, Perth WA
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Booking form ───────────────────────────────────────────────────── */}
      <section id="book" className="py-24 lg:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-xl">
            <Reveal
              as="h2"
              mode="view"
              durationMs={500}
              className="text-3xl font-semibold tracking-tight"
            >
              Book your free session
            </Reveal>

            <Reveal
              as="p"
              mode="view"
              delayMs={80}
              durationMs={500}
              className="mt-3 text-muted"
            >
              Takes 2 minutes. I'll be in touch within 1 business day to
              confirm a time.
            </Reveal>

            <Reveal as="div" mode="view" delayMs={140} durationMs={500} className="mt-8">
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer — ABN and email only, no links ──────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="container-page">
          <p className="text-sm text-muted">
            Jacob Winsor · ABN 16 421 529 680 · jacob@jacobwinsor.com.au
          </p>
        </div>
      </footer>

    </div>
  );
}
