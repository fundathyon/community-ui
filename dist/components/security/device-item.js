"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Monitor, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";
/**
 * DeviceItem — a sign-in from a device pending review (§23). When unrecognized
 * it carries a WARNING treatment (warning-bg + warning-border, never danger:
 * an unfamiliar device isn't proof of an attack) and offers two actions —
 * "Not me" (destructive-subtle) and "Recognize" (secondary). A recognized
 * device renders as a plain bordered row.
 */
export function DeviceItem({ device, browser, ip, location, unknownLocationLabel = "Unknown location", time, locale, recognized = false, onReject, rejectLabel = "Not me", onRecognize, recognizeLabel = "Recognize", className, ...props }) {
    const showActions = !recognized && (onReject != null || onRecognize != null);
    return (_jsxs("div", { className: cn("flex flex-col gap-2 rounded-lg border p-3", recognized ? "border-border bg-surface" : "border-warning-border bg-warning-bg", className), ...props, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Icon, { icon: recognized ? Monitor : ShieldAlert, size: 20, className: cn("mt-0.5 shrink-0", recognized ? "text-text-muted" : "text-warning") }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [_jsxs("div", { className: "text-label text-text", children: [device, browser != null && (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, children: " \u00B7 " }), browser] }))] }), _jsxs("div", { className: "flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted", children: [_jsx("span", { className: "font-mono", children: ip }), _jsx("span", { "aria-hidden": true, children: "\u00B7" }), _jsx("span", { className: "font-mono", children: location ?? unknownLocationLabel }), _jsx("span", { "aria-hidden": true, children: "\u00B7" }), _jsx(RelativeTime, { value: time, locale: locale })] })] })] }), showActions && (_jsxs("div", { className: "flex items-center gap-2 pl-8", children: [onReject != null && (_jsx(Button, { variant: "destructive-subtle", size: "sm", onClick: onReject, children: rejectLabel })), onRecognize != null && (_jsx(Button, { variant: "secondary", size: "sm", onClick: onRecognize, children: recognizeLabel }))] }))] }));
}
/** DeviceList — stacks DeviceItems (each is a self-contained boxed row). */
export function DeviceList({ children, className, ...props }) {
    return (_jsx("div", { className: cn("flex flex-col gap-2", className), ...props, children: children }));
}
