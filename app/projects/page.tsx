import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

/**
 * Convert the project "type" (stored in MDX frontmatter) into a human-friendly label.
 * This keeps MDX values consistent (short keys) while the UI shows nicer text.
 */
function typeLabel(type: string): string {
  switch (type) {
    case "cyber":
      return "Cybersecurity";
    case "ai":
      return "AI";
    case "automation":
      return "Automation";
    default:
      return "Software";
  }
}

/**
 * ProjectsPage
 * Lists all projects (loaded from MDX content) as clickable tiles.
 *
 * Each tile links to the project detail page: `/projects/[slug]`
 * where the full MDX write-up is rendered.
 */
export default function ProjectsPage(): JSX.Element {
  // Load all project entries (slug + frontmatter + content metadata) from the content folder.
  const projects = getAllProjects();

  return (
    // Page wrapper with simple padding.
    <main className="px-6 py-20">
      {/* Constrain content width for readability on large screens. */}
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>

        {/* Short intro text */}
        <p className="mt-4 max-w-2xl text-slate-600">
          Case studies across cybersecurity, automation, AI, and software builds.
        </p>

        {/* Responsive grid of project tiles: 1 col → 2 col → 3 col */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              // Card-style tile with hover lift for polish.
              className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Top row: project type tag + date */}
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  {typeLabel(p.frontmatter.type)}
                </span>
                <span className="text-xs text-slate-500">
                  {p.frontmatter.date}
                </span>
              </div>

              {/* Project title */}
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                {p.frontmatter.title}
              </h2>

              {/* One-line / short summary */}
              <p className="mt-3 text-slate-600">{p.frontmatter.summary}</p>

              {/* Optional note for private repos (client confidentiality) */}
              {p.frontmatter.confidential ? (
                <p className="mt-4 text-xs text-slate-500">
                  Repo private (client confidentiality)
                </p>
              ) : null}

              {/* Optional tech stack “pills” (limit to 6 to keep tiles tidy) */}
              {p.frontmatter.stack?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.frontmatter.stack.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}