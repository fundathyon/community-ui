"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check, LayoutGrid } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { menuItemClasses, menuPopupClasses } from "./menu-styles";

export interface AppSwitcherProduct {
  /** Product id — becomes `data-fdn-product`, so the accent dot picks up the
   * product's own accent from the token cascade ("vault", "dokgistry"…). */
  id: string;
  name: string;
  href?: string;
  onSelect?: () => void;
  /** The product the user is currently in. */
  current?: boolean;
}

export interface AppSwitcherProps {
  products: AppSwitcherProduct[];
  /** Accessible name of the grid-icon trigger. Overridable (Spanish copy). */
  label?: string;
}

/**
 * AppSwitcher — the suite's product switcher in the Topbar (§12). A grid of
 * products, each with its own accent dot (the accent IS the product, §02),
 * the current one marked. Products with `href` render as links.
 */
export function AppSwitcher({ products, label = "Switch product" }: AppSwitcherProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger
        aria-label={label}
        className={cn(
          "grid size-7 select-none place-items-center rounded-md text-text-secondary",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
          "hover:bg-surface-hover hover:text-text data-[popup-open]:bg-surface-hover data-[popup-open]:text-text",
          "fdn-touch-target",
        )}
      >
        <Icon icon={LayoutGrid} size={16} />
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner side="bottom" align="end" sideOffset={6} className="fdn-z-dropdown">
          <BaseMenu.Popup className={cn(menuPopupClasses, "grid min-w-64 grid-cols-2 gap-1 p-2")}>
            {products.map((product) => {
              const content = (
                <>
                  {/* The token cascade under data-fdn-product colors this dot
                      with the product's own accent. */}
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent-solid" />
                  <span className="truncate">{product.name}</span>
                  {product.current && <Icon icon={Check} size={14} className="ml-auto text-accent" />}
                </>
              );
              const itemClassName = cn(
                menuItemClasses,
                "h-9",
                product.current && "bg-accent-bg text-accent data-[highlighted]:bg-accent-bg data-[highlighted]:text-accent",
              );
              return product.href !== undefined ? (
                <BaseMenu.LinkItem
                  key={product.id}
                  href={product.href}
                  closeOnClick
                  data-fdn-product={product.id}
                  aria-current={product.current ? "true" : undefined}
                  className={itemClassName}
                >
                  {content}
                </BaseMenu.LinkItem>
              ) : (
                <BaseMenu.Item
                  key={product.id}
                  onClick={product.onSelect}
                  data-fdn-product={product.id}
                  aria-current={product.current ? "true" : undefined}
                  className={itemClassName}
                >
                  {content}
                </BaseMenu.Item>
              );
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
