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
 * SignupForm — email + a single password (modern: no "repeat password" — the
 * reveal toggle resolves typos) + an optional terms checkbox (§29, T02).
 * `autocomplete="new-password"`. Password rules are shown as a live checklist
 * via `passwordHintSlot`, never as an error after submitting.
 */
export function SignupForm({ onSubmit, error, loading = false, emailLabel = "Work email", passwordLabel = "Password", emailPlaceholder, submitLabel = "Create account", loadingLabel = "Creating account…", passwordHintSlot, termsSlot, showPasswordLabel, hidePasswordLabel, children, }) {
    const [accepted, setAccepted] = useState(false);
    const termsRequired = termsSlot != null;
    function handleSubmit(event) {
        if (termsRequired && !accepted)
            return;
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
        });
    }
    return (_jsxs(AuthForm, { error: error, loading: loading, onSubmit: handleSubmit, submitSlot: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { type: "submit", variant: "primary", size: "lg", loading: loading, disabled: termsRequired && !accepted, className: "w-full", children: loading ? loadingLabel : submitLabel }), children] }), children: [_jsx(FormField, { label: emailLabel, children: _jsx(Input, { name: "email", type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, required: true, placeholder: emailPlaceholder }) }), _jsx(FormField, { label: passwordLabel, description: passwordHintSlot, children: _jsx(PasswordInput, { name: "password", autoComplete: "new-password", required: true, showPasswordLabel: showPasswordLabel, hidePasswordLabel: hidePasswordLabel }) }), termsRequired && (_jsx(Checkbox, { name: "terms", label: termsSlot, checked: accepted, onCheckedChange: (checked) => setAccepted(checked === true) }))] }));
}
