"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";

export interface ExpandableProps {
  /** Summary shown on the trigger row ("Ver más" / "Show advanced options"). */
  title: ReactNode;
  /** Open on first render. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Expandable — a single collapsible disclosure for long, optional detail (§26):
 * the docs "accordion", but deliberately one item, not a set. Built on Base UI
 * Collapsible; the chevron rotates and the panel animates open.
 *
 * For a numbered procedure use `Steps`; for switching between equivalents use
 * `DocsTabs`. Use Expandable when the content is skippable by most readers.
 */
export function Expandable({ title, defaultOpen, open, onOpenChange, children, className }: ExpandableProps) {
  return (
    <Collapsible.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      className={cn("my-4 overflow-hidden rounded-lg border border-border", className)}
    >
      <Collapsible.Trigger
        className={cn(
          "group flex w-full select-none items-center gap-2 bg-surface px-3 py-2 text-left text-body font-medium text-text",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover",
          "fdn-touch-target",
        )}
      >
        <Icon
          icon={ChevronRight}
          size={16}
          className="text-text-muted transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] group-data-[panel-open]:rotate-90"
        />
        <span className="min-w-0 flex-1">{title}</span>
      </Collapsible.Trigger>
      <Collapsible.Panel
        className={cn(
          "overflow-hidden border-t border-border",
          // §06 height transition using Base UI's collapsible CSS var.
          "h-[var(--collapsible-panel-height)] transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
          "data-[starting-style]:h-0 data-[ending-style]:h-0",
        )}
      >
        <div className="p-3 text-sm leading-[1.7] text-text-secondary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
