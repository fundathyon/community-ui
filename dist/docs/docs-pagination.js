import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";
function PageCard({ link, direction, overline, }) {
    const isNext = direction === "next";
    const inner = (_jsxs(_Fragment, { children: [_jsxs("span", { className: cn("flex items-center gap-1 text-overline uppercase text-text-muted", isNext && "justify-end"), children: [!isNext && _jsx(Icon, { icon: ChevronLeft, size: 12 }), overline, isNext && _jsx(Icon, { icon: ChevronRight, size: 12 })] }), _jsx("span", { className: cn("truncate text-body font-medium text-text", isNext && "text-right"), children: link.label })] }));
    const props = {
        href: link.href,
        className: cn("group flex min-w-0 flex-col gap-1 rounded-lg border border-border p-3", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover", isNext ? "items-end text-right" : "items-start"),
        children: inner,
    };
    return link.render ? link.render(props) : _jsx("a", { ...props });
}
/**
 * DocsPagination — prev/next page links at the bottom of a docs page (§26). Two
 * cards spanning the measure: the previous page on the left, the next on the
 * right, each with a direction overline, the page title and a chevron. Renders
 * `<a>` by default; pass `render` per link for a framework router.
 *
 * Server-component safe.
 */
export function DocsPagination({ prev, next, previousLabel = "Previous", nextLabel = "Next", label = "Pagination", className, ...props }) {
    return (_jsxs("nav", { "aria-label": label, className: cn("mt-12 grid gap-3 sm:grid-cols-2", className), ...props, children: [prev ? _jsx(PageCard, { link: prev, direction: "prev", overline: previousLabel }) : _jsx("span", { "aria-hidden": true }), next ? _jsx(PageCard, { link: next, direction: "next", overline: nextLabel }) : _jsx("span", { "aria-hidden": true })] }));
}
