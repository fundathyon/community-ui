"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(null);
function readStored(storageKey) {
    if (!storageKey || typeof window === "undefined")
        return null;
    try {
        const raw = window.localStorage.getItem(storageKey);
        return raw === "dark" || raw === "light" || raw === "system" ? raw : null;
    }
    catch {
        return null;
    }
}
function systemTheme() {
    if (typeof window === "undefined")
        return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
/**
 * One theme source of truth (§H-09): `data-fdn-theme` on `<html>`, applied to
 * the WHOLE app — login and onboarding included. Framework-agnostic: plain
 * React, no Next.js APIs. Pair with `<ThemeScript />` in SSR apps to avoid a
 * flash of the wrong theme.
 */
export function ThemeProvider({ children, defaultTheme = "system", theme: controlledTheme, onThemeChange, storageKey = "fdn-theme", }) {
    const [internal, setInternal] = useState(() => controlledTheme ?? readStored(storageKey) ?? defaultTheme);
    const theme = controlledTheme ?? internal;
    const [system, setSystem] = useState(systemTheme);
    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: light)");
        const onChange = () => setSystem(mql.matches ? "light" : "dark");
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "system")
            root.removeAttribute("data-fdn-theme");
        else
            root.setAttribute("data-fdn-theme", theme);
    }, [theme]);
    const setTheme = useCallback((next) => {
        setInternal(next);
        onThemeChange?.(next);
        if (storageKey) {
            try {
                window.localStorage.setItem(storageKey, next);
            }
            catch {
                /* storage unavailable — theme still applies for the session */
            }
        }
    }, [onThemeChange, storageKey]);
    const value = useMemo(() => ({ theme, resolvedTheme: theme === "system" ? system : theme, setTheme }), [theme, system, setTheme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("useTheme must be used within a ThemeProvider / FoundathyonProvider");
    return ctx;
}
