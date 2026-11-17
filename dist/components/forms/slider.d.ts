import { type ReactNode } from "react";
import type { Size } from "../../lib/types";
export interface SliderProps {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Unit suffix rendered after the value box — e.g. "días", "GB". */
    unit?: ReactNode;
    /** Height of the value box. Defaults to the density's size. */
    size?: Size;
    disabled?: boolean;
    /** Field name for form submission (Base UI hidden input). */
    name?: string;
    /** Accessible name of the control for standalone use — inside a FormField
     * the label wires itself to the hidden input. */
    "aria-label"?: string;
    /** aria-label of the editable value box. Pass your product copy. */
    valueLabel?: string;
    className?: string;
}
/**
 * Slider — a bounded numeric choice (§10). DS hard rule: the numeric value is
 * ALWAYS visible and editable next to the track — a slider without a number is
 * a control without data (§10). The box and the track stay in two-way sync;
 * typing commits on blur or Enter, clamped to min/max and snapped to step.
 *
 * For unbounded or precise-entry numbers use NumberInput alone.
 */
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLDivElement>>;
