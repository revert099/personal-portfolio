import Image from "next/image";

type SocialLink = {
  label: string;
  href: string;
  iconSrc: string;
};

const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jacob-winsor-a96533a8/", iconSrc: "/icons/linkedin-icon.svg" },
  { label: "GitHub", href: "https://github.com/revert099", iconSrc: "/icons/github-icon.svg" },
  { label: "HackTheBox", href: "https://profile.hackthebox.com/profile/019c4c14-6d72-71d8-b3b8-951e53b1f1bf", iconSrc: "/icons/htb-icon.svg" },
  
];

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-[38%]">
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-3 max-w-sm text-muted">
              Connect with me here, or send a message using the form.
            </p>

            <div className="mt-8 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={[
                    "group relative grid h-14 w-14 place-items-center rounded-2xl",
                    "border border-border bg-card/85 shadow-sm backdrop-blur",
                    "transition will-change-transform",
                    "hover:-translate-y-1 hover:scale-110 hover:shadow-md",
                    "hover:animate-dock-jiggle",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  ].join(" ")}
                >
                  <Image src={s.iconSrc} alt="" width={28} height={28} draggable={false} />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/20" />
                </a>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted">
              Tip: keep these to the platforms you actually use.
            </p>
          </div>

          <div className="lg:w-[58%]">
            <div className="card p-6">
              <h3 className="text-xl font-semibold">Send me a message</h3>

              <form className="mt-6 grid gap-4" method="POST" action="/api/contact">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-foreground/80">Name</span>
                    <input
                      name="name"
                      required
                      className="h-11 rounded-xl border border-border bg-background px-4 outline-none focus:border-foreground/40"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-foreground/80">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="h-11 rounded-xl border border-border bg-background px-4 outline-none focus:border-foreground/40"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground/80">Subject</span>
                  <input
                    name="subject"
                    required
                    className="h-11 rounded-xl border border-border bg-background px-4 outline-none focus:border-foreground/40"
                    placeholder="What’s this about?"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground/80">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-foreground/40"
                    placeholder="Write your message…"
                  />
                </label>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted">I’ll reply as soon as I can.</p>

                  <button type="submit" className="btn-primary">
                    Send message
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-3 text-xs text-muted">
              Form submission needs a backend endpoint. We’ll use Resend later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}