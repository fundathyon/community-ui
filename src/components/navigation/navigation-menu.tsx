"use client";

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import type { AnchorHTMLAttributes, ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

const triggerClasses = cn(
  "inline-flex h-8 select-none items-center gap-1 rounded-md px-3 text-body text-text-secondary",
  "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
  "hover:bg-surface-hover hover:text-text data-[popup-open]:bg-surface-hover data-[popup-open]:text-text",
  "fdn-touch-target",
);

export interface NavigationMenuProps extends ComponentProps<typeof BaseNavigationMenu.Root> {}

/**
 * NavigationMenu — horizontal nav with hover/click popups, for docs and
 * marketing headers. NOT the app shell: product screens navigate with the
 * Sidebar (§12). Thin wrapper over Base UI; compose with NavigationMenuItem.
 */
export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  return (
    <BaseNavigationMenu.Root className={cn("min-w-0", className)} {...props}>
      <BaseNavigationMenu.List className="flex items-center gap-1">{children}</BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner sideOffset={6} className="fdn-z-dropdown">
          <BaseNavigationMenu.Popup
            className={cn(
              "h-[var(--popup-height)] w-[var(--popup-width)] rounded-lg border border-border bg-surface-raised shadow-md",
              "transition-[opacity,width,height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
              "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            )}
          >
            <BaseNavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export interface NavigationMenuItemProps {
  /** The trigger label. */
  label: ReactNode;
  /** Popup content. Omit it to render a plain link instead of a popup. */
  children?: ReactNode;
  /** Link destination when the item has no popup. */
  href?: string;
  /** Router substitution for the no-popup form — receives the wired props:
   * `render={(props) => <RouterLink to="…" {...props} />}`. */
  render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => ReactElement;
  className?: string;
}

/**
 * NavigationMenuItem — one top-level destination: a popup (label + content)
 * or a plain link (label + href). Keyboard and hover behavior come from
 * Base UI.
 */
export function NavigationMenuItem({ label, children, href, render, className }: NavigationMenuItemProps) {
  if (children === undefined) {
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode } = {
      href,
      className: cn(triggerClasses, className),
      children: label,
    };
    return (
      <BaseNavigationMenu.Item>
        {render ? (
          <BaseNavigationMenu.Link render={render(linkProps)} />
        ) : (
          <BaseNavigationMenu.Link href={href} className={cn(triggerClasses, className)}>
            {label}
          </BaseNavigationMenu.Link>
        )}
      </BaseNavigationMenu.Item>
    );
  }

  return (
    <BaseNavigationMenu.Item>
      <BaseNavigationMenu.Trigger className={cn(triggerClasses, className)}>
        {label}
        <BaseNavigationMenu.Icon className="transition-transform duration-[var(--fdn-dur-fast)] data-[popup-open]:rotate-180">
          <Icon icon={ChevronDown} size={12} />
        </BaseNavigationMenu.Icon>
      </BaseNavigationMenu.Trigger>
      <BaseNavigationMenu.Content className="p-2">{children}</BaseNavigationMenu.Content>
    </BaseNavigationMenu.Item>
  );
}
