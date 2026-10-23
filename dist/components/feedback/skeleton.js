import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * Skeleton — a shape mirror of the REAL content: same number of columns, same
 * row height (§11). Show it only when the shape is known and the wait exceeds
 * 300ms — under that, show nothing (that timing lives in the app/DataTable).
 * Size it with `className` (width/height utilities). Pulses via `.fdn-skeleton`
 * (reduced-motion safe). Announce the busy region with SkeletonGroup.
 */
export function Skeleton({ variant = "rect", lines, className, ...props }) {
    if (variant === "text" && lines && lines > 1) {
        return (_jsx("div", { "aria-hidden": "true", className: cn("flex w-full flex-col gap-2", className), ...props, children: Array.from({ length: lines }, (_, i) => (_jsx("div", { className: cn("fdn-skeleton h-3 rounded-sm", i === lines - 1 ? "w-3/5" : "w-full") }, i))) }));
    }
    return (_jsx("div", { "aria-hidden": "true", className: cn("fdn-skeleton", variant === "text" && "h-3 w-full rounded-sm", variant === "rect" && "rounded-md", variant === "circle" && "aspect-square rounded-full", className), ...props }));
}
/**
 * SkeletonGroup — the busy region around Skeletons: sets `aria-busy` and a
 * polite live region so the load is announced once, not per bone (§11).
 */
export function SkeletonGroup({ label, busy = true, className, children, ...props }) {
    return (_jsxs("div", { "aria-busy": busy || undefined, "aria-live": "polite", className: className, ...props, children: [label && _jsx("span", { className: "sr-only", children: label }), children] }));
}
