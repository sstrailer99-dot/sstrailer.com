"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export type CategoryOption = {
  slug: string;
  title: string;
  source?: "static" | "cms";
};

type CategoryPickerProps = {
  categories: CategoryOption[];
  value: string;
  onChange: (slug: string) => void;
  label?: string;
};

export function CategoryPicker({
  categories,
  value,
  onChange,
  label = "Product category",
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = categories.find((category) => category.slug === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (category) =>
        category.title.toLowerCase().includes(q) ||
        category.slug.toLowerCase().includes(q),
    );
  }, [categories, query]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 border border-black/15 bg-white px-4 py-3 text-left text-sm transition-colors hover:border-accent focus:border-accent focus:outline-none"
      >
        <span className="min-w-0 flex-1 truncate font-medium text-navy">
          {selected?.title ?? "Select a product"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {selected && (
        <p className="mt-2 text-xs text-muted">
          Slug: <code className="text-navy">{selected.slug}</code>
          {selected.source === "cms" && (
            <span className="ml-2 rounded bg-accent/10 px-2 py-0.5 font-bold uppercase tracking-[0.1em] text-accent">
              New
            </span>
          )}
        </p>
      )}

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded border border-black/10 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
          <div className="border-b border-black/10 p-3">
            <div className="flex items-center gap-2 border border-black/10 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-muted">
                No products match your search.
              </li>
            ) : (
              filtered.map((category) => {
                const active = category.slug === value;
                return (
                  <li key={category.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(category.slug);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-accent-soft ${
                        active ? "bg-accent-soft font-semibold text-navy" : "text-ink"
                      }`}
                    >
                      <span className="min-w-0 truncate">{category.title}</span>
                      {category.source === "cms" && (
                        <span className="shrink-0 rounded bg-navy px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white">
                          New
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
