"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
const defaultLabels = {
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
export function renderRange(page, pageSize, total) {
    if (total <= 0)
        return `0–0 of 0`;
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    return `${start}–${end} of ${total}`;
}
/** first + last + current ± siblings, with ellipsis for the gaps. */
function getPageEntries(page, pageCount, siblingCount) {
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
const pageButtonClasses = cn("grid size-7 select-none place-items-center rounded-md text-body tabular-nums text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text", "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-text-secondary", "fdn-touch-target");
/**
 * Pagination — numbered pages when the total matters (§12: audit, tags).
 * Infinite scroll NEVER in admin tables: it breaks "back" and makes a
 * position impossible to cite. Current page gets `aria-current="page"`.
 */
export function Pagination({ page, pageCount, onPageChange, siblingCount = 1, rangeLabel, compact = false, labels, className, ...props }) {
    const t = { ...defaultLabels, ...labels };
    const entries = getPageEntries(page, pageCount, siblingCount);
    return (_jsxs("nav", { "aria-label": t.navigation, className: cn("flex items-center gap-3", className), ...props, children: [rangeLabel && _jsx("span", { className: "text-body-sm tabular-nums text-text-secondary", children: rangeLabel }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { type: "button", "aria-label": t.previous, disabled: page <= 1, onClick: () => onPageChange(page - 1), className: pageButtonClasses, children: _jsx(Icon, { icon: ChevronLeft, size: 14 }) }), compact ? (_jsx("span", { className: "px-1 text-body-sm tabular-nums text-text-secondary", children: t.status(page, pageCount) })) : (entries.map((entry) => typeof entry === "number" ? (_jsx("button", { type: "button", "aria-label": t.page(entry), "aria-current": entry === page ? "page" : undefined, onClick: () => onPageChange(entry), className: cn(pageButtonClasses, entry === page && "bg-accent-bg text-accent hover:bg-accent-bg hover:text-accent"), children: entry }, entry)) : (_jsx("span", { "aria-hidden": true, className: "grid size-7 place-items-center text-body text-text-muted", children: "\u2026" }, entry)))), _jsx("button", { type: "button", "aria-label": t.next, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), className: pageButtonClasses, children: _jsx(Icon, { icon: ChevronRight, size: 14 }) })] })] }));
}
