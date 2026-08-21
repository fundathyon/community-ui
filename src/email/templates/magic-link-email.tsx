/**
 * Passwordless sign-in link.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface MagicLinkEmailProps extends EmailTemplateBaseProps {
  /** Signed one-time sign-in URL. */
  loginUrl: string;
  /** Minutes until the link expires; feeds the default expiry line. */
  expiresMinutes?: number;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  expiresText?: string;
  securityNote?: string;
  fallbackLabel?: string;
}

/**
 * Magic-link email: sign in with one click, no password. States that the
 * link is single-use; the note covers the unrequested case.
 */
export function MagicLinkEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  loginUrl,
  expiresMinutes,
  heading,
  body = "Use the button below to sign in. The link works once.",
  ctaLabel = "Sign in",
  expiresText,
  securityNote = "If you did not request this link, ignore this message.",
  fallbackLabel,
}: MagicLinkEmailProps) {
  const resolvedHeading = heading ?? `Sign in to ${theme.productName}`;
  const expires =
    expiresText ??
    (expiresMinutes !== undefined
      ? `This link expires in ${expiresMinutes} minutes.`
      : undefined);
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? `Your ${theme.productName} sign-in link`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailButton href={loginUrl}>{ctaLabel}</EmailButton>
      <FallbackUrl url={loginUrl} label={fallbackLabel} />
      {expires ? <EmailMuted>{expires}</EmailMuted> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
