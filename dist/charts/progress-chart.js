"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { resolveSeriesColor } from "./color";
import { ChartFrame } from "./chart-frame";
import { defaultYFormat } from "./internal";
const TONE_MARKER = {
    info: "bg-info-solid",
    success: "bg-success-solid",
    warning: "bg-warning-solid",
    danger: "bg-danger-solid",
};
// Full class strings (never interpolated) so Tailwind's scan keeps them (§ badge).
const TONE_TEXT = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
const clampPct = (n) => Math.max(0, Math.min(100, n));
/**
 * ProgressChart — a single value against a maximum, with optional target /
 * threshold markers (§22 KPI quota). Horizontal track, flat accent fill, markers
 * in semantic tones. Announced as a `progressbar`; the frame adds the figure and
 * the four states.
 *
 * When to use: "X of Y used", quotas, a value approaching a limit. For a trend
 * over time use LineChart; for parts of a whole use DonutChart.
 */
export function ProgressChart({ value, max, label, summary, thresholds = [], fill = "accent", valueFormat, showValue = true, height = 48, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, className, }) {
    const valueFmt = valueFormat ?? defaultYFormat;
    const derivedState = state ?? (max > 0 ? "ready" : "empty");
    const pct = clampPct(max > 0 ? (value / max) * 100 : 0);
    const fillColor = resolveSeriesColor(fill);
    return (_jsx(ChartFrame, { label: label, summary: summary, height: height, state: derivedState, onRetry: onRetry, errorTitle: errorTitle, errorDescription: errorDescription, retryLabel: retryLabel, emptyLabel: emptyLabel, className: className, autoHeight: true, children: _jsxs("div", { className: "flex w-full flex-col gap-1.5", children: [showValue && (_jsxs("div", { className: "flex items-baseline justify-between gap-2 text-caption", children: [_jsx("span", { className: "tabular-nums text-text", children: valueFmt(value) }), _jsx("span", { className: "tabular-nums text-text-muted", children: valueFmt(max) })] })), _jsxs("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": value, "aria-valuetext": `${valueFmt(value)} / ${valueFmt(max)}`, className: "relative h-2 w-full overflow-visible rounded-full bg-surface-hover", children: [_jsx("div", { className: "h-full rounded-full", style: { width: `${pct}%`, backgroundColor: fillColor } }), thresholds.map((t, i) => {
                            const left = clampPct(max > 0 ? (t.value / max) * 100 : 0);
                            return (_jsx("span", { "aria-hidden": "true", title: t.label, className: cn("absolute top-[-2px] h-[calc(100%+4px)] w-0.5 rounded-full", TONE_MARKER[t.tone]), style: { left: `${left}%` } }, i));
                        })] }), thresholds.some((t) => t.label) && (_jsx("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5", children: thresholds.map((t, i) => t.label ? (_jsxs("span", { className: cn("flex items-center gap-1 text-caption", TONE_TEXT[t.tone]), children: [_jsx("span", { "aria-hidden": "true", className: cn("size-1.5 rounded-full", TONE_MARKER[t.tone]) }), t.label] }, i)) : null) }))] }) }));
}
