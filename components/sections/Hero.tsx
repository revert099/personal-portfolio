import Image from "next/image";
import Reveal from "@/components/Reveal";
import { heroStats } from "@/lib/homepage";

function StatsStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "overflow-hidden rounded-3xl border border-border bg-card shadow-sm",
        className,
      ].join(" ")}
    >
      <div className="grid grid-cols-3">
        {heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              "px-4 py-4",
              index < heroStats.length - 1 ? "border-r border-border" : "",
            ].join(" ")}
          >
            <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section section-hero lg:min-h-[calc(100svh-4rem)] lg:flex lg:items-center lg:py-0"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="text-center md:text-left">
            <Reveal
              as="div"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Available for new projects
            </Reveal>

            <Reveal
              as="h1"
              delayMs={0}
              durationMs={380}
              className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Helping WA small businesses work smarter with automation and AI
            </Reveal>

            <Reveal
              as="p"
              delayMs={90}
              durationMs={380}
              className="mt-6 text-lg text-muted lg:max-w-xl lg:text-xl xl:text-2xl"
            >
              I help busy owners automate repetitive work so you can focus on what
              actually matters.
            </Reveal>

            <Reveal
              as="div"
              delayMs={180}
              durationMs={380}
              className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start lg:gap-4"
            >
              <a href="#contact" className="btn-primary lg:px-6 lg:py-3 lg:text-base">
                Get in touch
              </a>
              <a href="#projects" className="btn-secondary lg:px-6 lg:py-3 lg:text-base">
                View my work →
              </a>
            </Reveal>

            <Reveal
              as="div"
              delayMs={270}
              durationMs={380}
              className="mt-6 text-sm text-muted"
            >
              Based in Perth · Serving SMEs across WA
            </Reveal>

            <Reveal
              as="div"
              delayMs={400}
              durationMs={1000}
              className="mt-8 hidden lg:block"
            >
              <StatsStrip />
            </Reveal>
          </div>

          <div className="relative mt-6 md:mt-0 lg:translate-x-10 lg:scale-110 xl:scale-125 lg:origin-bottom-right">
            <Image
              src="/line-art-hero.png"
              alt="One-line illustration of a person typing on a laptop"
              width={2200}
              height={700}
              priority
              className="h-auto w-full opacity-90 theme-media"
            />
          </div>
        </div>

        <Reveal as="div" delayMs={400} durationMs={1000} className="mt-8 lg:hidden">
          <StatsStrip />
        </Reveal>
      </div>
    </section>
  );
}
