import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Passwordless sign-in link.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * Magic-link email: sign in with one click, no password. States that the
 * link is single-use; the note covers the unrequested case.
 */
export function MagicLinkEmail({ theme, recipientName, greeting, preheader, loginUrl, expiresMinutes, heading, body = "Use the button below to sign in. The link works once.", ctaLabel = "Sign in", expiresText, securityNote = "If you did not request this link, ignore this message.", fallbackLabel, }) {
    const resolvedHeading = heading ?? `Sign in to ${theme.productName}`;
    const expires = expiresText ??
        (expiresMinutes !== undefined
            ? `This link expires in ${expiresMinutes} minutes.`
            : undefined);
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? `Your ${theme.productName} sign-in link`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: body }), _jsx(EmailButton, { href: loginUrl, children: ctaLabel }), _jsx(FallbackUrl, { url: loginUrl, label: fallbackLabel }), expires ? _jsx(EmailMuted, { children: expires }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
