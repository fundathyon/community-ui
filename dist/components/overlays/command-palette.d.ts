import { type ReactNode } from "react";
export interface CommandItem {
    id: string;
    label: string;
    /** Leading icon, e.g. `<Icon icon={Boxes} size={16} />`. */
    icon?: ReactNode;
    /** Right-aligned shortcut hint ("G R", "⌘T"). Purely visual. */
    shortcut?: string;
    /** Extra strings the filter matches besides the label. */
    keywords?: string[];
    onSelect?: () => void;
}
export interface CommandGroup {
    /** Same categories in every product (§16): "Ir a", "Acciones", "Recientes". */
    heading: string;
    items: CommandItem[];
}
export interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: CommandGroup[];
    /** Search input placeholder. It also serves as the input's accessible name. */
    placeholder?: string;
    /**
     * Heading of the recents group (§16 "Recientes"). That group is only shown
     * while the query is empty — recents never match a search.
     */
    recentLabel?: string;
    /** Fires after the item's own `onSelect`; the palette closes afterwards. */
    onSelect?: (item: CommandItem) => void;
    /** "No results" slot — a filtered-empty state, distinct from empty (§C-03). */
    emptyMessage?: ReactNode;
    /** Accessible name of the dialog. Default "Command menu" — always overridable. */
    label?: string;
}
/**
 * CommandPalette — the ⌘K command menu (§16), identical in every product and
 * with the same categories: "Ir a", "Acciones", "Recientes". Every new product
 * action is registered here besides its screen. Renders at `fdn-z-command`,
 * the ceiling of the system (§05), top-aligned at 20vh.
 *
 * The list follows the combobox pattern: the input keeps focus and owns
 * `aria-activedescendant`; ArrowUp/Down move (wrapping), Enter selects, Esc
 * closes. Filtering is case- and diacritic-insensitive over label + keywords.
 *
 * Pair it with `useCommandPalette()` for the global ⌘K / Ctrl+K shortcut:
 *
 * ```tsx
 * const palette = useCommandPalette();
 * <CommandPalette open={palette.open} onOpenChange={palette.setOpen} items={groups} />
 * ```
 */
export declare function CommandPalette({ open, onOpenChange, items, placeholder, recentLabel, onSelect, emptyMessage, label, }: CommandPaletteProps): import("react").JSX.Element;
/**
 * Global ⌘K / Ctrl+K state for the CommandPalette (§16 — the shortcut is
 * identical across the suite and no product may reassign it). Registers a
 * window keydown listener that toggles the palette; cleaned up on unmount.
 */
export declare function useCommandPalette(): {
    open: boolean;
    setOpen: (open: boolean) => void;
};
