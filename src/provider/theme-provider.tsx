"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeChoice } from "../lib/types";

export interface ThemeContextValue {
  /** The user's choice: dark | light | system. */
  theme: ThemeChoice;
  /** What is actually rendered right now (system resolved). */
  resolvedTheme: "dark" | "light";
  setTheme: (theme: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

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

function readStored(storageKey: string | null): ThemeChoice | null {
  if (!storageKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw === "dark" || raw === "light" || raw === "system" ? raw : null;
  } catch {
    return null;
  }
}

function systemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/**
 * One theme source of truth (§H-09): `data-fdn-theme` on `<html>`, applied to
 * the WHOLE app — login and onboarding included. Framework-agnostic: plain
 * React, no Next.js APIs. Pair with `<ThemeScript />` in SSR apps to avoid a
 * flash of the wrong theme.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  theme: controlledTheme,
  onThemeChange,
  storageKey = "fdn-theme",
}: ThemeProviderProps) {
  const [internal, setInternal] = useState<ThemeChoice>(
    () => controlledTheme ?? readStored(storageKey) ?? defaultTheme,
  );
  const theme = controlledTheme ?? internal;

  const [system, setSystem] = useState<"dark" | "light">(systemTheme);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => setSystem(mql.matches ? "light" : "dark");
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-fdn-theme");
    else root.setAttribute("data-fdn-theme", theme);
  }, [theme]);

  const setTheme = useCallback(
    (next: ThemeChoice) => {
      setInternal(next);
      onThemeChange?.(next);
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          /* storage unavailable — theme still applies for the session */
        }
      }
    },
    [onThemeChange, storageKey],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme === "system" ? system : theme, setTheme }),
    [theme, system, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider / FoundathyonProvider");
  return ctx;
}
