import type { ReactNode } from "react";
export interface DocsTabsItem {
    /** Tab label ("npm", "pnpm", "bun"). */
    label: string;
    /** Stable value; defaults to `label`. Sync to the URL upstream if needed. */
    value?: string;
    /** Panel content for this tab. */
    children: ReactNode;
}
export interface DocsTabsProps {
    items: DocsTabsItem[];
    /** Uncontrolled initial tab (value or label). Defaults to the first item. */
    defaultValue?: string;
    /** Accessible name of the tablist. Overridable (products ship Spanish copy). */
    label?: string;
    className?: string;
}
/**
 * DocsTabs — a thin docs preset of the shell Tabs (§12) for switching prose
 * content: install commands (npm/pnpm/bun), language variants, OS steps.
 * Uncontrolled.
 *
 * For alternatives of the SAME code snippet prefer `CodeBlock`'s own `tabs`
 * (curl/node/go) — it keeps the copy affordance and highlighting. Reach for
 * DocsTabs when each tab holds richer content than a single block.
 */
export declare function DocsTabs({ items, defaultValue, label, className }: DocsTabsProps): import("react").JSX.Element;
