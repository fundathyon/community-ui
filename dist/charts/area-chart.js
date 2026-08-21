"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Area, AreaChart as RAreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { resolveSeriesColors } from "./color";
import { AXIS_PROPS, CARTESIAN_MARGIN, ChartCanvas, makeCartesianTooltip } from "./chart-canvas";
import { ChartFrame } from "./chart-frame";
import { ChartLegend } from "./chart-legend";
import { buildCartesianData, buildCartesianTable, countGaps, defaultPartialNote, defaultXFormat, defaultYFormat, hasDrawableData, X_KEY, } from "./internal";
import { CHART_HEIGHT } from "./types";
/**
 * AreaChart — a LineChart whose series carry a flat, low-opacity fill to weight
 * volume (§22: flat fills, NEVER gradients). `stacked` composes parts of a whole
 * over time. Same states, gaps and accessibility as LineChart.
 *
 * When to use: emphasise magnitude or composition. For a bare trend prefer
 * LineChart; the fill only earns its place when volume is the point.
 */
export function AreaChart({ series, label, summary, height = CHART_HEIGHT, state, onRetry, errorTitle, errorDescription, retryLabel, xTickFormat, yTickFormat, emptyLabel, partialNote, xLabel = "x", viewDataLabel, onViewData, width, className, stacked = false, curve = "monotone", }) {
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
    // Stacked areas cannot break on nulls without tearing the stack, so gaps are
    // bridged when stacked; unstacked areas keep the honest break.
    const connectNulls = stacked;
    const chart = (_jsxs(RAreaChart, { data: rows, margin: CARTESIAN_MARGIN, children: [_jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3", stroke: "var(--fdn-border)" }), _jsx(XAxis, { dataKey: X_KEY, ...AXIS_PROPS, tickFormatter: (v) => xFmt(originals.get(String(v)) ?? v) }), _jsx(YAxis, { width: 44, ...AXIS_PROPS, tickFormatter: (v) => yFmt(Number(v)) }), _jsx(Tooltip, { content: makeCartesianTooltip({ colorByName, originals, xFormat: xFmt, yFormat: yFmt }), cursor: { stroke: "var(--fdn-border-strong)", strokeWidth: 1 } }), series.map((s, i) => (_jsx(Area, { type: curve, dataKey: s.name, stackId: stacked ? "stack" : undefined, stroke: colors[i], strokeWidth: 2, fill: colors[i], fillOpacity: 0.16, dot: false, activeDot: { r: 3, strokeWidth: 0 }, connectNulls: connectNulls, isAnimationActive: false }, s.name)))] }));
    return (_jsx(ChartFrame, { label: label, summary: summary, height: height, state: derivedState, onRetry: onRetry, errorTitle: errorTitle, errorDescription: errorDescription, retryLabel: retryLabel, emptyLabel: emptyLabel, partialNote: note, table: table, viewDataLabel: viewDataLabel, onViewData: onViewData, className: className, footer: series.length > 1 ? (_jsx(ChartLegend, { items: series.map((s, i) => ({ name: s.name, color: colors[i] ?? "var(--fdn-accent-solid)" })) })) : undefined, children: _jsx(ChartCanvas, { width: width, height: height, children: chart }) }));
}
