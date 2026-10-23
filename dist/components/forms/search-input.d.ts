import { type InputProps } from "./input";
export interface SearchInputProps extends Omit<InputProps, "type" | "leading" | "value" | "defaultValue" | "onValueChange"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** aria-label of the clear button. Pass your product copy. */
    clearLabel?: string;
    /** Keyboard hint rendered as a trailing kbd while empty — e.g. "/" (§17 shortcuts). */
    shortcutHint?: string;
}
/**
 * SearchInput — the search variant of Input (§10): same component with a
 * leading Search icon, not a separate control. `type="search"` provides the
 * searchbox semantics. Esc clears the value (and stops there — it only closes
 * a parent overlay once the field is already empty); a clear button appears
 * while non-empty. Debounce results by ~250ms and never steal focus when they
 * arrive (§16).
 */
export declare const SearchInput: import("react").ForwardRefExoticComponent<Omit<SearchInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
