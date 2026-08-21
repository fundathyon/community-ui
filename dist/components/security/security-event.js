import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Cog } from "lucide-react";
import { cn } from "../../lib/cn";
import { CopyButton } from "../dev/copy-button";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";
const ACCENT_BORDER = {
    neutral: "border-border",
    info: "border-info-border",
    success: "border-success-border",
    warning: "border-warning-border",
    danger: "border-danger-border",
};
function TechDatum({ prefix, value, copyLabel }) {
    return (_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsxs("span", { children: [prefix != null && _jsxs("span", { className: "text-text-disabled", children: [prefix, " "] }), value] }), _jsx(CopyButton, { value: value, size: 12, label: copyLabel })] }));
}
/**
 * SecurityEvent — one row of the actor · past-tense verb · resource · detail
 * grammar (§24), specialized for security contexts. The event reads in one
 * line; the technical metadata (IP, trace id, request id, user agent, event
 * name) sits mono and muted on a second line, each value copyable. A `system`
 * actor gets an icon instead of an avatar (§24).
 *
 * `AuditEvent` is the same component under the audit-log name. This is a
 * deliberately minimal, standalone row; data-display's ActivityFeed is parallel
 * and may unify with it later.
 */
export function SecurityEvent({ actor, action, target, timestamp, locale, tone, technical, systemLabel = "system", copyLabel = "Copy", className, ...props }) {
    const actorName = actor.system ? systemLabel : (actor.name ?? actor.email ?? "");
    const initial = (actor.name ?? actor.email ?? "?").trim().charAt(0).toUpperCase() || "?";
    const techEntries = [];
    if (technical != null) {
        if (technical.ip != null)
            techEntries.push(_jsx(TechDatum, { prefix: "ip", value: technical.ip, copyLabel: copyLabel }, "ip"));
        if (technical.traceId != null)
            techEntries.push(_jsx(TechDatum, { prefix: "trace", value: technical.traceId, copyLabel: copyLabel }, "trace"));
        if (technical.requestId != null)
            techEntries.push(_jsx(TechDatum, { prefix: "req", value: technical.requestId, copyLabel: copyLabel }, "req"));
        if (technical.userAgent != null)
            techEntries.push(_jsx(TechDatum, { prefix: "ua", value: technical.userAgent, copyLabel: copyLabel }, "ua"));
        if (technical.event != null)
            techEntries.push(_jsx(TechDatum, { value: technical.event, copyLabel: copyLabel }, "event"));
    }
    return (_jsxs("div", { className: cn("flex gap-3 py-3", tone != null && cn("border-l-2 pl-3", ACCENT_BORDER[tone]), className), ...props, children: [_jsx("span", { "aria-hidden": true, className: "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-hover text-caption font-medium text-text-secondary", children: actor.system ? _jsx(Icon, { icon: Cog, size: 14, className: "text-text-muted" }) : initial }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [_jsxs("div", { className: "text-body-sm text-text-secondary", children: [_jsx("span", { className: "font-medium text-text", children: actorName }), " ", action, target != null && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "font-medium text-text", children: target })] })] }), _jsx(RelativeTime, { value: timestamp, locale: locale, className: "text-caption text-text-muted" }), techEntries.length > 0 && (_jsx("div", { className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-text-muted", children: techEntries }))] })] }));
}
/** AuditEvent — the audit-log name for SecurityEvent (§24). Same component. */
export const AuditEvent = SecurityEvent;
