import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug } from "../../../lib/projects";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

/**
 * MDX component registry.
 * Any custom JSX tags used inside MDX (e.g. <Figure />, <Callout />) must be
 * passed to MDXRemote via the `components` prop, otherwise they will error.
 */
const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

/**
 * ProjectDetailPage
 * Dynamic route for a single project: `/projects/[slug]`
 *
 * Responsibilities:
 * - Read the `slug` route param
 * - Load the matching MDX file via `getProjectBySlug(slug)`
 * - Render frontmatter (title/summary) + the MDX body content
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  // Next.js provides `params` for dynamic routes. We await it here to extract the slug.
  const { slug } = await params;

  // Load the project MDX by slug. This typically reads from content/projects/<slug>.mdx.
  const project = getProjectBySlug(slug);

  // Frontmatter is metadata (title, date, type, stack, etc.), content is the MDX body.
  const { frontmatter, content } = project;

  return (
    // Use your shared section styling so this page matches the rest of the site.
    <main className="section">
      {/* Constrain width for readability on long MDX pages. */}
      <div className="container-page max-w-3xl">
        {/* Simple back link to the projects listing page. */}
        <Link href="/projects" className="text-sm text-muted underline">
          ← Back to projects
        </Link>

        {/* Project title from MDX frontmatter. */}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>

        {/* Project summary from MDX frontmatter. */}
        <p className="mt-3 text-muted">{frontmatter.summary}</p>

        {/* Render the MDX body content, enabling custom components via `mdxComponents`. */}
        <article className="mdx mt-10">
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </div>
    </main>
  );
}