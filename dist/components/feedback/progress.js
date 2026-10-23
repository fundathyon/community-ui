"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "../../lib/cn";
const toneFill = {
    info: "bg-info-solid",
    success: "bg-success-solid",
    warning: "bg-warning-solid",
    danger: "bg-danger-solid",
};
const toneStroke = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
/**
 * Progress (§11) — HARD RULE: every determinate bar carries its value as
 * visible text; the bar alone is not accessible. Indeterminate (`value={null}`)
 * only when the total is unknown — and >2s waits must say WHAT is happening
 * via `label` (§17). `aria-valuenow`/`aria-valuetext` come from Base UI.
 */
export function Progress({ value, max = 100, min = 0, label, valueText, tone, variant = "bar", size = 16, format, className, ...props }) {
    const determinate = value !== null;
    const valueChildren = valueText ? () => valueText : undefined;
    if (variant === "circular") {
        const radius = 6.5; // 16-grid circle, 1.5px stroke — same geometry as Spinner
        const circumference = 2 * Math.PI * radius;
        const fraction = determinate ? Math.min(Math.max((value - min) / (max - min), 0), 1) : 0.25;
        return (_jsxs(BaseProgress.Root, { value: value, min: min, max: max, format: format, className: cn("inline-flex items-center gap-1.5", className), ...props, children: [_jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: cn("-rotate-90", tone ? toneStroke[tone] : "text-accent", !determinate && "fdn-spin"), children: [_jsx("circle", { cx: "8", cy: "8", r: radius, stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "1.5" }), _jsx("circle", { cx: "8", cy: "8", r: radius, stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: circumference * (1 - fraction) })] }), determinate && (_jsx(BaseProgress.Value, { className: "text-caption tabular-nums text-text-secondary", children: valueChildren }))] }));
    }
    return (_jsxs(BaseProgress.Root, { value: value, min: min, max: max, format: format, className: cn("flex w-full flex-col gap-1", className), ...props, children: [(label || determinate) && (_jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [label ? (_jsx(BaseProgress.Label, { className: "min-w-0 truncate text-label text-text-secondary", children: label })) : (_jsx("span", { "aria-hidden": true })), determinate && (_jsx(BaseProgress.Value, { className: "text-label tabular-nums text-text-secondary", children: valueChildren }))] })), _jsx(BaseProgress.Track, { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-hover", children: _jsx(BaseProgress.Indicator, { className: cn("h-full rounded-full", tone ? toneFill[tone] : "bg-accent-solid", determinate
                        ? "transition-[width] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]"
                        : "fdn-indeterminate w-1/3") }) })] }));
}
