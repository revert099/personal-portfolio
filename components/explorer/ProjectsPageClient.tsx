"use client";

import { useMemo, useState } from "react";

import Explorer from "@/components/explorer/Explorer";
import ProjectCard from "@/components/cards/ProjectCard";
import CardGrid from "@/components/ui/CardGrid";
import type { ExplorerItem } from "@/lib/explorer/types";

type ProjectTab = "all" | "professional" | "personal";

const TABS: Array<{ id: ProjectTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "professional", label: "Professional" },
  { id: "personal", label: "Personal" },
];

export default function ProjectsPageClient({
  items,
}: {
  items: ExplorerItem[];
}) {
  const [activeTab, setActiveTab] = useState<ProjectTab>("all");

  const tabbedItems = useMemo(() => {
    if (activeTab === "all") return items;

    return items.filter((item) => item.category === activeTab);
  }, [activeTab, items]);

  return (
    <Explorer
      heading="Work & Projects"
      description="Professional client work alongside personal projects - things I've built for clients and things I've built because I wanted to."
      items={tabbedItems}
      headerExtra={
        <div className="flex flex-wrap gap-3">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={[
                  "rounded-xl border px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:shadow-sm",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      }
      renderResults={(filtered) => (
        <CardGrid>
          {filtered.map((item) => (
            <div key={item.id} className="h-full">
              <ProjectCard item={item} />
            </div>
          ))}
        </CardGrid>
      )}
    />
  );
}
