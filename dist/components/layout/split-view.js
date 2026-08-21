"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "../../lib/cn";
function readStoredSize(storageKey) {
    if (!storageKey || typeof window === "undefined")
        return undefined;
    try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw === null)
            return undefined;
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
    catch {
        return undefined;
    }
}
/**
 * SplitView — list + detail side by side at ≥ xl, resizable via a keyboard-
 * operable separator, with the ratio persisted per user (§15, §08). Below xl
 * the detail panel stops sharing the row: it stacks, or — with `detailOpen`
 * controlled — replaces the list (the app decides, e.g. from the route).
 */
export function SplitView({ list, detail, defaultSize = 40, minSize = 25, storageKey, detailOpen, resizeLabel = "Resize panels", className, ...props }) {
    const wide = useMediaQuery("(min-width: 1280px)");
    const containerRef = useRef(null);
    const clamp = useCallback((value) => Math.min(100 - minSize, Math.max(minSize, value)), [minSize]);
    const [size, setSize] = useState(() => clamp(readStoredSize(storageKey) ?? defaultSize));
    useEffect(() => {
        if (!storageKey)
            return;
        try {
            window.localStorage.setItem(storageKey, String(size));
        }
        catch {
            // Storage unavailable (private mode) — the ratio just isn't persisted.
        }
    }, [size, storageKey]);
    const onPointerDown = (event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId))
            return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0)
            return;
        setSize(clamp(((event.clientX - rect.left) / rect.width) * 100));
    };
    const onKeyDown = (event) => {
        const step = 2;
        if (event.key === "ArrowLeft")
            setSize((s) => clamp(s - step));
        else if (event.key === "ArrowRight")
            setSize((s) => clamp(s + step));
        else if (event.key === "Home")
            setSize(minSize);
        else if (event.key === "End")
            setSize(100 - minSize);
        else
            return;
        event.preventDefault();
    };
    if (!wide) {
        if (detailOpen !== undefined) {
            return (_jsx("div", { className: cn("flex min-h-0 flex-col", className), ...props, children: detailOpen ? detail : list }));
        }
        return (_jsxs("div", { className: cn("flex min-h-0 flex-col gap-6", className), ...props, children: [list, detail] }));
    }
    return (_jsxs("div", { ref: containerRef, className: cn("flex min-h-0 min-w-0 items-stretch", className), ...props, children: [_jsx("div", { className: "min-w-0 overflow-auto", style: { width: `${size}%` }, children: list }), _jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": resizeLabel, "aria-valuenow": Math.round(size), "aria-valuemin": minSize, "aria-valuemax": 100 - minSize, tabIndex: 0, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onKeyDown: onKeyDown, className: cn("relative mx-1 w-px shrink-0 cursor-col-resize self-stretch bg-border", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-border-strong", 
                // Invisible 8px hit area so the 1px line is grabbable.
                "after:absolute after:inset-y-0 after:-left-1 after:-right-1 after:content-['']") }), _jsx("div", { className: "min-w-0 flex-1 overflow-auto", children: detail })] }));
}
