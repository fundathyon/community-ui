"use client";

import { ChevronDown } from "lucide-react";
import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { Icon } from "../typography/icon";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

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
export function SplitButton({
  children,
  onClick,
  items,
  variant = "secondary",
  size,
  loading = false,
  disabled = false,
  menuLabel = "More actions",
  className,
  ...props
}: SplitButtonProps) {
  const safe = items.filter((item) => !item.destructive);
  const destructive = items.filter((item) => item.destructive);
  const renderItem = (item: SplitButtonItem) => (
    <DropdownMenuItem
      key={item.label}
      destructive={item.destructive}
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {item.label}
    </DropdownMenuItem>
  );

  return (
    <div className={cn("inline-flex items-stretch", className)} role="group" {...props}>
      <Button
        variant={variant}
        size={size}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        className="rounded-r-none"
      >
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-label={menuLabel}
              variant={variant}
              size={size}
              disabled={disabled || loading}
              className={cn(
                "rounded-l-none px-1",
                // shared edge: overlap the 1px borders; primary has no border,
                // so a darker accent hairline separates the segments instead.
                variant === "secondary" && "-ml-px",
                variant === "primary" && "border-l border-accent-solid-active shadow-none",
              )}
            />
          }
        >
          <Icon icon={ChevronDown} size={14} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {safe.map(renderItem)}
          {destructive.length > 0 && safe.length > 0 && <DropdownMenuSeparator />}
          {destructive.map(renderItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
