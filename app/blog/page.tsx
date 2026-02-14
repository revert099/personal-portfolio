// app/blog/page.tsx
import ExplorerClient from "@/components/explorer/ExplorerClient";
import { getAllBlogPosts } from "@/lib/blog";
import type { ExplorerItem } from "@/lib/explorer/types";

/**
 * BlogPage (/blog)
 * Listing page that loads MDX frontmatter on the server
 * and renders the interactive Explorer on the client.
 */
export default function BlogPage() {
  const posts = getAllBlogPosts();

  const items: ExplorerItem[] = posts.map((p) => ({
    id: p.slug,
    href: `/blog/${p.slug}`,
    title: p.frontmatter.title,
    summary: p.frontmatter.summary,
    date: p.frontmatter.date,
    type: p.frontmatter.type ?? "blog",
    tags: p.frontmatter.tags ?? [],
    confidential: false,
  }));

  return (
    <main className="section">
      <div className="container-page">
        <ExplorerClient
          heading="Blog"
          description="Write-ups, reflections and personal insights."
          items={items}
          variant="blog"
        />
      </div>
    </main>
  );
}