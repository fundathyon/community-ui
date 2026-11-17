"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {} from "react";
import { Alert } from "../feedback/alert";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { AuthForm } from "./auth-form";
import { useCooldown } from "./use-cooldown";
/**
 * MagicLinkForm — passwordless sign-in by emailed link. Before sending: an
 * email field + CTA. After sending (`sent`): a success Alert telling the user
 * to check their inbox, plus a resend with an internal cooldown. The
 * confirmation never reveals whether the email is registered (§29 T03).
 */
export function MagicLinkForm({ onSubmit, sent = false, error, loading = false, emailLabel = "Email", emailPlaceholder, submitLabel = "Email me a link", loadingLabel = "Sending…", sentTitle = "Check your email", sentSlot = "If an account exists, we've sent a sign-in link. It expires shortly.", onResend, resendLabel = "Resend link", cooldownSeconds = 0, resendCooldownLabel = (seconds) => `Resend in ${seconds}s`, }) {
    const { remaining, active, start } = useCooldown(cooldownSeconds);
    function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        onSubmit?.({ email: String(data.get("email") ?? "") });
    }
    function handleResend() {
        onResend?.();
        start();
    }
    if (sent) {
        return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(Alert, { tone: "success", title: sentTitle, children: sentSlot }), onResend != null && (_jsx(Button, { variant: "secondary", size: "lg", onClick: handleResend, disabled: active, className: "w-full", children: active ? resendCooldownLabel(remaining) : resendLabel }))] }));
    }
    return (_jsx(AuthForm, { error: error, loading: loading, onSubmit: handleSubmit, submitSlot: _jsx(Button, { type: "submit", variant: "primary", size: "lg", loading: loading, className: "w-full", children: loading ? loadingLabel : submitLabel }), children: _jsx(FormField, { label: emailLabel, children: _jsx(Input, { name: "email", type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, required: true, placeholder: emailPlaceholder }) }) }));
}
