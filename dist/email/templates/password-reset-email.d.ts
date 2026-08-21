import { type EmailTemplateBaseProps } from "./shared";
export interface PasswordResetEmailProps extends EmailTemplateBaseProps {
    /** Signed reset URL — button and fallback line share it. */
    resetUrl: string;
    /** Minutes until the link expires; feeds the default expiry line. */
    expiresMinutes?: number;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    /** Full expiry line; overrides the `expiresMinutes` default. */
    expiresText?: string;
    /** Reassurance that an ignored request changes nothing. Always rendered. */
    securityNote?: string;
    fallbackLabel?: string;
}
/**
 * "Reset your password" message. The security note states the safe outcome
 * of doing nothing — the §17 voice: direct, no apologies, no alarm.
 */
export declare function PasswordResetEmail({ theme, recipientName, greeting, preheader, resetUrl, expiresMinutes, heading, body, ctaLabel, expiresText, securityNote, fallbackLabel, }: PasswordResetEmailProps): import("react").JSX.Element;
