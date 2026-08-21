import type { ReactNode } from "react";
export interface EmailVerificationNoticeProps {
    /** The address the link was sent to — highlighted in the description. */
    email: string;
    title?: ReactNode;
    /**
     * Override the description. By default renders "We sent a verification link
     * to {email}." with the address highlighted; pass a function to reuse the
     * highlighted email, or any node to replace it entirely.
     */
    description?: ReactNode | ((email: ReactNode) => ReactNode);
    onResend?: () => void;
    resendLabel?: string;
    cooldownSeconds?: number;
    resendCooldownLabel?: (seconds: number) => ReactNode;
    /** A Link to change the address ("Use a different email"). */
    changeEmailSlot?: ReactNode;
}
/**
 * EmailVerificationNotice — the post-signup "verify your email" screen content
 * (§16 verification). A MailCheck mark, a description with the email
 * highlighted, a resend button with an internal cooldown, and an optional
 * "change email" link. Compose it inside AuthLayout.
 */
export declare function EmailVerificationNotice({ email, title, description, onResend, resendLabel, cooldownSeconds, resendCooldownLabel, changeEmailSlot, }: EmailVerificationNoticeProps): import("react").JSX.Element;
