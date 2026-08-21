import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Resource-share notification (§27 Operaciones group; mirrors the in-app
 * "Nuevo enlace compartido" pattern of §13/§29): names the resource, who
 * shared it, and when the link expires.
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * "{resource} was shared with you": who shared it and the link's expiry as
 * facts, then the CTA into the resource with its plain-URL fallback.
 */
export function ResourceSharedEmail({ theme, recipientName, greeting, preheader, resourceName, resourceType, sharerName, sharerEmail, shareUrl, expiresAt, heading, body, ctaLabel, securityNote = "If you were not expecting this, ignore this message.", fallbackLabel, labels, }) {
    const type = resourceType ?? "resource";
    const resolvedHeading = heading ?? `${resourceName} was shared with you`;
    const sharer = sharerName
        ? `${sharerName}${sharerEmail ? ` (${sharerEmail})` : ""}`
        : undefined;
    const resolvedBody = body ??
        `${sharer ?? "Someone"} shared the ${type} ${resourceName} with you on ${theme.productName}.`;
    const items = [];
    if (sharer)
        items.push({ label: labels?.sharedBy ?? "Shared by", value: sharer });
    if (expiresAt)
        items.push({ label: labels?.expires ?? "Expires", value: expiresAt });
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? resolvedHeading, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: resolvedBody }), items.length > 0 ? _jsx(EmailKeyValue, { items: items }) : null, _jsx(EmailButton, { href: shareUrl, children: ctaLabel ?? `Open ${type}` }), _jsx(FallbackUrl, { url: shareUrl, label: fallbackLabel }), _jsx(EmailMuted, { children: securityNote })] }));
}
