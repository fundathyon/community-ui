import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Password reset request: CTA + fallback URL + "didn't request this" note.
 */
import { EmailButton } from "../email-button";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { FallbackUrl, Greeting } from "./shared";
/**
 * "Reset your password" message. The security note states the safe outcome
 * of doing nothing — the §17 voice: direct, no apologies, no alarm.
 */
export function PasswordResetEmail({ theme, recipientName, greeting, preheader, resetUrl, expiresMinutes, heading = "Reset your password", body = "A password reset was requested for your account. Set a new password with the button below.", ctaLabel = "Reset password", expiresText, securityNote = "If you did not request a password reset, ignore this message. Your password remains unchanged.", fallbackLabel, }) {
    const expires = expiresText ??
        (expiresMinutes !== undefined
            ? `This link expires in ${expiresMinutes} minutes.`
            : undefined);
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `Reset your ${theme.productName} password`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: body }), _jsx(EmailButton, { href: resetUrl, children: ctaLabel }), _jsx(FallbackUrl, { url: resetUrl, label: fallbackLabel }), expires ? _jsx(EmailMuted, { children: expires }) : null, _jsx(EmailMuted, { children: securityNote })] }));
}
