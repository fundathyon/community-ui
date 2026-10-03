import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function Table({ stickyHeader, className, children, tableProps, ...props }) {
    return (_jsx("div", { className: cn("overflow-x-auto rounded-xl border border-border bg-surface", className), ...props, children: _jsx("table", { "data-sticky": stickyHeader ? "" : undefined, ...tableProps, className: cn("group w-full border-collapse text-body text-text", tableProps?.className), children: children }) }));
}
/**
 * TableHeader — the `<thead>`. Header cells use the overline treatment
 * (uppercase, tracked, muted — §14). Sticks to the top when the parent Table
 * has `stickyHeader` (via the `group-data-[sticky]` marker).
 */
export function TableHeader({ className, ...props }) {
    return (_jsx("thead", { className: cn("bg-surface", "group-data-[sticky]:sticky group-data-[sticky]:top-0 group-data-[sticky]:fdn-z-sticky group-data-[sticky]:shadow-sm", className), ...props }));
}
export function TableBody({ className, ...props }) {
    return _jsx("tbody", { className: cn(className), ...props });
}
export function TableRow({ interactive, selected, terminal, className, ...props }) {
    return (_jsx("tr", { "data-state": selected ? "selected" : undefined, className: cn("group/row border-b border-border last:border-0", interactive && "cursor-pointer hover:bg-surface-hover", selected && "bg-accent-bg", terminal && "opacity-60", className), ...props }));
}
/** Column header — overline caps, muted (§14 "cabecera en overline"). */
export function TableHead({ align = "left", className, ...props }) {
    return (_jsx("th", { scope: "col", className: cn("h-10 whitespace-nowrap px-3 text-overline uppercase text-text-muted", align === "right" ? "text-right" : "text-left", className), ...props }));
}
export function TableCell({ align = "left", className, ...props }) {
    return (_jsx("td", { className: cn("px-3 py-2 align-middle", align === "right" ? "text-right" : "text-left", className), ...props }));
}
export function TableCaption({ className, ...props }) {
    return (_jsx("caption", { className: cn("px-3 py-2 text-left text-caption text-text-muted", className), ...props }));
}
