// lib/blog.ts
import { getAll, getBySlug, type ContentItem } from "@/lib/content/collection";

/**
 * Frontmatter shape for blog posts.
 * Keep this simple and consistent across your MDX files.
 */
export type BlogFrontmatter = {
  title: string;
  date: string; // "YYYY-MM-DD"
  type?: string; // optional, e.g. "case-study" | "write-up"
  summary: string;
  tags?: string[];
  featured?: boolean;
};

export type BlogPost = ContentItem<BlogFrontmatter>;

/**
 * Runtime frontmatter validation (keeps errors obvious).
 */
function validateBlogFrontmatter(
  fm: Partial<BlogFrontmatter>,
  slug: string
): asserts fm is BlogFrontmatter {
  if (!fm.title || !fm.date || !fm.summary) {
    throw new Error(
      `Missing required blog frontmatter in ${slug}.mdx (needs title, date, summary)`
    );
  }
}

export function getAllBlogPosts(): Array<Omit<BlogPost, "content">> {
  return getAll<BlogFrontmatter>("blog", validateBlogFrontmatter, "date");
}

export function getBlogPostBySlug(slug: string): BlogPost {
  return getBySlug<BlogFrontmatter>("blog", slug, validateBlogFrontmatter);
}