/**
 * Generic invitation (§27 Organización group; T04 "Aceptar invitación"
 * pattern): invited to a named target with an itemized access breakdown and
 * an explicit accept/decline choice. Distinct from `InvitationEmail`, which
 * is organization-specific (`organizationName`, a single `role`, accept-only)
 * — keep the two separate rather than merging them back into one template.
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface GenericInvitationEmailProps extends EmailTemplateBaseProps {
  /** Display name of the person inviting. */
  inviterName: string;
  /** Shown next to the name so the recipient can verify who is asking. */
  inviterEmail?: string;
  /** What the recipient is invited to — a team, project or resource. Not necessarily an organization; see `InvitationEmail` for that case. */
  targetName: string;
  /** Single-line summary of the access granted, e.g. "developer". */
  role?: string;
  /** Itemized access grants, one row per product/resource — mirrors T04's product-by-product breakdown ("Vault · read and write configs"). */
  access?: EmailKeyValueItem[];
  /** Signed acceptance URL. */
  acceptUrl: string;
  /** Signed decline URL. When omitted, only the accept CTA renders. */
  declineUrl?: string;
  /** Days until the invitation expires; feeds the default expiry line. */
  expiresDays?: number;
  heading?: string;
  body?: string;
  /** Accept CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Decline CTA label. */
  declineLabel?: string;
  expiresText?: string;
  securityNote?: string;
  fallbackLabel?: string;
}

/**
 * "You are invited to {target}" — states exactly what access is granted,
 * item by item, before the recipient accepts (T04). The only one of the
 * three Organización invites with a decline action alongside accept.
 */
export function GenericInvitationEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  inviterName,
  inviterEmail,
  targetName,
  role,
  access,
  acceptUrl,
  declineUrl,
  expiresDays,
  heading,
  body,
  ctaLabel = "Accept invitation",
  declineLabel = "Decline",
  expiresText,
  securityNote = "If you were not expecting this invitation, ignore this message.",
  fallbackLabel,
}: GenericInvitationEmailProps) {
  const resolvedHeading = heading ?? `You are invited to ${targetName}`;
  const resolvedBody =
    body ??
    `${inviterName}${inviterEmail ? ` (${inviterEmail})` : ""} invited you to ${targetName}${role ? ` as ${role}` : ""} on ${theme.productName}.`;
  const expires =
    expiresText ??
    (expiresDays !== undefined
      ? `This invitation expires in ${expiresDays} days.`
      : undefined);
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? `${inviterName} invited you to ${targetName}`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      {access && access.length > 0 ? <EmailKeyValue items={access} /> : null}
      <EmailButton href={acceptUrl}>{ctaLabel}</EmailButton>
      {declineUrl ? (
        <EmailButton href={declineUrl} variant="secondary">
          {declineLabel}
        </EmailButton>
      ) : null}
      <FallbackUrl url={acceptUrl} label={fallbackLabel} />
      {expires ? <EmailMuted>{expires}</EmailMuted> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
