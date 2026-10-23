import { type EmailTemplateBaseProps } from "./shared";
export interface ResourceExpirationEmailProps extends EmailTemplateBaseProps {
    /** Name of the expiring resource ("prod-registry"). */
    resourceName: string;
    /** Kind of resource, lowercase ("repository", "share link"). Default "resource". */
    resourceType?: string;
    /** Preformatted expiry, e.g. "28 Aug 2026". */
    expiresAt: string;
    renewUrl?: string;
    /** What happens after expiry, shown in a warning alert when provided. */
    consequence?: string;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). Defaults to "Renew {resourceType}". */
    ctaLabel?: string;
}
/**
 * Warns that a named resource expires soon. Warning tone; the optional
 * `consequence` states the concrete effect ("Scheduled jobs stop running").
 */
export declare function ResourceExpirationEmail({ theme, recipientName, greeting, preheader, resourceName, resourceType, expiresAt, renewUrl, consequence, heading, body, ctaLabel, }: ResourceExpirationEmailProps): import("react").JSX.Element;
