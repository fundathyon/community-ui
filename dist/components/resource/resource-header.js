import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { cn } from "../../lib/cn";
/**
 * ResourceMeta — the resource's metadata as a single line of running text, the
 * fragments joined by "·" (§25). NOT a key-value table: prose reads at a glance
 * and does not steal height from the content. Used by ResourceHeader and
 * exported for standalone use.
 *
 * Server-component safe.
 */
export function ResourceMeta({ items, separator = "·", className, ...props }) {
    if (!items || items.length === 0)
        return null;
    return (_jsx("p", { className: cn("text-body-sm text-text-muted", className), ...props, children: items.map((item, index) => (_jsxs(Fragment, { children: [index > 0 ? (_jsx("span", { "aria-hidden": true, className: "mx-1.5 text-text-disabled", children: separator })) : null, item] }, index))) }));
}
/**
 * ResourceHeader — the top of a resource detail (§25): breadcrumb, then a title
 * row with the title, a status badge and the primary actions, then a running-text
 * meta line. The fixed order (breadcrumb → title → status → actions → metadata)
 * is the same across every product so operators never relearn it.
 *
 * Server-component safe.
 */
export function ResourceHeader({ breadcrumb, title, status, actions, meta, className, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col gap-3", className), ...props, children: [breadcrumb ? _jsx("div", { children: breadcrumb }) : null, _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [_jsx("h1", { className: "min-w-0 truncate text-h1 text-text", children: title }), status ? _jsx("span", { className: "shrink-0", children: status }) : null] }), actions ? _jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions }) : null] }), meta ? _jsx(ResourceMeta, { items: meta }) : null] }));
}
