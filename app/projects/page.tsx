import type { ExplorerItem } from "@/lib/explorer/types";
import { getAllProjects } from "@/lib/projects";
import ExplorerClient from "@/components/explorer/ExplorerClient";

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
    summary: p.frontmatter.summary,
    date: p.frontmatter.date,
    type: p.frontmatter.type,
    tags: p.frontmatter.stack ?? [],
    confidential: !!p.frontmatter,
  }));

  return (
    <main className="section">
      <div className="container-page">
        <ExplorerClient
          heading="Projects"
          description="Case studies across cybersecurity, automation, AI, and software builds."
          items={items}
          variant="projects"
        />
      </div>
    </main>
  );
}