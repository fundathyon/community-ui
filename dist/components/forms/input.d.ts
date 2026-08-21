import { Input as BaseInput } from "@base-ui/react/input";
import { type ComponentProps, type ReactNode } from "react";
import type { Size } from "../../lib/types";
export interface InputProps extends Omit<ComponentProps<typeof BaseInput>, "size"> {
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
    size?: Size;
    /** Slot before the value: an icon, or a static prefix like a base URL.
     * Search inputs and input groups are THIS component with slots — not
     * separate components (§10). */
    leading?: ReactNode;
    /** Slot after the value: an icon, a unit, a reveal button… */
    trailing?: ReactNode;
    /** Marks invalid when used standalone. Inside a FormField the field state
     * drives this automatically. */
    invalid?: boolean;
    /** Extra classes for the outer box (border carrier). `className` goes to the
     * inner `<input>`. */
    wrapperClassName?: string;
}
/**
 * Text input. Always place it inside a FormField, which owns the label and
 * messages. Read-only stays selectable and copyable; disabled means the value
 * is not editable AND not relevant to interact with.
 */
export declare const Input: import("react").ForwardRefExoticComponent<Omit<InputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
