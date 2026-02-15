// app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getBlogPostBySlug } from "@/lib/blog";

import Figure from "@/components/mdx/Figure";
import Callout from "@/components/mdx/Callout";
import Kpi from "@/components/mdx/Kpi";
import PhaseGrid from "@/components/mdx/PhaseGrid";

const mdxComponents = { Figure, Callout, Kpi, PhaseGrid };

type Params = { slug: string };
type PageProps = { params: Params | Promise<Params> };

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  if (!slug) notFound();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content: mdxSource } = post;

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
        <Link href="/blog" className="text-sm text-muted underline">
          ← Back to blog
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {frontmatter.title}
        </h1>

        <p className="mt-3 text-muted">{frontmatter.summary}</p>

        <article className="mdx mt-10 break-words">{compiled.content}</article>
      </div>
    </main>
  );
}