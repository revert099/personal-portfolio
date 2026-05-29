export type HeroStat = {
  value: string;
  label: string;
};

export type PainPoint = {
  title: string;
  body: string;
};

export type Service = {
  name: string;
  description: string;
  featured: boolean;
  entryPoint: boolean;
};

export type ProcessStep = {
  step: string;
  label: string;
  body: string;
};

export type CapabilityItem = {
  title: string;
  outcome: string;
};

export type CapabilityIcon = "automation" | "cloud" | "operations";

export type CapabilityGroup = {
  category: string;
  bestFor: string;
  icon: CapabilityIcon;
  featured?: boolean;
  items: CapabilityItem[];
};

export const heroStats: HeroStat[] = [
  { value: "10 hrs+", label: "Saved per week, per client" },
  { value: "Zero", label: "Manual errors in live flows" },
  { value: "Days", label: "Not months, to go live" },
];

export const painPoints: PainPoint[] = [
  {
    title: "Data copied between systems manually",
    body: "Information gets exported, reformatted, and re-entered because tools do not talk to each other.",
  },
  {
    title: "Reports rebuilt every week",
    body: "Teams spend hours combining spreadsheets and exports for information that should already exist.",
  },
  {
    title: "Processes that depend on one person",
    body: "Critical workflows only work because one person remembers the steps and exceptions.",
  },
  {
    title: "Too much repetitive admin work",
    body: "Staff are spending time on updates, checks, and manual handling that software could automate.",
  },
  {
    title: "Systems creating more work instead of less",
    body: "Disconnected tools create duplicate entry, inconsistencies, and operational friction.",
  },
  {
    title: "Access and file management becoming messy",
    body: "Folders, permissions, and shared systems have grown organically without structure.",
  },
  {
    title: "Manual processes causing mistakes",
    body: "Errors appear downstream because information is entered multiple times or handled inconsistently.",
  },
  {
    title: "Workflows that break as the business grows",
    body: "Processes that worked for five people begin failing once volume increases.",
  },
];

export const services: Service[] = [
  {
    name: "AI Integration",
    description:
      "Most small businesses are leaving hours on the table every week. I help you find where AI can realistically save time — then set it up so your team can actually use it. Includes AI readiness assessment, tool setup (Claude, Copilot, Gemini), and staff training.",
    featured: false,
    entryPoint: true,
  },
  {
    name: "Process Automation",
    description:
      "If your team is copying data between apps, chasing approvals by email, or running the same report manually each week — that's automatable. I connect the tools you already use so the work happens by itself. Works with Make, Zapier, Google Workspace, and Microsoft 365.",
    featured: true,
    entryPoint: false,
  },
  {
    name: "Ongoing support",
    description:
      "Ongoing support to keep existing automations reliable, adapt them as workflows change, and expand into the next bottleneck without starting from scratch.",
    featured: false,
    entryPoint: false,
  },
  {
    name: "Cloud Setup & Integration",
    description:
      "Getting your team properly set up in Google Workspace or Microsoft 365 — with the right access controls, no wasted licences, and a structure that actually makes sense. Includes setup, migration, security, and access controls.",
    featured: false,
    entryPoint: false,
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    label: "Find the highest-value workflow",
    body: "Start with the task that burns the most time or creates the most rework - not a vague transformation project.",
  },
  {
    step: "02",
    label: "Build a controlled automation",
    body: "Replace the manual hand-off with something tested, documented, and predictable for the people using it every week.",
  },
  {
    step: "03",
    label: "Support and improve it",
    body: "Keep the workflow reliable, adapt it as operations change, and extend it when the next bottleneck becomes obvious.",
  },
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    category: "Automation",
    bestFor:
      "Best for teams relying on spreadsheets, exports, and repeated manual work.",
    icon: "automation",
    featured: true,
    items: [
      {
        title: "Workflow automation",
        outcome:
          "Remove repetitive spreadsheet, export, and hand-off work from everyday operations.",
      },
      {
        title: "Data pipeline builds",
        outcome:
          "Move data between systems cleanly so teams stop fixing files by hand.",
      },
      {
        title: "API integrations",
        outcome:
          "Connect existing tools so updates flow without copy-paste or manual re-entry.",
      },
      {
        title: "Reporting automation",
        outcome:
          "Produce reliable reports from live operational data instead of rebuilding them manually.",
      },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    bestFor:
      "Best for businesses needing scalable, organised systems without unnecessary complexity.",
    icon: "cloud",
    items: [
      {
        title: "Cloud storage setup",
        outcome:
          "Set up organised file and data storage that supports shared workflows as the business grows.",
      },
      {
        title: "Environment management",
        outcome:
          "Keep connected environments stable so automations and supporting systems stay predictable.",
      },
      {
        title: "Tool integration",
        outcome:
          "Fit cloud systems around the way your team already works instead of adding unnecessary overhead.",
      },
    ],
  },
  {
    category: "IT Operations",
    bestFor:
      "Best for small teams that need reliable systems, access control, and clear documentation.",
    icon: "operations",
    items: [
      {
        title: "Systems administration",
        outcome:
          "Handle the day-to-day systems work that small teams need but do not always have time or depth to manage internally.",
      },
      {
        title: "Process documentation",
        outcome:
          "Document workflows, responsibilities, and access boundaries so operations do not depend on one person.",
      },
    ],
  },
  {
    category: "AI Integration & Orchestration",
    bestFor:
      "Best for businesses wanting to leverage AI across their workflows without complexity.",
    icon: "automation",
    items: [
      {
        title: "AI-ready workflow design",
        outcome:
          "Identify and design workflows where AI can add real value without overcomplicating simple tasks.",
      },
      {
        title: "Tool connection & setup",
        outcome:
          "Connect AI assistants (Claude, Copilot, Gemini) to your existing systems so they can act on your behalf.",
      },
      {
        title: "Orchestration & monitoring",
        outcome:
          "Set up workflows that route work between humans and AI based on complexity, confidence, and availability.",
      },
      {
        title: "Staff enablement & training",
        outcome:
          "Get your team using AI tools confidently, with documentation they can refer back to.",
      },
    ],
  },
];
