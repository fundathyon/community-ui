import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Organization invitation (§27 Organización group — accent-toned CTA).
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * "Join {organization}" invitation. The default body names inviter, email,
 * organization and role so the recipient can judge legitimacy before clicking.
 */
export function InvitationEmail({ theme, recipientName, greeting, preheader, inviterName, inviterEmail, organizationName, role, acceptUrl, expiresDays, heading, body, ctaLabel = "Accept invitation", expiresText, securityNote = "If you were not expecting this invitation, ignore this message.", fallbackLabel, }) {
    const resolvedHeading = heading ?? `Join ${organizationName}`;
    const resolvedBody = body ??
        `${inviterName}${inviterEmail ? ` (${inviterEmail})` : ""} invited you to join ${organizationName}${role ? ` as ${role}` : ""} on ${theme.productName}.`;
    const expires = expiresText ??
        (expiresDays !== undefined
            ? `This invitation expires in ${expiresDays} days.`
            : undefined);
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? `${inviterName} invited you to ${organizationName}`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: resolvedBody }), _jsx(EmailButton, { href: acceptUrl, children: ctaLabel }), _jsx(FallbackUrl, { url: acceptUrl, label: fallbackLabel }), expires ? _jsx(EmailMuted, { children: expires }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
