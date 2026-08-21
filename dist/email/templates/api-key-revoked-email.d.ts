import { type EmailTemplateBaseProps } from "./shared";
export interface ApiKeyRevokedEmailProps extends EmailTemplateBaseProps {
    /** Human name of the key ("ci-deploy"). NEVER the secret value. */
    keyName: string;
    /** Who revoked it — a person or "system" (§24 audit grammar). */
    revokerName?: string;
    /** Preformatted revocation time, e.g. "21 Aug 2026, 09:14 UTC". */
    revokedAt: string;
    /** What breaks as a result, stated plainly. */
    consequence?: string;
    /** Where to review remaining keys. */
    actionUrl?: string;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    note?: string;
    /** Row labels for the details table. */
    labels?: {
        revoker?: string;
        revokedAt?: string;
    };
}
/**
 * Confirms a revoked API key: who revoked it and when, plus the concrete
 * consequence in a neutral (not danger) alert — matter-of-fact, since this
 * is frequently intentional (§25).
 */
export declare function ApiKeyRevokedEmail({ theme, recipientName, greeting, preheader, keyName, revokerName, revokedAt, consequence, actionUrl, heading, body, ctaLabel, note, labels, }: ApiKeyRevokedEmailProps): import("react").JSX.Element;
