import type { ExplorerItem } from "@/lib/explorer/types";
import ProjectsPageClient from "@/components/explorer/ProjectsPageClient";
import { getAllProjects, getProjectListingSummary } from "@/lib/projects";

/**
 * ProjectsPage (/projects)
 * Server component loads MDX frontmatter and passes plain data to the client.
 */
export default function ProjectsPage() {
  const projects = getAllProjects();

  const items: ExplorerItem[] = projects.map((p) => ({
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

  return (
    <main className="section">
      <div className="container-page">
        <ProjectsPageClient items={items} />
      </div>
    </main>
  );
}
