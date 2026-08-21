"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Cell, Pie, PieChart as RPieChart, Tooltip } from "recharts";
import { resolveSeriesColor } from "./color";
import { ChartCanvas, makePieTooltip } from "./chart-canvas";
import { ChartFrame } from "./chart-frame";
import { defaultYFormat, percent } from "./internal";
import { CHART_HEIGHT } from "./types";
/**
 * DonutChart — a distribution (§22). Two variants: a thin ring with a legend
 * list, or the flat proportion-bar `list`. Both default to one accent hue at
 * descending opacity — never a rainbow of categories (§22). The centre carries
 * a slot (usually the total), the legend shows name · value · %, and an
 * equivalent table backs it for screen readers.
 *
 * When to use: parts of a single whole. For magnitudes that are not a whole use
 * BarChart; for a trend use LineChart.
 */
export function DonutChart({ segments, label, summary, height = CHART_HEIGHT, state, onRetry, errorTitle, errorDescription, retryLabel, variant = "donut", centerLabel, valueFormat, emptyLabel, categoryLabel = "Categoría", viewDataLabel, onViewData, width, className, }) {
    const valueFmt = valueFormat ?? defaultYFormat;
    const { colors, colorByName, total, table, hasData } = useMemo(() => {
        const resolved = segments.map((s, i) => resolveSeriesColor(s.color ?? { categorical: i }));
        const byName = {};
        segments.forEach((s, i) => (byName[s.name] = resolved[i] ?? "var(--fdn-accent-solid)"));
        const sum = segments.reduce((acc, s) => acc + (s.value > 0 ? s.value : 0), 0);
        return {
            colors: resolved,
            colorByName: byName,
            total: sum,
            table: {
                columns: [categoryLabel, "Valor", "%"],
                rows: segments.map((s) => [s.name, valueFmt(s.value), `${percent(s.value, sum).toFixed(1)} %`]),
            },
            hasData: sum > 0,
        };
    }, [segments, valueFmt, categoryLabel]);
    const derivedState = state ?? (hasData ? "ready" : "empty");
    const pct = (v) => `${percent(v, total).toFixed(1)} %`;
    const body = variant === "list" ? (_jsx("ul", { className: "flex w-full flex-col justify-center gap-2.5", children: segments.map((s, i) => (_jsxs("li", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-2 text-caption", children: [_jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [_jsx("span", { "aria-hidden": "true", className: "size-2 shrink-0 rounded-full", style: { backgroundColor: colors[i] } }), _jsx("span", { className: "truncate text-text-secondary", children: s.name })] }), _jsxs("span", { className: "shrink-0 tabular-nums text-text", children: [valueFmt(s.value), " ", _jsxs("span", { className: "text-text-muted", children: ["\u00B7 ", pct(s.value)] })] })] }), _jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-hover", children: _jsx("div", { className: "h-full rounded-full", style: { width: `${percent(s.value, total)}%`, backgroundColor: colors[i] } }) })] }, s.name))) })) : (_jsxs("div", { className: "flex h-full w-full items-center gap-4", children: [_jsxs("div", { className: "relative shrink-0", style: { width: height, height }, children: [_jsx(ChartCanvas, { width: width, height: height, children: _jsxs(RPieChart, { children: [_jsx(Pie, { data: segments, dataKey: "value", nameKey: "name", innerRadius: "68%", outerRadius: "92%", paddingAngle: segments.length > 1 ? 2 : 0, stroke: "none", isAnimationActive: false, children: segments.map((s, i) => (_jsx(Cell, { fill: colors[i] }, s.name))) }), _jsx(Tooltip, { content: makePieTooltip({ colorByName, valueFormat: valueFmt }) })] }) }), centerLabel && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center", children: centerLabel }))] }), _jsx("ul", { className: "flex min-w-0 flex-1 flex-col gap-1.5", children: segments.map((s, i) => (_jsxs("li", { className: "flex items-baseline justify-between gap-2 text-caption", children: [_jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [_jsx("span", { "aria-hidden": "true", className: "size-2 shrink-0 rounded-full", style: { backgroundColor: colors[i] } }), _jsx("span", { className: "truncate text-text-secondary", children: s.name })] }), _jsxs("span", { className: "shrink-0 tabular-nums text-text", children: [valueFmt(s.value), " ", _jsxs("span", { className: "text-text-muted", children: ["\u00B7 ", pct(s.value)] })] })] }, s.name))) })] }));
    return (_jsx(ChartFrame, { label: label, summary: summary, height: height, state: derivedState, onRetry: onRetry, errorTitle: errorTitle, errorDescription: errorDescription, retryLabel: retryLabel, emptyLabel: emptyLabel, table: table, viewDataLabel: viewDataLabel, onViewData: onViewData, className: className, autoHeight: variant === "list", children: body }));
}
