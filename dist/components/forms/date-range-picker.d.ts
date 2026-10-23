import { type ComponentProps } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import type { Size } from "../../lib/types";
export type { DateRange };
/** A relative shortcut: `range: null` clears the selection. */
export interface DateRangePickerPreset {
    label: string;
    range: DateRange | null;
}
export interface DateRangePickerProps {
    value?: DateRange | null;
    defaultValue?: DateRange | null;
    onValueChange?: (value: DateRange | null) => void;
    /** Relative shortcuts — ALWAYS shown (§10), "Últimos 7 días" style.
     * Defaults to Last 7/30/90 days; pass your product copy. */
    presets?: DateRangePickerPreset[];
    placeholder?: string;
    /** xs 24 · sm 28 · md 32 · lg 44. Defaults to the density's size. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    disabled?: boolean;
    /** react-day-picker locale for month/weekday names. */
    locale?: ComponentProps<typeof DayPicker>["locale"];
    /** Accessible name for standalone use — inside a FormField the label wires itself. */
    "aria-label"?: string;
    /** Formats each endpoint of the resolved range. */
    format?: (date: Date) => string;
    className?: string;
}
/**
 * DateRangePicker (§10) — period selection on the DatePicker foundation:
 * calendar in `range` mode plus relative shortcuts ("Últimos 7 días" style).
 * The trigger looks like an Input and always echoes the resolved absolute
 * range; endpoints render solid, in-between days as an accent wash.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export declare const DateRangePicker: import("react").ForwardRefExoticComponent<DateRangePickerProps & import("react").RefAttributes<HTMLButtonElement>>;
