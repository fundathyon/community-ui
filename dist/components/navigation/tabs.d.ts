import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";
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
export declare function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>): import("react").JSX.Element;
export interface TabsListProps extends ComponentProps<typeof BaseTabs.List> {
}
/** Underline-style tab strip: arrow keys move AND select (Base UI roving focus). */
export declare function TabsList({ className, activateOnFocus, ...props }: TabsListProps): import("react").JSX.Element;
export interface TabProps extends ComponentProps<typeof BaseTabs.Tab> {
    /** Counter badge after the label ("Tags 12"). */
    count?: number;
}
/** One tab. Selected: full text color + 2px accent underline over the list border. */
export declare function Tab({ count, className, children, ...props }: TabProps): import("react").JSX.Element;
export interface TabsPanelProps extends ComponentProps<typeof BaseTabs.Panel> {
}
/** The view a tab controls. Rendered only while its tab is active unless `keepMounted`. */
export declare function TabsPanel({ className, ...props }: TabsPanelProps): import("react").JSX.Element;
