import { type ReactNode } from "react";
import type { Size } from "../../lib/types";
import { type ComboboxOption } from "./combobox";
export interface MultiSelectProps {
    items: ComboboxOption[];
    /** Selected values. */
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    /** Empty-results slot. Pass your product copy — e.g. "Sin resultados". */
    empty?: ReactNode;
    /** aria-label factory for each chip's remove button. Pass your product copy. */
    removeLabel?: (label: string) => string;
    /** xs 24 · sm 28 · md 32 · lg 44 minimum height — the box grows with chips. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    /** Accessible name for standalone use — inside a FormField the label wires itself. */
    "aria-label"?: string;
    /** aria-label of the chevron button that opens the list. */
    triggerLabel?: string;
    className?: string;
}
/**
 * MultiSelect — multiple selection over a searchable list (§10). Built on Base
 * UI's multi-select Combobox: selected values render as removable chips inside
 * the trigger box; Backspace on the empty input removes the last chip; the
 * check indicator marks selected options in the list.
 *
 * Applied FILTERS are a different pattern — those chips live outside the field
 * and stay always visible (§16).
 */
export declare const MultiSelect: import("react").ForwardRefExoticComponent<MultiSelectProps & import("react").RefAttributes<HTMLInputElement>>;
