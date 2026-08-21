"use client";

import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/types";

export type ProgressVariant = "bar" | "circular";
export type ProgressCircularSize = 16 | 20;

export interface ProgressProps extends Omit<ComponentProps<typeof BaseProgress.Root>, "children"> {
  /** Current value; `null` renders the indeterminate bar. (From Base UI Root.) */
  value: number | null;
  /** Visible label ("Subiendo capas 3 de 7"). */
  label?: ReactNode;
  /** Overrides the visible value text. Defaults to the formatted value ("68%"). */
  valueText?: string;
  /** Fill semantics — quota bars turn `warning`/`danger` at thresholds the APP
   * decides (§11). Default fill is the accent (the user's own action). */
  tone?: Tone;
  /** `circular` only when the progress accompanies a small element — a row, an
   * avatar (§11). Everything else is a bar. */
  variant?: ProgressVariant;
  /** Circular diameter in px (§11). */
  size?: ProgressCircularSize;
}

const toneFill: Record<Tone, string> = {
  info: "bg-info-solid",
  success: "bg-success-solid",
  warning: "bg-warning-solid",
  danger: "bg-danger-solid",
};

const toneStroke: Record<Tone, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

/**
 * Progress (§11) — HARD RULE: every determinate bar carries its value as
 * visible text; the bar alone is not accessible. Indeterminate (`value={null}`)
 * only when the total is unknown — and >2s waits must say WHAT is happening
 * via `label` (§17). `aria-valuenow`/`aria-valuetext` come from Base UI.
 */
export function Progress({
  value,
  max = 100,
  min = 0,
  label,
  valueText,
  tone,
  variant = "bar",
  size = 16,
  format,
  className,
  ...props
}: ProgressProps) {
  const determinate = value !== null;
  const valueChildren = valueText ? () => valueText : undefined;

  if (variant === "circular") {
    const radius = 6.5; // 16-grid circle, 1.5px stroke — same geometry as Spinner
    const circumference = 2 * Math.PI * radius;
    const fraction = determinate ? Math.min(Math.max((value - min) / (max - min), 0), 1) : 0.25;
    return (
      <BaseProgress.Root
        value={value}
        min={min}
        max={max}
        format={format}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn("-rotate-90", tone ? toneStroke[tone] : "text-accent", !determinate && "fdn-spin")}
        >
          <circle cx="8" cy="8" r={radius} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <circle
            cx="8"
            cy="8"
            r={radius}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
          />
        </svg>
        {determinate && (
          <BaseProgress.Value className="text-caption tabular-nums text-text-secondary">
            {valueChildren}
          </BaseProgress.Value>
        )}
      </BaseProgress.Root>
    );
  }

  return (
    <BaseProgress.Root
      value={value}
      min={min}
      max={max}
      format={format}
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    >
      {(label || determinate) && (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <BaseProgress.Label className="min-w-0 truncate text-label text-text-secondary">
              {label}
            </BaseProgress.Label>
          ) : (
            <span aria-hidden />
          )}
          {determinate && (
            <BaseProgress.Value className="text-label tabular-nums text-text-secondary">
              {valueChildren}
            </BaseProgress.Value>
          )}
        </div>
      )}
      <BaseProgress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <BaseProgress.Indicator
          className={cn(
            "h-full rounded-full",
            tone ? toneFill[tone] : "bg-accent-solid",
            determinate
              ? "transition-[width] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]"
              : "fdn-indeterminate w-1/3",
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
