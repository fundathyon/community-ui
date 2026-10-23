/** A named schedule shown instead of its raw expression. */
export interface CronPreset {
    label: string;
    value: string;
}
/** The schedules the job form offers; products pass translated labels. */
export declare const CRON_PRESETS: CronPreset[];
/**
 * Human label for a schedule when it matches a preset; the raw expression
 * otherwise, and `manualLabel` when there is none.
 */
export declare function describeSchedule(schedule: string | undefined, { presets, manualLabel }?: {
    presets?: CronPreset[];
    manualLabel?: string;
}): string;
/**
 * Cheap client-side check of a 5-field cron expression or @descriptor, so a
 * form catches typos before Cronify does (Cronify still validates).
 */
export declare function looksLikeCron(expr: string): boolean;
