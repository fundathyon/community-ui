import { type EmailTemplateBaseProps } from "./shared";
export interface PasswordChangedEmailProps extends EmailTemplateBaseProps {
    /** Preformatted time string, e.g. "21 Aug 2026, 09:14 UTC". */
    time: string;
    ip?: string;
    /** Where to go when the change was not the user's — support or recovery. */
    supportUrl?: string;
    heading?: string;
    body?: string;
    /** The "if this wasn't you" instruction. Always rendered. */
    note?: string;
    /** Secondary CTA label — verb + object (§17). */
    supportLabel?: string;
    /** Right-side header meta. Defaults to "Security". */
    headerMeta?: string;
    /** Row labels for the details table. */
    labels?: {
        time?: string;
        ip?: string;
    };
}
/**
 * Confirms a completed password change with time/IP facts. The CTA is
 * secondary: for most recipients this email requires no action.
 */
export declare function PasswordChangedEmail({ theme, recipientName, greeting, preheader, time, ip, supportUrl, heading, body, note, supportLabel, headerMeta, labels, }: PasswordChangedEmailProps): import("react").JSX.Element;
