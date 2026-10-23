import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, cloneElement, isValidElement } from "react";
import { cn } from "../lib/cn";
/**
 * Step — one item of a numbered procedure (§26). A counter circle, an optional
 * title and the body. Numbering and the connecting line are managed by the
 * parent `Steps`; render `Step`s as its direct children. Server-component safe.
 */
export function Step({ title, index, last = false, className, children, ...props }) {
    return (_jsxs("li", { className: cn("relative flex gap-3 pb-6 last:pb-0", className), ...props, children: [!last && (_jsx("span", { "aria-hidden": true, className: "absolute bottom-0 left-3 top-7 w-px -translate-x-1/2 bg-border" })), _jsx("span", { className: "grid size-6 shrink-0 place-items-center rounded-full border border-accent-border bg-bg text-caption font-medium tabular-nums text-accent", children: index }), _jsxs("div", { className: "min-w-0 flex-1 pt-0.5 text-sm leading-[1.7]", children: [title !== undefined && _jsx("div", { className: "font-medium text-text", children: title }), _jsx("div", { className: cn("text-text-secondary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", title !== undefined && "mt-1"), children: children })] })] }));
}
/**
 * Steps — an ordered procedure (§26): a numbered `ol` of `Step`s with counter
 * circles and a connecting line. Numbering is automatic, so author the steps in
 * order and never hard-code the numbers. For non-sequential alternatives use
 * `DocsTabs`; for optional detail use `Expandable`. Server-component safe.
 */
export function Steps({ className, children, ...props }) {
    const steps = Children.toArray(children).filter(isValidElement);
    return (_jsx("ol", { className: cn("my-6 list-none pl-0", className), ...props, children: steps.map((child, i) => 
        // Inject the 1-based number and the last-item flag onto each Step.
        cloneElement(child, { index: i + 1, last: i === steps.length - 1 })) }));
}
