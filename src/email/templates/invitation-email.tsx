/**
 * Organization invitation (§27 Organización group — accent-toned CTA).
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting, type EmailTemplateBaseProps } from "./shared";

export interface InvitationEmailProps extends EmailTemplateBaseProps {
  /** Display name of the person inviting. */
  inviterName: string;
  /** Shown next to the name so the recipient can verify who is asking. */
  inviterEmail?: string;
  organizationName: string;
  /** Role granted on acceptance, e.g. "admin". */
  role?: string;
  /** Signed acceptance URL. */
  acceptUrl: string;
  /** Days until the invitation expires; feeds the default expiry line. */
  expiresDays?: number;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  expiresText?: string;
  securityNote?: string;
  fallbackLabel?: string;
}

/**
 * "Join {organization}" invitation. The default body names inviter, email,
 * organization and role so the recipient can judge legitimacy before clicking.
 */
export function InvitationEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  inviterName,
  inviterEmail,
  organizationName,
  role,
  acceptUrl,
  expiresDays,
  heading,
  body,
  ctaLabel = "Accept invitation",
  expiresText,
  securityNote = "If you were not expecting this invitation, ignore this message.",
  fallbackLabel,
}: InvitationEmailProps) {
  const resolvedHeading = heading ?? `Join ${organizationName}`;
  const resolvedBody =
    body ??
    `${inviterName}${inviterEmail ? ` (${inviterEmail})` : ""} invited you to join ${organizationName}${role ? ` as ${role}` : ""} on ${theme.productName}.`;
  const expires =
    expiresText ??
    (expiresDays !== undefined
      ? `This invitation expires in ${expiresDays} days.`
      : undefined);
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? `${inviterName} invited you to ${organizationName}`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      <EmailButton href={acceptUrl}>{ctaLabel}</EmailButton>
      <FallbackUrl url={acceptUrl} label={fallbackLabel} />
      {expires ? <EmailMuted>{expires}</EmailMuted> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
