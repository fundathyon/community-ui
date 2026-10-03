"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
/**
 * Switch — applies its effect IMMEDIATELY, no Save button involved (§10). If
 * the change must be saved with the form, it is a Checkbox. The whole
 * label + description row toggles it; checked uses the accent because it is
 * an action, not a state tone (§02).
 *
 * On failure of the immediate operation, revert the switch visually and
 * explain the error in place — never leave it lying (§16).
 */
export const Switch = forwardRef(function Switch({ label, description, className, disabled, ...props }, ref) {
    const labelId = useId();
    const descriptionId = useId();
    return (_jsxs("label", { className: cn("flex min-w-0 select-none items-center justify-between gap-3", disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer", className), children: [_jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx("span", { id: labelId, className: "text-label text-text", children: label }), description && (_jsx("span", { id: descriptionId, className: "text-caption text-text-muted", children: description }))] }), _jsx(BaseSwitch.Root, { ref: ref, disabled: disabled, "aria-labelledby": labelId, "aria-describedby": description ? descriptionId : undefined, className: cn("flex h-4 w-7 shrink-0 items-center rounded-full bg-border-strong p-0.5", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "data-[checked]:bg-accent-solid", "fdn-touch-target"), ...props, children: _jsx(BaseSwitch.Thumb, { className: cn("size-3 rounded-full bg-surface shadow-xs", "transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "data-[checked]:translate-x-3") }) })] }));
});
