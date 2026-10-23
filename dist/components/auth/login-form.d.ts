import { type ReactNode } from "react";
export interface LoginFormValues {
    email: string;
    password: string;
    /** Only meaningful when `showRemember` is set; otherwise always false. */
    remember: boolean;
}
export interface LoginFormProps {
    /** Receives the entered values. Apps wire their own auth backend (§16). */
    onSubmit?: (values: LoginFormValues) => void;
    /**
     * Credential error, shown as a danger Alert above the fields. Keep it
     * generic — it must NEVER reveal whether the email exists. The correct copy
     * is "Incorrect email or password" for both a wrong password AND an unknown
     * email (§16).
     */
    error?: ReactNode;
    loading?: boolean;
    emailLabel?: ReactNode;
    passwordLabel?: ReactNode;
    emailPlaceholder?: string;
    /** One clear CTA — rendered as a comfortable full-width primary button (§16). */
    submitLabel?: ReactNode;
    /** Accessible label while submitting; the button keeps its width and spins. */
    loadingLabel?: string;
    /** A Link placed inline with the password label ("Forgot?"). */
    forgotPasswordSlot?: ReactNode;
    /** Renders a "remember this device" checkbox below the password. */
    showRemember?: boolean;
    rememberLabel?: ReactNode;
    defaultRemember?: boolean;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
    /** Alternative methods below the CTA (an AuthDivider + OAuth/passkey). */
    children?: ReactNode;
    /** Focus the email field on mount (the §29 template rule). Off by default so
     * an embedded form never steals focus. */
    autoFocusEmail?: boolean;
}
/**
 * LoginForm — email + password, one clear CTA (§16). Composes AuthForm with two
 * FormFields; emits the entered values to `onSubmit`. Proper autofill is wired:
 * `autocomplete="email"` / `"current-password"`, and the email never
 * autocapitalizes.
 *
 * The error copy must never reveal whether the email exists (§16) — pass the
 * same generic message for a wrong password and an unknown account.
 */
export declare function LoginForm({ onSubmit, error, loading, emailLabel, passwordLabel, emailPlaceholder, submitLabel, loadingLabel, forgotPasswordSlot, showRemember, rememberLabel, defaultRemember, showPasswordLabel, hidePasswordLabel, children, autoFocusEmail, }: LoginFormProps): import("react").JSX.Element;
