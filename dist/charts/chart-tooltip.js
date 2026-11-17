import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * ChartTooltip — the suite's own tooltip content for every recharts wrapper
 * (§22 typography rule): surface-raised card, border, shadow-md, rounded-md,
 * caption type, a colour dot per series and values in `tabular-nums`, right
 * aligned. recharts' default tooltip is never shown; this replaces it.
 *
 * Presentational and recharts-free, so it is also usable in custom compositions.
 */
export function ChartTooltip({ label, items, className }) {
    return (_jsxs("div", { className: cn("min-w-32 rounded-md border border-border bg-surface-raised px-2.5 py-2 shadow-md", className), children: [label && _jsx("div", { className: "mb-1 text-caption text-text-muted", children: label }), _jsx("ul", { className: "flex flex-col gap-1", children: items.map((item, i) => (_jsxs("li", { className: "flex items-center gap-2 text-caption", children: [_jsx("span", { "aria-hidden": "true", className: "size-2 shrink-0 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "min-w-0 flex-1 truncate text-text-secondary", children: item.name }), _jsx("span", { className: "ml-auto tabular-nums text-text", children: item.value })] }, i))) })] }));
}
