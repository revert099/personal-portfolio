"use client";

import { useEffect, useRef, useState } from "react";

type ThemeKey = "slate" | "cyber" | "sand" | "ocean" | "dark";

type ThemeOption = {
  key: ThemeKey;
  label: string;
};

const THEMES: ThemeOption[] = [
  { key: "slate", label: "Slate" },
  { key: "cyber", label: "Cyber" },
  { key: "sand", label: "Sand" },
  { key: "ocean", label: "Ocean" },
  { key: "dark", label: "Dark" },
];

const STORAGE_KEY = "site-theme";

/**
 * ThemeSwitcher (Dropdown + single-select toggles)
 *
 * UI:
 * - Closed: button says "Themes"
 * - Open: list of themes, each rendered as a row with:
 *   - label (left)
 *   - square-ish switch (right)
 *
 * Behaviour:
 * - Only ONE theme is active at a time (radio-style).
 * - Selecting a theme updates:
 *   - <html data-theme="...">
 *   - localStorage (persists on reload)
 *
 * Alignment fixes included:
 * - Each row has a consistent min-height (min-h-10)
 * - Label uses leading-none to avoid baseline/line-height pushing the row
 * - Switch container uses flex + items-center (avoids grid baseline quirks)
 */
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>("slate");
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  /**
   * Load saved theme on mount (client-side only).
   * We apply it immediately to <html data-theme="..."> for your CSS tokens.
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeKey | null;
    const initial = saved ?? "slate";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  /**
   * Persist + apply theme whenever it changes.
   * This drives your globals.css selectors like:
   * :root[data-theme="cyber"] { ... }
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  /**
   * Click outside to close the dropdown.
   * Keeps the UI feeling native.
   */
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  /**
   * Single-select (radio-style) theme selection.
   * We keep this as a function so you can later add analytics, etc.
   */
  function selectTheme(next: ThemeKey) {
    setTheme(next);
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          // Base
          "inline-flex items-center justify-center border border-border bg-card shadow-sm",
          "transition hover:-translate-y-0.5 hover:shadow-md",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",

          // ✅ Mobile: tiny square icon button
          "h-8 w-8 rounded-lg sm:hidden",
        ].join(" ")}
        title="Themes"
      >
        {/* simple palette-ish icon (no extra libs needed) */}
        <span aria-hidden="true" className="text-sm leading-none">{">"}</span>
        <span className="sr-only">Themes</span>
      </button>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          // Desktop/tablet: original full button
          "hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3",
          "text-sm text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ].join(" ")}
      >
        Themes <span className="text-muted">▾</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 mt-3 w-[220px] sm:w-[260px] max-w-[85vw] rounded-2xl border border-border bg-card p-3 shadow-lg"
        >
          <div className="px-2 pb-2 text-xs font-medium text-muted">
            Choose a colour set
          </div>

          {/* Theme rows */}
          <div className="grid gap-1">
          {THEMES.map((t) => {
            const isActive = theme === t.key;

            return (
              <div
                key={t.key}
                className="grid h-14 grid-cols-[1fr_auto] items-center gap-4 px-2"
              >
                <span className="text-lg font-semibold text-foreground">
                  {t.label}
                </span>

                {/* This wrapper forces true vertical centring */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => selectTheme(t.key)}
                    className="block p-0"
                    aria-pressed={isActive}
                    aria-label={`Select ${t.label} theme`}
                  >
                    { /* Track */ }
                    <span
                      className={[
                        "relative block box-border h-[30px] w-[52px] rounded-[8px] border border-border transition-colors",
                        isActive ? "bg-accent" : "bg-card",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <span
                        className={[
                          "absolute left-[2px] top-1/2 h-[26px] w-[26px] -translate-y-1/2 rounded-[6px] bg-background shadow-sm",
                          "transition-transform duration-200",
                          // 52 - 26 - 2 - 2 = 22
                          isActive ? "translate-x-[22px]" : "translate-x-0",
                        ].join(" ")}
                      />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

          {/* Footer */}
          <div className="mt-2 flex justify-end px-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-xs text-muted hover:bg-background/60"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}