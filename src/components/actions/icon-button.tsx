"use client";

import type { LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Tooltip, type TooltipSide } from "../overlays/tooltip";
import { Icon, type IconSize } from "../typography/icon";
import { Button } from "./button";

export type IconButtonVariant = "ghost" | "secondary" | "destructive-subtle";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
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

const squareClasses: Record<Size, string> = {
  xs: "w-control-xs",
  sm: "w-control-sm",
  md: "w-control-md",
  lg: "w-control-lg",
};

const iconSizes: Record<Size, IconSize> = { xs: 12, sm: 14, md: 16, lg: 16 };

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
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = "ghost", size, loading = false, tooltipSide, className, ...props },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  return (
    <Tooltip content={label} side={tooltipSide}>
      <Button
        ref={ref}
        aria-label={label}
        variant={variant}
        size={resolvedSize}
        loading={loading}
        className={cn("px-0", squareClasses[resolvedSize], className)}
        {...props}
      >
        <Icon icon={icon} size={iconSizes[resolvedSize]} />
      </Button>
    </Tooltip>
  );
});
