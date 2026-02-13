"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Fuse from "fuse.js";
import type { ExplorerItem } from "@/lib/explorer/types";

type SortMode = "newest" | "oldest";

function toTime(dateStr?: string): number {
  if (!dateStr) return 0;
  const t = Date.parse(dateStr);
  return Number.isFinite(t) ? t : 0;
}

type Props = {
  heading: string;
  description?: string;

  items: ExplorerItem[];
  typeLabel?: (type: string) => string;

  /** ✅ Instead of renderItem, render the whole results area */
  renderResults: (filtered: ExplorerItem[]) => ReactNode;

  defaultSort?: SortMode;
};

export default function Explorer({
  heading,
  description,
  items,
  typeLabel,
  renderResults,
  defaultSort = "newest",
}: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<SortMode>(defaultSort);

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(items.map((i) => i.type).filter(Boolean) as string[])).sort();
    return ["all", ...types];
  }, [items]);

  const fuse = useMemo(() => {
    return new Fuse(items, {
      threshold: 0.35,
      ignoreLocation: true,
      keys: [
        { name: "title", weight: 0.55 },
        { name: "summary", weight: 0.30 },
        { name: "type", weight: 0.05 },
        { name: "tags", weight: 0.10 },
      ],
    });
  }, [items]);

  const filtered = useMemo(() => {
    const base =
      query.trim().length > 0 ? fuse.search(query.trim()).map((r) => r.item) : items;

    const byType = type === "all" ? base : base.filter((i) => i.type === type);

    const sorted = [...byType].sort((a, b) => {
      const diff = toTime(a.date) - toTime(b.date);
      return sort === "newest" ? -diff : diff;
    });

    return sorted;
  }, [items, fuse, query, type, sort]);

  const hasActiveFilters =
    query.trim().length > 0 || type !== "all" || sort !== defaultSort;

  return (
    <section>
      {/* header row with RHS pop-out button */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{heading}</h1>
          {description ? <p className="mt-4 max-w-2xl text-muted">{description}</p> : null}
        </div>

        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Filters
            {hasActiveFilters ? (
              <span className="ml-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-foreground">
                On
              </span>
            ) : null}
          </button>

          {open ? (
            <div className="absolute right-0 mt-3 w-[320px] max-w-[90vw] rounded-2xl border border-border bg-card p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Filter & sort</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-1 text-sm text-muted hover:bg-background/60"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted">Search</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-foreground/30"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted">Type</span>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-foreground/30"
                  >
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t === "all" ? "All types" : typeLabel ? typeLabel(t) : t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-medium text-muted">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-foreground/30"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </label>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setType("all");
                      setSort(defaultSort);
                    }}
                    className="text-sm text-muted underline underline-offset-4 hover:text-foreground"
                  >
                    Clear
                  </button>

                  <button type="button" onClick={() => setOpen(false)} className="btn-primary py-2">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing {filtered.length} item{filtered.length === 1 ? "" : "s"}
      </p>

      {/* ✅ CardGrid controls layout & sizing */}
      {renderResults(filtered)}
    </section>
  );
}