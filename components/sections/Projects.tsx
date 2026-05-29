// components/sections/Projects.tsx
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid";
import ProjectCard from "@/components/cards/ProjectCard";
import {
  getAllProjects,
  getProjectListingSummary,
  isHomepageFeaturedProject,
} from "@/lib/projects";
import type { ExplorerItem } from "@/lib/explorer/types";
import ProjectsClient from "./ProjectsClient";

/**
 * Home Projects section:
 * - Server component (fetches data and passes to client component for animations)
 */
export default function Projects() {
  const homepageProjects = getAllProjects()
    .filter((p) => isHomepageFeaturedProject(p.frontmatter))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .slice(0, 4);

  // Map to the same ExplorerItem shape your card expects
  const items: ExplorerItem[] = homepageProjects.map((p) => ({
    id: p.slug,
    href: `/projects/${p.slug}`,
    title: p.frontmatter.title,
    summary: getProjectListingSummary(p.frontmatter),
    date: p.frontmatter.date,
    type: p.frontmatter.type,
    tags: p.frontmatter.tags ?? p.frontmatter.stack ?? [],
    category: p.frontmatter.category,
    confidential: !!p.frontmatter.confidential,
  }));

  return <ProjectsClient items={items} />;
}
