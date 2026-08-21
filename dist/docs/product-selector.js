"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Select, SelectItem } from "../components/forms/select";
/**
 * ProductSelector — switches the docs between suite products (§26/§12). Same
 * shape as VersionSelector, but each option carries a `product` accent dot,
 * scoped with `data-fdn-product` so the dot shows that product's accent (§02) —
 * the AppSwitcher pattern. Reports via `onChange`, or follows `href`.
 */
export function ProductSelector({ products, current, onChange, label = "Product", className }) {
    return (_jsx(Select, { size: "xs", "aria-label": label, value: current, onValueChange: (next) => {
            if (next == null)
                return;
            if (onChange) {
                onChange(next);
                return;
            }
            const target = products.find((product) => product.value === next);
            if (target?.href && typeof window !== "undefined")
                window.location.href = target.href;
        }, className: cn("w-auto border-transparent bg-transparent hover:bg-surface-hover", className), children: products.map((product) => (_jsx(SelectItem, { value: product.value, icon: 
            // data-fdn-product on the dot itself: the cascade defines the accent
            // vars on this element, and bg-accent-solid reads them (§02).
            _jsx("span", { "data-fdn-product": product.product, "aria-hidden": true, className: "size-2 rounded-full bg-accent-solid" }), children: product.label }, product.value))) }));
}
