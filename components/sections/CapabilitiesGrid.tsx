// components/sections/CapabilitiesGrid.tsx
type StackCard = {
  title: string;
  outcome: string;
  tools: string[];
};

const CARDS: StackCard[] = [
  {
    title: "Automation & data pipelines",
    outcome: "Build repeatable pipelines that reduce manual error, improve data integrity and eliminate manual labour.",
    tools: ["Python", "pandas", "openpyxl", "CSV/Excel", "Google Drive API", "Slack Webhooks"],
  },
  {
    title: "Incident response & SOC operations",
    outcome: "Investigate alerts, contain threats, and minimise impact through structured triage and response.",
    tools: ["Splunk", "EDR/XDR investigation", "Snort (IDS)", "Alert triage workflows", "NIST IR lifecycle"],
  },
  {
    title: "Governance & security controls",
    outcome: "Translate risk into practical controls, uplift plans, and measurable security improvements.",
    tools: ["ISO/IEC 27001", "ACSC Essential Eight", "Control mapping", "Policy documentation", "Risk assessment"],
  },
  {
    title: "AppSec & offensive basics",
    outcome: "Find, validate, and explain security issues clearly.",
    tools: ["OWASP", "BurpSuite", "HTB", "Threat modelling", "Penetration testing"],
  },
  {
    title: "Web & delivery",
    outcome: "Ship fast, clean interfaces with sensible structure.",
    tools: ["Next.js", "TypeScript", "Tailwind", "Shopify Liquid", "MDX"],
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">Where I create impact</h2>
          <p className="mt-2 text-muted">
            Practical strengths across security and IT - focused on outcomes.
          </p>
        </div>
        
        {/* Cards */}
        <div className="mt-8 mx-auto max-w-[calc(3*20rem+2*1.5rem)]">
            <div className="flex flex-wrap justify-center gap-6">
                {CARDS.map((c) => (
                <div
                    key={c.title}
                    className="w-full sm:w-[20rem] flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="text-base font-semibold">{c.title}</div>
                    <div className="mt-2 text-sm text-muted">{c.outcome}</div>

                    {/* tags pinned to bottom so card heights feel consistent */}
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {c.tools.map((t) => (
                        <span
                        key={t}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-foreground"
                        >
                        {t}
                        </span>
                    ))}
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}