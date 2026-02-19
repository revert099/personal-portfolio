import React from "react";

/**
 * A single tile in the PhaseGrid.
 *
 * - title: Required heading displayed inside the tile
 * - description: Optional secondary text beneath the title
 * - tone: Optional key for the default palette (Delinea colours)
 * - className: Optional Tailwind classes to override the default palette per item
 */
type PhaseGridItem = {
  title: string;
  description?: string;

  // You can constrain these if you want stricter typing, but leaving string allows flexibility.
  tone?: "discovery" | "containment" | "eradication" | "recovery" | "lessons" | string;

  /**
   * Optional Tailwind overrides (wins over tone).
   * Example: "bg-sky-50 border-sky-200 text-sky-950"
   */
  className?: string;
};

/**
 * Default (Delinea-like) tone palette.
 * These are your “default structure” colours and can stay consistent across your site.
 *
 * Note:
 * - We include background, border, and text colours together so they always match.
 * - `/60` etc. keeps it subtle so text is readable.
 */
const DEFAULT_TONE_CLASSES: Record<string, string> = {
  discovery: "bg-[#FFFF99]/60 border-[#FFFF99] text-slate-900",
  containment: "bg-[#FFCC99]/60 border-[#FFCC99] text-slate-900",
  eradication: "bg-[#FF9999]/60 border-[#FF9999] text-slate-900",
  recovery: "bg-[#99FF99]/60 border-[#99FF99] text-slate-900",
  lessons: "bg-[#CC99FF]/50 border-[#CC99FF] text-slate-900",
  default: "bg-slate-50 border-slate-200 text-slate-900",
};

/**
 * Resolve colour classes:
 * - if item.className is provided → use it
 * - else if item.tone matches our default palette → use it
 * - else fall back to a neutral style
 */
function resolveColourClasses(item: PhaseGridItem): string {
  if (item.className?.trim()) return item.className;
  if (item.tone && DEFAULT_TONE_CLASSES[item.tone]) return DEFAULT_TONE_CLASSES[item.tone];
  return DEFAULT_TONE_CLASSES.default;
}

/**
 * Pick a column layout that:
 * - avoids the “4 items stuck left with empty space” issue
 * - still looks good on common breakpoints
 *
 * Key idea:
 * - On large screens we *match columns to item count* up to a cap.
 *   e.g. 4 items → 4 columns (centred, no dead space)
 *        5 items → 5 columns (classic 5-phase)
 *        6+ items → cap at 6 (or choose 5 if you prefer)
 *
 * You can tweak this to your preference without touching rendering logic.
 */
function getResponsiveGridClasses(itemCount: number): string {
  // Hard caps so tiles don’t become too narrow on big screens.
  // If you *never* want 6 columns, change maxColsLg to 5.
  const maxColsLg = 6;

  // Clamp columns to 1..maxColsLg
  const colsLg = Math.max(1, Math.min(itemCount, maxColsLg));

  /**
   * We still control small/medium behaviour so it wraps nicely on mobile:
   * - 1 col on tiny screens
   * - 2 cols on small screens
   * - 3 cols on medium screens (works for most counts)
   * - on large screens: dynamic columns based on count
   *
   * Why not fully dynamic at all breakpoints?
   * Tailwind needs known class names at build time, so truly dynamic "grid-cols-${n}"
   * won’t work unless you safelist classes. This is why we keep sm/md fixed,
   * and only vary lg with a small controlled set.
   */
  const lgClassMap: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  return [
    "grid",
    "gap-3",
    "grid-cols-1",
    "sm:grid-cols-2",
    "md:grid-cols-3",
    lgClassMap[colsLg] ?? "lg:grid-cols-5",
  ].join(" ");
}

/**
 * PhaseGrid
 *
 * Goals:
 * - MDX-friendly component for “phase” boxes
 * - Uniform sizing across tiles
 * - Text centred within each tile (including multi-line titles)
 * - Grid centred on the page (especially when fewer items than columns)
 * - Default palette (Delinea), but allow easy override per item
 */
export default function PhaseGrid({
  title,
  items,
  minHeight = 120,
}: {
  title?: string;
  items: PhaseGridItem[];

  /**
   * Uniform tile height (all tiles match).
   * Increase if your descriptions are longer.
   */
  minHeight?: number;
}) {
  // Count items once so we can pick a better grid layout.
  const itemCount = items.length;

  return (
    <section className="my-10">
      {/* Optional heading for the entire grid */}
      {title ? (
        <h3 className="mb-4 text-center text-lg font-semibold">{title}</h3>
      ) : null}

      {/* Limit width so it doesn’t get too stretched on ultra-wide screens */}
      <div className="mx-auto max-w-5xl">
        {/* 
          place-items-center:
          - centres the *grid items* within their grid cells (handy when widths vary slightly)
          
          justify-items-stretch:
          - keeps tiles stretching to fill their column width (uniform look)
          
          Note: "place-items-center" conflicts a bit with "stretch" goals, so
          we instead centre the grid itself using "mx-auto" + the grid container
          and rely on uniform column widths.
        */}
        <div
          className={getResponsiveGridClasses(itemCount)}
          style={{
            /**
             * If you want the whole grid to shrink-wrap to content and centre
             * (instead of filling the full width), you can use:
             *   width: "fit-content"
             * and wrap it in a container with display flex justify-center.
             *
             * BUT: the better look for “cards” is typically full container width,
             * with tiles uniformly filling columns (what we do now).
             */
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              className={[
                // Card shell
                "rounded-2xl border shadow-sm",
                "transition hover:-translate-y-0.5 hover:shadow-md",

                // Centre content inside tile
                // - justify-center centres vertically
                // - items-center centres horizontally
                // - text-center centres text alignment
                "flex flex-col items-center justify-center text-center",

                // Spacing inside tile
                "px-4 py-3",

                // Colour palette (default tone or per-item override)
                resolveColourClasses(item),
              ].join(" ")}
              style={{
                /**
                 * Uniform height across all tiles.
                 * "minHeight" ensures even if some titles are short, everything matches.
                 */
                minHeight,
              }}
            >
              {/* 
                whitespace-pre-line allows you to do:
                title: "Lessons\nLearned"
                and it will render as two lines, centred.
              */}
              <div className="font-semibold leading-snug whitespace-pre-line">
                {item.title}
              </div>

              {/* Optional supporting text */}
              {item.description ? (
                <div className="mt-2 text-sm opacity-80 leading-snug">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}