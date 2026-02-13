// components/sections/Projects.tsx
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid";
import ProjectCard from "@/components/cards/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import type { ExplorerItem } from "@/lib/explorer/types";

/**
 * Home Projects section:
 * - Server component (can read MDX via getAllProjects)
 * - Renders top 6 project cards
 */
export default function Projects(): JSX.Element {
  const projects = getAllProjects();

  // Map to the same ExplorerItem shape your card expects
  const items: ExplorerItem[] = projects.map((p) => ({
    id: p.slug,
    href: `/projects/${p.slug}`,
    title: p.frontmatter.title,
    summary: p.frontmatter.summary,
    date: p.frontmatter.date,
    type: p.frontmatter.type,
    tags: p.frontmatter.stack ?? [],
    confidential: !!p.frontmatter.confidential,
  }));

  const top = items.slice(0, 6);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Case studies across cybersecurity, automation, AI, and software builds.
            </p>
          </div>

          <Link href="/projects" className="btn-secondary hidden sm:inline-flex">
            View all projects
          </Link>
        </div>

        <CardGrid>
          {top.map((item) => (
            <ProjectCard key={item.id} item={item} />
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