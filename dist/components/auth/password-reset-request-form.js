"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {} from "react";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { Text } from "../typography/text";
import { AuthForm } from "./auth-form";
/**
 * PasswordResetRequestForm — email only, one CTA (§16, §29 T03). The request
 * itself must never confirm which emails are registered; keep that in mind for
 * the confirmation you render afterwards ("If an account exists…").
 */
export function PasswordResetRequestForm({ onSubmit, error, loading = false, emailLabel = "Email", emailPlaceholder, submitLabel = "Send reset link", loadingLabel = "Sending…", noteSlot, }) {
    function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        onSubmit?.({ email: String(data.get("email") ?? "") });
    }
    return (_jsxs(AuthForm, { error: error, loading: loading, onSubmit: handleSubmit, submitSlot: _jsx(Button, { type: "submit", variant: "primary", size: "lg", loading: loading, className: "w-full", children: loading ? loadingLabel : submitLabel }), children: [noteSlot != null && (_jsx(Text, { tone: "secondary", className: "-mt-1", children: noteSlot })), _jsx(FormField, { label: emailLabel, children: _jsx(Input, { name: "email", type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, required: true, placeholder: emailPlaceholder }) })] }));
}
