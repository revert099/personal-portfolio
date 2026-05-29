import Reveal from "@/components/Reveal";
import { services } from "@/lib/homepage";

export default function OfferingsSection() {
  return (
    <section className="bg-background py-16 text-foreground">
      <div className="container-page">
        <Reveal as="div" mode="view" className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Automation services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            How I can help
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Practical support for teams dealing with manual exports, spreadsheet handling, recurring operational updates, and workflow bottlenecks.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((offering, index) => (
            <Reveal
              key={offering.name}
              as="div"
              mode="view"
              delayMs={index * 120}
              durationMs={800}
            >
              <div
                className={[
                  "card group h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md",
                  offering.featured ? "border-accent/60" : undefined,
                ].join(" ")}
              >
                <h3
                  className={[
                    "text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent",
                    offering.featured ? "text-accent" : undefined,
                  ].join(" ")}
                >
                  {offering.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                  {offering.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          mode="view"
          delayMs={220}
          durationMs={800}
          className="mt-6 text-sm text-muted"
        >
          Not sure where to start? Every engagement begins with a free 20-minute
          conversation.{" "}
          <a href="#contact" className="underline underline-offset-2">
            Get in touch →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
