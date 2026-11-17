"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../actions/button";
import { Checkbox } from "../forms/checkbox";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { PasswordInput } from "../forms/password-input";
import { AuthForm } from "./auth-form";
/**
 * LoginForm — email + password, one clear CTA (§16). Composes AuthForm with two
 * FormFields; emits the entered values to `onSubmit`. Proper autofill is wired:
 * `autocomplete="email"` / `"current-password"`, and the email never
 * autocapitalizes.
 *
 * The error copy must never reveal whether the email exists (§16) — pass the
 * same generic message for a wrong password and an unknown account.
 */
export function LoginForm({ onSubmit, error, loading = false, emailLabel = "Email", passwordLabel = "Password", emailPlaceholder, submitLabel = "Sign in", loadingLabel = "Signing in…", forgotPasswordSlot, showRemember = false, rememberLabel = "Remember this device", defaultRemember = false, showPasswordLabel, hidePasswordLabel, children, autoFocusEmail = false, }) {
    const [remember, setRemember] = useState(defaultRemember);
    function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
            remember: showRemember ? remember : false,
        });
    }
    return (_jsxs(AuthForm, { error: error, loading: loading, onSubmit: handleSubmit, submitSlot: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { type: "submit", variant: "primary", size: "lg", loading: loading, className: "w-full", children: loading ? loadingLabel : submitLabel }), children] }), children: [_jsx(FormField, { label: emailLabel, children: _jsx(Input, { name: "email", type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, required: true, placeholder: emailPlaceholder, autoFocus: autoFocusEmail }) }), _jsx(FormField, { label: _jsxs("span", { className: "flex flex-1 items-center justify-between gap-2", children: [_jsx("span", { children: passwordLabel }), forgotPasswordSlot] }), className: forgotPasswordSlot != null ? "[&>label]:w-full" : undefined, children: _jsx(PasswordInput, { name: "password", autoComplete: "current-password", required: true, showPasswordLabel: showPasswordLabel, hidePasswordLabel: hidePasswordLabel }) }), showRemember && (_jsx(Checkbox, { name: "remember", label: rememberLabel, checked: remember, onCheckedChange: (checked) => setRemember(checked === true) }))] }));
}
