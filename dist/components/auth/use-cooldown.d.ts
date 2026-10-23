export interface UseCooldownReturn {
    /** Seconds left; 0 when idle. */
    remaining: number;
    /** True while counting down. */
    active: boolean;
    /** (Re)start the countdown from `seconds`. */
    start: () => void;
}
/**
 * Internal countdown for "resend" affordances (§23): after a resend the link is
 * disabled and counts down before it can fire again. Uses a 1s interval so
 * tests can drive it with `vi.useFakeTimers()` + `advanceTimersByTime`.
 *
 * Not exported from the barrel — an implementation detail of the auth forms.
 */
export declare function useCooldown(seconds: number): UseCooldownReturn;
