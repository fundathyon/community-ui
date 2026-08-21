"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Alert } from "../feedback/alert";
/**
 * AuthForm — the thin form wrapper shared by every auth screen (§16). It owns
 * the `<form>`, calls `preventDefault`, renders the error Alert above the
 * fields, and sets `aria-busy` while loading. It holds NO field state: the
 * concrete forms (LoginForm, SignupForm…) compose it with the field controls.
 *
 * When NOT to use: for anything that isn't an auth screen, use a plain form
 * with FormField/FormActions — this wrapper bakes in the §16 error placement.
 */
export function AuthForm({ onSubmit, error, loading = false, children, submitSlot, className, ...props }) {
    return (_jsxs("form", { noValidate: true, "aria-busy": loading || undefined, onSubmit: (event) => {
            event.preventDefault();
            onSubmit?.(event);
        }, className: cn("flex flex-col gap-4", className), ...props, children: [error != null && _jsx(Alert, { tone: "danger", title: error }), children, submitSlot] }));
}
