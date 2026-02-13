import React from "react";

/**
 * A single item displayed in the PhaseGrid.
 * - title: Required heading shown in the box.
 * - description: Optional supporting text shown beneath the title.
 * - tone: Optional style key (maps to CSS classes like `tone tone-discovery`).
 */
type PhaseGridItem = {
  title: string;
  description?: string;
  tone?: string; // e.g. "discovery" | "containment" | "eradication" | "recovery" | "lessons"
};

/**
 * Returns the CSS class string used to colour-code a grid item.
 * If no tone is provided, we fall back to the base `.tone` styles.
 *
 * Example:
 *  - toneClass("discovery") => "tone tone-discovery"
 *  - toneClass(undefined)   => "tone"
 */
function toneClass(tone?: string): string {
  if (!tone) return "tone";
  return `tone tone-${tone}`;
}

/**
 * PhaseGrid
 * A reusable, MDX-friendly “table-like” grid that renders colour-coded boxes.
 * Designed for things like incident response phases, KPIs, categories, or checklists.
 *
 * Layout:
 * - mobile: 1 column (default)
 * - small screens: 2 columns (sm)
 * - large screens: 5 columns (lg) — perfect for a 5-phase process
 *
 * Styling:
 * - Base box styling comes from Tailwind classes (border, padding, shadow)
 * - Colour comes from global CSS tone classes (e.g. `.tone-discovery`)
 */
export default function PhaseGrid({
  title,
  items,
}: {
  title?: string;
  items: PhaseGridItem[];
}): JSX.Element {
  return (
    // Adds vertical spacing so the component breathes within MDX pages.
    <section className="my-10">
      {/* Only render a heading if a title was provided. */}
      {title ? (
        <h3 className="mb-4 text-center text-lg font-semibold">{title}</h3>
      ) : null}

      {/* Centre the grid and limit width so it stays readable on ultra-wide screens. */}
      <div className="mx-auto max-w-4xl">
        {/* Responsive grid: 1 → 2 → 5 columns depending on viewport. */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {items.map((item) => (
            <div
              // Title used as key; ensure titles are unique within the grid.
              key={item.title}
              className={[
                // Base “card-like” styling
                "rounded-2xl border p-4 text-center shadow-sm",
                // Small hover lift for polish
                "transition hover:-translate-y-0.5 hover:shadow-md",
                // Dynamic tone classes (colour-coded via globals.css)
                toneClass(item.tone),
              ].join(" ")}
            >
              {/* Item heading */}
              <div className="font-semibold">{item.title}</div>

              {/* Optional description */}
              {item.description ? (
                <div className="mt-2 text-sm opacity-80">{item.description}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}