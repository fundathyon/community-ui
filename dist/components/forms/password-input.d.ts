import { type InputProps } from "./input";
export interface PasswordInputProps extends Omit<InputProps, "type" | "trailing"> {
    /** aria-label of the toggle while the value is hidden. Pass your product copy. */
    showPasswordLabel?: string;
    /** aria-label of the toggle while the value is visible. Pass your product copy. */
    hidePasswordLabel?: string;
    /** Start with the value visible (rarely wanted). */
    defaultVisible?: boolean;
}
/**
 * PasswordInput — the "campo secreto" Input variant (§10): the same Input with
 * a trailing visibility toggle, never a separate control family. Always inside
 * a FormField. The toggle exposes its state via `aria-pressed`.
 *
 * Never autocapitalizes or autocorrects — secrets must arrive exactly as typed.
 */
export declare const PasswordInput: import("react").ForwardRefExoticComponent<Omit<PasswordInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
