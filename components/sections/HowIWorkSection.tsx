import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/homepage";

export default function HowIWorkSection() {
  return (
    <section className="bg-background py-16 text-foreground">
      <div className="container-page">
        <Reveal as="div" mode="view" className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            The process
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Built around one workflow at a time
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            The goal is not a giant transformation project. It&apos;s to identify
            the workflow costing the most time, automate it properly, and keep
            improving from there.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.step}
              as="div"
              mode="view"
              delayMs={index * 120}
              durationMs={800}
            >
              <div className="card group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {step.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
