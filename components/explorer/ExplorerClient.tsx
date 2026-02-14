"use client";

import Explorer from "@/components/explorer/Explorer";
import CardGrid from "@/components/ui/CardGrid";
import ProjectCard from "@/components/cards/ProjectCard";
import type { ExplorerItem } from "@/lib/explorer/types";

type Variant = "projects" | "blog" | "photos";

/**
 * renderCard
 * Chooses which card component to render based on the current explorer variant.
 * This stays inside the client file so we never pass functions from server → client.
 */
function renderCard(variant: Variant, item: ExplorerItem) {
  switch (variant) {
    case "projects":
      return <ProjectCard item={item} />;
    default:
      return <ProjectCard item={item} />;
  }
}

/**
 * ExplorerClient
 * Generic interactive explorer (search/filter/sort) + grid rendering.
 */
export default function ExplorerClient({
  heading,
  description,
  items,
  variant,
}: {
  heading: string;
  description?: string;
  items: ExplorerItem[];
  variant: Variant;
}) {
  return (
    <Explorer
      heading={heading}
      description={description}
      items={items}
      renderResults={(filtered) => (
        <CardGrid>
          {filtered.map((item) => (
            /**
             * Wrapper controls card width + height consistently across all content types.
             *
             * - `w-full`: card can grow to fill available width
             * - `max-w-[26rem]`: prevents a single card on a row looking huge
             * - `h-full`: allows equal-height behaviour when the card also uses h-full
             */
              <div key={item.id} className="h-full">
                {renderCard(variant, item)}
              </div>
          ))}
        </CardGrid>
      )}
    />
  );
}