import { type EmailTemplateBaseProps } from "./shared";
export interface AccountLockedEmailProps extends EmailTemplateBaseProps {
    /** Failed sign-in attempts that triggered the lock. */
    attempts: number;
    /** Minutes until the lock lifts. Required — §23 mandates an explicit deadline, never an unknown-duration lockout. */
    unlockMinutes: number;
    /** Full unlock line; overrides the `unlockMinutes` default (e.g. an absolute time: "Unlocks at 14:30 UTC"). */
    unlockText?: string;
    /** IP address the failed attempts came from. */
    ip?: string;
    heading?: string;
    body?: string;
    /** Where to recover access sooner, e.g. a password reset. */
    actionUrl?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    /** Right-side header meta. Defaults to "Security". */
    headerMeta?: string;
    securityNote?: string;
    /** Row labels for the details table. */
    labels?: {
        attempts?: string;
        ip?: string;
        unlock?: string;
    };
}
/**
 * Account-locked email: warning tone (§19 — Locked is reversible by an
 * admin, not a failure), the attempt count and an explicit unlock deadline
 * in the facts table, and an optional recovery action.
 */
export declare function AccountLockedEmail({ theme, recipientName, greeting, preheader, attempts, unlockMinutes, unlockText, ip, heading, body, actionUrl, ctaLabel, headerMeta, securityNote, labels, }: AccountLockedEmailProps): import("react").JSX.Element;
