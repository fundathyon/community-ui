"use client";

import { type FormEvent, type ReactNode } from "react";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { Text } from "../typography/text";
import { AuthForm } from "./auth-form";

export interface PasswordResetRequestValues {
  email: string;
}

export interface PasswordResetRequestFormProps {
  onSubmit?: (values: PasswordResetRequestValues) => void;
  error?: ReactNode;
  loading?: boolean;
  emailLabel?: ReactNode;
  emailPlaceholder?: string;
  submitLabel?: ReactNode;
  loadingLabel?: string;
  /**
   * Intro copy above the field ("Enter your email and we'll send you a reset
   * link"). After it's sent, show a confirmation that NEVER reveals whether the
   * account exists — "If an account exists for that email…" (§29, T03).
   */
  noteSlot?: ReactNode;
}

/**
 * PasswordResetRequestForm — email only, one CTA (§16, §29 T03). The request
 * itself must never confirm which emails are registered; keep that in mind for
 * the confirmation you render afterwards ("If an account exists…").
 */
export function PasswordResetRequestForm({
  onSubmit,
  error,
  loading = false,
  emailLabel = "Email",
  emailPlaceholder,
  submitLabel = "Send reset link",
  loadingLabel = "Sending…",
  noteSlot,
}: PasswordResetRequestFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    onSubmit?.({ email: String(data.get("email") ?? "") });
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
      {noteSlot != null && (
        <Text tone="secondary" className="-mt-1">
          {noteSlot}
        </Text>
      )}
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
    </AuthForm>
  );
}
