"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { forwardRef, useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps extends Omit<ComponentProps<typeof BaseSwitch.Root>, "className" | "render"> {
  /** Visible label — the WHOLE row is clickable (§10). */
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  className?: string;
}

/**
 * Switch — applies its effect IMMEDIATELY, no Save button involved (§10). If
 * the change must be saved with the form, it is a Checkbox. The whole
 * label + description row toggles it; checked uses the accent because it is
 * an action, not a state tone (§02).
 *
 * On failure of the immediate operation, revert the switch visually and
 * explain the error in place — never leave it lying (§16).
 */
export const Switch = forwardRef<HTMLElement, SwitchProps>(function Switch(
  { label, description, className, disabled, ...props },
  ref,
) {
  const labelId = useId();
  const descriptionId = useId();
  return (
    <label
      className={cn(
        "flex min-w-0 select-none items-center justify-between gap-3",
        disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
        className,
      )}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span id={labelId} className="text-label text-text">
          {label}
        </span>
        {description && (
          <span id={descriptionId} className="text-caption text-text-muted">
            {description}
          </span>
        )}
      </span>
      <BaseSwitch.Root
        ref={ref}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "flex h-4 w-7 shrink-0 items-center rounded-full bg-border-strong p-0.5",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
          "data-[checked]:bg-accent-solid",
          "fdn-touch-target",
        )}
        {...props}
      >
        <BaseSwitch.Thumb
          className={cn(
            "size-3 rounded-full bg-surface shadow-xs",
            "transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
            "data-[checked]:translate-x-3",
          )}
        />
      </BaseSwitch.Root>
    </label>
  );
});
