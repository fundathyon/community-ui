"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Select } from "../components/forms/select";
/**
 * VersionSelector — a compact docs version switcher (§26 "Vault v2.4"). A small,
 * ghost-ish preset of the forms Select showing "v2.4" in the trigger. Reports
 * the chosen value via `onChange`, or follows the version's `href` when no
 * handler is provided.
 */
export function VersionSelector({ versions, current, onChange, label = "Version", className }) {
    return (_jsx(Select, { size: "xs", "aria-label": label, value: current, onValueChange: (next) => {
            if (next == null)
                return;
            if (onChange) {
                onChange(next);
                return;
            }
            const target = versions.find((version) => version.value === next);
            if (target?.href && typeof window !== "undefined")
                window.location.href = target.href;
        }, items: versions.map((version) => ({ value: version.value, label: version.label })), 
        // Ghost-ish, compact: no filled box, just a hover surface (§26).
        className: cn("w-auto border-transparent bg-transparent hover:bg-surface-hover", className) }));
}
