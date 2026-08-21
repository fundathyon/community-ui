"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  /** Text only, one line, no actions or links inside (§09). If the user NEEDS
   * it to complete the task, it must be visible text, not a tooltip (§17). */
  content: ReactNode;
  /** The trigger element (button, icon button, truncated cell…). */
  children: ReactElement;
  side?: TooltipSide;
  /** Hover open delay in ms; keyboard focus opens immediately (§09). */
  delay?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Tooltip — names icon-only controls and adds dispensable detail. Appears
 * after 400ms of hover and immediately on keyboard focus. Popover is the
 * component that admits interactive content; Tooltip never does.
 */
export function Tooltip({ content, children, side = "top", delay = 400, disabled = false, className }: TooltipProps) {
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6} className="fdn-z-dropdown">
          <BaseTooltip.Popup
            className={cn(
              "max-w-64 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2 py-1 text-caption text-text shadow-md",
              "transition-opacity duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
              "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
              className,
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/** Optional group provider: once one tooltip opened, adjacent ones open instantly. */
export const TooltipProvider = BaseTooltip.Provider;
