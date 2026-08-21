import { type ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import type { Size } from "../../lib/types";
/** A relative shortcut: `value: null` means "never" (e.g. "Nunca expira"). */
export interface DatePickerPreset {
    label: string;
    value: Date | null;
}
export interface DatePickerProps {
    /** `null` = no date / "never" (chosen via a null preset or by clearing). */
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (value: Date | null) => void;
    /**
     * Relative shortcuts — ALWAYS shown (§10): in these products nobody wants
     * "August 25th", they want "in 7 days". Defaults to In 24 hours / In 7
     * days / In 30 days / Never expires; pass your product copy.
     */
    presets?: DatePickerPreset[];
    placeholder?: string;
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    disabled?: boolean;
    /** react-day-picker locale for month/weekday names. */
    locale?: ComponentProps<typeof DayPicker>["locale"];
    /** Accessible name for standalone use — inside a FormField the label wires itself. */
    "aria-label"?: string;
    /** aria-label of the calendar button. Pass your product copy. */
    openCalendarLabel?: string;
    /** Formats the resolved absolute date (input echo + line under the control). */
    format?: (date: Date) => string;
    className?: string;
}
/**
 * DatePicker (§10) — a date field that is ALWAYS accompanied by relative
 * shortcuts, accepts direct typing (ISO or d/m/yyyy, committed on blur or
 * Enter) and shows the resolved absolute date under the control, so "in 7
 * days" never stays ambiguous. Weeks start on Monday.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export declare const DatePicker: import("react").ForwardRefExoticComponent<DatePickerProps & import("react").RefAttributes<HTMLInputElement>>;
