/**
 * API-key-revoked confirmation (§27 Credenciales group). Factual and calm
 * (§25 tone) — revocation is often a deliberate admin action, not an
 * incident, so this stays a record rather than an alarm.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface ApiKeyRevokedEmailProps extends EmailTemplateBaseProps {
  /** Human name of the key ("ci-deploy"). NEVER the secret value. */
  keyName: string;
  /** Who revoked it — a person or "system" (§24 audit grammar). */
  revokerName?: string;
  /** Preformatted revocation time, e.g. "21 Aug 2026, 09:14 UTC". */
  revokedAt: string;
  /** What breaks as a result, stated plainly. */
  consequence?: string;
  /** Where to review remaining keys. */
  actionUrl?: string;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  note?: string;
  /** Row labels for the details table. */
  labels?: { revoker?: string; revokedAt?: string };
}

/**
 * Confirms a revoked API key: who revoked it and when, plus the concrete
 * consequence in a neutral (not danger) alert — matter-of-fact, since this
 * is frequently intentional (§25).
 */
export function ApiKeyRevokedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  keyName,
  revokerName,
  revokedAt,
  consequence = "Requests authenticated with this key are rejected within 30 seconds.",
  actionUrl,
  heading = "API key revoked",
  body,
  ctaLabel = "Manage API keys",
  note = "If you did not expect this, contact your organization admin.",
  labels,
}: ApiKeyRevokedEmailProps) {
  const resolvedBody =
    body ??
    `The API key ${keyName} was revoked${revokerName ? ` by ${revokerName}` : ""}.`;
  const items: EmailKeyValueItem[] = [];
  if (revokerName) {
    items.push({ label: labels?.revoker ?? "Revoked by", value: revokerName });
  }
  items.push({ label: labels?.revokedAt ?? "Revoked", value: revokedAt });
  return (
    <EmailLayout theme={theme} title={heading} preheader={preheader ?? `${keyName} was revoked`}>
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      <EmailKeyValue items={items} />
      {consequence ? <EmailAlert tone="info">{consequence}</EmailAlert> : null}
      {actionUrl ? (
        <EmailButton href={actionUrl} variant="secondary">
          {ctaLabel}
        </EmailButton>
      ) : null}
      <EmailMuted>{note}</EmailMuted>
    </EmailLayout>
  );
}
