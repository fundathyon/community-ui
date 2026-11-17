"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from "react";
import { cn } from "../../lib/cn";
/** True while the element's content is wider than the element itself. */
function useHorizontalOverflow() {
    const ref = useRef(null);
    const [overflows, setOverflows] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
        check();
        if (typeof ResizeObserver === "undefined")
            return;
        const observer = new ResizeObserver(check);
        observer.observe(el);
        if (el.firstElementChild)
            observer.observe(el.firstElementChild);
        return () => observer.disconnect();
    }, []);
    return [ref, overflows];
}
export function Table({ stickyHeader, className, children, tableProps, label, ...props }) {
    const [ref, overflows] = useHorizontalOverflow();
    const name = label ?? tableProps?.["aria-label"];
    return (_jsx("div", { ref: ref, tabIndex: overflows ? 0 : undefined, role: overflows && name ? "region" : undefined, "aria-label": overflows && name ? name : undefined, className: cn("overflow-x-auto rounded-xl border border-border bg-surface", "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus", className), ...props, children: _jsx("table", { "data-sticky": stickyHeader ? "" : undefined, ...tableProps, className: cn("group w-full border-collapse text-body text-text", tableProps?.className), children: children }) }));
}
/**
 * TableHeader — the `<thead>`. Header cells use the overline treatment
 * (uppercase, tracked, muted — §14). Sticks to the top when the parent Table
 * has `stickyHeader` (via the `group-data-[sticky]` marker).
 */
export function TableHeader({ className, ...props }) {
    return (_jsx("thead", { className: cn("bg-surface", "group-data-[sticky]:sticky group-data-[sticky]:top-0 group-data-[sticky]:fdn-z-sticky group-data-[sticky]:shadow-sm", className), ...props }));
}
export function TableBody({ className, ...props }) {
    return _jsx("tbody", { className: cn(className), ...props });
}
export function TableRow({ interactive, selected, terminal, className, ...props }) {
    return (_jsx("tr", { "data-state": selected ? "selected" : undefined, className: cn("group/row border-b border-border last:border-0", interactive && "cursor-pointer hover:bg-surface-hover", selected && "bg-accent-bg", terminal && "opacity-60", className), ...props }));
}
/** Column header — overline caps, muted (§14 "cabecera en overline"). */
export function TableHead({ align = "left", className, ...props }) {
    return (_jsx("th", { scope: "col", className: cn("h-10 whitespace-nowrap px-3 text-overline uppercase text-text-muted", align === "right" ? "text-right" : "text-left", className), ...props }));
}
export function TableCell({ align = "left", className, ...props }) {
    return (_jsx("td", { className: cn("px-3 py-2 align-middle", align === "right" ? "text-right" : "text-left", className), ...props }));
}
export function TableCaption({ className, ...props }) {
    return (_jsx("caption", { className: cn("px-3 py-2 text-left text-caption text-text-muted", className), ...props }));
}
