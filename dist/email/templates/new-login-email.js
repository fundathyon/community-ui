import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * New sign-in notification (§27 "Alerta de seguridad" exemplar): warning
 * alert, device/IP/time table, review action, "if this was you" hint.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting } from "./shared";
/**
 * New-login email: warning tone (nothing failed — attention required),
 * mandatory device/IP/time facts, and a review CTA. The hint states the
 * safe outcome: if it was the user, doing nothing is correct.
 */
export function NewLoginEmail({ theme, recipientName, greeting, preheader, device, browser, ip, location, time, reviewUrl, wasMeHint = "If this was you, no action is needed.", heading = "New sign-in to your account", body = "Your account was accessed from a device we do not recognize.", actionLabel = "Review activity", alertTitle = "New sign-in detected", headerMeta = "Security", labels, }) {
    const items = [
        {
            label: labels?.device ?? "Device",
            value: browser ? `${browser} · ${device}` : device,
        },
        { label: labels?.ip ?? "IP", value: ip },
    ];
    if (location)
        items.push({ label: labels?.location ?? "Location", value: location });
    items.push({ label: labels?.time ?? "Time", value: time });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `New sign-in from ${device}`, header: _jsx(EmailHeader, { meta: headerMeta }), children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "warning", title: alertTitle, children: body }), _jsx(EmailKeyValue, { items: items }), reviewUrl ? _jsx(EmailButton, { href: reviewUrl, children: actionLabel }) : null, _jsx(EmailMuted, { children: wasMeHint })] }));
}
