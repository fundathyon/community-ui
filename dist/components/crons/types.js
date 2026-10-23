/** Duration of an execution: ms under a second, like HttpResponse. */
export function formatExecutionDuration(ms, format) {
    if (ms === undefined || ms === null || !Number.isFinite(ms))
        return "—";
    return ms >= 1000 ? format(ms) : `${Math.round(ms)} ms`;
}
