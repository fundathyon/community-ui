import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Password-changed confirmation (§27 Autenticación group).
 */
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Confirms a completed password change with time/IP facts. The CTA is
 * secondary: for most recipients this email requires no action.
 */
export function PasswordChangedEmail({ theme, recipientName, greeting, preheader, time, ip, supportUrl, heading = "Your password was changed", body, note = "If you did not make this change, reset your password and contact support immediately.", supportLabel = "Contact support", headerMeta = "Security", labels, }) {
    const resolvedBody = body ?? `The password for your ${theme.productName} account was changed.`;
    const items = [
        { label: labels?.time ?? "Time", value: time },
    ];
    if (ip)
        items.push({ label: labels?.ip ?? "IP", value: ip });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? heading, header: _jsx(EmailHeader, { meta: headerMeta }), children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: resolvedBody }), _jsx(EmailKeyValue, { items: items }), _jsx(EmailText, { children: note }), supportUrl ? (_jsx(EmailButton, { href: supportUrl, variant: "secondary", children: supportLabel })) : null] }));
}
