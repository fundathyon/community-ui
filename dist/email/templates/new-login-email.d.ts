import { type EmailTemplateBaseProps } from "./shared";
export interface NewLoginEmailProps extends EmailTemplateBaseProps {
    /** Device/OS, e.g. "Linux". */
    device: string;
    /** Browser or client, e.g. "Firefox 129". */
    browser?: string;
    ip: string;
    /** Approximate location, e.g. "Madrid, ES". */
    location?: string;
    /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
    time: string;
    /** Where the user reviews sessions / repudiates the sign-in. */
    reviewUrl?: string;
    /** Reassurance line. Defaults to "If this was you, no action is needed." */
    wasMeHint?: string;
    heading?: string;
    /** Alert body — the event described as a fact. */
    body?: string;
    /** CTA label — verb + object (§17). */
    actionLabel?: string;
    /** Alert title line. */
    alertTitle?: string;
    /** Right-side header meta. Defaults to "Security". */
    headerMeta?: string;
    /** Row labels for the details table. */
    labels?: {
        device?: string;
        browser?: string;
        ip?: string;
        location?: string;
        time?: string;
    };
}
/**
 * New-login email: warning tone (nothing failed — attention required),
 * mandatory device/IP/time facts, and a review CTA. The hint states the
 * safe outcome: if it was the user, doing nothing is correct.
 */
export declare function NewLoginEmail({ theme, recipientName, greeting, preheader, device, browser, ip, location, time, reviewUrl, wasMeHint, heading, body, actionLabel, alertTitle, headerMeta, labels, }: NewLoginEmailProps): import("react").JSX.Element;
