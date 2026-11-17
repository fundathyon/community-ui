import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
const toneText = {
    neutral: "text-text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
const tonalClasses = {
    neutral: "bg-surface-hover border-border text-text-secondary",
    info: "bg-info-bg border-info-border text-info",
    success: "bg-success-bg border-success-border text-success",
    warning: "bg-warning-bg border-warning-border text-warning",
    danger: "bg-danger-bg border-danger-border text-danger",
};
const solidClasses = {
    neutral: "bg-border-strong text-text border-transparent",
    info: "bg-info-solid text-on-solid border-transparent",
    success: "bg-success-solid text-on-solid border-transparent",
    warning: "bg-warning-solid text-on-solid border-transparent",
    danger: "bg-danger-solid text-on-solid border-transparent",
};
const dotTone = {
    neutral: "bg-text-muted",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};
/**
 * Badge — a state the SYSTEM decides. Not clickable: if it were, it would be a
 * Tag or a filter (§09). Unifies the v1 `.pill` + `.statusBadge`.
 *
 * For the sixteen canonical resource states use StatusBadge, which fixes
 * tone/icon/treatment per state (§19).
 */
export function Badge({ variant = "tonal", tone = "neutral", dot = false, icon, dashed = false, className, children, ...props }) {
    return (_jsxs("span", { className: cn("inline-flex h-[1.125rem] shrink-0 items-center gap-1 rounded-full border px-2 text-caption font-medium leading-none", variant === "tonal" && tonalClasses[tone], variant === "outline" && cn("border-border-strong bg-transparent", toneText[tone]), variant === "solid" && solidClasses[tone], variant === "counter" &&
            "min-w-[1.125rem] justify-center border-transparent bg-surface-hover px-1.5 tabular-nums text-text-secondary", dashed && "border-dashed", className), ...props, children: [dot && _jsx("span", { "aria-hidden": true, className: cn("size-1.5 rounded-full", dotTone[tone]) }), icon && _jsx(Icon, { icon: icon, size: 12 }), children] }));
}
