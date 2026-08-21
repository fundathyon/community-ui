/**
 * Generic security event notification (§27 Seguridad group): danger alert,
 * event details table, one action.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface SecurityAlertEmailProps extends EmailTemplateBaseProps {
  /** What happened, stated as a fact ("API key revoked"). */
  eventTitle: string;
  eventDescription?: string;
  /** Event facts — device, IP, time. §27 makes these mandatory for security emails. */
  details: EmailKeyValueItem[];
  /** Where the user reviews or repudiates the event. */
  actionUrl?: string;
  /** CTA label — verb + object (§17). */
  actionLabel?: string;
  heading?: string;
  /** Right-side header meta. Defaults to "Security". */
  headerMeta?: string;
  securityNote?: string;
}

/**
 * Security alert: the event in a danger alert, the facts in a two-column
 * table, and the urgent action as the primary CTA (§27 — if it was the
 * user, no action is needed; the button serves everyone else).
 */
export function SecurityAlertEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  eventTitle,
  eventDescription,
  details,
  actionUrl,
  actionLabel = "Review activity",
  heading = "Security alert",
  headerMeta = "Security",
  securityNote = "If you do not recognize this activity, secure your account immediately.",
}: SecurityAlertEmailProps) {
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? eventTitle}
      header={<EmailHeader meta={headerMeta} />}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="danger" title={eventTitle}>
        {eventDescription}
      </EmailAlert>
      <EmailKeyValue items={details} />
      {actionUrl ? <EmailButton href={actionUrl}>{actionLabel}</EmailButton> : null}
      <EmailMuted>{securityNote}</EmailMuted>
    </EmailLayout>
  );
}
