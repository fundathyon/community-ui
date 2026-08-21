/**
 * Account-locked notification (§27 Autenticación group; §23 "Tras 5
 * intentos, Locked con plazo explícito, jamás un error desconocido"). States
 * the attempt count and an explicit unlock deadline — never a vague "later".
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface AccountLockedEmailProps extends EmailTemplateBaseProps {
  /** Failed sign-in attempts that triggered the lock. */
  attempts: number;
  /** Minutes until the lock lifts. Required — §23 mandates an explicit deadline, never an unknown-duration lockout. */
  unlockMinutes: number;
  /** Full unlock line; overrides the `unlockMinutes` default (e.g. an absolute time: "Unlocks at 14:30 UTC"). */
  unlockText?: string;
  /** IP address the failed attempts came from. */
  ip?: string;
  heading?: string;
  body?: string;
  /** Where to recover access sooner, e.g. a password reset. */
  actionUrl?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Right-side header meta. Defaults to "Security". */
  headerMeta?: string;
  securityNote?: string;
  /** Row labels for the details table. */
  labels?: { attempts?: string; ip?: string; unlock?: string };
}

/**
 * Account-locked email: warning tone (§19 — Locked is reversible by an
 * admin, not a failure), the attempt count and an explicit unlock deadline
 * in the facts table, and an optional recovery action.
 */
export function AccountLockedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  attempts,
  unlockMinutes,
  unlockText,
  ip,
  heading = "Account locked",
  body = "Your account was locked after too many failed sign-in attempts.",
  actionUrl,
  ctaLabel = "Reset password",
  headerMeta = "Security",
  securityNote = "If this was not you, reset your password once the lock lifts to keep your account secure.",
  labels,
}: AccountLockedEmailProps) {
  const unlock = unlockText ?? `In ${unlockMinutes} minutes.`;
  const items: EmailKeyValueItem[] = [
    { label: labels?.attempts ?? "Failed attempts", value: String(attempts) },
  ];
  if (ip) items.push({ label: labels?.ip ?? "IP", value: ip });
  items.push({ label: labels?.unlock ?? "Unlocks", value: unlock });
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? heading}
      header={<EmailHeader meta={headerMeta} />}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="warning" title={`${attempts} failed attempts`}>
        {body}
      </EmailAlert>
      <EmailKeyValue items={items} />
      {actionUrl ? <EmailButton href={actionUrl}>{ctaLabel}</EmailButton> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
