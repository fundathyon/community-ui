/**
 * Password reset request: CTA + fallback URL + "didn't request this" note.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface PasswordResetEmailProps extends EmailTemplateBaseProps {
  /** Signed reset URL — button and fallback line share it. */
  resetUrl: string;
  /** Minutes until the link expires; feeds the default expiry line. */
  expiresMinutes?: number;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Full expiry line; overrides the `expiresMinutes` default. */
  expiresText?: string;
  /** Reassurance that an ignored request changes nothing. Always rendered. */
  securityNote?: string;
  fallbackLabel?: string;
}

/**
 * "Reset your password" message. The security note states the safe outcome
 * of doing nothing — the §17 voice: direct, no apologies, no alarm.
 */
export function PasswordResetEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  resetUrl,
  expiresMinutes,
  heading = "Reset your password",
  body = "A password reset was requested for your account. Set a new password with the button below.",
  ctaLabel = "Reset password",
  expiresText,
  securityNote = "If you did not request a password reset, ignore this message. Your password remains unchanged.",
  fallbackLabel,
}: PasswordResetEmailProps) {
  const expires =
    expiresText ??
    (expiresMinutes !== undefined
      ? `This link expires in ${expiresMinutes} minutes.`
      : undefined);
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? `Reset your ${theme.productName} password`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailButton href={resetUrl}>{ctaLabel}</EmailButton>
      <FallbackUrl url={resetUrl} label={fallbackLabel} />
      {expires ? <EmailMuted>{expires}</EmailMuted> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
