import type { HTMLAttributes, ReactNode } from "react";
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
/**
 * Default range label for the slot: `renderRange(3, 20, 128)` → "41–60 of 128".
 * Products override the copy by composing their own string.
 */
export declare function renderRange(page: number, pageSize: number, total: number): string;
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
/**
 * Pagination — numbered pages when the total matters (§12: audit, tags).
 * Infinite scroll NEVER in admin tables: it breaks "back" and makes a
 * position impossible to cite. Current page gets `aria-current="page"`.
 */
export declare function Pagination({ page, pageCount, onPageChange, siblingCount, rangeLabel, compact, labels, className, ...props }: PaginationProps): import("react").JSX.Element;
