import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * ChartToolbar — the header row of a dashboard section (§22 "Vista general"):
 * title on the left, controls (range picker, refresh meta) on the right. Pure
 * layout; wraps to a stack on narrow widths.
 *
 * Server-component safe.
 */
export function ChartToolbar({ title, meta, children, className, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-wrap items-center justify-between gap-2", className), ...props, children: [title !== undefined && _jsx("div", { className: "min-w-0 text-h5 text-text", children: title }), (meta !== undefined || children !== undefined) && (_jsxs("div", { className: "flex items-center gap-2", children: [meta !== undefined && _jsx("span", { className: "text-caption text-text-muted", children: meta }), children] }))] }));
}
