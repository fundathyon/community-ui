import { type ReactNode } from "react";
export interface SignupFormValues {
    email: string;
    password: string;
}
export interface SignupFormProps {
    onSubmit?: (values: SignupFormValues) => void;
    error?: ReactNode;
    loading?: boolean;
    emailLabel?: ReactNode;
    passwordLabel?: ReactNode;
    emailPlaceholder?: string;
    submitLabel?: ReactNode;
    loadingLabel?: string;
    /**
     * A live password-requirements hint under the password field (§29, T02):
     * a checklist that fills in as the user types, NEVER an error after submit.
     * Rendered as the field description.
     */
    passwordHintSlot?: ReactNode;
    /**
     * The terms label content ("I agree to the terms…", with your own Links).
     * When present, a required checkbox is rendered and the CTA stays disabled
     * until it's checked.
     */
    termsSlot?: ReactNode;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
    /** Alternative methods below the CTA. */
    children?: ReactNode;
}
/**
 * SignupForm — email + a single password (modern: no "repeat password" — the
 * reveal toggle resolves typos) + an optional terms checkbox (§29, T02).
 * `autocomplete="new-password"`. Password rules are shown as a live checklist
 * via `passwordHintSlot`, never as an error after submitting.
 */
export declare function SignupForm({ onSubmit, error, loading, emailLabel, passwordLabel, emailPlaceholder, submitLabel, loadingLabel, passwordHintSlot, termsSlot, showPasswordLabel, hidePasswordLabel, children, }: SignupFormProps): import("react").JSX.Element;
