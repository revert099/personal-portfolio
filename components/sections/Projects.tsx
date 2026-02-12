import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

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

export default function ProjectsSection(): JSX.Element {
  const projects = getAllProjects();

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <h2 className="text-3xl font-semibold tracking-tight text-center sm:text-left">
          Projects
        </h2>
        <p className="mt-4 max-w-2xl text-muted text-center sm:text-left sm:mx-0 mx-auto">
          Case studies across cybersecurity, automation, artificial intelligence, and software builds.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="block rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                  {typeLabel(p.frontmatter.type)}
                </span>
                <span className="text-xs text-muted">{p.frontmatter.date}</span>
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {p.frontmatter.title}
              </h3>
              <p className="mt-3 text-muted">{p.frontmatter.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}