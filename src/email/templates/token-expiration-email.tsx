/**
 * Access-token expiry warning (§27 Credenciales group). Never includes the
 * credential value — only its name.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface TokenExpirationEmailProps extends EmailTemplateBaseProps {
  /** Human name of the token ("deploy-bot"). NEVER the token value (§27). */
  tokenName: string;
  /** Preformatted expiry, e.g. "28 Aug 2026, 00:00 UTC". */
  expiresAt: string;
  /** Where a new token is issued or this one extended. */
  renewUrl?: string;
  heading?: string;
  body?: string;
  /** Consequence line inside the warning alert. */
  alertText?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
}

/**
 * Warns that a named token expires soon: warning tone (nothing failed yet),
 * the concrete consequence, and a renew CTA.
 */
export function TokenExpirationEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  tokenName,
  expiresAt,
  renewUrl,
  heading,
  body,
  alertText = "Requests authenticated with this token will fail after it expires.",
  ctaLabel = "Renew token",
}: TokenExpirationEmailProps) {
  const resolvedHeading = heading ?? `${tokenName} expires soon`;
  const resolvedBody =
    body ?? `The access token ${tokenName} expires on ${expiresAt}.`;
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? `${tokenName} expires on ${expiresAt}`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      <EmailAlert tone="warning">{alertText}</EmailAlert>
      {renewUrl ? <EmailButton href={renewUrl}>{ctaLabel}</EmailButton> : null}
    </EmailLayout>
  );
}
