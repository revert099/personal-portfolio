import React from "react";

/**
 * Props for the Callout component.
 * - title: Optional heading shown above the content.
 * - children: The callout body (any React content).
 */
type Props = {
  title?: string;
  children: React.ReactNode;
};

/**
 * Callout
 * A reusable MDX-friendly “info box” used to highlight key notes, context, or warnings.
 * Uses your global design tokens (border/card/text) so it matches the rest of the site.
 */
export default function Callout({ title, children }: Props) {
  return (
    // Outer card container with consistent spacing + styling.
    <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
      {/* Only render the title if one is provided. */}
      {title ? (
        <div className="text-sm font-semibold text-foreground">{title}</div>
      ) : null}

      {/* Main content area (MDX children). */}
      <div className="mt-2 text-muted">{children}</div>
    </div>
  );
}