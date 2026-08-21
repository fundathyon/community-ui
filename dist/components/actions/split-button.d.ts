import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import type { Size } from "../../lib/types";
export interface SplitButtonItem {
    label: string;
    onClick: () => void;
    /** Rendered in danger and forced to the END of the menu, separated (§12).
     * The handler must open a confirmation — it never executes directly (§17). */
    destructive?: boolean;
    disabled?: boolean;
}
export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick" | "children"> {
    /** Label of the main action. */
    children: ReactNode;
    /** The main action — what most users want most of the time. */
    onClick: MouseEventHandler<HTMLButtonElement>;
    /** Secondary actions behind the chevron. Destructive ones are moved last. */
    items: SplitButtonItem[];
    variant?: "primary" | "secondary";
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size (§08). */
    size?: Size;
    /** Spinner on the main segment; both segments lock while it runs. */
    loading?: boolean;
    disabled?: boolean;
    /** Accessible name of the chevron trigger. Overridable product copy. */
    menuLabel?: string;
}
/**
 * SplitButton — one main action plus attached secondary variants of it behind
 * a chevron menu (e.g. "Sincronizar" / "Sincronizar sólo tags"). The chevron
 * trigger has its own accessible name.
 *
 * When to use: variants of the SAME verb. Unrelated actions belong in a
 * DropdownMenu; a single alternative of equal weight is just two Buttons.
 */
export declare function SplitButton({ children, onClick, items, variant, size, loading, disabled, menuLabel, className, ...props }: SplitButtonProps): import("react").JSX.Element;
