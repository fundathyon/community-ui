"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
/**
 * Topbar — the 48px shell header, identical across the suite (§12). Sticky,
 * with a hairline border; it gains a small shadow once the page scrolls so
 * content visibly slides beneath it.
 */
export function Topbar({ leading, center, trailing, elevated, sticky = true, className, children, ...props }) {
    const [scrolled, setScrolled] = useState(false);
    const watchScroll = elevated === undefined;
    useEffect(() => {
        if (!watchScroll)
            return;
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [watchScroll]);
    const isElevated = elevated ?? scrolled;
    return (_jsxs("header", { className: cn("flex h-header shrink-0 items-center gap-3 border-b border-border bg-bg px-4", sticky && "sticky top-0 fdn-z-sticky", "transition-shadow duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", isElevated && "shadow-sm", className), ...props, children: [leading && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: leading }), _jsx("div", { className: "flex min-w-0 flex-1 items-center justify-center", children: center }), trailing && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: trailing }), children] }));
}
