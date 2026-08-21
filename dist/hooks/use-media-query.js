"use client";
import { useEffect, useState } from "react";
/** SSR-safe media query subscription. Returns `false` on the server. */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);
        const onChange = (event) => setMatches(event.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);
    return matches;
}
/** True when the user asked for reduced motion (§06). */
export function useReducedMotion() {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}
