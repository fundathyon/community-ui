import { type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import type { Size } from "../../lib/types";
declare const buttonVariants: (props?: ({
    variant?: "secondary" | "primary" | "ghost" | "destructive" | "destructive-subtle" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof buttonVariants>, "size"> {
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size (§08). */
    size?: Size;
    /**
     * Shows an in-place spinner and disables the button while KEEPING ITS WIDTH,
     * so the row never jumps (§09). Sets `aria-busy`.
     */
    loading?: boolean;
    /** Icon before the label. */
    leading?: ReactNode;
    /** Icon after the label. */
    trailing?: ReactNode;
}
/**
 * Button — executes an action. If it navigates to another route it is a Link,
 * even if it looks like a button (§09).
 *
 * When to use: one `primary` per screen; `secondary` for a real alternative;
 * `ghost` for row/toolbar actions; `destructive` only as final confirmation
 * inside a dialog; `destructive-subtle` for destructive actions in list context.
 *
 * Anti-patterns: two primaries competing; a primary inside a table row; generic
 * copy ("Aceptar") — the button says the verb: "Revocar enlace".
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export { buttonVariants };
