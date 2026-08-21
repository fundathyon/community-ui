"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../feedback/badge";

/**
 * Tabs (§12) — change views within the SAME object, max 5. If the target is a
 * different resource it belongs in the sidebar; tabs never replace it, and
 * never navigate elsewhere. Slow-loading tabs get their own URL: sync with
 * `value`/`onValueChange`.
 *
 * Composition:
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <Tab value="overview">Overview</Tab>
 *     <Tab value="tags" count={12}>Tags</Tab>
 *   </TabsList>
 *   <TabsPanel value="overview">…</TabsPanel>
 *   <TabsPanel value="tags">…</TabsPanel>
 * </Tabs>
 * ```
 */
export function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>) {
  return <BaseTabs.Root className={cn("flex flex-col gap-4", className)} {...props} />;
}

export interface TabsListProps extends ComponentProps<typeof BaseTabs.List> {}

/** Underline-style tab strip: arrow keys move AND select (Base UI roving focus). */
export function TabsList({ className, activateOnFocus = true, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      activateOnFocus={activateOnFocus}
      className={cn("flex items-center gap-1 border-b border-border", className)}
      {...props}
    />
  );
}

export interface TabProps extends ComponentProps<typeof BaseTabs.Tab> {
  /** Counter badge after the label ("Tags 12"). */
  count?: number;
}

/** One tab. Selected: full text color + 2px accent underline over the list border. */
export function Tab({ count, className, children, ...props }: TabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "relative inline-flex h-9 select-none items-center gap-1.5 px-3 text-body text-text-muted",
        "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
        "hover:text-text data-[active]:text-text",
        // 2px accent underline, sitting on top of the list's 1px border.
        "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-transparent after:content-['']",
        "data-[active]:after:bg-accent-solid",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
        "fdn-touch-target",
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && <Badge variant="counter">{count}</Badge>}
    </BaseTabs.Tab>
  );
}

export interface TabsPanelProps extends ComponentProps<typeof BaseTabs.Panel> {}

/** The view a tab controls. Rendered only while its tab is active unless `keepMounted`. */
export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={cn("min-w-0", className)} {...props} />;
}
