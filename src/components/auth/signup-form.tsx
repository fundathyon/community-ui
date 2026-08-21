"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../actions/button";
import { Checkbox } from "../forms/checkbox";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { PasswordInput } from "../forms/password-input";
import { AuthForm } from "./auth-form";

export interface SignupFormValues {
  email: string;
  password: string;
}

export interface SignupFormProps {
  onSubmit?: (values: SignupFormValues) => void;
  error?: ReactNode;
  loading?: boolean;
  emailLabel?: ReactNode;
  passwordLabel?: ReactNode;
  emailPlaceholder?: string;
  submitLabel?: ReactNode;
  loadingLabel?: string;
  /**
   * A live password-requirements hint under the password field (§29, T02):
   * a checklist that fills in as the user types, NEVER an error after submit.
   * Rendered as the field description.
   */
  passwordHintSlot?: ReactNode;
  /**
   * The terms label content ("I agree to the terms…", with your own Links).
   * When present, a required checkbox is rendered and the CTA stays disabled
   * until it's checked.
   */
  termsSlot?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  /** Alternative methods below the CTA. */
  children?: ReactNode;
}

/**
 * SignupForm — email + a single password (modern: no "repeat password" — the
 * reveal toggle resolves typos) + an optional terms checkbox (§29, T02).
 * `autocomplete="new-password"`. Password rules are shown as a live checklist
 * via `passwordHintSlot`, never as an error after submitting.
 */
export function SignupForm({
  onSubmit,
  error,
  loading = false,
  emailLabel = "Work email",
  passwordLabel = "Password",
  emailPlaceholder,
  submitLabel = "Create account",
  loadingLabel = "Creating account…",
  passwordHintSlot,
  termsSlot,
  showPasswordLabel,
  hidePasswordLabel,
  children,
}: SignupFormProps) {
  const [accepted, setAccepted] = useState(false);
  const termsRequired = termsSlot != null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (termsRequired && !accepted) return;
    const data = new FormData(event.currentTarget);
    onSubmit?.({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });
  }

  return (
    <AuthForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      submitSlot={
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={termsRequired && !accepted}
            className="w-full"
          >
            {loading ? loadingLabel : submitLabel}
          </Button>
          {children}
        </div>
      }
    >
      <FormField label={emailLabel}>
        <Input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          placeholder={emailPlaceholder}
        />
      </FormField>

      <FormField label={passwordLabel} description={passwordHintSlot}>
        <PasswordInput
          name="password"
          autoComplete="new-password"
          required
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
        />
      </FormField>

      {termsRequired && (
        <Checkbox
          name="terms"
          label={termsSlot}
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(checked === true)}
        />
      )}
    </AuthForm>
  );
}
