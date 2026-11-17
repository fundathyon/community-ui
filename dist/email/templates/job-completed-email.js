import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Job-completed confirmation (§27 Operaciones group, Cronify domain).
 * Product-behavior note: per the design spec, this is sent only when the
 * user explicitly opted in to be notified for this run — routine successes
 * never generate an email on their own.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Job-completed email: success tone, the run facts (schedule, duration,
 * time) in a table, and an optional link to the job. Opt-in only — see the
 * file-level note; nothing in this component enforces that, it is a
 * consumer contract.
 */
export function JobCompletedEmail({ theme, recipientName, greeting, preheader, jobName, schedule, completedAt, duration, body, actionUrl, heading = "Job completed", alertTitle, ctaLabel = "View job", labels, }) {
    const items = [];
    if (schedule)
        items.push({ label: labels?.schedule ?? "Schedule", value: schedule });
    if (duration)
        items.push({ label: labels?.duration ?? "Duration", value: duration });
    items.push({ label: labels?.completedAt ?? "Completed", value: completedAt });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `${jobName} completed`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "success", title: alertTitle ?? `${jobName} completed`, children: body }), _jsx(EmailKeyValue, { items: items }), actionUrl ? (_jsx(EmailButton, { href: actionUrl, variant: "secondary", children: ctaLabel })) : null] }));
}
