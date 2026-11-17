"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HelpCircle, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";
const DEVICE_ICON = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet,
    unknown: HelpCircle,
};
/**
 * SessionItem — one active session (§23). Device on top, IP + location + last
 * activity below; IP and location are mono because they're verifiable. The
 * current session shows a badge and NO revoke action — you can't sign yourself
 * out of the list you're reading it from (§23).
 */
export function SessionItem({ device, current = false, currentLabel = "This session", ip, location, lastActive, locale, deviceType = "unknown", onRevoke, revokeLabel = "Revoke", className, ...props }) {
    return (_jsxs("div", { className: cn("flex items-center gap-3 py-3", className), ...props, children: [_jsx(Icon, { icon: DEVICE_ICON[deviceType], size: 20, className: "shrink-0 text-text-muted" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [_jsxs("div", { className: "flex items-center gap-2 text-label text-text", children: [_jsx("span", { className: "truncate", children: device }), current && _jsx(Badge, { tone: "neutral", children: currentLabel })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted", children: [_jsx("span", { className: "font-mono", children: ip }), location != null && (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, children: "\u00B7" }), _jsx("span", { className: "font-mono", children: location })] })), _jsx("span", { "aria-hidden": true, children: "\u00B7" }), _jsx(RelativeTime, { value: lastActive, locale: locale })] })] }), !current && onRevoke != null && (_jsx(Button, { variant: "destructive-subtle", size: "sm", onClick: onRevoke, className: "shrink-0", children: revokeLabel }))] }));
}
/** SessionList — stacks SessionItems with divider rules between them (§23). */
export function SessionList({ children, className, ...props }) {
    return (_jsx("div", { className: cn("divide-y divide-border", className), ...props, children: children }));
}
