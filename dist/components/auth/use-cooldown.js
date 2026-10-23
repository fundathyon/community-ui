"use client";
import { useCallback, useEffect, useRef, useState } from "react";
/**
 * Internal countdown for "resend" affordances (§23): after a resend the link is
 * disabled and counts down before it can fire again. Uses a 1s interval so
 * tests can drive it with `vi.useFakeTimers()` + `advanceTimersByTime`.
 *
 * Not exported from the barrel — an implementation detail of the auth forms.
 */
export function useCooldown(seconds) {
    const [remaining, setRemaining] = useState(0);
    const timer = useRef(null);
    const clear = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, []);
    useEffect(() => clear, [clear]);
    const start = useCallback(() => {
        if (seconds <= 0)
            return;
        clear();
        setRemaining(seconds);
        timer.current = setInterval(() => {
            setRemaining((value) => {
                if (value <= 1) {
                    clear();
                    return 0;
                }
                return value - 1;
            });
        }, 1000);
    }, [seconds, clear]);
    return { remaining, active: remaining > 0, start };
}
