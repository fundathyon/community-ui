import { type EmailTemplateBaseProps } from "./shared";
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
    labels?: {
        schedule?: string;
        exitInfo?: string;
        failedAt?: string;
    };
}
/**
 * Job-failed email: danger tone, the job name and cause up front, technical
 * facts (schedule, exit info, time) in a table, and a retry action.
 */
export declare function JobFailedEmail({ theme, recipientName, greeting, preheader, jobName, schedule, reason, exitInfo, failedAt, retryUrl, heading, alertTitle, ctaLabel, retryNote, labels, }: JobFailedEmailProps): import("react").JSX.Element;
