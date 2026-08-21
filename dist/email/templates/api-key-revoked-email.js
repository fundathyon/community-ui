import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * API-key-revoked confirmation (§27 Credenciales group). Factual and calm
 * (§25 tone) — revocation is often a deliberate admin action, not an
 * incident, so this stays a record rather than an alarm.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Confirms a revoked API key: who revoked it and when, plus the concrete
 * consequence in a neutral (not danger) alert — matter-of-fact, since this
 * is frequently intentional (§25).
 */
export function ApiKeyRevokedEmail({ theme, recipientName, greeting, preheader, keyName, revokerName, revokedAt, consequence = "Requests authenticated with this key are rejected within 30 seconds.", actionUrl, heading = "API key revoked", body, ctaLabel = "Manage API keys", note = "If you did not expect this, contact your organization admin.", labels, }) {
    const resolvedBody = body ??
        `The API key ${keyName} was revoked${revokerName ? ` by ${revokerName}` : ""}.`;
    const items = [];
    if (revokerName) {
        items.push({ label: labels?.revoker ?? "Revoked by", value: revokerName });
    }
    items.push({ label: labels?.revokedAt ?? "Revoked", value: revokedAt });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `${keyName} was revoked`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: resolvedBody }), _jsx(EmailKeyValue, { items: items }), consequence ? _jsx(EmailAlert, { tone: "info", children: consequence }) : null, actionUrl ? (_jsx(EmailButton, { href: actionUrl, variant: "secondary", children: ctaLabel })) : null, _jsx(EmailMuted, { children: note })] }));
}
