"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Search, X } from "lucide-react";
import { forwardRef, useRef } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { Input } from "./input";
/**
 * SearchInput — the search variant of Input (§10): same component with a
 * leading Search icon, not a separate control. `type="search"` provides the
 * searchbox semantics. Esc clears the value (and stops there — it only closes
 * a parent overlay once the field is already empty); a clear button appears
 * while non-empty. Debounce results by ~250ms and never steal focus when they
 * arrive (§16).
 */
export const SearchInput = forwardRef(function SearchInput({ value: valueProp, defaultValue, onValueChange, clearLabel = "Clear search", shortcutHint, size, disabled, onKeyDown, trailing, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    const [value, setValue] = useControllableState({
        value: valueProp,
        defaultValue: defaultValue ?? "",
        onChange: onValueChange,
    });
    const innerRef = useRef(null);
    const setRefs = (node) => {
        innerRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    };
    const handleKeyDown = (event) => {
        if (event.key === "Escape" && value !== "") {
            event.preventDefault();
            event.stopPropagation();
            setValue("");
        }
        onKeyDown?.(event);
    };
    return (_jsx(Input, { ref: setRefs, type: "search", size: resolvedSize, disabled: disabled, value: value, onValueChange: (next) => setValue(next), onKeyDown: handleKeyDown, className: "[&::-webkit-search-cancel-button]:hidden", leading: _jsx(Icon, { icon: Search, size: resolvedSize === "xs" || resolvedSize === "sm" ? 14 : 16 }), trailing: trailing ??
            (value !== "" ? (_jsx("button", { type: "button", "aria-label": clearLabel, disabled: disabled, onClick: () => {
                    setValue("");
                    innerRef.current?.focus();
                }, className: cn("grid size-5 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] hover:text-text", "disabled:cursor-not-allowed", "fdn-touch-target"), children: _jsx(Icon, { icon: X, size: 14 }) })) : shortcutHint ? (_jsx("kbd", { "aria-hidden": true, className: "pointer-events-none inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-bg-subtle px-1 font-sans text-caption text-text-muted", children: shortcutHint })) : undefined), ...props }));
});
