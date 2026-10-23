import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inbox, SearchX } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * EmptyState (§11) — three sentences maximum and ALWAYS one exit. "First
 * time" gets a primary action; "no search results" gets "clear filters" and is
 * a different state (`kind="no-results"`), never this component's default.
 * Errors are not empty states — use ErrorState.
 */
export function EmptyState({ kind = "empty", icon, title, description, action, secondaryAction, className, ...props }) {
    return (_jsxs("div", { "data-kind": kind, className: cn("flex flex-col items-center justify-center px-6 py-12 text-center", className), ...props, children: [_jsx("span", { className: "mb-3 grid size-10 place-items-center rounded-full bg-surface-hover text-text-muted", children: _jsx(Icon, { icon: icon ?? (kind === "no-results" ? SearchX : Inbox), size: 20 }) }), _jsx("h3", { className: "text-h4 text-text", children: title }), description && (_jsx("p", { className: "mt-1 max-w-96 text-body text-text-secondary", children: description })), (action || secondaryAction) && (_jsxs("div", { className: "mt-4 flex items-center gap-2", children: [action, secondaryAction] }))] }));
}
