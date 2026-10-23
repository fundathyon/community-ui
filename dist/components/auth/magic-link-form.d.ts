import { type ReactNode } from "react";
export interface MagicLinkFormValues {
    email: string;
}
export interface MagicLinkFormProps {
    onSubmit?: (values: MagicLinkFormValues) => void;
    /** When true, the sent-state confirmation replaces the form. */
    sent?: boolean;
    error?: ReactNode;
    loading?: boolean;
    emailLabel?: ReactNode;
    emailPlaceholder?: string;
    submitLabel?: ReactNode;
    loadingLabel?: string;
    /** Title of the sent-state confirmation Alert. */
    sentTitle?: ReactNode;
    /** Body copy of the sent-state confirmation ("Check your inbox for the link").
     * Deliberately does NOT confirm whether the account exists (§29 T03). */
    sentSlot?: ReactNode;
    /** Resend from the sent state. */
    onResend?: () => void;
    resendLabel?: string;
    cooldownSeconds?: number;
    resendCooldownLabel?: (seconds: number) => ReactNode;
}
/**
 * MagicLinkForm — passwordless sign-in by emailed link. Before sending: an
 * email field + CTA. After sending (`sent`): a success Alert telling the user
 * to check their inbox, plus a resend with an internal cooldown. The
 * confirmation never reveals whether the email is registered (§29 T03).
 */
export declare function MagicLinkForm({ onSubmit, sent, error, loading, emailLabel, emailPlaceholder, submitLabel, loadingLabel, sentTitle, sentSlot, onResend, resendLabel, cooldownSeconds, resendCooldownLabel, }: MagicLinkFormProps): import("react").JSX.Element;
