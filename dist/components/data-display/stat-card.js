import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "../../lib/cn";
import { Card } from "../layout/card";
import { Icon } from "../typography/icon";
const directionIcon = { up: ArrowUp, down: ArrowDown, flat: Minus };
function deltaTone(positive) {
    if (positive === undefined)
        return "text-text-muted";
    return positive ? "text-success" : "text-danger";
}
function StatBlock({ label, value, delta, context }) {
    return (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-overline uppercase text-text-muted", children: label }), _jsx("span", { className: "text-h2 tabular-nums text-text", children: value }), delta ? (_jsxs("span", { className: cn("inline-flex items-center gap-1 text-caption", deltaTone(delta.positive)), children: [_jsx(Icon, { icon: directionIcon[delta.direction], size: 12 }), delta.value] })) : null, context ? _jsx("span", { className: "text-caption text-text-muted", children: context }) : null] }));
}
/**
 * StatCard — a single headline figure (§14): overline label on top, big figure
 * in the middle, change or context below. The delta always carries its sign and
 * period; its color is semantic only when "more" is objectively good. For a stat
 * paired with a sparkline, use MetricCard.
 */
export function StatCard({ label, value, delta, context, className, ...props }) {
    return (_jsx(Card, { className: cn("p-4", className), ...props, children: _jsx(StatBlock, { label: label, value: value, delta: delta, context: context }) }));
}
/**
 * MetricCard — StatCard plus a `visual` slot for a sparkline or micro-chart
 * (§14). The figure keeps its meaning without the chart; the chart is context,
 * never the headline. Pass the chart element via `visual`.
 */
export function MetricCard({ label, value, delta, context, visual, className, ...props }) {
    return (_jsx(Card, { className: cn("p-4", className), ...props, children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsx(StatBlock, { label: label, value: value, delta: delta, context: context }), visual ? _jsx("div", { className: "min-w-0 shrink-0", children: visual }) : null] }) }));
}
