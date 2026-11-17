"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/** Fixed icon per tone across the whole suite (§07) — never swapped locally. */
export const TONE_ICON = {
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    danger: CircleX,
};
export const TONE_TEXT = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
export const TONE_WASH = {
    info: "bg-info-bg border-info-border",
    success: "bg-success-bg border-success-border",
    warning: "bg-warning-bg border-warning-border",
    danger: "bg-danger-bg border-danger-border",
};
/**
 * Alert — persistent and contextual (§11): it lives inside the page it refers
 * to and describes a state that stays true even when not looked at. Feedback
 * sits as close to its cause as possible — session-wide messages go in Banner,
 * confirmations of what the user just did go in Toast (§17).
 *
 * `danger` announces with `role="alert"` and cannot be dismissed; other tones
 * are polite (`role="status"`).
 */
export function Alert({ tone = "info", title, children, action, icon, onDismiss, dismissLabel = "Dismiss", className, ...props }) {
    const critical = tone === "danger";
    return (_jsxs("div", { role: critical ? "alert" : "status", "data-tone": tone, className: cn("flex gap-2 rounded-lg border p-3", TONE_WASH[tone], className), ...props, children: [_jsx(Icon, { icon: icon ?? TONE_ICON[tone], size: 16, className: cn("mt-0.5", TONE_TEXT[tone]) }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [_jsx("div", { className: "text-h5 text-text", children: title }), children && _jsx("div", { className: "text-body-sm text-text-secondary", children: children }), action && _jsx("div", { className: "pt-1.5", children: action })] }), !critical && onDismiss && (_jsx("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, className: cn("-mr-1 -mt-1 grid size-6 shrink-0 place-items-center self-start rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover hover:text-text", "fdn-touch-target"), children: _jsx(Icon, { icon: X, size: 14 }) }))] }));
}
