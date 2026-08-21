"use client";
import { useCallback, useEffect, useRef, useState } from "react";
/**
 * Copy text to the clipboard with a transient `copied` flag for UI feedback.
 * Always copy the FULL value — never a middle-truncated display form (§20).
 */
export function useCopyToClipboard({ resetAfter = 2000 } = {}) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);
    useEffect(() => {
        return () => {
            if (timer.current)
                clearTimeout(timer.current);
        };
    }, []);
    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (timer.current)
                clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), resetAfter);
            return true;
        }
        catch {
            setCopied(false);
            return false;
        }
    }, [resetAfter]);
    return { copied, copy };
}
