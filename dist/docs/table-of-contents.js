"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
/**
 * TableOfContents — the right-rail "On this page" index (§26). Anchor links to
 * the page's `DocsSection`s; the active entry gets accent text and a left rule.
 *
 * Highlight it either controlled (`activeId`) or with the built-in scroll-spy
 * (`followScroll`), which tracks the topmost visible section via
 * IntersectionObserver and cleans the observer up on unmount. Hidden below `xl`
 * by the layout.
 */
export function TableOfContents({ items, activeId, followScroll = false, label = "On this page", className, ...props }) {
    const [spyId, setSpyId] = useState(undefined);
    // Track which sections are currently intersecting; pick the first in order.
    const visible = useRef(new Set());
    useEffect(() => {
        if (!followScroll || typeof IntersectionObserver === "undefined" || typeof document === "undefined") {
            return;
        }
        visible.current = new Set();
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                const id = entry.target.id;
                if (entry.isIntersecting)
                    visible.current.add(id);
                else
                    visible.current.delete(id);
            }
            // First item (document order) that is currently visible wins.
            const current = items.find((item) => visible.current.has(item.id));
            if (current)
                setSpyId(current.id);
        }, 
        // Bias toward the heading nearest the top of the viewport.
        { rootMargin: "0px 0px -70% 0px", threshold: 0 });
        for (const item of items) {
            const el = document.getElementById(item.id);
            if (el)
                observer.observe(el);
        }
        return () => observer.disconnect();
    }, [followScroll, items]);
    const active = activeId ?? spyId;
    return (_jsxs("nav", { "aria-label": label, className: cn("text-body-sm", className), ...props, children: [_jsx("div", { className: "mb-2 text-overline uppercase text-text-muted", children: label }), _jsx("ul", { className: "m-0 list-none border-l border-border pl-0", children: items.map((item) => {
                    const isActive = active === item.id;
                    return (_jsx("li", { children: _jsx("a", { href: `#${item.id}`, "aria-current": isActive ? "true" : undefined, className: cn("-ml-px block border-l-2 py-1 no-underline", item.depth === 3 ? "pl-6" : "pl-3", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", isActive
                                ? "border-accent-border text-accent"
                                : "border-transparent text-text-muted hover:text-text"), children: item.label }) }, item.id));
                }) })] }));
}
