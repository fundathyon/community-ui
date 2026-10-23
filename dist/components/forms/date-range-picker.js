"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useControllableState } from "../../hooks/use-controllable-state";
import { Button } from "../actions/button";
import { cn } from "../../lib/cn";
import { formatDate } from "../../lib/format";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { CalendarChevron, datePopupClasses, rangeCalendarClassNames } from "./calendar";
const triggerSizeClasses = {
    xs: "h-control-xs px-2 text-body-sm",
    sm: "h-control-sm px-2.5 text-body",
    md: "h-control-md px-2.5 text-body",
    lg: "h-control-lg px-3 text-body",
};
function defaultPresets() {
    const today = new Date();
    return [
        { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
        { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
        { label: "Last 90 days", range: { from: subDays(today, 89), to: today } },
    ];
}
/**
 * DateRangePicker (§10) — period selection on the DatePicker foundation:
 * calendar in `range` mode plus relative shortcuts ("Últimos 7 días" style).
 * The trigger looks like an Input and always echoes the resolved absolute
 * range; endpoints render solid, in-between days as an accent wash.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export const DateRangePicker = forwardRef(function DateRangePicker({ value: valueProp, defaultValue, onValueChange, presets, placeholder, size, invalid, disabled, locale, "aria-label": ariaLabel, format = formatDate, className, }, ref) {
    const resolvedSize = useDefaultSize(size);
    const [value, setValue] = useControllableState({
        value: valueProp,
        defaultValue: defaultValue ?? null,
        onChange: onValueChange,
    });
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState(undefined);
    const echo = value?.from != null ? `${format(value.from)} – ${format(value.to ?? value.from)}` : null;
    const resolvedPresets = presets ?? defaultPresets();
    return (_jsxs(BasePopover.Root, { open: open, onOpenChange: setOpen, children: [_jsxs(BasePopover.Trigger, { ref: ref, disabled: disabled, "aria-label": ariaLabel, "aria-invalid": invalid || undefined, "data-invalid": invalid || undefined, className: cn("flex w-full min-w-0 select-none items-center justify-between gap-1.5 rounded-md border border-border-strong bg-surface text-left text-text", "transition-colors duration-[var(--fdn-dur-fast)]", "disabled:cursor-not-allowed disabled:opacity-45", "data-[invalid]:border-danger-border", triggerSizeClasses[resolvedSize], className), children: [_jsx("span", { className: cn("truncate tabular-nums", !echo && "text-text-muted"), children: echo ?? placeholder }), _jsx(Icon, { icon: CalendarIcon, size: 14, className: "text-text-muted" })] }), _jsx(BasePopover.Portal, { children: _jsx(BasePopover.Positioner, { side: "bottom", align: "start", sideOffset: 4, className: "fdn-z-dropdown", children: _jsx(BasePopover.Popup, { className: datePopupClasses, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(DayPicker, { mode: "range", selected: value ?? undefined, onSelect: (selected) => {
                                        setValue(selected ?? null);
                                        if (selected?.from && selected.to && selected.from.getTime() !== selected.to.getTime()) {
                                            setOpen(false);
                                        }
                                    }, month: month ?? value?.from ?? undefined, onMonthChange: setMonth, weekStartsOn: 1, showOutsideDays: true, autoFocus: true, locale: locale, classNames: rangeCalendarClassNames, components: { Chevron: CalendarChevron } }), _jsx("div", { className: "flex min-w-28 flex-col gap-0.5 self-stretch border-l border-border pl-3", children: resolvedPresets.map((preset) => (_jsx(Button, { variant: "ghost", size: "sm", className: "justify-start", onClick: () => {
                                            setValue(preset.range);
                                            if (preset.range?.from)
                                                setMonth(preset.range.from);
                                            setOpen(false);
                                        }, children: preset.label }, preset.label))) })] }) }) }) })] }));
});
