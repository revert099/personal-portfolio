import type { ReactNode } from "react";

/**
 * CardGrid
 * Shared layout for card collections (Projects / Blog / Photos).
 *
 * Why flex-wrap (sm+):
 * - CSS Grid cannot reliably "centre only the last row" when the final row has 1–2 items.
 * - Flex-wrap *does* centre leftover items naturally using `justify-center`.
 *
 * Layout behaviour:
 * - Mobile: single column (stacked, full width)
 * - sm+: wrapping row layout with fixed-ish card widths, centred as a group
 */
export default function CardGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "mt-10",
        /**
         * Mobile: stacked cards.
         * We keep it simple: vertical list, full width.
         */
        "flex flex-col gap-6",

        /**
         * sm+:
         * - flex-wrap creates rows
         * - justify-center centres each row (including the last row)
         * - gap-6 keeps spacing consistent
         */
        "sm:flex-row sm:flex-wrap sm:justify-center",
      ].join(" ")}
    >
      {children}
    </div>
  );
}