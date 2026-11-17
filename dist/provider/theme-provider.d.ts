import { type ReactNode } from "react";
import type { ThemeChoice } from "../lib/types";
export interface ThemeContextValue {
    /** The user's choice: dark | light | system. */
    theme: ThemeChoice;
    /** What is actually rendered right now (system resolved). */
    resolvedTheme: "dark" | "light";
    setTheme: (theme: ThemeChoice) => void;
}
export interface ThemeProviderProps {
    children: ReactNode;
    /** Initial choice when nothing is stored. Dark is the suite's design-first default. */
    defaultTheme?: ThemeChoice;
    /** Controlled theme — when provided, storage is not used. */
    theme?: ThemeChoice;
    onThemeChange?: (theme: ThemeChoice) => void;
    /** localStorage key. Set to `null` to disable persistence. */
    storageKey?: string | null;
}
/**
 * One theme source of truth (§H-09): `data-fdn-theme` on `<html>`, applied to
 * the WHOLE app — login and onboarding included. Framework-agnostic: plain
 * React, no Next.js APIs. Pair with `<ThemeScript />` in SSR apps to avoid a
 * flash of the wrong theme.
 */
export declare function ThemeProvider({ children, defaultTheme, theme: controlledTheme, onThemeChange, storageKey, }: ThemeProviderProps): import("react").JSX.Element;
export declare function useTheme(): ThemeContextValue;
