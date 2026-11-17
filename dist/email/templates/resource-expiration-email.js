import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Generic resource expiry warning (§27 Operaciones "Recurso por caducar").
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Warns that a named resource expires soon. Warning tone; the optional
 * `consequence` states the concrete effect ("Scheduled jobs stop running").
 */
export function ResourceExpirationEmail({ theme, recipientName, greeting, preheader, resourceName, resourceType, expiresAt, renewUrl, consequence, heading, body, ctaLabel, }) {
    const type = resourceType ?? "resource";
    const resolvedHeading = heading ?? `${resourceName} expires soon`;
    const resolvedBody = body ?? `The ${type} ${resourceName} expires on ${expiresAt}.`;
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? `${resourceName} expires on ${expiresAt}`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: resolvedBody }), consequence ? _jsx(EmailAlert, { tone: "warning", children: consequence }) : null, renewUrl ? (_jsx(EmailButton, { href: renewUrl, children: ctaLabel ?? `Renew ${type}` })) : null] }));
}
