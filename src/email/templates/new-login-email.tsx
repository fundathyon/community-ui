/**
 * New sign-in notification (§27 "Alerta de seguridad" exemplar): warning
 * alert, device/IP/time table, review action, "if this was you" hint.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface NewLoginEmailProps extends EmailTemplateBaseProps {
  /** Device/OS, e.g. "Linux". */
  device: string;
  /** Browser or client, e.g. "Firefox 129". */
  browser?: string;
  ip: string;
  /** Approximate location, e.g. "Madrid, ES". */
  location?: string;
  /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
  time: string;
  /** Where the user reviews sessions / repudiates the sign-in. */
  reviewUrl?: string;
  /** Reassurance line. Defaults to "If this was you, no action is needed." */
  wasMeHint?: string;
  heading?: string;
  /** Alert body — the event described as a fact. */
  body?: string;
  /** CTA label — verb + object (§17). */
  actionLabel?: string;
  /** Alert title line. */
  alertTitle?: string;
  /** Right-side header meta. Defaults to "Security". */
  headerMeta?: string;
  /** Row labels for the details table. */
  labels?: {
    device?: string;
    browser?: string;
    ip?: string;
    location?: string;
    time?: string;
  };
}

/**
 * New-login email: warning tone (nothing failed — attention required),
 * mandatory device/IP/time facts, and a review CTA. The hint states the
 * safe outcome: if it was the user, doing nothing is correct.
 */
export function NewLoginEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  device,
  browser,
  ip,
  location,
  time,
  reviewUrl,
  wasMeHint = "If this was you, no action is needed.",
  heading = "New sign-in to your account",
  body = "Your account was accessed from a device we do not recognize.",
  actionLabel = "Review activity",
  alertTitle = "New sign-in detected",
  headerMeta = "Security",
  labels,
}: NewLoginEmailProps) {
  const items: EmailKeyValueItem[] = [
    {
      label: labels?.device ?? "Device",
      value: browser ? `${browser} · ${device}` : device,
    },
    { label: labels?.ip ?? "IP", value: ip },
  ];
  if (location) items.push({ label: labels?.location ?? "Location", value: location });
  items.push({ label: labels?.time ?? "Time", value: time });
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? `New sign-in from ${device}`}
      header={<EmailHeader meta={headerMeta} />}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="warning" title={alertTitle}>
        {body}
      </EmailAlert>
      <EmailKeyValue items={items} />
      {reviewUrl ? <EmailButton href={reviewUrl}>{actionLabel}</EmailButton> : null}
      <EmailMuted>{wasMeHint}</EmailMuted>
    </EmailLayout>
  );
}
