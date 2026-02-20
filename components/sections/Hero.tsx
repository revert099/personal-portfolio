import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="hero" className="section section-hero lg:min-h-[calc(100svh-4rem)] lg:flex lg:items-center lg:py-0">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16">
          {/* Left: text */}
          <div className="space-y-6 text-center md:text-left lg:space-y-8">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <Reveal delayMs={220} durationMs={1000}>Hi,</Reveal>{" "}
              <Reveal delayMs={620} durationMs={3000}>I&apos;m Jacob.</Reveal>
            </h1>

            <Reveal delayMs={920} durationMs={2000}>
              <p className="text-lg text-muted lg:text-xl xl:text-2xl">
                Cybersecurity, automation, and more.
              </p>
            </Reveal>

            <Reveal delayMs={1420} durationMs={2000}>
              <p className="text-muted lg:text-lg xl:text-xl lg:max-w-xl">
                I'm an early career cybersecurity graduate - curious, disciplined, and building hands-on experience across the domain.
                I like getting to root cause, strengthening controls, and creating tools that reduce friction and operational risk.
              </p>
            </Reveal>

            <Reveal delayMs={2020} durationMs={2000}>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start lg:gap-4">
                <a href="/#projects" className="btn-primary lg:px-6 lg:py-3 lg:text-base">View projects</a>
                <a href="/#contact" className="btn-secondary lg:px-6 lg:py-3 lg:text-base">Contact</a>
              </div>
            </Reveal>
          </div>

          {/* Right (desktop) / Bottom (mobile): line art */}
          <Reveal delayMs={720} durationMs={2000}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}