"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
function defaultCountLabel(count) {
    return count === 1 ? "1 unsaved change" : `${count} unsaved changes`;
}
/**
 * SaveBar — the deferred-save affordance for a settings section (§25). It appears
 * attached to the end of the section with the count of unsaved changes; there is
 * NEVER a global "Save" at the bottom of a long settings page. Sticky within its
 * container, on a raised surface with a border and a soft shadow.
 */
export function SaveBar({ count = 0, countLabel = defaultCountLabel, onDiscard, onSave, discardLabel = "Discard", saveLabel = "Save", saving = false, className, ...props }) {
    return (_jsxs("div", { role: "region", "aria-label": "Unsaved changes", className: cn("sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-raised px-4 py-3 shadow-sm", className), ...props, children: [_jsx("span", { className: "text-body-sm text-text-secondary", children: countLabel(count) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", onClick: onDiscard, disabled: saving, children: discardLabel }), _jsx(Button, { variant: "primary", onClick: onSave, loading: saving, children: saveLabel })] })] }));
}
