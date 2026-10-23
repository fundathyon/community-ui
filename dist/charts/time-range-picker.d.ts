/** One selectable range. */
export interface TimeRangeOption {
    label: string;
    value: string;
}
export interface TimeRangePickerProps {
    value: string;
    /** @default 1h · 24h · 7d · 30d (§22 "Vista general"). */
    options?: TimeRangeOption[];
    onChange: (value: string) => void;
    /** Accessible name for the group / select. @default "Rango de tiempo" */
    label?: string;
    className?: string;
}
/**
 * TimeRangePicker — the dashboard range control (§22). A segmented ButtonGroup
 * at ≥ md; below md it becomes a Select (§22 responsive: "el selector de rango se
 * convierte en select"). The active segment reads by fill AND weight, never
 * colour alone.
 *
 * When to use: switching a dashboard's time window. For picking an arbitrary
 * span use forms/DateRangePicker instead.
 */
export declare function TimeRangePicker({ value, options, onChange, label, className, }: TimeRangePickerProps): import("react").JSX.Element;
