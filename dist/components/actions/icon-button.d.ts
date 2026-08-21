import type { LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import type { Size } from "../../lib/types";
import { type TooltipSide } from "../overlays/tooltip";
export type IconButtonVariant = "ghost" | "secondary" | "destructive-subtle";
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
    /** The Lucide icon — the only visible content. */
    icon: LucideIcon;
    /**
     * REQUIRED accessible name (§07: an icon alone demands `aria-label` and a
     * tooltip — no exceptions). Becomes both the `aria-label` and the tooltip text.
     */
    label: string;
    variant?: IconButtonVariant;
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size (§08). */
    size?: Size;
    /** In-place spinner; keeps the square footprint (§09). */
    loading?: boolean;
    /** Where the tooltip opens. */
    tooltipSide?: TooltipSide;
}
/**
 * IconButton — an icon-only action, always square at its row's control height
 * (§09). The API enforces the accessibility contract: `label` is required and
 * feeds both `aria-label` and the wrapping Tooltip. Under a coarse pointer the
 * touch area extends to 44px without changing the visual box.
 *
 * When to use: row and toolbar actions where the icon is unambiguous. If the
 * verb matters (destructive confirmations, primary actions), use a Button with
 * text — the button says the verb (§09).
 */
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
