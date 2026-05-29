import { getAll, getBySlug, type ContentItem } from "@/lib/content/collection";

export type ProjectCategory = "professional" | "personal";
export type ProjectServiceLine = "automation" | "cloud" | "it-ops" | "security";
export type ProjectVisibility =
  | "public"
  | "public-summary"
  | "confidential-summary";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  type: string;
  tags?: string[];
  featured?: boolean;

  // Backwards-compatible fields still present in current MDX content.
  summary?: string;
  stack?: string[];
  links?: {
    github?: string;
    demo?: string;
    writeup?: string;
  };

  // Extended fields
  category?: ProjectCategory;
  homepageFeatured?: boolean;
  businessOutcome?: string;
  serviceLines?: ProjectServiceLine[];
  clientType?: string;
  confidential?: boolean;
  visibility?: ProjectVisibility;
  role?: string | string[];
  timeframe?: string;
  client?: string;
}

export type Project = ContentItem<ProjectFrontmatter>;

function normalizeProjectType(type: string): string {
  return type.trim().toLowerCase();
}

function validateProject(
  fm: Partial<ProjectFrontmatter>,
  slug: string
): asserts fm is ProjectFrontmatter {
  if (typeof fm.type === "string") {
    fm.type = normalizeProjectType(fm.type);
  }

  if (!fm.description && fm.summary) {
    fm.description = fm.summary;
  }

  if (!fm.tags && fm.stack) {
    fm.tags = fm.stack;
  }

  if (!fm.title || !fm.date || !fm.type || !fm.description) {
    throw new Error(
      `Missing required frontmatter in projects/${slug}.mdx (needs title, description, date, type)`
    );
  }
}

export function getProjectListingSummary(frontmatter: ProjectFrontmatter): string {
  if (frontmatter.category === "professional" && frontmatter.businessOutcome) {
    return frontmatter.businessOutcome;
  }

  return frontmatter.description;
}

export function isHomepageFeaturedProject(
  frontmatter: ProjectFrontmatter
): boolean {
  return (
    frontmatter.homepageFeatured === true &&
    frontmatter.category === "professional"
  );
}

export function getProjectBySlug(slug: string): Project {
  return getBySlug<ProjectFrontmatter>("projects", slug, validateProject);
}

export function getAllProjects(): Array<Omit<Project, "content">> {
  return getAll<ProjectFrontmatter>("projects", validateProject, "date");
}
