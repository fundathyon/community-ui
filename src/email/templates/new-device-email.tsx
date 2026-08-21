/**
 * New-device notification (§27 Seguridad group; §23 "Sesiones y
 * dispositivos" — Dispositivo nuevo). Distinct from `NewLoginEmail` (frames
 * a sign-in event) and `SecurityAlertEmail` (generic event): this one is
 * framed around the device itself — name, system, browser — so the
 * recipient can recognize or reject it as a fact about their account, not
 * about a single sign-in.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface NewDeviceEmailProps extends EmailTemplateBaseProps {
  /** Device name/model, e.g. "iPhone 15", "MacBook Pro". */
  deviceName: string;
  /** Operating system, e.g. "iOS 18". */
  os?: string;
  browser?: string;
  ip: string;
  /** Approximate location, e.g. "Madrid, ES". */
  location?: string;
  /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
  time: string;
  /** Where the user confirms/trusts this device. Primary CTA. */
  trustUrl?: string;
  /** Where the user reports the device as unrecognized. Secondary CTA. */
  reportUrl?: string;
  heading?: string;
  body?: string;
  /** Primary CTA label — verb + object (§17). */
  trustLabel?: string;
  /** Secondary CTA label — verb + object (§17). */
  reportLabel?: string;
  alertTitle?: string;
  /** Right-side header meta. Defaults to "Security". */
  headerMeta?: string;
  wasMeHint?: string;
  /** Row labels for the details table. */
  labels?: {
    device?: string;
    os?: string;
    browser?: string;
    ip?: string;
    location?: string;
    time?: string;
  };
}

/**
 * New-device email: warning tone (§23 — an unrecognized device is not yet
 * known to be an attack), the device identity and origin facts in a table,
 * and the two device-level actions: trust it, or report it as not theirs.
 */
export function NewDeviceEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  deviceName,
  os,
  browser,
  ip,
  location,
  time,
  trustUrl,
  reportUrl,
  heading = "New device on your account",
  body = "This device was used to access your account for the first time.",
  trustLabel = "Trust this device",
  reportLabel = "Report device",
  alertTitle = "New device detected",
  headerMeta = "Security",
  wasMeHint = "If this was you, no action is needed — the device is now recognized.",
  labels,
}: NewDeviceEmailProps) {
  const items: EmailKeyValueItem[] = [
    { label: labels?.device ?? "Device", value: deviceName },
  ];
  if (os) items.push({ label: labels?.os ?? "System", value: os });
  if (browser) items.push({ label: labels?.browser ?? "Browser", value: browser });
  items.push({ label: labels?.ip ?? "IP", value: ip });
  if (location) items.push({ label: labels?.location ?? "Location", value: location });
  items.push({ label: labels?.time ?? "Time", value: time });
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? `New device: ${deviceName}`}
      header={<EmailHeader meta={headerMeta} />}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="warning" title={alertTitle}>
        {body}
      </EmailAlert>
      <EmailKeyValue items={items} />
      {trustUrl ? <EmailButton href={trustUrl}>{trustLabel}</EmailButton> : null}
      {reportUrl ? (
        <EmailButton href={reportUrl} variant="secondary">
          {reportLabel}
        </EmailButton>
      ) : null}
      <EmailMuted>{wasMeHint}</EmailMuted>
    </EmailLayout>
  );
}
