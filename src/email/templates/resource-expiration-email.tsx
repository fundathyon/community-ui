/**
 * Generic resource expiry warning (§27 Operaciones "Recurso por caducar").
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface ResourceExpirationEmailProps extends EmailTemplateBaseProps {
  /** Name of the expiring resource ("prod-registry"). */
  resourceName: string;
  /** Kind of resource, lowercase ("repository", "share link"). Default "resource". */
  resourceType?: string;
  /** Preformatted expiry, e.g. "28 Aug 2026". */
  expiresAt: string;
  renewUrl?: string;
  /** What happens after expiry, shown in a warning alert when provided. */
  consequence?: string;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). Defaults to "Renew {resourceType}". */
  ctaLabel?: string;
}

/**
 * Warns that a named resource expires soon. Warning tone; the optional
 * `consequence` states the concrete effect ("Scheduled jobs stop running").
 */
export function ResourceExpirationEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  resourceName,
  resourceType,
  expiresAt,
  renewUrl,
  consequence,
  heading,
  body,
  ctaLabel,
}: ResourceExpirationEmailProps) {
  const type = resourceType ?? "resource";
  const resolvedHeading = heading ?? `${resourceName} expires soon`;
  const resolvedBody =
    body ?? `The ${type} ${resourceName} expires on ${expiresAt}.`;
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? `${resourceName} expires on ${expiresAt}`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      {consequence ? <EmailAlert tone="warning">{consequence}</EmailAlert> : null}
      {renewUrl ? (
        <EmailButton href={renewUrl}>{ctaLabel ?? `Renew ${type}`}</EmailButton>
      ) : null}
    </EmailLayout>
  );
}
