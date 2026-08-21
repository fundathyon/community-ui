import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * One-time verification code email (§27 "Código de verificación").
 */
import { EmailCode } from "../email-code";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting } from "./shared";
/**
 * OTP email: the code is the single large element of the message. Includes
 * the mandatory security note and, when given, the requesting device/IP.
 */
export function OtpEmail({ theme, recipientName, greeting, preheader, code, expiresMinutes, requestContext, heading = "Your verification code", body = "Enter this code to continue.", expiresText, securityNote, labels, }) {
    const expires = expiresText ??
        (expiresMinutes !== undefined
            ? `Expires in ${expiresMinutes} minutes.`
            : undefined);
    const note = securityNote ??
        `If you did not request this code, ignore this message. No one from ${theme.productName} will ever ask you for it.`;
    const items = [];
    if (requestContext?.device) {
        items.push({ label: labels?.device ?? "Device", value: requestContext.device });
    }
    if (requestContext?.ip) {
        items.push({ label: labels?.ip ?? "IP", value: requestContext.ip });
    }
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `${code} is your ${theme.productName} verification code`, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailText, { children: body }), _jsx(EmailCode, { code: code, expiresText: expires }), items.length > 0 ? _jsx(EmailKeyValue, { items: items }) : null, _jsx(EmailMuted, { children: note })] }));
}
