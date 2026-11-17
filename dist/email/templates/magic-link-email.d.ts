import { type EmailTemplateBaseProps } from "./shared";
export interface MagicLinkEmailProps extends EmailTemplateBaseProps {
    /** Signed one-time sign-in URL. */
    loginUrl: string;
    /** Minutes until the link expires; feeds the default expiry line. */
    expiresMinutes?: number;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    expiresText?: string;
    securityNote?: string;
    fallbackLabel?: string;
}
/**
 * Magic-link email: sign in with one click, no password. States that the
 * link is single-use; the note covers the unrequested case.
 */
export declare function MagicLinkEmail({ theme, recipientName, greeting, preheader, loginUrl, expiresMinutes, heading, body, ctaLabel, expiresText, securityNote, fallbackLabel, }: MagicLinkEmailProps): import("react").JSX.Element;
