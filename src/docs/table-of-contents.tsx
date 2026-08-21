"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface TocItem {
  /** Target heading id (matches a `DocsSection` id). */
  id: string;
  label: string;
  /** 2 for a section, 3 for a sub-section — controls indentation. */
  depth: 2 | 3;
}

export interface TableOfContentsProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: TocItem[];
  /** Controlled active id — highlights that entry. Overrides scroll-spy. */
  activeId?: string;
  /** When true, observe the sections and highlight the current one on scroll.
   * "use client" only — pass `activeId` instead for controlled highlighting. */
  followScroll?: boolean;
  /** Heading of the rail. Overridable (products ship Spanish "En esta página"). */
  label?: string;
}

/**
 * TableOfContents — the right-rail "On this page" index (§26). Anchor links to
 * the page's `DocsSection`s; the active entry gets accent text and a left rule.
 *
 * Highlight it either controlled (`activeId`) or with the built-in scroll-spy
 * (`followScroll`), which tracks the topmost visible section via
 * IntersectionObserver and cleans the observer up on unmount. Hidden below `xl`
 * by the layout.
 */
export function TableOfContents({
  items,
  activeId,
  followScroll = false,
  label = "On this page",
  className,
  ...props
}: TableOfContentsProps) {
  const [spyId, setSpyId] = useState<string | undefined>(undefined);
  // Track which sections are currently intersecting; pick the first in order.
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!followScroll || typeof IntersectionObserver === "undefined" || typeof document === "undefined") {
      return;
    }
    visible.current = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.current.add(id);
          else visible.current.delete(id);
        }
        // First item (document order) that is currently visible wins.
        const current = items.find((item) => visible.current.has(item.id));
        if (current) setSpyId(current.id);
      },
      // Bias toward the heading nearest the top of the viewport.
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [followScroll, items]);

  const active = activeId ?? spyId;

  return (
    <nav aria-label={label} className={cn("text-body-sm", className)} {...props}>
      <div className="mb-2 text-overline uppercase text-text-muted">{label}</div>
      <ul className="m-0 list-none border-l border-border pl-0">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1 no-underline",
                  item.depth === 3 ? "pl-6" : "pl-3",
                  "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
                  isActive
                    ? "border-accent-border text-accent"
                    : "border-transparent text-text-muted hover:text-text",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
