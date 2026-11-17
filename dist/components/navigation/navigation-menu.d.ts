import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type { AnchorHTMLAttributes, ComponentProps, ReactElement, ReactNode } from "react";
export interface NavigationMenuProps extends ComponentProps<typeof BaseNavigationMenu.Root> {
}
/**
 * NavigationMenu — horizontal nav with hover/click popups, for docs and
 * marketing headers. NOT the app shell: product screens navigate with the
 * Sidebar (§12). Thin wrapper over Base UI; compose with NavigationMenuItem.
 */
export declare function NavigationMenu({ className, children, ...props }: NavigationMenuProps): import("react").JSX.Element;
export interface NavigationMenuItemProps {
    /** The trigger label. */
    label: ReactNode;
    /** Popup content. Omit it to render a plain link instead of a popup. */
    children?: ReactNode;
    /** Link destination when the item has no popup. */
    href?: string;
    /** Router substitution for the no-popup form — receives the wired props:
     * `render={(props) => <RouterLink to="…" {...props} />}`. */
    render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: ReactNode;
    }) => ReactElement;
    className?: string;
}
/**
 * NavigationMenuItem — one top-level destination: a popup (label + content)
 * or a plain link (label + href). Keyboard and hover behavior come from
 * Base UI.
 */
export declare function NavigationMenuItem({ label, children, href, render, className }: NavigationMenuItemProps): import("react").JSX.Element;
