"use client";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { forwardRef, useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface RadioGroupProps
  extends Omit<ComponentProps<typeof BaseRadioGroup>, "className" | "render"> {
  className?: string;
}

/**
 * RadioGroup — 2 to 5 mutually exclusive options that benefit from being
 * compared at a glance (§10, §17). Above 5 use Select; searchable or growing
 * lists use Combobox. Arrow keys move the selection (native radio semantics).
 *
 * Compose with `Radio` children; always inside a FormField, which owns the
 * group label and messages.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, ...props },
  ref,
) {
  return <BaseRadioGroup ref={ref} className={cn("flex min-w-0 flex-col gap-2", className)} {...props} />;
});

export interface RadioProps extends Omit<ComponentProps<typeof BaseRadio.Root>, "className" | "render"> {
  /** Visible label — the WHOLE label row is clickable (§10). */
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  className?: string;
}

/**
 * One option of a RadioGroup. The entire label + description row selects it;
 * the checked dot uses the accent (action), never a state tone (§02).
 */
export const Radio = forwardRef<HTMLElement, RadioProps>(function Radio(
  { label, description, className, disabled, ...props },
  ref,
) {
  const labelId = useId();
  const descriptionId = useId();
  return (
    <label
      className={cn(
        "flex w-fit min-w-0 select-none items-start gap-2",
        disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
        className,
      )}
    >
      <BaseRadio.Root
        ref={ref}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface",
          "transition-colors duration-[var(--fdn-dur-fast)]",
          "data-[checked]:border-accent-solid",
          "data-[invalid]:border-danger-border",
          "fdn-touch-target",
        )}
        {...props}
      >
        <BaseRadio.Indicator className="flex size-2 rounded-full bg-accent-solid data-[unchecked]:hidden" />
      </BaseRadio.Root>
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
    </label>
  );
});
