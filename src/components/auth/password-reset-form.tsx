"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { PasswordInput } from "../forms/password-input";
import { AuthForm } from "./auth-form";

export interface PasswordResetValues {
  password: string;
}

export interface PasswordResetFormProps {
  onSubmit?: (values: PasswordResetValues) => void;
  error?: ReactNode;
  loading?: boolean;
  passwordLabel?: ReactNode;
  submitLabel?: ReactNode;
  loadingLabel?: string;
  /** Live password-requirements hint under the new-password field (§29 T02). */
  passwordHintSlot?: ReactNode;
  /** Adds a "confirm password" field with client-side match validation. */
  withConfirm?: boolean;
  confirmLabel?: ReactNode;
  /** Message shown when the two passwords differ. */
  mismatchError?: string;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

/**
 * PasswordResetForm — set a new password from a reset link (§16). A single
 * `password` field by default; pass `withConfirm` to add a confirmation field
 * whose match is validated on blur via FormField (§C-04). Emits only the new
 * `password`. `autocomplete="new-password"`.
 */
export function PasswordResetForm({
  onSubmit,
  error,
  loading = false,
  passwordLabel = "New password",
  submitLabel = "Reset password",
  loadingLabel = "Resetting…",
  passwordHintSlot,
  withConfirm = false,
  confirmLabel = "Confirm password",
  mismatchError = "Passwords don't match",
  showPasswordLabel,
  hidePasswordLabel,
}: PasswordResetFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = withConfirm && password !== confirm;

  function handleSubmit(_event: FormEvent<HTMLFormElement>) {
    if (mismatch) return;
    onSubmit?.({ password });
  }

  return (
    <AuthForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      submitSlot={
        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
          {loading ? loadingLabel : submitLabel}
        </Button>
      }
    >
      <FormField label={passwordLabel} description={passwordHintSlot}>
        <PasswordInput
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
        />
      </FormField>

      {withConfirm && (
        <FormField label={confirmLabel} validate={(value) => (String(value) === password ? null : mismatchError)}>
          <PasswordInput
            name="confirm"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            showPasswordLabel={showPasswordLabel}
            hidePasswordLabel={hidePasswordLabel}
          />
        </FormField>
      )}
    </AuthForm>
  );
}
