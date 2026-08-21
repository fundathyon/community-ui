"use client";

import { MailCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../actions/button";
import { Heading } from "../typography/heading";
import { Icon } from "../typography/icon";
import { Text } from "../typography/text";
import { useCooldown } from "./use-cooldown";

export interface EmailVerificationNoticeProps {
  /** The address the link was sent to — highlighted in the description. */
  email: string;
  title?: ReactNode;
  /**
   * Override the description. By default renders "We sent a verification link
   * to {email}." with the address highlighted; pass a function to reuse the
   * highlighted email, or any node to replace it entirely.
   */
  description?: ReactNode | ((email: ReactNode) => ReactNode);
  onResend?: () => void;
  resendLabel?: string;
  cooldownSeconds?: number;
  resendCooldownLabel?: (seconds: number) => ReactNode;
  /** A Link to change the address ("Use a different email"). */
  changeEmailSlot?: ReactNode;
}

/**
 * EmailVerificationNotice — the post-signup "verify your email" screen content
 * (§16 verification). A MailCheck mark, a description with the email
 * highlighted, a resend button with an internal cooldown, and an optional
 * "change email" link. Compose it inside AuthLayout.
 */
export function EmailVerificationNotice({
  email,
  title = "Verify your email",
  description,
  onResend,
  resendLabel = "Resend email",
  cooldownSeconds = 0,
  resendCooldownLabel = (seconds) => `Resend in ${seconds}s`,
  changeEmailSlot,
}: EmailVerificationNoticeProps) {
  const { remaining, active, start } = useCooldown(cooldownSeconds);
  const highlighted = <span className="font-medium text-text">{email}</span>;

  const body =
    typeof description === "function"
      ? description(highlighted)
      : description != null
        ? description
        : <>We sent a verification link to {highlighted}.</>;

  function handleResend() {
    onResend?.();
    start();
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="grid size-11 place-items-center rounded-full bg-accent-bg text-accent">
        <Icon icon={MailCheck} size={20} />
      </span>
      <div className="flex flex-col gap-1">
        <Heading level={1} visual="h3">
          {title}
        </Heading>
        <Text tone="secondary">{body}</Text>
      </div>
      {onResend != null && (
        <Button variant="secondary" size="lg" onClick={handleResend} disabled={active} className="w-full">
          {active ? resendCooldownLabel(remaining) : resendLabel}
        </Button>
      )}
      {changeEmailSlot != null && <div className="text-caption text-text-muted">{changeEmailSlot}</div>}
    </div>
  );
}
