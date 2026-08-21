/**
 * Job-failure notification (§27 Operaciones group, Cronify domain; §19
 * "Failed danger · x — Obligatorio ofrecer causa y reintento"): danger tone,
 * the failure cause as a required fact, and retry guidance.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface JobFailedEmailProps extends EmailTemplateBaseProps {
  /** Job name ("rotate-credentials"). */
  jobName: string;
  /** Cron schedule, e.g. "0 3 1 * *". */
  schedule?: string;
  /** Why it failed, stated as fact — required (§19: a Failed state always offers a cause, never an unexplained error). */
  reason: string;
  /** Process exit code or short technical detail, e.g. "exit 1". */
  exitInfo?: string;
  /** Preformatted failure time, e.g. "21 Aug 2026, 09:14 UTC". */
  failedAt: string;
  /** Where to view logs or retry the job. */
  retryUrl?: string;
  heading?: string;
  alertTitle?: string;
  /** CTA label — verb + object (§17). */
  ctaLabel?: string;
  /** Retry guidance line. Always rendered (§19). */
  retryNote?: string;
  /** Row labels for the details table. */
  labels?: { schedule?: string; exitInfo?: string; failedAt?: string };
}

/**
 * Job-failed email: danger tone, the job name and cause up front, technical
 * facts (schedule, exit info, time) in a table, and a retry action.
 */
export function JobFailedEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  jobName,
  schedule,
  reason,
  exitInfo,
  failedAt,
  retryUrl,
  heading = "Job failed",
  alertTitle,
  ctaLabel = "Retry job",
  retryNote = "Fix the underlying issue and retry the job, or wait for the next scheduled run.",
  labels,
}: JobFailedEmailProps) {
  const items: EmailKeyValueItem[] = [];
  if (schedule) items.push({ label: labels?.schedule ?? "Schedule", value: schedule });
  if (exitInfo) items.push({ label: labels?.exitInfo ?? "Exit", value: exitInfo });
  items.push({ label: labels?.failedAt ?? "Failed", value: failedAt });
  return (
    <EmailLayout theme={theme} title={heading} preheader={preheader ?? `${jobName} failed`}>
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailAlert tone="danger" title={alertTitle ?? `${jobName} failed`}>
        {reason}
      </EmailAlert>
      <EmailKeyValue items={items} />
      {retryUrl ? <EmailButton href={retryUrl}>{ctaLabel}</EmailButton> : null}
      <EmailMuted>{retryNote}</EmailMuted>
    </EmailLayout>
  );
}
