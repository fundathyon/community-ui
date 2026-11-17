/**
 * Tone box for state that stays true whether or not it's read (§17 Alert
 * rule): 3px left bar + tinted background + text. Tone means content
 * semantics — never brand (§02: accent ≠ state).
 */
import type { ReactNode } from "react";
/** Content semantics of an alert — mirrors the web `Tone` (§18). */
export type EmailTone = "info" | "success" | "warning" | "danger";
export interface EmailAlertProps {
    /** `info` pending/neutral · `success` confirmed · `warning` needs attention · `danger` failed/irreversible. */
    tone?: EmailTone;
    /** Bold first line in the tone color. */
    title?: string;
    children?: ReactNode;
}
/**
 * Inline alert for emails: security events, expirations, consequences.
 * `danger` is reserved for failures and irreversible facts; "expiring soon"
 * is `warning`. Keep to one alert per email — the message IS the alert.
 */
export declare function EmailAlert({ tone, title, children }: EmailAlertProps): import("react").JSX.Element;
