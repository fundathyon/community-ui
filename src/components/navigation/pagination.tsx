"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

/** All copy is overridable — products ship Spanish ("Página 3", "3 de 7"). */
export interface PaginationLabels {
  /** `nav` landmark name. */
  navigation?: string;
  previous?: string;
  next?: string;
  /** Accessible name of each page button. */
  page?: (page: number) => string;
  /** Compact mode status text ("3 of 7"). */
  status?: (page: number, pageCount: number) => string;
}

const defaultLabels: Required<PaginationLabels> = {
  navigation: "Pagination",
  previous: "Previous page",
  next: "Next page",
  page: (page) => `Page ${page}`,
  status: (page, pageCount) => `${page} of ${pageCount}`,
};

/**
 * Default range label for the slot: `renderRange(3, 20, 128)` → "41–60 of 128".
 * Products override the copy by composing their own string.
 */
export function renderRange(page: number, pageSize: number, total: number): string {
  if (total <= 0) return `0–0 of 0`;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return `${start}–${end} of ${total}`;
}

type PageEntry = number | "ellipsis-start" | "ellipsis-end";

/** first + last + current ± siblings, with ellipsis for the gaps. */
function getPageEntries(page: number, pageCount: number, siblingCount: number): PageEntry[] {
  const totalVisible = siblingCount * 2 + 5; // first, last, current, 2 ellipsis slots
  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftRange }, (_, i) => i + 1), "ellipsis-end", pageCount];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = 3 + 2 * siblingCount;
    return [1, "ellipsis-start", ...Array.from({ length: rightRange }, (_, i) => pageCount - rightRange + 1 + i)];
  }
  return [
    1,
    "ellipsis-start",
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
    "ellipsis-end",
    pageCount,
  ];
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current one. */
  siblingCount?: number;
  /** Range slot ("41–60 de 128") — build it with the exported `renderRange`. */
  rangeLabel?: ReactNode;
  /** Prev/next + "x of y" only — for footers where numbers don't fit. */
  compact?: boolean;
  labels?: PaginationLabels;
}

const pageButtonClasses = cn(
  "grid size-7 select-none place-items-center rounded-md text-body tabular-nums text-text-secondary",
  "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
  "hover:bg-surface-hover hover:text-text",
  "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-text-secondary",
  "fdn-touch-target",
);

/**
 * Pagination — numbered pages when the total matters (§12: audit, tags).
 * Infinite scroll NEVER in admin tables: it breaks "back" and makes a
 * position impossible to cite. Current page gets `aria-current="page"`.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  rangeLabel,
  compact = false,
  labels,
  className,
  ...props
}: PaginationProps) {
  const t = { ...defaultLabels, ...labels };
  const entries = getPageEntries(page, pageCount, siblingCount);

  return (
    <nav aria-label={t.navigation} className={cn("flex items-center gap-3", className)} {...props}>
      {rangeLabel && <span className="text-body-sm tabular-nums text-text-secondary">{rangeLabel}</span>}
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={t.previous}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={pageButtonClasses}
        >
          <Icon icon={ChevronLeft} size={14} />
        </button>
        {compact ? (
          <span className="px-1 text-body-sm tabular-nums text-text-secondary">{t.status(page, pageCount)}</span>
        ) : (
          entries.map((entry) =>
            typeof entry === "number" ? (
              <button
                key={entry}
                type="button"
                aria-label={t.page(entry)}
                aria-current={entry === page ? "page" : undefined}
                onClick={() => onPageChange(entry)}
                className={cn(pageButtonClasses, entry === page && "bg-accent-bg text-accent hover:bg-accent-bg hover:text-accent")}
              >
                {entry}
              </button>
            ) : (
              <span key={entry} aria-hidden className="grid size-7 place-items-center text-body text-text-muted">
                …
              </span>
            ),
          )
        )}
        <button
          type="button"
          aria-label={t.next}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className={pageButtonClasses}
        >
          <Icon icon={ChevronRight} size={14} />
        </button>
      </div>
    </nav>
  );
}
