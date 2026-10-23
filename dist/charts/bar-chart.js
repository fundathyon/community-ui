"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Bar, BarChart as RBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { resolveSeriesColors } from "./color";
import { AXIS_PROPS, CARTESIAN_MARGIN, ChartCanvas, makeCartesianTooltip } from "./chart-canvas";
import { ChartFrame } from "./chart-frame";
import { ChartLegend } from "./chart-legend";
import { buildCartesianData, buildCartesianTable, countGaps, defaultPartialNote, defaultXFormat, defaultYFormat, hasDrawableData, X_KEY, } from "./internal";
import { CHART_HEIGHT } from "./types";
/**
 * BarChart — discrete categories on the x axis (§22). Bars carry a 2px radius;
 * `horizontal` flips category to the y axis for long labels, `stacked` composes
 * parts of a whole. Same four states, accessibility and single-hue defaulting as
 * the line charts. A lone uncoloured series is the solid accent; a group descends
 * in opacity — never one arbitrary colour per bar (§22).
 *
 * When to use: comparing magnitudes across a small set of categories. For a
 * trend over continuous time use LineChart/AreaChart.
 */
export function BarChart({ series, label, summary, height = CHART_HEIGHT, state, onRetry, errorTitle, errorDescription, retryLabel, xTickFormat, yTickFormat, emptyLabel, partialNote, xLabel = "x", viewDataLabel, onViewData, width, className, stacked = false, horizontal = false, }) {
    const xFmt = xTickFormat ?? defaultXFormat;
    const yFmt = yTickFormat ?? defaultYFormat;
    const { rows, originals, colors, colorByName, table, note } = useMemo(() => {
        const cart = buildCartesianData(series);
        const resolved = resolveSeriesColors(series);
        const byName = {};
        series.forEach((s, i) => (byName[s.name] = resolved[i] ?? "var(--fdn-accent-solid)"));
        const gaps = countGaps(series);
        const partial = gaps.missing > 0 ? (partialNote ? partialNote(gaps.missing, gaps.total) : defaultPartialNote(gaps.missing, gaps.total)) : null;
        return {
            rows: cart.rows,
            originals: cart.originals,
            colors: resolved,
            colorByName: byName,
            table: buildCartesianTable(series, cart, xFmt, yFmt, xLabel),
            note: partial,
        };
    }, [series, partialNote, xFmt, yFmt, xLabel]);
    const derivedState = state ?? (hasDrawableData(series) ? "ready" : "empty");
    // Category axis carries X_KEY; the value axis is the opposite one.
    const categoryAxis = (_jsx(XAxis, { type: horizontal ? "number" : "category", dataKey: horizontal ? undefined : X_KEY, ...AXIS_PROPS, tickFormatter: horizontal ? (v) => yFmt(Number(v)) : (v) => xFmt(originals.get(String(v)) ?? v) }));
    const valueAxis = (_jsx(YAxis, { type: horizontal ? "category" : "number", dataKey: horizontal ? X_KEY : undefined, width: horizontal ? 80 : 44, ...AXIS_PROPS, tickFormatter: horizontal ? (v) => xFmt(originals.get(String(v)) ?? v) : (v) => yFmt(Number(v)) }));
    // Rounded ends point "up" (vertical) or "right" (horizontal); flat when stacked.
    const radius = stacked ? 0 : horizontal ? [0, 2, 2, 0] : [2, 2, 0, 0];
    const chart = (_jsxs(RBarChart, { data: rows, layout: horizontal ? "vertical" : "horizontal", margin: CARTESIAN_MARGIN, children: [_jsx(CartesianGrid, { horizontal: !horizontal, vertical: horizontal, strokeDasharray: "3 3", stroke: "var(--fdn-border)" }), categoryAxis, valueAxis, _jsx(Tooltip, { content: makeCartesianTooltip({ colorByName, originals, xFormat: xFmt, yFormat: yFmt }), cursor: { fill: "var(--fdn-surface-hover)" } }), series.map((s, i) => (_jsx(Bar, { dataKey: s.name, stackId: stacked ? "stack" : undefined, fill: colors[i], radius: radius, maxBarSize: horizontal ? 28 : 48, isAnimationActive: false }, s.name)))] }));
    return (_jsx(ChartFrame, { label: label, summary: summary, height: height, state: derivedState, onRetry: onRetry, errorTitle: errorTitle, errorDescription: errorDescription, retryLabel: retryLabel, emptyLabel: emptyLabel, partialNote: note, table: table, viewDataLabel: viewDataLabel, onViewData: onViewData, className: className, footer: series.length > 1 ? (_jsx(ChartLegend, { items: series.map((s, i) => ({ name: s.name, color: colors[i] ?? "var(--fdn-accent-solid)" })) })) : undefined, children: _jsx(ChartCanvas, { width: width, height: height, children: chart }) }));
}
/**
 * StackedBarChart — the stacked preset of BarChart (§22 composition). Identical
 * surface minus the `stacked` toggle, which is fixed on. Use it when the bars
 * are parts of a whole; for independent magnitudes use BarChart grouped.
 */
export function StackedBarChart(props) {
    return _jsx(BarChart, { ...props, stacked: true });
}
