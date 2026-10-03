"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircleX } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "../components/actions/button";
import { Skeleton } from "../components/feedback/skeleton";
import { Icon } from "../components/typography/icon";
/**
 * The three non-happy chart states (§22), rendered COMPACT so they fit a strip
 * as small as a sparkline without overflowing. They share the design language of
 * feedback/EmptyState & feedback/ErrorState (tokens, `role`, retry Button) but
 * drop the page-scale padding those carry — a chart body is not a page region.
 *
 * These are internal to the charts entry: ChartFrame and ChartCard both render
 * them, so state behaviour is defined once (anti-duplication).
 */
/** Default copy — English, overridable by the owning chart's props (CONVENTIONS
 * language rule; §22 wording for the no-data case). */
export const DEFAULT_EMPTY_LABEL = "No data in this interval";
export const DEFAULT_ERROR_TITLE = "Couldn't load the chart";
export const DEFAULT_RETRY_LABEL = "Retry";
/** Loading — a Skeleton block the exact height of the chart (§22). The Skeleton
 * is decorative (`aria-hidden`), so a `role="status"` wrapper announces the wait
 * once (the SkeletonGroup pattern), not the bone itself. */
export function ChartLoading({ height, label = "Loading…" }) {
    return (_jsx("div", { role: "status", "aria-busy": "true", "aria-label": label, className: "w-full", style: { height }, children: _jsx(Skeleton, { className: "h-full w-full" }) }));
}
/**
 * No data — a plain muted line, CENTERED in the chart box. Never a flat zero
 * line: that would lie about the metric (§22). Not tabular, not a fake series.
 */
export function ChartEmpty({ height, label = DEFAULT_EMPTY_LABEL, style, }) {
    return (_jsx("div", { className: "flex w-full items-center justify-center px-4 text-center text-caption text-text-muted", style: { minHeight: height, ...style }, children: label }));
}
/**
 * Error — compact, `role="alert"`, always offers the retry exit (§11, §22).
 * The technical detail belongs in the app's ErrorState behind "Copy details";
 * inside a chart body we keep only the human line and the retry.
 */
export function ChartError({ height, title = DEFAULT_ERROR_TITLE, description, retryLabel = DEFAULT_RETRY_LABEL, onRetry, }) {
    return (_jsxs("div", { role: "alert", className: cn("flex w-full flex-col items-center justify-center gap-2 px-4 text-center"), style: { minHeight: height }, children: [_jsx("span", { className: "grid size-8 place-items-center rounded-full bg-danger-bg text-danger", children: _jsx(Icon, { icon: CircleX, size: 16 }) }), _jsx("p", { className: "text-caption text-text-secondary", children: title }), description && _jsx("p", { className: "text-caption text-text-muted", children: description }), onRetry && (_jsx(Button, { variant: "secondary", size: "xs", onClick: onRetry, children: retryLabel }))] }));
}
