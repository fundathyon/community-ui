import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Tab, Tabs, TabsList, TabsPanel } from "../components/navigation/tabs";
/**
 * DocsTabs — a thin docs preset of the shell Tabs (§12) for switching prose
 * content: install commands (npm/pnpm/bun), language variants, OS steps.
 * Uncontrolled.
 *
 * For alternatives of the SAME code snippet prefer `CodeBlock`'s own `tabs`
 * (curl/node/go) — it keeps the copy affordance and highlighting. Reach for
 * DocsTabs when each tab holds richer content than a single block.
 */
export function DocsTabs({ items, defaultValue, label = "Content variants", className }) {
    const valueOf = (item) => item.value ?? item.label;
    const initial = defaultValue ?? (items[0] ? valueOf(items[0]) : undefined);
    return (_jsxs(Tabs, { defaultValue: initial, className: cn("my-6", className), children: [_jsx(TabsList, { "aria-label": label, children: items.map((item) => (_jsx(Tab, { value: valueOf(item), children: item.label }, valueOf(item)))) }), items.map((item) => (_jsx(TabsPanel, { value: valueOf(item), className: "text-sm leading-[1.7]", children: item.children }, valueOf(item))))] }));
}
