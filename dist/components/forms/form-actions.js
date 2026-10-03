import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * FormActions — the action row of a form: buttons right-aligned, optional
 * leading info slot. Never disable Save until everything is valid — submit
 * and focus the first invalid field instead (§10). One primary per screen.
 *
 * Server-component safe.
 */
export function FormActions({ leading, sticky = false, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-center justify-end gap-2", sticky && "sticky bottom-0 fdn-z-sticky border-t border-border bg-surface py-3", className), ...props, children: [leading && _jsx("div", { className: "mr-auto min-w-0 text-body-sm text-text-secondary", children: leading }), children] }));
}
