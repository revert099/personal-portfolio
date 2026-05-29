"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Props for the Reveal component.
 * - children: The content to reveal (text, buttons, inline elements).
 * - delayMs: Delay before revealing (used for staggered hero animations).
 * - durationMs: How long the fade/slide transition takes.
 * - className: Optional extra classes to apply to the wrapper.
 */
type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  durationMs?: number;
  className?: string;
  as?: "span" | "div" | "p" | "h1" | "h2";
  mode?: "load" | "view";
  rootMargin?: string;
  threshold?: number;
};

/**
 * Reveal
 * A lightweight reveal wrapper used for hero text and scroll-in view content.
 *
 * How it works:
 * - Starts hidden (opacity 0 + slight downward offset).
 * - In `load` mode it reveals after `delayMs`.
 * - In `view` mode it reveals after entering the viewport.
 *
 * Notes:
 * - This is a client component because it relies on `useEffect` and `setTimeout`.
 * - Default wrapper is a <span>, but block tags can be requested via `as`.
 */
export default function Reveal({
  children,
  delayMs = 0,
  durationMs = 900,
  className,
  as = "span",
  mode = "load",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
}: RevealProps) {
  // Whether the element has been revealed yet.
  const [shown, setShown] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  // Fix 1: respect prefers-reduced-motion — show immediately with no delay or animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
    }
  }, []);

  useEffect(() => {
    if (mode !== "load") return;

    // Schedule reveal after the requested delay.
    const t = window.setTimeout(() => setShown(true), delayMs);

    // Cleanup timeout if the component unmounts (prevents memory leaks).
    return () => window.clearTimeout(t);
  }, [delayMs, mode]);

  useEffect(() => {
    if (mode !== "view" || shown) return;

    const node = nodeRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = window.setTimeout(() => setShown(true), delayMs);
      return () => window.clearTimeout(fallbackTimer);
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        timer = window.setTimeout(() => setShown(true), delayMs);
        observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [delayMs, mode, rootMargin, shown, threshold]);

  const Tag = as;

  return (
    <Tag
      ref={(node) => {
        nodeRef.current = node as HTMLElement | null;
      }}
      className={[
        // Smooth transition for both opacity + transform.
        // NOTE: duration is ultimately controlled by `durationMs` below.
        "transition-all ease-out",
        // Hidden -> Visible state classes.
        shown ? "opacity-100 translate-y-0" : "opacity-0 md:translate-y-4",
        as === "span" ? "inline-block" : undefined,
        className,
      ].join(" ")}
      // Inline style lets us set per-instance transition duration without extra CSS classes.
      style={{ transitionDuration: `${durationMs}ms` }}
    >
      {children}
    </Tag>
  );
}
