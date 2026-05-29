"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Conditionally applies the pt-16 navbar offset.
 * Landing pages (e.g. /automation) manage their own top spacing.
 */
export default function PageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname.startsWith("/automation");
  return <div className={isLanding ? "" : "pt-16"}>{children}</div>;
}
