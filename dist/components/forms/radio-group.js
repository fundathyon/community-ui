"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
/**
 * RadioGroup — 2 to 5 mutually exclusive options that benefit from being
 * compared at a glance (§10, §17). Above 5 use Select; searchable or growing
 * lists use Combobox. Arrow keys move the selection (native radio semantics).
 *
 * Compose with `Radio` children; always inside a FormField, which owns the
 * group label and messages.
 */
export const RadioGroup = forwardRef(function RadioGroup({ className, ...props }, ref) {
    return _jsx(BaseRadioGroup, { ref: ref, className: cn("flex min-w-0 flex-col gap-2", className), ...props });
});
/**
 * One option of a RadioGroup. The entire label + description row selects it;
 * the checked dot uses the accent (action), never a state tone (§02).
 */
export const Radio = forwardRef(function Radio({ label, description, className, disabled, ...props }, ref) {
    const labelId = useId();
    const descriptionId = useId();
    return (_jsxs("label", { className: cn("flex w-fit min-w-0 select-none items-start gap-2", disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer", className), children: [_jsx(BaseRadio.Root, { ref: ref, disabled: disabled, "aria-labelledby": labelId, "aria-describedby": description ? descriptionId : undefined, className: cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface", "transition-colors duration-[var(--fdn-dur-fast)]", "data-[checked]:border-accent-solid", "data-[invalid]:border-danger-border", "fdn-touch-target"), ...props, children: _jsx(BaseRadio.Indicator, { className: "flex size-2 rounded-full bg-accent-solid data-[unchecked]:hidden" }) }), _jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx("span", { id: labelId, className: "text-label text-text", children: label }), description && (_jsx("span", { id: descriptionId, className: "text-caption text-text-muted", children: description }))] })] }));
});
