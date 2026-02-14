// app/projects/[slug]/page.tsx
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

type Params = { slug: string };
type PageProps = {
  params: Params | Promise<Params>;
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ProjectDetailPage(props: PageProps) {
  // ✅ Works whether params is a Promise OR a plain object
  const { slug } = await props.params;

  if (!slug) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

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