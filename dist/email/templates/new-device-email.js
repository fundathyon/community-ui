import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * New-device notification (§27 Seguridad group; §23 "Sesiones y
 * dispositivos" — Dispositivo nuevo). Distinct from `NewLoginEmail` (frames
 * a sign-in event) and `SecurityAlertEmail` (generic event): this one is
 * framed around the device itself — name, system, browser — so the
 * recipient can recognize or reject it as a fact about their account, not
 * about a single sign-in.
 */
import { EmailAlert } from "../email-alert";
import { EmailButton } from "../email-button";
import { EmailHeader } from "../email-header";
import { EmailKeyValue } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted } from "../email-typography";
import { Greeting } from "./shared";
/**
 * New-device email: warning tone (§23 — an unrecognized device is not yet
 * known to be an attack), the device identity and origin facts in a table,
 * and the two device-level actions: trust it, or report it as not theirs.
 */
export function NewDeviceEmail({ theme, recipientName, greeting, preheader, deviceName, os, browser, ip, location, time, trustUrl, reportUrl, heading = "New device on your account", body = "This device was used to access your account for the first time.", trustLabel = "Trust this device", reportLabel = "Report device", alertTitle = "New device detected", headerMeta = "Security", wasMeHint = "If this was you, no action is needed — the device is now recognized.", labels, }) {
    const items = [
        { label: labels?.device ?? "Device", value: deviceName },
    ];
    if (os)
        items.push({ label: labels?.os ?? "System", value: os });
    if (browser)
        items.push({ label: labels?.browser ?? "Browser", value: browser });
    items.push({ label: labels?.ip ?? "IP", value: ip });
    if (location)
        items.push({ label: labels?.location ?? "Location", value: location });
    items.push({ label: labels?.time ?? "Time", value: time });
    return (_jsxs(EmailLayout, { theme: theme, title: heading, preheader: preheader ?? `New device: ${deviceName}`, header: _jsx(EmailHeader, { meta: headerMeta }), children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: heading }), _jsx(EmailAlert, { tone: "warning", title: alertTitle, children: body }), _jsx(EmailKeyValue, { items: items }), trustUrl ? _jsx(EmailButton, { href: trustUrl, children: trustLabel }) : null, reportUrl ? (_jsx(EmailButton, { href: reportUrl, variant: "secondary", children: reportLabel })) : null, _jsx(EmailMuted, { children: wasMeHint })] }));
}
