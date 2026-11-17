"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { TONE_ICON, TONE_TEXT, TONE_WASH } from "./alert";
/**
 * Banner — for what affects the WHOLE account or session (§11): plan expiry,
 * global degradation, maintenance. It sticks directly under the header,
 * full-width, no rounding — and there is ONLY ONE at a time. Anything scoped
 * to a page belongs in an Alert; confirmations belong in a Toast (§17).
 */
export function Banner({ tone = "info", children, action, onDismiss, icon, dismissLabel = "Dismiss", className, ...props }) {
    return (_jsxs("div", { role: tone === "danger" ? "alert" : "status", "data-tone": tone, className: cn("flex w-full items-center gap-2 border-b px-4 py-2 text-body-sm text-text", TONE_WASH[tone], 
        // the wash provides the surface; only the bottom border separates it
        "border-x-0 border-t-0", className), ...props, children: [_jsx(Icon, { icon: icon ?? TONE_ICON[tone], size: 14, className: TONE_TEXT[tone] }), _jsx("div", { className: "min-w-0 flex-1 truncate", children: children }), action && _jsx("div", { className: "shrink-0", children: action }), onDismiss && (_jsx("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, className: cn("grid size-6 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover hover:text-text", "fdn-touch-target"), children: _jsx(Icon, { icon: X, size: 14 }) }))] }));
}
