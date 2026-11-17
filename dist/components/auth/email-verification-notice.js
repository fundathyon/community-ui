"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MailCheck } from "lucide-react";
import { Button } from "../actions/button";
import { Heading } from "../typography/heading";
import { Icon } from "../typography/icon";
import { Text } from "../typography/text";
import { useCooldown } from "./use-cooldown";
/**
 * EmailVerificationNotice — the post-signup "verify your email" screen content
 * (§16 verification). A MailCheck mark, a description with the email
 * highlighted, a resend button with an internal cooldown, and an optional
 * "change email" link. Compose it inside AuthLayout.
 */
export function EmailVerificationNotice({ email, title = "Verify your email", description, onResend, resendLabel = "Resend email", cooldownSeconds = 0, resendCooldownLabel = (seconds) => `Resend in ${seconds}s`, changeEmailSlot, }) {
    const { remaining, active, start } = useCooldown(cooldownSeconds);
    const highlighted = _jsx("span", { className: "font-medium text-text", children: email });
    const body = typeof description === "function"
        ? description(highlighted)
        : description != null
            ? description
            : _jsxs(_Fragment, { children: ["We sent a verification link to ", highlighted, "."] });
    function handleResend() {
        onResend?.();
        start();
    }
    return (_jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [_jsx("span", { className: "grid size-11 place-items-center rounded-full bg-accent-bg text-accent", children: _jsx(Icon, { icon: MailCheck, size: 20 }) }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Heading, { level: 1, visual: "h3", children: title }), _jsx(Text, { tone: "secondary", children: body })] }), onResend != null && (_jsx(Button, { variant: "secondary", size: "lg", onClick: handleResend, disabled: active, className: "w-full", children: active ? resendCooldownLabel(remaining) : resendLabel })), changeEmailSlot != null && _jsx("div", { className: "text-caption text-text-muted", children: changeEmailSlot })] }));
}
