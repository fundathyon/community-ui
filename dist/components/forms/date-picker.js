"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { addDays, addHours, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useControllableState } from "../../hooks/use-controllable-state";
import { Button } from "../actions/button";
import { cn } from "../../lib/cn";
import { formatDate } from "../../lib/format";
import { Icon } from "../typography/icon";
import { CalendarChevron, calendarClassNames, datePopupClasses } from "./calendar";
import { Input } from "./input";
const PARSE_FORMATS = ["yyyy-MM-dd", "d/M/yyyy", "d-M-yyyy", "d MMM yyyy"];
function parseTyped(text) {
    const trimmed = text.trim();
    if (!trimmed)
        return null;
    for (const pattern of PARSE_FORMATS) {
        const parsed = parse(trimmed, pattern, new Date());
        if (isValid(parsed))
            return parsed;
    }
    const fallback = new Date(trimmed);
    return isValid(fallback) ? fallback : null;
}
function defaultPresets() {
    const now = new Date();
    return [
        { label: "In 24 hours", value: addHours(now, 24) },
        { label: "In 7 days", value: addDays(now, 7) },
        { label: "In 30 days", value: addDays(now, 30) },
        { label: "Never expires", value: null },
    ];
}
/**
 * DatePicker (§10) — a date field that is ALWAYS accompanied by relative
 * shortcuts, accepts direct typing (ISO or d/m/yyyy, committed on blur or
 * Enter) and shows the resolved absolute date under the control, so "in 7
 * days" never stays ambiguous. Weeks start on Monday.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export const DatePicker = forwardRef(function DatePicker({ value: valueProp, defaultValue, onValueChange, presets, placeholder, size, invalid, disabled, locale, "aria-label": ariaLabel, openCalendarLabel = "Open calendar", format = formatDate, className, }, ref) {
    const [value, setValue] = useControllableState({
        value: valueProp,
        defaultValue: defaultValue ?? null,
        onChange: onValueChange,
    });
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(() => (value ? format(value) : ""));
    const [month, setMonth] = useState(undefined);
    const anchorRef = useRef(null);
    // Reflect external value changes into the input while the user is not typing.
    const editingRef = useRef(false);
    const lastValueRef = useRef(value);
    if (!editingRef.current && (lastValueRef.current?.getTime() ?? null) !== (value?.getTime() ?? null)) {
        lastValueRef.current = value;
        setText(value ? format(value) : "");
    }
    const commitDate = (next, echo) => {
        lastValueRef.current = next;
        setValue(next);
        setText(echo ?? (next ? format(next) : ""));
        if (next)
            setMonth(next);
    };
    const commitTyped = () => {
        const parsed = parseTyped(text);
        if (parsed) {
            lastValueRef.current = parsed;
            setValue(parsed);
            setMonth(parsed);
        }
        else if (text.trim() === "") {
            lastValueRef.current = null;
            setValue(null);
        }
        else {
            // unparseable → restore the last resolved value
            setText(value ? format(value) : "");
        }
    };
    const resolvedPresets = presets ?? defaultPresets();
    return (_jsxs("div", { className: cn("flex min-w-0 flex-col gap-1", className), children: [_jsxs(BasePopover.Root, { open: open, onOpenChange: setOpen, children: [_jsx("div", { ref: anchorRef, children: _jsx(Input, { ref: ref, size: size, invalid: invalid, disabled: disabled, "aria-label": ariaLabel, placeholder: placeholder, value: text, onValueChange: (next) => setText(next), onFocus: () => {
                                editingRef.current = true;
                            }, onBlur: () => {
                                editingRef.current = false;
                                commitTyped();
                            }, onKeyDown: (event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    commitTyped();
                                }
                            }, trailing: _jsx(BasePopover.Trigger, { "aria-label": openCalendarLabel, disabled: disabled, className: cn("grid size-5 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] hover:text-text", "disabled:cursor-not-allowed", "fdn-touch-target"), children: _jsx(Icon, { icon: CalendarIcon, size: 14 }) }) }) }), _jsx(BasePopover.Portal, { children: _jsx(BasePopover.Positioner, { anchor: anchorRef, side: "bottom", align: "start", sideOffset: 4, className: "fdn-z-dropdown", children: _jsx(BasePopover.Popup, { className: datePopupClasses, "aria-label": openCalendarLabel, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(DayPicker, { mode: "single", selected: value ?? undefined, onSelect: (selected) => {
                                                commitDate(selected ?? null);
                                                setOpen(false);
                                            }, month: month ?? value ?? undefined, onMonthChange: setMonth, weekStartsOn: 1, showOutsideDays: true, autoFocus: true, locale: locale, classNames: calendarClassNames, components: { Chevron: CalendarChevron } }), _jsx("div", { className: "flex min-w-28 flex-col gap-0.5 self-stretch border-l border-border pl-3", children: resolvedPresets.map((preset) => (_jsx(Button, { variant: "ghost", size: "sm", className: "justify-start", onClick: () => {
                                                    commitDate(preset.value, preset.value ? undefined : preset.label);
                                                    setOpen(false);
                                                }, children: preset.label }, preset.label))) })] }) }) }) })] }), value && (_jsx("p", { className: "text-caption tabular-nums text-text-muted", children: format(value) }))] }));
});
