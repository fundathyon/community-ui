/** Chevron override for react-day-picker's nav buttons (stroke 1.5, §07). */
export declare function CalendarChevron({ className, orientation, }: {
    className?: string;
    size?: number;
    disabled?: boolean;
    orientation?: "up" | "down" | "left" | "right";
}): import("react").JSX.Element;
/** classNames for single-date calendars. */
export declare const calendarClassNames: {
    selected: string;
    root: string;
    months: string;
    month: string;
    month_caption: string;
    caption_label: string;
    nav: string;
    button_previous: string;
    button_next: string;
    month_grid: string;
    weekdays: string;
    weekday: string;
    week: string;
    day: string;
    day_button: string;
    today: string;
    outside: string;
    disabled: string;
    hidden: string;
};
/** classNames for range calendars — endpoints solid, middle days washed. */
export declare const rangeCalendarClassNames: {
    selected: string;
    range_start: string;
    range_end: string;
    range_middle: string;
    root: string;
    months: string;
    month: string;
    month_caption: string;
    caption_label: string;
    nav: string;
    button_previous: string;
    button_next: string;
    month_grid: string;
    weekdays: string;
    weekday: string;
    week: string;
    day: string;
    day_button: string;
    today: string;
    outside: string;
    disabled: string;
    hidden: string;
};
/** Popup chrome shared with the other dropdown surfaces (§05: raised + border + shadow). */
export declare const datePopupClasses: string;
