"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { menuItemClasses, menuPopupClasses, menuSeparatorClasses } from "./menu-styles";

export interface UserMenuItem {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  /** Destructive entry — danger text, at the END of its group (§12). */
  destructive?: boolean;
}

export interface UserMenuProps {
  name: string;
  email?: string;
  /** Custom trigger node. Defaults to an initials circle computed from `name`. */
  trigger?: ReactNode;
  items?: UserMenuItem[];
  /** Renders the separated sign-out item at the bottom. */
  onSignOut?: () => void;
  /** Overridable (products ship Spanish copy: "Cerrar sesión"). */
  signOutLabel?: string;
  /** Identity block (name/email) at the top of the menu. */
  showHeader?: boolean;
}

/** "Marta Ruiz" → "MR". First letter of the first two words. */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * UserMenu — the shell's identity menu (§12): avatar-like trigger, identity
 * header, account items, and sign out separated at the bottom. Destructive
 * entries never sit next to safe ones without a separator.
 */
export function UserMenu({
  name,
  email,
  trigger,
  items = [],
  onSignOut,
  signOutLabel = "Sign out",
  showHeader = true,
}: UserMenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger
        aria-label={name}
        className={cn(
          "rounded-full",
          !trigger &&
            "grid size-7 select-none place-items-center bg-accent-bg text-caption font-medium text-accent",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
          "fdn-touch-target",
        )}
      >
        {trigger ?? <span aria-hidden>{getInitials(name)}</span>}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner side="bottom" align="end" sideOffset={6} className="fdn-z-dropdown">
          <BaseMenu.Popup className={menuPopupClasses}>
            {showHeader && (
              <>
                <div className="flex flex-col px-2 py-1.5">
                  <span className="text-body font-medium text-text">{name}</span>
                  {email && <span className="text-caption text-text-muted">{email}</span>}
                </div>
                <BaseMenu.Separator className={menuSeparatorClasses} />
              </>
            )}
            {items.map((item) => (
              <BaseMenu.Item
                key={item.label}
                onClick={item.onSelect}
                className={cn(
                  menuItemClasses,
                  item.destructive && "text-danger data-[highlighted]:bg-danger-bg data-[highlighted]:text-danger",
                )}
              >
                {item.icon && <Icon icon={item.icon} size={14} />}
                {item.label}
              </BaseMenu.Item>
            ))}
            {onSignOut && (
              <>
                {(items.length > 0 || showHeader) && <BaseMenu.Separator className={menuSeparatorClasses} />}
                <BaseMenu.Item onClick={onSignOut} className={menuItemClasses}>
                  <Icon icon={LogOut} size={14} />
                  {signOutLabel}
                </BaseMenu.Item>
              </>
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
