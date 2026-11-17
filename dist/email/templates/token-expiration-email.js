import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Access-token expiry warning (§27 Credenciales group). Never includes the
 * credential value — only its name.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Warns that a named token expires soon: warning tone (nothing failed yet),
 * the concrete consequence, and a renew CTA.
 */
export function TokenExpirationEmail({ theme, recipientName, greeting, preheader, tokenName, expiresAt, renewUrl, heading, body, alertText = "Requests authenticated with this token will fail after it expires.", ctaLabel = "Renew token", }) {
    const resolvedHeading = heading ?? `${tokenName} expires soon`;
    const resolvedBody = body ?? `The access token ${tokenName} expires on ${expiresAt}.`;
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? `${tokenName} expires on ${expiresAt}`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: resolvedBody }), _jsx(EmailAlert, { tone: "warning", children: alertText }), renewUrl ? _jsx(EmailButton, { href: renewUrl, children: ctaLabel }) : null] }));
}
