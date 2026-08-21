import { type ReactNode } from "react";
import type { Size } from "../../lib/types";
export declare const comboboxSizeClasses: Record<Size, string>;
/** Item data for Combobox and MultiSelect. `label` is a string so it can be
 * searched and echoed in the input. */
export interface ComboboxOption {
    value: string;
    label: string;
    description?: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
}
/** Internal: renders `text` with the matched `query` fragment emphasized. */
export declare function MatchHighlight({ text, query }: {
    text: string;
    query: string;
}): import("react").JSX.Element;
/** Internal: shared option row used by Combobox and MultiSelect popups. */
export declare function ComboboxItemRow({ item, query }: {
    item: ComboboxOption;
    query: string;
}): import("react").JSX.Element;
/** Internal: popup chrome shared by Combobox and MultiSelect. */
export declare function ComboboxPopup({ empty, children }: {
    empty: ReactNode;
    children: ReactNode;
}): import("react").JSX.Element;
export interface ComboboxProps {
    /** The searchable list. It may grow with data — that is exactly when
     * Combobox beats Select (§17). */
    items: ComboboxOption[];
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    /** Empty-results slot (distinct from "no items at all"). Pass your product
     * copy — e.g. "Sin resultados". */
    empty?: ReactNode;
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    /** Accessible name for standalone use — inside a FormField the label wires itself. */
    "aria-label"?: string;
    /** aria-label of the chevron button that opens the list. */
    triggerLabel?: string;
    /** Extra classes for the input box. */
    className?: string;
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
export declare const Combobox: import("react").ForwardRefExoticComponent<ComboboxProps & import("react").RefAttributes<HTMLInputElement>>;
