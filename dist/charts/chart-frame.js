"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Button } from "../components/actions/button";
import { ChartEmpty, ChartError, ChartLoading } from "./chart-states";
/**
 * ChartFrame — the shared shell every chart renders into, so the four §22 states
 * (loading · sin datos · parcial · error), the `<figure>` semantics, the trend
 * summary and the hidden data-table alternative behave identically everywhere.
 * Internal to the charts entry; individual charts own their data → visuals.
 */
export function ChartFrame({ label, summary, height, state = "ready", emptyLabel, errorTitle, errorDescription, retryLabel, onRetry, partialNote, table, viewDataLabel, onViewData, autoHeight = false, footer, children, className, }) {
    const ariaLabel = summary ? `${label}. ${summary}` : label;
    return (_jsxs("figure", { "aria-label": ariaLabel, className: cn("flex flex-col gap-1.5", className), children: [summary && _jsx("figcaption", { className: "sr-only", children: summary }), state === "ready" && partialNote && (_jsx("p", { className: "text-caption text-warning", role: "status", children: partialNote })), _jsxs("div", { className: "relative w-full", style: autoHeight && state === "ready" ? undefined : { height }, children: [state === "loading" && _jsx(ChartLoading, { height: height }), state === "empty" && _jsx(ChartEmpty, { height: height, label: emptyLabel }), state === "error" && (_jsx(ChartError, { height: height, title: errorTitle, description: errorDescription, retryLabel: retryLabel, onRetry: onRetry })), state === "ready" && children] }), state === "ready" && footer, state === "ready" && table && (_jsxs("table", { className: "sr-only", children: [_jsx("caption", { children: table.caption ?? label }), _jsx("thead", { children: _jsx("tr", { children: table.columns.map((c) => (_jsx("th", { scope: "col", children: c }, c))) }) }), _jsx("tbody", { children: table.rows.map((row, ri) => (_jsx("tr", { children: row.map((cell, ci) => ci === 0 ? (_jsx("th", { scope: "row", children: cell }, ci)) : (_jsx("td", { children: cell }, ci))) }, ri))) })] })), state === "ready" && viewDataLabel && onViewData && (_jsx("div", { className: "flex justify-end", children: _jsx(Button, { variant: "ghost", size: "xs", onClick: onViewData, children: viewDataLabel }) }))] }));
}
