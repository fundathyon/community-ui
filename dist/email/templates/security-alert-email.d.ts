import { type EmailKeyValueItem } from "../email-key-value";
import { type EmailTemplateBaseProps } from "./shared";
export interface SecurityAlertEmailProps extends EmailTemplateBaseProps {
    /** What happened, stated as a fact ("API key revoked"). */
    eventTitle: string;
    eventDescription?: string;
    /** Event facts — device, IP, time. §27 makes these mandatory for security emails. */
    details: EmailKeyValueItem[];
    /** Where the user reviews or repudiates the event. */
    actionUrl?: string;
    /** CTA label — verb + object (§17). */
    actionLabel?: string;
    heading?: string;
    /** Right-side header meta. Defaults to "Security". */
    headerMeta?: string;
    securityNote?: string;
}
/**
 * Security alert: the event in a danger alert, the facts in a two-column
 * table, and the urgent action as the primary CTA (§27 — if it was the
 * user, no action is needed; the button serves everyone else).
 */
export declare function SecurityAlertEmail({ theme, recipientName, greeting, preheader, eventTitle, eventDescription, details, actionUrl, actionLabel, heading, headerMeta, securityNote, }: SecurityAlertEmailProps): import("react").JSX.Element;
