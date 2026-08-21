import type { ThemeChoice } from "../lib/types";
export interface ThemeScriptProps {
    /** Must match the ThemeProvider's storageKey. */
    storageKey?: string;
    defaultTheme?: ThemeChoice;
}
/**
 * Inline script that applies the stored theme BEFORE first paint — place it in
 * `<head>` (in Next.js: inside the root layout's `<html>`) to avoid a flash of
 * the wrong theme on SSR. Server-safe: renders a plain <script> tag.
 */
export declare function ThemeScript({ storageKey, defaultTheme }: ThemeScriptProps): import("react").JSX.Element;
