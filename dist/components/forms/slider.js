"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { forwardRef, useRef, useState } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
const boxSizeClasses = {
    xs: "h-control-xs text-body-sm",
    sm: "h-control-sm text-body-sm",
    md: "h-control-md text-body",
    lg: "h-control-lg text-body",
};
/**
 * Slider — a bounded numeric choice (§10). DS hard rule: the numeric value is
 * ALWAYS visible and editable next to the track — a slider without a number is
 * a control without data (§10). The box and the track stay in two-way sync;
 * typing commits on blur or Enter, clamped to min/max and snapped to step.
 *
 * For unbounded or precise-entry numbers use NumberInput alone.
 */
export const Slider = forwardRef(function Slider({ value: valueProp, defaultValue, onValueChange, min = 0, max = 100, step = 1, unit, size, disabled, name, "aria-label": ariaLabel, valueLabel = "Value", className, }, ref) {
    const resolvedSize = useDefaultSize(size);
    const [value, setValue] = useControllableState({
        value: valueProp,
        defaultValue: defaultValue ?? min,
        onChange: onValueChange,
    });
    const [text, setText] = useState(() => String(value));
    const editingRef = useRef(false);
    const lastValueRef = useRef(value);
    if (!editingRef.current && lastValueRef.current !== value) {
        lastValueRef.current = value;
        setText(String(value));
    }
    const commitText = () => {
        const parsed = Number.parseFloat(text.replace(",", "."));
        if (Number.isNaN(parsed)) {
            setText(String(value));
            return;
        }
        const clamped = Math.min(max, Math.max(min, parsed));
        const snapped = Number((Math.round((clamped - min) / step) * step + min).toFixed(5));
        const next = Math.min(max, Math.max(min, snapped));
        lastValueRef.current = next;
        setValue(next);
        setText(String(next));
    };
    return (_jsxs("div", { ref: ref, className: cn("flex min-w-0 items-center gap-3", disabled && "opacity-45", className), children: [_jsx(BaseSlider.Root, { value: value, onValueChange: (next) => setValue(next), min: min, max: max, step: step, disabled: disabled, name: name, className: "min-w-0 flex-1", children: _jsx(BaseSlider.Control, { className: "flex h-4 w-full touch-none select-none items-center", children: _jsxs(BaseSlider.Track, { className: "relative h-1 w-full rounded-full bg-border", children: [_jsx(BaseSlider.Indicator, { className: "rounded-full bg-accent-solid" }), _jsx(BaseSlider.Thumb, { getAriaLabel: ariaLabel ? () => ariaLabel : undefined, className: cn("size-3.5 rounded-full border border-border-strong bg-surface shadow-xs", "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus", disabled && "cursor-not-allowed") })] }) }) }), _jsxs("span", { className: "flex shrink-0 items-center gap-1.5", children: [_jsx("input", { type: "text", inputMode: "decimal", "aria-label": valueLabel, value: text, disabled: disabled, onFocus: () => {
                            editingRef.current = true;
                        }, onChange: (event) => setText(event.target.value), onBlur: () => {
                            editingRef.current = false;
                            commitText();
                        }, onKeyDown: (event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                commitText();
                            }
                        }, className: cn("w-14 min-w-0 rounded-md border border-border-strong bg-surface px-1.5 text-center tabular-nums text-text", "transition-colors duration-[var(--fdn-dur-fast)] disabled:cursor-not-allowed", boxSizeClasses[resolvedSize]) }), unit && _jsx("span", { className: "text-caption text-text-muted", children: unit })] })] }));
});
