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
export declare function AppSwitcher({ products, label }: AppSwitcherProps): import("react").JSX.Element;
