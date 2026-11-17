"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Area, AreaChart as RAreaChart, Line, LineChart as RLineChart, XAxis, YAxis } from "recharts";
import { cn } from "../lib/cn";
import { Skeleton } from "../components/feedback/skeleton";
import { resolveSeriesColor } from "./color";
import { ChartCanvas } from "./chart-canvas";
import { SPARKLINE_HEIGHT } from "./types";
/**
 * Sparkline — a tiny inline trend for a MetricChart slot or a dense table cell
 * (§22). No axes, no grid, no tooltip, no title chrome — the deliberate inline
 * exception to ChartFrame. It still refuses to fake data: with nothing to draw
 * it shows a muted placeholder, never a flat zero line.
 *
 * When to use: a trend glanced at beside a number. Anything with axes, a legend
 * or hover detail is a LineChart, not a Sparkline.
 */
export function Sparkline({ data, color = "accent", area = false, curve = "monotone", height = SPARKLINE_HEIGHT, width, state, label, emptyLabel = "—", className, }) {
    const rows = useMemo(() => data.map((p, i) => ({ x: i, y: p.y })), [data]);
    const stroke = resolveSeriesColor(color);
    const hasData = data.some((p) => p.y !== null);
    const resolved = state ?? (hasData ? "ready" : "empty");
    const wrapperProps = label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true };
    if (resolved === "loading") {
        return _jsx(Skeleton, { className: cn("w-full", className), style: { height, width } });
    }
    if (resolved === "empty") {
        return (_jsx("span", { ...wrapperProps, className: cn("inline-flex items-center justify-center text-caption text-text-muted", className), style: { height, width }, children: emptyLabel }));
    }
    const chart = area ? (_jsxs(RAreaChart, { data: rows, margin: { top: 2, right: 0, bottom: 2, left: 0 }, children: [_jsx(XAxis, { hide: true, dataKey: "x" }), _jsx(YAxis, { hide: true, domain: ["dataMin", "dataMax"] }), _jsx(Area, { type: curve, dataKey: "y", stroke: stroke, strokeWidth: 1.5, fill: stroke, fillOpacity: 0.16, dot: false, activeDot: false, connectNulls: false, isAnimationActive: false })] })) : (_jsxs(RLineChart, { data: rows, margin: { top: 2, right: 0, bottom: 2, left: 0 }, children: [_jsx(XAxis, { hide: true, dataKey: "x" }), _jsx(YAxis, { hide: true, domain: ["dataMin", "dataMax"] }), _jsx(Line, { type: curve, dataKey: "y", stroke: stroke, strokeWidth: 1.5, dot: false, activeDot: false, connectNulls: false, isAnimationActive: false })] }));
    return (_jsx("span", { ...wrapperProps, className: cn("block", className), style: { height, width }, children: _jsx(ChartCanvas, { width: width, height: height, children: chart }) }));
}
