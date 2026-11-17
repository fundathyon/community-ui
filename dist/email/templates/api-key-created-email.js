import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * API-key-created confirmation (§27 Credenciales group). Never includes the
 * key's secret value — only its name (§20: a secret is shown in full once,
 * at creation, in-product; email never carries it).
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Confirms a newly created API key with its name, scopes and creator — a
 * factual record, not an alert. The secret itself never appears here.
 */
export function ApiKeyCreatedEmail({ theme, recipientName, greeting, preheader, keyName, scopes, creatorName, createdAt, actionUrl, heading = "API key created", body, ctaLabel = "Manage API keys", securityNote = "If you did not create this key, revoke it and contact support immediately.", labels, }) {
    const resolvedBody = body ??
        `The API key ${keyName} was created${creatorName ? ` by ${creatorName}` : ""}.`;
    const items = [];
    if (scopes && scopes.length > 0) {
        items.push({ label: labels?.scopes ?? "Scopes", value: scopes.join(", ") });
    }
    if (creatorName) {
        items.push({ label: labels?.creator ?? "Created by", value: creatorName });
    }
    items.push({ label: labels?.createdAt ?? "Created", value: createdAt });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `${keyName} was created`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: resolvedBody }), _jsx(EmailKeyValue, { items: items }), actionUrl ? (_jsx(EmailButton, { href: actionUrl, variant: "secondary", children: ctaLabel })) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
