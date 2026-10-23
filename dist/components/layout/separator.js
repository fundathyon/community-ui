"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "../../lib/cn";
/**
 * Separator — a divider accessible to screen readers (`role="separator"`).
 * Plain 1px line, or a labeled variant with a centered caption ("or",
 * "Continue with SSO"). Structure comes from borders, not shadows (§05).
 */
export function Separator({ orientation = "horizontal", label, className, ...props }) {
    if (label != null && orientation === "horizontal") {
        return (_jsxs(BaseSeparator, { orientation: orientation, className: cn("flex w-full items-center gap-3", className), ...props, children: [_jsx("span", { "aria-hidden": true, className: "h-px flex-1 bg-border" }), _jsx("span", { className: "text-caption text-text-muted", children: label }), _jsx("span", { "aria-hidden": true, className: "h-px flex-1 bg-border" })] }));
    }
    return (_jsx(BaseSeparator, { orientation: orientation, className: cn(orientation === "horizontal" ? "h-px w-full bg-border" : "w-px self-stretch bg-border", className), ...props }));
}
