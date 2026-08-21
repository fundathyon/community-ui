import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Generic security event notification (§27 Seguridad group): danger alert,
 * event details table, one action.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Security alert: the event in a danger alert, the facts in a two-column
 * table, and the urgent action as the primary CTA (§27 — if it was the
 * user, no action is needed; the button serves everyone else).
 */
export function SecurityAlertEmail({ theme, recipientName, greeting, preheader, eventTitle, eventDescription, details, actionUrl, actionLabel = "Review activity", heading = "Security alert", headerMeta = "Security", securityNote = "If you do not recognize this activity, secure your account immediately.", }) {
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? eventTitle, header: _jsx(EmailHeader, { meta: headerMeta }), children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "danger", title: eventTitle, children: eventDescription }), _jsx(EmailKeyValue, { items: details }), actionUrl ? _jsx(EmailButton, { href: actionUrl, children: actionLabel }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
