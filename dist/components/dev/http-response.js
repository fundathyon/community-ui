import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { formatDuration } from "../../lib/format";
/**
 * Status → tone (§20): 2xx success, 3xx info, 4xx warning, 5xx danger.
 * 1xx informational maps to info.
 */
export function statusTone(status) {
    if (status >= 500)
        return "danger";
    if (status >= 400)
        return "warning";
    if (status >= 300)
        return "info";
    if (status >= 200)
        return "success";
    return "info";
}
/** Internal — shared chip recipe for HTTP method/status (not in the barrel). */
export const HTTP_CHIP_CLASS = "inline-flex h-[1.125rem] shrink-0 items-center rounded-sm border px-1.5 font-mono text-caption font-medium leading-none";
/** Internal — tonal chip colors per tone (not in the barrel). */
export const HTTP_CHIP_TONE = {
    info: "bg-info-bg border-info-border text-info",
    success: "bg-success-bg border-success-border text-success",
    warning: "bg-warning-bg border-warning-border text-warning",
    danger: "bg-danger-bg border-danger-border text-danger",
};
/** Internal — "42 ms" under a second, readable units from there (§21). */
export function formatHttpDuration(ms) {
    return ms >= 1000 ? formatDuration(ms) : `${Math.round(ms)} ms`;
}
/**
 * HttpResponse — a response header chip plus body (§20): the status chip
 * follows the effect rule (2xx success · 3xx info · 4xx warning · 5xx danger)
 * instead of a palette of its own. Children typically hold a JsonViewer.
 * Server-component safe.
 */
export function HttpResponse({ status, statusText, duration, className, children, ...props }) {
    const tone = statusTone(status);
    return (_jsxs("div", { className: cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className), ...props, children: [_jsxs("div", { className: cn("flex items-center gap-2 px-3 py-2", children && "border-b border-border"), children: [_jsxs("span", { className: cn(HTTP_CHIP_CLASS, HTTP_CHIP_TONE[tone], "tabular-nums"), children: [status, statusText ? ` ${statusText}` : ""] }), duration !== undefined && (_jsx("span", { className: "font-mono text-caption text-text-muted tabular-nums", children: formatHttpDuration(duration) }))] }), children && _jsx("div", { className: "p-2", children: children })] }));
}
