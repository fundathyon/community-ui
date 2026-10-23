"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "@base-ui/react/field";
import { CircleAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Form Field (§C-04): owns the label, description, error and the ids that link
 * them to the control. Validation runs on blur, not on every keystroke; once a
 * field has shown an error it re-validates on change so it can clear ASAP.
 * Never validates on mount.
 *
 * Works with every Community UI form control (they integrate via Base UI Field
 * context — no manual `htmlFor`/`aria-describedby` wiring needed).
 */
export function FormField({ label, children, description, error, validate, required = false, optional, disabled, name, className, }) {
    return (_jsxs(Field.Root, { name: name, disabled: disabled, invalid: error ? true : undefined, validate: validate, validationMode: "onBlur", className: cn("flex min-w-0 flex-col gap-1.5", className), children: [_jsxs(Field.Label, { className: "inline-flex items-center gap-1 text-label text-text", children: [label, required && (_jsx("span", { "aria-hidden": true, className: "text-danger", children: "*" })), optional && _jsxs("span", { className: "font-normal text-text-muted", children: ["(", optional, ")"] })] }), children, error ? (_jsxs(Field.Error, { match: true, role: "alert", className: "flex items-start gap-1 text-caption text-danger", children: [_jsx(Icon, { icon: CircleAlert, size: 12, className: "mt-px" }), _jsx("span", { children: error })] })) : (_jsxs(Field.Error, { className: "flex items-start gap-1 text-caption text-danger", role: "alert", children: [_jsx(Icon, { icon: CircleAlert, size: 12, className: "mt-px" }), _jsx(Field.Validity, { children: (validity) => _jsx("span", { children: validity.error }) })] })), description && _jsx(Field.Description, { className: "text-caption text-text-muted", children: description })] }));
}
