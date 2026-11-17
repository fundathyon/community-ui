import { type ReactNode } from "react";
export interface PasswordResetRequestValues {
    email: string;
}
export interface PasswordResetRequestFormProps {
    onSubmit?: (values: PasswordResetRequestValues) => void;
    error?: ReactNode;
    loading?: boolean;
    emailLabel?: ReactNode;
    emailPlaceholder?: string;
    submitLabel?: ReactNode;
    loadingLabel?: string;
    /**
     * Intro copy above the field ("Enter your email and we'll send you a reset
     * link"). After it's sent, show a confirmation that NEVER reveals whether the
     * account exists — "If an account exists for that email…" (§29, T03).
     */
    noteSlot?: ReactNode;
}
/**
 * PasswordResetRequestForm — email only, one CTA (§16, §29 T03). The request
 * itself must never confirm which emails are registered; keep that in mind for
 * the confirmation you render afterwards ("If an account exists…").
 */
export declare function PasswordResetRequestForm({ onSubmit, error, loading, emailLabel, emailPlaceholder, submitLabel, loadingLabel, noteSlot, }: PasswordResetRequestFormProps): import("react").JSX.Element;
