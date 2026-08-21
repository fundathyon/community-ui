"use client";

import { Field } from "@base-ui/react/field";
import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

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
export function FormField({
  label,
  children,
  description,
  error,
  validate,
  required = false,
  optional,
  disabled,
  name,
  className,
}: FormFieldProps) {
  return (
    <Field.Root
      name={name}
      disabled={disabled}
      invalid={error ? true : undefined}
      validate={validate}
      validationMode="onBlur"
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
    >
      <Field.Label className="inline-flex items-center gap-1 text-label text-text">
        {label}
        {required && (
          <span aria-hidden className="text-danger">
            *
          </span>
        )}
        {optional && <span className="font-normal text-text-muted">({optional})</span>}
      </Field.Label>
      {children}
      {error ? (
        <Field.Error match role="alert" className="flex items-start gap-1 text-caption text-danger">
          <Icon icon={CircleAlert} size={12} className="mt-px" />
          <span>{error}</span>
        </Field.Error>
      ) : (
        <Field.Error className="flex items-start gap-1 text-caption text-danger" role="alert">
          <Icon icon={CircleAlert} size={12} className="mt-px" />
          <Field.Validity>{(validity) => <span>{validity.error}</span>}</Field.Validity>
        </Field.Error>
      )}
      {description && <Field.Description className="text-caption text-text-muted">{description}</Field.Description>}
    </Field.Root>
  );
}
