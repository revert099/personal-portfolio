/**
 * A single KPI item (label + value) used in MDX project pages.
 * Example: { label: "Model", value: "MobileNetV2" }
 */
type Item = { label: string; value: string };

/**
 * KPI
 * Displays a small set of key metrics/highlights in a responsive grid:
 * - 1 column on mobile
 * - 3 columns from sm+
 * Each item has a vertical accent bar for quick visual scanning.
 */
export default function Kpi({ items }: { items: Item[] }): JSX.Element {
  return (
    // Responsive KPI grid (good for 3–6 quick highlights).
    <div className="mt-8 grid gap-6 sm:grid-cols-3">
      {items.map((i) => (
        // Use label as a key (fine as long as labels are unique per grid).
        <div key={i.label} className="relative pl-4">
          {/* Accent bar on the left to make KPI blocks stand out. */}
          <span className="absolute left-0 top-1 h-10 w-[3px] rounded-full bg-accent/70" />

          {/* Small, muted label (all caps for "KPI" vibe). */}
          <div className="text-xs uppercase tracking-wide text-muted">
            {i.label}
          </div>

          {/* Main KPI value. */}
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {i.value}
          </div>
        </div>
      ))}
    </div>
  );
}