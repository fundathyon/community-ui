/**
 * Job-completed confirmation (§27 Operaciones group, Cronify domain).
 * Product-behavior note: per the design spec, this is sent only when the
 * user explicitly opted in to be notified for this run — routine successes
 * never generate an email on their own.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface JobCompletedEmailProps extends EmailTemplateBaseProps {
  /** Job name ("cleanup-orphans"). */
  jobName: string;
  /** Cron schedule, e.g. "0 0 * * 0". */
  schedule?: string;
  /** Preformatted completion time, e.g. "21 Aug 2026, 09:14 UTC". */
  completedAt: string;
  /** Run duration in readable units, e.g. "1 m 42 s" — never raw milliseconds. */
  duration?: string;
  /** Extra detail inside the confirmation, e.g. "142 rows cleaned". */
  body?: string;
  /** Where to view the job or its logs. */
  actionUrl?: string;
  heading?: string;
  alertTitle?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Row labels for the details table. */
  labels?: { schedule?: string; duration?: string; completedAt?: string };
}

/**
 * Job-completed email: success tone, the run facts (schedule, duration,
 * time) in a table, and an optional link to the job. Opt-in only — see the
 * file-level note; nothing in this component enforces that, it is a
 * consumer contract.
 */
export function JobCompletedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  jobName,
  schedule,
  completedAt,
  duration,
  body,
  actionUrl,
  heading = "Job completed",
  alertTitle,
  ctaLabel = "View job",
  labels,
}: JobCompletedEmailProps) {
  const items: EmailKeyValueItem[] = [];
  if (schedule) items.push({ label: labels?.schedule ?? "Schedule", value: schedule });
  if (duration) items.push({ label: labels?.duration ?? "Duration", value: duration });
  items.push({ label: labels?.completedAt ?? "Completed", value: completedAt });
  return (
    <EmailLayout theme={theme} title={heading} preheader={preheader ?? `${jobName} completed`}>
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="success" title={alertTitle ?? `${jobName} completed`}>
        {body}
      </EmailAlert>
      <EmailKeyValue items={items} />
      {actionUrl ? (
        <EmailButton href={actionUrl} variant="secondary">
          {ctaLabel}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
}
