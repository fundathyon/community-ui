import { type EmailTemplateBaseProps } from "./shared";
export interface EmailVerificationEmailProps extends EmailTemplateBaseProps {
    /** Signed verification URL — button and fallback line share it. */
    verifyUrl: string;
    /** Hours until the link expires; feeds the default expiry line. */
    expiresHours?: number;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    /** Full expiry line; overrides the `expiresHours` default. */
    expiresText?: string;
    securityNote?: string;
    /** Lead-in of the plain-URL fallback line. */
    fallbackLabel?: string;
}
/**
 * "Verify your email" message. One clear CTA; the fallback URL keeps the
 * flow alive when the button is stripped by the client.
 */
export declare function EmailVerificationEmail({ theme, recipientName, greeting, preheader, verifyUrl, expiresHours, heading, body, ctaLabel, expiresText, securityNote, fallbackLabel, }: EmailVerificationEmailProps): import("react").JSX.Element;
