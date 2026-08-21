"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SeparatorProps extends ComponentProps<typeof BaseSeparator> {
  /** Centered label between two lines (§09 "Divider con etiqueta").
   * Horizontal orientation only. */
  label?: ReactNode;
}

/**
 * Separator — a divider accessible to screen readers (`role="separator"`).
 * Plain 1px line, or a labeled variant with a centered caption ("or",
 * "Continue with SSO"). Structure comes from borders, not shadows (§05).
 */
export function Separator({ orientation = "horizontal", label, className, ...props }: SeparatorProps) {
  if (label != null && orientation === "horizontal") {
    return (
      <BaseSeparator
        orientation={orientation}
        className={cn("flex w-full items-center gap-3", className)}
        {...props}
      >
        <span aria-hidden className="h-px flex-1 bg-border" />
        <span className="text-caption text-text-muted">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </BaseSeparator>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full bg-border" : "w-px self-stretch bg-border",
        className,
      )}
      {...props}
    />
  );
}
