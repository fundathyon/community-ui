"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
const sizeClasses = {
    xs: "px-2 py-1 text-body-sm",
    sm: "px-2.5 py-1.5 text-body",
    md: "px-2.5 py-1.5 text-body",
    lg: "px-3 py-2 text-body",
};
/**
 * Textarea — multi-line text entry, e.g. a revocation reason (§10). Always
 * place it inside a FormField, which owns the label and messages. Read-only
 * stays selectable and copyable.
 *
 * With `maxLength` it renders a live counter ("31 / 280"); the limit is soft —
 * over-limit turns the counter and border to danger instead of eating input.
 */
export const Textarea = forwardRef(function Textarea({ size, maxLength, invalid, rows = 3, className, defaultValue, value, onChange, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    const [uncontrolledLength, setUncontrolledLength] = useState(() => defaultValue != null ? String(defaultValue).length : 0);
    const length = value != null ? String(value).length : uncontrolledLength;
    const over = maxLength != null && length > maxLength;
    const isInvalid = invalid || over || undefined;
    const handleChange = (event) => {
        if (value == null)
            setUncontrolledLength(event.target.value.length);
        onChange?.(event);
    };
    return (_jsxs("span", { className: "flex min-w-0 flex-col gap-1", children: [_jsx(BaseInput, { render: _jsx("textarea", { ref: ref, rows: rows, value: value, defaultValue: defaultValue, onChange: handleChange, ...props }), "aria-invalid": isInvalid, "data-invalid": isInvalid, className: cn("w-full min-w-0 resize-y rounded-md border border-border-strong bg-surface text-text", "transition-colors duration-[var(--fdn-dur-fast)] placeholder:text-text-muted", "disabled:cursor-not-allowed disabled:opacity-45 read-only:bg-bg-subtle", "data-[invalid]:border-danger-border", sizeClasses[resolvedSize], className) }), maxLength != null && (_jsxs("span", { "aria-hidden": true, className: cn("self-end text-caption tabular-nums", over ? "text-danger" : "text-text-muted"), children: [length, " / ", maxLength] }))] }));
});
