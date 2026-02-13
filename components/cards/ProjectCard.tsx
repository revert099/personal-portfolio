// components/cards/ProjectCard.tsx
import Link from "next/link";
import CardShell from "@/components/ui/CardShell";
import type { ExplorerItem } from "@/lib/explorer/types";
import { typeLabel } from "@/lib/content/labels";

/**
 * ProjectCard
 * Single project tile UI.
 */
export default function ProjectCard({
  item,
}: {
  item?: ExplorerItem; // <- allow optional so we can throw a nicer error
}): JSX.Element {
  if (!item) {
    throw new Error("ProjectCard: missing `item` prop. Did you render <ProjectCard /> without item?");
  }
  if (!item.href) {
    throw new Error(`ProjectCard: item.href is missing for id=${item.id}`);
  }

  return (
    <Link href={item.href} className="block w-full sm:w-[22rem]">
      <CardShell className="h-full">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
            {item.type ? typeLabel(item.type) : "Project"}
          </span>
          {item.date ? <span className="text-xs text-muted">{item.date}</span> : null}
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
        {item.summary ? <p className="mt-3 text-muted line-clamp-3">{item.summary}</p> : null}
      </CardShell>
    </Link>
  );
}