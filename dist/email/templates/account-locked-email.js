import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Account-locked notification (§27 Autenticación group; §23 "Tras 5
 * intentos, Locked con plazo explícito, jamás un error desconocido"). States
 * the attempt count and an explicit unlock deadline — never a vague "later".
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting } from "./shared";
/**
 * Account-locked email: warning tone (§19 — Locked is reversible by an
 * admin, not a failure), the attempt count and an explicit unlock deadline
 * in the facts table, and an optional recovery action.
 */
export function AccountLockedEmail({ theme, recipientName, greeting, preheader, attempts, unlockMinutes, unlockText, ip, heading = "Account locked", body = "Your account was locked after too many failed sign-in attempts.", actionUrl, ctaLabel = "Reset password", headerMeta = "Security", securityNote = "If this was not you, reset your password once the lock lifts to keep your account secure.", labels, }) {
    const unlock = unlockText ?? `In ${unlockMinutes} minutes.`;
    const items = [
        { label: labels?.attempts ?? "Failed attempts", value: String(attempts) },
    ];
    if (ip)
        items.push({ label: labels?.ip ?? "IP", value: ip });
    items.push({ label: labels?.unlock ?? "Unlocks", value: unlock });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? heading, header: _jsx(EmailHeader, { meta: headerMeta }), children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "warning", title: `${attempts} failed attempts`, children: body }), _jsx(EmailKeyValue, { items: items }), actionUrl ? _jsx(EmailButton, { href: actionUrl, children: ctaLabel }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
