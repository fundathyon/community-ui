import { type ReactNode } from "react";
export interface DocsSearchResult {
    id: string;
    title: string;
    /** Snippet shown under the title. */
    excerpt?: string;
    /** Group heading this result belongs to ("Getting started", "API"). */
    section?: string;
    /** Destination — navigated to on select when no `onSelect` is given. */
    href?: string;
}
export interface DocsSearchProps {
    /** Runs the query. Debounced internally; may be async. */
    onSearch: (query: string) => DocsSearchResult[] | Promise<DocsSearchResult[]>;
    /** Handles a chosen result. When omitted, the result's `href` is navigated to. */
    onSelect?: (result: DocsSearchResult) => void;
    /** Text on the trigger button (looks like a search field). Overridable. */
    triggerLabel?: string;
    /** Placeholder / accessible name of the dialog input. Overridable. */
    placeholder?: string;
    /** Filtered-empty state — distinct from the initial empty input (§C-03). */
    emptyMessage?: ReactNode;
    /** Accessible name of the dialog. Overridable (products ship Spanish copy). */
    label?: string;
    /** Bind ⌘K / Ctrl+K to toggle the dialog. Default true. */
    shortcut?: boolean;
    /** Keyboard hint rendered in the trigger. */
    shortcutHint?: string;
    /** Debounce before calling `onSearch`, ms. Default 250 (§16). */
    debounceMs?: number;
    /** Extra classes for the trigger. */
    className?: string;
}
/**
 * DocsSearch — the docs-scoped ⌘K search (§26/§16). A trigger that looks like a
 * search field opens a top-aligned dialog; results are grouped by section and
 * driven by your `onSearch` (debounced 250ms, sync or async). Full combobox
 * a11y: the input keeps focus and owns `aria-activedescendant`; Arrow/Home/End
 * move, Enter selects, Esc closes.
 *
 * It searches docs content — for the app's global command menu use the overlays
 * CommandPalette instead (§16).
 */
export declare function DocsSearch({ onSearch, onSelect, triggerLabel, placeholder, emptyMessage, label, shortcut, shortcutHint, debounceMs, className, }: DocsSearchProps): import("react").JSX.Element;
