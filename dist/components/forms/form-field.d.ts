import type { ReactNode } from "react";
export interface FormFieldProps {
    /** Visible label. Every control lives inside a FormField — a placeholder is
     * never a label (§10). */
    label: ReactNode;
    children: ReactNode;
    /**
     * Persistent hint below the control. The error is ADDED next to it, it never
     * replaces it (§C-04).
     */
    description?: ReactNode;
    /**
     * External error (e.g. the backend's 409). Linked to the control via
     * aria-describedby and announced with role=alert.
     */
    error?: ReactNode;
    /** For client-side validation: return the error message(s) or null. */
    validate?: (value: unknown) => string | string[] | null | Promise<string | string[] | null>;
    /**
     * Mark required with an asterisk ONLY if most fields in the form are
     * optional; otherwise mark the optional ones with `optional` (§10).
     * Never both conventions in the same form.
     */
    required?: boolean;
    /** Renders "(optional)" after the label. Pass your product copy. */
    optional?: ReactNode;
    disabled?: boolean;
    /** Field name for form submission. */
    name?: string;
    className?: string;
}
/**
 * Form Field (§C-04): owns the label, description, error and the ids that link
 * them to the control. Validation runs on blur, not on every keystroke; once a
 * field has shown an error it re-validates on change so it can clear ASAP.
 * Never validates on mount.
 *
 * Works with every Community UI form control (they integrate via Base UI Field
 * context — no manual `htmlFor`/`aria-describedby` wiring needed).
 */
export declare function FormField({ label, children, description, error, validate, required, optional, disabled, name, className, }: FormFieldProps): import("react").JSX.Element;
