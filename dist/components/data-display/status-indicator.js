"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { STATUS } from "../../lib/status";
import { Spinner } from "../feedback/spinner";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
const TONE_TEXT = {
    neutral: "text-text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
const TONE_DOT = {
    neutral: "bg-text-muted",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};
/**
 * StatusIndicator — the two non-badge treatments of the state taxonomy (§19):
 * `dot` (a tonal dot plus text, for dense lists) and `icon` (the state's icon
 * alone, wrapped in a Tooltip, for narrow columns). Tone and icon are the SAME
 * as the badge in every treatment — a state never changes color between them.
 * For a full labelled badge in tables and headers use StatusBadge.
 */
export function StatusIndicator({ status, treatment, label, className }) {
    const spec = STATUS[status];
    const tone = spec.treatment === "tonal" ? spec.tone : "neutral";
    const copy = label ?? spec.label;
    if (treatment === "icon") {
        // Icon-only MUST carry an accessible name (§C-03) — the tooltip mirrors it visibly.
        const accessible = typeof copy === "string" ? copy : spec.label;
        return (_jsx(Tooltip, { content: copy, children: _jsx("span", { tabIndex: 0, role: "img", "aria-label": accessible, "data-status": status, className: cn("inline-flex items-center justify-center rounded-sm", 
                // No `outline-none`: it would share `--tw-outline-style` with the
                // rule below and pin it to "none" even when focus-visible matches
                // (Tailwind v4 outline utilities compose via that one custom
                // property) — `@layer utilities` already beats the base.css default.
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", TONE_TEXT[tone], className), children: spec.spinner ? (_jsx(Spinner, { size: 14, label: null })) : spec.icon ? (_jsx(Icon, { icon: spec.icon, size: 14 })) : (_jsx("span", { "aria-hidden": true, className: cn("size-2 rounded-full", TONE_DOT[tone]) })) }) }));
    }
    return (_jsxs("span", { "data-status": status, className: cn("inline-flex items-center gap-1.5 text-body-sm", TONE_TEXT[tone], className), children: [spec.spinner ? (_jsx(Spinner, { size: 12, label: null })) : (_jsx("span", { "aria-hidden": true, className: cn("size-2 shrink-0 rounded-full", TONE_DOT[tone]) })), _jsx("span", { children: copy })] }));
}
