"use client";

import { cn } from "../lib/cn";
import { Select } from "../components/forms/select";

export interface DocsVersion {
  /** Shown in the trigger and menu ("v2.4"). */
  label: string;
  /** Stable value reported to `onChange`. */
  value: string;
  /** Optional destination — followed on select when no `onChange` is given. */
  href?: string;
}

export interface VersionSelectorProps {
  versions: DocsVersion[];
  /** Currently selected version value. */
  current: string;
  /** Fires with the chosen version value. When omitted, a version's `href` is
   * navigated to instead. */
  onChange?: (value: string) => void;
  /** Accessible name of the control. Overridable (products ship Spanish copy). */
  label?: string;
  className?: string;
}

/**
 * VersionSelector — a compact docs version switcher (§26 "Vault v2.4"). A small,
 * ghost-ish preset of the forms Select showing "v2.4" in the trigger. Reports
 * the chosen value via `onChange`, or follows the version's `href` when no
 * handler is provided.
 */
export function VersionSelector({ versions, current, onChange, label = "Version", className }: VersionSelectorProps) {
  return (
    <Select
      size="xs"
      aria-label={label}
      value={current}
      onValueChange={(next) => {
        if (next == null) return;
        if (onChange) {
          onChange(next);
          return;
        }
        const target = versions.find((version) => version.value === next);
        if (target?.href && typeof window !== "undefined") window.location.href = target.href;
      }}
      items={versions.map((version) => ({ value: version.value, label: version.label }))}
      // Ghost-ish, compact: no filled box, just a hover surface (§26).
      className={cn("w-auto border-transparent bg-transparent hover:bg-surface-hover", className)}
    />
  );
}
