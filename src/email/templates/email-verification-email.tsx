/**
 * Email-address verification: one CTA plus a plain-URL fallback.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface EmailVerificationEmailProps extends EmailTemplateBaseProps {
  /** Signed verification URL — button and fallback line share it. */
  verifyUrl: string;
  /** Hours until the link expires; feeds the default expiry line. */
  expiresHours?: number;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Full expiry line; overrides the `expiresHours` default. */
  expiresText?: string;
  securityNote?: string;
  /** Lead-in of the plain-URL fallback line. */
  fallbackLabel?: string;
}

/**
 * "Verify your email" message. One clear CTA; the fallback URL keeps the
 * flow alive when the button is stripped by the client.
 */
export function EmailVerificationEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  verifyUrl,
  expiresHours,
  heading = "Verify your email",
  body = "Confirm this email address to activate your account.",
  ctaLabel = "Verify email",
  expiresText,
  securityNote = "If you did not create an account, ignore this message.",
  fallbackLabel,
}: EmailVerificationEmailProps) {
  const expires =
    expiresText ??
    (expiresHours !== undefined
      ? `This link expires in ${expiresHours} hours.`
      : undefined);
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? `Verify your email for ${theme.productName}`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailButton href={verifyUrl}>{ctaLabel}</EmailButton>
      <FallbackUrl url={verifyUrl} label={fallbackLabel} />
      {expires ? <EmailMuted>{expires}</EmailMuted> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
