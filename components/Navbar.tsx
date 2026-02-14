import Link from "next/link";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

/**
 * Primary navigation links.
 * Using hash anchors (/#projects etc.) keeps navigation lightweight and
 * scrolls to sections on the home page instead of routing to new pages.
 */
const links = [
  { href: "/#hero", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Navbar
 * Sticky header with:
 * - Theme switcher on the LEFT
 * - Nav links visually centred
 *
 * Implementation detail:
 * We use a 3-column grid so the centre column stays centred even though
 * something exists on the left.
 */
export default function Navbar(): JSX.Element {
  return (
    <header className="fixed inset-x-0 top-0 z-[9999] border-b border-border bg-background/95 backdrop-blur">
      <nav className="container-page">
        <div className="relative flex h-16 items-center">
          {/* Left slot */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>

          {/* Centre links (true centre) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-blue-600 hover:decoration-blue-600"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right slot */}
          <div className="ml-auto">
            {/* optional logo/wordmark later */}
          </div>
        </div>
      </nav>
    </header>
  );
}