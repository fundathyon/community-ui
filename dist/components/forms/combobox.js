"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
export const comboboxSizeClasses = {
    xs: "min-h-control-xs px-2 text-body-sm",
    sm: "min-h-control-sm px-2.5 text-body",
    md: "min-h-control-md px-2.5 text-body",
    lg: "min-h-control-lg px-3 text-body",
};
/** Internal: renders `text` with the matched `query` fragment emphasized. */
export function MatchHighlight({ text, query }) {
    const trimmed = query.trim();
    if (!trimmed)
        return _jsx(_Fragment, { children: text });
    const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
    if (index === -1)
        return _jsx(_Fragment, { children: text });
    return (_jsxs(_Fragment, { children: [text.slice(0, index), _jsx("mark", { className: "bg-transparent font-semibold text-accent", children: text.slice(index, index + trimmed.length) }), text.slice(index + trimmed.length)] }));
}
/** Internal: shared option row used by Combobox and MultiSelect popups. */
export function ComboboxItemRow({ item, query }) {
    return (_jsxs(BaseCombobox.Item, { value: item, disabled: item.disabled, "aria-label": item.label, className: cn("flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body-sm text-text outline-none", "transition-colors duration-[var(--fdn-dur-fast)]", "data-[highlighted]:bg-surface-hover", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45"), children: [item.icon && _jsx("span", { className: "flex shrink-0 items-center text-text-muted [&_svg]:size-4", children: item.icon }), _jsxs("span", { className: "flex min-w-0 flex-1 flex-col", children: [_jsx("span", { className: "truncate", children: _jsx(MatchHighlight, { text: item.label, query: query }) }), item.description && _jsx("span", { className: "truncate text-caption text-text-muted", children: item.description })] }), _jsx(BaseCombobox.ItemIndicator, { className: "flex shrink-0 items-center text-accent", children: _jsx(Icon, { icon: Check, size: 14 }) })] }));
}
/** Internal: popup chrome shared by Combobox and MultiSelect. */
export function ComboboxPopup({ empty, children }) {
    return (_jsx(BaseCombobox.Portal, { children: _jsx(BaseCombobox.Positioner, { sideOffset: 4, className: "fdn-z-dropdown outline-none", children: _jsxs(BaseCombobox.Popup, { className: cn("max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-border bg-surface-raised p-1 shadow-md", "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0"), children: [_jsx(BaseCombobox.Empty, { className: "px-2 py-4 text-center text-body-sm text-text-muted empty:hidden", children: empty }), children] }) }) }));
}
/**
 * Combobox — searchable selection (§10, §17): for more than 7 options, or a
 * list that grows with the data. The match is highlighted, arrows navigate,
 * Enter selects and Esc closes WITHOUT changing the selection — the typed
 * text is never lost on close (§10). For ≤ 7 fixed options use Select.
 *
 * Autocomplete (accepting values outside the list) is a Base UI concern —
 * compose `@base-ui/react/autocomplete` if you need `freeSolo` behavior.
 */
export const Combobox = forwardRef(function Combobox({ items, value, defaultValue, onValueChange, placeholder, empty = "No results", size, invalid, disabled, readOnly, required, name, id, "aria-label": ariaLabel, triggerLabel = "Open list", className, }, ref) {
    const resolvedSize = useDefaultSize(size);
    const toOption = (v) => {
        if (v === undefined)
            return undefined;
        if (v === null)
            return null;
        return items.find((item) => item.value === v) ?? { value: v, label: v };
    };
    const selected = useMemo(() => toOption(value), [value, items]); // eslint-disable-line react-hooks/exhaustive-deps
    const [initialDefault] = useState(() => toOption(defaultValue));
    // The input is CONTROLLED so the typed value is never lost on close (§10):
    // Base UI resets a single-mode input to the selected label when the popup
    // unmounts — we ignore programmatic clears and keep what the user typed.
    const [inputValue, setInputValue] = useState(() => selected?.label ?? initialDefault?.label ?? "");
    const selectedKey = selected === undefined ? undefined : (selected?.value ?? null);
    const lastSelectedKeyRef = useRef(selectedKey ?? initialDefault?.value ?? null);
    if (selectedKey !== undefined && lastSelectedKeyRef.current !== selectedKey) {
        lastSelectedKeyRef.current = selectedKey;
        setInputValue(selected?.label ?? "");
    }
    return (_jsxs(BaseCombobox.Root, { items: items, value: selected, defaultValue: initialDefault, onValueChange: onValueChange ? (next) => onValueChange(next?.value ?? null) : undefined, isItemEqualToValue: (a, b) => a?.value === b?.value, autoHighlight: true, inputValue: inputValue, onInputValueChange: (next, details) => {
            if (next === "" && details.reason !== "input-change" && details.reason !== "clear-press") {
                return; // programmatic clear on close — §10 keeps the typed text
            }
            setInputValue(next);
        }, disabled: disabled, readOnly: readOnly, required: required, name: name, id: id, children: [_jsxs("span", { "data-invalid": invalid || undefined, "data-disabled": disabled || undefined, className: cn("flex min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-surface text-text", "transition-colors duration-[var(--fdn-dur-fast)]", "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus", "data-[invalid]:border-danger-border", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45", "has-[input[readonly]]:bg-bg-subtle", comboboxSizeClasses[resolvedSize], className), children: [_jsx(BaseCombobox.Input, { ref: ref, placeholder: placeholder, "aria-label": ariaLabel, "aria-invalid": invalid || undefined, className: "h-full w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed" }), _jsx(BaseCombobox.Trigger, { "aria-label": triggerLabel, tabIndex: -1, className: "flex shrink-0 items-center text-text-muted transition-colors duration-[var(--fdn-dur-fast)] hover:text-text disabled:cursor-not-allowed", children: _jsx(Icon, { icon: ChevronDown, size: 14 }) })] }), _jsx(ComboboxPopup, { empty: empty, children: _jsx(BaseCombobox.List, { children: (item) => _jsx(ComboboxItemRow, { item: item, query: inputValue }, item.value) }) })] }));
});
