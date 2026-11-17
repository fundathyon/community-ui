import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * SettingsRow — one settings entry (§25): label and description on the left, the
 * control on the right, separated from its neighbours by a hairline. Switches
 * apply instantly; the ones that change org-wide security defer to a SaveBar
 * instead of a page-level "Save".
 *
 * Server-component safe.
 */
export function SettingsRow({ label, description, control, htmlFor, className, ...props }) {
    const LabelTag = htmlFor ? "label" : "span";
    return (_jsxs("div", { className: cn("flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0", className), ...props, children: [_jsxs("div", { className: "min-w-0", children: [_jsx(LabelTag, { htmlFor: htmlFor, className: "text-body font-medium text-text", children: label }), description ? _jsx("p", { className: "mt-0.5 text-caption text-text-muted", children: description }) : null] }), _jsx("div", { className: "shrink-0", children: control })] }));
}
