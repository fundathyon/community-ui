"use client";

import { OTPField } from "@base-ui/react/otp-field";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";

const sizeClasses: Record<Size, string> = {
  xs: "size-control-xs text-body-sm",
  sm: "size-control-sm text-body",
  md: "size-control-md text-body",
  lg: "size-control-lg text-body",
};

export interface CodeInputProps
  extends Omit<
    ComponentProps<typeof OTPField.Root>,
    "length" | "validationType" | "onValueChange" | "onValueComplete" | "className" | "render" | "mask"
  > {
  /** Number of character slots. */
  length?: number;
  /**
   * Optical grouping, e.g. `[3, 3]` (§23: grouping reduces read errors —
   * never six identical boxes). Must sum to `length`, otherwise a single
   * group is rendered.
   */
  groups?: readonly number[];
  type?: "numeric" | "alphanumeric";
  /** Box size. Defaults to the density's size. */
  size?: Size;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  onValueChange?: (value: string) => void;
  /** Fired when every slot is filled — trigger your verification here. */
  onComplete?: (value: string) => void;
  /** Submit the owning `<form>` automatically when the code completes. */
  autoSubmit?: boolean;
  className?: string;
}

/**
 * CodeInput — segmented code entry (§10, §23). It NEVER blocks paste (a full
 * code pasted anywhere distributes across the slots) nor the SMS/keychain
 * autofill (`autoComplete="one-time-code"`); Backspace moves back a slot.
 * Typing advances automatically and `onComplete` fires when full.
 *
 * For the two-factor / verification preset (numeric, 3+3 grouping) use
 * OTPInput.
 */
export const CodeInput = forwardRef<HTMLDivElement, CodeInputProps>(function CodeInput(
  {
    length = 6,
    groups,
    type = "numeric",
    size,
    invalid,
    onValueChange,
    onComplete,
    className,
    ...props
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  const resolvedGroups: readonly number[] =
    groups && groups.length > 0 && groups.reduce((a, b) => a + b, 0) === length ? groups : [length];

  let slotIndex = 0;
  return (
    <OTPField.Root
      ref={ref}
      length={length}
      validationType={type === "alphanumeric" ? "alphanumeric" : "numeric"}
      onValueChange={onValueChange ? (value) => onValueChange(value) : undefined}
      onValueComplete={onComplete ? (value) => onComplete(value) : undefined}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {resolvedGroups.map((count, groupIdx) => (
        <div key={groupIdx} className="flex items-center gap-1.5">
          {Array.from({ length: count }, () => {
            const key = slotIndex++;
            return (
              <OTPField.Input
                key={key}
                aria-invalid={invalid || undefined}
                data-invalid={invalid || undefined}
                className={cn(
                  "block rounded-md border border-border-strong bg-surface text-center text-text",
                  "transition-colors duration-[var(--fdn-dur-fast)] placeholder:text-text-muted",
                  "disabled:cursor-not-allowed disabled:opacity-45",
                  "data-[invalid]:border-danger-border",
                  type === "numeric" && "tabular-nums",
                  sizeClasses[resolvedSize],
                )}
              />
            );
          })}
        </div>
      ))}
    </OTPField.Root>
  );
});

export type OTPInputProps = Omit<CodeInputProps, "type">;

/**
 * OTPInput — the verification-code preset of CodeInput (§23): numeric, SMS
 * autofill via `one-time-code`, and 3+3 optical grouping by default. Paste and
 * autocomplete are never blocked; after repeated failures show a `Locked`
 * state with an explicit deadline — never an "unknown error" (§23).
 */
export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(function OTPInput(
  { length = 6, groups, ...props },
  ref,
) {
  const defaultGroups = length % 2 === 0 && length >= 6 ? [length / 2, length / 2] : undefined;
  return <CodeInput ref={ref} type="numeric" length={length} groups={groups ?? defaultGroups} {...props} />;
});
