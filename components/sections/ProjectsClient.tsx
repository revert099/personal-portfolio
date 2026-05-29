// components/sections/ProjectsClient.tsx
"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/cards/ProjectCard";
import CardGrid from "@/components/ui/CardGrid";
import type { ExplorerItem } from "@/lib/explorer/types";

export default function ProjectsClient({
  items,
}: {
  items: ExplorerItem[];
}) {
  return (
    <section id="projects" className="section">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
            <p className="mt-4 max-w-2xl text-muted">
              A few examples of what automation looks like in practice.
            </p>
          </div>

          <Link href="/projects" className="btn-secondary hidden sm:inline-flex">
            View all projects
          </Link>
        </div>

        <CardGrid>
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              as="div"
              mode="view"
              delayMs={index * 80}
              durationMs={380}
              className="h-full"
            >
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </CardGrid>

        <div className="mt-8 sm:hidden">
          <Link href="/projects" className="btn-secondary inline-flex w-full justify-center">
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}