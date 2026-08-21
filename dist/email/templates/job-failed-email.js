import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Job-failure notification (§27 Operaciones group, Cronify domain; §19
 * "Failed danger · x — Obligatorio ofrecer causa y reintento"): danger tone,
 * the failure cause as a required fact, and retry guidance.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Job-failed email: danger tone, the job name and cause up front, technical
 * facts (schedule, exit info, time) in a table, and a retry action.
 */
export function JobFailedEmail({ theme, recipientName, greeting, preheader, jobName, schedule, reason, exitInfo, failedAt, retryUrl, heading = "Job failed", alertTitle, ctaLabel = "Retry job", retryNote = "Fix the underlying issue and retry the job, or wait for the next scheduled run.", labels, }) {
    const items = [];
    if (schedule)
        items.push({ label: labels?.schedule ?? "Schedule", value: schedule });
    if (exitInfo)
        items.push({ label: labels?.exitInfo ?? "Exit", value: exitInfo });
    items.push({ label: labels?.failedAt ?? "Failed", value: failedAt });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `${jobName} failed`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "danger", title: alertTitle ?? `${jobName} failed`, children: reason }), _jsx(EmailKeyValue, { items: items }), retryUrl ? _jsx(EmailButton, { href: retryUrl, children: ctaLabel }) : null, _jsx(EmailMuted, { children: retryNote })] }));
}
