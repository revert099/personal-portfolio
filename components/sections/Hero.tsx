import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="section section-hero">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: text */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <Reveal delayMs={220} durationMs={1000}>Hi,</Reveal>{" "}
              <Reveal delayMs={620} durationMs={3000}>I&apos;m Jacob.</Reveal>
            </h1>

            <Reveal delayMs={920} durationMs={2000}>
              <p className="text-lg text-muted">
                Cybersecurity, automation, and more.
              </p>
            </Reveal>

            <Reveal delayMs={1420} durationMs={2000}>
              <p className="text-muted">
                I'm an early career cybersecurity graduate - curious, disciplined, and building hands-on experience across the domain.
                I like getting to root cause, strengthening controls, and creating tools that reduce friction and operational risk.
              </p>
            </Reveal>

            <Reveal delayMs={2020} durationMs={2000}>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <a href="/#projects" className="btn-primary">View projects</a>
                <a href="/#contact" className="btn-secondary">Contact</a>
              </div>
            </Reveal>
          </div>

          {/* Right (desktop) / Bottom (mobile): line art */}
          <Reveal delayMs={720} durationMs={2000}>
            <div className="relative mt-6 md:mt-0 md:translate-x-6 md:translate-y-25 md:scale-130 md:origin-bottom-right">
              <Image
                src="/line-art-hero.png"
                alt="One-line illustration of a person typing on a laptop"
                width={2200}
                height={700}
                priority
                className={[
                  "h-auto w-full opacity-90",
                  "md:origin-right md:scale-110",
                  "theme-media",
                ].join(" ")}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}