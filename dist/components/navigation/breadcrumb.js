import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
const linkClasses = "rounded-sm text-text-muted transition-colors duration-[var(--fdn-dur-fast)] hover:text-text";
function renderLink(item) {
    const props = {
        href: item.href,
        className: linkClasses,
        children: item.label,
    };
    return item.render ? item.render(props) : _jsx("a", { ...props });
}
/**
 * Breadcrumb — the trail of nested views in the shell (§12). The last item is
 * the current page (`aria-current="page"`, plain text); the rest are links.
 * Past 4 items the middle collapses into "…" carrying the full hidden path in
 * its `title`.
 *
 * Server-component safe.
 */
export function Breadcrumb({ items, label = "Breadcrumb", className, ...props }) {
    const first = items[0];
    const entries = items.length > 4 && first !== undefined
        ? [
            { kind: "item", item: first },
            { kind: "ellipsis", hidden: items.slice(1, -2) },
            ...items.slice(-2).map((item) => ({ kind: "item", item })),
        ]
        : items.map((item) => ({ kind: "item", item }));
    return (_jsx("nav", { "aria-label": label, className: cn("min-w-0", className), ...props, children: _jsx("ol", { className: "flex min-w-0 flex-wrap items-center gap-1 text-body", children: entries.map((entry, index) => {
                const last = index === entries.length - 1;
                return (_jsxs(Fragment, { children: [_jsx("li", { className: "flex min-w-0 items-center", children: entry.kind === "ellipsis" ? (_jsx("span", { className: "text-text-muted", title: entry.hidden.map((item) => item.label).join(" / "), children: "\u2026" })) : last ? (_jsx("span", { "aria-current": "page", className: "truncate text-text", children: entry.item.label })) : (renderLink(entry.item)) }), !last && (_jsx("li", { "aria-hidden": true, className: "flex items-center text-text-muted", children: _jsx(Icon, { icon: ChevronRight, size: 12 }) }))] }, entry.kind === "item" ? `${entry.item.label}-${index}` : "ellipsis"));
            }) }) }));
}
