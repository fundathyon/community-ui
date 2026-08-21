"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Checkbox — an option that is SAVED with the form (§10). If toggling it must
 * apply immediately with no Save button, it is a Switch instead. 16px box,
 * accent-solid fill with a white check when ticked; `indeterminate` covers the
 * mixed "parent of a partial group" state.
 *
 * The entire label + description row toggles it — never just the box (§10).
 */
export const Checkbox = forwardRef(function Checkbox({ label, description, className, disabled, indeterminate, ...props }, ref) {
    const labelId = useId();
    const descriptionId = useId();
    return (_jsxs("label", { className: cn("flex w-fit min-w-0 select-none items-start gap-2", disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer", className), children: [_jsx(BaseCheckbox.Root, { ref: ref, disabled: disabled, indeterminate: indeterminate, "aria-labelledby": labelId, "aria-describedby": description ? descriptionId : undefined, className: cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface", "transition-colors duration-[var(--fdn-dur-fast)]", "data-[checked]:border-transparent data-[checked]:bg-accent-solid data-[checked]:text-accent-on-solid", "data-[indeterminate]:border-transparent data-[indeterminate]:bg-accent-solid data-[indeterminate]:text-accent-on-solid", "data-[invalid]:border-danger-border", "fdn-touch-target"), ...props, children: _jsx(BaseCheckbox.Indicator, { className: "flex items-center justify-center", children: _jsx(Icon, { icon: indeterminate ? Minus : Check, size: 12 }) }) }), _jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx("span", { id: labelId, className: "text-label text-text", children: label }), description && (_jsx("span", { id: descriptionId, className: "text-caption text-text-muted", children: description }))] })] }));
});
