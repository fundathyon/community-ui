import { type EmailTemplateBaseProps } from "./shared";
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
    labels?: {
        schedule?: string;
        duration?: string;
        completedAt?: string;
    };
}
/**
 * Job-completed email: success tone, the run facts (schedule, duration,
 * time) in a table, and an optional link to the job. Opt-in only — see the
 * file-level note; nothing in this component enforces that, it is a
 * consumer contract.
 */
export declare function JobCompletedEmail({ theme, recipientName, greeting, preheader, jobName, schedule, completedAt, duration, body, actionUrl, heading, alertTitle, ctaLabel, labels, }: JobCompletedEmailProps): import("react").JSX.Element;
