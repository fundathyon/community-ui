import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Generic invitation (§27 Organización group; T04 "Aceptar invitación"
 * pattern): invited to a named target with an itemized access breakdown and
 * an explicit accept/decline choice. Distinct from `InvitationEmail`, which
 * is organization-specific (`organizationName`, a single `role`, accept-only)
 * — keep the two separate rather than merging them back into one template.
 */
import { EmailButton } from "../email-button";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * "You are invited to {target}" — states exactly what access is granted,
 * item by item, before the recipient accepts (T04). The only one of the
 * three Organización invites with a decline action alongside accept.
 */
export function GenericInvitationEmail({ theme, recipientName, greeting, preheader, inviterName, inviterEmail, targetName, role, access, acceptUrl, declineUrl, expiresDays, heading, body, ctaLabel = "Accept invitation", declineLabel = "Decline", expiresText, securityNote = "If you were not expecting this invitation, ignore this message.", fallbackLabel, }) {
    const resolvedHeading = heading ?? `You are invited to ${targetName}`;
    const resolvedBody = body ??
        `${inviterName}${inviterEmail ? ` (${inviterEmail})` : ""} invited you to ${targetName}${role ? ` as ${role}` : ""} on ${theme.productName}.`;
    const expires = expiresText ??
        (expiresDays !== undefined
            ? `This invitation expires in ${expiresDays} days.`
            : undefined);
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? `${inviterName} invited you to ${targetName}`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: resolvedBody }), access && access.length > 0 ? _jsx(EmailKeyValue, { items: access }) : null, _jsx(EmailButton, { href: acceptUrl, children: ctaLabel }), declineUrl ? (_jsx(EmailButton, { href: declineUrl, variant: "secondary", children: declineLabel })) : null, _jsx(FallbackUrl, { url: acceptUrl, label: fallbackLabel }), expires ? _jsx(EmailMuted, { children: expires }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
