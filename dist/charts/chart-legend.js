import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * ChartLegend — the suite's legend: a horizontal run of colour dots + names
 * below the chart (§22). Not decorative — it is shown only when more than one
 * series needs to be told apart, and the series are ALSO distinguishable by
 * label and position, never colour alone (§22 accessibility).
 *
 * Presentational; exported for custom compositions and used internally.
 */
export function ChartLegend({ items, className }) {
    return (_jsx("ul", { className: cn("flex flex-wrap items-center gap-x-4 gap-y-1", className), children: items.map((item, i) => (_jsxs("li", { className: "flex items-center gap-1.5 text-caption text-text-secondary", children: [_jsx("span", { "aria-hidden": "true", className: "size-2 shrink-0 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "truncate", children: item.name }), item.value !== undefined && (_jsx("span", { className: "ml-1 tabular-nums text-text-muted", children: item.value }))] }, i))) }));
}
