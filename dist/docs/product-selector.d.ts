export interface DocsProduct {
    /** Shown in the trigger and menu ("Vault", "Dokgistry"). */
    label: string;
    /** Stable value reported to `onChange`. */
    value: string;
    /** Product id for the accent dot — becomes `data-fdn-product`, so the dot
     * picks up that product's own accent from the token cascade (§02), exactly
     * like AppSwitcher. */
    product?: string;
    /** Optional destination — followed on select when no `onChange` is given. */
    href?: string;
}
export interface ProductSelectorProps {
    products: DocsProduct[];
    /** Currently selected product value. */
    current: string;
    /** Fires with the chosen product value. When omitted, a product's `href` is
     * navigated to instead. */
    onChange?: (value: string) => void;
    /** Accessible name of the control. Overridable (products ship Spanish copy). */
    label?: string;
    className?: string;
}
/**
 * ProductSelector — switches the docs between suite products (§26/§12). Same
 * shape as VersionSelector, but each option carries a `product` accent dot,
 * scoped with `data-fdn-product` so the dot shows that product's accent (§02) —
 * the AppSwitcher pattern. Reports via `onChange`, or follows `href`.
 */
export declare function ProductSelector({ products, current, onChange, label, className }: ProductSelectorProps): import("react").JSX.Element;
