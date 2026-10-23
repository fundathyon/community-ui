/** The schedules the job form offers; products pass translated labels. */
export const CRON_PRESETS = [
    { label: "Every minute", value: "* * * * *" },
    { label: "Every 5 minutes", value: "*/5 * * * *" },
    { label: "Every 10 minutes", value: "*/10 * * * *" },
    { label: "Every 15 minutes", value: "*/15 * * * *" },
    { label: "Every hour", value: "0 * * * *" },
    { label: "Every day at 03:00", value: "0 3 * * *" },
    { label: "Mondays at 09:00", value: "0 9 * * 1" },
    { label: "First day of every month", value: "0 0 1 * *" },
];
/**
 * Human label for a schedule when it matches a preset; the raw expression
 * otherwise, and `manualLabel` when there is none.
 */
export function describeSchedule(schedule, { presets = CRON_PRESETS, manualLabel = "Manual" } = {}) {
    if (!schedule?.trim())
        return manualLabel;
    return presets.find((p) => p.value === schedule.trim())?.label ?? schedule;
}
/**
 * Cheap client-side check of a 5-field cron expression or @descriptor, so a
 * form catches typos before Cronify does (Cronify still validates).
 */
export function looksLikeCron(expr) {
    const s = expr.trim();
    if (!s)
        return false;
    if (s.startsWith("@"))
        return /^@(yearly|annually|monthly|weekly|daily|midnight|hourly|every\s+\S+)$/.test(s);
    const fields = s.split(/\s+/);
    return fields.length === 5 && fields.every((f) => /^[\d*/,\-A-Za-z?]+$/.test(f));
}
