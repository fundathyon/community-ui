"use client";

import { type FormEvent, type ReactNode } from "react";
import { Alert } from "../feedback/alert";
import { Button } from "../actions/button";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { AuthForm } from "./auth-form";
import { useCooldown } from "./use-cooldown";

export interface MagicLinkFormValues {
  email: string;
}

export interface MagicLinkFormProps {
  onSubmit?: (values: MagicLinkFormValues) => void;
  /** When true, the sent-state confirmation replaces the form. */
  sent?: boolean;
  error?: ReactNode;
  loading?: boolean;
  emailLabel?: ReactNode;
  emailPlaceholder?: string;
  submitLabel?: ReactNode;
  loadingLabel?: string;
  /** Title of the sent-state confirmation Alert. */
  sentTitle?: ReactNode;
  /** Body copy of the sent-state confirmation ("Check your inbox for the link").
   * Deliberately does NOT confirm whether the account exists (§29 T03). */
  sentSlot?: ReactNode;
  /** Resend from the sent state. */
  onResend?: () => void;
  resendLabel?: string;
  cooldownSeconds?: number;
  resendCooldownLabel?: (seconds: number) => ReactNode;
}

/**
 * MagicLinkForm — passwordless sign-in by emailed link. Before sending: an
 * email field + CTA. After sending (`sent`): a success Alert telling the user
 * to check their inbox, plus a resend with an internal cooldown. The
 * confirmation never reveals whether the email is registered (§29 T03).
 */
export function MagicLinkForm({
  onSubmit,
  sent = false,
  error,
  loading = false,
  emailLabel = "Email",
  emailPlaceholder,
  submitLabel = "Email me a link",
  loadingLabel = "Sending…",
  sentTitle = "Check your email",
  sentSlot = "If an account exists, we've sent a sign-in link. It expires shortly.",
  onResend,
  resendLabel = "Resend link",
  cooldownSeconds = 0,
  resendCooldownLabel = (seconds) => `Resend in ${seconds}s`,
}: MagicLinkFormProps) {
  const { remaining, active, start } = useCooldown(cooldownSeconds);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    onSubmit?.({ email: String(data.get("email") ?? "") });
  }

  function handleResend() {
    onResend?.();
    start();
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-4">
        <Alert tone="success" title={sentTitle}>
          {sentSlot}
        </Alert>
        {onResend != null && (
          <Button variant="secondary" size="lg" onClick={handleResend} disabled={active} className="w-full">
            {active ? resendCooldownLabel(remaining) : resendLabel}
          </Button>
        )}
      </div>
    );
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
