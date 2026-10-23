import type { ReactNode } from "react";
export interface OtpLockedState {
    /** Explicit message WITH the deadline — "Too many attempts. Try again in
     * 15 minutes." Never an "unknown error" (§23). */
    message: ReactNode;
}
export interface OTPFormProps {
    /** Fired when the code is complete (auto-submit on the last digit, §23). */
    onSubmit?: (code: string) => void;
    /** Number of digits. */
    length?: number;
    /** Optional heading above the field. Usually the AuthLayout title covers this. */
    title?: ReactNode;
    /** Where the code was sent and when it expires — "Sent to rafa@… . Expires in
     * 9:42." (§23). */
    descriptionSlot?: ReactNode;
    /** Generic error (wrong code), shown as a danger Alert above the field. */
    error?: ReactNode;
    /**
     * Locked state after repeated failures — a WARNING Alert (not danger: a lock
     * is temporary and reversible) with an explicit deadline. Disables the field
     * (§23).
     */
    locked?: OtpLockedState | null;
    /** Called when the user asks for a new code. */
    onResend?: () => void;
    resendLabel?: string;
    /** Countdown (seconds) that disables resend after each request. */
    cooldownSeconds?: number;
    /** Copy while the resend countdown runs. */
    resendCooldownLabel?: (seconds: number) => ReactNode;
    /** An alternative method Link ("Use a passkey"), shown next to resend (§23). */
    alternativeSlot?: ReactNode;
    /** Accessible group label for the code field. */
    codeLabel?: string;
}
/**
 * OTPForm — two-step verification (§23). A grouped 6-digit OTP field
 * (3+3 optical grouping, SMS autofill, paste never blocked) that auto-submits
 * on completion. Resend has an internal cooldown; after repeated failures the
 * app passes `locked` and we render a warning Alert with the deadline — never
 * an "unknown error".
 *
 * `TwoFactorForm` is the same component under the name used on 2FA screens.
 */
export declare function OTPForm({ onSubmit, length, title, descriptionSlot, error, locked, onResend, resendLabel, cooldownSeconds, resendCooldownLabel, alternativeSlot, codeLabel, }: OTPFormProps): import("react").JSX.Element;
/** TwoFactorForm — the 2FA-screen alias of OTPForm (§23). Same component,
 * named for the screen that hosts it. */
export declare const TwoFactorForm: typeof OTPForm;
export type TwoFactorFormProps = OTPFormProps;
