"use client";

import { useState } from "react";
import { capabilityGroups, type CapabilityIcon } from "@/lib/homepage";
import Reveal from "@/components/Reveal";

export default function CapabilitiesGrid() {
  // Desktop: expand on hover. Mobile (<lg): all tiles fully expanded, no interaction.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container-page">
        <Reveal as="div" mode="view" className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Coverage
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            What I can help with
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          {capabilityGroups.map((group, index) => {
            const isExpanded = hoveredIndex === index;

            return (
              <div
                key={group.category}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={[
                  "min-w-0 overflow-hidden",
                  "lg:basis-0",
                  isExpanded ? "lg:flex-[2]" : "lg:flex-[0.75]",
                ].join(" ")}
                style={{ transition: "all 320ms cubic-bezier(0.4, 0, 0.2, 1)" }}
              >
                <Reveal
                  as="div"
                  mode="view"
                  delayMs={index * 120}
                  durationMs={800}
                  className="h-full"
                >
                  <div className="card group h-full overflow-hidden p-0 transition-colors duration-300 hover:border-accent/40 hover:shadow-md">
                    <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/55 to-transparent" />

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                          <CategoryIcon icon={group.icon} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-semibold tracking-tight">
                            {group.category}
                          </h3>

                          {/* bestFor — hidden on desktop when collapsed, always shown on mobile */}
                          <p
                            className={[
                              "mt-2 text-sm leading-relaxed text-muted transition-all duration-300",
                              isExpanded ? "" : "lg:hidden",
                            ].join(" ")}
                          >
                            {group.bestFor}
                          </p>
                        </div>
                      </div>

                      {/* Sub-services — hidden on desktop when collapsed, always shown on mobile */}
                      <div
                        className={[
                          "mt-6 space-y-3",
                          isExpanded ? "" : "lg:hidden",
                        ].join(" ")}
                      >
                        {group.items.map((item) => (
                          <div
                            key={item.title}
                            className="group/item rounded-2xl border border-border/70 bg-background/35 px-4 py-4 transition-all duration-300 hover:translate-x-1 hover:border-accent/35 hover:bg-accent/5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base font-semibold tracking-tight transition-colors duration-300 group-hover/item:text-accent">
                                  {item.title}
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                  {item.outcome}
                                </p>
                              </div>
                              <span className="shrink-0 pt-0.5 text-sm text-accent opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100">
                                →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({ icon }: { icon: CapabilityIcon }) {
  if (icon === "automation") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="9" width="6" height="6" rx="1.5" />
        <rect x="15" y="4" width="6" height="6" rx="1.5" />
        <rect x="15" y="14" width="6" height="6" rx="1.5" />
        <path d="M9 12h3" />
        <path d="M12 7h3" />
        <path d="M12 17h3" />
        <path d="M12 7v10" />
      </svg>
    );
  }

  if (icon === "cloud") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M7 18a4 4 0 1 1 .88-7.9A5.5 5.5 0 0 1 18.5 11a3.5 3.5 0 1 1 .5 7Z" />
        <path d="M9.5 18v-4" />
        <path d="M14.5 18v-6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m8.5 15 1.2-2.1a2.7 2.7 0 0 1 0-1.8L8.5 9" />
      <path d="m15.5 9-1.2 2.1a2.7 2.7 0 0 1 0 1.8l1.2 2.1" />
    </svg>
  );
}
