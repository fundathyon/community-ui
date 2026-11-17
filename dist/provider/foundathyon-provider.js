"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo } from "react";
import { ThemeProvider } from "./theme-provider";
const FoundathyonContext = createContext({
    density: "compact",
    defaultSize: "sm",
});
/**
 * The single provider a Community product mounts at its root.
 *
 * ```tsx
 * <FoundathyonProvider product="cronify">
 *   <App />
 * </FoundathyonProvider>
 * ```
 *
 * A product contributes ONLY its accent (via `product` or `accent`) and its
 * density preference — everything else belongs to the suite. For zero-flash
 * SSR, additionally set `data-fdn-product` on `<html>` in your root layout and
 * include `<ThemeScript />` in `<head>`.
 */
export function FoundathyonProvider({ children, product, accent, density = "compact", defaultTheme, theme, onThemeChange, storageKey, }) {
    useEffect(() => {
        const root = document.documentElement;
        if (product)
            root.setAttribute("data-fdn-product", product);
        root.setAttribute("data-fdn-density", density);
        if (accent) {
            root.style.setProperty("--fdn-accent-hue", String(accent.hue));
            root.style.setProperty("--fdn-accent-l", String(accent.l));
            if (accent.c !== undefined)
                root.style.setProperty("--fdn-accent-c", String(accent.c));
            if (accent.onSolid)
                root.style.setProperty("--fdn-accent-on-solid", accent.onSolid);
        }
        return () => {
            if (product)
                root.removeAttribute("data-fdn-product");
            if (accent) {
                root.style.removeProperty("--fdn-accent-hue");
                root.style.removeProperty("--fdn-accent-l");
                root.style.removeProperty("--fdn-accent-c");
                root.style.removeProperty("--fdn-accent-on-solid");
            }
        };
    }, [product, density, accent]);
    const value = useMemo(() => ({ product, density, defaultSize: density === "comfortable" ? "lg" : "sm" }), [product, density]);
    return (_jsx(ThemeProvider, { defaultTheme: defaultTheme, theme: theme, onThemeChange: onThemeChange, storageKey: storageKey, children: _jsx(FoundathyonContext.Provider, { value: value, children: children }) }));
}
/** Product/density context. Works without a provider (compact defaults). */
export function useFoundathyon() {
    return useContext(FoundathyonContext);
}
/** The default control size for the current density (§08): sm when compact, lg when comfortable. */
export function useDefaultSize(explicit) {
    const { defaultSize } = useFoundathyon();
    return explicit ?? defaultSize;
}
