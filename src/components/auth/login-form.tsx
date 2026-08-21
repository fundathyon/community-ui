"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../actions/button";
import { Checkbox } from "../forms/checkbox";
import { FormField } from "../forms/form-field";
import { Input } from "../forms/input";
import { PasswordInput } from "../forms/password-input";
import { AuthForm } from "./auth-form";

export interface LoginFormValues {
  email: string;
  password: string;
  /** Only meaningful when `showRemember` is set; otherwise always false. */
  remember: boolean;
}

export interface LoginFormProps {
  /** Receives the entered values. Apps wire their own auth backend (§16). */
  onSubmit?: (values: LoginFormValues) => void;
  /**
   * Credential error, shown as a danger Alert above the fields. Keep it
   * generic — it must NEVER reveal whether the email exists. The correct copy
   * is "Incorrect email or password" for both a wrong password AND an unknown
   * email (§16).
   */
  error?: ReactNode;
  loading?: boolean;
  emailLabel?: ReactNode;
  passwordLabel?: ReactNode;
  emailPlaceholder?: string;
  /** One clear CTA — rendered as a comfortable full-width primary button (§16). */
  submitLabel?: ReactNode;
  /** Accessible label while submitting; the button keeps its width and spins. */
  loadingLabel?: string;
  /** A Link placed inline with the password label ("Forgot?"). */
  forgotPasswordSlot?: ReactNode;
  /** Renders a "remember this device" checkbox below the password. */
  showRemember?: boolean;
  rememberLabel?: ReactNode;
  defaultRemember?: boolean;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  /** Alternative methods below the CTA (an AuthDivider + OAuth/passkey). */
  children?: ReactNode;
  /** Focus the email field on mount (the §29 template rule). Off by default so
   * an embedded form never steals focus. */
  autoFocusEmail?: boolean;
}

/**
 * LoginForm — email + password, one clear CTA (§16). Composes AuthForm with two
 * FormFields; emits the entered values to `onSubmit`. Proper autofill is wired:
 * `autocomplete="email"` / `"current-password"`, and the email never
 * autocapitalizes.
 *
 * The error copy must never reveal whether the email exists (§16) — pass the
 * same generic message for a wrong password and an unknown account.
 */
export function LoginForm({
  onSubmit,
  error,
  loading = false,
  emailLabel = "Email",
  passwordLabel = "Password",
  emailPlaceholder,
  submitLabel = "Sign in",
  loadingLabel = "Signing in…",
  forgotPasswordSlot,
  showRemember = false,
  rememberLabel = "Remember this device",
  defaultRemember = false,
  showPasswordLabel,
  hidePasswordLabel,
  children,
  autoFocusEmail = false,
}: LoginFormProps) {
  const [remember, setRemember] = useState(defaultRemember);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    onSubmit?.({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      remember: showRemember ? remember : false,
    });
  }

  return (
    <AuthForm
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      submitSlot={
        <div className="flex flex-col gap-3">
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
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
          autoFocus={autoFocusEmail}
        />
      </FormField>

      <FormField
        label={
          <span className="flex flex-1 items-center justify-between gap-2">
            <span>{passwordLabel}</span>
            {forgotPasswordSlot}
          </span>
        }
        className={forgotPasswordSlot != null ? "[&>label]:w-full" : undefined}
      >
        <PasswordInput
          name="password"
          autoComplete="current-password"
          required
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
        />
      </FormField>

      {showRemember && (
        <Checkbox
          name="remember"
          label={rememberLabel}
          checked={remember}
          onCheckedChange={(checked) => setRemember(checked === true)}
        />
      )}
    </AuthForm>
  );
}
