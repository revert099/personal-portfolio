"use client";

import { useEffect, useState, type ReactNode } from "react";

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
};

/**
 * Reveal
 * A lightweight “staggered reveal” wrapper used for hero text and other UI elements.
 *
 * How it works:
 * - Starts hidden (opacity 0 + slight downward offset).
 * - After `delayMs`, it toggles `shown` to true, which triggers a CSS transition.
 *
 * Notes:
 * - This is a client component because it relies on `useEffect` and `setTimeout`.
 * - Wrapper is a <span> so it can be used inline (e.g., "Hi, I'm Jacob." on one line).
 */
export default function Reveal({
  children,
  delayMs = 0,
  durationMs = 900,
  className,
}: RevealProps) {
  // Whether the element has been revealed yet.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Schedule reveal after the requested delay.
    const t = window.setTimeout(() => setShown(true), delayMs);

    // Cleanup timeout if the component unmounts (prevents memory leaks).
    return () => window.clearTimeout(t);
  }, [delayMs]);

  return (
    <span
      className={[
        // Smooth transition for both opacity + transform.
        // NOTE: duration is ultimately controlled by `durationMs` below.
        "inline-block transition-all ease-out",
        // Hidden -> Visible state classes.
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        className,
      ].join(" ")}
      // Inline style lets us set per-instance transition duration without extra CSS classes.
      style={{ transitionDuration: `${durationMs}ms` }}
    >
      {children}
    </span>
  );
}