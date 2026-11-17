import { OTPField } from "@base-ui/react/otp-field";
import { type ComponentProps } from "react";
import type { Size } from "../../lib/types";
export interface CodeInputProps extends Omit<ComponentProps<typeof OTPField.Root>, "length" | "validationType" | "onValueChange" | "onValueComplete" | "className" | "render" | "mask"> {
    /** Number of character slots. */
    length?: number;
    /**
     * Optical grouping, e.g. `[3, 3]` (§23: grouping reduces read errors —
     * never six identical boxes). Must sum to `length`, otherwise a single
     * group is rendered.
     */
    groups?: readonly number[];
    type?: "numeric" | "alphanumeric";
    /** Box size. Defaults to the density's size. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    onValueChange?: (value: string) => void;
    /** Fired when every slot is filled — trigger your verification here. */
    onComplete?: (value: string) => void;
    /** Submit the owning `<form>` automatically when the code completes. */
    autoSubmit?: boolean;
    className?: string;
}
/**
 * CodeInput — segmented code entry (§10, §23). It NEVER blocks paste (a full
 * code pasted anywhere distributes across the slots) nor the SMS/keychain
 * autofill (`autoComplete="one-time-code"`); Backspace moves back a slot.
 * Typing advances automatically and `onComplete` fires when full.
 *
 * For the two-factor / verification preset (numeric, 3+3 grouping) use
 * OTPInput.
 */
export declare const CodeInput: import("react").ForwardRefExoticComponent<Omit<CodeInputProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type OTPInputProps = Omit<CodeInputProps, "type">;
/**
 * OTPInput — the verification-code preset of CodeInput (§23): numeric, SMS
 * autofill via `one-time-code`, and 3+3 optical grouping by default. Paste and
 * autocomplete are never blocked; after repeated failures show a `Locked`
 * state with an explicit deadline — never an "unknown error" (§23).
 */
export declare const OTPInput: import("react").ForwardRefExoticComponent<Omit<OTPInputProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
