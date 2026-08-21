import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * MetricChart — a KPI header (label · value · context) stacked over its chart
 * (§22 grid: KPIs on top, the number you read without scrolling). Pure layout —
 * it deliberately does NOT import the parallel data-display StatCard; it just
 * arranges a value and a chart child.
 *
 * When to use: a headline number paired with its trend. For the number alone use
 * a StatCard from data-display; for the trend alone use a chart directly.
 *
 * Server-component safe.
 */
export function MetricChart({ label, value, context, children, className, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col gap-3", className), ...props, children: [_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-caption text-text-muted", children: label }), _jsx("span", { className: "text-h2 tabular-nums text-text", children: value }), context !== undefined && _jsx("span", { className: "text-caption text-text-secondary", children: context })] }), children] }));
}
