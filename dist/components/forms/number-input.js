"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
const sizeClasses = {
    xs: "h-control-xs text-body-sm",
    sm: "h-control-sm text-body",
    md: "h-control-md text-body",
    lg: "h-control-lg text-body",
};
/**
 * NumberInput — numeric entry with steppers (§10). Keyboard arrows step,
 * Shift+arrow uses the large step, Home/End jump to min/max (Base UI native);
 * `min`/`max` clamp on stepping and blur. The value renders in `tabular-nums`
 * so columns of numbers stay aligned (§03).
 *
 * Always inside a FormField. For a bounded range better explored by drag, use
 * Slider — which still shows this editable number next to it (§10).
 */
export const NumberInput = forwardRef(function NumberInput({ size, invalid, decrementLabel = "Decrease", incrementLabel = "Increase", placeholder, className, disabled, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    const stepperClasses = cn("flex aspect-square h-full shrink-0 items-center justify-center text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text", "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent", "fdn-touch-target");
    return (_jsx(NumberField.Root, { disabled: disabled, ...props, children: _jsxs(NumberField.Group, { "data-invalid": invalid || undefined, className: cn("flex w-full min-w-0 items-stretch overflow-hidden rounded-md border border-border-strong bg-surface text-text", "transition-colors duration-[var(--fdn-dur-fast)]", "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus", "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-45", "has-[input[readonly]]:bg-bg-subtle", "data-[invalid]:border-danger-border has-[input[data-invalid]]:border-danger-border", sizeClasses[resolvedSize], className), children: [_jsx(NumberField.Decrement, { "aria-label": decrementLabel, className: cn(stepperClasses, "border-r border-border-strong"), children: _jsx(Icon, { icon: Minus, size: 14 }) }), _jsx(NumberField.Input, { ref: ref, placeholder: placeholder, "aria-invalid": invalid || undefined, "data-invalid": invalid || undefined, className: cn("h-full w-full min-w-0 flex-1 bg-transparent px-2 text-center tabular-nums outline-none", "placeholder:text-text-muted disabled:cursor-not-allowed") }), _jsx(NumberField.Increment, { "aria-label": incrementLabel, className: cn(stepperClasses, "border-l border-border-strong"), children: _jsx(Icon, { icon: Plus, size: 14 }) })] }) }));
});
