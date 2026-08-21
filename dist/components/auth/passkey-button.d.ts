import { type ReactNode } from "react";
import { type ButtonProps } from "../actions/button";
export interface PasskeyButtonProps extends Omit<ButtonProps, "variant" | "leading" | "children"> {
    /** Button copy. */
    label?: ReactNode;
}
/**
 * PasskeyButton — the "Continue with a passkey" affordance (§16, §29). A
 * full-width secondary button with a fingerprint glyph. Just the affordance:
 * the WebAuthn ceremony lives in the app (`onClick`), which flips `loading`
 * while the platform authenticator prompts.
 */
export declare const PasskeyButton: import("react").ForwardRefExoticComponent<PasskeyButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
