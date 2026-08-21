/**
 * Resource-share notification (§27 Operaciones group; mirrors the in-app
 * "Nuevo enlace compartido" pattern of §13/§29): names the resource, who
 * shared it, and when the link expires.
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface ResourceSharedEmailProps extends EmailTemplateBaseProps {
  /** Name of the shared resource ("prod-registry"). */
  resourceName: string;
  /** Kind of resource, lowercase ("config", "repository"). Default "resource". */
  resourceType?: string;
  /** Display name of the person who created the share link. */
  sharerName?: string;
  sharerEmail?: string;
  /** Signed share URL — button and fallback line share it. */
  shareUrl: string;
  /** Preformatted expiry ("In 7 days", "28 Aug 2026") or "Never". Omit to hide the row. */
  expiresAt?: string;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). Defaults to "Open {resourceType}". */
  ctaLabel?: string;
  securityNote?: string;
  fallbackLabel?: string;
  /** Row labels for the details table. */
  labels?: { sharedBy?: string; expires?: string };
}

/**
 * "{resource} was shared with you": who shared it and the link's expiry as
 * facts, then the CTA into the resource with its plain-URL fallback.
 */
export function ResourceSharedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  resourceName,
  resourceType,
  sharerName,
  sharerEmail,
  shareUrl,
  expiresAt,
  heading,
  body,
  ctaLabel,
  securityNote = "If you were not expecting this, ignore this message.",
  fallbackLabel,
  labels,
}: ResourceSharedEmailProps) {
  const type = resourceType ?? "resource";
  const resolvedHeading = heading ?? `${resourceName} was shared with you`;
  const sharer = sharerName
    ? `${sharerName}${sharerEmail ? ` (${sharerEmail})` : ""}`
    : undefined;
  const resolvedBody =
    body ??
    `${sharer ?? "Someone"} shared the ${type} ${resourceName} with you on ${theme.productName}.`;
  const items: EmailKeyValueItem[] = [];
  if (sharer) items.push({ label: labels?.sharedBy ?? "Shared by", value: sharer });
  if (expiresAt) items.push({ label: labels?.expires ?? "Expires", value: expiresAt });
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? resolvedHeading}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      {items.length > 0 ? <EmailKeyValue items={items} /> : null}
      <EmailButton href={shareUrl}>{ctaLabel ?? `Open ${type}`}</EmailButton>
      <FallbackUrl url={shareUrl} label={fallbackLabel} />
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
