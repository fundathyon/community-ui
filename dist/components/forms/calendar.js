"use client";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Internal calendar chrome shared by DatePicker and DateRangePicker.
 * react-day-picker v9 styled through its `classNames` prop with our tokens —
 * its default stylesheet is never imported. Not exported from the barrel.
 */
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Icon } from "../typography/icon";
/** Chevron override for react-day-picker's nav buttons (stroke 1.5, §07). */
export function CalendarChevron({ className, orientation, }) {
    const icon = orientation === "left"
        ? ChevronLeft
        : orientation === "right"
            ? ChevronRight
            : orientation === "up"
                ? ChevronUp
                : ChevronDown;
    return _jsx(Icon, { icon: icon, size: 14, className: className });
}
const dayButton = [
    "grid size-8 cursor-pointer place-items-center rounded-md text-body-sm",
    "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover",
    "disabled:pointer-events-none",
    // inside a solid-selected cell the button must not paint its own hover wash
    "[.fdn-sel_&]:hover:bg-transparent",
].join(" ");
const baseCalendarClassNames = {
    root: "select-none text-text",
    months: "relative flex flex-col gap-4",
    month: "flex flex-col gap-2",
    month_caption: "flex h-6 items-center justify-center",
    caption_label: "text-label text-text",
    nav: "absolute inset-x-0 top-0 flex items-center justify-between",
    button_previous: "grid size-6 place-items-center rounded-md text-text-secondary transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text disabled:cursor-not-allowed disabled:opacity-45",
    button_next: "grid size-6 place-items-center rounded-md text-text-secondary transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text disabled:cursor-not-allowed disabled:opacity-45",
    month_grid: "border-separate border-spacing-0",
    weekdays: "flex",
    weekday: "w-8 text-center text-caption font-normal text-text-muted",
    week: "mt-1 flex",
    day: "p-0 text-center",
    day_button: dayButton,
    today: "[&:not(.fdn-sel)]:font-semibold [&:not(.fdn-sel)]:text-accent",
    outside: "text-text-muted opacity-60",
    disabled: "opacity-45",
    hidden: "invisible",
};
/** classNames for single-date calendars. */
export const calendarClassNames = {
    ...baseCalendarClassNames,
    selected: "fdn-sel rounded-md bg-accent-solid text-accent-on-solid",
};
/** classNames for range calendars — endpoints solid, middle days washed. */
export const rangeCalendarClassNames = {
    ...baseCalendarClassNames,
    selected: "",
    range_start: "fdn-sel rounded-l-md bg-accent-solid text-accent-on-solid",
    range_end: "fdn-sel rounded-r-md bg-accent-solid text-accent-on-solid",
    range_middle: "bg-accent-bg",
};
/** Popup chrome shared with the other dropdown surfaces (§05: raised + border + shadow). */
export const datePopupClasses = [
    "rounded-lg border border-border bg-surface-raised p-3 shadow-md",
    "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
    "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
    "data-[ending-style]:opacity-0",
].join(" ");
