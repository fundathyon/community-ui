import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface DocsHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Left slot: product logo / name (and, on mobile, the nav menu button). */
  logo?: ReactNode;
  /** Mobile-only nav trigger, shown to the left below `lg`. Pass a
   * `DocsSidebarTrigger` when the layout has a sidebar. */
  menu?: ReactNode;
  /** Center slot: the search trigger — typically `DocsSearch`. */
  search?: ReactNode;
  /** Right slot: theme toggle, `VersionSelector`, `ProductSelector`… */
  actions?: ReactNode;
}

/**
 * DocsHeader — the sticky top bar of a docs site (§26/§12): product on the left,
 * the search trigger in the center, version/theme actions on the right. Sits at
 * `header` height with a bottom border on `bg`, above the sidebar and content.
 *
 * It is a pure frame — it owns no state. The mobile sidebar toggle goes in the
 * `menu` slot (a `DocsSidebarTrigger`, which `DocsLayout` wires to its Drawer).
 * Server-component safe.
 */
export function DocsHeader({ logo, menu, search, actions, className, children, ...props }: DocsHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 fdn-z-sticky flex h-header items-center gap-3 border-b border-border bg-bg px-4",
        className,
      )}
      {...props}
    >
      {menu && <div className="flex items-center lg:hidden">{menu}</div>}
      {logo && <div className="flex min-w-0 shrink-0 items-center">{logo}</div>}
      <div className="flex min-w-0 flex-1 justify-center">{search}</div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      {children}
    </header>
  );
}
