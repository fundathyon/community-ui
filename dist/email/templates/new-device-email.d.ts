import { type EmailTemplateBaseProps } from "./shared";
export interface NewDeviceEmailProps extends EmailTemplateBaseProps {
    /** Device name/model, e.g. "iPhone 15", "MacBook Pro". */
    deviceName: string;
    /** Operating system, e.g. "iOS 18". */
    os?: string;
    browser?: string;
    ip: string;
    /** Approximate location, e.g. "Madrid, ES". */
    location?: string;
    /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
    time: string;
    /** Where the user confirms/trusts this device. Primary CTA. */
    trustUrl?: string;
    /** Where the user reports the device as unrecognized. Secondary CTA. */
    reportUrl?: string;
    heading?: string;
    body?: string;
    /** Primary CTA label — verb + object (§17). */
    trustLabel?: string;
    /** Secondary CTA label — verb + object (§17). */
    reportLabel?: string;
    alertTitle?: string;
    /** Right-side header meta. Defaults to "Security". */
    headerMeta?: string;
    wasMeHint?: string;
    /** Row labels for the details table. */
    labels?: {
        device?: string;
        os?: string;
        browser?: string;
        ip?: string;
        location?: string;
        time?: string;
    };
}
/**
 * New-device email: warning tone (§23 — an unrecognized device is not yet
 * known to be an attack), the device identity and origin facts in a table,
 * and the two device-level actions: trust it, or report it as not theirs.
 */
export declare function NewDeviceEmail({ theme, recipientName, greeting, preheader, deviceName, os, browser, ip, location, time, trustUrl, reportUrl, heading, body, trustLabel, reportLabel, alertTitle, headerMeta, wasMeHint, labels, }: NewDeviceEmailProps): import("react").JSX.Element;
