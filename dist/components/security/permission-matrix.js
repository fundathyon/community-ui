import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * PermissionMatrix — the scopes-and-roles grid (§23). A check or an em dash, NO
 * background colors, so it reads identically in monochrome and to a screen
 * reader: every cell announces "{permission} · {role}: allowed / not allowed".
 * The first column is sticky for wide role sets; the table scrolls inside its
 * own container. Server-component safe.
 */
export function PermissionMatrix({ permissions, roles, granted, labels = { allowed: "allowed", notAllowed: "not allowed" }, cornerLabel, caption, className, ...props }) {
    return (_jsx("div", { className: "w-full overflow-x-auto", children: _jsxs("table", { className: cn("w-full border-collapse text-body-sm", className), ...props, children: [caption != null && _jsx("caption", { className: "sr-only", children: caption }), _jsx("thead", { children: _jsxs("tr", { className: "border-b border-border", children: [_jsx("th", { scope: "col", className: "sticky left-0 z-10 bg-surface px-3 py-2 text-left text-label font-medium text-text-secondary", children: cornerLabel }), roles.map((role) => (_jsx("th", { scope: "col", className: "px-3 py-2 text-center text-label font-medium text-text-secondary", children: role.label }, role.id)))] }) }), _jsx("tbody", { children: permissions.map((permission) => (_jsxs("tr", { className: "border-b border-border last:border-b-0", children: [_jsx("th", { scope: "row", className: "sticky left-0 z-10 bg-surface px-3 py-2 text-left text-body-sm font-normal text-text", children: permission.label }), roles.map((role) => {
                                const ok = granted(permission.id, role.id);
                                const announce = `${textOf(permission.label)} · ${textOf(role.label)}: ${ok ? labels.allowed : labels.notAllowed}`;
                                return (_jsx("td", { className: "px-3 py-2 text-center", "aria-label": announce, children: ok ? (_jsx(Icon, { icon: Check, size: 16, className: "mx-auto text-success" })) : (_jsx("span", { "aria-hidden": true, className: "text-text-muted", children: "\u2014" })) }, role.id));
                            })] }, permission.id))) })] }) }));
}
/** Best-effort plain text of a label node for the aria announcement. */
function textOf(node) {
    if (node == null || typeof node === "boolean")
        return "";
    if (typeof node === "string" || typeof node === "number")
        return String(node);
    if (Array.isArray(node))
        return node.map(textOf).join("");
    if (typeof node === "object" && "props" in node) {
        const props = node.props;
        return props != null ? textOf(props.children) : "";
    }
    return "";
}
