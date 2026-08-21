import type { HTMLAttributes, ReactNode } from "react";
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
export declare function DocsHeader({ logo, menu, search, actions, className, children, ...props }: DocsHeaderProps): import("react").JSX.Element;
