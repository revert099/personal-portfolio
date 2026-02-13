// app/blog/[slug]/page.tsx
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

/**
 * BlogPostPage (/blog/[slug])
 * Renders a single blog post from MDX.
 */
export default async function BlogPostPage(props: PageProps): Promise<JSX.Element> {
  const { slug } = await props.params;
  if (!slug) notFound();

  const post = getBlogPostBySlug(slug);
  const { frontmatter, content } = post;

  return (
    <main className="section">
      <div className="container-page max-w-3xl">
        <Link href="/blog" className="text-sm text-muted underline">
          ← Back to blog
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>

        <p className="mt-3 text-muted">{frontmatter.summary}</p>

        <article className="mdx mt-10 break-words">
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </div>
    </main>
  );
}