import { type EmailTemplateBaseProps } from "./shared";
export interface TokenExpirationEmailProps extends EmailTemplateBaseProps {
    /** Human name of the token ("deploy-bot"). NEVER the token value (§27). */
    tokenName: string;
    /** Preformatted expiry, e.g. "28 Aug 2026, 00:00 UTC". */
    expiresAt: string;
    /** Where a new token is issued or this one extended. */
    renewUrl?: string;
    heading?: string;
    body?: string;
    /** Consequence line inside the warning alert. */
    alertText?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
}
/**
 * Warns that a named token expires soon: warning tone (nothing failed yet),
 * the concrete consequence, and a renew CTA.
 */
export declare function TokenExpirationEmail({ theme, recipientName, greeting, preheader, tokenName, expiresAt, renewUrl, heading, body, alertText, ctaLabel, }: TokenExpirationEmailProps): import("react").JSX.Element;
