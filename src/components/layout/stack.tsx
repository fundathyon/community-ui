import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { gapClasses, type GapScale } from "./gap";

export type StackAlign = "start" | "center" | "end" | "stretch";

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap on the 4px scale: 1=4 · 1.5=6 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 10=40. */
  gap?: GapScale;
  align?: StackAlign;
}

/**
 * Stack — vertical flex column with a gap from the scale. 80% of layouts (§15).
 * Nobody writes a loose `margin`: the container owns the spacing with `gap`.
 *
 * Server-component safe.
 */
export function Stack({ gap = 4, align, className, ...props }: StackProps) {
  return (
    <div
      className={cn("flex flex-col", gapClasses[gap], align && alignClasses[align], className)}
      {...props}
    />
  );
}
