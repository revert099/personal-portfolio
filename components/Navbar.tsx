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
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[9999] border-b border-border bg-background/95 backdrop-blur">
      <nav className="container-page">
        <div className="relative flex h-16 items-center">
          {/* Left slot: reserve space so centred links never overlap */}
          <div className="w-[88px] sm:w-[180px] flex items-center">
            <ThemeSwitcher />
          </div>

          {/* centred block (works at all breakpoints now) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            {/* no wrap prevents two-line nav on small screens */}
            <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs sm:text-sm font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-blue-600 hover:decoration-blue-600"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right slot reserved for later */}
          <div className="ml-auto w-[0px] sm:w-[180px]" />
        </div>
      </nav>
    </header>
  );
}