import { type ReactNode } from "react";
export interface PasswordResetValues {
    password: string;
}
export interface PasswordResetFormProps {
    onSubmit?: (values: PasswordResetValues) => void;
    error?: ReactNode;
    loading?: boolean;
    passwordLabel?: ReactNode;
    submitLabel?: ReactNode;
    loadingLabel?: string;
    /** Live password-requirements hint under the new-password field (§29 T02). */
    passwordHintSlot?: ReactNode;
    /** Adds a "confirm password" field with client-side match validation. */
    withConfirm?: boolean;
    confirmLabel?: ReactNode;
    /** Message shown when the two passwords differ. */
    mismatchError?: string;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
}
/**
 * PasswordResetForm — set a new password from a reset link (§16). A single
 * `password` field by default; pass `withConfirm` to add a confirmation field
 * whose match is validated on blur via FormField (§C-04). Emits only the new
 * `password`. `autocomplete="new-password"`.
 */
export declare function PasswordResetForm({ onSubmit, error, loading, passwordLabel, submitLabel, loadingLabel, passwordHintSlot, withConfirm, confirmLabel, mismatchError, showPasswordLabel, hidePasswordLabel, }: PasswordResetFormProps): import("react").JSX.Element;
