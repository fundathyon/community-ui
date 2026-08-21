/**
 * API-key-created confirmation (§27 Credenciales group). Never includes the
 * key's secret value — only its name (§20: a secret is shown in full once,
 * at creation, in-product; email never carries it).
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface ApiKeyCreatedEmailProps extends EmailTemplateBaseProps {
  /** Human name of the key ("ci-deploy"). NEVER the secret value. */
  keyName: string;
  /** Scopes granted, e.g. ["registry:read", "registry:write"]. */
  scopes?: string[];
  /** Who created it — a person or "system" (§24 audit grammar). */
  creatorName?: string;
  /** Preformatted creation time, e.g. "7 Aug 2026, 14:45 UTC". */
  createdAt: string;
  /** Where to review or manage the key. */
  actionUrl?: string;
  heading?: string;
  body?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  securityNote?: string;
  /** Row labels for the details table. */
  labels?: { scopes?: string; creator?: string; createdAt?: string };
}

/**
 * Confirms a newly created API key with its name, scopes and creator — a
 * factual record, not an alert. The secret itself never appears here.
 */
export function ApiKeyCreatedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  keyName,
  scopes,
  creatorName,
  createdAt,
  actionUrl,
  heading = "API key created",
  body,
  ctaLabel = "Manage API keys",
  securityNote = "If you did not create this key, revoke it and contact support immediately.",
  labels,
}: ApiKeyCreatedEmailProps) {
  const resolvedBody =
    body ??
    `The API key ${keyName} was created${creatorName ? ` by ${creatorName}` : ""}.`;
  const items: EmailKeyValueItem[] = [];
  if (scopes && scopes.length > 0) {
    items.push({ label: labels?.scopes ?? "Scopes", value: scopes.join(", ") });
  }
  if (creatorName) {
    items.push({ label: labels?.creator ?? "Created by", value: creatorName });
  }
  items.push({ label: labels?.createdAt ?? "Created", value: createdAt });
  return (
    <EmailLayout theme={theme} title={heading} preheader={preheader ?? `${keyName} was created`}>
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      <EmailKeyValue items={items} />
      {actionUrl ? (
        <EmailButton href={actionUrl} variant="secondary">
          {ctaLabel}
        </EmailButton>
      ) : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
