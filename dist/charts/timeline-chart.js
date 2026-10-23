"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { cn } from "../lib/cn";
import { formatDateTime } from "../lib/format";
import { ChartFrame } from "./chart-frame";
/** Status → solid semantic fill (§02 — state colours, never the accent). Unknown
 * is the neutral border, not danger: absence of data is not a failure (§22/§23). */
const STATUS_FILL = {
    up: "bg-success-solid",
    degraded: "bg-warning-solid",
    down: "bg-danger-solid",
    unknown: "bg-border",
};
const DEFAULT_STATUS_LABEL = {
    up: "Operativo",
    degraded: "Degradado",
    down: "Caído",
    unknown: "Sin datos",
};
function toMs(x) {
    return x instanceof Date ? x.getTime() : new Date(x).getTime();
}
/**
 * TimelineChart — the availability / status strip (§22 "hace 90 d … hoy"): one
 * horizontal band whose slices are weighted by duration and coloured by status.
 * Unknown reads neutral, not danger. Each slice carries a `title` tooltip; the
 * strip itself is presentational, with the frame's hidden table giving the
 * accessible reading and an availability slot for the headline number.
 *
 * When to use: uptime, incident history, a status-over-time band. For a numeric
 * metric over time use LineChart.
 */
export function TimelineChart({ segments, label, summary, startCaption = "hace 90 d", endCaption = "hoy", availabilityLabel, statusLabels, height = 56, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, className, }) {
    const statusLabel = (s) => statusLabels?.[s] ?? DEFAULT_STATUS_LABEL[s];
    const { prepared, table } = useMemo(() => {
        const withDur = segments.map((s) => {
            const start = toMs(s.start);
            const end = toMs(s.end);
            return { ...s, start, end, dur: Math.max(end - start, 0) };
        });
        const rows = segments.map((s) => [
            formatDateTime(s.start),
            formatDateTime(s.end),
            statusLabels?.[s.status] ?? DEFAULT_STATUS_LABEL[s.status],
        ]);
        return {
            prepared: withDur,
            table: { columns: ["Inicio", "Fin", "Estado"], rows },
        };
    }, [segments, statusLabels]);
    const derivedState = state ?? (segments.length > 0 ? "ready" : "empty");
    return (_jsx(ChartFrame, { label: label, summary: summary, height: height, state: derivedState, onRetry: onRetry, errorTitle: errorTitle, errorDescription: errorDescription, retryLabel: retryLabel, emptyLabel: emptyLabel, table: table, className: className, autoHeight: true, children: _jsxs("div", { className: "flex w-full flex-col gap-1.5", children: [availabilityLabel !== undefined && (_jsx("div", { className: "flex justify-end text-caption tabular-nums text-text", children: availabilityLabel })), _jsx("div", { "aria-hidden": "true", className: "flex h-8 w-full gap-px overflow-hidden rounded-md bg-surface", children: prepared.map((seg, i) => (_jsx("span", { className: cn("h-full first:rounded-l-md last:rounded-r-md", STATUS_FILL[seg.status]), style: { flexGrow: seg.dur || 1, flexBasis: 0 }, title: `${statusLabel(seg.status)} · ${formatDateTime(seg.start)} – ${formatDateTime(seg.end)}` }, i))) }), _jsxs("div", { className: "flex justify-between text-caption text-text-muted", children: [_jsx("span", { children: startCaption }), _jsx("span", { children: endCaption })] })] }) }));
}
