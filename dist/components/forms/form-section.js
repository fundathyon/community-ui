import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * FormSection — one titled block of a settings page (§16 Ajustes): title,
 * description, one FormField per line and SAVE PER SECTION — never a single
 * global Save at the bottom of a long page. Long forms are split into
 * sections like this one, warning on leave with unsaved changes (§17).
 *
 * Server-component safe. The danger zone goes last, with a `danger` border
 * and its own confirmation (§16).
 */
export function FormSection({ title, description, actions, className, children, ...props }) {
    return (_jsxs("section", { className: cn("flex min-w-0 flex-col gap-4", className), ...props, children: [_jsxs("header", { className: "flex flex-col gap-1", children: [_jsx("h3", { className: "text-h5 text-text", children: title }), description && _jsx("p", { className: "text-body-sm text-text-secondary", children: description })] }), _jsx("div", { className: "flex min-w-0 flex-col gap-4", children: children }), actions && _jsx("div", { className: "flex items-center justify-end gap-2", children: actions })] }));
}
