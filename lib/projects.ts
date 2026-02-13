import { getAll, getBySlug, type ContentItem } from "@/lib/content/collection";

export type ProjectType = "coding" | "cyber" | "ai" | "automation";

export type ProjectFrontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  type: ProjectType;
  summary: string;
  stack?: string[];
  featured?: boolean;
  links?: {
    github?: string;
    demo?: string;
  };
};

export type Project = ContentItem<ProjectFrontmatter>;

function validateProject(
  fm: Partial<ProjectFrontmatter>,
  slug: string
): asserts fm is ProjectFrontmatter {
  if (!fm.title || !fm.date || !fm.type || !fm.summary) {
    throw new Error(
      `Missing required frontmatter in projects/${slug}.mdx (needs title, date, type, summary)`
    );
  }
}

export function getProjectBySlug(slug: string): Project {
  return getBySlug<ProjectFrontmatter>("projects", slug, validateProject);
}

export function getAllProjects(): Array<Omit<Project, "content">> {
  return getAll<ProjectFrontmatter>("projects", validateProject, "date");
}