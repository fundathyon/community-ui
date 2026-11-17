import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Email-address verification: one CTA plus a plain-URL fallback.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * "Verify your email" message. One clear CTA; the fallback URL keeps the
 * flow alive when the button is stripped by the client.
 */
export function EmailVerificationEmail({ theme, recipientName, greeting, preheader, verifyUrl, expiresHours, heading = "Verify your email", body = "Confirm this email address to activate your account.", ctaLabel = "Verify email", expiresText, securityNote = "If you did not create an account, ignore this message.", fallbackLabel, }) {
    const expires = expiresText ??
        (expiresHours !== undefined
            ? `This link expires in ${expiresHours} hours.`
            : undefined);
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `Verify your email for ${theme.productName}`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: body }), _jsx(EmailButton, { href: verifyUrl, children: ctaLabel }), _jsx(FallbackUrl, { url: verifyUrl, label: fallbackLabel }), expires ? _jsx(EmailMuted, { children: expires }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
