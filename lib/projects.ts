import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string; // MDX body
};

const projectsDir = path.join(process.cwd(), "content", "projects");

function ensureProjectsDir(): void {
  if (!fs.existsSync(projectsDir)) {
    throw new Error(
      `Projects directory not found: ${projectsDir}. Create content/projects and add .mdx files.`
    );
  }
}

export function getProjectSlugs(): string[] {
  ensureProjectsDir();
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project {
  ensureProjectsDir();
  const fullPath = path.join(projectsDir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Project not found: ${slug}`);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // Minimal runtime validation (keeps TS happy and avoids silent undefineds)
  const fm = data as Partial<ProjectFrontmatter>;
  if (!fm.title || !fm.date || !fm.type || !fm.summary) {
    throw new Error(
      `Missing required frontmatter in ${slug}.mdx (needs title, date, type, summary)`
    );
  }

  return {
    slug,
    frontmatter: fm as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Array<Omit<Project, "content">> {
  const slugs = getProjectSlugs();
  const list = slugs.map((slug) => {
    const p = getProjectBySlug(slug);
    return { slug: p.slug, frontmatter: p.frontmatter };
  });

  // Sort newest first by date string
  return list.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}