import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * A minimal shape all content items share.
 * Each collection (projects/blog/photos) can extend frontmatter separately.
 */
export type ContentItem<Frontmatter> = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

/**
 * Resolve the absolute directory path for a collection (projects/blog/photos).
 *
 * Supports both common layouts:
 * - /content/<collection>
 * - /src/content/<collection>
 *
 * This prevents future breakage if you move content under src/ later.
 */
function collectionDir(collection: string): string {
  const candidates = [
    path.join(process.cwd(), "content", collection),
    path.join(process.cwd(), "src", "content", collection),
  ];

  // Prefer a directory that exists AND contains at least one .mdx file
  const withMdx = candidates.find((dir) => {
    if (!fs.existsSync(dir)) return false;
    return fs.readdirSync(dir).some((f) => f.endsWith(".mdx"));
  });
  if (withMdx) return withMdx;

  // Otherwise fall back to any directory that exists
  const hit = candidates.find((dir) => fs.existsSync(dir));
  if (hit) return hit;

  throw new Error(
    `Content directory not found for "${collection}". Tried:\n- ${candidates.join("\n- ")}`
  );
}

/**
 * Ensure the resolved collection folder exists (mostly redundant now,
 * but keeps your flow explicit).
 */
function ensureCollectionDir(collection: string): void {
  // collectionDir() already throws a helpful error if missing.
  collectionDir(collection);
}

/**
 * Get all slugs (filenames without .mdx) for a collection.
 */
export function getSlugs(collection: string): string[] {
  ensureCollectionDir(collection);
  const dir = collectionDir(collection);

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Read one MDX file and parse frontmatter + content.
 *
 * `validate` lets each collection enforce its own required frontmatter fields.
 */
export function getBySlug<Frontmatter>(
  collection: string,
  slug: string,
  validate: (fm: Partial<Frontmatter>, slug: string) => asserts fm is Frontmatter
): ContentItem<Frontmatter> {
  ensureCollectionDir(collection);
  const dir = collectionDir(collection);
  const fullPath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`${collection} item not found: ${slug}`);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const fm = data as Partial<Frontmatter>;
  validate(fm, slug);

  return {
    slug,
    frontmatter: fm,
    content,
  };
}

/**
 * Read all items for a collection (without content by default),
 * sorted newest-first if `dateKey` exists on frontmatter.
 */
export function getAll<Frontmatter extends Record<string, unknown>>(
  collection: string,
  validate: (fm: Partial<Frontmatter>, slug: string) => asserts fm is Frontmatter,
  dateKey: keyof Frontmatter = "date" as keyof Frontmatter
): Array<Omit<ContentItem<Frontmatter>, "content">> {
  const slugs = getSlugs(collection);

  const list = slugs.map((slug) => {
    const item = getBySlug<Frontmatter>(collection, slug, validate);
    return { slug: item.slug, frontmatter: item.frontmatter };
  });

  // If frontmatter has a `date` string, sort newest first
  return list.sort((a, b) => {
    const ad = String(a.frontmatter[dateKey] ?? "");
    const bd = String(b.frontmatter[dateKey] ?? "");
    return bd.localeCompare(ad);
  });
}