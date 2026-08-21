"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, } from "react";
import { cn } from "../../lib/cn";
import { FOCUS_RING_INSET } from "../../lib/focus";
import { Icon } from "../typography/icon";
/** Case- and diacritic-insensitive normalization for filtering. */
function normalize(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
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
export function CommandPalette({ open, onOpenChange, items, placeholder = "Type a command or search…", recentLabel, onSelect, emptyMessage = "No results", label = "Command menu", }) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const baseId = useId();
    const listId = `${baseId}-list`;
    // Fresh state on every open, before paint so the previous query never flashes.
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
        }
    }, [open]);
    const filtered = useMemo(() => {
        const q = normalize(query.trim());
        const groups = [];
        let index = 0;
        for (const group of items) {
            // Recents are only offered while the query is empty (§16).
            if (q !== "" && recentLabel !== undefined && group.heading === recentLabel)
                continue;
            const matches = group.items.filter((item) => {
                if (q === "")
                    return true;
                const haystack = [item.label, ...(item.keywords ?? [])];
                return haystack.some((text) => normalize(text).includes(q));
            });
            if (matches.length === 0)
                continue;
            groups.push({ heading: group.heading, options: matches.map((item) => ({ item, index: index++ })) });
        }
        return groups;
    }, [items, query, recentLabel]);
    const flat = useMemo(() => filtered.flatMap((group) => group.options), [filtered]);
    const activeIdx = flat.length === 0 ? -1 : Math.min(activeIndex, flat.length - 1);
    const optionId = (item) => `${baseId}-option-${item.id}`;
    const activeItem = activeIdx === -1 ? undefined : flat[activeIdx]?.item;
    const activeId = activeItem ? optionId(activeItem) : undefined;
    useEffect(() => {
        if (activeId && typeof document !== "undefined") {
            document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
        }
    }, [activeId]);
    const select = (item) => {
        item.onSelect?.();
        onSelect?.(item);
        onOpenChange(false);
    };
    const handleKeyDown = (event) => {
        if (flat.length === 0)
            return;
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveIndex((activeIdx + 1) % flat.length);
                break;
            case "ArrowUp":
                event.preventDefault();
                setActiveIndex((activeIdx - 1 + flat.length) % flat.length);
                break;
            case "Home":
                event.preventDefault();
                setActiveIndex(0);
                break;
            case "End":
                event.preventDefault();
                setActiveIndex(flat.length - 1);
                break;
            case "Enter":
                if (event.nativeEvent.isComposing)
                    return;
                event.preventDefault();
                if (activeItem)
                    select(activeItem);
                break;
            default:
                break;
        }
    };
    return (_jsx(BaseDialog.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(BaseDialog.Portal, { children: [_jsx(BaseDialog.Backdrop, { className: cn("fixed inset-0 fdn-z-command bg-black/60", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsxs(BaseDialog.Popup, { "aria-label": label, initialFocus: inputRef, className: cn(
                    // top-aligned, never centered: the list grows downward (§16)
                    "fixed inset-x-4 top-[20vh] fdn-z-command mx-auto flex max-h-[60vh] flex-col overflow-hidden", "rounded-xl border border-border bg-surface-raised shadow-xl", "sm:inset-x-0 sm:w-full sm:max-w-modal-md", "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0"), children: [_jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-3", children: [_jsx(Icon, { icon: Search, size: 16, className: "text-text-muted" }), _jsx("input", { ref: inputRef, role: "combobox", "aria-expanded": true, "aria-controls": listId, "aria-activedescendant": activeId, "aria-autocomplete": "list", "aria-label": placeholder, placeholder: placeholder, value: query, onChange: (event) => {
                                        setQuery(event.target.value);
                                        setActiveIndex(0);
                                    }, onKeyDown: handleKeyDown, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: cn(
                                    // No `outline-none` here: Tailwind v4's outline utilities share
                                    // one `--tw-outline-style` custom property, so an unconditional
                                    // `outline-none` on this SAME element would poison it and leave
                                    // `focus-visible:outline` below permanently resolving to `none`
                                    // — the ring would never render at all, focused or not. `@layer
                                    // utilities` already beats base.css's global ring unconditionally,
                                    // so no reset is needed before applying this inset override.
                                    "h-11 w-full bg-transparent text-body text-text placeholder:text-text-muted", 
                                    // Inset (§C-02): this row sits flush against the palette's own
                                    // rounded top edge, so a normal positive-offset ring would clip
                                    // against the dialog's overflow — never suppressed without a
                                    // substitute, per the same rule base.css's global ring exists for.
                                    FOCUS_RING_INSET) })] }), _jsx("div", { className: "flex-1 overflow-y-auto overscroll-contain p-1", role: "listbox", id: listId, "aria-label": label, children: filtered.map((group, groupIndex) => {
                                // ids must not contain the heading text (spaces break aria-labelledby)
                                const headingId = `${baseId}-group-${groupIndex}`;
                                return (_jsxs("div", { role: "group", "aria-labelledby": headingId, children: [_jsx("div", { id: headingId, role: "presentation", className: "px-2 pb-1 pt-2 text-overline text-text-muted", children: group.heading }), group.options.map(({ item, index }) => (_jsxs("div", { id: optionId(item), role: "option", "aria-selected": index === activeIdx, className: cn("flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body text-text", index === activeIdx && "bg-surface-hover"), onMouseMove: () => setActiveIndex(index), 
                                            // keep focus on the combobox input while clicking options
                                            onMouseDown: (event) => event.preventDefault(), onClick: () => select(item), children: [item.icon && (_jsx("span", { className: "flex shrink-0 items-center text-text-muted [&_svg]:size-4", children: item.icon })), _jsx("span", { className: "min-w-0 truncate", children: item.label }), item.shortcut && (_jsx("kbd", { className: "ml-auto shrink-0 rounded-sm border border-border bg-bg-subtle px-1 font-sans text-caption text-text-secondary", children: item.shortcut }))] }, item.id)))] }, group.heading));
                            }) }), flat.length === 0 && (_jsx("div", { role: "status", className: "shrink-0 px-3 pb-8 pt-4 text-center text-body text-text-secondary", children: emptyMessage }))] })] }) }));
}
/**
 * Global ⌘K / Ctrl+K state for the CommandPalette (§16 — the shortcut is
 * identical across the suite and no product may reassign it). Registers a
 * window keydown listener that toggles the palette; cleaned up on unmount.
 */
export function useCommandPalette() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && (event.key === "k" || event.key === "K")) {
                event.preventDefault();
                setOpen((previous) => !previous);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
    return { open, setOpen };
}
