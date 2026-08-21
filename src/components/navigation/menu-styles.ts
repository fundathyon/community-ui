import { cn } from "../../lib/cn";

/**
 * Internal: shared popup/item styling for the navigation menus that wrap
 * Base UI Menu directly (UserMenu, AppSwitcher). Follows the suite popup
 * conventions: raised surface + border + shadow (§05 — never shadow alone).
 * Not exported from the barrel.
 */
export const menuPopupClasses = cn(
  "min-w-52 rounded-lg border border-border bg-surface-raised p-1 shadow-md",
  "transition-opacity duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
);

export const menuItemClasses = cn(
  "flex h-8 cursor-default select-none items-center gap-2 rounded-md px-2 text-body text-text-secondary outline-none",
  "data-[highlighted]:bg-surface-hover data-[highlighted]:text-text",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
);

export const menuSeparatorClasses = "-mx-1 my-1 h-px bg-border";
