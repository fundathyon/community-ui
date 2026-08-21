"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardBody, CardHeader } from "../components/layout/card";
import { ChartEmpty, ChartError, ChartLoading } from "./chart-states";
import { CHART_HEIGHT } from "./types";
/**
 * ChartCard — a Card preset for a dashboard chart (§15 + §22): header (title +
 * toolbar slot) over a body, with the four states handled in ONE place. Pass a
 * chart as `children` and let it self-manage, or drive the whole card with
 * `state`/`onRetry` for a shared skeleton/error. Composes layout/Card (which is
 * borderless-elevation by design — a card floats via border, not shadow, §15).
 *
 * When to use: the standard framed dashboard chart. For a bare chart with no card
 * chrome, render the chart directly.
 */
export function ChartCard({ title, toolbar, children, state = "ready", onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, height = CHART_HEIGHT, className, }) {
    return (_jsxs(Card, { className: className, children: [_jsx(CardHeader, { actions: toolbar, children: title }), _jsxs(CardBody, { children: [state === "loading" && _jsx(ChartLoading, { height: height }), state === "empty" && _jsx(ChartEmpty, { height: height, label: emptyLabel }), state === "error" && (_jsx(ChartError, { height: height, title: errorTitle, description: errorDescription, retryLabel: retryLabel, onRetry: onRetry })), state === "ready" && children] })] }));
}
