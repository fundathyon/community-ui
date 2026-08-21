import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { gapClasses, type GapScale } from "./gap";

export type InlineAlign = "start" | "center" | "end" | "baseline";
export type InlineJustify = "start" | "center" | "end" | "between";

const alignClasses: Record<InlineAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
};

const justifyClasses: Record<InlineJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap on the 4px scale: 1=4 · 1.5=6 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 10=40. */
  gap?: GapScale;
  /** Allow items to wrap to the next line. */
  wrap?: boolean;
  /** Cross-axis alignment — defaults to center so controls of different
   * heights align by their optical middle (§15). */
  align?: InlineAlign;
  justify?: InlineJustify;
}

/**
 * Inline — horizontal flex row with gap and optional wrap (§15). Controls in
 * a row keep 8px between them (`gap={2}`), icon↔text keeps 6 (`gap={1.5}`).
 *
 * Server-component safe.
 */
export function Inline({ gap = 2, wrap = false, align = "center", justify, className, ...props }: InlineProps) {
  return (
    <div
      className={cn(
        "flex",
        wrap && "flex-wrap",
        gapClasses[gap],
        alignClasses[align],
        justify && justifyClasses[justify],
        className,
      )}
      {...props}
    />
  );
}
