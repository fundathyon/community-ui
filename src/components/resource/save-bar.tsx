"use client";

import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";

function defaultCountLabel(count: number): string {
  return count === 1 ? "1 unsaved change" : `${count} unsaved changes`;
}

export interface SaveBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Number of unsaved changes, shown on the left (§25). */
  count?: number;
  /** Format the count copy — products pass their own ("2 cambios sin guardar"). */
  countLabel?: (count: number) => string;
  onDiscard?: () => void;
  onSave?: () => void;
  /** Discard button copy. Default "Discard". */
  discardLabel?: string;
  /** Save button copy. Default "Save". */
  saveLabel?: string;
  /** Shows the save button's loading state and disables both actions. */
  saving?: boolean;
}

/**
 * SaveBar — the deferred-save affordance for a settings section (§25). It appears
 * attached to the end of the section with the count of unsaved changes; there is
 * NEVER a global "Save" at the bottom of a long settings page. Sticky within its
 * container, on a raised surface with a border and a soft shadow.
 */
export function SaveBar({
  count = 0,
  countLabel = defaultCountLabel,
  onDiscard,
  onSave,
  discardLabel = "Discard",
  saveLabel = "Save",
  saving = false,
  className,
  ...props
}: SaveBarProps) {
  return (
    <div
      role="region"
      aria-label="Unsaved changes"
      className={cn(
        "sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-raised px-4 py-3 shadow-sm",
        className,
      )}
      {...props}
    >
      <span className="text-body-sm text-text-secondary">{countLabel(count)}</span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onDiscard} disabled={saving}>
          {discardLabel}
        </Button>
        <Button variant="primary" onClick={onSave} loading={saving}>
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
