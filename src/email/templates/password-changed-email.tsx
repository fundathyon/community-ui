/**
 * Password-changed confirmation (§27 Autenticación group).
 */
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface PasswordChangedEmailProps extends EmailTemplateBaseProps {
  /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
  time: string;
  ip?: string;
  /** Where to go when the change was not the user's — support or recovery. */
  supportUrl?: string;
  heading?: string;
  body?: string;
  /** The "if this wasn't you" instruction. Always rendered. */
  note?: string;
  /** Secondary CTA label — verb + object (§17). */
  supportLabel?: string;
  /** Right-side header meta. Defaults to "Security". */
  headerMeta?: string;
  /** Row labels for the details table. */
  labels?: { time?: string; ip?: string };
}

/**
 * Confirms a completed password change with time/IP facts. The CTA is
 * secondary: for most recipients this email requires no action.
 */
export function PasswordChangedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  time,
  ip,
  supportUrl,
  heading = "Your password was changed",
  body,
  note = "If you did not make this change, reset your password and contact support immediately.",
  supportLabel = "Contact support",
  headerMeta = "Security",
  labels,
}: PasswordChangedEmailProps) {
  const resolvedBody =
    body ?? `The password for your ${theme.productName} account was changed.`;
  const items: EmailKeyValueItem[] = [
    { label: labels?.time ?? "Time", value: time },
  ];
  if (ip) items.push({ label: labels?.ip ?? "IP", value: ip });
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? heading}
      header={<EmailHeader meta={headerMeta} />}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{resolvedBody}</EmailText>
      <EmailKeyValue items={items} />
      <EmailText>{note}</EmailText>
      {supportUrl ? (
        <EmailButton href={supportUrl} variant="secondary">
          {supportLabel}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
}
