"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert } from "../feedback/alert";
import { Button } from "../actions/button";
import { OTPInput } from "../forms/code-input";
import { Heading } from "../typography/heading";
import { Text } from "../typography/text";
import { useCooldown } from "./use-cooldown";
/**
 * OTPForm — two-step verification (§23). A grouped 6-digit OTP field
 * (3+3 optical grouping, SMS autofill, paste never blocked) that auto-submits
 * on completion. Resend has an internal cooldown; after repeated failures the
 * app passes `locked` and we render a warning Alert with the deadline — never
 * an "unknown error".
 *
 * `TwoFactorForm` is the same component under the name used on 2FA screens.
 */
export function OTPForm({ onSubmit, length = 6, title, descriptionSlot, error, locked, onResend, resendLabel = "Resend code", cooldownSeconds = 0, resendCooldownLabel = (seconds) => `Resend in ${seconds}s`, alternativeSlot, codeLabel = "Verification code", }) {
    const { remaining, active, start } = useCooldown(cooldownSeconds);
    const isLocked = locked != null;
    function handleResend() {
        onResend?.();
        start();
    }
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [title != null && (_jsx(Heading, { level: 1, visual: "h3", className: "text-center", children: title })), descriptionSlot != null && (_jsx(Text, { tone: "secondary", className: "text-center", children: descriptionSlot })), isLocked ? (_jsx(Alert, { tone: "warning", title: locked.message })) : (error != null && _jsx(Alert, { tone: "danger", title: error })), _jsx("div", { className: "flex justify-center", children: _jsx(OTPInput, { length: length, "aria-label": codeLabel, disabled: isLocked, invalid: error != null || undefined, onComplete: (code) => onSubmit?.(code) }) }), (onResend != null || alternativeSlot != null) && (_jsxs("div", { className: "flex items-center justify-center gap-4", children: [onResend != null && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleResend, disabled: active || isLocked, children: active ? resendCooldownLabel(remaining) : resendLabel })), alternativeSlot] }))] }));
}
/** TwoFactorForm — the 2FA-screen alias of OTPForm (§23). Same component,
 * named for the screen that hosts it. */
export const TwoFactorForm = OTPForm;
