"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
const sizeClasses = {
    xs: "h-control-xs px-2 text-body-sm",
    sm: "h-control-sm px-2.5 text-body",
    md: "h-control-md px-2.5 text-body",
    lg: "h-control-lg px-3 text-body",
};
/**
 * Text input. Always place it inside a FormField, which owns the label and
 * messages. Read-only stays selectable and copyable; disabled means the value
 * is not editable AND not relevant to interact with.
 */
export const Input = forwardRef(function Input({ size, leading, trailing, invalid, className, wrapperClassName, disabled, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    return (_jsxs("span", { "data-invalid": invalid || undefined, className: cn("flex min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-surface text-text", "transition-colors duration-[var(--fdn-dur-fast)]", 
        // §C-02: visible ring on the visual box, not only a border color change
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus", "has-[input[data-invalid]]:border-danger-border data-[invalid]:border-danger-border", "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-45", "has-[input[readonly]]:bg-bg-subtle", sizeClasses[resolvedSize], wrapperClassName), children: [leading && _jsx("span", { className: "flex shrink-0 items-center text-text-muted", children: leading }), _jsx(BaseInput, { ref: ref, "aria-invalid": invalid || undefined, disabled: disabled, className: cn("h-full w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed", className), ...props }), trailing && _jsx("span", { className: "flex shrink-0 items-center text-text-muted", children: trailing })] }));
});
