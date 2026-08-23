"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef, useState, type ChangeEvent, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";

const sizeClasses: Record<Size, string> = {
  xs: "px-2 py-1 text-body-sm",
  sm: "px-2.5 py-1.5 text-body",
  md: "px-2.5 py-1.5 text-body",
  lg: "px-3 py-2 text-body",
};

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Follows the Input horizontal metrics (§04). Defaults to the density's size. */
  size?: Size;
  /**
   * Soft character limit: shows a live "31 / 280" counter bottom-right and turns
   * it (and the field) to danger when over. It does NOT truncate the value — the
   * user keeps control and the form validates on submit (§10).
   */
  maxLength?: number;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  /** Minimum visible rows. */
  rows?: number;
  className?: string;
}

/**
 * Textarea — multi-line text entry, e.g. a revocation reason (§10). Always
 * place it inside a FormField, which owns the label and messages. Read-only
 * stays selectable and copyable.
 *
 * With `maxLength` it renders a live counter ("31 / 280"); the limit is soft —
 * over-limit turns the counter and border to danger instead of eating input.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size, maxLength, invalid, rows = 3, className, defaultValue, value, onChange, ...props },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  const [uncontrolledLength, setUncontrolledLength] = useState(() =>
    defaultValue != null ? String(defaultValue).length : 0,
  );
  const length = value != null ? String(value).length : uncontrolledLength;
  const over = maxLength != null && length > maxLength;
  const isInvalid = invalid || over || undefined;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value == null) setUncontrolledLength(event.target.value.length);
    onChange?.(event);
  };

  return (
    <span className="flex min-w-0 flex-col gap-1">
      <BaseInput
        render={
          <textarea
            ref={ref}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...props}
          />
        }
        aria-invalid={isInvalid}
        data-invalid={isInvalid}
        className={cn(
          "w-full min-w-0 resize-y rounded-md border border-border-strong bg-surface text-text",
          "transition-colors duration-[var(--fdn-dur-fast)] placeholder:text-text-muted",
          "disabled:cursor-not-allowed disabled:opacity-45 read-only:bg-bg-subtle",
          "data-[invalid]:border-danger-border",
          // Focus indicator painted INSIDE the border-box (matches Input) so
          // it never extends past the textarea's own footprint — safe inside
          // wide Dialogs where an outset outline would sit close to the frame.
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-focus",
          sizeClasses[resolvedSize],
          className,
        )}
      />
      {maxLength != null && (
        <span
          aria-hidden
          className={cn(
            "self-end text-caption tabular-nums",
            over ? "text-danger" : "text-text-muted",
          )}
        >
          {length} / {maxLength}
        </span>
      )}
    </span>
  );
});
