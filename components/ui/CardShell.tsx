import type { ReactNode } from "react";

/**
 * CardShell
 * Reusable "card container" that enforces:
 * - Consistent card height
 * - Consistent padding / border / background / shadow
 * - A flex column layout so content can be pinned to the bottom with mt-auto
 *
 * This is the single source of truth for card sizing across:
 * - Projects
 * - Blog
 * - Photography
 */
export default function CardShell({
  children,
  minHeight = 300,
  className = "",
}: {
  children: ReactNode;

  /**
   * minHeight:
   * Use a minimum height so short content still produces same-sized tiles.
   * You can tweak this globally once and all tiles update.
   */
  minHeight?: number;

  /**
   * className:
   * Optional extra Tailwind classes for per-card variations
   * (e.g., hover effects, special borders, etc.)
   */
  className?: string;
}) {
  return (
    /**
     * h-full ensures this card can stretch to the height of the grid cell.
     * minHeight ensures consistent tile sizing even with short content.
     */
    <div
      className={[
        "h-full rounded-3xl border border-border bg-card p-6 shadow-sm",
        className,
      ].join(" ")}
      style={{ minHeight }}
    >
      {/**
       * flex-col enables:
       * - normal content at the top
       * - footer content pinned at bottom via `mt-auto` in your tile code
       */}
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
}