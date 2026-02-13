import Link from "next/link";

/**
 * Primary navigation links.
 * Using hash anchors (/#projects etc.) keeps navigation lightweight and
 * scrolls to sections on the home page instead of routing to new pages.
 */
const links = [
  { href: "/#top", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Navbar
 * A simple, centred, sticky header that remains visible while scrolling.
 *
 * Styling notes:
 * - fixed + high z-index keeps it above page content
 * - semi-transparent background + backdrop blur gives a subtle “glass” look
 * - underline + hover colour provides clear affordance without adding clutter
 */
export default function Navbar(): JSX.Element {
  return (
    // Fixed header pinned to the top of the viewport.
    <header className="fixed inset-x-0 top-0 z-[9999] border-b border-border bg-background/95 backdrop-blur">
      {/* Use <nav> for semantic navigation. */}
      <nav className="container-page">
        {/* Centre the links horizontally and keep a consistent header height. */}
        <div className="flex h-16 items-center justify-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              // Underlined links with a subtle colour transition on hover.
              className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-blue-600 hover:decoration-blue-600"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}