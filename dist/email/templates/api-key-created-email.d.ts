import { type EmailTemplateBaseProps } from "./shared";
export interface ApiKeyCreatedEmailProps extends EmailTemplateBaseProps {
    /** Human name of the key ("ci-deploy"). NEVER the secret value. */
    keyName: string;
    /** Scopes granted, e.g. ["registry:read", "registry:write"]. */
    scopes?: string[];
    /** Who created it — a person or "system" (§24 audit grammar). */
    creatorName?: string;
    /** Preformatted creation time, e.g. "7 Aug 2026, 14:45 UTC". */
    createdAt: string;
    /** Where to review or manage the key. */
    actionUrl?: string;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    securityNote?: string;
    /** Row labels for the details table. */
    labels?: {
        scopes?: string;
        creator?: string;
        createdAt?: string;
    };
}
/**
 * Confirms a newly created API key with its name, scopes and creator — a
 * factual record, not an alert. The secret itself never appears here.
 */
export declare function ApiKeyCreatedEmail({ theme, recipientName, greeting, preheader, keyName, scopes, creatorName, createdAt, actionUrl, heading, body, ctaLabel, securityNote, labels, }: ApiKeyCreatedEmailProps): import("react").JSX.Element;
