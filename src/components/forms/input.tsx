"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";

const sizeClasses: Record<Size, string> = {
  xs: "h-control-xs px-2 text-body-sm",
  sm: "h-control-sm px-2.5 text-body",
  md: "h-control-md px-2.5 text-body",
  lg: "h-control-lg px-3 text-body",
};

export interface InputProps extends Omit<ComponentProps<typeof BaseInput>, "size"> {
  /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
  size?: Size;
  /** Slot before the value: an icon, or a static prefix like a base URL.
   * Search inputs and input groups are THIS component with slots — not
   * separate components (§10). */
  leading?: ReactNode;
  /** Slot after the value: an icon, a unit, a reveal button… */
  trailing?: ReactNode;
  /** Marks invalid when used standalone. Inside a FormField the field state
   * drives this automatically. */
  invalid?: boolean;
  /** Extra classes for the outer box (border carrier). `className` goes to the
   * inner `<input>`. */
  wrapperClassName?: string;
}

/**
 * Text input. Always place it inside a FormField, which owns the label and
 * messages. Read-only stays selectable and copyable; disabled means the value
 * is not editable AND not relevant to interact with.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size, leading, trailing, invalid, className, wrapperClassName, disabled, ...props },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  return (
    <span
      data-invalid={invalid || undefined}
      className={cn(
        "flex min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-surface text-text",
        "transition-colors duration-[var(--fdn-dur-fast)]",
        // §C-02: visible ring on the visual box, not only a border color change
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        "has-[input[data-invalid]]:border-danger-border data-[invalid]:border-danger-border",
        "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-45",
        "has-[input[readonly]]:bg-bg-subtle",
        sizeClasses[resolvedSize],
        wrapperClassName,
      )}
    >
      {leading && <span className="flex shrink-0 items-center text-text-muted">{leading}</span>}
      <BaseInput
        ref={ref}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={cn(
          "h-full w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      {trailing && <span className="flex shrink-0 items-center text-text-muted">{trailing}</span>}
    </span>
  );
});
