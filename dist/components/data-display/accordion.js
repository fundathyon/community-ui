"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { FOCUS_RING_INSET } from "../../lib/focus";
import { Icon } from "../typography/icon";
/**
 * Accordion — for secondary content most people do not need (§14). It NEVER hides
 * something required to complete a form: if the user must act on it, it stays
 * visible. By default one panel is open; allow `multiple` only when the panels
 * are comparable to one another. Built on Base UI Accordion.
 */
export function Accordion({ items, multiple = false, defaultValue, value, onValueChange, className, children, }) {
    const normalizedDefault = defaultValue == null ? undefined : Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return (_jsx(BaseAccordion.Root, { multiple: multiple, value: value, defaultValue: value ? undefined : normalizedDefault, onValueChange: onValueChange, className: cn("flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border", className), children: items
            ? items.map((item, index) => (_jsx(AccordionItem, { value: item.value, title: item.title, disabled: item.disabled, children: item.content }, item.value ?? index)))
            : children }));
}
/** AccordionItem — a titled disclosure: a trigger with a rotating chevron and an
 * animated panel. Compose these inside `<Accordion>` when not using `items`. */
export function AccordionItem({ value, title, disabled, className, children }) {
    return (_jsxs(BaseAccordion.Item, { value: value, disabled: disabled, className: cn(className), children: [_jsx(BaseAccordion.Header, { className: "m-0", children: _jsxs(BaseAccordion.Trigger, { className: cn("group flex w-full items-center justify-between gap-2 px-4 py-3 text-left", "text-body font-medium text-text", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45 data-[disabled]:hover:bg-transparent", FOCUS_RING_INSET), children: [_jsx("span", { className: "min-w-0", children: title }), _jsx(Icon, { icon: ChevronDown, size: 16, className: "shrink-0 text-text-muted transition-transform duration-[var(--fdn-dur-fast)] group-data-[panel-open]:rotate-180" })] }) }), _jsx(BaseAccordion.Panel, { className: cn("h-[var(--accordion-panel-height)] overflow-hidden", "transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:h-0 data-[ending-style]:h-0"), children: _jsx("div", { className: "px-4 pb-4 pt-0 text-body text-text-secondary", children: children }) })] }));
}
