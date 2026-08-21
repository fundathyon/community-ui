"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { PasswordInput } from "../forms/password-input";
import { AuthForm } from "./auth-form";
/**
 * PasswordResetForm — set a new password from a reset link (§16). A single
 * `password` field by default; pass `withConfirm` to add a confirmation field
 * whose match is validated on blur via FormField (§C-04). Emits only the new
 * `password`. `autocomplete="new-password"`.
 */
export function PasswordResetForm({ onSubmit, error, loading = false, passwordLabel = "New password", submitLabel = "Reset password", loadingLabel = "Resetting…", passwordHintSlot, withConfirm = false, confirmLabel = "Confirm password", mismatchError = "Passwords don't match", showPasswordLabel, hidePasswordLabel, }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const mismatch = withConfirm && password !== confirm;
    function handleSubmit(_event) {
        if (mismatch)
            return;
        onSubmit?.({ password });
    }
    return (_jsxs(AuthForm, { error: error, loading: loading, onSubmit: handleSubmit, submitSlot: _jsx(Button, { type: "submit", variant: "primary", size: "lg", loading: loading, className: "w-full", children: loading ? loadingLabel : submitLabel }), children: [_jsx(FormField, { label: passwordLabel, description: passwordHintSlot, children: _jsx(PasswordInput, { name: "password", autoComplete: "new-password", required: true, value: password, onChange: (event) => setPassword(event.target.value), showPasswordLabel: showPasswordLabel, hidePasswordLabel: hidePasswordLabel }) }), withConfirm && (_jsx(FormField, { label: confirmLabel, validate: (value) => (String(value) === password ? null : mismatchError), children: _jsx(PasswordInput, { name: "confirm", autoComplete: "new-password", required: true, value: confirm, onChange: (event) => setConfirm(event.target.value), showPasswordLabel: showPasswordLabel, hidePasswordLabel: hidePasswordLabel }) }))] }));
}
