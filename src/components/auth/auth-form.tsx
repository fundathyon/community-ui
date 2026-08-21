"use client";

import type { FormEvent, FormHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Alert } from "../feedback/alert";

export interface AuthFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Submit handler. `preventDefault()` is already called; read the values from
   * your own controlled state or from the event's `FormData`
   * (`new FormData(event.currentTarget)`). Apps wire their own auth backend —
   * this wrapper never talks to a domain API.
   */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /**
   * Error rendered as a danger Alert ABOVE the fields (§16: "el error aparece
   * sobre el formulario"). For CREDENTIAL errors the copy must be generic and
   * NEVER reveal whether the email exists — pass "Incorrect email or password",
   * not "No account for that email" (§16).
   */
  error?: ReactNode;
  /** Marks the form `aria-busy` while a request is in flight (§29). The fields
   * are not disabled one by one — only the submit button reflects loading. */
  loading?: boolean;
  /** The fields. */
  children: ReactNode;
  /** The CTA area below the fields (primary button, then alternative methods
   * under a divider). */
  submitSlot?: ReactNode;
}

/**
 * AuthForm — the thin form wrapper shared by every auth screen (§16). It owns
 * the `<form>`, calls `preventDefault`, renders the error Alert above the
 * fields, and sets `aria-busy` while loading. It holds NO field state: the
 * concrete forms (LoginForm, SignupForm…) compose it with the field controls.
 *
 * When NOT to use: for anything that isn't an auth screen, use a plain form
 * with FormField/FormActions — this wrapper bakes in the §16 error placement.
 */
export function AuthForm({
  onSubmit,
  error,
  loading = false,
  children,
  submitSlot,
  className,
  ...props
}: AuthFormProps) {
  return (
    <form
      noValidate
      aria-busy={loading || undefined}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
      }}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {error != null && <Alert tone="danger" title={error} />}
      {children}
      {submitSlot}
    </form>
  );
}
