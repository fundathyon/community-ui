import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Tab, Tabs, TabsList, TabsPanel } from "../components/navigation/tabs";

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
export function DocsTabs({ items, defaultValue, label = "Content variants", className }: DocsTabsProps) {
  const valueOf = (item: DocsTabsItem) => item.value ?? item.label;
  const initial = defaultValue ?? (items[0] ? valueOf(items[0]) : undefined);
  return (
    <Tabs defaultValue={initial} className={cn("my-6", className)}>
      <TabsList aria-label={label}>
        {items.map((item) => (
          <Tab key={valueOf(item)} value={valueOf(item)}>
            {item.label}
          </Tab>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsPanel key={valueOf(item)} value={valueOf(item)} className="text-sm leading-[1.7]">
          {item.children}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
