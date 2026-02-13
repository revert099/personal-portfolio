// components/cards/BlogsCard.tsx
import Link from "next/link";
import CardShell from "@/components/ui/CardShell";
import type { ExplorerItem } from "@/lib/explorer/types";

/**
 * BlogsCard
 * Renders a single blog post tile.
 *
 * This is purely presentation:
 * - No searching/filtering/sorting here
 * - Reuses CardShell so blog/projects/photos share the same card sizing + style
 */
export default function BlogsCard({
  item,
}: {
  item: ExplorerItem;
}): JSX.Element {
  // Defensive guard: makes it obvious if the parent forgot to pass `item`
  if (!item?.href) {
    throw new Error("BlogsCard: missing required `item` (href/title).");
  }

  return (
    <Link href={item.href} className="block w-full sm:w-[22rem]">
      {/* h-full ensures all cards can stretch to equal height inside the grid */}
      <CardShell className="h-full">
        {/* Top row: tags/type + date */}
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
            {item.type ? item.type : "Blog"}
          </span>

          {item.date ? <span className="text-xs text-muted">{item.date}</span> : null}
        </div>

        {/* Title + summary */}
        <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>

        {item.summary ? (
          <p className="mt-3 text-muted line-clamp-3">{item.summary}</p>
        ) : null}

        {/* Optional tags */}
        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </CardShell>
    </Link>
  );
}