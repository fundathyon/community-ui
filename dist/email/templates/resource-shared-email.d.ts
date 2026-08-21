import { type EmailTemplateBaseProps } from "./shared";
export interface ResourceSharedEmailProps extends EmailTemplateBaseProps {
    /** Name of the shared resource ("prod-registry"). */
    resourceName: string;
    /** Kind of resource, lowercase ("config", "repository"). Default "resource". */
    resourceType?: string;
    /** Display name of the person who created the share link. */
    sharerName?: string;
    sharerEmail?: string;
    /** Signed share URL — button and fallback line share it. */
    shareUrl: string;
    /** Preformatted expiry ("In 7 days", "28 Aug 2026") or "Never". Omit to hide the row. */
    expiresAt?: string;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). Defaults to "Open {resourceType}". */
    ctaLabel?: string;
    securityNote?: string;
    fallbackLabel?: string;
    /** Row labels for the details table. */
    labels?: {
        sharedBy?: string;
        expires?: string;
    };
}
/**
 * "{resource} was shared with you": who shared it and the link's expiry as
 * facts, then the CTA into the resource with its plain-URL fallback.
 */
export declare function ResourceSharedEmail({ theme, recipientName, greeting, preheader, resourceName, resourceType, sharerName, sharerEmail, shareUrl, expiresAt, heading, body, ctaLabel, securityNote, fallbackLabel, labels, }: ResourceSharedEmailProps): import("react").JSX.Element;
