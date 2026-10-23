"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { OTPField } from "@base-ui/react/otp-field";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
const sizeClasses = {
    xs: "size-control-xs text-body-sm",
    sm: "size-control-sm text-body",
    md: "size-control-md text-body",
    lg: "size-control-lg text-body",
};
/**
 * CodeInput — segmented code entry (§10, §23). It NEVER blocks paste (a full
 * code pasted anywhere distributes across the slots) nor the SMS/keychain
 * autofill (`autoComplete="one-time-code"`); Backspace moves back a slot.
 * Typing advances automatically and `onComplete` fires when full.
 *
 * For the two-factor / verification preset (numeric, 3+3 grouping) use
 * OTPInput.
 */
export const CodeInput = forwardRef(function CodeInput({ length = 6, groups, type = "numeric", size, invalid, onValueChange, onComplete, className, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    const resolvedGroups = groups && groups.length > 0 && groups.reduce((a, b) => a + b, 0) === length ? groups : [length];
    let slotIndex = 0;
    return (_jsx(OTPField.Root, { ref: ref, length: length, validationType: type === "alphanumeric" ? "alphanumeric" : "numeric", onValueChange: onValueChange ? (value) => onValueChange(value) : undefined, onValueComplete: onComplete ? (value) => onComplete(value) : undefined, className: cn("flex items-center gap-3", className), ...props, children: resolvedGroups.map((count, groupIdx) => (_jsx("div", { className: "flex items-center gap-1.5", children: Array.from({ length: count }, () => {
                const key = slotIndex++;
                return (_jsx(OTPField.Input, { "aria-invalid": invalid || undefined, "data-invalid": invalid || undefined, className: cn("block rounded-md border border-border-strong bg-surface text-center text-text", "transition-colors duration-[var(--fdn-dur-fast)] placeholder:text-text-muted", "disabled:cursor-not-allowed disabled:opacity-45", "data-[invalid]:border-danger-border", type === "numeric" && "tabular-nums", sizeClasses[resolvedSize]) }, key));
            }) }, groupIdx))) }));
});
/**
 * OTPInput — the verification-code preset of CodeInput (§23): numeric, SMS
 * autofill via `one-time-code`, and 3+3 optical grouping by default. Paste and
 * autocomplete are never blocked; after repeated failures show a `Locked`
 * state with an explicit deadline — never an "unknown error" (§23).
 */
export const OTPInput = forwardRef(function OTPInput({ length = 6, groups, ...props }, ref) {
    const defaultGroups = length % 2 === 0 && length >= 6 ? [length / 2, length / 2] : undefined;
    return _jsx(CodeInput, { ref: ref, type: "numeric", length: length, groups: groups ?? defaultGroups, ...props });
});
