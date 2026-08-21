"use client";

import type { ReactNode } from "react";
import { Alert } from "../feedback/alert";
import { Button } from "../actions/button";
import { OTPInput } from "../forms/code-input";
import { Heading } from "../typography/heading";
import { Text } from "../typography/text";
import { useCooldown } from "./use-cooldown";

export interface OtpLockedState {
  /** Explicit message WITH the deadline — "Too many attempts. Try again in
   * 15 minutes." Never an "unknown error" (§23). */
  message: ReactNode;
}

export interface OTPFormProps {
  /** Fired when the code is complete (auto-submit on the last digit, §23). */
  onSubmit?: (code: string) => void;
  /** Number of digits. */
  length?: number;
  /** Optional heading above the field. Usually the AuthLayout title covers this. */
  title?: ReactNode;
  /** Where the code was sent and when it expires — "Sent to rafa@… . Expires in
   * 9:42." (§23). */
  descriptionSlot?: ReactNode;
  /** Generic error (wrong code), shown as a danger Alert above the field. */
  error?: ReactNode;
  /**
   * Locked state after repeated failures — a WARNING Alert (not danger: a lock
   * is temporary and reversible) with an explicit deadline. Disables the field
   * (§23).
   */
  locked?: OtpLockedState | null;
  /** Called when the user asks for a new code. */
  onResend?: () => void;
  resendLabel?: string;
  /** Countdown (seconds) that disables resend after each request. */
  cooldownSeconds?: number;
  /** Copy while the resend countdown runs. */
  resendCooldownLabel?: (seconds: number) => ReactNode;
  /** An alternative method Link ("Use a passkey"), shown next to resend (§23). */
  alternativeSlot?: ReactNode;
  /** Accessible group label for the code field. */
  codeLabel?: string;
}

/**
 * OTPForm — two-step verification (§23). A grouped 6-digit OTP field
 * (3+3 optical grouping, SMS autofill, paste never blocked) that auto-submits
 * on completion. Resend has an internal cooldown; after repeated failures the
 * app passes `locked` and we render a warning Alert with the deadline — never
 * an "unknown error".
 *
 * `TwoFactorForm` is the same component under the name used on 2FA screens.
 */
export function OTPForm({
  onSubmit,
  length = 6,
  title,
  descriptionSlot,
  error,
  locked,
  onResend,
  resendLabel = "Resend code",
  cooldownSeconds = 0,
  resendCooldownLabel = (seconds) => `Resend in ${seconds}s`,
  alternativeSlot,
  codeLabel = "Verification code",
}: OTPFormProps) {
  const { remaining, active, start } = useCooldown(cooldownSeconds);
  const isLocked = locked != null;

  function handleResend() {
    onResend?.();
    start();
  }

  return (
    <div className="flex flex-col gap-4">
      {title != null && (
        <Heading level={1} visual="h3" className="text-center">
          {title}
        </Heading>
      )}
      {descriptionSlot != null && (
        <Text tone="secondary" className="text-center">
          {descriptionSlot}
        </Text>
      )}

      {isLocked ? (
        <Alert tone="warning" title={locked.message} />
      ) : (
        error != null && <Alert tone="danger" title={error} />
      )}

      <div className="flex justify-center">
        <OTPInput
          length={length}
          aria-label={codeLabel}
          disabled={isLocked}
          invalid={error != null || undefined}
          onComplete={(code) => onSubmit?.(code)}
        />
      </div>

      {(onResend != null || alternativeSlot != null) && (
        <div className="flex items-center justify-center gap-4">
          {onResend != null && (
            <Button variant="ghost" size="sm" onClick={handleResend} disabled={active || isLocked}>
              {active ? resendCooldownLabel(remaining) : resendLabel}
            </Button>
          )}
          {alternativeSlot}
        </div>
      )}
    </div>
  );
}

/** TwoFactorForm — the 2FA-screen alias of OTPForm (§23). Same component,
 * named for the screen that hosts it. */
export const TwoFactorForm = OTPForm;
export type TwoFactorFormProps = OTPFormProps;
