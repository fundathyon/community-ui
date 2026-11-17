import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * DangerZone — the destructive-actions block of a resource (§25). It ALWAYS lives
 * at the END of the summary tab, never in a tab of its own that nobody opens. A
 * danger-bordered card holding one or more DangerZoneAction rows.
 *
 * Server-component safe.
 */
export function DangerZone({ title = "Danger zone", className, children, ...props }) {
    return (_jsxs("section", { className: cn("rounded-xl border border-danger-border bg-surface", className), ...props, children: [_jsx("div", { className: "px-4 pt-4 text-h5 text-danger", children: title }), _jsx("div", { className: "flex flex-col divide-y divide-border px-4 pb-2 pt-1", children: children })] }));
}
/**
 * DangerZoneAction — one destructive row: title and its consequence on the left,
 * the confirming control on the right. The description states what breaks, not
 * just what the button does (§25).
 *
 * Server-component safe.
 */
export function DangerZoneAction({ title, description, action, className, ...props }) {
    return (_jsxs("div", { className: cn("flex items-start justify-between gap-4 py-3", className), ...props, children: [_jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-body font-medium text-text", children: title }), _jsx("p", { className: "text-caption text-text-muted", children: description })] }), _jsx("div", { className: "shrink-0", children: action })] }));
}
