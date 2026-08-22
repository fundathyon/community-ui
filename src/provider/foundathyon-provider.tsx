"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { Density, Product, Size, ThemeChoice } from "../lib/types";
import { ThemeProvider, type ThemeProviderProps } from "./theme-provider";

/**
 * A custom accent is a hue with a calibrated lightness (§02) — NOT a hex.
 * `l` must be measured so accent-solid reaches ≥5:1 against white; if the hue
 * can't get there without losing its identity, override `onSolid` with a dark
 * color instead. Minimum separation between products: 40° of hue.
 */
export interface AccentConfig {
  /** oklch hue angle, 0–360. */
  hue: number;
  /** Calibrated oklch lightness for accent-solid (≥5:1 with white). */
  l: number;
  /** oklch chroma. Default 0.17; lower it (not `l`) for low-gamut hues like cyan. */
  c?: number;
  /** Text color over accent-solid, when white can't reach contrast. */
  onSolid?: string;
}

interface FoundathyonContextValue {
  product?: Product;
  density: Density;
  /** Default control size derived from density: sm (compact) or lg (comfortable). */
  defaultSize: Size;
}

const FoundathyonContext = createContext<FoundathyonContextValue>({
  density: "compact",
  defaultSize: "sm",
});

export interface FoundathyonProviderProps {
  children: ReactNode;
  /** Product preset — sets `data-fdn-product` so the accent hue/L apply. */
  product?: Product;
  /** Custom accent for products without a preset. Prefer presets. */
  accent?: AccentConfig;
  /** compact (28px controls, suite default) or comfortable (44px, touch). */
  density?: Density;
  defaultTheme?: ThemeChoice;
  theme?: ThemeChoice;
  onThemeChange?: (theme: ThemeChoice) => void;
  storageKey?: ThemeProviderProps["storageKey"];
}

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
export function FoundathyonProvider({
  children,
  product,
  accent,
  density = "compact",
  defaultTheme,
  theme,
  onThemeChange,
  storageKey,
}: FoundathyonProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (product) root.setAttribute("data-fdn-product", product);
    root.setAttribute("data-fdn-density", density);
    if (accent) {
      root.style.setProperty("--fdn-accent-hue", String(accent.hue));
      root.style.setProperty("--fdn-accent-l", String(accent.l));
      if (accent.c !== undefined) root.style.setProperty("--fdn-accent-c", String(accent.c));
      if (accent.onSolid) root.style.setProperty("--fdn-accent-on-solid", accent.onSolid);
    }
    return () => {
      if (product) root.removeAttribute("data-fdn-product");
      if (accent) {
        root.style.removeProperty("--fdn-accent-hue");
        root.style.removeProperty("--fdn-accent-l");
        root.style.removeProperty("--fdn-accent-c");
        root.style.removeProperty("--fdn-accent-on-solid");
      }
    };
  }, [product, density, accent]);

  const value = useMemo<FoundathyonContextValue>(
    () => ({ product, density, defaultSize: density === "comfortable" ? "lg" : "sm" }),
    [product, density],
  );

  return (
    <ThemeProvider defaultTheme={defaultTheme} theme={theme} onThemeChange={onThemeChange} storageKey={storageKey}>
      <FoundathyonContext.Provider value={value}>{children}</FoundathyonContext.Provider>
    </ThemeProvider>
  );
}

/** Product/density context. Works without a provider (compact defaults). */
export function useFoundathyon(): FoundathyonContextValue {
  return useContext(FoundathyonContext);
}

/** The default control size for the current density (§08): sm when compact, lg when comfortable. */
export function useDefaultSize(explicit?: Size): Size {
  const { defaultSize } = useFoundathyon();
  return explicit ?? defaultSize;
}
