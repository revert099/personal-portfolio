import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import { getProjectBySlug } from "@/lib/projects";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

type Params = { slug: string };
type PageProps = { params: Params | Promise<Params> };

export default async function ProjectDetailPage(props: PageProps) {
  const { slug } = await props.params;
  if (!slug) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { frontmatter, content: mdxSource } = project;

  const github = frontmatter.links?.github?.trim();
  const demo = frontmatter.links?.demo?.trim();

  const compiled = await compileMDX({
    source: mdxSource,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,

      // IMPORTANT for next-mdx-remote v6:
      // allow MDX JS expressions like items={[...]}
      blockJS: false,

      // keep protections on (default true, but set explicitly)
      blockDangerousJS: true,

      // good idea to be explicit
      mdxOptions: {
        format: "mdx",
      },
    },
  });

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

        {(github || demo) ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span aria-hidden="true">↗</span>
                GitHub
              </a>
            ) : null}

            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span aria-hidden="true">↗</span>
                Live demo
              </a>
            ) : null}
          </div>
        ) : null}

        <article className="mdx mt-10 break-words">{compiled.content}</article>
      </div>
    </main>
  );
}