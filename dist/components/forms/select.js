"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
const triggerSizeClasses = {
    xs: "h-control-xs px-2 text-body-sm",
    sm: "h-control-sm px-2.5 text-body",
    md: "h-control-md px-2.5 text-body",
    lg: "h-control-lg px-3 text-body",
};
/**
 * Select — a closed choice among ≤ 7 KNOWN AND STABLE options (§10, §17).
 * Above 7, or when the list grows with data, use Combobox with search; for
 * 2–5 options worth comparing at a glance use RadioGroup instead (§17).
 *
 * The trigger looks and sizes exactly like an Input; the selected state shows
 * a check indicator. Always inside a FormField, which owns the label.
 */
export const Select = forwardRef(function Select({ items, children, value, defaultValue, onValueChange, placeholder, size, invalid, disabled, readOnly, required, name, id, "aria-label": ariaLabel, className, }, ref) {
    const resolvedSize = useDefaultSize(size);
    return (_jsxs(BaseSelect.Root, { items: items?.map(({ value: v, label }) => ({ value: v, label })), value: value, defaultValue: defaultValue, onValueChange: onValueChange ? (next) => onValueChange(next) : undefined, disabled: disabled, readOnly: readOnly, required: required, name: name, id: id, children: [_jsxs(BaseSelect.Trigger, { ref: ref, "aria-label": ariaLabel, "data-invalid": invalid || undefined, "aria-invalid": invalid || undefined, className: cn("flex w-full min-w-0 select-none items-center justify-between gap-1.5 rounded-md border border-border-strong bg-surface text-left text-text", "transition-colors duration-[var(--fdn-dur-fast)]", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45", "data-[readonly]:bg-bg-subtle", "data-[invalid]:border-danger-border", triggerSizeClasses[resolvedSize], className), children: [_jsx(BaseSelect.Value, { placeholder: placeholder, className: "truncate data-[placeholder]:text-text-muted" }), _jsx(BaseSelect.Icon, { className: "flex shrink-0 items-center text-text-muted", children: _jsx(Icon, { icon: ChevronDown, size: 14 }) })] }), _jsx(BaseSelect.Portal, { children: _jsx(BaseSelect.Positioner, { sideOffset: 4, alignItemWithTrigger: false, className: "fdn-z-dropdown outline-none", children: _jsx(BaseSelect.Popup, { className: cn("max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-border bg-surface-raised p-1 shadow-md", "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0"), children: items
                            ? items.map((item) => (_jsx(SelectItem, { value: item.value, disabled: item.disabled, icon: item.icon, description: item.description, children: item.label }, item.value)))
                            : children }) }) })] }));
});
/** One option of a Select. Hover uses `surface-hover`; the selected option shows a check. */
export function SelectItem({ icon, description, className, children, ...props }) {
    return (_jsxs(BaseSelect.Item, { className: cn("flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body-sm text-text outline-none", "transition-colors duration-[var(--fdn-dur-fast)]", "data-[highlighted]:bg-surface-hover", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45", className), ...props, children: [icon && _jsx("span", { className: "flex shrink-0 items-center text-text-muted [&_svg]:size-4", children: icon }), _jsxs("span", { className: "flex min-w-0 flex-1 flex-col", children: [_jsx(BaseSelect.ItemText, { className: "truncate", children: children }), description && _jsx("span", { className: "truncate text-caption text-text-muted", children: description })] }), _jsx(BaseSelect.ItemIndicator, { className: "flex shrink-0 items-center text-accent", children: _jsx(Icon, { icon: Check, size: 14 }) })] }));
}
