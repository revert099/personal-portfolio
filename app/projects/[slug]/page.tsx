// app/projects/[slug]/page.tsx
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

/**
 * Custom components available inside MDX.
 * Example usage in MDX: <Figure ... />, <Callout>...</Callout>, etc.
 */
const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

type Params = { slug: string };
type PageProps = {
  // In your runtime, params is coming through as a Promise.
  params: Promise<Params>;
  searchParams?: Record<string, string | string[] | undefined>;
};

/**
 * ProjectDetailPage (/projects/[slug])
 * Server page that loads and renders the MDX body for a single project.
 */
export default async function ProjectDetailPage(props: PageProps): Promise<JSX.Element> {
  // ✅ IMPORTANT: await the params Promise
  const { slug } = await props.params;

  // Safety guard (prevents "undefined" from ever reaching your loader)
  if (!slug) notFound();

  const project = getProjectBySlug(slug);
  const { frontmatter, content } = project;

  return (
    <main className="section">
      <div className="container-page max-w-3xl">
        <Link href="/projects" className="text-sm text-muted underline">
          ← Back to projects
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>

        <p className="mt-3 text-muted">{frontmatter.summary}</p>

        <article className="mdx mt-10">
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </div>
    </main>
  );
}