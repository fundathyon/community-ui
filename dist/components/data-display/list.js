import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * List — a simple stacked list with hairline dividers between rows. For tabular
 * data with columns, selection, or sorting use DataTable instead; this is for
 * plain vertical sequences (members, files, options).
 *
 * Server-component safe.
 */
export function List({ className, ...props }) {
    return _jsx("ul", { className: cn("divide-y divide-border", className), ...props });
}
/**
 * ListItem — one row: optional leading and trailing slots around the content,
 * 10px vertical padding. `interactive` adds hover feedback; wire the actual
 * click/keyboard onto a real control inside, not the `<li>`.
 *
 * Server-component safe.
 */
export function ListItem({ leading, trailing, interactive = false, className, children, ...props }) {
    return (_jsxs("li", { className: cn("flex items-center gap-3 py-2.5", interactive &&
            "cursor-pointer transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover", className), ...props, children: [leading ? _jsx("span", { className: "flex shrink-0 items-center", children: leading }) : null, _jsx("span", { className: "min-w-0 flex-1", children: children }), trailing ? _jsx("span", { className: "flex shrink-0 items-center", children: trailing }) : null] }));
}
